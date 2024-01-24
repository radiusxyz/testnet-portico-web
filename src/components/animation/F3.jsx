import React from 'react';

const F3 = ({ filterColor, highlightColor, id }) => {
  return (
    <g filter={filterColor}>
      <rect x='366' y='310' width='94.4344' height='73' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
      <rect
        x='365.5'
        y='309.5'
        width='95.4344'
        height='74'
        rx='12.5'
        stroke={highlightColor}
        strokeWidth='1'
        shapeRendering='crispEdges'
      />
      <rect x='370.5' y='314.5' width='85.4344' height='64' rx='7.5' stroke='white' strokeOpacity='0.4' />
      <path
        d='M434.803 351.566H391.631C388.521 351.566 386 353.639 386 356.196V362.37C386 364.927 388.521 367 391.631 367H434.803C437.913 367 440.434 364.927 440.434 362.37V356.196C440.434 353.639 437.913 351.566 434.803 351.566Z'
        stroke='#77FFFF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M386.208 355L394.519 330.966C395.545 328 398.426 326 401.677 326H424.74C427.987 326 430.871 328 431.897 330.966L440.208 355'
        stroke='#77FFFF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M395.385 359.282H405.709'
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
        <tspan x='400.217' y='343.548'>
          {id}
        </tspan>
      </text>
    </g>
  );
};

export default F3;
