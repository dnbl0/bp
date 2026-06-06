import { SVGProps } from 'react'

export const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
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
            d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16Zm7.2-8.8v-5.8c0-1.976-1.6-3.608-3.6-3.608-.912 0-2.272.552-2.8 1.408v-1.6h-3.2v9.6h3.2v-5.4c0-.848.552-1.552 1.4-1.552.848 0 1.8.704 1.8 1.552v5.4h3.2Zm-11.2 0v-9.6H8.8v9.6H12ZM10.4 8.8a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"
        />
    </svg>
)
