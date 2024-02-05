import React from 'react';
import styled, { keyframes } from 'styled-components';

const ncLoopRippleAnim = keyframes`
  0% { opacity: 1; transform: scale(.2); }
  100% { opacity: 0; transform: scale(1); }
`;

const StyledDot = styled.div`
  display: inline;
  transform: translateX(-50%);
  position: absolute;

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
              <circle cx='12' cy='12' r='3' fill='#FFB800' />
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

// import { addPropertyControls, ControlType } from "framer"
// import { motion } from "framer-motion"

// function RippleAnim(props) {
//     const css = ` .center {
//         transform: translate(9px, 9px); /* Adjust these values to position your center element */
//     }.nc-loop-ripple-16-icon-f{--animation-duration:1.8s;}.nc-loop-ripple-16-icon-f *{transform-origin:50% 50%;animation:nc-loop-ripple-anim var(--animation-duration) infinite cubic-bezier(.215,.61,.355,1)}.nc-loop-ripple-16-icon-f :nth-child(2){animation-delay:calc(var(--animation-duration)/-2)}@keyframes nc-loop-ripple-anim{0%{opacity:1;transform:scale(.2)}100%{opacity:0;transform:scale(1)}}`

//     return (
//         <svg
//             height="24"
//             width="24"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <g fill="#090a0f">
//                 <g className="nc-loop-ripple-16-icon-f">
//                     <circle cx="12" cy="12" fill="#FFB800" r="12" />
//                     <circle cx="12" cy="12" fill="#FFB800" r="12" />
//                 </g>
//                 <g className="center">
//                     <circle cx="3" cy="3" fill="#FFA800" r="3" />
//                 </g>
//                 <style>{css}</style>
//             </g>
//         </svg>
//     )
// }

// export default RippleAnim
