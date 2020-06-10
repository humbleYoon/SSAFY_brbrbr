/** @jsx jsx  */
import React from "react";
import { css, jsx } from '@emotion/core'

const boxPadding = css`
  height: 10vw;
  visibility: hidden;
  position: relative;
`

export default () => {
  const text = '영상으로 구경해보시죠 \>_~'
  return (
    <div>
      <div css={boxPadding}>영역을차지하렴</div>
      <h2>{text}</h2>
      <div className='videoTag'>동영상</div>
    </div>
  );
};