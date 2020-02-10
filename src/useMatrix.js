import { useState } from 'react';

/**
 * Hook: useMatrix
 *
 * @param {Number} breakpoint BreakPoint (default: 1)
 */
export default function useMatrix(breakpoint = 1) {
  // CLEARFIX: Absolute & Truncate (+1)
  breakpoint = Math.abs(Math.trunc(breakpoint));

  if (breakpoint < 1) {
    breakpoint++;
  }

  const [values, setValues] = useState([]);

  /**
   * Get Values
   *
   * @param {String} filter Filter
   * @param {String} key Key
   */
  const getValues = (filter = '', key = '') => {
    filter = filter.toLowerCase();

    const filteredValues = values.filter(val => {
      let lowerVal;

      if (key) {
        lowerVal = val[key].toLowerCase();
      } else {
        lowerVal = val.toLowerCase();
      }

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
