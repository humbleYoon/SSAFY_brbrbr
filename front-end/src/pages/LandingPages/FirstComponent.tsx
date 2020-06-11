/** @jsx jsx  */
import React from "react";
import { css, jsx } from '@emotion/core'
import Logo from '../../assets/logo2.png'
import robot from '../../assets/realromi.png'

const wrapper = css`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`

const boxPadding = css`
  grid-column: 1/4;
  grid-row: 1;
  // height: 40vw;
  // visibility: hidden;
  // position: relative;
`

const fontBox = css`
  grid-column: 1/3;
  grid-row: 2/3;
  // width: 65vw;
  display: inline-block;
`

const fontPadding = css`
  padding-top: 30px;
  width: 100%;
  font-size: 5.5rem;
`

const imageBox = css`
  grid-column: 2/3;
  grid-row: 2/3;
  // width: 33vw;
  display: inline-block;
  position: absolute;
  bottom: 0px;
`

export default () => {
  return (
    <div css={wrapper}>
      <div css={boxPadding}>
        <img src={Logo} width="300px" height="200px"></img>
      </div>
      <div css={fontBox}>
        <h2 css={fontPadding}>자율주행</h2>
        <h2 css={fontPadding}>안내로봇</h2>
        <h2 css={fontPadding}>「로미」</h2>
      </div>
      <div>
        <img src={robot} alt='로봇사진' width="350px" height="600px"  css={imageBox}></img>
      </div>
    </div>
  );
};