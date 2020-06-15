/** @jsx jsx  */
import React from "react";
import { css, jsx } from '@emotion/core'

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
  font-size: 3rem;
  grid-column: 1/3;
  grid-row: 2/5;
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
      <div css={css`position: absolute; z-index: 200;`}>
        
      </div>
      <div css={text}>
        <img src='/image/logo_lan.png' width="300px" height="200px"></img>
      </div>
      <div css={introText}>
        이수영 LEE SOO YOUNG <br />
        김현철 KIM HYEON CHEOL <br />
        김윤재 KIM YOON JAE <br /> 
        배성호 BAE SEONG HO <br />
        안유림 AN YU LIM <br />
        장현진 JANG HYEON JIN <br />
      </div>
      <div css={KYJ}><img src='/image/KIM YOON JAE.jpg' css={image} width='100%' height='100%' /></div>
      <div css={KHC}><img src='/image/KIM HYEON CHEOL.jpg' css={image} width='100%' height='100%'  /></div>
      <div css={BSH}><img src='/image/BAE SEONG HO.jpg' css={image} width='100%' height='100%' /></div>
      <div css={AYL}><img src='/image/AN YU LIM.jpg' css={image} width='100%' height='100%' /></div>
      <div css={LSY}><img src='/image/LEE SOO YOUNG.jpg' css={image} width='100%' height='100%' /></div>
      <div css={JHJ}><img src='/image/JANG HYEON JIN.jpg' css={image} width='100%' height='100%' /></div>
    </div>
  );
};