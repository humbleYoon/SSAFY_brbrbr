import React, { useEffect } from 'react'
import { PageParams, Place, PageToChange, Event } from './RobotPage'

interface DestinationPageParams extends PageParams {
  destinations: Place | Place[] | Event | Event[]
}

function DestinationPage({
  socket,
  setPageToChange,
  destinations,
}: DestinationPageParams) {
  useEffect(() => {
    socket.on('changePageTo', (page: PageToChange) => {
      setPageToChange(page)
    })
  })
  return (
    <div>
      <h1>목적지에 도착했습니다</h1>
      <h3>{JSON.stringify(destinations)}</h3>
    </div>
  )
}

export default DestinationPage
