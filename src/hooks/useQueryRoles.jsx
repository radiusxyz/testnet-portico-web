import axios from 'axios';
import { URL, TOKEN } from '../assets/Consts';

const parseRoles = (roles) => {
  return roles
    .split('\n')
    .slice(-3, -2)
    .reduce((acc, line) => {
      const fields = line.split(',');
      const key = fields[9]?.replace(/"/g, '').replace('\r', '');
      const value = fields[10]?.replace(/"/g, '').replace('\r', '');
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});
};

export const useQueryRoles = async () => {
  const headers = {
    Authorization: `Token ${TOKEN}`,
    'Content-Type': 'application/json',
  };
  const query = `from(bucket: "sequencer_table") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> group(columns: ["id"]) |> last()`;

  const data = {
    query: query,
    type: 'flux',
  };
  try {
    // const response = await axios.post(`${URL}/mockRoles`, data, { headers });
    const response = await axios.post(`${URL}/api/v2/query?org=${org}`, data, { headers });
    const result = parseRoles(response.data);

    return { ...result };
  } catch (error) {
    console.error('QUERY ERROR', error);
  }
};
