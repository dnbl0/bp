import { SVGProps } from 'react'

export const ListIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        className="fill-current"
        width={25}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M3.5 13h2v-2h-2v2Zm0 4h2v-2h-2v2Zm0-8h2V7h-2v2Zm4 4h14v-2h-14v2Zm0 4h14v-2h-14v2Zm0-10v2h14V7h-14Z" />
    </svg>
)
