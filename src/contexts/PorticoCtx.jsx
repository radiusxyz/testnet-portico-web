import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
const token = import.meta.env.VITE_INFLUXDB_TOKEN;
const url = import.meta.env.VITE_INFLUXDB_URL;
const org = 'RadiusLab';
import mev from '../assets/videos/mev.mp4';

export const PorticoCtx = createContext({
  queryRoles: async () => {},
  queryLogs: async (timestamp) => {},

  globalRoles: {},
  globalLabels: {},
  globalLogs: [],
  globalIndex: 0,

  setGlobalRoles: () => {},
  setGlobalLabels: () => {},
  setGlobalLogs: () => {},
  setGlobalIndex: () => {},

  preventNewLogs: false,
});

export const usePortico = () => useContext(PorticoCtx);

export const ContextProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [logs, setLogs] = useState([]);
  const [logsReady, setLogsReady] = useState(false);
  const [roles, setRoles] = useState({});
  const [labels, setLabels] = useState({});

  async function queryLogs(timestamp) {
    const query = `from(bucket: "sequencer") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> filter(fn: (r) => r["at"] > "${timestamp}") |> sort(columns: ["at"])`;
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      query: query,
      type: 'flux',
      timestamp,
    };

    try {
      const response = await axios.post(`${url}/logs`, data, { headers });
      // const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
      // const result = response.data
      //   .split('\n')
      //   .slice(1, -2)
      //   .map((line) => {
      //     const fields = line.split(',');

      //     return {
      //       data: fields[6]?.replace(/"/g, ''),
      //       from: fields[10]?.replace(/"/g, ''),
      //       to: fields[11]?.replace(/"/g, '').replace('\r', ''),
      //       timestamp: fields[9],
      //     };
      //   });
      const result = response.data;

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
      const response = await axios.post(`${url}/roles`, data, { headers });
      // const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
      // const result = response.data
      //   .split('\n')
      //   .slice(1, -2)
      //   .reduce((acc, line) => {
      //     const fields = line.split(',');
      //     const key = fields[9]?.replace(/"/g, '').replace('\r', '');
      //     const value = fields[10]?.replace(/"/g, '').replace('\r', '');
      //     if (key && value) {
      //       acc[key] = value;
      //     }
      //     return acc;
      //   }, {});

      const result = response.data;

      return { ...result };
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  useEffect(() => {
    const runReqs = async () => {
      const roles = await queryRoles();
      console.log(roles);

      // Set the initial roles
      setRoles(roles);

      // Set the initial labels
      const swapped = {};
      Object.entries(roles).forEach(([key, value]) => {
        swapped[value] = key;
      });
      setLabels(swapped);

      // Get the initial logs
      if (!logsReady) {
        const checkLogs = async () => {
          const logs = await queryLogs(roles.timestamp);
          console.log(logs);
          if (logs.length) {
            console.log('Logs are ready');

            // Set the initial logs
            setLogs(logs);
            setLogsReady(true);
          } else {
            console.log('Logs are not ready, checking again...');
            setTimeout(checkLogs, 1000);
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
        globalLabels: labels,
        globalRoles: roles,
        globalLogs: logs,
        globalIndex: index,

        setGlobalLabels: setLabels,
        setGlobalRoles: setRoles,
        setGlobalLogs: setLogs,
        setGlobalIndex: setIndex,

        queryRoles,
        queryLogs,
      }}
    >
      {children}
    </PorticoCtx.Provider>
  );
};
