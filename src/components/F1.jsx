import React from 'react';

const F1 = ({ filterColor, highlightColor, id }) => {
  return (
    <g filter={filterColor}>
      <rect x='366' y='99' width='94.4344' height='73' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
      <rect
        x='365.5'
        y='98.5'
        width='95.4344'
        height='74'
        rx='12.5'
        stroke={highlightColor}
        strokeWidth='1'
        shapeRendering='crispEdges'
      />
      <rect x='370.5' y='103.5' width='85.4344' height='64' rx='7.5' stroke='white' strokeOpacity='0.4' />
      <path
        d='M434.803 140.566H391.631C388.521 140.566 386 142.639 386 145.196V151.37C386 153.927 388.521 156 391.631 156H434.803C437.913 156 440.434 153.927 440.434 151.37V145.196C440.434 142.639 437.913 140.566 434.803 140.566Z'
        stroke='#77FFFF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M386.208 144L394.519 119.966C395.545 117 398.426 115 401.677 115H424.74C427.987 115 430.871 117 431.897 119.966L440.208 144'
        stroke='#77FFFF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M395.385 148.282H405.709'
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
        <tspan x='400.217' y='132.548'>
          {id}
        </tspan>
      </text>
    </g>
  );
};

export default F1;
