from telethon import TelegramClient, events, sync
from dotenv import load_dotenv
import os

load_dotenv()

def send_message():
    # API details
    user_details = "@nicky_goh"
    message_content = "this is a test message"
    # These API codes wont work, hence create your own
    api_id = os.getenv("TELEGRAM_API_ID")
    api_hash = os.getenv("TELEGRAM_API_HASH")
    # Initialise telegram client with API codes
    client = TelegramClient(os.getenv("TELEGRAM_API_SESSION"), api_id, api_hash)
    # Start the process
    client.start()
    # Send the message
    client.send_message(user_details, message_content)
    # Disconnect the client
    client.disconnect()

if __name__ == '__main__':
    send_message()

