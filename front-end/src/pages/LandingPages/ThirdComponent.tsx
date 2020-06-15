/** @jsx jsx  */
import React from "react";
import { css, jsx } from '@emotion/core'

const wrapper = css`
  // display: grid;
  height: 100%;
  // grid-template-columns: repeat(3, 1fr);
  // grid-gap: 10px;
  // grid-template-rows: repeat(4, 1fr);
`

const boxPadding = css`
  height: 5.5vw;
  visibility: hidden;
  position: relative;
  grid-colume: 1;
  grid-row: 1 / 3
`

const tableMargin = css`
  margin: 0 auto;  
  margin-top: 100px;
  text-align: center;  
`

export default () => {
  const text = '로미를 소개합니다 \>_~'
  return (
    <div css={wrapper}>
      {/* <div css={css`position: absolute; z-index: 200;`}>
        <img src='/image/logo_lan.png' width="300px" height="200px"></img>
      </div> */}
      <div css={boxPadding}>영역을차지하렴</div>
      <h2>{text}</h2>
      
      <table css={tableMargin}>
        <td>
          <tr><div className='videoTag'> UCC 홍보 영상 </div></tr>
          <tr>
            <video controls width="350px" height="300px" css={css`margin:7px; border:none;`}>
              <source src="/video/A302_UCC_.mp4" type="video/mp4" />
            </video>
          </tr>
        </td>
        <td>
          <tr><div className='videoTag'> 로미 메이킹 필름 </div></tr>
          <tr>
            <video controls width="350px" height="300px" css={css`margin:7px; border:none;`}>
              <source src="/video/making film.mp4" type="video/mp4" />
            </video>
          </tr>
        </td>
        <td>
          <tr><div className='videoTag'> SLAM 자율주행 과정</div></tr>
          <tr>
            <video controls width="350px" height="300px" css={css`margin:7px; border:none;`}>
              <source src="/video/slam.mp4" type="video/mp4" />
            </video>
          </tr>
        </td>
        <td>
          <tr><div className='videoTag'> 실제 자율주행 영상</div></tr>
          <tr>
            <video controls width="350px" height="300px" css={css`margin:7px; border:none;`}>
              <source src="/video/move.mp4" type="video/mp4" />
            </video>
          </tr>
        </td>
      </table>      
      <div css={css`text-align: center; margin-top: 20px;`}>More ReadMe GitHub Link : https://github.com/anyl92/RomiReadme</div>
    </div>
  );
};