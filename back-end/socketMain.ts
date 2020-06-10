import socketio from 'socket.io'
import redisRobot from './redis/robot'
import client from './redis/client'

const socketMain = async (io: socketio.Server, socket: socketio.Socket) => {
  console.log(socket.id, '클라이언트와 연결되었습니다')

  try {
    const robotsNotOnService = await redisRobot.getRobotsNotOnService()
    io.to(socket.id).emit(
      'robots-available',
      JSON.stringify(robotsNotOnService)
    )

    socket.on('robotName', async (robotName) => {
      const robotsByCode = await redisRobot.getRobotsByCode()
      const robotCodes = Object.keys(robotsByCode)

      const robotCodeToConnect = robotCodes?.filter(
        (robotCode) => robotsByCode[robotCode].name === robotName
      )[0]

      robotsByCode[robotCodeToConnect].socketId = socket.id
      robotsByCode[robotCodeToConnect].onService = true
      client.set('robot', JSON.stringify(robotsByCode))

      io.to(socket.id).emit('authCode', robotCodeToConnect)
      io.to(socket.id).emit('changePageTo', 'welcome')
    })
  } catch (error) {
    console.error(error)
  }
}

export default socketMain
