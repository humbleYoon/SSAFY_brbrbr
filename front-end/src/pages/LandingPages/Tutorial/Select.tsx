/** @jsx jsx  */
import React from 'react'
import { css, jsx } from '@emotion/core'


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
const homeButton = css`
  font-size: 20px;
  font-weight: 600;
  width: 130px;
  height: 27px;
  text-align: center;
  margin: 3% 0 30px 80%;
  border-radius: 12px;
  background-color: #e0e5ec;
  /* background-color: #C2CBD9; */
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
`


export default function Select(props:any) {
  const NextTuto = (robot:any) => {
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
    <button css={Button} onClick={() => NextTuto(robot)}>{`${robot.floor}층 ${robot.name} 봇`}</button>
  ))

  return (
    <React.Fragment>
      <div css={homeButton} onClick={StartTuto}>처음으로</div>
      <div css={css`text-align: center;`}>{buttonList}</div>
    </React.Fragment>
  )
}