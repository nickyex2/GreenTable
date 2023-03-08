from telethon import TelegramClient, events, sync
from dotenv import load_dotenv
import os

load_dotenv()
def send_message():
    # API details
    user_details = "@nicky_goh"
    message_content = "this is a test message"
    # These API codes wont work, hence create your own
    api_id = 20480107
    api_hash = 'f6b5db22bd5117cab0876064ca067000'
    # Initialise telegram client with API codes
    print("Initialising telegram client")
    client = TelegramClient(os.getenv("TELEGRAM_API_SESSION"), api_id, api_hash)
    # Start the process
    client.start()
    # Send the message
    client.send_message(user_details, message_content)
    # Disconnect the client
    client.disconnect()

if __name__ == '__main__':
    send_message()

