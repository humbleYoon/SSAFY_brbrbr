/** @jsx jsx */
import { useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { PageToChange, PageParams, Place, Event } from './RobotPage'

const Thumbnail = css`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e5ec;
  box-shadow: inset 6px 6px 10px 0 rgb(163, 177, 198, 0.6),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
`
const ItemStyle = css`
  width: 500px;
  height: 100px;
  padding: 10px;
  overflow-y: auto;
  -ms-overflow-style: none;

  &:: -webkit-scrollbar {
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

function ListOnFloorPage({ socket, setPageToChange }: PageParams) {
  const [placesOnFloor, setPlacesOnFloor] = useState<Place[]>([])
  const [eventsOpened, seteventsOpened] = useState<Event[]>([])

  useEffect(() => {
    socket.on('placesOnFloor', (list: string) => {
      const placesOnFloor: Place[] = JSON.parse(list)
      setPlacesOnFloor(placesOnFloor)
    })

    socket.on('eventsOpened', (list: string) => {
      const eventsOpened: Event[] = JSON.parse(list)
      seteventsOpened(eventsOpened)
    })

    socket.on('changePageTo', (page: PageToChange) => {
      setPageToChange(page)
    })
  })

  return (
    <div
      css={css`
        height: 100%;
        overflow-y: auto;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      <h2>이 층에서 갈 수 있는 장소</h2>

      {placesOnFloor.map((place: Place, index: number) => {
        const { name, description, floor, thumbUrl } = place
        return (
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            `}
            key={index}
          >
            <img css={Thumbnail} src={thumbUrl} alt={name} />
            <div css={ItemStyle}>
              <h3>이름: {name}</h3>
              <p>설명: {description}</p>
            </div>
          </div>
        )
      })}

      <h2>오늘 열리는 행사</h2>
      {eventsOpened.map((event: Event, index: number) => {
        const {
          name,
          description,
          starttime,
          endtime,
          placeName,
          placeFloor,
          thumbUrl,
        } = event
        return (
          <div
            css={css`
              display: flex;
              justify-content: space-around;
              margin-bottom: 5px;
            `}
            key={index}
          >
            <img css={Thumbnail} src={thumbUrl} alt={name} />
            <div css={ItemStyle}>
              <h3>{name}</h3>
              <h4>
                장소: `${placeFloor}층 ${placeName}`
              </h4>
              <h4>
                일시: `${starttime.toLocaleDateString()} ~ $
                {endtime.toLocaleTimeString()}`
              </h4>
              <p>설명: {description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ListOnFloorPage
