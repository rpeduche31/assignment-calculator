import { useRef, useMemo, useEffect, useState } from 'react';
import './AutoScale.css';

const ScaleWithMemo = ({ children, scaleProp, scaleRef }) => {
  const ScaleMemo = useMemo(() => {
    return (
      <div
        className='autoscale-component'
        ref={scaleRef}
        style={{
          transform: `scale(${scaleProp},${scaleProp})`,
        }}>
        {children}
      </div>
    );
  }, [children, scaleProp]);

  return ScaleMemo;
};

const AutoScale = ({ children, parentRef }) => {
  const scaleRef = useRef(null);

  const [scaleMemoValue, setScaleMemoValue] = useState(1);
  useEffect(() => {
    if (scaleRef?.current?.offsetWidth + 50 > parentRef?.current?.clientWidth) {
      setScaleMemoValue(
        parentRef?.current?.clientWidth / (scaleRef?.current.clientWidth + 100),
      );
    } else {
      setScaleMemoValue(1);
    }
  }, [children, scaleRef?.current?.offsetWidth, parentRef?.current?.offsetWidth]);

  return (
    <ScaleWithMemo scaleProp={scaleMemoValue} scaleRef={scaleRef}>
      {children}
    </ScaleWithMemo>
  );
};

export default AutoScale;
