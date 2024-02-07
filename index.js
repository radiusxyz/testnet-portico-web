import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 4000;

const token = 'nz-3Z97EJQYompt-o2hF5EK1YU8xiZpqoaeQGeI3uAuE2pOaboBliu1AA1cEaRrZtzqipRoIbuzOr8CSksTsmA==';
const url = 'http://3.35.234.132';
const org = 'RadiusLab';
// const client = new InfluxDB({ url, token });

const corsOptions = {
  origin: ['http://192.168.12.255', 'http://192.168.12.4'],
  optionsSuccessStatus: 200, // Replace with the domain of your client app
  allowedHeaders: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

async function queryLogs(token, url, org, timestamp) {
  const query = `from(bucket: "sequencer") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> filter(fn: (r) => r["at"] > "${
    timestamp ? timestamp : '0'
  }") |> sort(columns: ["at"])`;
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
    result.shift(); // Remove the first line which might not be relevant
    result.pop(); // Remove the last line which might be empty
    result.pop(); // Additional pop in case there's another trailing line
    return result;
  } catch (error) {
    console.error('QUERY LOGS ERROR', error);
  }
}

async function queryRoles(token, url, org) {
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
    return result;
  } catch (error) {
    console.error('QUERY ROLES ERROR', error);
  }
}

// Call queryLogs directly
//  '1706846834327471337'
// const logs = await queryLogs(token, url, org);
// const roles = await queryRoles(token, url, org);
// console.log(logs);
// console.log(roles);

// app.get('/logs', cors(corsOptions), (req, res) => {
//   // res.json(roles);
//   res.json(logs);
// });

app.post('/logs', (req, res) => {
  // res.json(roles);
  console.log('hit');

  res.json(['a', 'd']);
});

app.get('/roles', (req, res) => {
  // res.json(roles);
  res.json({ bye: 'world' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
