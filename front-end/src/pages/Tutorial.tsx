/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { Route, Switch, Link } from 'react-router-dom'

import SelectRobotPage from './Tutorial/SelectRobotPage'
import GuidePlacePage from './Tutorial/GuidePlacePage'
import ArrivePage from './Tutorial/ArrivePage'
import EndPage from './Tutorial/EndPage'

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

export type PageToChange =
  | 'selectrobot'
  | 'guideplace'
  | 'arrive'
  | 'end'

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

function Tutorial() {
  const [pageToChange, setPageToChange] = useState<PageToChange>('selectrobot')
  const [authCode, setAuthCode] = useState('1111')
  const [destinations, setDestinations] = useState<Place[] | Event[]>([])
  const [robot, setRobot] = useState<RobotStatus>({} as RobotStatus)

  const showPage = (pageToChange: PageToChange) => {
    switch (pageToChange) {
      case 'selectrobot':
        return (
          <SelectRobotPage
            // setPageToChange={setPageToChange}
            // setRobot={setRobot}
          />
        )
      case 'guideplace':
        return (
          <GuidePlacePage
            // authCode={authCode}
            // setPageToChange={setPageToChange}
            // setDestinations={setDestinations}
          />
        )
      case 'arrive':
        return (
          <ArrivePage
            // setPageToChange={setPageToChange}
            // setDestinations={setDestinations}
          />
        )
      case 'end':
        return (
          <EndPage
            // setPageToChange={setPageToChange}
            // setDestinations={setDestinations}
          />
        )
      // default:
      //   return <WelcomePage setPageToChange={setPageToChange} />
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
          ><Link to="/tutorial">
            처음으로
          </Link></button>
        </div>

        {showPage(pageToChange)}
      </div>
    </div>
  )
}
          
export default Tutorial

  // return (
  //   <Switch>
  //     <Route path="/robotselect" component={SelectRobotPage} exact />
  //     <Route
  //       path="/guideplace"
  //       component={GuidePlacePage}
  //       exact
  //     />
  //     <Route
  //       path="/arrivepage"
  //       component={ArrivePage}
  //       exact
  //     />
  //     <Route
  //       path="/endpage"
  //       component={EndPage}
  //     />
  //   </Switch>
  // )



// export interface Event {
//   id: number
//   name: string
//   description: string
//   starttime: Date
//   endtime: Date
//   placeName: string
//   placeFloor: number
//   place?: Place
//   thumburl: string
// }



// export interface PageParams {
//   socket: SocketIOClient.Socket
//   setPageToChange: React.Dispatch<React.SetStateAction<PageToChange>>
// }


