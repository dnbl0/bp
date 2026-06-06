import { describe, it, expect } from 'vitest'
import { stripUndefined } from './stripUndefined'

describe('stripUndefined.spec.ts', () => {
    it('stripUndefined should copy an object minus the undefined key values', () => {
        const x = {
            a: undefined,
            b: null,
            c: 'rad',
        }
        const y = stripUndefined(x)
        expect('a' in y).toBe(false)
        expect('b' in y).toBe(true)
        expect('c' in y).toBe(true)
    })
})
