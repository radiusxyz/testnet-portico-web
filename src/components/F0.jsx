import React from 'react';

const F0 = ({ filterColor, highlightColor, id }) => {
  return (
    <g filter={filterColor}>
      <rect x='366' y='23' width='94.4344' height='73' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
      <rect
        x='365.5'
        y='22.5'
        width='95.4344'
        height='74'
        rx='12.5'
        stroke={highlightColor}
        strokeWidth='1'
        shapeRendering='crispEdges'
      />
      <rect x='370.5' y='27.5' width='85.4344' height='64' rx='7.5' stroke='white' strokeOpacity='0.4' />
      <path
        d='M434.803 64.566H391.631C388.521 64.566 386 66.639 386 69.1962V75.3698C386 77.927 388.521 80 391.631 80H434.803C437.913 80 440.434 77.927 440.434 75.3698V69.1962C440.434 66.639 437.913 64.566 434.803 64.566Z'
        stroke='#77FFFF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M386.208 68L394.519 43.9658C395.545 41.0001 398.426 39 401.677 39H424.74C427.987 39 430.871 41.0001 431.897 43.9658L440.208 68'
        stroke='#77FFFF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M395.385 72.2821H405.709'
        stroke='#77FFFF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <text
        fill='white'
        xmlSpace='preserve'
        style={{ whiteSpace: 'pre' }}
        fontFamily='area-normal'
        fontSize='14'
        letterSpacing='0em'
      >
        <tspan x='400.217' y='56.548'>
          {id}
        </tspan>
      </text>
    </g>
  );
};

export default F0;
