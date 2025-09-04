import { useEffect, useMemo } from "react";
import _debounce from "lodash/debounce";

type ButtonProps = {
  title: String;
  onClick: () => void;
  delay?: number;
};

const DebouncedButton = (props: ButtonProps) => {
  const { title, onClick, delay = 1000 } = props;

  // update onClick
  const debounceFn = useMemo(() => {
    return _debounce(onClick, delay);
  }, [onClick, delay]);

  // Clean up the debounced function on unmount
  useEffect(() => {
    return () => {
      debounceFn.cancel();
    };
  }, [debounceFn]);

  return (
    <button type="button" className="block w-full h-auto bg-pink-500 hover:bg-pink-700 transition duration-300 ease-in-out text-center cursor-pointer px-3 py-2 rounded-md" onClick={debounceFn}>
      {title}
    </button>
  );
};

export default DebouncedButton;
