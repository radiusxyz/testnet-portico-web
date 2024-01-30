import React from 'react';
import styled from 'styled-components';
import refresh from '../assets/images/refresh.svg';
import cuid from 'cuid';

const Container = styled.div`
  padding: 75px 90px 0;
  width: 100%;
  background: linear-gradient(
    7.07639e-7deg,
    rgba(0, 4, 255, 0.6) -60.4811%,
    rgba(0, 140, 124, 0.16) 31.1743%,
    rgba(25, 156, 140, 0) 64.6344%
  );
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
  color: #fff;
  font-family: 'area-variable';
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  transition: all 0.3s;
  &:hover {
    filter: invert(1);
  }
  &: active {
    filter: invert(0);
  }
`;

const TableWrapper = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: transparent;
  width: 100%;
`;

const Table = styled.div`
  background: #f9f9fc;
  border-radius: 12px 12px 0 0;
  height: 300px;
  width: 100%;
  overflow-y: scroll;
  border: 1px solid #000;
`;

const TR = styled.div`
  display: flex;

  width: 100%;
  border-bottom: 1px solid #eeeef2;
  align-items: stretch;
  &:last-child {
    border-bottom: none;
  }
`;
const TH = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  color: #090a0f;
  flex: 1;
  font-family: 'area-variable';
  font-size: 12px;
  font-weight: 700;
  line-height: 16px; /* 133.333% */
  border-right: 1px solid #eeeef2;
  &:first-child {
    flex-grow: 2;
    border-radius: 12px 0 0 0;
  }
  &:nth-child(2) {
    flex-grow: 0.9;
  }
  &:nth-child(3) {
    flex-grow: 1;
  }
  &:nth-child(4) {
    flex-grow: 0.55;
  }
  &:last-child {
    flex-grow: 0.9;
    border-right: none;
    border-radius: 0 12px 0 0;
  }
`;

const TD = styled.div`
  padding: 12px 20px;
  flex: 1;
  display: flex;
  align-items: center;
  color: rgba(9, 10, 15, 0.6);
  font-family: 'area-variable';
  font-size: 12px;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
  border-right: 1px solid #eeeef2;
  &:first-child {
    flex-grow: 2;
  }
  &:nth-child(2) {
    flex-grow: 0.9;
  }
  &:nth-child(3) {
    flex-grow: 1;
  }
  &:nth-child(4) {
    flex-grow: 0.55;
  }
  &:last-child {
    flex-grow: 0.9;
    border-right: none;
  }
`;

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
            Refresh
            <img src={refresh} />
          </Button>
        </LabBut>
        <TableWrapper>
          <Table>
            <TR>
              <TH>Transaction</TH>
              <TH>Rollup</TH>
              <TH>Block</TH>
              <TH>Order #</TH>
              <TH>Transaction Age</TH>
            </TR>
            {data.map((tx) => (
              <TR key={cuid()}>
                <TD>{tx.txHash}</TD>
                <TD>{tx.rollup}</TD>
                <TD>{tx.block}</TD>
                <TD>{tx.order}</TD>
                <TD>{tx.age}</TD>
              </TR>
            ))}
          </Table>
        </TableWrapper>
      </LabTabButWrapper>
    </Container>
  );
};

export default TableSection;
