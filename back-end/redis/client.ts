import redis from 'redis'
import util from 'util'
import prisma from '../prisma/client'
import getRandomCode from '../utils/getRandomCode'

import { Robot } from '@prisma/client'

export interface RobotStatus extends Robot {
  available?: boolean
  status?: '대기' | '이동중' | '도착'
  onService?: boolean
}

export interface RobotsByCode {
  [code: string]: RobotStatus
}

const redisUrl = 'redis://localhost:6379'
export const client = redis.createClient(redisUrl)

const get = util.promisify(client.get).bind(client)

export const initRobots = async () => {
  const robots = await prisma.robot.findMany()

  const robotStatus = robots.map((robot: RobotStatus) => {
    robot.available = true
    robot.status = '대기'
    robot.onService = false
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
export const getRobotsByCode = async () => {
  try {
    const data = await get('robot')
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}

export const getRobotCodes = async () => {
  try {
    const robotsByCode = await getRobotsByCode()
    return Object.keys(robotsByCode)
  } catch (error) {
    console.error(error)
  }
}

export const getRobotsNotOnService = async () => {
  const robotsNotOnService = [] as RobotStatus[]

  try {
    const robotsByCode = await getRobotsByCode()
    const robotCodes = await getRobotCodes()

    robotCodes?.forEach((robotCode) => {
      if (!robotsByCode[robotCode].onService)
        robotsNotOnService.push(robotsByCode[robotCode])
    })
  } catch (error) {
    console.error(error)
  }

  return robotsNotOnService
}

initRobots()
