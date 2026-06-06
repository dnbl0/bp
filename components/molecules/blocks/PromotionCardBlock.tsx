import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cmsAssetToImageAttributes } from '../../../lib/cmsAssets'
import { CmsPromotionCard } from '../../../types/contentful-cms-types'
import { cx } from '../../../utils/cx'
import { getBgColour } from '../../../utils/getBgColour'
import { ChevronDownIcon } from '../../atoms/icons/ChevronDownIcon'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'
import { MarkdownBlock } from './MarkdownBlock'

export const PromotionCardBlock = ({
    component,
    headingOverride,
}: {
    component: CmsPromotionCard
    headingOverride?: string
}) => {
    const { heading, body, buttonText, buttonHref, icon, iconSize, iconPosition } = component

    const iconVerticalPosition: Record<string, string> = {
        top: 'mb-auto',
        center: 'my-auto',
        bottom: '',
    }
    
    return (
        <div
            className={cx(
                'text-navy p-6 rounded',
                'flex flex-wrap gap-6',
                'bg-cyan-50',
                'border border-cyan',
                'rounded',
                'md:items-end',
                'flex-col md:flex-row'
            )}
        >
            {icon && (
                <div className={cx("shrink-0", !!iconPosition ? iconVerticalPosition[iconPosition.toLowerCase()] : '')}>
                    <div>
                        <ResponsiveImage image={icon} iconSize={iconSize ??  undefined} layout="fixed" />
                    </div>
                </div>
            )}

            <div className="col-span-3 gap-y-3 flex flex-col w-full max-w-fit min-w-[11rem] flex-1">
                
                {(heading || headingOverride !== '') && (
                    <h2 className="text-heading-s font-medium">{headingOverride ?? heading}</h2>
                )}
                {body && (
                    <div className="text-base">
                        <MarkdownBlock content={body} />
                    </div>
                )}
                {buttonHref && buttonText && (
                    <div>
                        <Link href={buttonHref}>
                            <a className="button button--secondary inline-block">
                                <span className="inline-block mr-4">
                                    {buttonText}
                                </span>
                                <span className="inline-block -rotate-90">
                                    <ChevronDownIcon />
                                </span>
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
