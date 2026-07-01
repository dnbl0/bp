import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
    it('renders trigger children', () => {
        render(<Tooltip content="More info">Hover me</Tooltip>)
        expect(screen.getByText('Hover me')).toBeInTheDocument()
    })

    it('hides tooltip content initially', () => {
        render(<Tooltip content="More info">Hover me</Tooltip>)
        const tooltip = screen.getByRole('tooltip', { hidden: true })
        expect(tooltip).toHaveAttribute('hidden')
    })

    it('shows tooltip on mouse enter', async () => {
        render(<Tooltip content="More info">Hover me</Tooltip>)
        const trigger = screen.getByRole('button')
        await userEvent.hover(trigger)
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).not.toHaveAttribute('hidden')
    })

    it('hides tooltip on mouse leave', async () => {
        render(<Tooltip content="More info">Hover me</Tooltip>)
        const trigger = screen.getByRole('button')
        await userEvent.hover(trigger)
        await userEvent.unhover(trigger)
        const tooltip = screen.getByRole('tooltip', { hidden: true })
        expect(tooltip).toHaveAttribute('hidden')
    })

    it('shows tooltip on keyboard focus', async () => {
        render(<Tooltip content="More info">Hover me</Tooltip>)
        const trigger = screen.getByRole('button')
        await userEvent.tab()
        expect(trigger).toHaveFocus()
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).not.toHaveAttribute('hidden')
    })

    it('uses aria-label when provided', () => {
        render(<Tooltip content="More info" label="Information">ℹ</Tooltip>)
        const trigger = screen.getByRole('button', { name: 'Information' })
        expect(trigger).toBeInTheDocument()
    })

    it('wires trigger to tooltip via aria-describedby when open', async () => {
        render(<Tooltip content="More info">Hover me</Tooltip>)
        const trigger = screen.getByRole('button')
        await userEvent.hover(trigger)
        const tooltip = screen.getByRole('tooltip')
        expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
    })

    it('has no accessibility violations when closed', async () => {
        const { container } = render(<Tooltip content="More info">Hover me</Tooltip>)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
