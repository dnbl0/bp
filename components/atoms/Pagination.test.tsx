import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination', () => {
    it('renders nothing when there is only one page', () => {
        const { container } = render(
            <Pagination page={1} totalPages={1} onPageChange={vi.fn()} />
        )
        expect(container.firstChild).toBeNull()
    })

    it('renders previous and next buttons', () => {
        render(<Pagination page={2} totalPages={5} onPageChange={vi.fn()} />)
        expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument()
    })

    it('disables previous button on first page', () => {
        render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />)
        expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    })

    it('disables next button on last page', () => {
        render(<Pagination page={5} totalPages={5} onPageChange={vi.fn()} />)
        expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
    })

    it('marks the current page with aria-current', () => {
        render(<Pagination page={3} totalPages={5} onPageChange={vi.fn()} />)
        const currentPage = screen.getByRole('button', { name: 'Page 3' })
        expect(currentPage).toHaveAttribute('aria-current', 'page')
    })

    it('calls onPageChange with next page when next is clicked', async () => {
        const onPageChange = vi.fn()
        render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />)
        await userEvent.click(screen.getByRole('button', { name: 'Next page' }))
        expect(onPageChange).toHaveBeenCalledWith(3)
    })

    it('calls onPageChange with previous page when previous is clicked', async () => {
        const onPageChange = vi.fn()
        render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />)
        await userEvent.click(screen.getByRole('button', { name: 'Previous page' }))
        expect(onPageChange).toHaveBeenCalledWith(2)
    })

    it('calls onPageChange with the correct page when a numbered button is clicked', async () => {
        const onPageChange = vi.fn()
        render(<Pagination page={1} totalPages={3} onPageChange={onPageChange} />)
        await userEvent.click(screen.getByRole('button', { name: 'Page 2' }))
        expect(onPageChange).toHaveBeenCalledWith(2)
    })

    it('has no accessibility violations', async () => {
        const { container } = render(
            <Pagination page={2} totalPages={5} onPageChange={vi.fn()} />
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
