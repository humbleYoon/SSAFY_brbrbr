import { Request, Response } from 'express'
import redisRobot from '../redis/robot'
import { PrismaClientValidationError } from '@prisma/client'

// 인증번호에 맞는 로봇에게 메시지를 전송합니다
export async function emitToRobot(
  req: Request,
  robotCode: string,
  eventName: string,
  data: string
) {
  const robotsByCode = await redisRobot.getRobotsByCode()
  const socketId = robotsByCode[robotCode].socketId

  return req.app.get('io').to(socketId).emit(eventName, data)
}

export async function validateCode(res: Response, authCode: string) {
  const robotCodes = await redisRobot.getRobotCodes()
  if (!robotCodes!.includes(authCode)) {
    return res.status(400).end()
  }
}
