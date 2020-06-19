import amqp from 'amqplib/callback_api'

amqp.connect('amqp://13.125.3.178', (error0, connection) => {
  if (error0) {
    throw error0
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1
    }
    // const queue = 'test'
    const exchange = 'serverToRobot'
    channel.assertExchange(exchange, 'fanout', { durable: false })
    channel.assertQueue(
      '',
      {
        durable: false,
      },
      (error2, q) => {
        if (error2) {
          throw error2
        }
        console.log(
          ` [*] Waiting for messages in ${q.queue}. To exit press CTRL+C`
        )
        channel.bindQueue(q.queue, exchange, '')

        channel.consume(
          q.queue,
          (msg) => {
            if (msg?.content) {
              console.log(` [x] Received ${msg?.content.toString()}`)
            }
          },
          {
            noAck: true,
          }
        )
      }
    )
  })
})
