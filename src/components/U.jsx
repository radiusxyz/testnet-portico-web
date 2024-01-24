import React from 'react';

const U = ({ filterColor, highlightColor, id }) => {
  return (
    <g filter={filterColor}>
      <rect x='99' y='158' width='76' height='91' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
      <rect
        x='98.5'
        y='157.5'
        width='77'
        height='92'
        rx='12.5'
        stroke={highlightColor}
        strokeWidth='1'
        shapeRendering='crispEdges'
      />
      <rect x='103' y='162' width='68' height='83' rx='8' fill='#090A0F' />
      <rect x='103.5' y='162.5' width='67' height='82' rx='7.5' stroke='white' strokeOpacity='0.4' />
      <rect x='119.5' y='174.5' width='35' height='35' rx='17.5' stroke='white' strokeOpacity='0.4' />
      <path
        d='M133.863 189.647C135.422 189.647 136.686 188.382 136.686 186.823C136.686 185.264 135.422 183.999 133.863 183.999C132.303 183.999 131.039 185.264 131.039 186.823C131.039 188.382 132.303 189.647 133.863 189.647Z'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M138.933 199.143C139.983 198.778 140.521 197.566 140.02 196.573C138.883 194.325 136.555 192.783 133.863 192.783C131.171 192.783 128.843 194.324 127.706 196.573C127.204 197.566 127.741 198.778 128.793 199.143C130.087 199.592 131.815 200 133.863 200C135.911 200 137.639 199.592 138.933 199.143Z'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M142.706 199.784C143.658 199.624 144.498 199.389 145.207 199.143C146.258 198.778 146.796 197.565 146.294 196.573C145.315 194.638 143.454 193.226 141.237 192.871'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M139.175 189.471C139.476 189.58 139.799 189.647 140.137 189.647C141.697 189.647 142.961 188.383 142.961 186.823C142.961 185.263 141.697 183.999 140.137 183.999C139.799 183.999 139.476 184.065 139.175 184.175'
        stroke='white'
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
        <tspan x='124' y='229.548'>
          {id}
        </tspan>
      </text>
    </g>
  );
};

export default U;
