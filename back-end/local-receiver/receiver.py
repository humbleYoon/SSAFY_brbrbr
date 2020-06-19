import pika
import time

def callback(ch, method, properties, body):
    axis = body.decode('utf8')
    print(f' [x] Received {axis}')
    x, y = map(float, axis.split(','))

    # 로봇이 움직이는 코드를 넣는 곳
    time.sleep(10) 

    # 로봇이 목적지에 도착한 이후에 메시지 전달
    channel.basic_publish(exchange='robotToServer',
                    routing_key='',
                    body='도착')

# 테스트용
# connection = pika.BlockingConnection(
#     pika.ConnectionParameters('localhost'))

# AWS 서버 상의 브로커와 연결
connection = pika.BlockingConnection(
    pika.ConnectionParameters('13.125.3.178'))

channel = connection.channel()

# publish
channel.exchange_declare(exchange='robotToServer', exchange_type='fanout')

# subscribe
channel.exchange_declare(exchange='serverToRobot', exchange_type='fanout')
q = channel.queue_declare(queue='', exclusive=True)
queue_name = q.method.queue

channel.queue_bind(exchange='serverToRobot', queue=queue_name)

print(' [*] Waiting for messages. To exit press CTRL+C')

channel.basic_consume(queue=queue_name,
                      auto_ack=True,
                      on_message_callback=callback)

channel.start_consuming()

