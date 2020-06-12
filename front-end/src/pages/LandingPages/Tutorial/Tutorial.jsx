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
  // height: 400px;
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
    props.i(1)
  }
  
  return (
    <div>
      {props.i}
      <div css={startButton} onClick={NextTuto}>테스트 모드 시작</div>
      <img src={faceImg} css={imageSize} width="600px" height="400px" style={{margin: '0 auto'}}></img>
    </div>
  )
}