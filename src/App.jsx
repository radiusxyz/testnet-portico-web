import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const url = 'https://api.theradius.xyz';
const token = 'rknLawvMCOcv3bbfzKkfPOmt6eL0YOez66m-qbJJvf4QTUxTSnxShSglgZM6xMeBRs-aAkF-7bmvGMMJWjUaxw==';
const org = 'RadiusLab';
const headers = {
  Authorization: `Token ${token}`,
  'Content-Type': 'application/json',
};

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

const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

const HeadRow = styled(Row)`
  position: sticky;
  top: 0;
  padding: 10px 10px;
  background: orange;
`;

const Cell = styled.p`
  color: green;
  font-weight: 600;
  font-size: 25px;
  flex: 1;
`;

const HeadCell = styled(Cell)``;

async function queryLogs(timestamp) {
  const query = `from(bucket: "sequencer") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> filter(fn: (r) => r["at"] > "${timestamp}") |> sort(columns: ["at"])`;
  const data = {
    query: query,
    type: 'flux',
    timestamp,
  };

  try {
    // const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
    const response = await axios.post(`http://localhost:4000/mockLogs`, data, { headers });
    const result = response.data;
    // .split('\n')
    // .slice(1, -2)
    // .map((line) => {
    //   const fields = line.split(',');

    //   return {
    //     data: fields[6]?.replace(/"/g, ''),
    //     from: fields[10]?.replace(/"/g, ''),
    //     to: fields[11]?.replace(/"/g, '').replace('\r', ''),
    //     timestamp: fields[9],
    //   };
    // });

    return [...result];
  } catch (error) {
    console.error('QUERY ERROR', error);
  }
}

async function queryRoles() {
  const query = `from(bucket: "sequencer_table") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> group(columns: ["id"]) |> last()`;

  const data = {
    query: query,
    type: 'flux',
  };
  try {
    // const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
    const response = await axios.post(`http://localhost:4000/mockRoles`, data, { headers });
    const result = response.data;
    // .split('\n')
    // .slice(-3, -2)
    // .reduce((acc, line) => {
    //   const fields = line.split(',');
    //   const key = fields[9]?.replace(/"/g, '').replace('\r', '');
    //   const value = fields[10]?.replace(/"/g, '').replace('\r', '');
    //   if (key && value) {
    //     acc[key] = value;
    //   }
    //   return acc;
    // }, {});

    return { ...result };
  } catch (error) {
    console.error('QUERY ERROR', error);
  }
}

const matching = {
  lc: { what: 'leader', event: 'changed' },
  oc: { what: 'order commitment', event: 'sent' },
  tx: { what: 'transaction', event: 'sent' },
  block: { what: 'block', event: 'sent' },
};

function App() {
  const [logs, setLogs] = useState([]);
  const [displayedLogs, setDisplayedLogs] = useState([]); // State to hold logs to be displayed

  useEffect(() => {
    const fetch = async () => {
      const { timestamp } = await queryRoles();
      const logs = await queryLogs(timestamp);
      let previousTimestamp = 0;
      const humanLogs = logs.map((log) => {
        latency = log.timestamp - previousTimestamp;
        const humanLog = {
          from: log.from,
          to: ['A', 'B'].includes(log.to) ? `Rollup ${log.to}` : log.to,
          what: matching[log.data].what,
          event: matching[log.data].event,
          latency,
        };
        previousTimestamp = log.timestamp;
        return humanLog;
      });
      setLogs(humanLogs);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (logs.length > 0) {
      appendLog(0);
    }
  }, [logs]);

  const appendLog = (index) => {
    if (index < logs.length) {
      setDisplayedLogs((current) => [...current, logs[index]]);

      if (index + 1 < logs.length) {
        const delay = logs[index + 1].timestamp - logs[index].timestamp;
        setTimeout(() => appendLog(index + 1), delay);
      }
    }
  };

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
