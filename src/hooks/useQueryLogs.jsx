import axios from 'axios';
import { TEST_URL, TOKEN } from '../assets/Consts';

const parseLogs = (logs) => {
  console.log(logs);
  return logs;
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
};

export const useQueryLogs = async (timestamp) => {
  const headers = {
    Authorization: `Token ${TOKEN}`,
    'Content-Type': 'application/json',
  };
  const query = `from(bucket: "sequencer") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> filter(fn: (r) => r["at"] > "${timestamp}") |> sort(columns: ["at"])`;
  const data = {
    query: query,
    type: 'flux',
    timestamp,
  };

  try {
    // const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
    const response = await axios.post(`${TEST_URL}/mockLogs`, data, { headers });
    const result = parseLogs(response.data);

    return [...result];
  } catch (error) {
    console.error('QUERY ERROR', error);
  }
};
