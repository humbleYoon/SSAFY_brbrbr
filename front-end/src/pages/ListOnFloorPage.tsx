/** @jsx jsx */
import { useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { PageToChange, PageParams, Place, Event } from './RobotPage'

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

interface ListOnFloorPageParams extends PageParams {
  setDestinations: React.Dispatch<React.SetStateAction<Place[] | Event[]>>
}

function ListOnFloorPage({
  socket,
  setPageToChange,
  setDestinations,
}: ListOnFloorPageParams) {
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

    socket.on('destinations', (data: string) => {
      setDestinations(JSON.parse(data))
    })

    socket.on('changePageTo', (page: PageToChange) => {
      setPageToChange(page)
    })
  })

  return (
    <div
      css={css`
        height: 100%;
        padding-right: 20px;
        overflow-y: auto;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      <h2>이 층에서 갈 수 있는 장소</h2>

      {placesOnFloor.map((place: Place, index: number) => {
        const { name, description, floor, thumburl } = place
        return (
          <div
            css={css`
              display: flex;
              justify-content: space-around;
              margin-bottom: 5px;
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

      <h2>오늘 열리는 행사</h2>
      {eventsOpened.map((event: Event, index: number) => {
        const {
          name,
          description,
          starttime,
          endtime,
          placeName,
          placeFloor,
          thumburl,
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
            <img
              height={100}
              width={100}
              css={Thumbnail}
              src={thumburl}
              alt={name}
            />
            <div css={ItemStyle}>
              <h3>{name}</h3>
              <h4>{`${placeFloor}층 ${placeName}`}</h4>
              <h4>
                {`${new Date(starttime).toLocaleDateString()} ${new Date(
                  starttime
                ).toLocaleTimeString()} ~ ${new Date(
                  endtime
                ).toLocaleDateString()} ${new Date(
                  endtime
                ).toLocaleTimeString()}`}
              </h4>
              <p>{description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ListOnFloorPage
