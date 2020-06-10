/** @jsx jsx  */
import { useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import {
  PageParams,
  Place,
  PageToChange,
  Event as OrgEvent,
  RobotStatus,
} from './RobotPage'

interface DestinationPageParams extends PageParams {
  destinations: Place[] | OrgEvent[]
  matchedRobot: RobotStatus
}

const Thumbnail = css`
  width: 150px;
  height: 150px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e5ec;
  box-shadow: inset 6px 6px 10px 0 rgb(163, 177, 198, 0.6),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
`
const ItemStyle = css`
  width: 500px;
  height: 150px;
  padding: 10px 20px;
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
function isPlace(destinations: Place[] | OrgEvent[]): destinations is Place[] {
  return (destinations as Place[])[0].floor !== undefined
}

function DestinationPage({
  socket,
  setPageToChange,
  destinations,
  matchedRobot,
}: DestinationPageParams) {
  useEffect(() => {
    socket.on('changePageTo', (page: PageToChange) => {
      setPageToChange(page)
    })
  })
  return (
    <div>
      {destinations.length < 1 ? (
        <h1
          css={css`
            text-align: center;
          `}
        >
          목적지를 찾을 수 없습니다
        </h1>
      ) : (
        <div>
          {isPlace(destinations) ? (
            <div>
              <h2>
                {destinations[0].floor === matchedRobot.floor
                  ? '목적지에 도착했습니다'
                  : '다른 층에 있는 장소예요! 클릭해서 약도를 확인하세요'}
              </h2>
              {destinations.map((destination: Place, index: number) => {
                const {
                  name,
                  description,
                  floor,
                  thumburl,
                } = destination as Place
                return (
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-around;
                      margin-bottom: 6px;
                    `}
                    key={index}
                  >
                    <img css={Thumbnail} src={thumburl} alt={name} />
                    <div css={ItemStyle}>
                      <h3>{`${floor}층 ${name}`}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>
              <h1>
                {destinations[0].placeFloor === matchedRobot.floor
                  ? '목적지에 도착했습니다'
                  : '클릭해서 약도를 확인하세요'}
              </h1>
              {destinations.map((destination: OrgEvent, index: number) => {
                const {
                  name,
                  description,
                  placeName,
                  placeFloor,
                  thumburl,
                } = destination
                return (
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-around;
                      margin-bottom: 6px;
                    `}
                    key={index}
                  >
                    <img css={Thumbnail} src={thumburl} alt={name} />
                    <div css={ItemStyle}>
                      <h3>{`${name} @ ${placeFloor}층 ${placeName}`}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DestinationPage
