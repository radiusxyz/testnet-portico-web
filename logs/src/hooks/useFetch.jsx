import { useEffect, useState } from 'react';
import { useQueryRoles } from './useQueryRoles';
import { useQueryLogs } from './useQueryLogs';

const transformLogs = (logs) => {
  latency = log.timestamp - previousTimestamp;
  const humanLog = {
    from: log.from,
    to: ['A', 'B'].includes(log.to) ? `Rollup ${log.to}` : log.to,
    what: matching[log.data].what,
    event: matching[log.data].event,
    latency,
  };
  previousTimestamp = log.timestamp;
  return humanLog;
};

export const useFetch = async () => {
  useEffect(() => {
    const fetch = async () => {
      const { timestamp } = await useQueryRoles();
      const logs = await useQueryLogs(timestamp);

      let previousTimestamp = 0;

      const humanLogs = transformLogs(logs, timestamp);
      setLogs(humanLogs);
    };
    fetch();
  }, []);
};
