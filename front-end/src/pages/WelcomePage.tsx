/** @jsx jsx */
import { useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { PageParams } from './RobotPage'
import * as tmImage from '@teachablemachine/image'
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
  const [openVal, setOpenVal] = useState(false)

  const URL = 'https://teachablemachine.withgoogle.com/models/YiDy9A8rs/'
  let model: tmImage.CustomMobileNet
  let webcam: tmImage.Webcam
  // let labelContainer
  let maxPredictions

  useEffect(() => {
    init()

    if (openVal) {
      setPageToChange('authCode')
    }
  }, [openVal])

  async function init() {
    const modelURL = URL + 'model.json'
    const metadataURL = URL + 'metadata.json'

    model = await tmImage.load(modelURL, metadataURL)
    maxPredictions = model.getTotalClasses()

    const flip = true
    webcam = new tmImage.Webcam(200, 200, flip)
    await webcam.setup()
    await webcam.play()
    window.requestAnimationFrame(loop)

    // document.getElementById('webcam-container')?.appendChild(webcam.canvas)
    // labelContainer = document.getElementById('label-container')
    // for (let i = 0; i < maxPredictions; i++) {
    // labelContainer?.appendChild(document.createElement('div'))
    // }
  }

  async function loop() {
    webcam.update()
    await predict()
    window.requestAnimationFrame(loop)
  }

  async function predict() {
    const prediction = await model.predict(webcam.canvas)
    if (Number(prediction[0].probability.toFixed(2)) >= 0.7) {
      setOpenVal(true)
      // labelContainer.childNodes[0].innerHTML = '????!'};
    } else {
      setOpenVal(false)
    }
  }

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
      {/* <div id="webcam-container"></div> */}
      {/* <div id="label-container">{openVal}</div> */}
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
    </div>
  )
}

export default WelcomePage
