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
      <video muted loop autoPlay css={videoMg}>
        <source src="/video/landing2.mp4" type="video/mp4" />
      </video>
    </React.Fragment>
  );
};