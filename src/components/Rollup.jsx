import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import block from '../assets/images/block.svg';
import cuid from 'cuid';
import rollupA from '../assets/images/rollupA.svg';
import rollupB from '../assets/images/rollupB.svg';
import axios from 'axios';
import { ROLLUP_URL } from '../assets/Data';

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
    border-radius: 4px;
    border: 1.5px solid #7AAFFF;
    box-shadow: 0px 0px 8px 0px rgba(51, 127, 241, 0.44);
  }  
  to {
    border: 1.5px solid #fff;
  }
`;

const nonTopBorderAnimation = keyframes`
from {
  border-radius: 4px;
  border: 1.5px solid #DBEAFF;
}
to {
  border: 1.5px solid #fff;
}
`;

const ListItem = styled.div`
  display: flex;
  padding: 12px;
  border: 1.5px solid #fff;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  animation: ${topBorderAnimation} 3.4s cubic-bezier(0.44, 0, 0.56, 1) forwards;
  &:nth-child(2) {
    animation: ${nonTopBorderAnimation} 3.4s cubic-bezier(0.44, 0, 0.56, 1) forwards;
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation: ${nonTopBorderAnimation} 3.4s cubic-bezier(0.44, 0, 0.56, 1) forwards;
    animation-delay: 0.4s;
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
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
`;
const BlockNumber = styled.span`
  color: #337ff1;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px; /* 85.714% */
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
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
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
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
      jsonrpc: '2.0',
      method: 'get_current_block_height',
      params: {
        rollup_id: id,
      },
      id: 1,
    };

    try {
      const response = await axios.post(ROLLUP_URL, data);
      const result = response.data.result.block_height;

      return result;
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  async function getTimestamp(id, height) {
    const data = {
      jsonrpc: '2.0',
      method: 'get_block',
      params: {
        rollup_id: id,
        block_height: height,
      },
      id: 1,
    };

    try {
      const response = await axios.post(ROLLUP_URL, data);
      console.log('this is response', response);
      const result = response.data.result.block.timestamp;

      console.log('timestamp', result);

      return result;
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  useEffect(() => {
    const makeReqs = async () => {
      try {
        const height = await getHeight(id); // Assuming getHeight is defined elsewhere
        const timestamp0 = await getTimestamp(id, height - 2); // Assuming getTimestamp is defined elsewhere
        const timestamp1 = await getTimestamp(id, height - 3);
        const timestamp2 = await getTimestamp(id, height - 4);
        console.log(Date.now(), timestamp2);

        const blocks = [
          { height: height - 2, age: Math.floor(Date.now() / 1000 - timestamp0) },
          { height: height - 3, age: Math.floor(Date.now() / 1000 - timestamp1) },
          { height: height - 4, age: Math.floor(Date.now() / 1000 - timestamp2) },
        ];

        setBlocks(blocks); // Assuming setBlocks is a state setter function defined elsewhere
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    // Call makeReqs immediately on component mount
    makeReqs();

    // Set up an interval to call makeReqs every 5 seconds
    const intervalId = setInterval(makeReqs, 7000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <RollupContainer>
      <RollupTitle src={id === 'A' ? rollupA : rollupB} alt='rollup-icon-with-rollups-title' />
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
                    <BlockNumber
                      onClick={() =>
                        window.open(`http://rollup_${id}.theradius.xyz/blocks/${blockData.height}`, '_blank')
                      }
                    >
                      {String(blockData.height).padStart(8, '0')}
                    </BlockNumber>
                  </BlockDesc>
                </IconBlock>
                <Age>
                  <AgeText>{isNaN(blockData.age) ? '...' : blockData.age} secs ago</AgeText>
                </Age>
              </ListItem>
            ))}
          </BlockList>
          <ViewAllBtn
            onClick={() => {
              window.open(`http://rollup_${id}.theradius.xyz`, '_blank');
            }}
          >
            View All
          </ViewAllBtn>
        </Container>
      </Wrapper>
    </RollupContainer>
  );
};

export default Rollup;
