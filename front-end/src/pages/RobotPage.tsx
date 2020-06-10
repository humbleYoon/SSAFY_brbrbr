/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import socket from '../utils/socketConn'
import { css, jsx } from '@emotion/core'
import robotApi from '../api/robot'

import HomePage from './HomePage'
import AuthCodePage from './AuthCodePage'
import GuidePage from './GuidePage'
import ListOnFloorPage from './ListOnFloorPage'
import DestinationPage from './DestinationPage'
import ServicePage from './ServicePage'
import WelcomePage from './WelcomePage'

export type PageToChange =
  | 'home'
  | 'welcome'
  | 'authCode'
  | 'listOnFloor'
  | 'guide'
  | 'destination'
  | 'service'

export interface Place {
  id: number
  name: string
  description: string
  floor: number
  xaxis: number
  yaxis: number
  thumburl: string
  mapurl: string
}

export interface Event {
  id: number
  name: string
  description: string
  starttime: Date
  endtime: Date
  placeName: string
  placeFloor: number
  place?: Place
  thumburl: string
}

export interface Robot {
  id: number
  name: string
  floor: number
}

export interface RobotStatus extends Robot {
  available?: boolean
  status?: '대기' | '이동중' | '도착'
  onService?: boolean
}

export interface PageParams {
  socket: SocketIOClient.Socket
  setPageToChange: React.Dispatch<React.SetStateAction<PageToChange>>
}

const Button = css`
  /* position: absolute; */
  /* margin-top: 70%; */
  font-size: 18px;
  font-weight: 600;
  width: 120px;
  height: 27px;
  /* margin-left: auto; */
  border-radius: 12px;
  background-color: #e0e5ec;
  /* background-color: #C2CBD9; */
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
`

function RobotPage() {
  const [pageToChange, setPageToChange] = useState<PageToChange>('home')
  const [authCode, setAuthCode] = useState('1111')
  const [destinations, setDestinations] = useState<Place[] | Event[]>([])
  const [robot, setRobot] = useState<RobotStatus>({} as RobotStatus)

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id, '로 서버와 연결되었습니다')
    })

    socket.on('changoPageTo', (page: PageToChange) => {
      setPageToChange(page)
    })

    socket.on('authCode', (authCodeFromServer: string) => {
      setAuthCode(authCodeFromServer)
    })
  }, [])

  const showPage = (pageToChange: PageToChange) => {
    switch (pageToChange) {
      case 'home':
        return (
          <HomePage
            socket={socket}
            setPageToChange={setPageToChange}
            setRobot={setRobot}
          />
        )
      case 'authCode':
        return (
          <AuthCodePage
            authCode={authCode}
            socket={socket}
            setPageToChange={setPageToChange}
            setDestinations={setDestinations}
          />
        )
      case 'listOnFloor':
        return (
          <ListOnFloorPage
            socket={socket}
            setPageToChange={setPageToChange}
            setDestinations={setDestinations}
          />
        )
      case 'guide':
        return (
          <GuidePage
            socket={socket}
            setPageToChange={setPageToChange}
            setDestinations={setDestinations}
          />
        )
      case 'destination':
        return (
          <DestinationPage
            socket={socket}
            setPageToChange={setPageToChange}
            destinations={destinations}
            matchedRobot={robot}
          />
        )
      case 'service':
        return <ServicePage socket={socket} setPageToChange={setPageToChange} />
      default:
        // return
        // return <WelcomePage />
        return <WelcomePage socket={socket} setPageToChange={setPageToChange} />
    }
  }
  return (
    <div
      css={css`
        margin: 20px;
        padding: 30px;
        width: 1024px;
        height: 600px;
        /* width: 100%;
        height: 100%; */
        display: flex;
        /* border: 1px solid black; */
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          /* position: relative; */

          margin: 50px;
          padding: 30px;
          width: 924px;
          height: 550px;
          border-radius: 4px;
          background-color: #e0e5ec;
          box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
            -9px -9px 16px rgba(255, 255, 255, 0.5);
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
          `}
        >
          <button
            css={Button}
            onClick={async () => {
              await robotApi.returnRobot(authCode)
            }}
          >
            처음으로
          </button>
        </div>

        {showPage(pageToChange)}
      </div>
    </div>
  )
}

export default RobotPage
