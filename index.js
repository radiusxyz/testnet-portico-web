import express from 'express';
import cors from 'cors';
import { iLogs, iRoles, mock2 } from './data.js';

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

const iRoles2 = {
  '0x1': 'l',
  '0x2': 'f0',
  '0x3': 'f1',
  '0x4': 'f2',
  '0x5': 'f3',
  A: 'r0',
  B: 'r1',
  u: 'u',
  timestamp: Date.now(),
};

app.post('/mockRoles', (req, res) => {
  // const response = iLogs.filter((log) => log.timestamp > timestamp);
  iRoles2.timestamp = Date.now();
  const response = { ...iRoles2 };
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

app.post('/mockLogs', (req, res) => {
  const { timestamp } = req.body;
  console.log(timestamp);
  // const response = iLogs.filter((log) => log.timestamp > timestamp);

  // res.json(response);
  // if (index < 3) {
  //   res.json([]);
  //   ++index;
  // } else {
  setTimeout(() => {
    // roles.timestamp = response[response.length - 1]?.timestamp;
    // index = 0;
    iRoles2.timestamp = Date.now();

    const iLogs2 = [
      { from: '0x1', to: '0x2', data: 'lc' },
      { from: '0x2', to: '0x1', data: 'lc' },
      { from: 'u', to: '0x3', data: 'tx' },
      { from: '0x3', to: '0x1', data: 'tx' },
      { from: '0x1', to: '0x4', data: 'oc' },
      { from: '0x1', to: '0x2', data: 'oc' },
      { from: '0x1', to: '0x3', data: 'oc' },
      { from: '0x3', to: 'u', data: 'oc' },
      { from: '0x1', to: 'B', data: 'block' },

      { from: '0x1', to: '0x2', data: 'lc' },

      { from: 'u', to: '0x2', data: 'tx' },
      { from: '0x2', to: '0x1', data: 'oc' },
      { from: '0x2', to: '0x3', data: 'oc' },
      { from: '0x2', to: '0x4', data: 'oc' },
      { from: '0x2', to: 'u', data: 'oc' },
      { from: '0x2', to: 'A', data: 'block' },

      { from: '0x2', to: '0x1', data: 'lc' },
      { from: '0x1', to: '0x3', data: 'lc' },
      { from: '0x3', to: '0x4', data: 'lc' },
      { from: 'u', to: '0x4', data: 'tx' },
      { from: '0x4', to: '0x5', data: 'lc' },
      { from: '0x5', to: '0x1', data: 'lc' },
    ].map((log, index) => {
      return { ...log, timestamp: iRoles2.timestamp + index * index + 1 };
    });

    res.json(iLogs2);
  }, 1000);
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
