/** @jsx jsx  */
import React from "react";
import { css, jsx } from '@emotion/core'

import man from '../../assets/man1.png'

const wrapper = css`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`
const text = css`
  font-size: 7rem;
  grid-column: 1/3;
  grid-row: 1/3;
  margin: auto;
`
const introText = css`
  font-size: 4rem;
  grid-column: 1/3;
  grid-row: 3/5;
  // text-align: center;
  margin: auto;
`
const KYJ = css`
  position: 'relative';
  grid-column: 5/6;
  grid-row: 2/3;
`
const KHC = css`
  position: 'relative';
  grid-column: 3/4;
  grid-row: 4/5;
`
const BSH = css`
  position: 'relative';
  grid-column: 4/5;
  grid-row: 2/3;
`
const AYL = css`
  position: 'relative';
  grid-column: 4/5;
  grid-row: 3/4;
`
const LSY = css`
  position: 'relative';
  grid-column: 3/4;
  grid-row: 3/4;
`
const JHJ = css`
  position: 'relative';
  grid-column: 5/6;
  grid-row: 1;
`
const image = css`
  position: 'relative';
`

export default () => {
  return (
    <div css={wrapper}>
      <div css={text}>부릉부릉</div>
      <div css={introText}>
        Robot<br />
        김현철 이수영 안유림<br />
        {/* Communication<br />
        배성호 안유림<br /> */}
        Bixby<br />
        김윤재 배성호 장현진
      </div>
      <div css={KYJ}><img src={man} css={image} width='100%' height='100%' />김윤재</div>
      <div css={KHC}><img src={man} css={image} width='100%' height='100%'  />김현철</div>
      <div css={BSH}><img src={man} css={image} width='100%' height='100%' />배성호</div>
      <div css={AYL}><img src='/여1.png' css={image} width='100%' height='100%' />안유림</div>
      <div css={LSY}><img src={man} css={image} width='100%' height='100%' />이수영</div>
      <div css={JHJ}><img src={man} css={image} width='100%' height='100%' />장현진</div>
    </div>
  );
};