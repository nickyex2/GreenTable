from flask import Flask, jsonify
from flask_cors import CORS
import requests

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

if __name__ == '__main__':
    Catalog.run(port=5000, debug=True)