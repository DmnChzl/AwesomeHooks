import { useEffect } from 'react';

/**
 * Hook: useDocumentTitle
 *
 * @param {String} title Title
 */
export default function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}
