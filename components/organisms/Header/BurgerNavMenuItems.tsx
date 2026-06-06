import Link from 'next/link'
import { useEffect, useState } from 'react'
import useDimensions from 'react-cool-dimensions'
import { MenuItem } from '../../../types/menuItem'
import { cx } from '../../../utils/cx'
import { ChevronDownIcon } from '../../atoms/icons/ChevronDownIcon'

export const BurgerNavMenuItems = ({
    menuItems,
    onNavigate,
}: {
    menuItems: MenuItem[]
    onNavigate: () => void
}) => {
    return (
        <nav>
            <ul className="border-b border-b-warm-paper-200">
                {menuItems.map((menuItem, index) => (
                    <TopLevelWrapper
                        key={`${index}_${menuItem.id}`}
                        menuItem={menuItem}
                        onNavigate={onNavigate}
                    />
                ))}
            </ul>
        </nav>
    )
}

const TopLevelWrapper = ({
    menuItem,
    onNavigate,
}: {
    menuItem: MenuItem
    onNavigate: () => void
}) => {
    // The component needs to support four types of menu items:
    // - Items with neither a href or child items
    // - Items with a href and no children
    // - Items with no href and some children
    // - Items with a href and some children

    const [isOpen, setIsOpen] = useState(false)

    const childItems = menuItem.items || []

    if (childItems.length === 0 && !menuItem.href) {
        return null
    }

    if (childItems.length === 0 && menuItem.href) {
        return (
            <li className="border-t border-t-warm-paper-200">
                <Link href={menuItem.href}>
                    <a
                        onClick={onNavigate}
                        target={menuItem.openInNewTab ? '_blank' : undefined}
                        rel={menuItem.openInNewTab ? 'noreferrer' : undefined}
                    >
                        <TopLevelItem menuItem={menuItem} />
                    </a>
                </Link>
            </li>
        )
    }

    const mergedItems = menuItem.href ? [menuItem, ...childItems] : childItems

    return (
        <li className="">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cx(
                    'block w-full text-left',
                    'border-t',
                    isOpen && 'border-b',
                    isOpen ? 'border-y-focus-blue' : 'border-y-warm-paper-200'
                )}
            >
                <TopLevelItem open={isOpen} menuItem={menuItem} />
            </button>
            <SecondLevelWrapper open={isOpen}>
                <ul>
                    {mergedItems.map((mergedItems, index) => (
                        <SecondLevelItem
                            key={`${index}_${mergedItems.id}`}
                            menuItem={mergedItems}
                            onNavigate={onNavigate}
                        />
                    ))}
                </ul>
            </SecondLevelWrapper>
        </li>
    )
}

const TopLevelItem = ({
    open: isOpen,
    menuItem,
}: {
    open?: boolean
    menuItem: MenuItem
}) => {
    const { caption } = menuItem
    const hasChildren = !!menuItem.items?.length

    return (
        <div
            className={cx(
                'p-6 font-semibold cursor-pointer select-none',
                'hover:bg-warm-paper-100 hover:text-cyan hover:underline'
            )}
        >
            <div className="flex flex-row justify-between items-center">
                <div>{caption}</div>
                {hasChildren && (
                    <div className={cx(isOpen && 'rotate-180')}>
                        <ChevronDownIcon />
                    </div>
                )}
            </div>
        </div>
    )
}

const SecondLevelItem = ({
    menuItem,
    onNavigate,
}: {
    menuItem: MenuItem
    onNavigate: () => void
}) => {
    const { href, caption } = menuItem
    if (!href) return null
    return (
        <li>
            <Link href={href}>
                <a
                    className={cx(
                        'block px-12 py-6 font-medium cursor-pointer select-none',
                        'hover:bg-warm-paper-100 hover:text-cyan hover:underline'
                    )}
                    onClick={onNavigate}
                    target={menuItem.openInNewTab ? '_blank' : undefined}
                    rel={menuItem.openInNewTab ? 'noreferrer' : undefined}
                >
                    {caption}
                </a>
            </Link>
        </li>
    )
}

const SecondLevelWrapper = ({
    open: isOpen,
    children,
}: {
    open?: boolean
    children?: React.ReactNode
}) => {
    const { observe, height: childrenHeight } = useDimensions()
    const [sectionHeight, setSectionHeight] = useState(0)

    useEffect(() => {
        const targetHeight = isOpen && children ? childrenHeight : 0
        setSectionHeight(targetHeight)
    }, [isOpen, children, childrenHeight])

    return (
        <div
            className="overflow-hidden transition-height duration-100"
            style={{ height: sectionHeight }}
        >
            <div ref={observe}>{children}</div>
        </div>
    )
}
