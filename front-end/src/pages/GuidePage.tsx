/** @jsx jsx  */
import React, { useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { PageToChange, PageParams, Place, Event } from './RobotPage'
// import Face from '../assets/face.gif'

interface GuidePageParams extends PageParams {
  setDestinations: React.Dispatch<React.SetStateAction<Place[] | Event[]>>
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

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <img src='/image/face.gif' alt="smiley face" height={350} width={350} />
      <h2>*** 로미를 따라오세요 팔로팔로미~ ***</h2>
    </div>
  )
}

export default GuidePage
