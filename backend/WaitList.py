from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
from bson.json_util import dumps, loads

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient("mongodb+srv://WaitList:waitlist@cluster0.cljlebi.mongodb.net/?retryWrites=true&w=majority")
db = client["WaitList"]
collection = db["WaitList"]
# query data
# items = collection.find()
# for item in items:
#     print(item)
# insert data
# collection.insert_one({"_id":"kFC", "restaurant_name": "test2", "name": "tes2t", "size": 2, "status": "waiting"})
# collection.insert_many([{"name": "test1", "age": 18}, {"name": "test2", "age": 18}])

@app.route('/waitlist/<string:restaurant_name>', methods=['GET'])
def getWaitList(restaurant_name):
    print("here")
    items = collection.find({"restaurant_name": restaurant_name})
    
    result = loads(dumps(items))
    return result

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5010)