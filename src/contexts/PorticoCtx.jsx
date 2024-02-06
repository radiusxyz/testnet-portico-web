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
  porticoRoles: {},
  porticoLogs: [],
  porticoLabels: {},
  porticoVideo: {},
});

export const usePortico = () => useContext(PorticoCtx);
let statelessRoles = {};

export const ContextProvider = ({ children }) => {
  const [videoSrc] = useState(mev);
  const [logs, setLogs] = useState([]);
  const [roles, setRoles] = useState({});
  const [labels, setLabels] = useState({});

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // const [timestamp, setTimestamp] = useState(0);

  async function queryLogs(timestamp) {
    const query = `from(bucket: "stompesi_sequencer") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> filter(fn: (r) => r["at"] > "${timestamp}") |> sort(columns: ["at"])`;
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
      setLogs(result);
      setIsDataLoaded(true);
      console.log('portico', result);
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  async function queryRoles() {
    const query = `from(bucket: "stompesi_sequencer_table") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> group(columns: ["id"]) |> last()`;
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
      setIsDataLoaded(true);
      statelessRoles = { ...result };
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  //"1706846834327471337"
  useEffect(() => {
    async function firstQuery() {
      await queryRoles();
      setTimeout(() => {
        queryLogs(statelessRoles.timestamp);
      }, 7000);
    }
    firstQuery();
  }, []);

  useEffect(() => {
    const swapped = {};
    Object.entries(roles).forEach(([key, value]) => {
      swapped[value] = key;
    });
    setLabels(swapped);
  }, [roles]);

  return (
    <PorticoCtx.Provider
      value={{
        videoSrc,
        porticoLabels: labels,
        porticoRoles: roles,
        porticoLogs: logs,
        queryRoles,
        queryLogs,
        isDataLoaded,
      }}
    >
      {children}
    </PorticoCtx.Provider>
  );
};
