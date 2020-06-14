/** @jsx jsx  */
import React, { useState } from "react";
import { css, jsx } from '@emotion/core'

const info = css`
  display: inline-block;
  background-color: white;
`


export default () => {
  const [ isHover, setIsHover ] = useState(false);

  const HandleHover = () => {
    setIsHover(!isHover)
  }


  return (
    <div>
      {isHover ? <div><img src='/전신.png' onMouseOut={HandleHover} /> <div >소개</div></div> : 
      <img src='/전신2.png' onMouseOver={HandleHover} />}
      {/* {isHover ? <img src='/전신.png' onMouseOut={HandleHover} /> : 
      <img src='/전신2.png' onMouseOver={HandleHover} />}
      {isHover ? <img src='/전신.png' onMouseOut={HandleHover} /> : 
      <img src='/전신2.png' onMouseOver={HandleHover} />}
      {isHover ? <img src='/전신.png' onMouseOut={HandleHover} /> : 
      <img src='/전신2.png' onMouseOver={HandleHover} />} */}
      
    </div>
  )
}