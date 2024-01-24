import React, { useEffect, useRef, useState } from 'react';
import Node from './Node';
import { initialParams } from '../assets/data';

const r = 40;
const duration = 1500;

const SVG = ({ logs }) => {
  console.log(logs);
  const [params, setParams] = useState(initialParams);

  const [currentIndex, setCurrentIndex] = useState(0);
  const animateMotionRef = useRef(null);

  useEffect(() => {
    // Restart the animation
    const animateMotionElement = animateMotionRef.current;
    if (animateMotionElement) {
      animateMotionElement.beginElement();
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logs.length);
    }, duration); // Adjust interval as needed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateParams = (key, newId) => {
      if (params[key].id !== newId) {
        setParams((prevState) => ({
          ...prevState,
          [key]: { ...prevState[key], id: newId },
        }));
      }
    };

    const currentLog = logs[currentIndex];
    updateParams(currentLog.from, currentLog.fid);
    updateParams(currentLog.to, currentLog.tid);

    if (currentLog.data === 'lc') {
      setParams((prevState) => ({
        ...prevState,
        l: { ...prevState.l, id: currentLog.tid },
        [currentLog.to]: {
          ...prevState[currentLog.to],
          id: currentLog.fid,
        },
      }));
    }
  }, [currentIndex]);

  let dynPathData;
  let animationKey;
  const currentLog = logs[currentIndex];
  const data = currentLog.data;
  if (data !== 'lc') {
    dynPathData = `M ${params[currentLog.from].x + r},${params[currentLog.from].y + r} ${params[currentLog.to].x + r},${
      params[currentLog.to].y + r
    }`;
    animationKey = `path-${currentIndex}`;
  }

  return (
    <svg width='100%' height='80%' xmlns='http://www.w3.org/2000/svg'>
      <path
        id={animationKey}
        d={dynPathData}
        fill='none'
        // stroke='red'
        strokeWidth='2'
      />
      {(data === 'tx' || data === 'lc') && (
        <g transform='translate(-20, -20)'>
          <path fill='#ffc107' d='M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z' />
          <path
            fill='#fff8e1'
            d='M17,34V14h8.199c2.41,0,4.234,0.465,5.48,1.395s1.867,2.293,1.867,4.086	c0,0.98-0.25,1.844-0.746,2.59c-0.5,0.746-1.195,1.293-2.086,1.641c1.016,0.258,1.816,0.773,2.402,1.555	C32.703,26.043,33,26.992,33,28.121c0,1.922-0.609,3.379-1.828,4.367S28.219,33.98,25.965,34H17z M21,22h4.363	c2.063-0.035,3.098-0.824,3.098-2.445c0-0.906-0.262-1.559-0.785-1.957S26.328,17,25.199,17H21V22z M21,25v6h4.844	C26.805,31,29,30.531,29,28.391S27.883,25.027,26,25H21z'
          />
          <path fill='#fff8e1' d='M20,11h3v5h-3V11z M25,11h3v5h-3V11z M20,32h3v5h-3V32z M25,32h3v5h-3V32z' />
          <animateMotion ref={animateMotionRef} dur={`${duration / 1000}s`} key={currentIndex}>
            <mpath href={`#${animationKey}`} />
          </animateMotion>
        </g>
      )}
      {(data === 'oc' || data === 'lc') && (
        <g transform={`translate(-20, -20) scale(2)`}>
          <path
            fillRule='evenodd'
            d='M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm2.25 8.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 3a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z'
            clipRule='evenodd'
            fill='green'
          />
          <animateMotion ref={animateMotionRef} dur={`${duration / 1000}s`} key={currentIndex}>
            <mpath href={`#${animationKey}`} />
          </animateMotion>
        </g>
      )}
      {(data === 'block' || data === 'lc') && (
        <g transform={`translate(-20, -20) scale(2)`}>
          <path
            fill='lightblue'
            d='M10.362 1.093a.75.75 0 0 0-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925ZM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0 0 18 14.25V6.443ZM9.25 18.693v-8.25l-7.25-4v7.807a.75.75 0 0 0 .388.657l6.862 3.786Z'
          />
          <animateMotion ref={animateMotionRef} dur={`${duration / 1000}s`} key={currentIndex}>
            <mpath href={`#${animationKey}`} />
          </animateMotion>
        </g>
      )}
      {Object.values(params).map((param, index) => (
        <Node key={index} {...param} />
      ))}
    </svg>
  );
};

export default SVG;
