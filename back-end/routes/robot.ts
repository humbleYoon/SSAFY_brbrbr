import express from 'express'
import prisma from '../prisma/client'
import redis from '../redis/client'
import redisRobot, { RobotsByCode } from '../redis/robot'
import { emitToRobot } from './helpers'
import { moveTo } from '../robot/mock'
import { Log } from '../models/log'
import getRandomCode from '../utils/getRandomCode'
import validateCode from '../middlewares/validateCode'
import { stopMoving } from '../robot/mock'

const router = express.Router()

router.get('/', async (req, res) => {
  const robots = await prisma.robot.findMany()

  res.send(robots)
})

router.post('/', async (req, res) => {
  const { name, floor } = req.body

  const robot = await prisma.robot.create({
    data: {
      name,
      floor: Number(floor),
    },
  })

  res.send(robot)
  redisRobot.initRobots()
})

router.post('/', async (req, res) => {
  const { name, floor } = req.body

  const robot = await prisma.robot.create({
    data: {
      name,
      floor: Number(floor),
    },
  })

  res.send(robot)
  redisRobot.initRobots()
})

router.post('/auth', validateCode, async (req, res) => {
  const {
    inputAuthenticationCode: codeReceived,
  }: { inputAuthenticationCode: number } = req.body
  const robotCode = String(codeReceived)

  try {
    const robotsByCode = await redisRobot.getRobotsByCode()
    const robotCodes = Object.keys(robotsByCode)
    const isHere = Boolean(robotCodes!.includes(robotCode))

    if (isHere) {
      res.send({
        isAuthenticated: true,
        floor: robotsByCode[robotCode].floor,
      })
      emitToRobot(req, robotCode, 'changePageTo', 'service')
    } else {
      res.send({
        isAuthenticated: false,
      })
    }
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:id', async (req, res) => {
  const robotId = Number(req.params.id)

  await prisma.robot.delete({
    where: { id: robotId },
  })

  res.status(204).end()
})

router.get('/arrived', validateCode, async (req, res) => {
  const codeReceived = req.header('authCode')!

  try {
    const robotsByCode = await redisRobot.getRobotsByCode()
    const robot = robotsByCode[codeReceived]

    if (robot.status === '도착') {
      res.send({
        isArrived: true,
      })

      if (robot.destination) {
        const log = Log.build({
          robotName: robot.name,
          destination: robot.destination,
          status: '도착',
        })
        await log.save()
      }

      emitToRobot(req, codeReceived, 'changoPageTo', 'destination')
    } else {
      res.send({
        isArrived: false,
      })
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/finished', validateCode, async (req, res) => {
  const codeReceived = req.header('authCode')!

  try {
    moveTo(codeReceived, [0.0, 0.0])
    const robotsByCode = await redisRobot.getRobotsByCode()
    const robot = robotsByCode[codeReceived]

    if (robot.destination) {
      const log = Log.build({
        robotName: robot.name,
        destination: robot.destination,
        status: '종료',
      })
      await log.save()
    }

    robot.status = '대기'
    robot.destination = undefined

    const newRobotsByCode = {} as RobotsByCode

    const robotCodes = Object.keys(robotsByCode)
    robotCodes
      .filter((code) => code !== codeReceived)
      .forEach((code) => {
        newRobotsByCode[code] = robotsByCode[code]
      })
    const newCode = getRandomCode(1000, 9000, robotCodes)
    newRobotsByCode[newCode] = robot
    redis.set('robot', JSON.stringify(newRobotsByCode))

    emitToRobot(req, newCode, 'changePageTo', 'welcome')
    emitToRobot(req, newCode, 'authCode', newCode)

    res.status(200).send({ isAuthenticated: false })
  } catch (error) {
    console.error(error)
  }
})

router.get('/init', async (req, res) => {
  redisRobot.initRobots()

  res.status(204).end()
})

router.get('/stop', async (req, res) => {
  // 로봇 이동 중 정지
  const codeReceived = req.header('authCode')
  if (codeReceived) {
    const robotsByCode = await redisRobot.getRobotsByCode()
    const floorOfRobot = robotsByCode[String(codeReceived)].floor

    const places = await prisma.place.findMany({
      where: {
        floor: floorOfRobot,
      },
    })
    const events = await prisma.event.findMany({
      include: {
        place: true,
      },
    })

    res.status(204).end()
    await stopMoving(codeReceived)
    emitToRobot(req, codeReceived, 'changePageTo', 'listOnFloor')
    emitToRobot(req, codeReceived, 'placesOnFloor', JSON.stringify(places))
    emitToRobot(req, codeReceived, 'eventsOpened', JSON.stringify(events))
  }
})

export default router
