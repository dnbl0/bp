import React, { ButtonHTMLAttributes, useState } from 'react'
import { cx } from '../../../../utils/cx'
import { ListIcon } from '../../../atoms/icons/ListIcon'

export const TabControl = ({
    tabIndex,
    onChange,
    children,
}: {
    tabIndex: number
    onChange?: (index: number, label: string) => void
    children?: React.ReactNode
}) => {
    const panelContent = React.Children.toArray(children)[tabIndex]

    return (
        <div>
            <div className="flex flex-row">
                <TabButton
                    active={tabIndex === 0}
                    className="flex-grow"
                    onClick={() => {
                        onChange?.(0, 'List View')
                    }}
                >
                    List view
                </TabButton>
                <TabButton
                    active={tabIndex === 1}
                    className="flex-grow"
                    onClick={() => {
                        onChange?.(1, 'Map View')
                    }}
                >
                    Map view
                </TabButton>
            </div>
            <div>{panelContent}</div>
        </div>
    )
}

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean
}

const TabButton = (props: TabButtonProps) => {
    const { active, children, ...rest } = props
    return (
        <button {...rest}>
            <div
                className={cx(
                    'flex flex-row gap-3 justify-center pt-6 pb-5',
                    'font-semibold text-cyan',
                    'border-b-[4px]',
                    active ? 'text-cyan' : 'text-disabled-text  ',
                    active ? 'border-cyan' : 'border-cool-paper-200',
                    'hover:border-cyan'
                )}
            >
                <div>{children}</div>
                <ListIcon />
            </div>
        </button>
    )
}
