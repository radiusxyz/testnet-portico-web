import React, { useEffect } from 'react';
import styled from 'styled-components';
import { usePortico } from '../contexts/PorticoCtx';

const StyledVideo = styled.video`
  width: 100%;
  object-position: center;
  object-fit: contain;
`;

const Second = ({ src }) => {
  const { preventNewLogs } = usePortico();
  useEffect(() => {
    preventNewLogs(false);
  }, []);
  return (
    <StyledVideo playsInline autoPlay muted loop preload='auto'>
      <source src={src} />
    </StyledVideo>
  );
};

export default Second;
