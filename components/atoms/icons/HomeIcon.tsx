import * as React from 'react'
import { SVGProps } from 'react'

const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 20h4v-7h-4v7Zm1 0h2v-6h-2v6Zm1-17L1 10.455l.545.8 2-1.36V20H20.5V9.895l2 1.36.5-.8L12 3Z"
            fill="#0079C8"
        />
    </svg>
)

export default HomeIcon
