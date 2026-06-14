import { ReactNode } from 'react'

/**
 * A shared set of 20px line icons for InfoCard tiles, so every documentation
 * card carries an icon and the set reads as one consistent family. All share a
 * 24px grid, currentColor stroke and rounded joins (matching the homepage
 * InfoCard icons). Pass `cardIcons.<key>` straight into InfoCard's `icon` prop.
 */
const Svg = ({ children }: { children: ReactNode }) => (
    <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {children}
    </svg>
)

export const cardIcons: Record<string, ReactNode> = {
    /* Token categories */
    color: (
        <Svg>
            <path d="M12 3s6 6.5 6 10a6 6 0 11-12 0c0-3.5 6-10 6-10z" />
        </Svg>
    ),
    typography: (
        <Svg>
            <path d="M5 7V5h14v2M12 5v14M9 19h6" />
        </Svg>
    ),
    spacing: (
        <Svg>
            <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" />
            <path d="M9 12h6" />
        </Svg>
    ),
    radius: (
        <Svg>
            <path d="M5 19v-7a7 7 0 017-7h7" />
        </Svg>
    ),
    elevation: (
        <Svg>
            <path d="M12 3l9 5-9 5-9-5 9-5z" />
            <path d="M3 13l9 5 9-5" />
        </Svg>
    ),
    motion: (
        <Svg>
            <circle cx="12" cy="12" r="9" />
            <path d="M10 8.5l5 3.5-5 3.5z" />
        </Svg>
    ),

    /* Token usage rules */
    'rule-token': (
        <Svg>
            <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
        </Svg>
    ),
    'rule-semantic': (
        <Svg>
            <path d="M4 12l8-8h6v6l-8 8-6-6z" />
            <circle cx="15" cy="9" r="1" />
        </Svg>
    ),
    'rule-contract': (
        <Svg>
            <path d="M9 15l6-6M10.5 6.5l1-1a4 4 0 016 6l-1 1M13.5 17.5l-1 1a4 4 0 01-6-6l1-1" />
        </Svg>
    ),

    /* POUR principles */
    perceivable: (
        <Svg>
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
        </Svg>
    ),
    operable: (
        <Svg>
            <path d="M5 3l6 16 2-6 6-2L5 3z" />
        </Svg>
    ),
    understandable: (
        <Svg>
            <path d="M9 18h6M10 21h4" />
            <path d="M12 3a6 6 0 00-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 00-4-10z" />
        </Svg>
    ),
    robust: (
        <Svg>
            <path d="M9 8l-4 4 4 4M15 8l4 4-4 4M13.5 6l-3 12" />
        </Svg>
    ),

    /* Getting started / nav destinations */
    tokens: (
        <Svg>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="4" />
        </Svg>
    ),
    components: (
        <Svg>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </Svg>
    ),
    patterns: (
        <Svg>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 9v12" />
        </Svg>
    ),
    resources: (
        <Svg>
            <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </Svg>
    ),
    status: (
        <Svg>
            <path d="M9 5h11M9 12h11M9 19h11" />
            <path d="M3 5l1.5 1.5L7 4M3 12l1.5 1.5L7 11M3 19l1.5 1.5L7 18" />
        </Svg>
    ),
    content: (
        <Svg>
            <path d="M6 3h8l4 4v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
            <path d="M14 3v4h4M8 13h8M8 17h5" />
        </Svg>
    ),

    /* Brand pillars */
    strategy: (
        <Svg>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1" />
        </Svg>
    ),
    principles: (
        <Svg>
            <rect x="4" y="4" width="16" height="16" rx="2" />
        </Svg>
    ),
    toolkit: (
        <Svg>
            <circle cx="12" cy="12" r="9" />
            <circle cx="8.5" cy="9.5" r="1" />
            <circle cx="15.5" cy="9.5" r="1" />
            <circle cx="9" cy="15" r="1" />
            <circle cx="15" cy="15" r="1" />
        </Svg>
    ),
    voice: (
        <Svg>
            <path d="M5 5h14a1 1 0 011 1v8a1 1 0 01-1 1H9l-4 4v-4H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
        </Svg>
    ),

    /* Illustration types */
    people: (
        <Svg>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20a7 7 0 0114 0" />
        </Svg>
    ),
    objects: (
        <Svg>
            <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
            <path d="M12 21V12M4 7.5l8 4.5 8-4.5" />
        </Svg>
    ),
    scenes: (
        <Svg>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8" cy="10" r="1.5" />
            <path d="M3 16l5-4 4 3 3-2 6 5" />
        </Svg>
    ),
    explanatory: (
        <Svg>
            <rect x="3" y="4" width="6" height="5" rx="1" />
            <rect x="15" y="4" width="6" height="5" rx="1" />
            <rect x="9" y="15" width="6" height="5" rx="1" />
            <path d="M6 9v3h12V9M12 12v3" />
        </Svg>
    ),

    /* Illustration colour palettes */
    'palette-primary': (
        <Svg>
            <circle cx="12" cy="12" r="8" fill="currentColor" stroke="none" />
        </Svg>
    ),
    'palette-secondary': (
        <Svg>
            <circle cx="12" cy="12" r="8" />
            <path d="M12 4a8 8 0 010 16z" fill="currentColor" stroke="none" />
        </Svg>
    ),
    'palette-neutral': (
        <Svg>
            <circle cx="12" cy="12" r="8" />
        </Svg>
    ),
    'palette-skin': (
        <Svg>
            <circle cx="8.5" cy="10" r="3" />
            <circle cx="15.5" cy="10" r="3" />
            <circle cx="12" cy="15.5" r="3" />
        </Svg>
    ),

    /* Header styles */
    'header-primary': (
        <Svg>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 9h18" />
            <path d="M6 6.5h3" />
        </Svg>
    ),
    'header-secondary': (
        <Svg>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 8h18" />
        </Svg>
    ),
    'header-neutral': (
        <Svg>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 8h18" strokeDasharray="3 2" />
        </Svg>
    ),
}
