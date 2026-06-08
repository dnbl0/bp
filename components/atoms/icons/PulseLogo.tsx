import { SVGProps } from 'react'

/**
 * Pulse logo mark — a white ECG / heartbeat line on a blue square. The colours
 * are baked in (blue uses the brand `cyan` value #0079C8) so the mark renders
 * the same wherever it is placed; size it with CSS (e.g. `h-8 w-auto`).
 */
export const PulseLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={100}
        height={100}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
    >
        <rect width="100" height="100" rx="16" fill="#0079C8" />
        <path
            d="M5 57H30L35.5 46L41 57L52 14L62 86L69.5 48L75 57H95"
            stroke="#FFFFFF"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
