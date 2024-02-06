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

/* 

const axios = require('axios');

async function queryInfluxDB() {
    const influxDBUrl = 'http://localhost:8086'; // Replace with your InfluxDB URL
    const org = 'your_org'; // Replace with your organization name
    const bucket = 'your_bucket'; // Replace with your bucket name
    const token = 'your_token'; // Replace with your InfluxDB token
    const query = `from(bucket: "${bucket}") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "your_measurement")`; // Replace with your Flux query

    try {
        const response = await axios.post(`${influxDBUrl}/api/v2/query?org=${org}`, { query }, {
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/csv',
                'Content-type': 'application/vnd.flux'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

*/
