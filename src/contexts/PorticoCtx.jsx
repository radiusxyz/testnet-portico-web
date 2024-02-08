import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
const token = import.meta.env.VITE_INFLUXDB_TOKEN;
const url = import.meta.env.VITE_INFLUXDB_URL;
const org = 'RadiusLab';
import mev from '../assets/videos/mev.mp4';

export const PorticoCtx = createContext({
  initialRoles: {},
  queryRoles: async () => {},
  queryLogs: async () => {},
  pRoles: {},
  setProles: () => {},
  pLogs: [],
  setPLogs: () => {},
  pLabels: {},
  setPLabels: () => {},
  pVideo: {},
  preventNewLogs: false,
  setPIndex: () => {},
  pIndex: 0,
});

export const usePortico = () => useContext(PorticoCtx);

export const ContextProvider = ({ children }) => {
  const [videoSrc] = useState(mev);
  const [logs, setLogs] = useState([]);
  const [roles, setRoles] = useState({
    '0x1': 'f0',
    '0x2': 'f1',
    '0x3': 'f2',
    '0x4': 'f3',
    '0x5': 'l',
    A: 'r0',
    B: 'r1',
    u: 'u',
    timestamp: '1707219443003382776',
  });
  const [labels, setLabels] = useState({});
  const [logsReady, setLogsReady] = useState(false);
  const [index, setIndex] = useState(0);

  const handleIndex = () => {
    setIndex((index) => index + 1);
  };

  async function queryLogs(timestamp) {
    const query = `from(bucket: "sequencer") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> filter(fn: (r) => r["at"] > "${timestamp}") |> sort(columns: ["at"])`;
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      query: query,
      type: 'flux',
    };
    try {
      const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
      const lines = response.data.split('\n');
      const result = lines.map((line) => {
        const fields = line.split(',');

        return {
          data: fields[6]?.replace(/"/g, ''),
          from: fields[10]?.replace(/"/g, ''),
          to: fields[11]?.replace(/"/g, '').replace('\r', ''),
          timestamp: fields[9],
        };
      });
      result.shift();
      result.pop();
      result.pop();
      // console.log('portico', result);
      setLogs(result);
      return [...result];
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  async function queryRoles() {
    const query = `from(bucket: "sequencer_table") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> group(columns: ["id"]) |> last()`;
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      query: query,
      type: 'flux',
    };
    try {
      const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
      const lines = response.data.split('\n');
      const result = {};
      lines.forEach((line, index, arr) => {
        if (index !== 0 && index < arr.length - 2) {
          const fields = line.split(',');
          result[fields[9]?.replace(/"/g, '').replace('\r', '')] = fields[10]?.replace(/"/g, '').replace('\r', '');
        }
      });
      setRoles(result);
      return { ...result };
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  useEffect(() => {
    const swapped = {};
    Object.entries(roles).forEach(([key, value]) => {
      swapped[value] = key;
    });
    setLabels(swapped);
  }, [roles]);

  useEffect(() => {
    const runReqs = async () => {
      const roles = await queryRoles();
      console.log(roles);
      if (!logsReady) {
        const checkLogs = async () => {
          const logs = await queryLogs(roles.timestamp);
          console.log(logs);
          if (logs.length) {
            console.log('Logs are ready');
            setLogsReady(true);
          } else {
            console.log('Logs are not ready, checking again...');
            setTimeout(checkLogs, 1000); // Check again after 1 second
          }
        };
        setTimeout(checkLogs, 1000);
      }
    };
    console.log('Checking for logs...');
    runReqs();
  }, [logsReady]);

  return (
    <PorticoCtx.Provider
      value={{
        videoSrc,
        pLabels: labels,
        setPLabels: setLabels,
        pRoles: roles,
        setPRoles: setRoles,
        pLogs: logs,
        setPLogs: setLogs,
        queryRoles,
        queryLogs,
        preventNewLogs: setLogsReady,
        // isDataLoaded,
        setPIndex: setIndex,
        pIndex: index,
      }}
    >
      {children}
    </PorticoCtx.Provider>
  );
};
