import Circle from './animation/Circle';
import React, { useEffect, useState } from 'react';

import { usePortico } from '../contexts/PorticoCtx';
import { pathColors, highlightColors, filters, paths, defaultMapping, messages } from '../assets/Data';

import TestCircle from './animation/TestCircle';

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

  const [logs, setLogs] = useState(globalLogs || []);
  const [index, setIndex] = useState(globalIndex);
  const [roles] = useState(globalRoles);

  const rawLog = logs[index] || {};

  const log = {
    from: roles[rawLog.from],
    to: roles[rawLog.to],
    data: rawLog.data,
  };

  const [from, to, data] = [log.from, log.to, log.data];

  const motionPath = paths[from + to];

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

  /* 

We have an animation

1. Assume there are non-empty logs on initial render.

2. Initial states are set, animation starts, 6 seconds passes, finishes.

3. Index is updated.

4. If index is equal to the length - 1, then do not trigger animation again.

*/

  useEffect(() => {
    console.log(index);
  }, [index]);

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // If it finished and the index is lesser than the length of the array
    if (isFinished && index < logs.length) {
      // restart it, and
      setIsFinished(false);

      // increase the index
      setIndex((prevIndex) => prevIndex + 1);

      // If it is finished and the index is not lesser than the length of the array
    } else if ((isFinished && index >= logs.length) || (!isFinished && logs.length === 0)) {
      // then define a function for fetching new logs
      const queryNext = async () => {
        const newLogs = await queryLogs(logs[logs.length - 1]?.timestamp || roles.timestamp);

        // if you get a non empty array, then
        if (newLogs.length > 0) {
          // set new logs, and
          setLogs(newLogs);
          // and set new index
          setIndex(0);
          // and start the animation again
          setIsFinished(false);
        }
      };

      // call that function
      queryNext();
    }
  }, [isFinished, logs.length, index, roles]);

  useEffect(() => {
    setGlobalIndex(index);
  }, [index]);

  useEffect(() => {
    setGlobalLogs(logs);
  }, [logs]);

  useEffect(() => {
    setGlobalRoles(roles);
  }, [roles]);

  return (
    <svg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path id='lr0' d='M10 50 L190 50' stroke='red' />
      <path id='lr1' d='M10 150 L190 150' stroke='blue' />
      <TestCircle
        color={mapping.entities.circle.color}
        isFinished={isFinished}
        ll={logs.length}
        motionPath={motionPath}
        duration={1000}
        setIsFinished={setIsFinished}
      />
    </svg>
  );
};

export default Test;
