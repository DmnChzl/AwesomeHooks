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
    (unit = 1) => setValue(value + unit),
    (unit = 1) => setValue(value - unit),
    () => setValue(0)
  ];
}
