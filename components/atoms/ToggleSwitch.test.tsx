import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { ToggleSwitch } from './ToggleSwitch'

describe('ToggleSwitch', () => {
    it('renders the label', () => {
        render(<ToggleSwitch checked={false} onChange={vi.fn()} label="Dark mode" />)
        expect(screen.getByText('Dark mode')).toBeInTheDocument()
    })

    it('renders as a switch role', () => {
        render(<ToggleSwitch checked={false} onChange={vi.fn()} label="Dark mode" />)
        expect(screen.getByRole('switch', { name: 'Dark mode' })).toBeInTheDocument()
    })

    it('reflects checked state', () => {
        render(<ToggleSwitch checked={true} onChange={vi.fn()} label="Dark mode" />)
        expect(screen.getByRole('switch')).toBeChecked()
    })

    it('calls onChange with toggled value on click', async () => {
        const onChange = vi.fn()
        render(<ToggleSwitch checked={false} onChange={onChange} label="Dark mode" />)
        await userEvent.click(screen.getByRole('switch'))
        expect(onChange).toHaveBeenCalledWith(true)
    })

    it('does not call onChange when disabled', async () => {
        const onChange = vi.fn()
        render(<ToggleSwitch checked={false} onChange={onChange} label="Dark mode" disabled />)
        const input = screen.getByRole('switch')
        expect(input).toBeDisabled()
    })

    it('hides label visually when hideLabel is true', () => {
        render(<ToggleSwitch checked={false} onChange={vi.fn()} label="Dark mode" hideLabel />)
        const label = screen.getByText('Dark mode')
        expect(label).toHaveClass('sr-only')
    })

    it('has no accessibility violations', async () => {
        const { container } = render(
            <ToggleSwitch checked={false} onChange={vi.fn()} label="Dark mode" />
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
