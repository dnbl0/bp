
/**
 * Returns the first item in the array if `value` is
 * an array, otherwise it returns `value`.
 */
export const firstValue = <T>(value: T | T[]): T => {
  return Array.isArray(value) ? value[0] : value
};
