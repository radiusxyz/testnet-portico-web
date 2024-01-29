import React from 'react';

function Dot(props) {
  const title = props.title || 'ripple anim';
  const css = `
    .nc-loop-ripple-16-icon-f { --animation-duration: 1.8s; }
    .nc-loop-ripple-16-icon-f * {
      transform-origin: 50% 50%;
      animation: nc-loop-ripple-anim var(--animation-duration) infinite cubic-bezier(.215, .61, .355, 1);
    }
    .nc-loop-ripple-16-icon-f :nth-child(2) {
      animation-delay: calc(var(--animation-duration) / -2);
    }
    @keyframes nc-loop-ripple-anim {
      0% { opacity: 1; transform: scale(.2); }
      100% { opacity: 0; transform: scale(1); }
    }
  `;

  return props.active ? (
    <svg height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <title>{title}</title>
      <g fill='#FFB800'>
        <g className='nc-loop-ripple-16-icon-f'>
          <circle cx='12' cy='12' fill='#FFB800' r='12' />
          <circle cx='12' cy='12' fill='#FFB800' r='12' />
        </g>
        <style>{css}</style>
      </g>
    </svg>
  ) : (
    <svg width='6' height='6' viewBox='0 0 6 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='3' cy='3' r='3' fill='white' fillOpacity='0.2' />
    </svg>
  );
}

export default Dot;
