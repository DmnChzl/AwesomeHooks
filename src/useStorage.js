import { useState, useEffect } from 'react';

/**
 * Hook: useStorage
 *
 * @param {String} key Key
 * @param {Boolean} local Local (default: false)
 */
export default function useStorage(key, local = false) {
  const [obj, setObj] = useState(null);

  useEffect(() => {
    let item = null;

    if (local) {
      item = localStorage.getItem(key);
    } else {
      item = sessionStorage.getItem(key);
    }

    if (item) {
      setObj(JSON.parse(item));
    }
  }, [key, local]);

  const setVal = (newVal) => {
    const item = JSON.stringify(newVal);

    if (local) {
      localStorage.setItem(key, item);
    } else {
      sessionStorage.setItem(key, item);
    }

    setObj(newVal);
  };

  return [obj, setVal];
}
