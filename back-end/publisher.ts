import amqp from 'amqplib'

const HOST = process.env.BROKER_HOST || '13.125.3.178'

const init = async () => {
  try {
    const conn = await amqp.connect(`amqp://${HOST}`)
    const ch = await conn.createChannel()

    const msg = process.argv.slice(2).join(' ') || '받아라 수영수영!'

    // Publish
    ch.assertExchange('serverToRobot', 'fanout', { durable: false })

    // setInterval(() => {
    //   ch.publish('serverToRobot', '', Buffer.from(msg))
    //   console.log(` [x] Sent ${msg}`)
    // }, 5000)

    // subscribe
    ch.assertExchange('robotToServer', 'fanout', { durable: false })
    const q = await ch.assertQueue('', { durable: false })
    ch.bindQueue(q.queue, 'robotToServer', '')
    // ch.consume(
    //   q.queue,
    //   (msg) => {
    //     console.log(`Recieved: ${msg?.content.toString()}`)
    //   },
    //   { noAck: true }
    // )
    return { channel: ch, queue: q.queue }
  } catch (error) {
    console.error(error)
  }
}
// init()

export default async () => {
  return await init()
}
// publish()
