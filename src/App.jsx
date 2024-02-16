import React from 'react';
import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #090a0f;
  flex-direction: column;
  color: white;
`;
function App() {
  return <Root>Hello World</Root>;
}

export default App;
