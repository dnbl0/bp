import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { AccordionPanel } from './AccordionPanel'

vi.mock('react-cool-dimensions', () => ({
    default: () => ({ observe: vi.fn(), height: 200 }),
}))

describe('AccordionPanel', () => {
    it('renders nothing when children are absent', () => {
        const { container } = render(
            <AccordionPanel itemIndex={0} header="Question" />
        )
        expect(container.firstChild).toBeNull()
    })

    it('renders the header text', () => {
        render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        expect(screen.getByText('Question')).toBeInTheDocument()
    })

    it('uses a button element for the header trigger', () => {
        render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        expect(screen.getByRole('button', { name: /question/i })).toBeInTheDocument()
    })

    it('starts collapsed with aria-expanded false', () => {
        render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    })

    it('expands on click and sets aria-expanded true', async () => {
        render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        await userEvent.click(screen.getByRole('button'))
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    })

    it('collapses again on second click', async () => {
        render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        await userEvent.click(screen.getByRole('button'))
        await userEvent.click(screen.getByRole('button'))
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    })

    it('button aria-controls points to the panel region', () => {
        render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        const button = screen.getByRole('button')
        const panelId = button.getAttribute('aria-controls')
        expect(panelId).toBeTruthy()
        const panel = document.getElementById(panelId!)
        expect(panel).toBeInTheDocument()
        expect(panel).toHaveAttribute('role', 'region')
    })

    it('panel is aria-hidden when collapsed', () => {
        render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        const button = screen.getByRole('button')
        const panelId = button.getAttribute('aria-controls')!
        expect(document.getElementById(panelId)).toHaveAttribute('aria-hidden', 'true')
    })

    it('panel aria-hidden is false when expanded', async () => {
        render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        await userEvent.click(screen.getByRole('button'))
        const button = screen.getByRole('button')
        const panelId = button.getAttribute('aria-controls')!
        expect(document.getElementById(panelId)).toHaveAttribute('aria-hidden', 'false')
    })

    it('can be toggled with Enter key', async () => {
        render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        const button = screen.getByRole('button')
        button.focus()
        await userEvent.keyboard('{Enter}')
        expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('can be toggled with Space key', async () => {
        render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        const button = screen.getByRole('button')
        button.focus()
        await userEvent.keyboard(' ')
        expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('has no accessibility violations when collapsed', async () => {
        const { container } = render(
            <AccordionPanel itemIndex={0} header="Question">
                <p>Answer</p>
            </AccordionPanel>
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
