/* eslint-disable @next/next/no-img-element */
/*
    Brand asset catalogue and image helpers for the Bupa Brand Guidelines.

    The real brand assets supplied with the 2023 guidelines live under
    `public/brand-assets`. Plain <img> is used deliberately (rather than
    next/image): these are local, pre-sized documentation images that ship as
    static files, and the lint rule is disabled for this file only so the pages
    that consume these helpers stay clean.
*/
import { ReactNode } from 'react'
import { cx } from '../utils/cx'

// Prefix with the base path when the docs are served under one (the GitHub
// Pages export lives at /bp). Empty for the normal app, where public/ is served
// from the root. Raw <img src> is not auto-prefixed by Next, so we do it here.
const BASE = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/brand-assets`

export interface AssetImage {
    src: string
    alt: string
}

/** Build a numbered sequence like p40_people_01.png … p40_people_08.png. */
const seq = (
    dir: string,
    prefix: string,
    count: number,
    alt: string,
    ext = 'png'
): AssetImage[] =>
    Array.from({ length: count }, (_, index) => {
        const n = String(index + 1).padStart(2, '0')
        return { src: `${BASE}/${dir}/${prefix}_${n}.${ext}`, alt: `${alt} ${index + 1}` }
    })

/* ---- Photography (public/brand-assets/photography) ---------------------- */

const photo = (file: string, alt: string): AssetImage => ({
    src: `${BASE}/photography/${file}`,
    alt,
})

export const photography = {
    designInAction: [
        photo('p06_design_in_action_167_728x486.jpg', 'Design in action — web layout'),
        photo('p07_design_in_action_270_891x594.jpg', 'Design in action — app and print'),
    ],
    everydayMoments: photo('p25_photo_everyday_moments_936_660x466.jpg', 'Everyday moments'),
    deliveringCare: photo('p26_photo_delivering_care_958_660x466.jpg', 'Bupa delivering care'),
    portraits: photo('p27_photo_portraits_979_661x466.jpg', 'Portrait'),
    stillLife: photo('p28_photo_still_life_1000_661x466.jpg', 'Everyday still-life'),
    touchOfBlue: [
        photo('p31_photo_touch_of_blue_1075_453x313.jpg', 'Image with a touch of blue'),
        photo('p31_photo_touch_of_blue_1078_456x316.jpg', 'Image with a touch of blue'),
        photo('p31_photo_touch_of_blue_1082_456x315.jpg', 'Image with a touch of blue'),
    ],
    choosingWiselyGood: photo('p30_photo_choosing_wisely_1048_478x319.jpg', 'A genuine, observational moment'),
    choosingWiselyBad: photo('p30_photo_choosing_wisely_1047_478x319.jpg', 'A staged image lacking authenticity'),
    homepageHeader: photo('p33_photo_homepage_header_1133_497x345.jpg', 'Homepage header photo with top-right focal point'),
    colourExample: photo('p12_colour_examples_494_698x466.jpg', 'Colour used to organise information'),
    usingColour: photo('p17_using_colour_612_1086x724.jpg', 'Using colour across applications'),
    messageBox: photo('p18_message_boxes_667_416x278.jpg', 'Message box over a photograph'),
    typography: [
        photo('p19_typography_examples_715_960x640.jpg', 'Typographic hierarchy'),
        photo('p21_typography_examples_826_1018x678.jpg', 'Short headline over imagery'),
    ],
    buttons: photo('p59_page59_1850_1024x683.png', 'Buttons in context'),
}

/* ---- Illustration & icons (public/brand-assets/white_bg) ---------------- */

export const illustration = {
    people: seq('white_bg/people', 'p40_people', 8, 'Person illustration'),
    objects: seq('white_bg/objects', 'p46_objects', 6, 'Object illustration'),
    scenes: seq('white_bg/scenes', 'p47_scenes', 2, 'Scene illustration'),
    explanatory: seq('white_bg/explanatory', 'p48_explanatory', 2, 'Explanatory illustration'),
    heads: seq('white_bg/people_components', 'p43_people_heads', 21, 'Head component'),
    bodies: seq('white_bg/people_components', 'p44_people_bodies', 14, 'Body component'),
    legs: seq('white_bg/people_components', 'p45_people_legs', 10, 'Legs component'),
}

export const icons = {
    illustrated: seq('white_bg/icons_illustrated', 'p51_icons_illustrated', 8, 'Illustrated icon'),
    navigation: seq('white_bg/icons_navigation', 'p53_icons_navigation', 19, 'Navigation icon'),
}

/* ---- Presentational components ------------------------------------------ */

interface BrandFigureProps {
    image: AssetImage
    caption?: ReactNode
    /** `cover` fills the frame (photography); `contain` fits art on white. */
    fit?: 'cover' | 'contain'
    /** Aspect ratio utility class for the frame. */
    aspect?: string
    className?: string
}

/** A single brand image in a bordered, captioned frame. */
export const BrandFigure = ({
    image,
    caption,
    fit = 'cover',
    aspect = 'aspect-[3/2]',
    className,
}: BrandFigureProps) => (
    <figure
        className={cx(
            'rounded-xl overflow-hidden border border-cool-paper-200 dark:border-charcoal bg-white',
            className
        )}
    >
        <div className={cx('w-full', aspect, fit === 'contain' ? 'p-4' : '')}>
            <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={cx(
                    'w-full h-full',
                    fit === 'cover' ? 'object-cover' : 'object-contain'
                )}
            />
        </div>
        {caption && (
            <figcaption className="px-4 py-2 border-t border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey text-caption text-grey dark:text-light-grey">
                {caption}
            </figcaption>
        )}
    </figure>
)

interface BrandGalleryProps {
    images: AssetImage[]
    fit?: 'cover' | 'contain'
    aspect?: string
    /** Tailwind grid-cols utilities. */
    columns?: string
}

/** A responsive grid of brand images. */
export const BrandGallery = ({
    images,
    fit = 'cover',
    aspect = 'aspect-[3/2]',
    columns = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
}: BrandGalleryProps) => (
    <div className={cx('grid gap-3', columns)}>
        {images.map(image => (
            <div
                key={image.src}
                className={cx(
                    'rounded-lg overflow-hidden border border-cool-paper-200 dark:border-charcoal bg-white',
                    aspect,
                    fit === 'contain' ? 'p-3' : ''
                )}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className={cx(
                        'w-full h-full',
                        fit === 'cover' ? 'object-cover' : 'object-contain'
                    )}
                />
            </div>
        ))}
    </div>
)
