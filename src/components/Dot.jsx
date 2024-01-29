import React from 'react';
import styled, { keyframes } from 'styled-components';

const ncLoopRippleAnim = keyframes`
  0% { opacity: 1; transform: scale(.2); }
  100% { opacity: 0; transform: scale(1); }
`;

const StyledDot = styled.div`
  svg {
    height: ${(props) => (props.$active ? '24px' : '6px')};
    width: ${(props) => (props.$active ? '24px' : '6px')};
  }
`;

const RippleCircle = styled.circle`
  transform-origin: 50% 50%;
  animation: ${ncLoopRippleAnim} var(--animation-duration) infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  &:nth-child(2) {
    animation-delay: calc(var(--animation-duration) / -2);
  }
`;

function Dot({ active }) {
  return (
    <StyledDot $active={active}>
      {active ? (
        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <g fill='#FFB800'>
            <g className='nc-loop-ripple-16-icon-f' style={{ '--animation-duration': '1.8s' }}>
              <RippleCircle cx='12' cy='12' r='12' />
              <RippleCircle cx='12' cy='12' r='12' />
            </g>
          </g>
        </svg>
      ) : (
        <svg viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='3' cy='3' r='3' fill='white' fillOpacity='0.2' />
        </svg>
      )}
    </StyledDot>
  );
}

export default Dot;
