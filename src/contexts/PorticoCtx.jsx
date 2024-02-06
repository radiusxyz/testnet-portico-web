import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
const token = import.meta.env.VITE_INFLUXDB_TOKEN;
const url = import.meta.env.VITE_INFLUXDB_URL;
const org = 'RadiusLab';

export const PorticoCtx = createContext({
  initialRoles: {},
  queryRoles: async () => {},
  queryLogs: async () => {},
  porticoRoles: {},
  porticoLogs: [],
  porticoLabels: {},
});

export const usePortico = () => useContext(PorticoCtx);

export const ContextProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [roles, setRoles] = useState({});
  const [labels, setLabels] = useState({});

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [timestamp, setTimestamp] = useState(0);

  async function queryLogs() {
    const query = `from(bucket: "sequencer") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> filter(fn: (r) => r["at"] > "${timestamp}") |> sort(columns: ["at"])`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/vnd',
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
      setLogs(result);
      console.log('portico', result);
      setIsDataLoaded(true);
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
      console.log(result);
      setIsDataLoaded(true);
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  //"1706846834327471337"
  useEffect(() => {
    queryRoles();
    queryLogs();
  }, []);

  useEffect(() => {
    const swapped = {};
    Object.entries(roles).forEach(([key, value]) => {
      swapped[value] = key;
    });
    setLabels(swapped); // Update labels state
  }, [roles]);

  return (
    <PorticoCtx.Provider
      value={{ porticoLabels: labels, porticoRoles: roles, porticoLogs: logs, queryRoles, queryLogs, isDataLoaded }}
    >
      {children}
    </PorticoCtx.Provider>
  );
};
