import { Request, Response, NextFunction } from 'express'
import redisRobot from '../redis/robot'

async function validateCode(req: Request, res: Response, next: NextFunction) {
  const robotCodes = await redisRobot.getRobotCodes()
  const codeReceived = req.header('authCode')!

  if (codeReceived) {
    if (robotCodes!.includes(codeReceived)) {
      next()
    } else {
      return res.status(400).send('인증번호를 확인해주세요')
    }
  } else {
    next()
  }
}
export default validateCode
