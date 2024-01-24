import React, { useCallback, useEffect, useRef, useState } from 'react';
import { dbData, initialIDs, colors, filters, paths } from '../assets/data';
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
import cuid from 'cuid';

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
const Test = () => {
  const [IDs, setIDs] = useState(initialIDs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [duration] = useState(2000);
  const [isFinished, setIsFinished] = useState(false);
  const handleIsFinished = useCallback(() => {
    setIsFinished(true);
  }, []);

  const updateIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dbData.length);
  };

  useEffect(() => {
    if (isFinished) {
      updateIndex();
      setIsFinished(false);
    }
  }, [currentIndex, isFinished]);

  const currentLog = dbData[currentIndex];

  useEffect(() => {
    const updateIDs = (key, newId) => {
      if (IDs[key].id !== newId) {
        setIDs((prevState) => ({
          ...prevState,
          [key]: { ...prevState[key], id: newId },
        }));
      }
    };

    updateIDs(currentLog.from, currentLog.fid);
    updateIDs(currentLog.to, currentLog.tid);

    if (currentLog.data === 'lc') {
      setIDs((prevState) => ({
        ...prevState,
        l: { ...prevState.l, id: currentLog.tid },
        [currentLog.to]: {
          ...prevState[currentLog.to],
          id: currentLog.fid,
        },
      }));
    }
  }, [currentIndex]);

  const motionPath = paths[currentLog.from + currentLog.to];
  const isReversed = ['l', 'u'].includes(currentLog.to) && ['f0', 'f1', 'f2', 'f3'].includes(currentLog.from);

  return (
    <svg width='1100' height='406' viewBox='0 0 1100 406' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
          duration={duration}
          isReversed={isReversed}
          handleIsFinished={handleIsFinished}
        />
      )}
      {/* Entities themselves */}
      <U
        id={IDs.u.id}
        filterColor={getFilterColor(currentLog, 'u')}
        highlightColor={getHighlightColor(currentLog, 'u')}
      />
      <F0
        id={IDs.f0.id}
        filterColor={getFilterColor(currentLog, 'f0')}
        highlightColor={getHighlightColor(currentLog, 'f0')}
      />
      <F1
        id={IDs.f1.id}
        filterColor={getFilterColor(currentLog, 'f1')}
        highlightColor={getHighlightColor(currentLog, 'f1')}
      />
      <F2
        id={IDs.f2.id}
        filterColor={getFilterColor(currentLog, 'f2')}
        highlightColor={getHighlightColor(currentLog, 'f2')}
      />
      <F3
        id={IDs.f3.id}
        filterColor={getFilterColor(currentLog, 'f3')}
        highlightColor={getHighlightColor(currentLog, 'f3')}
      />
      <L
        id={IDs.l.id}
        filterColor={getFilterColor(currentLog, 'l')}
        highlightColor={getHighlightColor(currentLog, 'l')}
      />
      <R0
        id={IDs.r0.id}
        filterColor={getFilterColor(currentLog, 'r0')}
        highlightColor={getHighlightColor(currentLog, 'r0')}
      />
      <R1
        id={IDs.r1.id}
        filterColor={getFilterColor(currentLog, 'r1')}
        highlightColor={getHighlightColor(currentLog, 'r1')}
      />
      {/* Message is the text box appearing on the path */}
      <Message currentLog={currentLog} />
      <Defs />
    </svg>
  );
};

export default Test;
