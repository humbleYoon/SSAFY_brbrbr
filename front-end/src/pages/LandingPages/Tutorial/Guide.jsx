/** @jsx jsx  */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'


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
  padding: 10px;
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

export default function Tutorial(props) {
  const NextTuto = (info) => {
    props.curplaceinfo(info)
    props.i(3)
  }

  const StartTuto = () => {
    props.i(0)
  }

  const seven = [
    {name: '701호 강의장', description: '2기 1반 교육생들이 강의를 들었던 교육장입니다.', thumburl: 'https://i.imgur.com/UKiGiUG.jpg?2'},
    {name: '703호 강의장', description: '2기 3반 교육생들이 강의를 들었던 교육장입니다.', thumburl: 'https://i.imgur.com/fNQRi6e.jpg?1'},
    {name: '휴게실', description: '싸피 교육생들이 편하게 쉴 수 있는 휴게실입니다. 소소하게 모여서 담소를 나눌 수 있는 밀폐된 공간도 마련돼 있습니다.', thumburl: 'https://i.imgur.com/K6OJUc3.jpg?1'},
    {name: '화장실', description: '7층 화장실입니다. 따뜻한 물이 잘 나옵니다.', thumburl: 'https://i.imgur.com/JZoathr.jpg?1'}
  ]
  const nine = [
    {name: '싸피 사무국', description: '싸피 교육을 운영하시는 운영프로님들께서 일하시는 사무실입니다. 교육생을 위해 열심히 일해주시는 모든 프로님들 파이팅!', thumburl: 'https://i.imgur.com/H0ROApz.jpg?1'},
    {name: '회의실', description: '공간도 넓고 전망도 좋은 회의실입니다.', thumburl: 'https://i.imgur.com/5jnjSzq.jpg?1'},
    {name: '화장실', description: '9층 화장실입니다. 차가운 물이 잘 나옵니다.', thumburl: 'https://i.imgur.com/JZoathr.jpg?1'}
  ]
  const ten = [
    {name: '1번 상담실', description: '프로님들께 상담을 신청하면 상담을 받을 수 있는 공간입니다.', thumburl: 'https://i.imgur.com/fEpyJXt.jpg?2'},
    {name: '휴게실', description: '20명 이상이 앉아 편하게 얘기를 나눌 수 있는 휴게 공간입니다. 안쪽으로는 방으로 공간이 나누어져 있습니다.', thumburl: 'https://i.imgur.com/Iq8JNTf.jpg?1'},
    {name: '화장실', description: '10층 화장실입니다. 깨끗한 화장실입니다.', thumburl: 'https://i.imgur.com/JZoathr.jpg?1'}
  ]
  const eleven = [
    {name: '1101호 강의장', description: '싸피 2기 학생들이 프로젝트를 진행했던 토의형 강의실입니다. 팀원들과 마주보고 자유롭게 소통이 가능한 형태로 되어있습니다.', thumburl: 'https://i.imgur.com/nIMJVB7.jpg?1'},
    {name: '1102호 라이브 방송 강의장', description: '원래는 싸피 2기 학생들이 프로젝트를 진행했던 강의실입니다. 하지만 현재는 코로나로 인해 싸피 유튜브 라이브 강의장으로 활용되고 있습니다.', thumburl: 'https://i.imgur.com/fTQ4tas.jpg?1'},
    {name: '싸피 게시판', description: '싸피와 관련한 여러 정보들을 볼 수 있는 공간입니다. 교육생 현황, 수상 내역, 명예의 전당 등이 게시되어 있습니다.', thumburl: 'https://i.imgur.com/k2Xn0wZ.jpg?1'},
    {name: '싸피 프로젝트 존', description: '싸피 학생들이 진행했던 공통, 특화, 심화 프로젝트 서비스를 사용해볼 수 있는 공간입니다. 그곳에서 저를 보게 될 지도 몰라요!', thumburl: 'https://i.imgur.com/TykIemF.jpg?1'},
    {name: '도전하는 청춘들', description: '자랑스러운 싸피인들의 얼굴을 볼 수 있는 공간입니다. 제 얼굴도 한 번 찾아봐주세요.', thumburl: 'https://i.imgur.com/8IPWQ1Q.jpg?1'},
    {name: '화장실', description: '다른분들을 배려해 화장실을 깨끗하게 사용해주세요.', thumburl: 'https://i.imgur.com/UKiGiUG.jpg?2'}
  ]
  const eighteen = [
    {name: '강당 출입구', description: '강당 뒤쪽으로 들어가는 출입구입니다. 편안한 의자와 함께 무대를 볼 수 있는 강당으로 들어와주세요.', thumburl: 'https://i.imgur.com/SNTXeTD.jpg?1'},
    {name: '무대 쪽 입구', description: '강당 앞쪽으로 들어가는 무대 방향 입구입니다. 주로 관계자분들이나 강사분들이 이동하시는 공간입니다.', thumburl: 'https://i.imgur.com/PX475xq.jpg?1'},
  ]
  const twenty = [
    {name: '식당', description: '멀티캠퍼스에 맛있는 식사를 할 수 있는 공간입니다. 20층에서 바라보는 서울 도심의 아름다운 뷰와 함께 맛점 하세요.', thumburl: 'https://i.imgur.com/izkGgjj.jpg?1'},
  ]

  const floorList = [7, 9, 10, 11, 18, 20]
  const floorInfo = [seven, nine, ten, eleven, eighteen, twenty]

  const event = {name: '수료식', description: '	싸피 2기 학생들의 수료식이 진행됩니다. 1년 동안 성실히 교육 과정을 이수한 싸피인들에게 축하 부탁드립니다.',
    date: '2020-06-22', placeName: '강당 출입구', placeFloor: 18, thumburl: 'https://i.imgur.com/bOxqE6x.png' }

  return (
    <React.Fragment>
      <div css={homeButton} onClick={StartTuto}>처음으로</div>
      <h2>이 층에서 갈 수 있는 장소</h2>
      {floorList.map((floor, i) => {
        if (floor === props.curfloor) { return (
          floorInfo[i].map((info) => (
            <div css={css`
              display: flex;
              justify-content: space-around;
              margin-bottom: 5px;
            `}>
              <img height={100} width={100} css={Thumbnail} src={info.thumburl} alt={info.name} />
              <div css={ItemStyle} onClick={() => NextTuto(info)}>
                <h3>{`${floor}층 ${info.name}`}</h3>
                <p>{info.description}</p>
              </div>
            </div>
          ))
        )}
      })}
      <hr></hr>
      <h2>예정된 행사</h2>
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          margin-bottom: 5px;
        `}
      >
        <img height={100} width={100} css={Thumbnail} src={event.thumburl} alt={event.name} />
        <div css={ItemStyle}>
          <h3>{event.name}</h3>
          <h4>{`${event.date}, ${event.placeFloor}층 ${event.placeName}`}</h4>
          <p>{event.description}</p>
        </div>
      </div>
    </React.Fragment>
  )
}