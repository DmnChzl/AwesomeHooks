import { useReducer } from 'react';

const SET_VAL = 'USE_FIELD/SET_VAL';
const SET_ERR = 'USE_FIELD/SET_ERR';
const RESET = 'USE_FIELD/RESET';

/**
 * Hook: useField
 *
 * @param {String} initialState Initial State (default: '')
 */
export default function useField(initialState = '') {
  /**
   * Reducer
   *
   * @param {Object} state State ({ val, err })
   * @param {Object} action ({ type, payload })
   */
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case SET_VAL:
        return {
          ...state,
          val: payload
        };

      case SET_ERR:
        return {
          ...state,
          err: payload
        };

      case RESET:
        return {
          val: initialState,
          err: ''
        };
    }
  };

  const [{ val, err }, dispatch] = useReducer(reducer, {
    val: initialState,
    err: ''
  });

  return {
    value: val,
    error: err,
    setValue: val => dispatch({ type: SET_VAL, payload: val }),
    setError: err => dispatch({ type: SET_ERR, payload: err }),
    reset: () => dispatch({ type: RESET })
  };
}
