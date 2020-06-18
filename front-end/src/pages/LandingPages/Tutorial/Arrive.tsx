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
const Thumbnail = css`
  width: 150px;
  height: 150px;
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  background-color: #e0e5ec;
  box-shadow: inset 6px 6px 10px 0 rgb(163, 177, 198, 0.6),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
`


export default function Tutorial(props:any) {
  const NextTuto = () => {
    props.i(2)
  }

  const StartTuto = () => {
    props.i(0)
  }

  return (
    <React.Fragment>
      <div css={homeButton} onClick={StartTuto}>처음으로</div>
      <h3 css={css`text-align: center`}>목적지에 도착했습니다</h3>
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          margin-bottom: 6px;
        `}
      >
        <img css={Thumbnail} src={props.curplaceinfo.thumburl} alt={props.curplaceinfo.name} />
        <div css={ItemStyle}>
          <h3>{`@ ${props.curfloor}층 ${props.curplaceinfo.name}`}</h3>
          <p>{props.curplaceinfo.description}</p>
        </div>
      </div>
    </React.Fragment>
  )
}