import redis from '../redis/client'
import prisma from '../prisma/client'
import amqpInit from '../publisher'
import { Channel } from 'amqplib'

const broker: { ch: Channel | undefined; q: string | undefined } = {
  ch: undefined,
  q: undefined,
}

amqpInit().then((res) => {
  broker.ch = res?.channel
  broker.q = res?.queue
})

const moveTo = async (robotCode: string, axis: number[]) => {
  const { ch, q } = broker
  redis.get('robot', (err, robots) => {
    if (!err) {
      const robotStatus = JSON.parse(robots)
      const robotRequested = robotStatus[robotCode]

      const pub = ch?.publish('serverToRobot', '', Buffer.from(axis.toString()))
      if (pub) {
        console.log('전송 성공!!')
        robotRequested.status = '이동중'
        redis.set('robot', JSON.stringify(robotStatus))

        // 비동기로 도착 메시지를 기다리는 subscribeer
        ch!.consume(
          q!,
          (msg) => {
            if (msg?.content.toString() === '도착') {
              robotRequested.status = '도착'
              redis.set('robot', JSON.stringify(robotStatus))
            } else {
              return
            }
          },
          { noAck: true }
        )
      }
    }
  })
}

export { moveTo }
