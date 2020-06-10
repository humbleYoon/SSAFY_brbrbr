import React, { useState, useEffect } from 'react'
import * as tmImage from '@teachablemachine/image'

export default function WelcomePage() {
  const [openVal, setOpenVal] = useState(false)

  const URL = 'https://teachablemachine.withgoogle.com/models/YiDy9A8rs/'
  let model: tmImage.CustomMobileNet
  let webcam: tmImage.Webcam
  let labelContainer
  let maxPredictions

  useEffect(() => {
    init()
  }, [])

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

    document.getElementById('webcam-container')?.appendChild(webcam.canvas)
    labelContainer = document.getElementById('label-container')
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer?.appendChild(document.createElement('div'))
    }
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
      // labelContainer.childNodes[0].innerHTML = '열어줘라!'};
    } else {
      setOpenVal(false)
    }
  }

  return (
    <div>
      <div id="webcam-container"></div>
      <div id="label-container">{openVal ? '열어줘라!' : '잠김'}</div>
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
    </div>
  )
}
