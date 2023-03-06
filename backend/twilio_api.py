# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]

client = Client(account_sid, auth_token)
# create functions to send messages to users 
# 1. send message upon successful booking
# 2. send message upon successful payment
# 3. send message upon cancellation of booking to users in the waiting list
message = client.messages.create(
    body="Hello from Twilio", # change to relevant message
    from_="+15674074321", # twilio auto-generated number
    to="+6585110106" # change to user's phone number
)
print(message.sid)
