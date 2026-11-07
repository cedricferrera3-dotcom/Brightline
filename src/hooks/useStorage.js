import { useEffect, useState } from 'react';

// useState that persists to localStorage (default) or sessionStorage.
export function useStorage(key, initial, type = 'local') {
  const area = type === 'session' ? window.sessionStorage : window.localStorage;
  const [value, setValue] = useState(() => {
    try {
      const raw = area.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { area.setItem(key, JSON.stringify(value)); } catch { /* storage full or blocked */ }
  }, [area, key, value]);
  return [value, setValue];
}
