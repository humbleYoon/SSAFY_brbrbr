/** @jsx jsx  */
import React from "react";
import { Carousel } from 'react-bootstrap'
import { css, jsx } from '@emotion/core'

import 'bootstrap/dist/css/bootstrap.min.css';
import faceImg from '../../assets/face.gif'

const carousel = css`
  width: 80%;
  height: 80%;
`

const divSize = css`
  color: black;
`

export default () => {
  return (
    <div className="component fourth-component">
      {/* slide true로 주면 애니메이션 실행 시 사진 커지는 현상 발생 */}
      <Carousel slide={false} interval={null} css={carousel}> 
        <Carousel.Item>
          <div>
            <img
              className=""
              src={faceImg}
              alt="First slide"
              width="100px" height='400px'
            />
            <img
              className=""
              src={faceImg}
              alt="First slide"
              width="100px" height='600px'
            />
          </div>
          <Carousel.Caption>
            <h3>1. 테스트 모드 진입하기를 누른다.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={faceImg}
            alt="Second slide"
            width='100%' height='500px'
          />
          <Carousel.Caption>
            <h3>2. 사용할 로봇을 선택한다.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={faceImg}
            alt="Third slide"
            width='100%' height='500px'
            />
          <Carousel.Caption>
            <h3>3. 안내 받을 장소를 고른다. </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={faceImg}
            alt="Second slide"
            width='100%' height='500px'
          />
          <Carousel.Caption>
            <h3>4. 도착 버튼을 누른다.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={faceImg}
            alt="Second slide"
            width='100%' height='500px'
          />
          <Carousel.Caption>
            <h3>5. 새로운 안내를 받을 지, 종료할 지 선택한다.</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
  );
};