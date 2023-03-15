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

@Booking.route('/booking/all', methods=['GET'])
def getAll():
    items = collection.find({ })
    result = loads(dumps(items))
    return result, 200

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

@Booking.route('/booking/delete/<string:booking_id>', methods=['DELETE'])
def deleteBooking(booking_id):
    try:
        collection.delete_one({"_id": booking_id})
        return jsonify({"message": "Booking successfully deleted"}), 200
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


if __name__ == '__main__':
    Booking.run(port=5003, debug=True, host="0.0.0.0")