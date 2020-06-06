import React, { useState, useEffect } from 'react'
import socket from '../utils/socketConn'

import HomePage from './HomePage'
import WelcomePage from './WelcomePage'
import AuthCodePage from './AuthCodePage'
import GuidePage from './GuidePage'
import ListOnFloorPage from './ListOnFloorPage'
import DestinationPage from './DestinationPage'

export type PageToChange =
  | 'home'
  | 'welcome'
  | 'authCode'
  | 'listOnFloor'
  | 'guide'
  | 'destination'

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
}

export interface Robot {
  id: number
  name: string
  floor: number
}

export interface PageParams {
  socket: SocketIOClient.Socket
  setPageToChange: React.Dispatch<React.SetStateAction<PageToChange>>
}

function RobotPage() {
  const [pageToChange, setPageToChange] = useState<PageToChange>('home')
  const [authCode, setAuthCode] = useState('1111')
  const [destinations, setDestinations] = useState<Place[]>([])

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
        return <HomePage socket={socket} setPageToChange={setPageToChange} />
      case 'authCode':
        return (
          <AuthCodePage
            authCode={authCode}
            socket={socket}
            setPageToChange={setPageToChange}
          />
        )
      case 'listOnFloor':
        return (
          <ListOnFloorPage socket={socket} setPageToChange={setPageToChange} />
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
          />
        )
      default:
        return <WelcomePage socket={socket} setPageToChange={setPageToChange} />
    }
  }
  return (
    <div className="App">
      <button
        onClick={() =>
          fetch('http://localhost:3064/robots/finished', {
            headers: {
              authCode: authCode,
            },
          }).then(() => {})
        }
      >
        처음으로
      </button>
      {showPage(pageToChange)}
    </div>
  )
}

export default RobotPage
