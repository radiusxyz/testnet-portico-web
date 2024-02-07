import express from 'express';
import cors from 'cors';
import { iLogs, iRoles } from './data.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;
const time = 4000;

const logs = [...iLogs];
const roles = { ...iRoles };

setInterval(() => {
  if (logs.length) {
    const newLog = logs.slice(-5).map((log, index) => {
      const newLogClone = { ...log };
      newLogClone.timestamp = logs[logs.length - 1].timestamp + index + 1;
      return newLogClone;
    });
    logs.push(...newLog);
  } else {
    console.log('No logs to duplicate.');
  }
}, time);

app.get('/roles', (_, res) => {
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
      roles.timestamp = response[response.length - 1].timestamp;
      index = 0;
      res.json(response);
    }, 5000);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
