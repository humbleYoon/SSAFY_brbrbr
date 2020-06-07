import React from 'react'
import { PageParams } from './RobotPage'

function WelcomePage({ socket, setPageToChange }: PageParams) {
  return (
    <button
      onClick={() => {
        setPageToChange('authCode')
      }}
    >
      안내 시작
    </button>
  )
}

export default WelcomePage
