import React, { useEffect, useRef, useState } from 'react';
import { dbData } from '../assets/data';

const duration = 3000;

const paths = {
  uf0: 'uf0',
  f0u: 'uf0',
  uf1: 'uf1',
  f1u: 'uf1',
  uf2: 'uf2',
  f2u: 'uf2',
  uf3: 'uf3',
  f3u: 'uf3',

  ul: 'ul',
  lu: 'ul',

  f0l: 'f0l',
  lf0: 'f0l',
  f1l: 'f1l',
  lf1: 'f1l',
  f2l: 'f2l',
  lf2: 'f2l',
  f3l: 'f3l',
  lf3: 'f3l',

  lr0: 'lr0',
  lr1: 'lr1',
};

function getColor(currentLog, from, to) {
  if (
    currentLog.data === 'tx' &&
    ((currentLog.from === from && currentLog.to === to) || (currentLog.from === to && currentLog.to === from))
  ) {
    return '#FF7070';
  } else if (
    currentLog.data === 'oc' &&
    ((currentLog.from === from && currentLog.to === to) || (currentLog.from === to && currentLog.to === from))
  ) {
    return '#1BC199';
  } else if (currentLog.data === 'block' && currentLog.to === to) {
    return '#FF7070';
  } else {
    return '#E2E2E2';
  }
}

const Liveness = () => {
  const [logs, setLogs] = useState(dbData);
  const [currentIndex, setCurrentIndex] = useState(0);
  //   const [motionPath, setMotionPath] = useState('');
  const animateMotionRef = useRef(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleReversed = (log) => {
    if (
      currentLog.to === 'l' &&
      (currentLog.from === 'f0' || currentLog.from === 'f1' || currentLog.from === 'f2' || currentLog.from === 'f3')
    ) {
      return true;
    }

    if (
      currentLog.to === 'u' &&
      (currentLog.from === 'f0' || currentLog.from === 'f1' || currentLog.from === 'f2' || currentLog.from === 'f3')
    ) {
      return true;
    }
    return false;
  };

  // Restart the animation on every log
  useEffect(() => {
    const animateMotionElement = animateMotionRef.current;
    if (animateMotionElement) {
      animateMotionElement.beginElement();
    }
  }, [currentIndex]);

  // Iterate through the logs
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logs.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  const currentLog = logs[currentIndex];

  const motionPath = paths[currentLog.from + currentLog.to];
  console.log(currentLog);

  return (
    <svg width='1119' height='494' viewBox='0 0 1119 494' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_6_1369)'>
        <path
          id='uf0'
          d='M137 170V86C137 72.1929 148.193 61 162 61H378'
          stroke={getColor(currentLog, 'u', 'f0')}
          strokeWidth='2'
        />

        <path
          id='uf1'
          d='M137 170V162C137 148.193 148.193 137 162 137H378'
          stroke={getColor(currentLog, 'u', 'f1')}
          strokeWidth='2'
        />
        <path id='ul' d='M176 208L662 208' stroke={getColor(currentLog, 'u', 'l')} strokeWidth='2' />

        <path
          id='uf2'
          d='M137 246V254C137 267.807 148.193 279 162 279H378'
          stroke={getColor(currentLog, 'u', 'f2')}
          strokeWidth='2'
        />
        <path
          id='uf3'
          d='M137 246V330C137 343.807 148.193 355 162 355H378'
          stroke={getColor(currentLog, 'u', 'f3')}
          strokeWidth='2'
        />
        <path
          id='f0l'
          d='M701 170V86C701 72.1929 689.807 61 676 61H460'
          stroke={getColor(currentLog, 'f0', 'l')}
          strokeWidth='2'
        />
        <path
          id='f1l'
          d='M701 170V162C701 148.193 689.807 137 676 137H460'
          stroke={getColor(currentLog, 'f1', 'l')}
          strokeWidth='2'
        />
        <path
          id='f2l'
          d='M701 246V254C701 267.807 689.807 279 676 279H460'
          stroke={getColor(currentLog, 'f2', 'l')}
          strokeWidth='2'
        />
        <path
          id='f3l'
          d='M701 246V330C701 343.807 689.807 355 676 355H460'
          stroke={getColor(currentLog, 'f3', 'l')}
          strokeWidth='2'
        />
        <path
          id='lr0'
          d='M738 208H900.5C914.307 208 925.5 196.807 925.5 183V150.5C925.5 142.492 931.992 136 940 136V136'
          stroke={getColor(currentLog, 'r0')}
          strokeWidth='2'
        />
        <path
          id='lr1'
          d='M738 208H900.5C914.307 208 925.5 219.193 925.5 233V265.5C925.5 273.508 931.992 280 940 280V280'
          stroke={getColor(currentLog, 'r1')}
          strokeWidth='2'
        />
        <g>
          <rect x='957' y='112' width='52' height='44' fill='white' stroke='#9377FF' strokeWidth='2' />
          <path
            d='M951 111C951 106.582 954.582 103 959 103H1001V119H959C954.582 119 951 115.418 951 111Z'
            fill='white'
            stroke='#9377FF'
            strokeWidth='2'
          />
          <path
            d='M951 156C951 151.582 954.582 148 959 148H1001V164H959C954.582 164 951 160.418 951 156Z'
            fill='white'
            stroke='#9377FF'
            strokeWidth='2'
          />
          <circle cx='1002' cy='111' r='8' fill='white' stroke='#9377FF' strokeWidth='2' />
          <circle cx='1002' cy='111' r='4' fill='white' stroke='#9377FF' strokeWidth='2' />
          <circle cx='1002' cy='156' r='8' fill='white' stroke='#9377FF' strokeWidth='2' />
          <circle cx='1002' cy='156' r='4' fill='white' stroke='#9377FF' strokeWidth='2' />
        </g>

        <g>
          <rect x='957' y='262' width='52' height='44' fill='white' stroke='#9377FF' strokeWidth='2' />
          <path
            d='M951 261C951 256.582 954.582 253 959 253H1001V269H959C954.582 269 951 265.418 951 261Z'
            fill='white'
            stroke='#9377FF'
            strokeWidth='2'
          />
          <path
            d='M951 306C951 301.582 954.582 298 959 298H1001V314H959C954.582 314 951 310.418 951 306Z'
            fill='white'
            stroke='#9377FF'
            strokeWidth='2'
          />
          <circle cx='1002' cy='261' r='8' fill='white' stroke='#9377FF' strokeWidth='2' />
          <circle cx='1002' cy='261' r='4' fill='white' stroke='#9377FF' strokeWidth='2' />
          <circle cx='1002' cy='306' r='8' fill='white' stroke='#9377FF' strokeWidth='2' />
          <circle cx='1002' cy='306' r='4' fill='white' stroke='#9377FF' strokeWidth='2' />
        </g>
        <g>
          <path
            d='M391.421 52.323L419 36.1591L446.579 52.323V84.677L419 100.841L391.421 84.677V52.323Z'
            fill='white'
            stroke='#9377FF'
            strokeWidth='2'
          />
          <path d='M447 52L419 69L391 52' stroke='#9377FF' strokeWidth='2' />
          <path d='M447 64L419 81L391 64' stroke='#9377FF' strokeWidth='2' />
          <path d='M447 75L419 92L391 75' stroke='#9377FF' strokeWidth='2' />
          <path d='M419 69L419 101' stroke='#9377FF' />
          <path d='M419 69L447 52V84.5L419 101.5V69Z' fill='#9377FF' />
          <path d='M447 64L419 81' stroke='white' strokeWidth='2' strokeLinecap='round' />
          <path d='M447 75L419 92' stroke='white' strokeWidth='2' strokeLinecap='round' />
          <circle cx='443.5' cy='59.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='72.5' r='1.5' fill='#9377FF' />
          <circle cx='443.5' cy='72.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='83.5' r='1.5' fill='#9377FF' />
          <circle cx='443.5' cy='83.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='93.5' r='1.5' fill='#9377FF' />
        </g>
        <g>
          <path
            d='M391.421 254.323L419 238.159L446.579 254.323V286.677L419 302.841L391.421 286.677V254.323Z'
            fill='white'
            stroke='#9377FF'
            strokeWidth='2'
          />
          <path d='M447 254L419 271L391 254' stroke='#9377FF' strokeWidth='2' />
          <path d='M447 266L419 283L391 266' stroke='#9377FF' strokeWidth='2' />
          <path d='M447 277L419 294L391 277' stroke='#9377FF' strokeWidth='2' />
          <path d='M419 271L419 303' stroke='#9377FF' />
          <path d='M419 271L447 254V286.5L419 303.5V271Z' fill='#9377FF' />
          <path d='M447 266L419 283' stroke='white' strokeWidth='2' strokeLinecap='round' />
          <path d='M447 277L419 294' stroke='white' strokeWidth='2' strokeLinecap='round' />
          <circle cx='443.5' cy='261.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='274.5' r='1.5' fill='#9377FF' />
          <circle cx='443.5' cy='274.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='285.5' r='1.5' fill='#9377FF' />
          <circle cx='443.5' cy='285.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='295.5' r='1.5' fill='#9377FF' />
        </g>
        <g>
          <path
            d='M391.421 130.323L419 114.159L446.579 130.323V162.677L419 178.841L391.421 162.677V130.323Z'
            fill='white'
            stroke='#9377FF'
            strokeWidth='2'
          />
          <path d='M447 130L419 147L391 130' stroke='#9377FF' strokeWidth='2' />
          <path d='M447 142L419 159L391 142' stroke='#9377FF' strokeWidth='2' />
          <path d='M447 153L419 170L391 153' stroke='#9377FF' strokeWidth='2' />
          <path d='M419 147L419 179' stroke='#9377FF' />
          <path d='M419 147L447 130V162.5L419 179.5V147Z' fill='#9377FF' />
          <path d='M447 142L419 159' stroke='white' strokeWidth='2' strokeLinecap='round' />
          <path d='M447 153L419 170' stroke='white' strokeWidth='2' strokeLinecap='round' />
          <circle cx='443.5' cy='137.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='150.5' r='1.5' fill='#9377FF' />
          <circle cx='443.5' cy='150.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='161.5' r='1.5' fill='#9377FF' />
          <circle cx='443.5' cy='161.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='171.5' r='1.5' fill='#9377FF' />
        </g>
        <g>
          <path
            d='M391.421 332.323L419 316.159L446.579 332.323V364.677L419 380.841L391.421 364.677V332.323Z'
            fill='white'
            stroke='#9377FF'
            strokeWidth='2'
          />
          <path d='M447 332L419 349L391 332' stroke='#9377FF' strokeWidth='2' />
          <path d='M447 344L419 361L391 344' stroke='#9377FF' strokeWidth='2' />
          <path d='M447 355L419 372L391 355' stroke='#9377FF' strokeWidth='2' />
          <path d='M419 349L419 381' stroke='#9377FF' />
          <path d='M419 349L447 332V364.5L419 381.5V349Z' fill='#9377FF' />
          <path d='M447 344L419 361' stroke='white' strokeWidth='2' strokeLinecap='round' />
          <path d='M447 355L419 372' stroke='white' strokeWidth='2' strokeLinecap='round' />
          <circle cx='443.5' cy='339.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='352.5' r='1.5' fill='#9377FF' />
          <circle cx='443.5' cy='352.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='363.5' r='1.5' fill='#9377FF' />
          <circle cx='443.5' cy='363.5' r='1.5' fill='white' />
          <circle cx='414.5' cy='373.5' r='1.5' fill='#9377FF' />
        </g>
        <g>
          <path
            d='M670.421 192.323L698 176.159L725.579 192.323V224.677L698 240.841L670.421 224.677V192.323Z'
            fill='white'
            stroke='#FFA077'
            strokeWidth='2'
          />
          <path d='M726 192L698 209L670 192' stroke='#FFA077' strokeWidth='2' />
          <path d='M726 204L698 221L670 204' stroke='#FFA077' strokeWidth='2' />
          <path d='M726 215L698 232L670 215' stroke='#FFA077' strokeWidth='2' />
          <path d='M698 209L698 241' stroke='#FFA077' />
          <path d='M698 209L726 192V224.5L698 241.5V209Z' fill='#FFA077' />
          <path d='M726 204L698 221' stroke='white' strokeWidth='2' strokeLinecap='round' />
          <path d='M726 215L698 232' stroke='white' strokeWidth='2' strokeLinecap='round' />
          <circle cx='722.5' cy='199.5' r='1.5' fill='white' />
          <circle cx='693.5' cy='212.5' r='1.5' fill='#FFA077' />
          <circle cx='722.5' cy='212.5' r='1.5' fill='white' />
          <circle cx='693.5' cy='223.5' r='1.5' fill='#FFA077' />
          <circle cx='722.5' cy='223.5' r='1.5' fill='white' />
          <circle cx='693.5' cy='233.5' r='1.5' fill='#FFA077' />
        </g>

        <mask id='mask0_6_1369' maskUnits='userSpaceOnUse' x='118' y='178' width='44' height='44'>
          <circle cx='140' cy='200' r='22' fill='white' />
        </mask>
        <g>
          <g mask='url(#mask0_6_1369)'>
            <circle cx='125.203' cy='196' r='4' fill='#9377FF' />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M114 210.622C115.309 205.659 119.829 202 125.203 202C130.577 202 135.096 205.659 136.405 210.622C133.57 213.549 129.599 215.368 125.203 215.368C120.806 215.368 116.835 213.549 114 210.622Z'
              fill='#9377FF'
            />
            <circle cx='155.203' cy='196' r='4' fill='#9377FF' />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M144 210.622C145.309 205.659 149.829 202 155.203 202C160.577 202 165.096 205.659 166.405 210.622C163.57 213.549 159.599 215.368 155.203 215.368C150.806 215.368 146.835 213.549 144 210.622Z'
              fill='#9377FF'
            />
            <circle cx='140.203' cy='192' r='5.5' fill='#9377FF' stroke='white' />
            <mask id='path-112-inside-1_6_1369' fill='white'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M123.459 215.041C124.356 206.587 131.51 200 140.203 200C148.895 200 156.049 206.587 156.946 215.041C152.801 219.581 146.835 222.429 140.203 222.429C133.571 222.429 127.604 219.581 123.459 215.041Z'
              />
            </mask>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M123.459 215.041C124.356 206.587 131.51 200 140.203 200C148.895 200 156.049 206.587 156.946 215.041C152.801 219.581 146.835 222.429 140.203 222.429C133.571 222.429 127.604 219.581 123.459 215.041Z'
              fill='#9377FF'
            />
            <path
              d='M123.459 215.041L122.465 214.936L122.418 215.383L122.721 215.715L123.459 215.041ZM156.946 215.041L157.685 215.716L157.988 215.383L157.941 214.936L156.946 215.041ZM124.454 215.147C125.297 207.195 132.027 201 140.203 201V199C130.994 199 123.415 205.978 122.465 214.936L124.454 215.147ZM140.203 201C148.378 201 155.108 207.195 155.952 215.147L157.941 214.936C156.99 205.978 149.412 199 140.203 199V201ZM156.208 214.367C152.244 218.708 146.542 221.429 140.203 221.429V223.429C147.127 223.429 153.358 220.454 157.685 215.716L156.208 214.367ZM140.203 221.429C133.864 221.429 128.161 218.708 124.198 214.367L122.721 215.715C127.047 220.454 133.279 223.429 140.203 223.429V221.429Z'
              fill='white'
              mask='url(#path-112-inside-1_6_1369)'
            />
          </g>
          <circle cx='140' cy='199' r='22.25' stroke='#9377FF' strokeWidth='1.5' />
        </g>

        {handleReversed(currentLog) ? (
          <circle r='5' fill={(currentLog.data === 'tx' && '#ff7070') || (currentLog.data === 'oc' && '#1BC199')}>
            <animateMotion dur={`${duration / 1000}s`} repeatCount='indefinite' keyPoints='1;0' keyTimes='0;1'>
              <mpath href={`#${motionPath}`} />
            </animateMotion>
          </circle>
        ) : (
          <circle r='5' fill={(currentLog.data === 'tx' && '#ff7070') || (currentLog.data === 'oc' && '#1BC199')}>
            <animateMotion dur={`${duration / 1000}s`} repeatCount='indefinite'>
              <mpath href={`#${motionPath}`} />
            </animateMotion>
          </circle>
        )}
      </g>
      <defs>
        <clipPath id='clip0_6_1369'>
          <rect width='1119' height='494' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Liveness;
