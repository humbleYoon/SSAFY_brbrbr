/** @jsx jsx  */
import React, { useState } from "react";
import { css, jsx } from '@emotion/core'
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';

import Tutorial from './Tutorial/Tutorial'
import Select from './Tutorial/Select'
import Guide from './Tutorial/Guide'
import Move from './Tutorial/Move'
import Arrive from './Tutorial/Arrive'


const boxPadding = css`
  height: 7vw;
  width: 100%;
  visibility: hidden;
`

const boxHeight = window.innerHeight - (window.innerHeight / 100 * 40)
const TestModeBox = css`
  width: 60%;
  height: 400px;
  // height: ${boxHeight}px;
  margin: 3vw 7%;
  // padding: auto;
  box-shadow: 6px 6px 10px 0 rgb(163, 177, 198, 0.6),
   -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
`

const romi = css`
  color: purple;
`

export default () => {
  const [ pageNum, setPageNum ] = useState(0)
  const [ selectRobot, setSelectRobot ] = useState('')
  const [ curFloor, setCurFloor ] = useState(null)
  // const [ selectPlaceName, setSelectRogot ] = useState('')
  // const [ selectPlaceDesc, setSelectRogot ] = useState('')
  // const [ selectEventName, setSelectRogot ] = useState('')
  // const [ selectEventDesc, setSelectRogot ] = useState('')

  return (
    <div>
      <div css={boxPadding}>영역을차지하렴</div>
      <h2>팔로팔<span css={romi}>로미</span> 맛보기!</h2>
      <div css={TestModeBox}>
        {pageNum}
        {pageNum === 0 ? <Tutorial i={setPageNum} /> :
          pageNum === 1 ? <Select i={setPageNum} curfloor={setCurFloor} /> :
          pageNum === 2 ? <Guide i={setPageNum} curfloor={setCurFloor} /> :
          pageNum === 3 ? <Move i={setPageNum} /> :
          pageNum === 4 ? <Arrive i={setPageNum} /> : null}
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