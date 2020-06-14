/** @jsx jsx  */
import React, { useState } from "react";
import { css, jsx } from '@emotion/core'

import Tutorial from './Tutorial/Tutorial'
import Select from './Tutorial/Select'
import Guide from './Tutorial/Guide'
import Move from './Tutorial/Move'
import Arrive from './Tutorial/Arrive'


const boxPadding = css`
  height: 12vw;
  width: 100%;
  visibility: hidden;
`
const romi = css`
color: purple;
`
const boxHeight = window.innerHeight - (window.innerHeight / 100 * 40)
const TestModeLCD = css`
  position: relative;
  flex: 2;
  display: inline-block;
  width: 60%;
  height: 500px;
  // height: ${boxHeight}px;
  margin: 3vw 7%;
  padding: 10px;
  box-shadow: 6px 6px 10px 0 rgb(163, 177, 198, 0.6),
   -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
  background-color: #e0e5ec;
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`
const TestModeBixby = css`
  position: relative;
  flex: 1;
  display: inline-block;
  margin: 7% 3vw 7% 0;
  width: 22%;
  height: 500px;
  background-color: black;
`


export default () => {
  const [ pageNum, setPageNum ] = useState(0)
  const [ curFloor, setCurFloor ] = useState(null)
  const [ curPlaceInfo, setCurPlaceInfo ] = useState(null)

  return (
    <React.Fragment>
      <div css={boxPadding}>영역을차지하렴</div>
      <h2>팔로팔<span css={romi}>로미</span> 맛보기!</h2>
      <div css={css`width: 100%; display: flex;`}>
        <div css={TestModeLCD}>
          {pageNum === 0 ? <Tutorial i={setPageNum} /> :
            pageNum === 1 ? <Select i={setPageNum} curfloor={setCurFloor} /> :
            pageNum === 2 ? <Guide i={setPageNum} curfloor={curFloor} curplaceinfo={setCurPlaceInfo} /> :
            pageNum === 3 ? <Move i={setPageNum} curfloor={curFloor} curplaceinfo={curPlaceInfo} /> :
            pageNum === 4 ? <Arrive i={setPageNum} curfloor={curFloor} curplaceinfo={curPlaceInfo} /> : 
          null}
        </div>
        <div css={TestModeBixby}>
          <img src='/image/bixby/authentication.png' width="100%" height="100%" />
        </div>
      </div>
    </React.Fragment>
  );
};