import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #090a0f;
  flex-direction: column;
  color: white;
  overflow-y: scroll;
  gap: 5px;
`;
export const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

export const HeadRow = styled(Row)`
  position: sticky;
  top: 0;
  padding: 10px 10px;
  background: orange;
`;

export const Cell = styled.p`
  color: green;
  font-weight: 600;
  font-size: 25px;
  flex: 1;
`;

export const HeadCell = styled(Cell)``;
