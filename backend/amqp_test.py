import pika

import amqp_setup as amqp_setup
import json

# send a message to the queue
def sendNotification(notificationData):
    amqp_setup.check_setup()
    amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.notification", body=json.dumps(notificationData), properties=pika.BasicProperties(delivery_mode = 2,)) # make message persistent within the matching queues
    print("Sent out a Notification by " + __file__)

if __name__ == "__main__":  # execute this program only if it is run as a script (not by 'import')
    notificationData = {
        "type_of_notification": "sendbooking",    #sendbooking, sendpayment, sendnoti
        "data": {
            "phone": "85110106",
            "email": "zellaex128@gmail.com",
            "name": "Nicholas",
            "restaurant_name": "Restaurant 1",
            "date_time": "2024-01-01 12:00:00",
            "booking": "12345678", # only appear in sendbooking and sendpayment
            # "amount": "100" # only appear in sendpayment
        }
    }
    sendNotification(notificationData)
