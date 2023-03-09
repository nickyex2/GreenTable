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

@app.route('/api/sendbooking', methods=['POST'])
async def send_booking():
    data = await request.get_json()
    user_details = "+65" + data['phone']
    message_content = "this is a test message"
    await send_message(user_details, message_content)
    return jsonify({'message': 'Message sent successfully'}), 200

@app.route('/api/sendcancel', methods=['POST'])
async def send_cancel():
    data = await request.get_json()
    user_details = "+65" + data['phone']
    message_content = "this is a test message"
    await send_message(user_details, message_content)
    return jsonify({'message': 'Message sent successfully'}), 200

@app.route('/api/sendpayment', methods=['POST'])
async def send_payment():
    data = await request.get_json()
    user_details = "+65" + data['phone']
    message_content = "this is a test message"
    await send_message(user_details, message_content)
    return jsonify({'message': 'Message sent successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0', use_reloader=True)

