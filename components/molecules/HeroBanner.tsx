import { CmsAsset } from '../../types/contentful-cms-types'
import { ResponsiveImage } from '../atoms/ResponsiveImage'
import { cx } from '../../utils/cx'
import { useMeasure } from 'react-use'

export const HeroBanner = ({
    bannerText,
    foreground: foreground,
    image,
}: {
    bannerText?: React.ReactNode
    foreground?: React.ReactNode
    image?: CmsAsset
}) => {
    const [ref, { height }] = useMeasure<HTMLDivElement>()

    const background = image && (
        <div
            className={cx(
                'h-full flex-row-reverse items-stretch',
                'hidden md:flex min-h-[400px]'
            )}
        >
            <div className="w-[50%]">
                <ResponsiveImage image={image} layout="fill" />
            </div>
        </div>
    )

    const bannerTextLayer = (
        <div>
            {image && (
                <div className="md:hidden">
                    <ResponsiveImage image={image} layout="responsive" />
                </div>
            )}
            <div className="w-content m-auto">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6">
                        {bannerText}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div
            className={cx(
                height > 96 * 2
                    ? 'grid-rows-[1fr_auto_96px_auto]'
                    : 'grid-rows-[1fr_auto_auto_auto]',
                'grid grid-cols-1 grid-flow-row',
                'pb-12 w-full'
            )}
        >
            <div className="bg-cyan col-start-1 row-start-1 row-span-3">
                {background}
            </div>
            <div className="col-start-1 row-start-2 row-span-1">
                {bannerTextLayer}
            </div>
            <div
                className="col-start-1 row-start-3 row-span-2 relative"
                ref={ref}
            >
                {foreground}
            </div>
        </div>
    )
}
