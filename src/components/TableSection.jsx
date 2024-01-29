import React from 'react';
import styled from 'styled-components';
import refresh from '../assets/images/refresh.svg';

const Container = styled.div`
  padding: 75px 90px 0;
`;

const LabTabButWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

const LabBut = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.p`
  color: rgba(255, 255, 255, 0.92);
  font-family: 'area-variable';
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
`;

const Button = styled.button`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  border: 1px solid #fff;
  background: #090a0f;
  cursor: pointer;
`;

const BtnTxt = styled.span`
  color: #fff;
  font-family: 'area-variable';
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
`;

const TableWrapper = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: transparent;
`;

const Table = styled.div``;
const Row = styled.div``;
const Cell = styled.div``;

const data = [
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
  {
    txHash: '{{Transaction hash}}',
    rollup: 'Rollup {{A}}',
    block: '{{18969422}}',
    order: 'Order {{1}}',
    age: '{{20}} seconds age',
  },
];

const TableSection = () => {
  return (
    <Container>
      <LabTabButWrapper>
        <LabBut>
          <Label>Shared sequencing layer orders transactions received for Rollups A and B</Label>
          <Button>
            <BtnTxt>Refresh</BtnTxt>
            <img src={refresh} />
          </Button>
        </LabBut>
        <TableWrapper></TableWrapper>
      </LabTabButWrapper>
    </Container>
  );
};

export default TableSection;
