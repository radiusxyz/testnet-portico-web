import React from 'react';

const F2 = ({ filterColor, highlightColor, id }) => {
  return (
    <g filter={filterColor}>
      <rect x='366' y='234' width='94.4344' height='73' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
      <rect
        x='365.5'
        y='233.5'
        width='95.4344'
        height='74'
        rx='12.5'
        stroke={highlightColor}
        strokeWidth='1'
        shapeRendering='crispEdges'
      />
      <rect x='370.5' y='238.5' width='85.4344' height='64' rx='7.5' stroke='white' strokeOpacity='0.4' />
      <path
        d='M434.803 275.566H391.631C388.521 275.566 386 277.639 386 280.196V286.37C386 288.927 388.521 291 391.631 291H434.803C437.913 291 440.434 288.927 440.434 286.37V280.196C440.434 277.639 437.913 275.566 434.803 275.566Z'
        stroke='#77FFFF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M386.208 279L394.519 254.966C395.545 252 398.426 250 401.677 250H424.74C427.987 250 430.871 252 431.897 254.966L440.208 279'
        stroke='#77FFFF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M395.385 283.282H405.709'
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
        <tspan x='400.217' y='267.548'>
          {id}
        </tspan>
      </text>
    </g>
  );
};

export default F2;
