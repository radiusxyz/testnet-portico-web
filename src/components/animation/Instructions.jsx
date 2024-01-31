import React from 'react';

const Instructions = () => {
  return (
    <>
      <path d='m274 415.5v116h2v-116z' fill='#5c5b5e' fillOpacity='.6' mask='url(#e)' />
      <text fill='#fff' fontFamily='area-normal' fontSize='16' fontWeight='bold' letterSpacing='0em'>
        <tspan x='115' y='446.412'>
          USER
        </tspan>
      </text>
      <path d='m17.8334 471.833 2.5 2.5 5.8333-5.833' stroke='#fff' strokeLinecap='round' strokeLinejoin='round' />
      <text fill='#fff' fillOpacity='.4' fontFamily='area-normal' fontSize='12' letterSpacing='-.25'>
        <tspan x='34' y='476.86'>
          Submits encrypted TX to sequencer
        </tspan>
      </text>
      <path d='m549 415.5v116h2v-116z' fill='#5c5b5e' fillOpacity='.6' mask='url(#f)' />
      <text fill='#fff' fontFamily='area-normal' fontSize='16' fontWeight='bold' letterSpacing='0em'>
        <tspan x='364.5' y='446.412'>
          FOLLOWER
        </tspan>
      </text>
      <path d='m292.833 471.833 2.5 2.5 5.834-5.833' stroke='#fff' strokeLinecap='round' strokeLinejoin='round' />
      <text fill='#fff' fillOpacity='.4' fontFamily='area-normal' fontSize='12' letterSpacing='-.25'>
        <tspan x='309' y='476.86'>
          Forwards encrypted TX to leader
        </tspan>
      </text>
      <path d='m292.833 493.833 2.5 2.5 5.834-5.833' stroke='#fff' strokeLinecap='round' strokeLinejoin='round' />
      <text fill='#fff' fillOpacity='.4' fontFamily='area-normal' fontSize='12' letterSpacing='0em'>
        <tspan x='309' y='498.86'>
          Forwards order commitment
        </tspan>
      </text>
      <path d='m824 415.5v116h2v-116z' fill='#5c5b5e' fillOpacity='.6' mask='url(#g)' />
      <text fill='#fff' fontFamily='area-normal' fontSize='16' fontWeight='bold' letterSpacing='0em'>
        <tspan x='654' y='446.412'>
          LEADER
        </tspan>
      </text>
      <path d='m567.833 471.833 2.5 2.5 5.834-5.833' stroke='#fff' strokeLinecap='round' strokeLinejoin='round' />
      <text fill='#fff' fillOpacity='.4' fontFamily='area-normal' fontSize='12' letterSpacing='-.25'>
        <tspan x='584' y='476.86'>
          Orders encrypted TX and builds block
        </tspan>
      </text>
      <path d='m567.833 493.833 2.5 2.5 5.834-5.833' stroke='#fff' strokeLinecap='round' strokeLinejoin='round' />
      <text fill='#fff' fillOpacity='.4' fontFamily='area-normal' fontSize='12' letterSpacing='0em'>
        <tspan x='584' y='498.86'>
          Provides order commitment
        </tspan>
      </text>
      <text fill='#fff' fontFamily='area-normal' fontSize='16' fontWeight='bold' letterSpacing='0em'>
        <tspan x='929' y='446.412'>
          ROLLUP
        </tspan>
      </text>
      <path d='m873.833 471.833 2.5 2.5 5.834-5.833' stroke='#fff' strokeLinecap='round' strokeLinejoin='round' />
      <text fill='#fff' fillOpacity='.4' fontFamily='area-normal' fontSize='12' letterSpacing='0em'>
        <tspan x='890.424' y='476.86'>
          Receives block from leader
        </tspan>
      </text>
    </>
  );
};

export default Instructions;
