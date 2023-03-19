import pika

import amqp_setup as amqp_setup
import json

# send a message to the queue
def sendNotification(notificationData):
    amqp_setup.check_setup()
    amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="greentable.avanotify", body=json.dumps(notificationData), properties=pika.BasicProperties(delivery_mode = 2,)) # make message persistent within the matching queues
    print("Sent out a Notification by " + __file__)

if __name__ == "__main__":  # execute this program only if it is run as a script (not by 'import')
    notificationData = {
        "restaurant_name": "BurgerKing",
        "date": "010423",
        "time": "1500",
    }
    
    sendNotification(notificationData)
