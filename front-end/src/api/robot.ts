import client from './client'

export interface RobotInput {
  name: string
  floor: number
}

const fetchRobots = () => {
  return client.get('/robots')
}

const addRobot = (place: RobotInput) => {
  return client.post('/robots', place)
}

const deleteRobot = (robotId: number) => {
  return client.delete(`/robots/${robotId}`)
}

export default { fetchRobots, addRobot, deleteRobot }
