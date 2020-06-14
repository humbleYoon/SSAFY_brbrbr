/** @jsx jsx  */
import React, { useEffect } from 'react'
import { css, jsx } from '@emotion/core'


const boxInner = css`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  position: relative;
`
const startButton = css`
  margin: 0 auto;
  text-align: center;
  width: 100%;
  height: 400px;
  // position: absolute;
  // left: 46%;
  // top: 80%;
  z-index: 100;
  display: inline-block;
`
const faceWidth = window.innerWidth - (window.innerWidth / 2) - 300
const imageSize = css`
  margin: 0 auto;
  position: absolute;
  // top: -20px;
  // left: ${faceWidth}px;
`

const Button = css`
  /* position: absolute; */
  /* margin-top: 70%; */
  font-size: 20px;
  font-weight: 600;
  width: 200px;
  height: 27px;
  margin-right: 10px;
  margin-bottom: 20px;
  border-radius: 12px;
  background-color: #e0e5ec;
  /* background-color: #C2CBD9; */
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
`

export default function Tutorial(props) {
  const NextTuto = (robot) => {
    console.log(robot)
    props.curfloor(robot.floor)
    props.i(2)
  }

  const StartTuto = () => {
    props.i(0)
  }

  const robots = [ 
    {name: '성호', floor: 7}, 
    {name: '수영', floor: 9}, 
    {name: '유림', floor: 10}, 
    {name: '윤재', floor: 11}, 
    {name: '현진', floor: 18}, 
    {name: '현철', floor: 20}, 
  ]

  const buttonList = robots.map(robot => (
    <button css={Button} onClick={() => NextTuto(robot)}>{`${robot.floor}층 ${robot.name}봇`}</button>
  ))

  return (
    <div>
      <div css={startButton}>셀렉 모드야</div>
      {buttonList}

        {/* onClick={handleClick} */}
      <div onClick={StartTuto}>처음으로</div>
    </div>
  )
}