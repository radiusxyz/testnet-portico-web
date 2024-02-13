import React, { useEffect, useState } from 'react';
import { pathColors, highlightColors, filters, paths, defaultMapping } from '../../assets/data';
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
import Message from './Message';
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

const getRole = (id, roles) => roles[id];
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
  } = usePortico();

  const [isFinished, setIsFinished] = useState(false);

  const rawLog = globalLogs[globalIndex] || {};

  useEffect(() => {
    if (globalIndex === globalLogs.length) {
      const queryNext = async () => {
        // const newLogs = await queryLogs(globalLogs[globalLogs.length - 1]?.timestamp);
        const newLogs = await queryLogs(1707560155215);
        setGlobalLogs(newLogs);
        setGlobalIndex(0);
      };
      queryNext();
    }
  }, [globalIndex]);

  useEffect(() => {
    if (isFinished) {
      setGlobalIndex((prevIndex) => prevIndex + 1);
      setIsFinished(false);
    }
  }, [isFinished]);

  useEffect(() => {
    if (rawLog.data === 'lc') {
      setGlobalRoles((prevState) => {
        const oldLeader = rawLog.from;
        const newRole = getRole(rawLog.to, prevState);

        return {
          ...prevState,
          [oldLeader]: newRole,
          [rawLog.to]: 'l',
        };
      });
    }
  }, [globalIndex]);

  useEffect(() => {
    if (rawLog.data === 'lc') {
      setGlobalLabels(getLabels(globalRoles));
    }
  }, [globalRoles]);

  const log = {
    from: globalRoles[rawLog.from],
    to: globalRoles[rawLog.to],
    data: rawLog.data,
  };

  useEffect(() => {
    // console.log(globalIndex, log);
  }, [globalIndex]);
  const [from, to, data] = [log.from, log.to, log.data];
  const motionPath = paths[from + to];
  const isReversed = ['l', 'u'].includes(log.to) && ['f0', 'f1', 'f2', 'f3', 'l'].includes(log.from);
  const mapping = {
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
  };
  return (
    <svg width='1100' height='548' viewBox='0 0 1100 548' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {/* The following are the paths from one node to another, i.e. UF0 is the path from 'user' to 'follower 0' */}

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
      {/* Circle is the dot moving along the path */}
      {!isFinished && (
        <Circle
          color={mapping.entities.circle.color}
          isFinished={isFinished}
          motionPath={motionPath}
          duration={1000}
          data={data}
          isReversed={isReversed}
          setIsFinished={setIsFinished}
        />
      )}
      {/* Entities themselves */}
      <U filterColor={mapping.entities.u.filter} highlightColor={mapping.entities.u.highlight} />
      <F0
        id={globalLabels.f0}
        filterColor={mapping.entities.f0.filter}
        highlightColor={mapping.entities.f0.highlight}
      />
      <F1
        id={globalLabels.f1}
        filterColor={mapping.entities.f1.filter}
        highlightColor={mapping.entities.f1.highlight}
      />
      <F2
        id={globalLabels.f2}
        filterColor={mapping.entities.f2.filter}
        highlightColor={mapping.entities.f2.highlight}
      />
      <F3
        id={globalLabels.f3}
        filterColor={mapping.entities.f3.filter}
        highlightColor={mapping.entities.f3.highlight}
      />
      <L
        id={globalLabels.l}
        filterColor={mapping.entities.l.filter}
        highlightColor={mapping.entities.l.highlight}
        livenessColor={data === 'ld' ? '#5C5B5E' : '#FFD875'}
      />
      <R0 filterColor={mapping.entities.r0.filter} highlightColor={mapping.entities.r0.highlight} />
      <R1 filterColor={mapping.entities.r1.filter} highlightColor={mapping.entities.r1.highlight} />
      <circle r='5' fill='#090a0f'></circle>
      {/* Message is the text box appearing on the path */}
      <Message log={log} />
      <Defs />
      <Instructions />
    </svg>
  );
};

export default Liveness;
