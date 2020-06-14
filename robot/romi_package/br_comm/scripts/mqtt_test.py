#!/usr/bin/env python

import rospy
import pika
from std_msgs.msg import String

def callback(data):
	rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
	channel.basic_publish(exchange='robotToServer', routing_key='', body="d")


def mqttCB(ch, method, properties, body):
	rospy.loginfo("Mqtt heard %s", body.decode('utf8'))

def listener():
	rospy.init_node('listener', anonymous=True)
	rospy.Subscriber('chatter', String, callback)
#rospy.spin()

if __name__ == '__main__':
	listener()
	connection = pika.BlockingConnection(
			pika.ConnectionParameters("13.125.3.178"))
	channel = connection.channel()
	
	channel.exchange_declare(exchange='robotToServer', exchange_type='fanout')
	channel.exchange_declare(exchange='serverToRobot', exchange_type='fanout')
	q = channel.queue_declare(queue='', exclusive=True)
	
	queue_name = q.method.queue
	channel.queue_bind(exchange='serverToRobot', queue=queue_name)

	print('[*] Waiting for messages. To exit press CTRL+C')
	
	channel.basic_consume(queue=queue_name, auto_ack=True, on_message_callback=mqttCB)
	channel.start_consuming()
	ros.spin()


