import React from 'react';

const PreloadVideo = ({ src }) => (
  <div style={{ display: 'none' }}>
    <video src={src} preload='auto' />
  </div>
);

export default PreloadVideo;
