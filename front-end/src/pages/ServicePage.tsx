/** @jsx jsx */
import { useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { PageToChange, PageParams } from './RobotPage'

interface Service {
  name: string
  description: string
}

const ItemStyle = css`
  width: 500px;
  height: 100px;
  margin-bottom: 15px;
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

function ListOnFloorPage({ socket, setPageToChange }: PageParams) {
  const services: Service[] = [
    {
      name: '길 안내',
      description:
        '가고자 하는 목적지를 모르겠다면 로미에게 길 안내를 부탁해보세요! 당신이 원하는 그 곳으로 쉽고 빠르게 데려다줍니다',
    },
    { name: '투어', description: '서비스 준비중입니디' },
    { name: '내맘대로 투어', description: '서비스 준비중입니다' },
  ]

  useEffect(() => {
    socket.on('changePageTo', (page: PageToChange) => {
      setPageToChange(page)
    })
  })

  return (
    <div
      css={css`
        height: 100%;
        padding: 0 30px;
        overflow-y: auto;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      <h2>원하시는 서비스를 말씀해주세요</h2>

      {services.map((service: Service, index: number) => {
        return (
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            `}
            key={index}
          >
            <div css={ItemStyle}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ListOnFloorPage
