import { SVGProps } from 'react'

export const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        className="fill-current"
        width={32}
        height={32}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16Zm4-24h-2.4a3.2 3.2 0 0 0-3.2 3.2v3.2H12v3.2h2.4V24h3.2v-6.4H20v-3.2h-2.4v-2c0-.552.248-1.2.8-1.2H20V8Z"
        />
    </svg>
)
