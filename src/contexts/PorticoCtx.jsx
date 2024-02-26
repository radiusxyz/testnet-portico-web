import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { TOKEN, URL, ORG, TEST_URL } from '../assets/Data';

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

  const [roles, setRoles] = useState({});
  const [labels, setLabels] = useState({});

  useEffect(() => {
    const swapped = {};
    Object.entries(roles).forEach(([key, value]) => {
      swapped[value] = key;
    });
    setLabels(swapped);
  }, [roles]);

  async function queryLogs(timestamp) {
    const query = `from(bucket: "sequencer") |> range(start: -10m) |> filter(fn: (r) => r["_measurement"] == "log") |> filter(fn: (r) => r["at"] > "${timestamp}") |> sort(columns: ["at"])`;
    const headers = {
      Authorization: `Token ${TOKEN}`,
      'Content-Type': 'application/json',
    };

    const data = {
      query: query,
      type: 'flux',
      timestamp,
    };

    try {
      // const response = await axios.post(`${TEST_URL}/mockLogs`, data, { headers });
      const response = await axios.post(`${URL}/api/v2/query?org=${ORG}`, data, { headers });
      const result = response.data
        .split('\n')
        .slice(1, -2)
        .map((line) => {
          const fields = line.split(',');

          return {
            data: fields[6]?.replace(/"/g, ''),
            from: fields[10]?.replace(/"/g, ''),
            to: fields[11]?.replace(/"/g, '').replace('\r', ''),
            timestamp: fields[9],
          };
        })
        .reduce((acc, obj) => {
          // Immediately create and insert 'ld' object before 'lc' object
          if (obj.data === 'lc') {
            const newObj = { ...obj, data: 'ld' }; // Create 'ld' object
            acc.push(newObj); // Insert 'ld' object first
          }
          acc.push(obj); // Insert the original object ('lc' or otherwise)
          return acc;
        }, []);

      return [...result];
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  async function queryRoles() {
    const query = `from(bucket: "sequencer_table") |> range(start: -10m) |> filter(fn: (r) => r["_measurement"] == "log") |> group(columns: ["id"]) |> last()`;
    const headers = {
      Authorization: `Token ${TOKEN}`,
      'Content-Type': 'application/json',
    };

    const data = {
      query: query,
      type: 'flux',
    };
    try {
      // const response = await axios.post(`${TEST_URL}/mockRoles`, data, { headers });
      const response = await axios.post(`${URL}/api/v2/query?org=${ORG}`, data, { headers });
      const result = response.data
        .split('\n')
        .slice(1, -2)
        .reduce((acc, line) => {
          const fields = line.split(',');
          const key = fields[9]?.replace(/"/g, '').replace('\r', '');
          const value = fields[10]?.replace(/"/g, '').replace('\r', '');
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {});

      return { ...result };
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  useEffect(() => {
    let timeoutId0;
    let timeoutId1;

    // Function to fetch roles
    const fetchRoles = async () => {
      if (Object.keys(roles).length === 0) {
        // Check if roles are not yet fetched
        const fetchedRoles = (await queryRoles()) || {};
        if (fetchedRoles && Object.keys(fetchedRoles).length) {
          setRoles(fetchedRoles); // Set roles if fetched successfully
          // Once roles are set, start fetching logs
          console.log('hello1');
          console.log(fetchedRoles);
          fetchLogs(fetchedRoles);
        } else {
          // Retry fetching roles if not successful
          timeoutId0 = setTimeout(fetchRoles, 1000);
        }
      }
    };

    // Function to fetch logs
    const fetchLogs = async (fetchedRoles) => {
      if (Object.keys(fetchedRoles).length !== 0) {
        // Ensure roles are set before fetching logs
        const logs = await queryLogs(fetchedRoles.timestamp);
        console.log('hello2');
        if (logs && logs.length) {
          setLogs(logs);
        }
        // Continue to fetch logs every 1 second as long as roles are set
        timeoutId1 = setTimeout(() => {
          fetchLogs(fetchedRoles);
        }, 1000);
      }
    };

    fetchRoles();

    return () => {
      clearTimeout(timeoutId0); // Cleanup timeout on component unmount
      clearTimeout(timeoutId1); // Cleanup timeout on component unmount
    };
  }, []);

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
