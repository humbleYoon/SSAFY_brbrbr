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
  margin: 3vw 7% 3vw 0;
  width: 250px;
  height: 500px;
`
const TestModeGuide = css`
  margin-top: 10px;
  text-align: center;
  font-size: 2rem;
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
          <img src='/image/bixby/0.png' height="100%" 
            css={css`position: absolute; left: 50%; margin-left: -125px;`} />
        </div>
      </div>
      {pageNum === 0 && <div css={TestModeGuide}>현재 코로나 상황으로 인해, 로미와 여러분이 멀티캠퍼스에서 만날 수 없어요.<br/>그리운 멀티캠퍼스를 튜토리얼에서 구경해볼까요? 로미가 안내해드릴게요!</div>}
      {pageNum === 1 && <div css={TestModeGuide}>현재 멀티캠퍼스의 몇 층에서 로미를 이용하실 지 선택해 주세요!</div>}
      {pageNum === 2 && <div css={TestModeGuide}>현재 {curFloor}층에 계시군요! {curFloor}층의 장소 정보와, 모든 층에 예정된 행사 정보를 보실 수 있어요!<br/>안내받을 장소를 선택해 주세요.</div>}
      {pageNum === 3 && <div css={TestModeGuide}>{curFloor}층 {curPlaceInfo.name}에 이동 중입니다.<br/>도착하면 도착 버튼을 눌러 주세요!</div>}
      {pageNum === 4 && <div css={TestModeGuide}>{curFloor}층 {curPlaceInfo.name}에 도착 했습니다.<br/>튜토리얼은 여기까지입니다. 이용해주셔서 고마워요!</div>}
    </React.Fragment>
  );
};