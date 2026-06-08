import { SVGProps } from 'react'

/**
 * Bupa logo mark — the white "Bupa" wordmark and heartbeat pulse on a blue
 * (brand `cyan` #0079C8) square. The wordmark is set in Montserrat (the design
 * system typeface); when exporting the mark the font is embedded so the file
 * stays self-contained. Size it with CSS, e.g. `h-16 w-auto`.
 */
export const BupaLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={240}
        height={240}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
    >
        <rect width="240" height="240" rx="28" fill="#0079C8" />
        <text
            x="26"
            y="118"
            fill="#FFFFFF"
            fontFamily="Montserrat, Arial, sans-serif"
            fontSize="74"
            fontWeight="700"
        >
            Bupa
        </text>
        <path
            d="M60 152H150L156 140L163 152L175 94L189 186L200 140L206 152H228"
            stroke="#FFFFFF"
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
