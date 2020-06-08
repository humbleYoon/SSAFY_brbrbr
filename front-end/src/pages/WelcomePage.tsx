/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { PageParams } from './RobotPage'
import Face from '../assets/face.gif'

const Button = css`
  /* position: absolute; */
  /* margin-top: 70%; */
  font-size: 14px;
  font-weight: 600;
  width: 120px;
  height: 50px;
  font-size: 20px;
  /* margin-left: auto; */
  border-radius: 12px;
  background-color: #e0e5ec;
  /* background-color: #C2CBD9; */
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
`

function WelcomePage({ socket, setPageToChange }: PageParams) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <img src={Face} alt="smiley face" height={350} width={350} />
      <button
        css={Button}
        onClick={() => {
          setPageToChange('authCode')
        }}
      >
        안내 시작
      </button>
    </div>
  )
}

export default WelcomePage
