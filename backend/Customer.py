from flask import Flask, jsonify
from flask_cors import CORS

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./esd-project-g6-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

Customer = Flask(__name__)
CORS(Customer)

@Customer.route('/customer/all')
def getAll():
    doc_ref = db.collection(u'Customers').stream()
    
    restaurants = []
    for doc in doc_ref:
        restaurants.append(doc.to_dict())

    return jsonify(restaurants)

@Customer.route('customer/<string:id>', methods=['GET'])
def getCustomer(id):
    doc_ref = db.collection(u'Customers').document(id).get()

    return jsonify(doc_ref.to_dict())

if __name__ == '__main__':
    Customer.run(port=5000, debug=True)
