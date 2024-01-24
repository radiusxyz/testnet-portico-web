import React, { useEffect, useState, useRef } from 'react';
import cuid from 'cuid';

const Circle = ({ color, motionPath, duration, isReversed, handleIsFinished }) => {
  const animateMotionRef = useRef(null);

  useEffect(() => {
    const animateMotionElement = animateMotionRef.current;

    // Function to restart the animation
    const restartAnimation = () => {
      if (animateMotionElement) {
        animateMotionElement.beginElement();
      }
    };

    // Add event listener
    if (animateMotionElement) {
      animateMotionElement.addEventListener('endEvent', handleIsFinished);
      restartAnimation();
    }

    // Cleanup
    return () => {
      if (animateMotionElement) {
        animateMotionElement.removeEventListener('endEvent', handleIsFinished);
      }
    };
  }, [motionPath, isReversed, handleIsFinished]);

  return (
    <circle r='5' fill={color}>
      <animateMotion ref={animateMotionRef} dur={`${duration}ms`} keyPoints={isReversed ? '1;0' : '0;1'} keyTimes='0;1'>
        <mpath key={cuid()} href={`#${motionPath}`} />
      </animateMotion>
    </circle>
  );
};

export default Circle;
