import { useEffect, useState } from "react";

/**
 * Persists a small JSON-serializable state value into localStorage so
 * prototype state (e.g. redemption counters) survives a refresh.
 */
export function usePersistedState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota / privacy mode failures */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
