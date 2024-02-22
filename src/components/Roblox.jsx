import React from 'react';
import styled from 'styled-components';

import Rollup from './Rollup.jsx';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 632px;
  justify-content: center;
  align-items: center;
  gap: 44px;
  background: linear-gradient(
    7.07639e-7deg,
    rgba(0, 4, 255, 0.6) -60.4811%,
    rgba(0, 140, 124, 0.16) 31.1743%,
    rgba(25, 156, 140, 0) 64.6344%
  );
`;

const RollupsWrapper = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  justify-content: center;
`;

const BottomText = styled.p`
  font-family: 'area-normal';
  color: rgba(255, 255, 255, 0.88);
  font-size: 16px;
  font-weight: 600;
  line-height: 14px; /* 87.5% */
`;

const Roblox = () => {
  return (
    <ContentWrapper>
      <RollupsWrapper>
        <Rollup id={'A'} />
        <Rollup id={'B'} />
      </RollupsWrapper>
      <BottomText>Shared sequencer sends blocks to rollup operators</BottomText>
    </ContentWrapper>
  );
};

export default Roblox;
