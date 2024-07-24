import React from 'react';
import styled from 'styled-components';

const StyledVideo = styled.video`
  width: 100%;
  object-position: center;
  object-fit: contain;
`;

const MevCenRes = ({ src }) => {
  return (
    <StyledVideo playsInline autoPlay muted loop preload='auto'>
      <source src={src} />
    </StyledVideo>
  );
};

export default MevCenRes;
