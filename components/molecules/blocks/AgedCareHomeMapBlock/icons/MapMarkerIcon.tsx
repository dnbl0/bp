import { SVGProps } from 'react'

export const MapMarkerIconLarge = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={48}
            height={48}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 5.655C21.249 2.688 17.483 1 13.536 1 5.948 1 0 7.191 0 15.093c0 9.396 7.695 16.905 19.503 28.101L24 47.222l4.499-4.028C40.307 31.998 48 24.49 48 15.093 48 7.19 42.033 1 34.418 1 30.498 1 26.75 2.688 24 5.655Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m12.16 20.195.57.825 2.077-1.403v10.456h17.756V19.617l2.102 1.403.535-.825-11.515-7.716-11.525 7.716Zm9.432 9.88h4.199v-7.202h-4.199v7.202Z"
                fill="#fff"
            />
        </svg>
    )
}

export const MapMarkerIconMedium = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={48}
            height={48}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 20.103C22.166 18.125 19.655 17 17.024 17 11.965 17 8 21.128 8 26.395c0 6.264 5.13 11.27 13.002 18.735L24 47.815l3-2.685c7.871-7.465 13-12.47 13-18.735C40 21.128 36.022 17 30.945 17c-2.613 0-5.112 1.125-6.945 3.103Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m16.107 29.797.379.55 1.385-.936v6.97H29.71v-6.97l1.401.936.357-.55-7.677-5.145-7.683 5.145Zm6.288 6.586h2.799v-4.801h-2.8v4.801Z"
                fill="#fff"
            />
        </svg>
    )
}

export const MapMarkerIconSmall = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={48}
            height={49}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 27.328C22.624 25.843 20.741 25 18.768 25 14.974 25 12 28.096 12 32.046c0 4.698 3.848 8.453 9.752 14.051L24 48.111l2.25-2.014C32.154 40.5 36 36.744 36 32.047 36 28.095 33.016 25 29.21 25c-1.961 0-3.835.844-5.21 2.328Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m18.08 34.599.285.412 1.039-.702v5.228h8.878V34.31l1.05.702.268-.413-5.758-3.858L18.08 34.6Zm4.716 4.94h2.1v-3.602h-2.1v3.602Z"
                fill="#fff"
            />
        </svg>
    )
}
