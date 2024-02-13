import express from 'express';
import cors from 'cors';
import { iLogs, iRoles } from './data.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;
const time = 15000;

const logs = [...iLogs];
const roles = { ...iRoles };

// setInterval(() => {
//   if (logs.length) {
//     const newLogs = logs.map((log, index) => {
//       const newLogClone = { ...log };
//       newLogClone.timestamp = logs[logs.length - 1].timestamp + index + 1;
//       return newLogClone;
//     });
//     roles.timestamp = newLogs[newLogs.length - 1].timestamp;
//     logs.push(...newLogs);
//   } else {
//     console.log('No logs to duplicate.');
//   }
// }, time);

app.post('/roles', (_, res) => {
  setTimeout(() => {
    res.json(roles);
  }, 2000);
});

let index = 0;

app.post('/logs', (req, res) => {
  const { timestamp } = req.body;
  const response = logs.filter((log) => log.timestamp > timestamp);

  if (index < 3) {
    res.json([]);
    ++index;
  } else {
    setTimeout(() => {
      // roles.timestamp = response[response.length - 1]?.timestamp;
      index = 0;
      res.json(response);
    }, 5000);
  }
});

app.post('/mock', (req, res) => {
  const { timestamp } = req.body;
  console.log(timestamp);
  const response = iLogs.filter((log) => log.timestamp > timestamp);
  console.log(response);
  res.json(response);
  // if (index < 3) {
  //   res.json([]);
  //   ++index;
  // } else {
  //   setTimeout(() => {
  //     // roles.timestamp = response[response.length - 1]?.timestamp;
  //     index = 0;
  //     res.json(response);
  //   }, 5000);
  // }
});

const A = [];
const B = [];

setInterval(() => {
  A.push({ timestamp: Date.now() });
}, 3000);

setInterval(() => {
  B.push({ timestamp: Date.now() });
}, 10000);

app.post('/getHeight', (req, res) => {
  const { id } = req.body;
  const response = id === 0 ? A.length : B.length;
  console.log('/getHeight', response);
  res.json(response);
});

app.post('/getTimestamp', (req, res) => {
  const { id, height } = req.body;
  const response = id === 0 ? A[height - 1] : B[height - 1];
  console.log('getTimestamp', response);
  res.json(response);
});

app.post('/rollup');

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
