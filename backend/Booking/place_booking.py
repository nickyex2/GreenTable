from flask import Flask, request, jsonify
from flask_cors import CORS

import os, sys

import requests
from invokes import invoke_http

import amqp_setup
import pika
import json

app = Flask(__name__)
CORS(app)

booking_url = os.environ.get("booking_url") or "http://localhost:5003/booking/"
add_booking_url = booking_url + "add"
delete_booking_url = booking_url + "delete/<string:booking_id>"
get_customer_bookings_url = booking_url + "getBookings/<string:customer_name"
get_booking_id_url = booking_url + "getBookings/<string:booking_id>"
update_order_url = booking_url + "updateOrder"
update_payment_status_url = booking_url + "updatePaymentStatus"

catalog_url = os.environ.get("catalog_url") or "http://localhost:5001/catalog/"
check_restaurant_availability_url = catalog_url + "<string:restaurant_name>"

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
    message = json.dumps(booking)
    restaurant_name = booking["restaurant_name"]

    # Check restaurant availability
    availability = invoke_http(check_restaurant_availability_url.replace("<string:restaurant_name>", restaurant_name), "GET")

    # Check date and time exist in list of available dates and times
    if message['date'] in 


    # restaurant = invoke_http(restaurant_url + restaurant_name, "GET")
    # code = restaurant["code"]
    # if code != 200:
    #     # Inform error microservice
    #     print("\n\n ----- Publishing the (booking error) message with routing_key=booking.error -----")
    #     amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="booking.error", body=message, properties=pika.BasicProperties(delivery_mode = 2))

    #     # Print status even if invocation fails
    #     print("\nBooking status ({:d}) published to the RabbitMQ Exchange:".format(code), booking_result)
    #     return {
    #         "code": 404,
    #         "message": "Restaurant " + restaurant_name + " not found"
    #     }
    


"""
    # Check if the customer exists
    customer_name = booking["customer"]
    customer = invoke_http(get_customer_bookings_url.replace("<string:customer_name>", customer_name), "GET")
    if customer["code"] != 200:
        return {
            "code": 404,
            "message": "Customer " + customer_name + " not found"
        }

    # Check if the customer has already made a booking at the restaurant
    for booking in customer["data"]:
        if booking["restaurant_name"] == restaurant_name:
            return {
                "code": 400,
                "message": "Customer " + customer_name + " has already made a booking at " + restaurant_name
            }

    # Add the booking
    result = invoke_http(add_booking_url, "POST", json=booking)
    if result["code"] != 200:
        return {
            "code": 500,
            "message": "Failed to add booking"
        }
    
    return {
        "code": 200,
        "message": "Booking successfully added"
    }
"""