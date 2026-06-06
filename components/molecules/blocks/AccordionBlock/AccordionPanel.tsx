import { paramCase } from 'param-case'
import { useEffect, useState } from 'react'
import useDimensions from 'react-cool-dimensions'
import { cx } from '../../../../utils/cx'

/**
 * An accordion panel consists of two parts:
 *
 * - The header
 * - The body
 *
 * The header is always visible and is the object that the user will
 * interact with to open and close the accordion.
 *
 * The body is visible only when the accordion is open.
 */
export const AccordionPanel = ({
    itemIndex,
    header,
    children,
}: {
    itemIndex: number
    header: string
    children?: React.ReactNode
}) => {
    const [isOpen, setIsOpen] = useState(false)
    if (!children) {
        return null
    }
    return (
        <div
            className={cx(
                'border-b-[1px] border-cool-paper-200',
                itemIndex === 0 && 'border-t-[1px]'
            )}
        >
            <div onClick={() => setIsOpen(!isOpen)} className="">
                <Header isOpen={isOpen} title={header} />
            </div>
            <Body open={isOpen}>
                <div className="pb-6 px-6">{children}</div>
            </Body>
        </div>
    )
}

const Header = ({ isOpen, title }: { isOpen: boolean; title: string }) => {
    return (
        <h3
            className={cx(
                'group',
                'p-6 cursor-pointer select-none text-navy font-medium',
                'flex flex-row'
            )}
            data-link-type={`accordion-${paramCase(title)}`}
        >
            <span
                className={cx(
                    'flex-grow',
                    'group-hover:underline',
                    isOpen && 'underline'
                )}
            >
                {title}
            </span>
            <span
                className={cx(
                    'accordion-state-icon',
                    isOpen && 'accordion-state-icon--open'
                )}
            ></span>
        </h3>
    )
}

const Body = ({
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
            className="overflow-hidden transition-height duration-300"
            style={{ height: sectionHeight }}
        >
            <div ref={observe}>{children}</div>
        </div>
    )
}
