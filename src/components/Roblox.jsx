import React, { useEffect } from 'react';
import styled from 'styled-components';
import block from '../assets/images/block.svg';
import cuid from 'cuid';
import rollupA from '../assets/images/rollupA.svg';
import rollupB from '../assets/images/rollupB.svg';
import axios from 'axios';
const url = import.meta.env.VITE_INFLUXDB_URL;
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

const blocksA = [
  { rollup: 'A', number: 1, age: 15 },
  { rollup: 'A', number: 2, age: 10 },
  { rollup: 'A', number: 3, age: 5 },
];

const blocksB = [
  { rollup: 'B', number: 1, age: 9 },
  { rollup: 'B', number: 2, age: 6 },
  { rollup: 'B', number: 3, age: 3 },
];

const Roblox = () => {
  return (
    <ContentWrapper>
      <RollupsWrapper>
        <Rollup id={0} />
        <Rollup id={1} />
      </RollupsWrapper>
      <BottomText>Shared sequencing layer is ordering transactions for Rollup A and B</BottomText>
    </ContentWrapper>
  );
};

export default Roblox;
