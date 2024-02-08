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

function getPathColor(log, from, to) {
  if ((log.from === from && log.to === to) || (log.from === to && log.to === from)) {
    return getColor(log.data);
  }
  return '#5C5B5E';
}

function getHighlightColor(log, node) {
  return log.from === node || log.to === node ? getColor(log.data) : 'transparent';
}

function getFilterColor(log, node) {
  return log.from === node || log.to === node ? getFilter(log.data, node) : 'none';
}

function getRole(id, roles) {
  return roles[id];
}

const Liveness = () => {
  const { pLogs, setPLogs, pRoles, setPRoles, pLabels, setPLabels, preventNewLogs, pIndex, setPIndex } = usePortico();

  // Assuming logs, roles, and labels are directly used from the context now
  const [currentIndex, setCurrentIndex] = useState(pIndex);
  const [isFinished, setIsFinished] = useState(false);

  const currentPLog = pLogs[currentIndex] || {};

  const currentLog = {
    from: pRoles[currentPLog.from],
    to: pRoles[currentPLog.to],
    data: currentPLog.data,
  };

  const handleIsFinished = useCallback(() => {
    setIsFinished(true);
  }, []);

  const updateIndex = useCallback(() => {
    if (pLogs && pLogs.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [pLogs.length]);

  useEffect(() => {
    setPIndex(() => currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === pLogs.length) {
      setCurrentIndex(0);
      preventNewLogs(false);
      setPLogs([]);
    }
  }, [currentIndex]);

  useEffect(() => {
    console.log(currentIndex, pLogs.length);
  }, [currentIndex, pLogs.length]);

  useEffect(() => {
    if (isFinished) {
      updateIndex();
      setIsFinished(false);
    }
  }, [isFinished, updateIndex]);

  useEffect(() => {
    if (currentPLog.data === 'lc') {
      setPRoles((prevState) => {
        const oldLeader = currentPLog.from;
        const newRole = getRole(currentPLog.to, prevState);

        return {
          ...prevState,
          [oldLeader]: newRole,
          [currentPLog.to]: 'l',
        };
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentPLog.data === 'lc') {
      const swapped = {};

      Object.entries(pRoles).forEach(([key, value]) => {
        swapped[value] = key;
      });
      setPLabels({ ...swapped });
    }
  }, [pRoles]);

  // console.log(livenessColor);

  // Assuming getRole(), getPathColor(), getColor(), getFilterColor(), and getHighlightColor() are defined elsewhere
  const motionPath = paths[currentLog.from + currentLog.to];
  const isReversed = ['l', 'u'].includes(currentLog.to) && ['f0', 'f1', 'f2', 'f3'].includes(currentLog.from);

  return (
    <svg width='1100' height='548' viewBox='0 0 1100 548' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {/* The following are the paths from one node to another, i.e. UF0 is the path from 'user' to 'follower 0' */}
      <UF0 stroke={getPathColor(currentLog, 'u', 'f0')} />
      <UF1 stroke={getPathColor(currentLog, 'u', 'f1')} />
      <UF2 stroke={getPathColor(currentLog, 'u', 'f2')} />
      <UF3 stroke={getPathColor(currentLog, 'u', 'f3')} />
      <UL stroke={getPathColor(currentLog, 'u', 'l')} />
      <F0L stroke={getPathColor(currentLog, 'f0', 'l')} />
      <F1L stroke={getPathColor(currentLog, 'f1', 'l')} />
      <F2L stroke={getPathColor(currentLog, 'f2', 'l')} />
      <F3L stroke={getPathColor(currentLog, 'f3', 'l')} />
      <LR0 stroke={getPathColor(currentLog, 'l', 'r0')} />
      <LR1 stroke={getPathColor(currentLog, 'l', 'r1')} />
      {/* Circle is the dot moving along the path */}
      {!isFinished && (
        <Circle
          color={getColor(currentLog.data)}
          isFinished={isFinished}
          motionPath={motionPath}
          duration={2000}
          isReversed={isReversed}
          handleIsFinished={handleIsFinished}
        />
      )}
      {/* Entities themselves */}
      <U filterColor={getFilterColor(currentLog, 'u')} highlightColor={getHighlightColor(currentLog, 'u')} />
      <F0
        id={pLabels.f0}
        filterColor={getFilterColor(currentLog, 'f0')}
        highlightColor={getHighlightColor(currentLog, 'f0')}
      />
      <F1
        id={pLabels.f1}
        filterColor={getFilterColor(currentLog, 'f1')}
        highlightColor={getHighlightColor(currentLog, 'f1')}
      />
      <F2
        id={pLabels.f2}
        filterColor={getFilterColor(currentLog, 'f2')}
        highlightColor={getHighlightColor(currentLog, 'f2')}
      />
      <F3
        id={pLabels.f3}
        filterColor={getFilterColor(currentLog, 'f3')}
        highlightColor={getHighlightColor(currentLog, 'f3')}
      />
      <L
        id={pLabels.l}
        filterColor={getFilterColor(currentLog, 'l')}
        highlightColor={getHighlightColor(currentLog, 'l')}
        livenessColor={currentLog.data === 'lc' && isFinished ? '#FFD875' : '#5C5B5E'}
      />
      <R0 filterColor={getFilterColor(currentLog, 'r0')} highlightColor={getHighlightColor(currentLog, 'r0')} />
      <R1 filterColor={getFilterColor(currentLog, 'r1')} highlightColor={getHighlightColor(currentLog, 'r1')} />
      <circle r='5' fill='#090a0f'></circle>
      {/* Message is the text box appearing on the path */}
      <Message currentLog={currentLog} />
      <Defs />
      <Instructions />
    </svg>
  );
};

export default Liveness;
