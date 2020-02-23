import { useReducer, useEffect, useRef } from 'react';
import now, {
  getYear,
  getMonth,
  getDays,
  getHours,
  getMinutes,
  getSeconds
} from './utils/dateUtils';

const INIT_TIME = 'USE_TIMER/INIT_TIME';
const SET_TIME = 'USE_TIMER/SET_TIME';

export function useInterval(callback, delay) {
  const refCallback = useRef(callback);

  useEffect(() => {
    const tick = () => refCallback.current();

    if (delay !== null) {
      let interval = setInterval(tick, delay);

      return () => clearInterval(interval);
    }
  }, [delay]);
}

/**
 * Hook: useTimer
 *
 * @param {Number} year Year (default: new Date().getFullYear())
 * @param {Number} month Month (default: new Date().getMonth())
 * @param {Number} days Days (default: new Date().getDate())
 * @param {Number} hours Hours (default: new Date().getHours())
 * @param {Number} minutes Minutes (default: new Date().getMinutes())
 * @param {Number} seconds Seconds (default: new Date().getSeconds())
 */
export default function useTimer(
  year = getYear(),
  month = getMonth(),
  days = getDays(),
  hours = getHours(),
  minutes = getMinutes(),
  seconds = getSeconds()
) {
  const setTime = ({ days, hours, minutes, seconds }) => {
    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      seconds = 59;
      minutes--;
    } else if (hours > 0) {
      seconds = 59;
      minutes = 59;
      hours--;
    } else {
      seconds = 59;
      minutes = 59;
      hours = 23;
      days--;
    }

    return {
      days,
      hours,
      minutes,
      seconds
    };
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case INIT_TIME:
        return payload;
      case SET_TIME:
        return setTime(state);
    }
  };

  const [timer, dispatch] = useReducer(reducer, {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const diff = new Date(year, month, days, hours, minutes, seconds) - now();

    const time = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };

    dispatch({ type: INIT_TIME, payload: time });
  }, [year, month, days, hours, minutes, seconds]);

  useInterval(() => {
    dispatch({ type: SET_TIME });
  }, 1000);

  return timer;
}
