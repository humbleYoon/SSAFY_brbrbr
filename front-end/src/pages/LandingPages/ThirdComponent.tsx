  
import React from "react";

export default () => {
  const text = '영상으로 구경해보시죠 \>_~'
  return (
    <div>
      <h2>{text}</h2>
      <div className='videoTag'>동영상</div>
    </div>
  );
};