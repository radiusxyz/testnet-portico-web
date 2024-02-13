import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import block from '../assets/images/block.svg';
import cuid from 'cuid';
import rollupA from '../assets/images/rollupA.svg';
import rollupB from '../assets/images/rollupB.svg';
import axios from 'axios';
const url = import.meta.env.VITE_INFLUXDB_URL;

const RollupContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 364px;
`;

const RollupTitle = styled.img``;

const Wrapper = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
  padding: 12px;
  background: transparent;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  padding: 32px 24px 24px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  border-radius: 12px;
  border: 1px solid rgba(9, 10, 15, 0.08);
  background: var(--white-100, #fff);
  box-shadow: 0px 2px 3px 0px rgba(9, 10, 15, 0.1);
`;

const ListTitle = styled.p`
  color: #090a0f;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
  line-height: 12px;
  margin-bottom: 12px;
`;

const BlockList = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  align-self: stretch;
  margin-bottom: 20px;

  border-radius: 6px;
  border: 1px solid rgba(9, 10, 15, 0.08);
  background: var(--white-100, #fff);
`;

const topBorderAnimation = keyframes`
  from {
    border: 1.5px solid #fff;
  }
  to {
    border-radius: 4px;
    border: 1.5px solid #7AAFFF;
    box-shadow: 0px 0px 8px 0px rgba(51, 127, 241, 0.44);
  }
`;

const nonTopBorderAnimation = keyframes`
from {
  border: 1px solid #fff;
}
to {
  border-radius: 4px;
  border: 1px solid #DBEAFF;
}
`;

const ListItem = styled.div`
  display: flex;
  padding: 12px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  animation: ${topBorderAnimation} 1.4s cubic-bezier(0.44, 0, 0.56, 1) forwards;
  &:not(:first-child) {
    animation: ${nonTopBorderAnimation} 1.4s cubic-bezier(0.44, 0, 0.56, 1) forwards;
  }
`;

const IconBlock = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const BlockDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const BlockText = styled.span`
  color: #090a0f;
  font-family: Manrope;
  font-size: 14px;
  font-weight: 600;
  line-height: 12px; /* 85.714% */
`;
const BlockNumber = styled.span`
  color: #337ff1;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px; /* 85.714% */
`;

const Age = styled.div`
  display: flex;
  padding: 6px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 4px;
  border: 1px solid rgba(9, 10, 15, 0.08);
`;

const AgeText = styled.span`
  color: #090a0f;
  text-align: center;
  font-family: Manrope;
  font-size: 12px;
  font-weight: bold;
  line-height: 20px; /* 166.667% */
`;

const ViewAllBtn = styled.button`
  color: var(--white-100, #fff);
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px; /* 171.429% */

  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border: none;
  border-radius: 6px;
  background: #090a0f;
  &:hover {
    cursor: pointer;
    background: #25272f;
  }
`;

const Rollup = ({ id }) => {
  const [blocks, setBlocks] = useState([]);

  async function getHeight(id) {
    const data = {
      id,
    };

    try {
      const response = await axios.post(`${url}/getHeight`, data);
      const result = response.data;

      console.log(result);
      return result;
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  async function getTimestamp(id, height) {
    const data = {
      height,
      id,
    };

    try {
      const response = await axios.post(`${url}/getTimestamp`, data);
      const result = response.data;

      console.log('this is the result', result);
      return result;
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  useEffect(() => {
    const makeReqs = async () => {
      const height = await getHeight(id);
      const block0 = await getTimestamp(id, height);
      const block1 = await getTimestamp(id, height - 1);
      const block2 = await getTimestamp(id, height - 2);
      console.log(block0.timestamp);
      const blocks = [
        { height: height, age: Math.floor((Date.now() - block0.timestamp) / 1000) },
        { height: height - 1, age: Math.floor((Date.now() - block1.timestamp) / 1000) },
        { height: height - 2, age: Math.floor((Date.now() - block2.timestamp) / 1000) },
      ];
      setBlocks(blocks);
    };
    makeReqs();
  }, []);

  return (
    <RollupContainer>
      <RollupTitle src={id === 0 ? rollupA : rollupB} alt='rollup-icon-with-rollups-title' />
      <Wrapper>
        <Container>
          <ListTitle>Latest Blocks</ListTitle>
          <BlockList>
            {blocks.map((blockData) => (
              <ListItem key={cuid()}>
                <IconBlock>
                  <img src={block} alt='cube' />
                  <BlockDesc>
                    <BlockText>Block</BlockText>
                    <BlockNumber>{String(blockData.height).padStart(8, '0')}</BlockNumber>
                  </BlockDesc>
                </IconBlock>
                <Age>
                  <AgeText>{blockData.age} secs ago</AgeText>
                </Age>
              </ListItem>
            ))}
          </BlockList>
          <ViewAllBtn>View All</ViewAllBtn>
        </Container>
      </Wrapper>
    </RollupContainer>
  );
};

export default Rollup;
