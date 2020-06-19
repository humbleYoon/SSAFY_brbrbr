import express from 'express'
import prisma from '../prisma/client'
import redisRobot from '../redis/robot'
import redis from '../redis/client'
import { emitToRobot } from './helpers'
import validateCode from '../middlewares/validateCode'
import { moveTo } from '../robot/mock'
import { Log } from '../models/log'

const router = express.Router()

router.get('/', validateCode, async (req, res) => {
  const codeReceived = req.header('authCode')
  const eventName = req.query.name as string

  if (codeReceived) {
    // 로봇 인증 번호가 함께 올 때

    const robotsByCode = await redisRobot.getRobotsByCode()
    const robot = robotsByCode[String(codeReceived)]

    if (eventName) {
      // 특정 행사 요청이 들어오면 해당 행사 데이터와 행사가 열리는 장소 데이터를 보내준다
      try {
        const events = await prisma.event.findMany({
          where: {
            name: eventName.replace('+', ' ') as string,
          },
          include: {
            place: true,
          },
        })

        if (events.length > 0) {
          res.send(events)

          moveTo(codeReceived, [events[0].place.xaxis, events[0].place.yaxis])

          robot.destination = events[0].place.name
          redis.set('robot', JSON.stringify(robotsByCode))

          const log = Log.build({
            robotName: robot.name,
            destination: events[0].place.name,
            status: '출발',
          })
          await log.save()

          emitToRobot(req, codeReceived, 'changePageTo', 'guide')
          emitToRobot(req, codeReceived, 'destinations', JSON.stringify(events))
        } else {
          res.send(events)
          emitToRobot(req, codeReceived, 'changePageTo', 'destination')
          emitToRobot(req, codeReceived, 'destinations', JSON.stringify(events))
        }
      } catch (error) {
        console.error(error)
        res.status(400).end()
      }
    } else {
      // 전체 행사 요청이 들어오면 해당 층의 모든 행사를 보내준다
      try {
        const events = await prisma.event.findMany({
          include: {
            place: true,
          },
        })

        res.send(events)
        emitToRobot(req, codeReceived, 'changePageTo', 'listOnFloor')
        emitToRobot(req, codeReceived, 'eventsOpened', JSON.stringify(events))
      } catch (error) {
        console.error(error)
        res.status(400).end()
      }
    }
  } else {
    // 로봇 인증 번호가 함께 오지 않을 때
    const events = await prisma.event.findMany()

    res.send(events)
  }
})

router.post('/', async (req, res) => {
  const {
    name,
    description,
    starttime,
    endtime,
    placeName,
    placeFloor,
    thumburl,
  } = req.body

  try {
    const event = await prisma.event.create({
      data: {
        name,
        description,
        starttime: new Date(starttime),
        endtime: new Date(endtime),
        thumburl,
        place: {
          connect: {
            name_floor: {
              name: placeName,
              floor: Number(placeFloor),
            },
          },
        },
      },
    })

    res.send(event)
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
})

// router.put('/:id', async (req, res) => {
//   const placeId = Number(req.params.id)

//   const place = await prisma.place.update({
//     where: { id: placeId },
//     data: { ...req.body },
//   })

//   res.send(place)
// })

router.delete('/:id', async (req, res) => {
  const eventId = Number(req.params.id)

  await prisma.event.delete({
    where: { id: eventId },
  })

  res.status(204).end()
})

export default router
