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
const faceWidth = window.innerWidth - (window.innerWidth / 2) - 300
const imageSize = css`
  position: absolute;
  left: 50%;
  margin-left: -300px;
  // top: -20px;
  // left: ${faceWidth}px;
`

export default function Tutorial(props:any) {
  const NextTuto = () => {
    props.i(1)
  }
  
  return (
    <React.Fragment>
      <div css={startButton}>
        <div css={Button} onClick={NextTuto}>테스트 모드 시작</div>
      </div>
      <img src='/image/face.gif' css={imageSize} width="600px" height="400px"></img>
    </React.Fragment>
  )
}