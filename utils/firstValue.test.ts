import { describe, it, expect } from 'vitest';
import { firstValue } from './firstValue';

describe('firstValue', () => {
  it(`should return the value when it's not an array`, () => {
    expect(firstValue('foo')).toBe('foo');
    expect(firstValue(1)).toBe(1);
  });

  it('should return the first item in an array', () => {
    expect(firstValue(['foo'])).toBe('foo');
    expect(firstValue(['bar', 'baz'])).toBe('bar');
    expect(firstValue([1])).toBe(1);
    expect(firstValue([1, 2])).toBe(1);
  });
});
