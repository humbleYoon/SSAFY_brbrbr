/** @jsx jsx  */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'

import faceImg from '../../../assets/face.gif'

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


export default function Tutorial(props) {
  const NextTuto = () => {
    props.i(4)
  }

  const StartTuto = () => {
    props.i(0)
  }
  
  const place = '싸피데이'

  return (
    <div>
      {props.i}
      <div css={startButton}>{place}에 이동 중이야</div>
      <div css={startButton} onClick={NextTuto}>도착하면 도착 버튼을 눌러 주세요</div>
      <img src={faceImg} css={imageSize} width="600px" height="800px" style={{margin: '0 auto'}}></img>
      <div onClick={StartTuto}>처음으로</div>
    </div>
  )
}