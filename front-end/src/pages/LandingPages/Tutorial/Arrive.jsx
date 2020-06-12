/** @jsx jsx  */
import React, { useState } from 'react'
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

const ItemStyle = css`
  width: 500px;
  height: 150px;
  padding: 10px 20px;
  overflow-y: auto;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  background-color: #e0e5ec;
  font-weight: 400;
  box-shadow: inset 6px 6px 10px 0 rgb(163, 177, 198, 0.6),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
`


export default function Tutorial(props) {
  const NextTuto = () => {
    props.i(2)
  }

  const StartTuto = () => {
    props.i(0)
  }

  const destination = { 
    name: '싸피데이', 
    description: '휴게공간', 
    placeName: '휴게실', 
    placeFloor: 7}

  return (
    <div>
      <div css={startButton} onClick={NextTuto}>도착!</div>
      <div>
        <h1>목적지에 도착했습니다</h1>
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            margin-bottom: 6px;
          `}
        >
          {/* <img css={Thumbnail} src={thumburl} alt={name} /> */}
          <div css={ItemStyle}>
            <h3>{`${destination.name} @ ${destination.placeFloor}층 ${destination.placeName}`}</h3>
            <p>{destination.description}</p>
          </div>
        </div>

      </div>
      <div onClick={StartTuto}>처음으로</div>
    </div>
  )
}