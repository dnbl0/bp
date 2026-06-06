import { KeyboardEvent, ReactNode, useId, useState } from 'react'
import { cx } from '../../utils/cx'

export interface TabItem {
    /** Stable identifier for the tab. */
    id: string
    /** The label shown on the tab control. */
    label: string
    /** The panel content revealed when the tab is active. */
    content: ReactNode
}

export interface TabsProps {
    /** The tabs to render, in display order. */
    items: TabItem[]
    /** The id of the tab selected on first render. Defaults to the first tab. */
    defaultTabId?: string
    /** Accessible label for the tab list. */
    label?: string
}

/**
 * An accessible tabbed panel following the WAI-ARIA tabs pattern: roving
 * tab order, arrow-key navigation between tabs, and `aria-controls`/
 * `aria-labelledby` wiring between each tab and its panel. Used to organise
 * dense product information (cover details, FAQs, eligibility) without
 * lengthening the page.
 */
export const Tabs = ({ items, defaultTabId, label }: TabsProps) => {
    const baseId = useId()
    const [activeId, setActiveId] = useState(defaultTabId ?? items[0]?.id)

    if (items.length === 0) return null

    const tabId = (id: string) => `${baseId}-tab-${id}`
    const panelId = (id: string) => `${baseId}-panel-${id}`

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const currentIndex = items.findIndex(item => item.id === activeId)
        let nextIndex: number | null = null

        if (event.key === 'ArrowRight')
            nextIndex = (currentIndex + 1) % items.length
        if (event.key === 'ArrowLeft')
            nextIndex = (currentIndex - 1 + items.length) % items.length
        if (event.key === 'Home') nextIndex = 0
        if (event.key === 'End') nextIndex = items.length - 1

        if (nextIndex !== null) {
            event.preventDefault()
            const next = items[nextIndex]
            setActiveId(next.id)
            document.getElementById(tabId(next.id))?.focus()
        }
    }

    return (
        <div>
            <div
                role="tablist"
                aria-label={label}
                className="flex flex-wrap gap-1 border-b border-light-grey"
            >
                {items.map(item => {
                    const active = item.id === activeId
                    return (
                        <button
                            key={item.id}
                            id={tabId(item.id)}
                            role="tab"
                            type="button"
                            aria-selected={active}
                            aria-controls={panelId(item.id)}
                            tabIndex={active ? 0 : -1}
                            onClick={() => setActiveId(item.id)}
                            onKeyDown={onKeyDown}
                            className={cx(
                                'px-4 py-2 -mb-px text-sm font-semibold',
                                'border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan',
                                active
                                    ? 'border-cyan text-cyan'
                                    : 'border-transparent text-grey dark:text-light-grey hover:text-navy dark:hover:text-white'
                            )}
                        >
                            {item.label}
                        </button>
                    )
                })}
            </div>
            {items.map(item => (
                <div
                    key={item.id}
                    id={panelId(item.id)}
                    role="tabpanel"
                    aria-labelledby={tabId(item.id)}
                    hidden={item.id !== activeId}
                    tabIndex={0}
                    className="py-4 text-grey dark:text-light-grey focus:outline-none"
                >
                    {item.content}
                </div>
            ))}
        </div>
    )
}

export default Tabs
