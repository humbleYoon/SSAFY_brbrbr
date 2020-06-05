import redis from '../redis/client'

const startGuide = (robotCode: string) => {
  redis.get('robot', (err, robots) => {
    if (!err) {
      const robotStatus = JSON.parse(robots)
      const robotRequested = robotStatus[robotCode]

      robotRequested.status = '이동중'
      redis.set('robot', JSON.stringify(robotStatus))

      setTimeout(() => {
        robotRequested.status = '도착'
        redis.set('robot', JSON.stringify(robotStatus))
      }, 10000)
    }
  })
}

export { startGuide }
