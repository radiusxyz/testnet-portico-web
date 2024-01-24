import React from 'react';

const R1 = ({ filterColor, highlightColor, id }) => {
  return (
    <g filter={filterColor}>
      <rect x='913' y='242' width='100' height='68' rx='12' fill='#090A0F' />
      <rect
        x='913.5'
        y='242.5'
        width='99'
        height='67'
        rx='11.5'
        stroke={highlightColor}
        shapeRendering='crispEdges'
        strokeWidth='1'
      />
      <rect x='917.5' y='246.5' width='91' height='59' rx='7.5' stroke='white' strokeOpacity='0.4' />
      <text
        fill='white'
        fillOpacity='0.6'
        xmlSpace='preserve'
        style={{ whiteSpace: 'pre' }}
        fontFamily='area-normal'
        fontSize='10'
        letterSpacing='0em'
      >
        <tspan x='947' y='268.82'>
          Rollup
        </tspan>
      </text>
      <text
        fill='white'
        xmlSpace='preserve'
        style={{ whiteSpace: 'pre' }}
        fontFamily='area-normal'
        fontSize='14'
        letterSpacing='0em'
      >
        <tspan x='958' y='290.548'>
          {id}
        </tspan>
      </text>
    </g>
  );
};

export default R1;
