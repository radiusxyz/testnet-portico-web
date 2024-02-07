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
  const { porticoLogs, porticoRoles, porticoLabels, preventNewLogs, pIndex } = usePortico();

  // Assuming logs, roles, and labels are directly used from the context now
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleIsFinished = useCallback(() => {
    setIsFinished(true);
  }, []);

  const updateIndex = useCallback(() => {
    if (porticoLogs.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [porticoLogs.length]);

  useEffect(() => {
    if (currentIndex === porticoLogs.length) {
      setCurrentIndex(0);
      preventNewLogs(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    console.log(currentIndex, porticoLogs.length);
  }, [currentIndex, porticoLogs.length]);

  useEffect(() => {
    if (isFinished) {
      updateIndex();
      setIsFinished(false);
    }
  }, [isFinished, updateIndex]);

  const currentDbLog = porticoLogs[currentIndex] || {}; // Default to empty object to avoid undefined errors
  // console.log(currentDbLog, currentIndex);
  // console.log(currentDbLog);

  // You might need a function to map 'from' and 'to' to actual roles/labels
  const currentLog = {
    from: porticoRoles[currentDbLog.from],
    to: porticoRoles[currentDbLog.to],
    data: currentDbLog.data,
  };

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
          duration={1000}
          isReversed={isReversed}
          handleIsFinished={handleIsFinished}
        />
      )}
      {/* Entities themselves */}
      <U filterColor={getFilterColor(currentLog, 'u')} highlightColor={getHighlightColor(currentLog, 'u')} />
      <F0
        id={porticoLabels.f0}
        filterColor={getFilterColor(currentLog, 'f0')}
        highlightColor={getHighlightColor(currentLog, 'f0')}
      />
      <F1
        id={porticoLabels.f1}
        filterColor={getFilterColor(currentLog, 'f1')}
        highlightColor={getHighlightColor(currentLog, 'f1')}
      />
      <F2
        id={porticoLabels.f2}
        filterColor={getFilterColor(currentLog, 'f2')}
        highlightColor={getHighlightColor(currentLog, 'f2')}
      />
      <F3
        id={porticoLabels.f3}
        filterColor={getFilterColor(currentLog, 'f3')}
        highlightColor={getHighlightColor(currentLog, 'f3')}
      />
      <L
        id={porticoLabels.l}
        filterColor={getFilterColor(currentLog, 'l')}
        highlightColor={getHighlightColor(currentLog, 'l')}
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
