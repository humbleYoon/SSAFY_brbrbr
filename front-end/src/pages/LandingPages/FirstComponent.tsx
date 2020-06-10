/** @jsx jsx  */
import React from "react";
import { css, jsx } from '@emotion/core'


const fontPadding = css`
  padding-top: 20px;
`

export default () => {
  return (
    <div>
      <div>
        <h2>자율주행</h2>
        <h2 css={fontPadding}>안내로봇</h2>
        <h2 css={fontPadding}>「로미」</h2>
      </div>
    </div>
  );
};