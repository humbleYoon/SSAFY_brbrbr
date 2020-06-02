import redis from 'redis'
import prisma from '../prisma/client'
import getRandomCode from '../utils/getRandomCode'

import { Robot } from '@prisma/client'

export interface RobotStatus extends Robot {
  available?: boolean
  status?: '대기' | '이동중' | '도착'
}

export interface RobotsByCode {
  [code: string]: RobotStatus
}

const redisUrl = 'redis://localhost:6379'
const client = redis.createClient(redisUrl)

const getRobots = async () => {
  const robots = await prisma.robot.findMany()

  const robotStatus = robots.map((robot: RobotStatus) => {
    robot.available = true
    robot.status = '대기'
    return robot
  })

  const robotsByCode = {} as RobotsByCode

  robotStatus.forEach((robot: RobotStatus) => {
    const codes = Object.keys(robotsByCode)
    let code = getRandomCode(1000, 9999, codes)

    robotsByCode[code] = robot
  })

  client.set('robot', JSON.stringify(robotsByCode))
  //   client.get('robot', (err, value) => {
  //     console.log(JSON.parse(value))
  //   })
}

getRobots()

export { client, getRobots }
