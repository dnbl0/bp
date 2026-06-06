import { ImgHTMLAttributes } from 'react'

export const BupaAgedCareLogo = ({
    className,
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) => (
    <img
        src="/images/bupa-logo.png"
        width={600}
        height={600}
        alt=""
        aria-hidden="true"
        className={className ?? 'h-14 w-auto'}
        {...props}
    />
)
