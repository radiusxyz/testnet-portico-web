import LR0 from './LR0';
import LR1 from './LR1';
import Circle from './Circle';
import React, { useEffect, useState } from 'react';

import { pathColors, highlightColors, filters, paths, defaultMapping, messages } from '../../assets/Data';

import { usePortico } from '../../contexts/PorticoCtx';

const Test = () => {
  const {
    globalRoles,
    globalLabels,
    globalLogs,
    globalIndex,

    setGlobalRoles,
    setGlobalLabels,
    setGlobalLogs,
    setGlobalIndex,

    queryLogs,
  } = usePortico();

  const [isFinished, setIsFinished] = useState(false);
  const [logs, setLogs] = useState(globalLogs || []);
  const [labels, setLabels] = useState(globalLabels);
  const [index, setIndex] = useState(globalIndex);
  const [roles, setRoles] = useState(globalRoles);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [endIsReached, setEndIsReached] = useState(false);
  const [timestamp, setTimestamp] = useState(0);

  const rawLog = logs[index] || {};

  const log = {
    from: roles[rawLog.from],
    to: roles[rawLog.to],
    data: rawLog.data,
  };

  const [from, to, data] = [log.from, log.to, log.data];

  const motionPath = paths[from + to];
  const isReversed = ['l', 'u'].includes(to) && ['f0', 'f1', 'f2', 'f3', 'l'].includes(from);

  const mapping =
    from && to && data
      ? {
          ...defaultMapping,
          entities: {
            ...defaultMapping.entities,
            [from]: { ...defaultMapping.entities[from], highlight: highlightColors[data], filter: filters[data][from] },
            [to]: { ...defaultMapping.entities[to], highlight: highlightColors[data], filter: filters[data][to] },
            circle: { color: highlightColors[data] },
          },
          paths: {
            ...defaultMapping.paths,
            [motionPath]: pathColors[data],
          },
        }
      : defaultMapping;

  const roleSetter = (prevState) => {
    const oldLeader = rawLog.from;
    const newRole = prevState[rawLog.to];

    return {
      ...prevState,
      [oldLeader]: newRole,
      [rawLog.to]: 'l',
    };
  };

  useEffect(() => {
    if (logs.length > 0) {
      setIsDataLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isDataLoaded && index >= logs.length - 1) {
      setIsDataLoaded(false);
    }
  }, [logs, index, isDataLoaded]);

  useEffect(() => {
    console.log('index:', index, 'isDataLoaded:', isDataLoaded);
  }, [index, isDataLoaded]);

  useEffect(() => {
    console.log('logs.length', logs.length, logs);
  }, [logs]);

  useEffect(() => {
    let timeoutId;
    if (!isDataLoaded) {
      const queryNext = async () => {
        const newLogs = await queryLogs(logs[logs.length - 1]?.timestamp);
        if (newLogs.length > 0) {
          setLogs(newLogs);
          setIndex(0);
        } else {
          timeoutId = setTimeout(queryNext, 1000);
        }
      };

      queryNext();
    }
    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [logs, isDataLoaded]);

  // Syncing the Portico context state values with local state values

  useEffect(() => {
    setGlobalIndex(index);
  }, [index]);

  useEffect(() => {
    setGlobalLogs(logs);
  }, [logs]);

  useEffect(() => {
    setGlobalLabels(labels);
  }, [labels]);

  useEffect(() => {
    setLabels(getLabels(roles));
    setGlobalRoles(roles);
  }, [roles]);

  return (
    <svg width='1100' height='548' viewBox='0 0 1100 548' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <LR0 stroke={mapping.paths.lr0} />
      <LR1 stroke={mapping.paths.lr1} />
      {!isFinished && (
        <Circle
          color={mapping.entities.circle.color}
          isFinished={isFinished}
          motionPath={motionPath}
          duration={3000}
          data={data}
          isReversed={isReversed}
          setIsFinished={setIsFinished}
        />
      )}
    </svg>
  );
};

export default Test;
