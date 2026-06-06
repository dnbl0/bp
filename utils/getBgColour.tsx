/** Translate a CMS colour string to a Tailwind background colour class. */
export const getBgColour = (cmsColour: string): string | undefined => {
    const bgColours: Record<string, string> = {
        'transparent': 'bg-transparent',
        'white': 'bg-white',
        'cool grey': 'bg-cool-paper-100',
        'warm grey': 'bg-warm-paper-100',
        'cyan 500': 'bg-cyan',
        'cyan 400': 'bg-cyan-400',
        'cyan 50': 'bg-cyan-50',
        'teal': 'bg-teal',
        'fuchsia': 'bg-fuchsia',
        'orange': 'bg-orange',
        'green': 'bg-green',
        'purple': 'bg-purple',
        'navy': 'bg-navy',
        'bupa cyan background': 'bg-cyan-50',
        'bupa cool grey background': 'bg-cool-paper-100',
        'bupa light grey background': 'bg-cool-paper-50',
    }

    return bgColours[cmsColour.toLowerCase()]
}

