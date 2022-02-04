import { useState } from 'react';

/**
 * Hook: useToggle
 *
 * @param {Boolean} initialState Initial State (default: false)
 */
export default function useToggle(initialState = false) {
  const [value, setValue] = useState(initialState);

  return [value, () => setValue(true), () => setValue(false)];
}
