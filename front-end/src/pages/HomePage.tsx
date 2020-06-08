/** @jsx jsx */
import { useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { PageToChange, PageParams } from './RobotPage'

interface RobotStatus {
  id: number
  name: string
  floor: number
  available?: boolean
  status?: '대기' | '이동중' | '도착'
  onService?: boolean
}

const Button = css`
  /* position: absolute; */
  margin: 0 auto;
  /* margin-top: 70%; */
  font-size: 14px;
  font-weight: 600;
  width: 200px;
  height: 27px;
  margin-right: 10px;
  border-radius: 12px;
  background-color: #e0e5ec;
  /* background-color: #C2CBD9; */
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
`

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
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        {robotsToMatch.map((robot) => (
          <button
            css={Button}
            key={robot.id}
            value={robot.name}
            onClick={handleClick}
          >{`${robot.floor}층에서 일하는 ${robot.name}`}</button>
        ))}
      </div>
    </div>
  )
}

export default HomePage
