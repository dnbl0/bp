import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Tabs } from './Tabs'

const items = [
    { id: 'tab-a', label: 'Tab A', content: <p>Content A</p> },
    { id: 'tab-b', label: 'Tab B', content: <p>Content B</p> },
    { id: 'tab-c', label: 'Tab C', content: <p>Content C</p> },
]

describe('Tabs', () => {
    it('renders nothing for an empty items array', () => {
        const { container } = render(<Tabs items={[]} />)
        expect(container.firstChild).toBeNull()
    })

    it('renders all tab buttons', () => {
        render(<Tabs items={items} />)
        expect(screen.getByRole('tab', { name: 'Tab A' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Tab B' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Tab C' })).toBeInTheDocument()
    })

    it('shows the first tab panel by default', () => {
        render(<Tabs items={items} />)
        expect(screen.getByText('Content A')).toBeVisible()
        expect(screen.getByText('Content B')).not.toBeVisible()
    })

    it('respects defaultTabId', () => {
        render(<Tabs items={items} defaultTabId="tab-b" />)
        expect(screen.getByText('Content B')).toBeVisible()
        expect(screen.getByText('Content A')).not.toBeVisible()
    })

    it('switches panel on tab click', async () => {
        render(<Tabs items={items} />)
        await userEvent.click(screen.getByRole('tab', { name: 'Tab B' }))
        expect(screen.getByText('Content B')).toBeVisible()
        expect(screen.getByText('Content A')).not.toBeVisible()
    })

    it('marks the active tab with aria-selected', () => {
        render(<Tabs items={items} />)
        expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'false')
    })

    it('navigates with ArrowRight key', async () => {
        render(<Tabs items={items} />)
        await userEvent.click(screen.getByRole('tab', { name: 'Tab A' }))
        await userEvent.keyboard('{ArrowRight}')
        expect(screen.getByText('Content B')).toBeVisible()
    })

    it('navigates with ArrowLeft key', async () => {
        render(<Tabs items={items} />)
        await userEvent.click(screen.getByRole('tab', { name: 'Tab B' }))
        await userEvent.keyboard('{ArrowLeft}')
        expect(screen.getByText('Content A')).toBeVisible()
    })

    it('wraps to last tab when pressing ArrowLeft on first', async () => {
        render(<Tabs items={items} />)
        await userEvent.click(screen.getByRole('tab', { name: 'Tab A' }))
        await userEvent.keyboard('{ArrowLeft}')
        expect(screen.getByText('Content C')).toBeVisible()
    })

    it('navigates to first tab with Home key', async () => {
        render(<Tabs items={items} defaultTabId="tab-c" />)
        await userEvent.click(screen.getByRole('tab', { name: 'Tab C' }))
        await userEvent.keyboard('{Home}')
        expect(screen.getByText('Content A')).toBeVisible()
    })

    it('navigates to last tab with End key', async () => {
        render(<Tabs items={items} />)
        await userEvent.click(screen.getByRole('tab', { name: 'Tab A' }))
        await userEvent.keyboard('{End}')
        expect(screen.getByText('Content C')).toBeVisible()
    })

    it('has no accessibility violations', async () => {
        const { container } = render(<Tabs items={items} label="Product details" />)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
