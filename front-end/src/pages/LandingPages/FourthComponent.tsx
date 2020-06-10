/** @jsx jsx  */
import React from "react";
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { css, jsx } from '@emotion/core'

import 'bootstrap/dist/css/bootstrap.min.css';
import faceImg from '../../assets/face.gif'

const boxPadding = css`
  height: 7vw;
  width: 100%;
  visibility: hidden;
`

const boxHeight = window.innerHeight - (window.innerHeight / 100 * 30)
const TestModeBox = css`
  display: table;
  width: 80%;
  height: ${boxHeight}px;
  margin: 3vw auto;
  box-shadow: 6px 6px 10px 0 rgb(163, 177, 198, 0.6),
   -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
`

const boxInner = css`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  position: relative;
`

const faceWidth = window.innerWidth - (window.innerWidth / 2) - 300
const imageSize = css`
  position: absolute;
  top: -20px;
  left: ${faceWidth}px;
  display: inline-block;
`

const startButton = css`
  position: absolute;
  left: 46%;
  top: 80%;
  z-index: 100;
`

const romi = css`
  color: purple;
`


export default () => {
  return (
    <div>
      <div css={boxPadding}>영역을차지하렴</div>
      <h2>팔로팔<span css={romi}>로미</span> 맛보기!</h2>
      <div css={TestModeBox}>
        <div css={boxInner}>
          <Link to="/selectrobot" css={startButton}>테스트 모드 시작</Link>
          <img src={faceImg} css={imageSize} width="600px" height="800px" style={{margin: '0 auto'}}></img>
        </div>
      </div>
    </div>
  );
};



// const carousel = css`
//   width: 80%;
//   height: 80%;
// `
// const divSize = css`
//   color: black;
// `

// {/* slide true로 주면 애니메이션 실행 시 사진 커지는 현상 발생 */}
// <Carousel slide={false} interval={null} css={carousel}> 
// <Carousel.Item>
//   <div>
//     <img
//       className=""
//       src={faceImg}
//       alt="First slide"
//       width="100px" height='400px'
//     />
//     <img
//       className=""
//       src={faceImg}
//       alt="First slide"
//       width="100px" height='600px'
//     />
//   </div>
//   <Carousel.Caption>
//     <h3>1. 테스트 모드 진입하기를 누른다.</h3>
//   </Carousel.Caption>
// </Carousel.Item>
// <Carousel.Item>
//   <img
//     className="d-block w-100"
//     src={faceImg}
//     alt="Second slide"
//     width='100%' height='500px'
//   />
//   <Carousel.Caption>
//     <h3>2. 사용할 로봇을 선택한다.</h3>
//   </Carousel.Caption>
// </Carousel.Item>
// <Carousel.Item>
//   <img
//     className="d-block w-100"
//     src={faceImg}
//     alt="Third slide"
//     width='100%' height='500px'
//     />
//   <Carousel.Caption>
//     <h3>3. 안내 받을 장소를 고른다. </h3>
//   </Carousel.Caption>
// </Carousel.Item>
// <Carousel.Item>
//   <img
//     className="d-block w-100"
//     src={faceImg}
//     alt="Second slide"
//     width='100%' height='500px'
//   />
//   <Carousel.Caption>
//     <h3>4. 도착 버튼을 누른다.</h3>
//   </Carousel.Caption>
// </Carousel.Item>
// <Carousel.Item>
//   <img
//     className="d-block w-100"
//     src={faceImg}
//     alt="Second slide"
//     width='100%' height='500px'
//   />
//   <Carousel.Caption>
//     <h3>5. 새로운 안내를 받을 지, 종료할 지 선택한다.</h3>
//   </Carousel.Caption>
// </Carousel.Item>
// </Carousel>