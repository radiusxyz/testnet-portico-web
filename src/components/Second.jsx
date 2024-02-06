import React from 'react';

import styled from 'styled-components';
import mev from '../assets/videos/mev.mp4';
const StyledVideo = styled.video`
  width: 100%;
  object-position: center;
  object-fit: contain;
`;

const Second = () => {
  return (
    <StyledVideo playsInline autoPlay muted loop preload='auto'>
      <source src={mev} />
    </StyledVideo>
  );
};

export default Second;
