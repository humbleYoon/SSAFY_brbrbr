import React, { useEffect } from 'react'
import { PageToChange, PageParams } from './RobotPage'

interface AuthCodePageParams extends PageParams {
  authCode: string
}

function AuthCodePage({
  authCode,
  socket,
  setPageToChange,
}: AuthCodePageParams) {
  useEffect(() => {
    socket.on('changePageTo', (page: PageToChange) => {
      setPageToChange(page)
    })
  })

  return <h1>{authCode}를 입력하세요</h1>
}

export default AuthCodePage
