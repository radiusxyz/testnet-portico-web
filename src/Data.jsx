import React from 'react';
import { Cell, Row } from './Styles';

const Data = () => {
  return (
    <Row key={`row-${rowIndex}`}>
      <Cell>{log.what}</Cell>
      <Cell>{log.event}</Cell>
      <Cell>{log.from}</Cell>
      <Cell>{log.to}</Cell>
      <Cell>{log.latency}</Cell>
    </Row>
  );
};

export default Data;
