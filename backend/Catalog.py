from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./esd-project-g6-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

Catalog = Flask(__name__)
CORS(Catalog)


@Catalog.route('/catalog/<string:query>')
# Takes a string query and returns JSON object with the fields formatted_address, name, geometry, and photo
def search(query):
    fields = ['formatted_address', 'name', 'geometry','photo']
    fields_str = ",".join(fields)

    search_endpoint = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'
    payload = {'input': query, 'inputtype': 'textquery', 'fields': fields_str, 'key': 'AIzaSyA6ju8_1Q2zuf3DomUOFVplprJHuKpJHtw'}

    response = requests.get(search_endpoint, params=payload)
    response_json = response.json()

    return response_json['candidates'][0]

@Catalog.route('/catalog/all', methods=['GET'])
def getAll():
    doc_ref = db.collection(u'Restaurants').stream()
    
    restaurants = []
    for doc in doc_ref:
        restaurants.append(doc.to_dict())

    return jsonify(restaurants)

@Catalog.route('/catalog/updateAvailability', methods=['PUT'])
def updateAvailability():
    if request.is_json:
        new = request.get_json()
        return processUpdateAvailability(new)
    else:
        return "Request was not JSON"

def processUpdateAvailability(obj):
    name = obj['name']
    size = obj['size']
    status = obj['status']

    doc_ref = db.collection(u'Restaurants').document(name)
    curr = doc_ref.get()
    updated_avail = 0

    result = curr.to_dict()

    if status == 'entering':
        if result['availability'] > size:
            updated_avail += result['availability'] - size
        else:
            return "Not enough space"
    elif status == 'leaving':
        updated_avail += result['availability'] + size

    doc_ref.update({'availability': updated_avail})

    return "Update Successful"        

if __name__ == '__main__':
    Catalog.run(port=5002, debug=True)