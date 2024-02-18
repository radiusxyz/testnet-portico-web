import React, { useState, useEffect } from 'react';
import { Cell, Container, HeadCell, HeadRow, Row } from './Styles';
import { useQueryLogs } from './hooks/useQueryLogs';
import { useQueryRoles } from './hooks/useQueryRoles';

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
          console.log(log.timestamp, dynTimestamp);
          const latency = log.timestamp - dynTimestamp;
          const humanLog = {
            from: log.from,
            to: ['A', 'B'].includes(log.to) ? `Rollup ${log.to}` : log.to,
            what: matching[log.data].what,
            event: matching[log.data].event,
            latency,
          };

          // save the current log's timestamp for the next log
          dynTimestamp = log.timestamp;
          return humanLog;
        });

        // last log's timestamp is saved in the timestamp state for the next fetch
        setTimestamp(dynTimestamp);
        setLogs(humanLogs);
      };
      fetch();
    }
  }, [timestamp]);

  const appendLog = (index) => {
    if (index < logs.length) {
      setDisplayedLogs((current) => [...current, logs[index]]);
      if (index < logs.length) {
        const latency = logs[index].latency;
        setTimeout(() => {
          appendLog(index);
          setIndex((i) => i + 1);
        }, latency);
      }
    }
  };

  useEffect(() => {
    if (logs.length > index) {
      appendLog(index);
    }
  }, [logs]);

  return (
    <Container>
      <HeadRow>
        <HeadCell>What?</HeadCell>
        <HeadCell>What happened?</HeadCell>
        <HeadCell>From</HeadCell>
        <HeadCell>To</HeadCell>
        <HeadCell>In (seconds)</HeadCell>
      </HeadRow>
      {displayedLogs.map((log, rowIndex) => (
        <Row key={`row-${rowIndex}`}>
          <Cell>{log.what}</Cell>
          <Cell>{log.event}</Cell>
          <Cell>{log.from}</Cell>
          <Cell>{log.to}</Cell>
          <Cell>{log.latency}</Cell>
        </Row>
      ))}
    </Container>
  );
}

export default App;
