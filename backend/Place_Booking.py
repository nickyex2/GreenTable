from flask import Flask, request, jsonify
from flask_cors import CORS

import os, sys

from invokes import invoke_http

import amqp_setup
import pika
import json
import random

app = Flask(__name__)
CORS(app)

# URL for other microservices
booking_url = os.environ.get("booking_url") or "http://localhost:5003/booking/"
add_booking_url = booking_url + "add"
delete_booking_url = booking_url + "delete/<string:booking_id>"
get_booking_id_url = booking_url + "getBooking/<string:booking_id>"

catalog_url = os.environ.get("catalog_url") or "http://localhost:5002/catalog/"
check_restaurant_availability_url = catalog_url + "find/<string:restaurant_name>"

customer_url = os.environ.get("customer_url") or "http://localhost:5001/customer/"
get_customer_url = customer_url + "<string:customer_id>"
update_availability_url = catalog_url + "updateAvailability"

waitlist_url = os.environ.get("waitlist_url") or "http://localhost:5010/waitlist/"

@app.route("/booking/place_booking", methods=["POST"])
def place_booking():
    # Check the input format and data of the request are JSON
    if request.is_json:
        try:
            booking = request.get_json()
            print("\nReceived a booking in JSON:", booking)

            # Start routing
            result = processPlaceBooking(booking)
            return jsonify(result), result["code"]
        
        except Exception as e:
            # Unexpected error
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            ex_str = str(e) + " at " + str(exc_type) + ": " + fname + ": line " + str(exc_tb.tb_lineno)
            print(ex_str)

            return jsonify({
                "code": 500,
                "message": "place_booking.py internal error: " + ex_str
            }), 500
    
    # Not a JSON request
    return jsonify({
        "code": 400,
        "message": "place_booking.py: place_booking() received a non-JSON request"
    }), 400

def processPlaceBooking(booking):
    print("\n\n ----- Processing the booking -----")
    print("\nBooking details:", booking)
    message = json.dumps(booking)
    restaurant_name = booking["restaurant"]
    date = booking["date"]
    time = booking["time"]

    # Check restaurant availability
    availability = invoke_http(check_restaurant_availability_url.replace("<string:restaurant_name>", restaurant_name), "GET")

    if availability["data"]["availability"][date][time] > 0:
        
        # Available, update availability
        print("\n\n ----- Table available, updating availability -----")
        update_availability_data = {
            "restaurant_name": restaurant_name,
            "date": date,
            "time": time,
            "update": -1
        }
        update_availability_result = invoke_http(update_availability_url, "PUT", update_availability_data)
        update_availability_code = update_availability_result["code"]
        print("Update availability result:", update_availability_result)
        if update_availability_code not in range(200, 300):
            # Update availability unsuccessful, inform error microservice
            print("\n\n ----- Update availability unsuccessful, sending error message -----")
            amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=message, properties=pika.BasicProperties(delivery_mode=2))

            # Print status even if invocation fails
            print("\nUpdate availability status ({:d}) published to the RabbitMQ Exchange:".format(update_availability_code), update_availability_result)

            # Add booking to waitlist
            print("\n\n ----- Adding to waitlist -----")
            customer_id = booking["customer"]
            get_customer_result = invoke_http(get_customer_url.replace("<string:customer_id>", customer_id), "GET")
            customer_info = get_customer_result["data"]
            waitlist_data = {
                "restaurant_name": restaurant_name,
                "customer": customer_id,
                "phone": customer_info["phone"],
                "email": customer_info["email"],
                "date": date,
                "time": time
            }
            post_waitlist_result = invoke_http(waitlist_url, "POST", waitlist_data)
            code = post_waitlist_result["code"]
            if code not in range(200,300):
                # Waitlist unsuccessful, inform error microservice
                print("\n\n ----- Waitlist unsuccessful, sending error message -----")
                amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=message, properties=pika.BasicProperties(delivery_mode = 2))

                # Print status even if invocation fails
                print("\nWaitlist status ({:d}) published to the RabbitMQ Exchange:".format(code), post_waitlist_result)
                return {
                    "code": 500,
                    "message": "Waitlist failed"
                }
            return {
                "code": update_availability_code,
                "message": "Update availability unsuccessful"
            }
        

        # Generate 8 digit id
        int_id = 0
        while True:
            int_id = random.randint(10000000, 99999999)
            str_id = str(int_id)
            if invoke_http(get_booking_id_url.replace("<string:booking_id>", str_id), "GET")["code"] not in range(200, 300):
                break

        # Add booking id to booking
        booking["_id"] = str_id
        
        # Add booking to database
        print("\n\n ----- Adding Booking -----")
        add_booking_result = invoke_http(add_booking_url, "POST", booking)
        code = add_booking_result["code"]

        # Check if booking is added successfully
        if code not in range(200,300):
            # Booking unsuccessful, inform error microservice
            print("\n\n ----- Booking unsuccessful, sending error message -----")
            amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=message, properties=pika.BasicProperties(delivery_mode = 2))

            # Print status even if invocation fails
            print("\nBooking status ({:d}) published to the RabbitMQ Exchange:".format(code), add_booking_result)

            # Add booking to waitlist
            print("\n\n ----- Adding to waitlist -----")
            customer_id = booking["customer"]
            get_customer_result = invoke_http(get_customer_url.replace
            ("<string:customer_id>", customer_id), "GET")
            customer_info = get_customer_result["data"]
            waitlist_data = {
                "restaurant_name": restaurant_name,
                "customer": customer_id,
                "phone": customer_info["phone"],
                "email": customer_info["email"],
                "date": date,
                "time": time
            }
            post_waitlist_result = invoke_http(waitlist_url, "POST", waitlist_data)
            code = post_waitlist_result["code"]
            if code not in range(200,300):
                # Waitlist unsuccessful, inform error microservice
                print("\n\n ----- Waitlist unsuccessful, sending error message -----")
                amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=message, properties=pika.BasicProperties(delivery_mode = 2))

                # Print status even if invocation fails
                print("\nWaitlist status ({:d}) published to the RabbitMQ Exchange:".format(code), post_waitlist_result)
                return {
                    "code": 500,
                    "message": "Waitlist failed"
                }
            
            return {
                "code": 200,
                "data": {
                    "waitlist_result": post_waitlist_result,
                    "message": "Booking unsuccessful, added to waitlist"
                }
            }
        
        else:
            # Booking successful, inform order microservice
            print("Booking info: ", booking)

            print("\n\n ----- Sending booking confirmation notification -----")
            customer_id = booking["customer"]
            get_customer_result = invoke_http(get_customer_url.replace
            ("<string:customer_id>", customer_id), "GET")
            print("customer_info:", get_customer_result)
            customer_info = get_customer_result["data"]
            send_booking_data = {
                "type_of_notification": "sendbooking",
                "data": {
                    "phone": customer_info["phone"],
                    "email": customer_info["email"],
                    "name": customer_info["first_name"],
                    "restaurant_name": restaurant_name,
                    "date_time": date + " " + time,
                    "booking": booking['_id']
                }
            }
            send_booking_message = json.dumps(send_booking_data)
            amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.notification", body=send_booking_message, properties=pika.BasicProperties(delivery_mode = 2))

            # Print status even if invocation fails
            print("\nBooking status ({:d}) published to the RabbitMQ Exchange:".format(code), add_booking_result)

            print("\n\n ----- Booking notification sent, booking successful -----")
            return {
                "code": 200,
                "message": "Booking successful"
            }
    
    else:
        # Unavailable
        print("\n\n ----- Table unavailable, adding to waitlist -----")

        # Add booking to waitlist
        print("\n\n ----- Adding to waitlist -----")
        customer_id = booking["customer"]
        get_customer_result = invoke_http(get_customer_url.replace("<string:customer_id>", customer_id), "GET")
        customer_info = get_customer_result["data"]
        waitlist_data = {
            "restaurant_name": restaurant_name,
            "customer": customer_id,
            "phone": customer_info["phone"],
            "email": customer_info["email"],
            "date": date,
            "time": time
        }
        post_waitlist_result = invoke_http(waitlist_url, "POST", waitlist_data)
        code = post_waitlist_result["code"]
        if code not in range(200,300):
            # Waitlist unsuccessful, inform error microservice
            print("\n\n ----- Waitlist unsuccessful, sending error message -----")
            amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.error", body=message, properties=pika.BasicProperties(delivery_mode = 2))

            # Print status even if invocation fails
            print("\nWaitlist status ({:d}) published to the RabbitMQ Exchange:".format(code), post_waitlist_result)
            return {
                "code": 500,
                "message": "Waitlist failed"
            }
        
        return {
            "code": 200,
            "data": {
                "waitlist_result": post_waitlist_result,
                "message": "Booking unsuccessful, added to waitlist"
            }
        }
    


if __name__ == '__main__':
    app.run(port=5006, debug=True, host="0.0.0.0")
