/** @jsx jsx */
import { useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { PageToChange, PageParams, Place, Event } from './RobotPage'

interface AuthCodePageParams extends PageParams {
  authCode: string
  setDestinations: React.Dispatch<React.SetStateAction<Place[] | Event[]>>
}
const Code = css`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  font-weight: 500;
  /* margin: 4px; */
  margin-left: 50px;
  background-color: #e0e5ec;
  box-shadow: inset 6px 6px 10px 0 rgb(163, 177, 198, 0.6),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
`

function AuthCodePage({
  authCode,
  socket,
  setPageToChange,
  setDestinations,
}: AuthCodePageParams) {
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
      <h1
        css={css`
          text-align: center;
          margin-bottom: 40px;
        `}
      >
        빅스비에 입력해주세요
      </h1>
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          padding: 0 60px;
        `}
      >
        {authCode.split('').map((ch: string, index: number) => {
          return (
            <div css={Code} key={index}>
              {ch}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AuthCodePage
