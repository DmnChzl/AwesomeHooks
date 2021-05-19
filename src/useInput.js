import { useState } from 'react';

/**
 * Hook: useInput
 *
 * @param {String} initialState Initial State (default: '')
 */
export default function useInput(initialState = '') {
  const [value, setValue] = useState(initialState);

  return [value, (e) => setValue(e.target.value)];
}
