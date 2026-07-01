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
    const headerId = `accordion-header-${itemIndex}-${paramCase(header)}`
    const panelId = `accordion-panel-${itemIndex}-${paramCase(header)}`

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
            <Header
                isOpen={isOpen}
                title={header}
                headerId={headerId}
                panelId={panelId}
                onToggle={() => setIsOpen(!isOpen)}
            />
            <Body open={isOpen} id={panelId} labelledBy={headerId}>
                <div className="pb-6 px-6">{children}</div>
            </Body>
        </div>
    )
}

const Header = ({
    isOpen,
    title,
    headerId,
    panelId,
    onToggle,
}: {
    isOpen: boolean
    title: string
    headerId: string
    panelId: string
    onToggle: () => void
}) => {
    return (
        <h3 className="m-0">
            <button
                id={headerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={cx(
                    'group',
                    'w-full text-left',
                    'p-6 cursor-pointer select-none text-navy font-medium',
                    'flex flex-row'
                )}
                onClick={onToggle}
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
            </button>
        </h3>
    )
}

const Body = ({
    open: isOpen,
    id,
    labelledBy,
    children,
}: {
    open?: boolean
    id: string
    labelledBy: string
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
            id={id}
            role="region"
            aria-labelledby={labelledBy}
            aria-hidden={!isOpen}
            className="overflow-hidden transition-height duration-300"
            style={{ height: sectionHeight }}
        >
            <div ref={observe}>{children}</div>
        </div>
    )
}
