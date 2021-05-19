import { useState } from 'react';

/**
 * Hook: useObject
 *
 * @param {Object} initialState Initial State (default: {})
 */
export default function useObject(initialState = {}) {
  const [value, setValue] = useState(initialState);

  const isEmpty = () => Object.entries(value).length === 0;

  return [value, (newValue) => setValue({ ...value, ...newValue }), isEmpty()];
}
