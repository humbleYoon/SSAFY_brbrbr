import express from 'express'
import prisma from '../prisma/client'
import redisRobot from '../redis/robot'
import { emitToRobot } from './helpers'
import validateCode from '../middlewares/validateCode'
import { moveTo } from '../robot/mock'

const router = express.Router()

router.get('/', validateCode, async (req, res) => {
  /*
  1. 빅스비에서 요청이 들어온다. (param: 'name? searchTerm')
  2. 장소에 해당 파라미터로 검색한다.
  3. 행사에 해당 파라미터로 검색한다. 이 때, 장소, 행사 이름이 겹치는 경우는 데이터에 없다.
  4. data에 { places: [], events: [] } 의 형태로 보낸다.
  5. 해당 장소, 행사가 있는지 없는지, 있다면 같은층에 있는지 없는지에 따라 프론트에 이동 중, 다른 층, 없는 장소 소켓 메시지 전송
  6. 5의 결과가 이동 중이라면 로봇에도 해당 위치로 안내하라는 요청 메시지 전송
  */

  const codeReceived = req.header('authCode')
  const placeAndEventName = req.query.name as string

  if (codeReceived) {
    const robotsByCode = await redisRobot.getRobotsByCode()
    const floorOfRobot = robotsByCode[String(codeReceived)].floor

    if (placeAndEventName) {
      // 특정 장소, 행사 요청이 들어오면 해당 장소, 행사 데이터를 보내준다

      const place = await prisma.place.findMany({
        where: {
          name: placeAndEventName.replace('+', ' ') as string,
          floor: floorOfRobot,
        },
      })
      // console.log(place)
      const event = await prisma.event.findMany({
        where: {
          name: placeAndEventName.replace('+', ' ') as string,
          placeFloor: floorOfRobot,
        },
        include: {
          place: true,
        },
      })
      // console.log(event)

      if (place.length > 0 || event.length > 0) {
        // 해당 층에 장소 또는 행사 있는 경우
        if (place.length > 0) {
          res.send({ place })
          await moveTo(codeReceived, [0, 0])
          await emitToRobot(
            req,
            codeReceived,
            'destinations',
            JSON.stringify(place)
          )
        } else {
          res.send({ event })
          await moveTo(codeReceived, [0, 0])
          await emitToRobot(
            req,
            codeReceived,
            'destinations',
            JSON.stringify(event)
          )
        }
        await emitToRobot(req, codeReceived, 'changePageTo', 'guide')
      } else {
        const places = await prisma.place.findMany({
          where: {
            name: placeAndEventName.replace('+', ' ') as string,
          },
        })
        const events = await prisma.event.findMany({
          where: {
            name: placeAndEventName.replace('+', ' ') as string,
          },
          include: {
            place: true,
          },
        })

        if (places.length == 0 && events.length == 0) {
          // 없는 장소인 경우
          res.send({ places })
          await emitToRobot(
            req,
            codeReceived,
            'destinations',
            JSON.stringify(places)
          )
          await emitToRobot(req, codeReceived, 'changePageTo', 'destination')
        } else {
          // 다른 층인 경우
          if (places.length > 0) {
            res.send({ places })
            await emitToRobot(
              req,
              codeReceived,
              'destinations',
              JSON.stringify(places)
            )
            await emitToRobot(req, codeReceived, 'changePageTo', 'destination')
          } else {
            res.send({ events })
            await emitToRobot(
              req,
              codeReceived,
              'destinations',
              JSON.stringify(events)
            )
            await emitToRobot(req, codeReceived, 'changePageTo', 'destination')
          }
        }
      }
    } else {
      res.status(400).send({
        message: 'There is no query param',
      })
    }
  }
})

export default router
