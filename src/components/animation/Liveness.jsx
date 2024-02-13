import React, { useCallback, useEffect, useRef, useState } from 'react';
import { colors, filters, paths } from '../../assets/data';
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

const getColor = (data) => colors[data] || '#5C5B5E';
const getFilter = (data, node) => filters[data]?.[node] || 'none';
const getPathColor = (log, from, to) =>
  (log.from === from && log.to === to) || (log.from === to && log.to === from) ? getColor(log.data) : '#5C5B5E';
const getHighlightColor = (log, node) => (log.from === node || log.to === node ? getColor(log.data) : 'transparent');
const getFilterColor = (log, node) => (log.from === node || log.to === node ? getFilter(log.data, node) : 'none');
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

  const updateIndex = useCallback(() => {
    if (globalLogs && globalLogs.length) {
      setGlobalIndex((prevIndex) => prevIndex + 1);
    } else {
      setGlobalIndex(0);
    }
  }, [globalLogs.length]);

  useEffect(() => {
    if (globalIndex === globalLogs.length) {
      const queryNext = async () => {
        const newLogs = await queryLogs(globalLogs[globalLogs.length - 1]?.timestamp);
        setGlobalLogs(newLogs);
        setGlobalIndex(0);
      };
      queryNext();
    }
  }, [globalIndex]);

  useEffect(() => {
    if (isFinished) {
      updateIndex();
      setIsFinished(false);
    }
  }, [isFinished, updateIndex]);

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
  const motionPath = paths[log.from + log.to];
  const isReversed = ['l', 'u'].includes(log.to) && ['f0', 'f1', 'f2', 'f3'].includes(log.from);

  return (
    <svg width='1100' height='548' viewBox='0 0 1100 548' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {/* The following are the paths from one node to another, i.e. UF0 is the path from 'user' to 'follower 0' */}
      <UF0 stroke={getPathColor(log, 'u', 'f0')} />
      <UF1 stroke={getPathColor(log, 'u', 'f1')} />
      <UF2 stroke={getPathColor(log, 'u', 'f2')} />
      <UF3 stroke={getPathColor(log, 'u', 'f3')} />
      <UL stroke={getPathColor(log, 'u', 'l')} />
      <F0L stroke={getPathColor(log, 'f0', 'l')} />
      <F1L stroke={getPathColor(log, 'f1', 'l')} />
      <F2L stroke={getPathColor(log, 'f2', 'l')} />
      <F3L stroke={getPathColor(log, 'f3', 'l')} />
      <LR0 stroke={getPathColor(log, 'l', 'r0')} />
      <LR1 stroke={getPathColor(log, 'l', 'r1')} />
      {/* Circle is the dot moving along the path */}
      {!isFinished && (
        <Circle
          color={getColor(log.data)}
          isFinished={isFinished}
          motionPath={motionPath}
          duration={2000}
          isReversed={isReversed}
          setIsFinished={setIsFinished}
        />
      )}
      {/* Entities themselves */}
      <U filterColor={getFilterColor(log, 'u')} highlightColor={getHighlightColor(log, 'u')} />
      <F0 id={globalLabels.f0} filterColor={getFilterColor(log, 'f0')} highlightColor={getHighlightColor(log, 'f0')} />
      <F1 id={globalLabels.f1} filterColor={getFilterColor(log, 'f1')} highlightColor={getHighlightColor(log, 'f1')} />
      <F2 id={globalLabels.f2} filterColor={getFilterColor(log, 'f2')} highlightColor={getHighlightColor(log, 'f2')} />
      <F3 id={globalLabels.f3} filterColor={getFilterColor(log, 'f3')} highlightColor={getHighlightColor(log, 'f3')} />
      <L
        id={globalLabels.l}
        filterColor={getFilterColor(log, 'l')}
        highlightColor={getHighlightColor(log, 'l')}
        livenessColor={log.data === 'lc' && isFinished ? '#FFD875' : '#5C5B5E'}
      />
      <R0 filterColor={getFilterColor(log, 'r0')} highlightColor={getHighlightColor(log, 'r0')} />
      <R1 filterColor={getFilterColor(log, 'r1')} highlightColor={getHighlightColor(log, 'r1')} />
      <circle r='5' fill='#090a0f'></circle>
      {/* Message is the text box appearing on the path */}
      <Message log={log} />
      <Defs />
      <Instructions />
    </svg>
  );
};

export default Liveness;
