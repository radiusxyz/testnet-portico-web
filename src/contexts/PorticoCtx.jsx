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

export const ContextProvider = ({ children }) => {
  const [videoSrc] = useState(mev);
  const [logs, setLogs] = useState([]);
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
      const statelessLogs = [...result];
      return statelessLogs;
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
      console.log('query roles', response);
      const lines = response.data.split('\n');
      const result = {};
      lines.forEach((line, index, arr) => {
        if (index !== 0 && index < arr.length - 2) {
          const fields = line.split(',');
          result[fields[9]?.replace(/"/g, '').replace('\r', '')] = fields[10]?.replace(/"/g, '').replace('\r', '');
        }
      });
      setRoles(result);
      // setIsDataLoaded(true);
      const statelessRoles = { ...result };
      return statelessRoles;
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  // {
  //   "0x1": "l",
  //   "0x2": "f0",
  //   "0x3": "f1",
  //   "0x4": "f2",
  //   "0x5": "f3",
  //   "A": "r0",
  //   "B": "r1",
  //   "u": "u",
  //   "timestamp": "1707219443003382776"
  // }

  useEffect(() => {
    let intervalId;

    async function initiateQueries() {
      const statelessRoles = await queryRoles();
      console.log(statelessRoles);

      intervalId = setInterval(async () => {
        const statelessLogs = await queryLogs(statelessRoles.timestamp);
        console.log('out', statelessLogs);
        if (statelessLogs.length !== 0) {
          console.log('in', statelessLogs);
          clearInterval(intervalId);
        }
      }, 1000);
    }

    initiateQueries();
    // return () => clearTimeout(intervalId);
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
        // isDataLoaded,
      }}
    >
      {children}
    </PorticoCtx.Provider>
  );
};
