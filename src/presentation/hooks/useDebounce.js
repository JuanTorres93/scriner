import { useEffect, useRef } from 'react';

//It returns a debounced version of the given function.
export function useDebounce(fn, delay = 500) {
  // Ref to store the current timeout ID.
  // We use a ref because its value persists across re-renders without triggering new renders.
  const timeoutRef = useRef();

  // Cleanup: when the component using this hook unmounts,
  // cancel any pending timeout so fn won’t run later unexpectedly.
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // The debounced function:
  // - Cancels the previous timeout
  // - Starts a new one that will run fn after "delay" ms
  return (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fn(...args), delay);
  };
}
