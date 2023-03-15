from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
from bson.json_util import dumps, loads
from dotenv import load_dotenv
from password_hash import hash_password
import os
load_dotenv()

Customer = Flask(__name__)
CORS(Customer)

client = pymongo.MongoClient(os.environ.get('CUSTOMER_DB_URL'))
db = client["Customer"]
collection = db["Customer"]

@Customer.route('/customer/add', methods=['POST'])
def addCustomer():
    json = request.get_json()
    json["password"] = hash_password(json["password"])
    try:
        collection.insert_one(json)
        return "Added"
    except Exception as e:
        return jsonify({'message': str(e)}), e['code']

@Customer.route('/customer/all')
def getAll():
    items = collection.find({ })
    result = loads(dumps(items))
    return result, 200

"""
data
{
    "_id": "bobbybob",
    "password": "bobthebuilder",
    "phone": "666",
    "telegram": "@bobthebuilder",
    "email": "bob@bob.com",
    "first_name": "Bobby",
    "last_name": "Bob",
    "credit_card": {
        "card_number": "card_number",
        "expiration_date": "expiration_date",
        "security_code": "security_code"
    }
}
"""


@Customer.route('/customer/<string:customer_id>', methods=['GET'])
def getCustomer(customer_id):
    customers = collection.find({"_id": customer_id})
    result = loads(dumps(customers))
    if len(result) > 0:
        return result[0], 200
    else:
        return jsonify({"message": "Invalid Customer ID"}), 404
    


if __name__ == '__main__':
    Customer.run(port=5001, debug=True)
