import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { Robot } from '../pages/RobotPage'
import robotApi, { RobotInput } from '../api/robot'

const initialState: RobotInput = {
  name: '',
  floor: 1,
}

function reducer(
  state: RobotInput,
  action:
    | (EventTarget & HTMLInputElement)
    | { type: 'reset'; name: ''; value: '' }
) {
  if (action.type === 'reset') {
    return initialState
  } else {
    return {
      ...state,
      [action.name]: action.value,
    }
  }
}

function ManageRobots() {
  const [robots, setRobots] = useState<Robot[]>([])
  const [state, dispatch] = useReducer(reducer, initialState)
  const header = ['ID', '이름', '층']

  const { name, floor } = state
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target)
  }

  const getRobots = useCallback(async () => {
    try {
      const res = await robotApi.fetchRobots()
      setRobots(res.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const postRobot = useCallback(async (state: RobotInput) => {
    try {
      const res = await robotApi.addRobot(state)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }, [])

  const deleteRobot = useCallback(async (robotId: number) => {
    try {
      await robotApi.deleteRobot(robotId)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    getRobots()
  }, [getRobots])

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const newRobot = await postRobot(state)
    setRobots((robots) => [...robots, newRobot])
    dispatch({ type: 'reset', name: '', value: '' })
  }

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLButtonElement
    const robotId = Number(target.value)

    await deleteRobot(robotId)
    setRobots((robots) =>
      robots.filter((robot) => {
        return robot.id !== robotId
      })
    )
  }

  return (
    <div>
      <h2>로봇 정보</h2>

      <table>
        <thead>
          <tr>
            {header.map((elem: string, index: number) => (
              <td key={index}>{elem}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {robots.map((robot: Robot) => (
            <tr key={robot.id}>
              {Object.values(robot).map((value: string, index: number) => (
                <td key={index}>{value}</td>
              ))}
              <td>
                <button value={robot.id} onClick={handleDelete}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <input name="name" value={name} onChange={onChange} />
            </td>
            <td>
              <input name="floor" value={floor} onChange={onChange} />
            </td>

            <td>
              <button onClick={handleClick}>등록</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ManageRobots
