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
   */
  const getValues = () => {
    let outerVal = [];

    // Rows
    for (let i = 0; i < values.length; i += breakpoint) {
      let innerVal = [];

      // Cols
      for (let j = i; j < i + breakpoint; j++) {
        innerVal = [...innerVal, values[j]];
      }

      outerVal = [...outerVal, innerVal];
    }

    return outerVal;
  };

  return [getValues(), setValues];
}
