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
  padding: 10px;
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
    props.i(3)
  }

  const StartTuto = () => {
    props.i(0)
  }

  const place = {
    name: '휴게실',
    description: '정보',
    floor: '7'}

  const event = {
    name: '싸피데이', description: '행사', starttime: '2020-06-09 12:00:00',
    endtime: '2020-06-09 12:30:00', placeName: '어딘가', placeFloor: '7'}

  return (
    <div>
      {props.curfloor}
      <div css={startButton} onClick={NextTuto}>안내 모드야!</div>

      <h2>이 층에서 갈 수 있는 장소</h2>
        
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          margin-bottom: 5px;
      `}>
        {/* <img css={Thumbnail} src={thumburl} alt={name} /> */}
        <div css={ItemStyle}>
          <h3>{`${place.floor}층 ${place.name}`}</h3>
          <p>{place.description}</p>
        </div>
      </div>

      <h2>오늘 열리는 행사</h2>

      <div
        css={css`
          display: flex;
          justify-content: space-around;
          margin-bottom: 5px;
        `}
      >
        {/* <img
          height={100}
          width={100}
          css={Thumbnail}
          src={thumburl}
          alt={name}
        /> */}
        <div css={ItemStyle}>
          <h3>{event.name}</h3>
          <h4>{`${event.placeFloor}층 ${event.placeName}`}</h4>
          <h4>
            {`${new Date(event.starttime).toLocaleDateString()} ${new Date(
              event.starttime
            ).toLocaleTimeString()} ~ ${new Date(
              event.endtime
            ).toLocaleDateString()} ${new Date(
              event.endtime
            ).toLocaleTimeString()}`}
          </h4>
          <p>{event.description}</p>
        </div>
      </div>

      <div onClick={StartTuto}>처음으로</div>
    </div>
  )
}