import express from 'express'
import prisma from '../prisma/client'
import redis from '../redis/client'
import redisRobot from '../redis/robot'
import { emitToRobot } from './helpers'
import validateCode from '../middlewares/validateCode'
import { moveTo } from '../robot/mock'
import { Log } from '../models/log'

const router = express.Router()

router.get('/', validateCode, async (req, res) => {
  const codeReceived = req.header('authCode')
  const placeName = req.query.name as string

  if (codeReceived) {
    // 로봇 인증 번호가 함께 올 때

    const robotsByCode = await redisRobot.getRobotsByCode()
    const robot = robotsByCode[String(codeReceived)]
    const floorOfRobot = robot.floor

    if (placeName) {
      // 특정 장소 요청이 들어오면 해당 장소 데이터를 보내준다

      const place = await prisma.place.findMany({
        where: {
          name: placeName.replace('+', ' ') as string,
          floor: floorOfRobot,
        },
      })
      if (place.length > 0) {
        res.send(place)

        robot.destination = place[0].name
        redis.set('robot', JSON.stringify(robotsByCode))

        const log = Log.build({
          robotName: robot.name,
          destination: place[0].name,
          status: '출발',
        })
        await log.save()

        await moveTo(codeReceived, [place[0].xaxis, place[0].yaxis])
        await emitToRobot(
          req,
          codeReceived,
          'destinations',
          JSON.stringify(place)
        )
        await emitToRobot(req, codeReceived, 'changePageTo', 'guide')
      } else {
        // 현재 있는 층과 다른 층에 위치한 장소를 물어보는 경우

        const places = await prisma.place.findMany({
          where: {
            name: placeName.replace('+', ' ') as string,
          },
        })
        res.send(places)
        await emitToRobot(
          req,
          codeReceived,
          'destinations',
          JSON.stringify(places)
        )
        await emitToRobot(req, codeReceived, 'changePageTo', 'destination')
      }
    } else {
      // 전체 장소 요청이 들어오면 해당 층의 장소를 보내준다
      const places = await prisma.place.findMany({
        where: {
          floor: floorOfRobot,
        },
      })

      res.send(places)
      emitToRobot(req, codeReceived, 'changePageTo', 'listOnFloor')
      emitToRobot(req, codeReceived, 'placesOnFloor', JSON.stringify(places))
    }
  } else {
    // 로봇 인증 번호가 함께 오지 않을 때
    const places = await prisma.place.findMany()

    res.send(places)
  }
})

router.post('/', async (req, res) => {
  const { name, description, floor, xaxis, yaxis, thumburl, mapurl } = req.body
  try {
    const place = await prisma.place.create({
      data: {
        name,
        description,
        floor: Number(floor),
        xaxis: Number(xaxis),
        yaxis: Number(yaxis),
        thumburl,
        mapurl,
      },
    })
    res.send(place)
  } catch (error) {
    console.error(error)
  }
})

router.put('/:id', async (req, res) => {
  const placeId = Number(req.params.id)

  const place = await prisma.place.update({
    where: { id: placeId },
    data: { ...req.body },
  })

  res.send(place)
})

router.delete('/:id', async (req, res) => {
  const placeId = Number(req.params.id)

  await prisma.place.delete({
    where: { id: placeId },
  })

  res.status(204).end()
})

export default router
