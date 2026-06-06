import Link from 'next/link'
import { CmsCtaBlock } from '../../../types/contentful-cms-types'
import { cx } from '../../../utils/cx'
import { ChevronRightIcon } from '../../atoms/icons/ChevronRightIcon'

export const CtaBlock = ({ component, className, dataLinkType = 'cta-button' }: { component: CmsCtaBlock; className?: string; dataLinkType?: string }) => {
    const { text, href, size, variant, iconVariant, alignment } = component

    if (!href || !text) return null

    return (
        <div className={cx('flex', getButtonAlignmentClass(alignment), className)}>
            <Link href={href}>
                <a
                    className={cx(
                        'button',
                        getButtonSizeClass(size),
                        getButtonVariantClass(variant), 
                        className
                    )}
                    data-link-type={dataLinkType}
                >
                    {iconVariant === 'Left' && (
                        <span className="rotate-180">
                            <ChevronRightIcon />
                        </span>
                    )}
                    <span>{text}</span>
                    {iconVariant === 'Right' && (
                        <span>
                            <ChevronRightIcon />
                        </span>
                    )}
                </a>
            </Link>
        </div>
    )
}

const getButtonSizeClass = (size: string | undefined | null) => {
    switch (size) {
        case 'Small':
            return 'button--small'
        case 'Standard':
            return false
        case 'Giant':
            return 'button--giant'
        default:
            console.warn(`Unexpected size value: "${size}"`)
            return false
    }
}

const getButtonVariantClass = (variant: string | undefined | null) => {
    switch (variant) {
        case 'Primary':
            return 'button--primary'
        case 'Secondary':
            return 'button--secondary'
        case 'Ghost':
            return 'button--ghost'
        case 'Tertiary':
            return 'button--tertiary'
        default:
            console.warn(`Unexpected variant value: "${variant}"`)
            return 'button--secondary'
    }
}

const getButtonAlignmentClass = (alignment: string | undefined | null) => {
    switch (alignment) {
        case undefined:
        case null:
        case 'Left':
            return false
        case 'Center':
            return 'justify-center'
        default:
            return false
    }
}
