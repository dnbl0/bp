import { SVGProps } from 'react'

export const BurgerIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={33}
        height={22}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
    >
        <path
            d="M-5 22h33v-3.667H-5V22Zm0-9.167h33V9.167H-5v3.666ZM-5 0v3.667h33V0H-5Z"
            fill="#0079C8"
        />
    </svg>
)
