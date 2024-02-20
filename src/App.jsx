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
  const [expand, setExpand] = useState(false);
  const lastItemRef = useRef(null);

  const handleExpand = () => {
    setExpand((prevState) => !prevState);
  };

  const handleClose = () => {
    window.close();
  };

  useEffect(() => {
    const fetchInitTimestamp = async () => {
      const result = await useQueryRoles();
      setTimestamp(result.timestamp);
    };

    fetchInitTimestamp();
  }, []);

  useEffect(() => {
    if (index >= logs.length && timestamp !== 0) {
      let timeoutId;
      const fetch = () => {
        timeoutId = setTimeout(async () => {
          // fetch logs by
          const logs = await useQueryLogs(timestamp);
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
        }, 1000);
      };
      fetch();
      return () => clearTimeout(timeoutId);
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
    <WindowWrapper>
      <Container expand={expand} onDoubleClick={handleExpand}>
        <WindowBtnsTitleWrapper>
          <WindowBtnsTitle expand={expand}>
            <BtnsContainer>
              <Red onClick={handleClose} />
              <Yellow onClick={handleClose} />
              <Green onClick={handleExpand} />
            </BtnsContainer>
            <Title>root@radius: ~/shared sequencer logs</Title>
          </WindowBtnsTitle>
          <HeadRow>
            <HeadCell>event</HeadCell>
            <HeadCell>status</HeadCell>
            <HeadCell>from</HeadCell>
            <HeadCell>to</HeadCell>
            <HeadCell>latency (sec)</HeadCell>
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
    </WindowWrapper>
  );
}

export default App;
