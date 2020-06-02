import express from 'express'
import prisma from '../prisma/client'
import { client as redis } from '../redis/client'
import { startGuide } from '../robot/mock'

const router = express.Router()

router.get('/', async (req, res) => {
  const codeReceived = req.header('authCode')
  const placeName = req.query.name as string

  if (codeReceived) {
    // 로봇 인증 번호가 함께 올 때
    redis.get('robot', async (err, robots) => {
      if (!err) {
        const robotStatus = JSON.parse(robots)
        const floorOfRobot = robotStatus[String(codeReceived)].floor
        if (placeName) {
          // 특정 장소 요청이 들어오면 해당 장소 데이터를 보내준다
          const place = await prisma.place.findOne({
            where: {
              name_floor: {
                name: placeName.replace('+', ' ') as string,
                floor: floorOfRobot,
              },
            },
          })
          if (place) {
            res.send(place)
            startGuide(codeReceived)
          } else {
            // 현재 있는 층과 다른 층에 위치한 장소를 물어보는 경우
            const places = await prisma.place.findMany({
              where: {
                floor: floorOfRobot,
              },
            })
            res.send(places)
          }
        } else {
          // 전체 장소 요청이 들어오면 해당 층의 장소를 보내준다
          const places = await prisma.place.findMany({
            where: {
              floor: floorOfRobot,
            },
          })

          res.send(places)
        }
      }
    })
  } else {
    // 로봇 인증 번호가 함께 오지 않을 때
    const places = await prisma.place.findMany()

    res.send(places)
  }
})

router.post('/', async (req, res) => {
  const { name, description, floor, xaxis, yaxis, thumburl, mapurl } = req.body

  const place = await prisma.place.create({
    data: {
      name,
      description,
      floor,
      xaxis,
      yaxis,
      thumburl,
      mapurl,
    },
  })
  res.send(place)
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
