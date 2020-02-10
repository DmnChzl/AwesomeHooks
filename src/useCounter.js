import { useState } from 'react';

/**
 * Hook: useCounter
 *
 * @param {Number} initialState Initial State (default: 0)
 */
export default function useCounter(initialState = 0) {
  const [value, setValue] = useState(initialState);

  return [
    value,
    () => setValue(value + 1),
    () => setValue(value - 1),
    () => setValue(0)
  ];
}
