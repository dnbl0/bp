import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cmsAssetToImageAttributes } from '../../../lib/cmsAssets'
import { CmsColouredCard } from '../../../types/contentful-cms-types'
import { cx } from '../../../utils/cx'
import { getBgColour } from '../../../utils/getBgColour'
import { ChevronRightIcon } from '../../atoms/icons/ChevronRightIcon'
import { RichTextContent } from '../../atoms/RichTextContent'
import { HeaderStyle } from '../../atoms/HeaderStyle'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'
export const ColouredCardBlock = ({
    component,
}: {
    component: CmsColouredCard
}) => {
    const router = useRouter()

    const {
        heading,
        headingSize,
        bodyRichText,
        body,
        bodyPosition,
        buttonText,
        buttonHref,
        icon,
        iconSize,
        backgroundColour,
    } = component
    
    const handleOnClick = () => {
        if (buttonHref) {
            router.push(buttonHref)
        }
    }

    const validPositions = ['left', 'right', 'bottom']

    const getBodyPosition = (bodyPosition: string | undefined | null) => {
        if (bodyPosition === null || bodyPosition === undefined) {
            return 'bottom'
        } else if (validPositions.includes(bodyPosition)) {
            return bodyPosition
        } else {
            console.warn('Unexpected input for bodyPosition:', bodyPosition)
            return 'bottom'
        }
    }

    const isWhiteBg = backgroundColour?.toLowerCase() === 'white';

    const IconHeadingContent = () => (
        <div className="flex flex-col gap-6">
            {icon && (
                <div>
                    <ResponsiveImage image={icon} layout="intrinsic" {...(!!iconSize && {iconSize})} />
                </div>
            )}
            {heading && (
                <HeaderStyle
                    className={"font-semibold"}
                    headerStyle={headingSize}
                    textColour={isWhiteBg ? 'text-navy' : undefined}
                >
                    {heading}
                </HeaderStyle>
            )}
        </div>
    )

    const BodyButtonContent = () => (
        <div className="flex flex-col gap-6">
            {body && <p>{body}</p>}
            {!body && bodyRichText && (
                <div>
                    <RichTextContent
                        className={cx( isWhiteBg ? '' : 'text-white' )}
                        json={bodyRichText.json}
                        isColouredCard
                    />
                </div>
            )}
            {buttonText && buttonHref && (
                <div
                    className="flex flex-row justify-start"
                    onClick={handleOnClick}
                >
                    <Link href={buttonHref}>
                        <a className={cx('button button--secondary', isWhiteBg ? '' :' button--inverse', 'cursor-pointer')}>
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

    return (
        <>
            {getBodyPosition(bodyPosition) === 'bottom' && (
                <div
                    className={cx(
                        'p-6 rounded',
                        isWhiteBg ? 'border border-lighter-grey' : 'text-white' ,
                        'flex flex-col gap-6 flex-1',
                        (backgroundColour && getBgColour(backgroundColour)) ||
                            'bg-cyan'
                    )}
                >
                    <div className="flex-grow ">{IconHeadingContent()}</div>
                    {BodyButtonContent()}
                </div>
            )}
            {getBodyPosition(bodyPosition) === 'left' && (
                <div
                    className={cx(
                        'p-6 rounded',
                        isWhiteBg ? '' : 'text-white' ,
                        'flex flex-col flex-1',
                        'md:flex-row-reverse',
                        'gap-6',
                        (backgroundColour && getBgColour(backgroundColour)) ||
                            'bg-cyan'
                    )}
                >
                    <div className="flex-grow-0 md:w-1/2">
                        {IconHeadingContent()}
                    </div>
                    <div className="flex-grow md:w-1/2">
                        {BodyButtonContent()}
                    </div>
                </div>
            )}
            {getBodyPosition(bodyPosition) === 'right' && (
                <div
                    className={cx(
                        'p-6 rounded',
                        isWhiteBg ? '' : 'text-white' ,
                        'flex flex-col flex-1',
                        'gap-6',
                        'md:flex-row',
                        (backgroundColour && getBgColour(backgroundColour)) ||
                            'bg-cyan'
                    )}
                >
                    <div className="flex-grow-0 md:w-1/2">
                        {IconHeadingContent()}
                    </div>
                    <div className="flex-grow md:w-1/2">
                        {BodyButtonContent()}
                    </div>
                </div>
            )}
        </>
    )
}
