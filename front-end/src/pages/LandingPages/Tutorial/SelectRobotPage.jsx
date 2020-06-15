/** @jsx jsx */
import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch, Link } from 'react-router-dom'
import { css, jsx } from '@emotion/core'
import { Robot } from '../../RobotPage'
import robotApi from '../../api/robot'

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

export default function SelectRobot() {
  // const [robots, setRobots] = useState<Robot[]>([])

  useEffect(() => {
    getRobots()
  }, [])
  
  async function getRobots() {
    const res = await robotApi.fetchRobots()
    console.log(res.data, 'resdata')
    setRobots(res.data)
  }

  const robotView = () => {
    robots.map(() => {
      
    })
  }
  //   const res = axios.robotApi.fetchRobots()
  //     try {
  //       .then(setRobots(res.data))
  //     }
  //     } catch (error) {
  //       console.error(error)
  //     }
  // }, [])
  
  // const getRobots = useCallback(async () => {
  //   try {
  //     const res = await robotApi.fetchRobots()
  //     setRobots(res.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [])


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

        
        {JSON.stringify(robots)}
        {console.log(robots, '로봇 있어 없어')}
      </div>
    </div>
  );
};