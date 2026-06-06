import { describe, it, expect, vi } from 'vitest'

import { cx } from './cx'

describe('cx', () => {
    it('should return a string', () => {
        expect(cx('foo')).toEqual('foo')
    })

    it('should return an empty string for falsy values', () => {
        expect(cx('')).toEqual('')
        expect(cx(false)).toEqual('')
        expect(cx(null)).toEqual('')
        expect(cx(undefined)).toEqual('')
    })

    it('should combine strings', () => {
        expect(cx('foo', 'bar')).toEqual('foo bar')
        expect(cx('foo', 'bar', 'baz')).toEqual('foo bar baz')
    })

    it('should ignore falsy values when combining strings', () => {
        expect(
            cx(
                'foo',
                null && 'bar',
                false && 'bar',
                undefined && 'bar',
                '',
                'baz'
            )
        ).toEqual('foo baz')

        expect(cx(null && 'bar', 'foo', false && 'bar')).toEqual('foo')
    })
})
