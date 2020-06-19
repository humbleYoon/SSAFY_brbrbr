import redis from '../redis/client'

const moveTo = (robotCode: string, axis: number[]) => {
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

const stopMoving = (robotCode: string) => {
  redis.get('robot', (err, robots) => {
    if (!err) {
      const robotStatus = JSON.parse(robots)
      const robotRequested = robotStatus[robotCode]

      robotRequested.status = '정지'
      redis.set('robot', JSON.stringify(robotStatus))
    }
  })
}

export { moveTo, stopMoving }
