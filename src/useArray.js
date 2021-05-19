import { useState } from 'react';

/**
 * Hook: useArray
 *
 * @param {Array} initialState Initial State (default: [])
 */
export default function useArray(initialState = []) {
  const [values, setValues] = useState(initialState);

  /**
   * Add Value
   *
   * @param {Any} newValue New Value
   */
  const addValue = (newValue) => {
    setValues([...values, newValue]);
  };

  /**
   * Set Value
   *
   * @param {Any} value Value
   * @param {String} key Key
   */
  const setValue = (value, key) => {
    setValues(values.map((val) => (val[key] === value[key] ? value : val)));
  };

  /**
   * Del Value
   *
   * @param {Any} value Value
   * @param {String} key Key
   */
  const delValue = (value, key) => {
    if (key) {
      return setValues(values.filter((val) => val[key] !== value));
    }

    return setValues(values.filter((val) => val !== value));
  };

  return {
    values,
    setValues,
    addValue,
    setValue,
    delValue
  };
}
