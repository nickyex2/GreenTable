from telethon import TelegramClient, events, sync
from dotenv import load_dotenv
import os
from quart import Quart, request, jsonify
from quart_cors import cors 

load_dotenv()

app = Quart(__name__)
cors(app)

async def send_message(user_details, message_content):
    api_id = os.getenv("TELEGRAM_API_ID")
    api_hash = os.getenv("TELEGRAM_API_HASH")
    # Initialise telegram client with API codes
    client = TelegramClient(os.getenv("TELEGRAM_API_SESSION"), api_id, api_hash)
    try:
        # Start the process
        await client.start()
        # Send the message
        await client.send_message(user_details, message_content)
    except Exception as e:
        return {'message': e}, e['code']
    # Disconnect the client
    client.disconnect()

"""
    data = {
        "phone": "12345678",
        "name": "Nicholas",
        "booking": "12345678",
        "restaurant_name": "Restaurant 1",
        "date_time": "2021-01-01 12:00:00"
    }
"""
@app.route('/api/sendbooking', methods=['POST'])
async def send_booking():
    data = await request.get_json()
    user_details = "+65" + data['phone']
    message_content = f'Dear {data["name"]}, this message is to inform you that your booking {data["booking"]} is confirmed. \n Name of Restaurant: {data["restaurant_name"]} \n Date & Time: {data["date_time"]}'
    await send_message(user_details, message_content)
    return jsonify({"code": 200, "data":{'message': 'Message sent successfully'}}), 200

"""
    # for waitlist available
    data = {
        "email": "abc@example.com"
        "name": "Nicholas",
        "restaurant_name": "Restaurant 1",
        "date_time": "2021-01-01 12:00:00"
    }
"""
@app.route('/api/sendnoti', methods=['POST'])
async def send_noti():
    data = await request.get_json()
    user_details = "+65" + data['phone']
    message_content = "this is a test message"
    await send_message(user_details, message_content)
    return jsonify({"code": 200, "data":{'message': 'Message sent successfully'}}), 200

"""
    # for payment confirmation
    data = {
        "phone": "12345678"
        "name": "Nicholas",
        "booking": "12345678",
        "restaurant_name": "Restaurant 1",
        "date_time": "2021-01-01 12:00:00",
        "amount": "100"
    }
"""
@app.route('/api/sendpayment', methods=['POST'])
async def send_payment():
    data = await request.get_json()
    user_details = "+65" + data['phone']
    message_content = "this is a test message"
    await send_message(user_details, message_content)
    return jsonify({"code": 200, "data":{'message': 'Message sent successfully'}}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5015, host='0.0.0.0', use_reloader=True)

