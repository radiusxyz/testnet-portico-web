import React, { useEffect } from 'react';
import styled from 'styled-components';
import block from '../assets/images/block.svg';
import cuid from 'cuid';
import rollupA from '../assets/images/rollupA.svg';
import rollupB from '../assets/images/rollupB.svg';

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

const ListItem = styled.div`
  display: flex;
  padding: 12px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
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

const Rollup = ({ data }) => {
  return (
    <RollupContainer>
      <RollupTitle src={data.rollup === 'A' ? rollupA : rollupB} alt='rollup-icon-with-rollups-title' />
      <Wrapper>
        <Container>
          <ListTitle>Latest Blocks</ListTitle>
          <BlockList>
            {data.map((blockData) => (
              <ListItem key={cuid()}>
                <IconBlock>
                  <img src={block} alt='cube' />
                  <BlockDesc>
                    <BlockText>Block</BlockText>
                    <BlockNumber>{String(blockData.number).padStart(8, '0')}</BlockNumber>
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
        <Rollup data={blocksA} />
        <Rollup data={blocksB} />
      </RollupsWrapper>
      <BottomText>Shared sequencing layer is ordering transactions for Rollup A and B</BottomText>
    </ContentWrapper>
  );
};

export default Roblox;
