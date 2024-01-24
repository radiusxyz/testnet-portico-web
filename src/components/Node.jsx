import React from 'react';
import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const Node = React.memo(({ x, y, r, fill, id }) => {
  const width = 2 * r;
  const fontSize = 20; // Adjusted font size
  const textX = r; // Center horizontally
  const textY = r; // Starting y position (adjust if needed)

  return (
    <svg width={`${width}px`} height={`${width}px`} x={x} y={y}>
      <circle cx={r} cy={r} r={r} fill={fill} />
      <text
        x={textX}
        y={textY}
        fontFamily='Arial'
        fontSize={fontSize}
        fill='black'
        stroke='none' // Removed stroke for clarity
        textAnchor='middle'
        dominantBaseline='central' // Helps in vertical centering
      >
        {id}
      </text>
    </svg>
  );
});

export default Node;
