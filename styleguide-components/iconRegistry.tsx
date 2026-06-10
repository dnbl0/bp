/*
    Registry of every system icon in `public/brand-assets/system-icons`, used to
    generate the Iconography foundation page. Each entry records the display name,
    the source SVG file, and the React component file path so the docs can show a
    copyable import.

    Icons are rendered as <img> tags pointing to the static SVG assets so that
    colours baked into the SVGs are preserved exactly.
*/
/* eslint-disable @next/next/no-img-element */
import { ComponentType } from 'react'

import { BupaLogo } from '../components/atoms/icons/BupaLogo'
import { BupaAgedCareLogo } from '../components/atoms/icons/BupaAgedCareLogo'
import { PulseLogo } from '../components/atoms/icons/PulseLogo'

export interface IconEntry {
    /** Exported component name, used for the import snippet. */
    name: string
    /** File the icon is exported from, relative to `components/atoms/icons`. */
    file: string
    Component: ComponentType<{ className?: string }>
    category: 'icon' | 'logo'
    /** Whether the icon is a default export (affects the import snippet). */
    defaultExport?: boolean
}

/** Wraps a static SVG asset as a React component for use in the icon gallery. */
const svgIcon = (filename: string): ComponentType<{ className?: string }> => {
    const SvgImg = ({ className }: { className?: string }) => (
        <img
            src={`/brand-assets/system-icons/${filename}`}
            alt=""
            className={className}
        />
    )
    SvgImg.displayName = filename
    return SvgImg
}

export const icons: IconEntry[] = [
    { name: 'ArrowLeft',          file: 'ArrowLeft',          Component: svgIcon('ArrowLeft.svg'),          category: 'icon' },
    { name: 'ArrowRight',         file: 'ArrowRight',         Component: svgIcon('ArrowRight.svg'),         category: 'icon' },
    { name: 'ArrowUp',            file: 'ArrowUp',            Component: svgIcon('ArrowUp.svg'),            category: 'icon' },
    { name: 'BurgerIcon',         file: 'BurgerIcon',         Component: svgIcon('BurgerIcon.svg'),         category: 'icon' },
    { name: 'CallBackIcon',       file: 'CallBackIcon',       Component: svgIcon('CallBackIcon.svg'),       category: 'icon' },
    { name: 'CallNowIcon',        file: 'CallNowIcon',        Component: svgIcon('CallNowIcon.svg'),        category: 'icon' },
    { name: 'CheckCircleIcon',    file: 'CheckCircle',        Component: svgIcon('CheckCircle.svg'),        category: 'icon' },
    { name: 'ChevronDownIcon',    file: 'ChevronDownIcon',    Component: svgIcon('ChevronDownIcon.svg'),    category: 'icon' },
    { name: 'ChevronRightIcon',   file: 'ChevronRightIcon',   Component: svgIcon('ChevronRightIcon.svg'),   category: 'icon' },
    { name: 'ClipboardIcon',      file: 'Clipboard',          Component: svgIcon('Clipboard.svg'),          category: 'icon' },
    { name: 'CloseIcon',          file: 'CloseIcon',          Component: svgIcon('CloseIcon.svg'),          category: 'icon' },
    { name: 'FacebookIcon',       file: 'FacebookIcon',       Component: svgIcon('FacebookIcon.svg'),       category: 'icon' },
    { name: 'ImageGalleryIcon',   file: 'ImageGalleryIcon',   Component: svgIcon('ImageGalleryIcon.svg'),   category: 'icon' },
    { name: 'InstagramIcon',      file: 'InstagramIcon',      Component: svgIcon('InstagramIcon.svg'),      category: 'icon' },
    { name: 'LinkedInIcon',       file: 'LinkedInIcon',       Component: svgIcon('LinkedInIcon.svg'),       category: 'icon' },
    { name: 'ListIcon',           file: 'ListIcon',           Component: svgIcon('ListIcon.svg'),           category: 'icon' },
    { name: 'LoadingSpinnerIcon', file: 'LoadingSpinnerIcon', Component: svgIcon('LoadingSpinnerIcon.svg'), category: 'icon' },
    { name: 'PencilIcon',         file: 'PencilIcon',         Component: svgIcon('PencilIcon.svg'),         category: 'icon' },
    { name: 'PersonIcon',         file: 'PersonIcon',         Component: svgIcon('PersonIcon.svg'),         category: 'icon' },
    { name: 'PlayArrow',          file: 'PlayArrow',          Component: svgIcon('PlayArrow.svg'),          category: 'icon' },
    { name: 'SearchIcon',         file: 'SearchIcon',         Component: svgIcon('SearchIcon.svg'),         category: 'icon' },
    { name: 'TwitterIcon',        file: 'TwitterIcon',        Component: svgIcon('TwitterIcon.svg'),        category: 'icon' },
    { name: 'YouTubeIcon',        file: 'YouTubeIcon',        Component: svgIcon('YouTubeIcon.svg'),        category: 'icon' },
    { name: 'BupaLogo',           file: 'BupaLogo',           Component: BupaLogo,                          category: 'logo' },
    { name: 'BupaAgedCareLogo',   file: 'BupaAgedCareLogo',   Component: BupaAgedCareLogo,                  category: 'logo' },
    { name: 'PulseLogo',          file: 'PulseLogo',          Component: PulseLogo,                         category: 'logo' },
]

export const productIcons = icons.filter(icon => icon.category === 'icon')
export const logos = icons.filter(icon => icon.category === 'logo')

export const importSnippet = (icon: IconEntry): string =>
    icon.defaultExport
        ? `import ${icon.name} from 'components/atoms/icons/${icon.file}'`
        : `import { ${icon.name} } from 'components/atoms/icons/${icon.file}'`
