import { describe, it, expect } from 'vitest'
import { isDefined } from './typeguards'

describe('isDefined', () => {
    it('should return true for defined values', () => {
        expect(isDefined('foo')).toBe(true)
        expect(isDefined('')).toBe(true)
        expect(isDefined(1)).toBe(true)
        expect(isDefined(0)).toBe(true)
        expect(isDefined({ foo: 'bar' })).toBe(true)
        expect(isDefined({})).toBe(true)
        expect(isDefined([1, 2, 3, 4])).toBe(true)
        expect(isDefined([])).toBe(true)
    })

    it('should return false for undefined values', () => {
        expect(isDefined(undefined)).toBe(false)
        expect(isDefined(null)).toBe(false)
    })
})
