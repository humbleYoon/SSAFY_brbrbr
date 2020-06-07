import React, { useState, useEffect } from 'react'
import { PageToChange, PageParams, Place, Event } from './RobotPage'

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
    <div>
      <h2>이 층에서 갈 수 있는 장소</h2>
      <ul>
        {placesOnFloor.map((elem: Place, index: number) => (
          <li key={index}>{elem.name}</li>
        ))}
      </ul>
      <h2>오늘 열리는 행사</h2>
      <ul>
        {eventsOpened.map((elem: Event, index: number) => (
          <li key={index}>{elem.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ListOnFloorPage
