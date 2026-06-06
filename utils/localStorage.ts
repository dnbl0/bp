/**
 * Write a value to localStorage
 * @param key - The key to store the value under
 * @param value - The value to store (will be JSON stringified)
 */
export const writeToLocalStorage = (key: string, value: unknown): void => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Failed to write to localStorage for key "${key}":`, error);
  }
};

/**
 * Read a value from localStorage
 * @param key - The key to read the value from
 * @returns The parsed value from localStorage, or null if not found
 */
export const readFromLocalStorage = (key: string): unknown | null => {
  try {
    if (typeof window === 'undefined') {
      return null;
    }
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Failed to read from localStorage for key "${key}":`, error);
    return null;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove from localStorage for key "${key}":`, error);
  }
};
