import React from 'react';

import styled from 'styled-components';
import mev from '../assets/videos/mev.mp4';
const StyledVideo = styled.video`
  width: 100%;
  object-position: center;
  object-fit: contain;
`;
import { usePortico } from '../contexts/PorticoCtx';
const Second = () => {
  const { videoSrc } = usePortico();
  return (
    <StyledVideo playsInline autoPlay muted loop preload='auto'>
      <source src={videoSrc} />
    </StyledVideo>
  );
};

export default Second;
