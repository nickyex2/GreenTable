from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
from bson.json_util import dumps, loads
from dotenv import load_dotenv
import os
load_dotenv()

Booking = Flask(__name__)
CORS(Booking)

client = pymongo.MongoClient(os.environ.get('BOOKING_DB_URL'))
db = client["Booking"]
collection = db["Booking"]


# Get an array of all bookings based on restaurant_name
@Booking.route('/booking/<restaurant_name>', methods=['GET'])
def getAll(restaurant_name):
    items = collection.find({"restaurant": restaurant_name})
    result = loads(dumps(items))
    return result, 200

# Add booking
@Booking.route('/booking/add', methods=['POST'])
def addBooking():
    json = request.get_json()
    try:
        collection.insert_one(json)
        return json, 200
    except Exception as e:
        return jsonify({'message': str(e)}), e['code']
    
"""
data
{
    "_id": "1",
    "restaurant": "Elemen",
    "customer": "bobbybob",
    "date_created": "150322",
    "date": "280322",
    "time": "1300",
    "no_of_pax": "4",
    "pax_details": ["mother", "father", "dog"],
    "items_ordered": [],
    "paid_status": false
}

"""

# Delete booking based on booking_id string
@Booking.route('/booking/delete/<string:booking_id>', methods=['DELETE'])
def deleteBooking(booking_id):
    try:
        collection.delete_one({"_id": booking_id})
        return jsonify({"message": "Booking successfully deleted"}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), e['code']


# Get booking based on booking_id string
@Booking.route('/booking/getBooking/<string:booking_id>', methods=['GET'])
def getBooking(booking_id):
    try:
        booking = collection.find({"_id": booking_id})
        result = loads(dumps(booking))
    
        if len(result) > 0:
            return result[0], 200
        else:
            return jsonify({"message": "Invalid Customer ID"}), 404
        
    except Exception as e:
        return jsonify({'message': str(e)}), e['code']
    
    
################################ If got time ####################################
# @Booking.route('/booking/update', methods=['PUT'])
# def updateBooking():
#     if request.is_json:
#         json = request.get_json()
#         try:
#             booking_id = json["_id"]
#             date = json["date"]
#             time = json["time"]

#             booking = collection.find({"_id": booking_id})
#             restaurant = booking["restaurant"]

#             collection.find_one_and_update({"_id": booking_id}, {"$set": {"date": date, "time": time}})

#             return jsonify({"message": "Booking successfully updated"}), 200
        
#         except Exception as e:
#             return jsonify({'message': str(e)}), e['code']
        
#     else:
#         return jsonify({"message": "Invalid JSON"}), 400

###################################################################################


# Takes in JSON object with booking_id ("booking_id") and order array ["order"] and updates the booking with order array
@Booking.route('/booking/updateOrder', methods=['POST'])
def updateOrder():
    if request.is_json:
        json = request.get_json()
        try:
            booking_id = json["booking_id"]
            order = json["order"]

            collection.find_one_and_update({"_id": booking_id}, {"$set": {"items_ordered": order}})

            return jsonify({"message": "Order successfully updated"}), 200
        
        except Exception as e:
            return jsonify({'message': str(e)}), e['code']
        
"""
data
{
    "booking_id": "1",
    "order": []
}
"""

# Takes in JSON object with booking_id ("booking_id") and payment_status boolean ("payment_status") and updates the booking with payment_status
@Booking.route('/booking/updatePaymentStatus', methods=['PUT'])
def updatePaymentStatus():
    if request.is_json:
        json = request.get_json()
        try:
            booking_id = json["booking_id"]
            payment_status = json["payment_status"]

            collection.find_one_and_update({"_id": booking_id}, {"$set": {"paid_status": payment_status}})

            return jsonify({"message": "Payment status successfully updated"}), 200
        
        except Exception as e:
            return jsonify({'message': str(e)}), e['code']
        
"""
data
{
    "booking_id": "1",
    "payment_status": true
}
"""


if __name__ == '__main__':
    Booking.run(port=5003, debug=True, host="0.0.0.0")