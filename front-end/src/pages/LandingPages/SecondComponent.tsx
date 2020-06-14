/** @jsx jsx  */
import React from "react";
import { css, jsx } from '@emotion/core'

const videoMg = css`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 8vw;
  border: none;
`

export default () => {
  return (
    <React.Fragment css={css`position: relative;`}>
      <video loop autoPlay css={videoMg}>
        <source src="/landing2.mp4" type="video/mp4" />
      </video>
    </React.Fragment>
  );
};