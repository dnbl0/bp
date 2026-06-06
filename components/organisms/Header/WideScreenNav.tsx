import Link from 'next/link'
import { Fragment, useState } from 'react'
import { MenuItem } from '../../../types/menuItem'
import { cx } from '../../../utils/cx'

export const WideScreenNav = ({ menuItems }: { menuItems: MenuItem[] }) => {
    const [activeMenuItemId, setActiveMenuItemId] = useState<string>()

    const handleMenuItemEnter = (menuItemId: string) => {
        setActiveMenuItemId(menuItemId)
    }

    const handleMenuItemLeave = (menuItemId: string) => {
        if (menuItemId === activeMenuItemId) {
            setActiveMenuItemId(undefined)
        }
    }

    const handleClose = () => {
        setActiveMenuItemId(undefined)
    }

    return (
        <div className="flex flex-row leading-5 items-center">
            {menuItems.map((menuItem, index) => (
                <Fragment key={`${index}_${menuItem.id}`}>
                    <PrimaryNavItemWrapper
                        menuItem={menuItem}
                        isActive={menuItem.id === activeMenuItemId}
                        onClose={handleClose}
                        onMenuItemEnter={handleMenuItemEnter}
                        onMenuItemLeave={handleMenuItemLeave}
                    />
                </Fragment>
            ))}
        </div>
    )
}

const PrimaryNavItemWrapper = ({
    menuItem,
    isActive,
    onClose,
    onMenuItemEnter,
    onMenuItemLeave,
}: {
    menuItem: MenuItem
    isActive: boolean
    onClose: () => void
    onMenuItemEnter: (menuItemId: string) => void
    onMenuItemLeave: (menuItemId: string) => void
}) => {
    const childItems = menuItem.items || []

    return (
        <div className="" onMouseLeave={() => onMenuItemLeave(menuItem.id)}>
            <div className="" onMouseEnter={() => onMenuItemEnter(menuItem.id)}>
                <TopLevelMenuItem
                    menuItem={menuItem}
                    isActive={isActive}
                    onClose={onClose}
                />
            </div>
            {isActive && !!childItems.length && (
                <SecondLevelMenuItems
                    menuItems={childItems}
                    onClose={onClose}
                />
            )}
        </div>
    )
}

const TopLevelMenuItem = ({
    menuItem,
    isActive,
    onClose,
}: {
    menuItem: MenuItem
    isActive: boolean
    onClose: () => void
}) => {
    const href = menuItem.href

    const displayElement = (
        <div
            className={cx(
                'px-4 py-3',
                'flex items-center',
                'cursor-pointer',
                'font-semibold',
                isActive ? 'bg-navy text-white' : 'text-navy',
                'hover:bg-navy hover:text-white',
                !!href && 'hover:underline'
            )}
        >
            <div>{menuItem.caption}</div>
        </div>
    )

    return href ? (
        <Link href={href}>
            <a
                onClick={onClose}
                target={menuItem.openInNewTab ? '_blank' : undefined}
                rel={menuItem.openInNewTab ? 'noreferrer' : undefined}
            >
                {displayElement}
            </a>
        </Link>
    ) : (
        <Fragment>{displayElement}</Fragment>
    )
}

const SecondLevelMenuItems = ({
    menuItems,
    onClose,
}: {
    menuItems: MenuItem[]
    onClose: () => void
}) => {
    return (
        <div className="relative z-dropdown">
            <div className="absolute min-w-full flex flex-col items-start shadow">
                {menuItems.map((item, index) => (
                    <Fragment key={`${index}_${item.id}`}>
                        {item.href && (
                            <Link href={item.href}>
                                <a
                                    className={cx(
                                        'px-4 py-3 min-w-full w-max',
                                        'cursor-pointer',
                                        'bg-white text-navy font-semibold',
                                        'hover:bg-warm-paper-100 hover:text-cyan hover:underline'
                                    )}
                                    onClick={onClose}
                                    target={
                                        item.openInNewTab ? '_blank' : undefined
                                    }
                                    rel={
                                        item.openInNewTab
                                            ? 'noreferrer'
                                            : undefined
                                    }
                                >
                                    {item.caption}
                                </a>
                            </Link>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
