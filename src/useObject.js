import { useState } from 'react';

/**
 * Hook: useObject
 *
 * @param {Object} initialState Initial State (default: {})
 */
export default function useObject(initialState = {}) {
  const [value, setValue] = useState(initialState);

  return [value, newValue => setValue({ ...value, ...newValue })];
}
