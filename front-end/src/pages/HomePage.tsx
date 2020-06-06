import React, { useState, useEffect } from 'react'
import { PageToChange, PageParams } from './RobotPage'

interface RobotStatus {
  id: number
  name: string
  floor: number
  available?: boolean
  status?: '대기' | '이동중' | '도착'
  onService?: boolean
}

function HomePage({ socket, setPageToChange }: PageParams) {
  const [robotsToMatch, setRobotsToMatch] = useState<RobotStatus[]>([])

  useEffect(() => {
    socket.on('robots-available', (robots: string) => {
      const robotsToMatch: RobotStatus[] = JSON.parse(robots)
      setRobotsToMatch(robotsToMatch)
    })

    socket.on('changePageTo', (page: PageToChange) => {
      setPageToChange(page)
    })
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement
    socket.emit('robotName', target.value)
  }
  return (
    <div>
      <h1>이 부릉이는 어떤 부릉이??</h1>
      {robotsToMatch.map((robot) => (
        <button
          key={robot.id}
          value={robot.name}
          onClick={handleClick}
        >{`${robot.floor}층에서 일하는 ${robot.name}`}</button>
      ))}
    </div>
  )
}

export default HomePage
