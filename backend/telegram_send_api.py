from telethon import TelegramClient, events, sync
from dotenv import load_dotenv
import os
from quart import Quart, request, jsonify
from quart_cors import cors 
load_dotenv()

app = Quart(__name__)
cors(app)

@app.route('/api/sendmessage', methods=['POST'])
async def send_message():
    # API details
    user_details = "+6585580640"
    message_content = "this is a test message"
    # These API codes wont work, hence create your own
    api_id = os.getenv("TELEGRAM_API_ID")
    api_hash = os.getenv("TELEGRAM_API_HASH")
    # Initialise telegram client with API codes
    client = TelegramClient(os.getenv("TELEGRAM_API_SESSION"), api_id, api_hash)
    # Start the process
    await client.start()
    # Send the message
    await client.send_message(user_details, message_content)
    # Disconnect the client
    client.disconnect()
    return jsonify({'message': 'Message sent successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5015, host='0.0.0.0', use_reloader=True)

