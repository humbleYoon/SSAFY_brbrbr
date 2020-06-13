import React, { useEffect } from "react";

export default () => {

  useEffect (() => {
    startVideo()
  }, [])

  const startVideo = () => (
    <video autoPlay width="100%" height="100%">
      <source src="/landing2 (2).mp4" type="video/mp4" />
    </video>
  )

  return (
    <div>
    </div>
  );
};