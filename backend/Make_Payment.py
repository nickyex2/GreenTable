from flask import Flask, request, jsonify
from flask_cors import CORS
import os, sys
import pika
import amqp_setup
import json
from invokes import invoke_http
import sys

app = Flask(__name__)
CORS(app)

booking_url = os.environ.get('booking_url') or 'http://localhost:5003/booking'
payment_url = os.environ.get('payment_url') or 'http://localhost:5004/payment'
customer_url = os.environ.get('customer_url') or 'http://localhost:5001/customer'

"""
data = {
    "booking_id": "2",
    "total_amount": 600,
    "main_customer": {
        "name": "nicholas",
        "amount": 100
    },
    "other_customers": [
        {
            "name": "daryl",
            "amount": 200
        },
        {
            "name": "chiok",
            "amount": 300
        }
    ]
}
"""
@app.route("/make_payment", methods=['POST'])
def make_payment():
    if not request.is_json:
        return jsonify({
            "code": 400,
            "data": {
                "message": "Invalid JSON input: " + str(request.get_data())
            },
        }), 400
    #2. Customer splits the bill
    data = request.get_json()
    print('\n------------------------')
    print("\nReceived payment request:", data)

    try:
        result = processPayment(data)
        return jsonify(result), result["code"]
    except Exception as e:
        # Unexpected error in code
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        ex_str = str(e) + " at " + str(exc_type) + ": " + fname + ": line " + str(exc_tb.tb_lineno)
        print(ex_str)
        error_data ={
            "code": 500,
            "message": "Unexpected error in make_payment service",
            "from": "make_payment service",
            "data": ex_str
        }
        amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=json.dumps(error_data), properties=pika.BasicProperties(delivery_mode=2))
        #print error to console
        print('\n------------------------')
        print("\nUnexpected error in make_payment service:", ex_str)
        return jsonify(
            {
                "code": 500,
                "data": {
                    "message": f'{ex_str} Unexpected error in make_payment service' 
                }
            }
        ), 500

def processPayment(data):
    #check if booking exists
    booking_id = data["booking_id"]
    booking = invoke_http(f"{booking_url}/getBooking/{booking_id}", method='GET')
    if booking["code"] != 200:
        error_data ={
            "code": 404,
            "message": "Booking not found",
            "from": "make_payment service",
            "data": booking
        }
        amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=json.dumps(error_data))
        #print error to console
        print('\n------------------------')
        print("\nBooking not found:", booking)
        return jsonify(
            {
                "code": 404,
                "data": {
                    "message": "Booking not found"
                }
            }
        ), 404

    #3. Retrieve All Customer Profiles
    main_customer_name = data["main_customer"]["name"]
    main_customer = invoke_http(f"{customer_url}/{main_customer_name}", method='GET')
    if main_customer["code"] != 200:
        error_data = {
            "code": 404,
            "message": f"Customer {main_customer_name} not found",
            "from": "make_payment service",
            "data": main_customer
        }
        amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=json.dumps(error_data), properties=pika.BasicProperties(delivery_mode=2))
        #print error to console
        print('\n------------------------')
        print("\nCustomer not found:", main_customer_name)
        return jsonify({
            "code": 404,
            #include the name of the person that is not found
            "data": {
                "message": f"Customer {main_customer_name} not found"
            }
        }), 404
    data_to_send = {
        "total_amount": data["total_amount"],
        "maincustomer": {
            "name": data["main_customer"]["name"],
            "amount": data["main_customer"]["amount"],
            "card_no": main_customer["data"]["credit_card"]["card_number"],
            "exp_date": main_customer["data"]["credit_card"]["expiration_date"],
            "cvc": main_customer["data"]["credit_card"]["security_code"]
        },
        "customer_details": {}
    }
    other_customers = data["other_customers"]
    for customer in other_customers:
        name = customer["name"]
        customer = invoke_http(f"{customer_url}/{name}", method='GET')
        if customer["code"] != 200:
            error_data = {
                "code": 404,
                "message": f"Customer {name} not found",
                "from": "make_payment service",
                "data": customer
            }
            amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=json.dumps(error_data), properties=pika.BasicProperties(delivery_mode=2))
            #print error to console
            print('\n------------------------')
            print("\nCustomer not found:", name)
            return jsonify({
                "code": 404,
                "data": {
                    "message": f"Customer {name} not found",
                }
            }), 404
        data_to_send["customer_details"][name] = {
            "amount": customer["data"]["credit_card"]["card_number"],
            "card_no": customer["data"]["credit_card"]["expiration_date"],
            "exp_date": customer["data"]["credit_card"]["security_code"],
            "cvc": customer["data"]["credit_card"]["security_code"]
        }
    #5. Send payment request
    payment = invoke_http(payment_url, method='POST', json=data_to_send)
    if payment["code"] != 200:
        error_data = {
            "code": 500,
            "message": "Payment failed",
            "from": "make_payment service",
            "data": payment
        }
        amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=json.dumps(error_data), properties=pika.BasicProperties(delivery_mode=2))
        #print error to console
        print('\n------------------------')
        print("\nPayment failed:", payment)
        return jsonify({
            "code": 500,
            "data": {
                "message": "Payment failed",
            }
        }), 500
    booking_data = {
        "booking_id": booking_id,
        "payment_status": True
    }
    #7. Update Booking with Successful Payment
    updatePaymentStatus = invoke_http(f"{booking_url}/updatePaymentStatus", method='PUT', json=booking_data)
    # this block of code should never happen because the booking has already been checked
    if updatePaymentStatus["code"] != 200:
        error_data = {
            "code": 500,
            "message": "Payment Update Status Failed",
            "from": "make_payment service",
            "data": updatePaymentStatus
        }
        amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=json.dumps(error_data), properties=pika.BasicProperties(delivery_mode=2))
        #print error to console
        print('\n------------------------')
        print("\nPayment Update Status failed:", updatePaymentStatus)
    #8 send notification to customer via amqp
    amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.notification", body=json.dumps(data), properties=pika.BasicProperties(delivery_mode=2))
    print('\n------------------------')
    print("\nPayment successful:", payment)
    if updatePaymentStatus["code"] != 200:
        return jsonify({
            "code": 200,
            "data": {
                "message": "Payment successful but update payment status failed",
            }
        }), 200
    #9. Return payment status
    return jsonify({
        "code": 200,
        "data": {
            "message": "Payment successful",
        }
    }), 200

    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5007, debug=True)
