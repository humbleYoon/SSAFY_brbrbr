import React, { useEffect } from 'react'
import { PageToChange, PageParams, Place } from './RobotPage'

interface GuidePageParams extends PageParams {
  setDestinations: React.Dispatch<React.SetStateAction<Place[]>>
}

function GuidePage({
  socket,
  setPageToChange,
  setDestinations,
}: GuidePageParams) {
  useEffect(() => {
    socket.on('destinations', (data: string) => {
      setDestinations(JSON.parse(data))
    })

    socket.on('changePageTo', (page: PageToChange) => {
      setPageToChange(page)
    })
  })

  return <h1>이동중입니다 저를 따라오세요</h1>
}

export default GuidePage
