/** @jsx jsx  */
import React from "react";
import { css, jsx } from '@emotion/core'

import './profile.css'

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

const snip = css`
  font-family: 'Raleway', Arial, sans-serif;
  position: relative;
  margin: 10px;
  min-width: 310px -60px;
  max-width: 310px;
  width: 100%;
  color: #ffffff;
  text-align: left;
  background-color: #000000;
  font-size: 16px;

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.4s ease-in;
    transition: all 0.4s ease-in;
  }
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
      <div className="snip1273" css={KYJ}><img src='/image/KIM YOON JAE.jpg' css={image} width='100%' height='100%' />
        <figcaption>
          <h3 style={{color:'white'}}>KIM YOON JAE</h3>
          <div>Bixby Developer</div>
          <div>Back-end Developer</div>
          <br/><p>빅스비는 로컬호스트를 몰라요..</p>
        </figcaption>
      </div>
      <div className="snip1273" css={KHC}><img src='/image/KIM HYEON CHEOL.jpg' css={image} width='100%' height='100%' />
        <figcaption>
          <h3 style={{color:'white'}}>KIM HYEON CHEOL</h3>
          <div>Robot Drive</div>
          <br/><p>어이쿠</p>
        </figcaption>
      </div>
      <div className="snip1273" css={BSH}><img src='/image/BAE SEONG HO.jpg' css={image} width='100%' height='100%' />
        <figcaption>
          <h3 style={{color:'white'}}>BAE SEONG HO</h3>
          <div>Web FullStack Developer</div>
          <br/><p>다음 프로젝트는 앱으로</p>
        </figcaption> 
      </div>
      <div className="snip1273" css={AYL}><img src='/image/AN YU LIM.jpg' css={image} width='100%' height='100%' />
        <figcaption>
          <h3 style={{color:'white'}}>AN YU LIM</h3>
          <div>Robot Communication</div>
          <div>Front-end Deverloper</div>
          <br/><p>로미로미</p>
        </figcaption> 
      </div>
      <div className="snip1273" css={LSY}><img src='/image/LEE SOO YOUNG.jpg' css={image} width='100%' height='100%' />
        <figcaption>
          <h3 style={{color:'white'}}>LEE SOO YOUNG</h3>
          <div>Project Manager</div>
          <div>Robot Odometry</div>
          <br/><p>Atchacha.... 로봇은 취미로</p>
        </figcaption> 
      </div>
      <div className="snip1273" css={JHJ}><img src='/image/JANG HYEON JIN.jpg' css={image} width='100%' height='100%' />
        <figcaption>
          <h3 style={{color:'white'}}>JANG HYEON JIN</h3>
          <div>Bixby Developer</div>
          <div>Presenter</div>
          <br/><p>하이 빅스비~!</p>
        </figcaption> 
      </div>
    </div>
  );
};