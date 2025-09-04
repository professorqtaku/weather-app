import { useEffect, useMemo } from 'react';
import _throttle from 'lodash/throttle';

type ButtonProps = {
  title: String;
  onClick: () => void;
  delay?: number;
}

const ThrottledButton = (props: ButtonProps) => {
  const { title, onClick, delay = 1000 } = props;

  // Create throttled function
  const throttledFn = useMemo(() => {
    return _throttle(onClick, delay);
  }, [onClick, delay]);

  // Cancel throttled function on unmount
  useEffect(() => {
    return () => {
      throttledFn.cancel();
    };
  }, [throttledFn]);


  return (
    <button onClick={throttledFn}>
      {title}
    </button>
  );
};

export default ThrottledButton;
