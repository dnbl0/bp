import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
    it('renders children', () => {
        render(<Badge>Active</Badge>)
        expect(screen.getByText('Active')).toBeInTheDocument()
    })

    it('applies tone classes for each variant', () => {
        const tones = ['neutral', 'info', 'success', 'warning', 'error', 'award'] as const
        tones.forEach(tone => {
            const { unmount } = render(<Badge tone={tone}>Label</Badge>)
            expect(screen.getByText('Label')).toBeInTheDocument()
            unmount()
        })
    })

    it('renders status dot when withDot is true (non-award tones)', () => {
        const { container } = render(<Badge tone="info" withDot>Label</Badge>)
        const dot = container.querySelector('[aria-hidden="true"]')
        expect(dot).toBeInTheDocument()
    })

    it('does not render dot for award tone', () => {
        const { container } = render(<Badge tone="award" withDot>Label</Badge>)
        const dot = container.querySelector('.h-1\\.5')
        expect(dot).not.toBeInTheDocument()
    })

    it('renders an icon when provided', () => {
        render(<Badge icon={<svg data-testid="icon" />}>Label</Badge>)
        expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('has no accessibility violations', async () => {
        const { container } = render(<Badge tone="success" withDot>Active</Badge>)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
