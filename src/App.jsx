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
  WindowWrapper,
  Yellow,
} from './Styles';
import { useQueryLogs } from './hooks/useQueryLogs';
import { useQueryRoles } from './hooks/useQueryRoles';
import cuid from 'cuid';

const matching = {
  lc: { what: 'leader', event: 'changed' },
  oc: { what: 'order commitment', event: 'sent' },
  tx: { what: 'transaction', event: 'sent' },
  block: { what: 'block', event: 'sent' },
};

function App() {
  const [logs, setLogs] = useState([]);
  const [index, setIndex] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [timestamp, setTimestamp] = useState(0);
  const lastItemRef = useRef(null);

  useEffect(() => {
    const fetchInitTimestamp = async () => {
      const result = await useQueryRoles();
      setTimestamp(result.timestamp);
    };

    fetchInitTimestamp();
  }, []);

  useEffect(() => {
    if (index >= logs.length && timestamp !== 0) {
      const fetch = async () => {
        // fetch logs by
        const logs = await useQueryLogs(timestamp);
        let dynTimestamp = timestamp;
        // transform them
        const humanLogs = logs.map((log) => {
          // setting latency for each as the current tim minus the prev tim
          // console.log(log.timestamp, dynTimestamp);
          console.log(log.timestamp, timestamp, log.timestamp - timestamp);

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
            id: cuid(),
            to,
            what: matching[log.data].what,
            event: matching[log.data].event,
            latency,
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
      setTimeout(() => {
        setDisplayedLogs((prevLogs) => [...prevLogs, logs[index]]);
        setIndex((prevIndex) => prevIndex + 1);
      }, logs[index].latency);
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
    <WindowWrapper>
      <Container>
        <WindowBtnsTitleWrapper>
          <WindowBtnsTitle>
            <BtnsContainer>
              <Red />
              <Yellow />
              <Green />
            </BtnsContainer>
            <Title>root@radius: ~/shared sequencer logs</Title>
          </WindowBtnsTitle>
          <HeadRow>
            <HeadCell>What?</HeadCell>
            <HeadCell>What happened?</HeadCell>
            <HeadCell>From</HeadCell>
            <HeadCell>To</HeadCell>
            <HeadCell>In (seconds)</HeadCell>
            <HeadCell>Timestamp</HeadCell>
          </HeadRow>
        </WindowBtnsTitleWrapper>
        <LogLand>
          {displayedLogs.map((log) => (
            <Row key={`row-${log.id}`}>
              <Cell data={log.data}>{log.what}</Cell>
              <Cell data={log.data}>{log.event}</Cell>
              <Cell data={log.data}>{log.from}</Cell>
              <Cell data={log.data}>{log.to}</Cell>
              <Cell data={log.data}>{Math.round((log.latency / 1000 + Number.EPSILON) * 1000) / 1000}</Cell>
              <Cell data={log.data}>{log.timestamp}</Cell>
            </Row>
          ))}
          <ArrowTildeRow>
            <Arrow>➜</Arrow>
            <Tilde>~</Tilde>
            <BlinkingSquare ref={lastItemRef} />
          </ArrowTildeRow>
        </LogLand>{' '}
      </Container>{' '}
    </WindowWrapper>
  );
}

export default App;
