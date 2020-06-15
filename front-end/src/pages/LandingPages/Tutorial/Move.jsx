/** @jsx jsx  */
import React from 'react'
import { css, jsx } from '@emotion/core'


const startButton = css`
  position: absolute;
  display: inline;
  text-align: center;
  width: 100%;
  top: 80%;
  left: 50%;
  margin-left: -100px;
  z-index: 100;
`
const Button = css`
  font-size: 20px;
  font-weight: 600;
  width: 200px;
  height: 27px;
  // margin-right: 10px;
  // margin-bottom: 20px;
  border-radius: 12px;
  background-color: #e0e5ec;
  /* background-color: #C2CBD9; */
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
  border: 2px solid black;
`
const homeButton = css`
  position: absolute;
  font-size: 20px;
  font-weight: 600;
  width: 130px;
  height: 27px;
  text-align: center;
  margin: 3% 0 30px ${390*0.2}%;
  border-radius: 12px;
  background-color: #e0e5ec;
  /* background-color: #C2CBD9; */
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
  z-index: 100;
`
const moveText = css`
  text-align: center;
  position: absolute;
  top: 85px;
  font-size: 1.7rem;
  width: 100%;
`
const imageSize = css`
  position: absolute;
  left: 50%;
  margin-left: -300px;
`


export default function Tutorial(props) {
  const NextTuto = () => {
    props.i(4)
  }

  const StartTuto = () => {
    props.i(0)
  }

  return (
    <React.Fragment>
      <div css={homeButton} onClick={StartTuto}>처음으로</div>
      {/* <div css={moveText}><span css={css`color: purple;`}>{props.curfloor}층 {props.curplaceinfo.name}</span>
        에 이동 중이야<br/>도착하면 도착 버튼을 눌러 주세요</div> */}
      <div css={startButton}>
        <span css={css`position: absolute; top: -50px; left: -25px; font-size: 1.5rem;`}>*** 로미를 따라오세요 팔로팔로미 ~ ***</span>
        <div css={Button} onClick={NextTuto}>도착</div>
      </div>
      <img src='/image/face.gif' css={imageSize} width="600px" height="400px"></img>
    </React.Fragment>
  )
}