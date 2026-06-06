/*
    Registry of every SVG icon in `components/atoms/icons`, used to generate the
    Iconography and Logo foundation pages. Each entry records the component, the
    exported name and the import path so the docs can show a copyable import.
*/
import { ComponentType } from 'react'

import { ArrowLeft } from '../components/atoms/icons/ArrowLeft'
import { ArrowRight } from '../components/atoms/icons/ArrowRight'
import { ArrowUp } from '../components/atoms/icons/ArrowUp'
import { BupaAgedCareLogo } from '../components/atoms/icons/BupaAgedCareLogo'
import { BurgerIcon } from '../components/atoms/icons/BurgerIcon'
import { CallBackIcon } from '../components/atoms/icons/CallBackIcon'
import { CallNowIcon } from '../components/atoms/icons/CallNowIcon'
import { CheckCircleIcon } from '../components/atoms/icons/CheckCircle'
import { ChevronDownIcon } from '../components/atoms/icons/ChevronDownIcon'
import { ChevronRightIcon } from '../components/atoms/icons/ChevronRightIcon'
import { ClipboardIcon } from '../components/atoms/icons/Clipboard'
import { CloseIcon } from '../components/atoms/icons/CloseIcon'
import { FacebookIcon } from '../components/atoms/icons/FacebookIcon'
import HomeIcon from '../components/atoms/icons/HomeIcon'
import { ImageGalleryIcon } from '../components/atoms/icons/ImageGalleryIcon'
import { ImagePlaceholderIcon } from '../components/atoms/icons/ImagePlaceholderIcon'
import { InstagramIcon } from '../components/atoms/icons/InstagramIcon'
import { LinkedInIcon } from '../components/atoms/icons/LinkedInIcon'
import { ListIcon } from '../components/atoms/icons/ListIcon'
import { LoadingSpinnerIcon } from '../components/atoms/icons/LoadingSpinnerIcon'
import { PencilIcon } from '../components/atoms/icons/PencilIcon'
import { PersonIcon } from '../components/atoms/icons/PersonIcon'
import { PlayArrow } from '../components/atoms/icons/PlayArrow'
import { SearchEmpty } from '../components/atoms/icons/SearchEmpty'
import { SearchIcon } from '../components/atoms/icons/SearchIcon'
import { SquareBupaLogo } from '../components/atoms/icons/SquareBupaLogo'
import { TwitterIcon } from '../components/atoms/icons/TwitterIcon'
import { YouTubeIcon } from '../components/atoms/icons/YouTubeIcon'

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

export const icons: IconEntry[] = [
    { name: 'ArrowLeft', file: 'ArrowLeft', Component: ArrowLeft, category: 'icon' },
    { name: 'ArrowRight', file: 'ArrowRight', Component: ArrowRight, category: 'icon' },
    { name: 'ArrowUp', file: 'ArrowUp', Component: ArrowUp, category: 'icon' },
    { name: 'BurgerIcon', file: 'BurgerIcon', Component: BurgerIcon, category: 'icon' },
    { name: 'CallBackIcon', file: 'CallBackIcon', Component: CallBackIcon, category: 'icon' },
    { name: 'CallNowIcon', file: 'CallNowIcon', Component: CallNowIcon, category: 'icon' },
    { name: 'CheckCircleIcon', file: 'CheckCircle', Component: CheckCircleIcon, category: 'icon' },
    { name: 'ChevronDownIcon', file: 'ChevronDownIcon', Component: ChevronDownIcon, category: 'icon' },
    { name: 'ChevronRightIcon', file: 'ChevronRightIcon', Component: ChevronRightIcon, category: 'icon' },
    { name: 'ClipboardIcon', file: 'Clipboard', Component: ClipboardIcon, category: 'icon' },
    { name: 'CloseIcon', file: 'CloseIcon', Component: CloseIcon, category: 'icon' },
    { name: 'FacebookIcon', file: 'FacebookIcon', Component: FacebookIcon, category: 'icon' },
    { name: 'HomeIcon', file: 'HomeIcon', Component: HomeIcon, category: 'icon', defaultExport: true },
    { name: 'ImageGalleryIcon', file: 'ImageGalleryIcon', Component: ImageGalleryIcon, category: 'icon' },
    { name: 'ImagePlaceholderIcon', file: 'ImagePlaceholderIcon', Component: ImagePlaceholderIcon, category: 'icon' },
    { name: 'InstagramIcon', file: 'InstagramIcon', Component: InstagramIcon, category: 'icon' },
    { name: 'LinkedInIcon', file: 'LinkedInIcon', Component: LinkedInIcon, category: 'icon' },
    { name: 'ListIcon', file: 'ListIcon', Component: ListIcon, category: 'icon' },
    { name: 'LoadingSpinnerIcon', file: 'LoadingSpinnerIcon', Component: LoadingSpinnerIcon, category: 'icon' },
    { name: 'PencilIcon', file: 'PencilIcon', Component: PencilIcon, category: 'icon' },
    { name: 'PersonIcon', file: 'PersonIcon', Component: PersonIcon, category: 'icon' },
    { name: 'PlayArrow', file: 'PlayArrow', Component: PlayArrow, category: 'icon' },
    { name: 'SearchEmpty', file: 'SearchEmpty', Component: SearchEmpty, category: 'icon' },
    { name: 'SearchIcon', file: 'SearchIcon', Component: SearchIcon, category: 'icon' },
    { name: 'TwitterIcon', file: 'TwitterIcon', Component: TwitterIcon, category: 'icon' },
    { name: 'YouTubeIcon', file: 'YouTubeIcon', Component: YouTubeIcon, category: 'icon' },
    { name: 'BupaAgedCareLogo', file: 'BupaAgedCareLogo', Component: BupaAgedCareLogo, category: 'logo' },
    { name: 'SquareBupaLogo', file: 'SquareBupaLogo', Component: SquareBupaLogo, category: 'logo' },
]

export const productIcons = icons.filter(icon => icon.category === 'icon')
export const logos = icons.filter(icon => icon.category === 'logo')

export const importSnippet = (icon: IconEntry): string =>
    icon.defaultExport
        ? `import ${icon.name} from 'components/atoms/icons/${icon.file}'`
        : `import { ${icon.name} } from 'components/atoms/icons/${icon.file}'`
