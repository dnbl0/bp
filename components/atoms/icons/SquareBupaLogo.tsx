import { ImgHTMLAttributes } from 'react'

export const SquareBupaLogo = ({
    className,
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) => (
    <img
        src="/images/bupa-pulse-logo.png"
        width={200}
        height={200}
        alt=""
        aria-hidden="true"
        className={className ?? 'h-16 w-auto'}
        {...props}
    />
)
