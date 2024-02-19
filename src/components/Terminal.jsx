import React, { useState, useEffect, useRef } from 'react';
import {
  Arrow,
  ArrowTildeRow,
  BlinkingSquare,
  BtnsContainer,
  Cell,
  Container,
  Green,
  HeadCell,
  HeadRow,
  LogLand,
  Red,
  Row,
  Tilde,
  Title,
  WindowBtnsTitle,
  WindowBtnsTitleWrapper,
  Yellow,
} from './TerminalStyles';

import cuid from 'cuid';
import { usePortico } from '../contexts/PorticoCtx';

const matching = {
  lc: { what: 'leader', event: 'changed' },
  oc: { what: 'order commitment', event: 'sent' },
  tx: { what: 'transaction', event: 'sent' },
  block: { what: 'block', event: 'sent' },
};

function Terminal({ handleTerminal }) {
  const { queryLogs, queryRoles } = usePortico();
  const [logs, setLogs] = useState([]);
  const [index, setIndex] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [timestamp, setTimestamp] = useState(0);
  const lastItemRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 600, y: window.innerHeight / 2 - 150 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const fetchInitTimestamp = async () => {
      const result = await queryRoles();
      setTimestamp(result.timestamp);
    };

    fetchInitTimestamp();
  }, []);

  useEffect(() => {
    if (index >= logs.length && timestamp !== 0) {
      const fetch = async () => {
        // fetch logs by
        const logs = await queryLogs(timestamp);
        let dynTimestamp = timestamp;
        // transform them
        const humanLogs = logs.map((log, index) => {
          // setting latency for each as the current tim minus the prev tim

          const latency = (log.timestamp - dynTimestamp) / 1000000;
          const from =
            (log.from === 'A' && 'Rollup A') ||
            (log.from === 'B' && 'Rollup B') ||
            (log.from === 'u' && 'user') ||
            log.from;

          const to =
            (log.to === 'A' && 'Rollup A') || (log.to === 'B' && 'Rollup B') || (log.to === 'u' && 'user') || log.to;

          const humanLog = {
            from,
            id: index + cuid(),
            to,
            what: matching[log.data].what,
            event: matching[log.data].event,
            latency: log.from.includes('0x') ? latency : 0,
            data: log.data,
            timestamp: new Date(log.timestamp / 1000000).toLocaleTimeString(),
          };

          // save the current log's timestamp for the next log
          dynTimestamp = log.timestamp;
          return humanLog;
        });

        // last log's timestamp is saved in the timestamp state for the next fetch
        setLogs([...humanLogs]);
        setIndex(0);
        setTimestamp(dynTimestamp);
      };
      fetch();
    }
  }, [timestamp, index, logs]);

  useEffect(() => {
    console.log(logs.length);
    if (index < logs.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedLogs((prevLogs) => [...prevLogs, logs[index]]);
        setIndex((prevIndex) => prevIndex + 1);
      }, logs[index].latency);
      return () => clearTimeout(timeoutId);
    }
  }, [index, logs]);

  useEffect(() => {
    console.log(logs);
    if (lastItemRef.current) {
      // Scroll the last item into view
      lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [index]);

  return (
    <Container x={position.x} y={position.y}>
      <WindowBtnsTitleWrapper>
        <WindowBtnsTitle onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
          <BtnsContainer>
            <Red onClick={handleTerminal} />
            <Yellow onClick={handleTerminal} />
            <Green onClick={() => window.open('https://portico-logs.theradius.xyz', '_blank')} />
          </BtnsContainer>
          <Title>root@radius: ~/shared sequencer logs</Title>
        </WindowBtnsTitle>
        <HeadRow>
          <HeadCell>what?</HeadCell>
          <HeadCell>what happened?</HeadCell>
          <HeadCell>from</HeadCell>
          <HeadCell>to</HeadCell>
          <HeadCell>in (seconds)</HeadCell>
          <HeadCell>timestamp</HeadCell>
        </HeadRow>
      </WindowBtnsTitleWrapper>
      <LogLand>
        {displayedLogs.map((log) => (
          <Row key={`row-${log.id}`}>
            <Cell data={log.data}>{log.what}</Cell>
            <Cell data={log.data}>{log.event}</Cell>
            <Cell data={log.data}>{log.from}</Cell>
            <Cell data={log.data}>{log.to}</Cell>
            <Cell data={log.data}>
              {log.from === 'user' || log.data === 'block'
                ? ''
                : Math.round((log.latency / 1000 + Number.EPSILON) * 1000) / 1000}
            </Cell>
            <Cell data={log.data}>{log.timestamp}</Cell>
          </Row>
        ))}
        <ArrowTildeRow>
          <Arrow>➜</Arrow>
          <Tilde>~</Tilde>
          <BlinkingSquare ref={lastItemRef} />
        </ArrowTildeRow>
      </LogLand>
    </Container>
  );
}

export default Terminal;
