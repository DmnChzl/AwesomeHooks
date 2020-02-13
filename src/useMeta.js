import { useEffect } from 'react';

/**
 * Hook: useMeta
 *
 * @param {String} name Name
 * @param {String} content Content
 */
export default function useMeta(name, content) {
  useEffect(() => {
    const metas = document.getElementsByTagName('meta');

    if (metas.length > 0 && metas[name]) {
      metas[name].content = content;
    } else {
      const meta = document.createElement('meta');

      meta.setAttribute('name', name);
      meta.content = content;

      // NOTE: Add Meta To Head
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, [name, content]);
}
