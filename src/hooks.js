import { useState } from 'react';

/**
 * Hook: useCounter
 *
 * @param {number} initialState Initial State
 */
export function useCounter(initialState) {
  const [value, setValue] = useState(initialState);

  return [
    value,
    () => setValue(value + 1),
    () => setValue(value - 1),
    () => setValue(0)
  ];
}

/**
 * Hook: useInput
 *
 * @param {string} initialState Initial State
 */
export function useInput(initialState) {
  const [value, setValue] = useState(initialState);

  return [value, e => setValue(e.target.value)];
}

/**
 * Hook: useArray
 */
export function useArray() {
  const [values, setValues] = useState([]);

  const addValue = newValue => {
    setValues([...values, newValue]);
  };

  const delValue = value => {
    setValues(values.filter(val => val !== value));
  };

  return [values, setValues, addValue, delValue];
}

/**
 * Hook: useMatrix
 *
 * @param {number} breakpoint BreakPoint
 */
export function useMatrix(breakpoint) {
  const [values, setValues] = useState([]);

  const getValues = (filter = '') => {
    filter = filter.toLowerCase();

    const filteredValues = values.filter(val => {
      const lowerVal = val.toLowerCase();

      return lowerVal.includes(filter);
    });

    let outerVal = [];

    // Rows
    for (let i = 0; i < filteredValues.length; i += breakpoint) {
      let innerVal = [];

      // Cols
      for (let j = i; j < i + breakpoint; j++) {
        innerVal = [...innerVal, filteredValues[j]];
      }

      outerVal = [...outerVal, innerVal];
    }

    return outerVal;
  };

  return [getValues, setValues];
}
