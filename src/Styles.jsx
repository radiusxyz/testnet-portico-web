import styled, { keyframes } from 'styled-components';

export const WindowWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  background: #000;
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.56);
  border-radius: 7px;
  margin: 50px;
  gap: 10px;
`;

export const Circle = styled.div`
  border-radius: 50%;
  width: 14px;
  height: 14px;
`;

export const WindowBtnsTitleWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(#e2e0e2, #c7c6c8);
  z-index: 100;
  border-radius: 7px;
`;

export const WindowBtnsTitle = styled.div`
  width: 100%;
  display: flex;
  min-height: 40px;
  align-items: center;
  padding: 0 14px;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 7px 7px;
`;

export const BtnsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const Red = styled(Circle)`
  background-color: #ff544d;
  border: 1px solid #da3c37;
`;

export const Yellow = styled(Circle)`
  background-color: #ffb429;
  border: 1px solid #f0a318;
`;

export const Green = styled(Circle)`
  background-color: #25c63a;
  border: 1px solid #12a025;
`;

export const Title = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  color: #494849;
  font-weight: bold;
  transform: translateX(-50%);
`;

export const LogLand = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow-y: scroll;
  gap: 8px;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
  padding: 3px 10px;
`;

export const HeadRow = styled(Row)`
  padding: 2px 10px;
  background: #fff;
`;

export const Cell = styled.p`
  font-weight: 600;
  font-size: 18px;
  flex: 1;
  font-family: 'Source Code Pro', monospace;
  color: ${({ data }) =>
    (data === 'block' && '#189EFF') ||
    (data === 'tx' && '#FF5656') ||
    (data === 'oc' && '#24F6B7') ||
    (data === 'lc' && '#FBFF42') ||
    '#fff'};
`;

export const HeadCell = styled(Cell)`
  color: black;
  font-weight: bold;
`;

export const blinkAnimation = keyframes`
  50% {
    opacity: 0;
  }
`;

export const BlinkingSquare = styled.div`
  width: 15px; // Size of the square
  height: 25px; // Size of the square
  background-color: white; // Color of the square
  animation: ${blinkAnimation} 0.5s linear infinite;
`;
