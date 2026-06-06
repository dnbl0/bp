import { Children, useContext } from 'react'

import { AreaTypeContext } from '../../../hooks/useAreaTypeContext'
import { cx } from '../../../utils/cx'

export type BannerLayout = '12' | '6x6' | '4x4x4' | '8x4' | '4x8' | '3x3x3x3'

export const BannerSection = ({
    bannerLayout,
    children,
    className,
}: {
    bannerLayout: BannerLayout
    children?: React.ReactNode
    className?: string
}) => {
    const areaType = useContext(AreaTypeContext)
    const sectionClass = areaType === 'Column' ? 'w-full' : 'w-content m-auto'
    const blocks = Children.toArray(children).slice(0, blockCount[bannerLayout])
    return (
        <div
            className={cx(
                className,
                'py-2',
                sectionClass,
                gridStyle[bannerLayout],
                'justify-items-stretch items-stretch'
            )}
        >
            {blocks}
        </div>
    )
}

const blockCount: Record<BannerLayout, number> = {
    '12': 12,
    '6x6': 2,
    '4x4x4': 3,
    '8x4': 2,
    '4x8': 2,
    '3x3x3x3': 4,
}

const gridStyle: Record<BannerLayout, string> = {
    '12': cx(
        'flex flex-col gap-4 grid-cols-12',
        'md:grid',
        '[&>*]:col-span-12'
    ),
    '6x6': cx(
        'flex flex-col gap-4 grid-cols-12 ',
        'md:grid',
        '[&>*]:col-span-6'
    ),
    '4x4x4': cx(
        'flex flex-col gap-4 grid-cols-12',
        'md:grid',
        '[&>*]:col-span-4'
    ),
    '8x4': cx(
        'flex flex-col gap-4 grid-cols-12',
        'md:grid',
        '[&>*:nth-child(1)]:col-span-8',
        '[&>*:nth-child(2)]:col-span-4'
    ),
    '4x8': cx(
        'flex flex-col-reverse gap-4 grid-cols-12',
        'md:grid',
        '[&>*:nth-child(1)]:col-span-4',
        '[&>*:nth-child(2)]:col-span-8'
    ),
    '3x3x3x3': cx(
        'grid gap-4 grid-cols-12',
        '[&>*]:col-span-6 lg:[&>*]:col-span-3'
    ),
}
