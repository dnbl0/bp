import { SVGProps } from 'react'

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        className="fill-current"
        width={12}
        height={8}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
    >
        <path d="m6 8 6-6L10.59.59 6 5.17 1.41.59 0 2l6 6Z" />
    </svg>
)
