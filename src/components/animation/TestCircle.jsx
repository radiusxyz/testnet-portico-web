import React, { useEffect, useRef } from 'react';
import cuid from 'cuid';

const TestCircle = ({ color, motionPath, duration, isFinished, isReversed, data, setIsFinished }) => {
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
      animateMotionElement.addEventListener('endEvent', () => setIsFinished(true));
      restartAnimation();
    }

    // Cleanup
    return () => {
      if (animateMotionElement) {
        animateMotionElement.removeEventListener('endEvent', () => setIsFinished(true));
      }
    };
  }, [motionPath, isFinished]);

  return (
    <circle r={data === 'lc' || data === 'ld' ? 0 : 5} fill={color}>
      {!isFinished && (
        <animateMotion
          ref={animateMotionRef}
          dur={`${duration}ms`}
          calcMode='linear'
          keyPoints={isReversed ? '1;0' : '0;1'}
          keyTimes='0;1'
        >
          <mpath key={cuid()} href={`#${motionPath}`} />
        </animateMotion>
      )}
    </circle>
  );
};

export default TestCircle;
