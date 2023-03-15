from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import pymongo
from bson.json_util import dumps, loads
from dotenv import load_dotenv
import os
load_dotenv()

Catalog = Flask(__name__)
CORS(Catalog)

client = pymongo.MongoClient(os.environ.get('CATALOG_DB_URL'))
db = client["Catalog"]
collection = db["Catalog"]


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

@Catalog.route('/catalog/add', methods=['POST'])
def addRestaurant():
    json = request.get_json()
    collection.insert_one(json)
    return "Added"

@Catalog.route('/catalog/all', methods=['GET'])
def getAll():
    items = collection.find({ })
    result = loads(dumps(items))
    return result, 200

"""
{
    "_id": "Elemen",
    "location": {
        "formatted_address": "9 Raffles Blvd #01-75/75A/76 Millenia Walk",
        "postal_code": "039596"
    },
    "description": "elemen is a dining concept focused on a modern interpretation of natural and meatless cuisine. It is dedicated to fostering the well-being of our customers through our wholesome meatless recipes and use of natural ingredients. Our elemen restaurants offer a pleasant dining experience and our brand motto 'Love Self, Love Earth' explains our focus of serving healthy and natural food, without compromising the sustainability of the environment.",
    "category": "category",
    "image": ["image"],
    "website": "elemengroup.com.sg",
    "cuisine": ["Vegetarian"],
    "availability": {
        "270322": {
            "1100": 5,
            "1200": 5,
            "1300": 5,
            "1400": 5,
            "1500": 5,
            "1600": 5,
            "1700": 5,
            "1800": 5,
            "1900": 5,
            "2000": 5,
            "2100": 5
        },
        "280322": {
            "1100": 5,
            "1200": 5,
            "1300": 5,
            "1400": 5,
            "1500": 5,
            "1600": 5,
            "1700": 5,
            "1800": 5,
            "1900": 5,
            "2000": 5,
            "2100": 5
        },
        "290322": {
            "1100": 5,
            "1200": 5,
            "1300": 5,
            "1400": 5,
            "1500": 5,
            "1600": 5,
            "1700": 5,
            "1800": 5,
            "1900": 5,
            "2000": 5,
            "2100": 5
        },
        "300322": {
            "1100": 5,
            "1200": 5,
            "1300": 5,
            "1400": 5,
            "1500": 5,
            "1600": 5,
            "1700": 5,
            "1800": 5,
            "1900": 5,
            "2000": 5,
            "2100": 5
        },
        "310322": {
            "1100": 5,
            "1200": 5,
            "1300": 5,
            "1400": 5,
            "1500": 5,
            "1600": 5,
            "1700": 5,
            "1800": 5,
            "1900": 5,
            "2000": 5,
            "2100": 5
        },
        "010422": {
            "1100": 5,
            "1200": 5,
            "1300": 5,
            "1400": 5,
            "1500": 5,
            "1600": 5,
            "1700": 5,
            "1800": 5,
            "1900": 5,
            "2000": 5,
            "2100": 5
        },
        "020422": {
            "1100": 5,
            "1200": 5,
            "1300": 5,
            "1400": 5,
            "1500": 5,
            "1600": 5,
            "1700": 5,
            "1800": 5,
            "1900": 5,
            "2000": 5,
            "2100": 5
        }
    },
    "avg_rating": 4.0,
    "number_of_ratings": 893
}

"""

@Catalog.route('/catalog/updateAvailability', methods=['PUT'])
def updateAvailability():
    if request.is_json:
        new = request.get_json()
        return processUpdateAvailability(new)
    else:
        return "Request was not JSON"

def processUpdateAvailability(obj):
    restaurant_name = obj['r_name']
    # customer_name = obj['c_name']
    date = obj['date']
    time = obj['time']

    doc = collection.find_one({"_id": restaurant_name})

    # Check if the availability for the specified date and time is greater than 0
    if doc["availability"][date][time] > 0:
        # Subtract 1 from the availability for the specified date and time
        doc["availability"][date][time] -= 1
        # Update the document in the database
        collection.update_one({"_id": "Elemen"}, {"$set": {"availability": doc["availability"]}})
    else:
        return "No availability"


    return "Updated"

if __name__ == '__main__':
    Catalog.run(port=5002, debug=True)