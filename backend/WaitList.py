from flask import Flask, jsonify
from flask_cors import CORS

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./esd-project-g6-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

WaitList = Flask(__name__)
CORS(WaitList)

@WaitList.route('/waitlist/{restaurant_name}', methods=['GET'])
def getWaitList(restaurant_name):
    doc_ref = db.collection(u'Restaurants').document(restaurant_name).collection(u'Waitlist').stream()
    
    waitlist = []
    for doc in doc_ref:
        waitlist.append(doc.to_dict())

    return jsonify(waitlist)

if __name__ == '__main__':
    WaitList.run(debug=True, host='0.0.0.0', port=5010)