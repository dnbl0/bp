/** Translate a CMS padding string to a Tailwind padding and margin setting. */
export const getVerticalPadding = (paddingSize: string): string | undefined => {
    const paddingMargins: Record<string, string> = {
        none: '',
        small: 'py-5 my-5',
        medium: 'py-8 my-5',
        large: 'py-12 my-5',
    }

    return paddingMargins[paddingSize.toLowerCase()]
}
