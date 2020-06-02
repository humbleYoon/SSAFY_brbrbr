import express from 'express'
import prisma from '../prisma/client'
import { client as redis, getRobots, RobotsByCode } from '../redis/client'
import getRandomCode from '../utils/getRandomCode'

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
      floor,
    },
  })

  res.send(robot)

  getRobots()
})

router.post('/auth', async (req, res) => {
  const {
    inputAuthenticationCode: codeReceived,
  }: { inputAuthenticationCode: string } = req.body

  redis.get('robot', (err, robots) => {
    if (!err) {
      const robotCodes = Object.keys(JSON.parse(robots))
      const isHere = Boolean(robotCodes.includes(codeReceived))

      res.send({
        isAuthenticated: isHere,
      })
    }
  })
})

router.get('/arrived', async (req, res) => {
  const codeReceived = req.header('authCode')!

  redis.get('robot', (err, robots) => {
    if (!err) {
      const robotStatus = JSON.parse(robots)
      const robotRequested = robotStatus[codeReceived]

      if (robotRequested) {
        res.send({
          isArrived: robotRequested.status === '도착',
        })
      } else {
        res.status(400).end()
      }
    }
  })
})

router.get('/finished', async (req, res) => {
  const codeReceived = req.header('authCode')!

  redis.get('robot', (err, robots) => {
    if (!err) {
      const robotStatus = JSON.parse(robots)
      const robotRequested = robotStatus[codeReceived]
      robotRequested.status = '대기'
      const robotCodes = Object.keys(JSON.parse(robots))

      const newRobotStatus = {} as RobotsByCode
      robotCodes
        .filter((code) => code !== codeReceived)
        .forEach((code) => {
          newRobotStatus[code] = robotStatus[code]
        })

      newRobotStatus[getRandomCode(1000, 9000, robotCodes)] = robotRequested
      redis.set('robot', JSON.stringify(newRobotStatus))

      res.status(204).end()
    }
  })
})

// router.post('/start-guide', async (req, res) => {
//     const codeReceived = Number(req.header('authCode'))

//     redis.get('robot', (err, robots) => {
//         if (!err) {
//           const robotStatus = JSON.parse(robots)

//           if (robotRequested) {
//               res.status(204).end()
//               robotStatus[codeReceived].status = '이동중'
//             await setTimeout(() => {
//                 robotStatus[codeReceived].status = '도착'
//             }, 10000)
//           } else {
//             res.status(400).end()
//           }
//         }
//       })
// })

// router.post('/finish-guide', async (req, res) => {
//     const codeReceived = Number(req.header('authCode'))

//     redis.get('robot', (err, robots) => {
//         if (!err) {
//           const robotStatus = JSON.parse(robots)

//           if (robotRequested) {
//               res.status(204).end()
//               robotStatus[codeReceived].status = '이동중'
//             await setTimeout(() => {
//                 robotStatus[codeReceived].status = '도착'
//             }, 10000)
//           } else {
//             res.status(400).end()
//           }
//         }
//       })
// })

// router.get('/status', async (req, res) => {
//     const codeReceived = req.header('authCode')

//     redis.get('robot', (err, robots) => {
//       if (!err) {
//         const robotStatus = JSON.parse(robots)
//         const robotRequested = robotStatus[String(codeReceived)]

//         if (robotRequested) {
//           res.send({
//             status: robotRequested.status,
//           })
//         } else {
//           res.status(400).end()
//         }
//       }
//     })
//   })

export default router
