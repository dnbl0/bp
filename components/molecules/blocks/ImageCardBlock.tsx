import { ChevronRightIcon } from '../../atoms/icons/ChevronRightIcon'
import { CmsImageCard } from '../../../types/contentful-cms-types'
import Link from 'next/link'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'
import { cx } from '../../../utils/cx'
import { useRouter } from 'next/router'

/**
 * Added this type to differentiate style based on region list detail section. Refer Figma for more details.
 * Default refers to normal card block type with image, heading, body and button. Skeleton refers to card block type with only image, heading and button
 */
type CardBlockType = 'default' | 'skeleton'

export const ImageCardBlock = ({
    component,
    cardBlockType = 'default',
}: {
    component: CmsImageCard
    cardBlockType?: CardBlockType
}) => {
    const router = useRouter()

    const { heading, body, buttonText, buttonHref, image } = component

    const buttonStyle =
        cardBlockType === 'skeleton'
            ? 'button--ghost px-0 pb-0'
            : 'button--secondary'

    const handleOnClick = () => {
        if (buttonHref) {
            router.push(buttonHref)
        }
    }

    const hasText = !!heading || !!body

    return (
        <div
            className={cx(
                '@container',
                'rounded px-6 overflow-hidden',
                'flex flex-col flex-1',
                cardBlockType === 'default' && 'gap-6',
                hasText && 'pb-6',
                buttonHref &&
                    'cursor-pointer shadow-depth-default hover:shadow-depth-hover'
            )}
            onClick={handleOnClick}
        >
            <div className="flex-grow">
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="-mx-6 h-[200px] @sm:h-[248px] @md:h-[320px] @lg:h-[400px]">
                            <ResponsiveImage image={image} layout="fill" />
                        </div>
                    )}
                    {hasText && (
                        <div>
                            {heading && (
                                <h2 className="text-heading-s font-medium mb-3">
                                    {heading}
                                </h2>
                            )}
                            {body && <p>{body}</p>}
                        </div>
                    )}
                </div>
            </div>

            {buttonText && buttonHref && (
                <div className="flex flex-row justify-start">
                    <Link href={buttonHref}>
                        <a className={`button ${buttonStyle}`}>
                            <span>{buttonText}</span>
                            <span>
                                <ChevronRightIcon />
                            </span>
                        </a>
                    </Link>
                </div>
            )}
        </div>
    )
}
