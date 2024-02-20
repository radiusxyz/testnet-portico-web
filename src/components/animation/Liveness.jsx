import React, { useEffect, useState } from 'react';
import { pathColors, highlightColors, filters, paths, defaultMapping, messages } from '../../assets/Data';
import Defs from './Defs';
import U from './U';
import F1 from './F1';
import F2 from './F2';
import F3 from './F3';
import L from './L';
import F0 from './F0';
import F0L from './F0L';
import F1L from './F1L';
import F2L from './F2L';
import F3L from './F3L';
import R0 from './R0';
import R1 from './R1';
import UF0 from './UF0';
import UF1 from './UF1';
import UF2 from './UF2';
import UF3 from './UF3';
import UL from './UL';
import LR0 from './LR0';
import LR1 from './LR1';
import Circle from './Circle';
import Instructions from './Instructions';
import { usePortico } from '../../contexts/PorticoCtx';
import TestCircle from './TestCircle';

const getLabels = (roles) => Object.fromEntries(Object.entries(roles).map(([id, role]) => [role, id]));

const Liveness = () => {
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
    queryRoles,
  } = usePortico();

  const [isFinished, setIsFinished] = useState(false);
  const [logs, setLogs] = useState(globalLogs || []);
  const [labels, setLabels] = useState(globalLabels);
  const [index, setIndex] = useState(globalIndex);
  const [roles, setRoles] = useState(globalRoles);

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
    if (Object.keys(roles).length === 0) {
      setRoles(globalRoles);
    }
  }, [globalRoles]);

  useEffect(() => {
    if (rawLog.data === 'ld') {
      setRoles(roleSetter);
    }
  }, [index]);

  useEffect(() => {
    let id;
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
        id = setTimeout(async () => {
          const newLogs = await queryLogs(logs[logs.length - 1]?.timestamp || roles.timestamp);

          // if you get a non empty array, then
          if (newLogs.length > 0) {
            // set new logs, and
            setLogs(newLogs);
            // and set new index
            setIndex(0);
            // and start the animation again
            setIsFinished(false);
          } else {
            queryNext();
          }
        }, 1000);
      };

      // call that function
      queryNext();
    }

    return () => {
      clearTimeout(id);
    };
  }, [isFinished, logs.length, index, roles]);

  // useEffect(() => {
  //   if (isFinished) {
  //     if (rawLog.data === 'ld') {
  //       setRoles(roleSetter);
  //     }

  //     setIsFinished(false);
  //     setIndex((prevIndex) => prevIndex + 1);
  //   }
  // }, [isFinished, rawLog]);

  // Consolling
  useEffect(() => {
    console.log(index, logs.length, logs);
  }, [logs, index]);

  useEffect(() => {
    console.log(roles);
  }, [roles]);

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
      {/* The following are the paths from one node to another, i.e. UF0 is the path from 'User' to 'Follower 0' */}

      <UF0 stroke={mapping.paths.uf0} />
      <UF1 stroke={mapping.paths.uf1} />
      <UF2 stroke={mapping.paths.uf2} />
      <UF3 stroke={mapping.paths.uf3} />
      <UL stroke={mapping.paths.ul} />
      <F0L stroke={mapping.paths.f0l} />
      <F1L stroke={mapping.paths.f1l} />
      <F2L stroke={mapping.paths.f2l} />
      <F3L stroke={mapping.paths.f3l} />
      <LR0 stroke={mapping.paths.lr0} />
      <LR1 stroke={mapping.paths.lr1} />

      {/* Dot moving along the path */}
      <TestCircle
        color={mapping.entities.circle.color}
        isFinished={isFinished}
        motionPath={motionPath}
        duration={3000}
        isReversed={isReversed}
        setIsFinished={setIsFinished}
      />

      {/* Entities themselves */}

      {/* User */}
      <U filterColor={mapping.entities.u.filter} highlightColor={mapping.entities.u.highlight} />

      {/* Follower 0 */}
      <F0 id={labels.f0} filterColor={mapping.entities.f0.filter} highlightColor={mapping.entities.f0.highlight} />

      {/* Follower 1 */}
      <F1 id={labels.f1} filterColor={mapping.entities.f1.filter} highlightColor={mapping.entities.f1.highlight} />

      {/* Follower 2 */}
      <F2 id={labels.f2} filterColor={mapping.entities.f2.filter} highlightColor={mapping.entities.f2.highlight} />

      {/* Follower 3 */}
      <F3 id={labels.f3} filterColor={mapping.entities.f3.filter} highlightColor={mapping.entities.f3.highlight} />

      {/* Leader */}
      <L
        id={labels.l}
        filterColor={mapping.entities.l.filter}
        highlightColor={mapping.entities.l.highlight}
        livenessColor={data === 'ld' ? '#5C5B5E' : '#FFD875'}
      />

      {/* Rollup 0 */}
      <R0 filterColor={mapping.entities.r0.filter} highlightColor={mapping.entities.r0.highlight} />

      {/* Rollup 1 */}
      <R1 filterColor={mapping.entities.r1.filter} highlightColor={mapping.entities.r1.highlight} />

      {/* Patch for the circle on the top left corner */}
      <circle r='5' fill='#090a0f'></circle>

      {/* Message is the text box appearing on the path */}
      {messages[from + to + data] || messages[to + from + data]}
      <Defs />
      <Instructions />
    </svg>
  );
};

export default Liveness;
