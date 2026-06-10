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
    everydayMoments: [
        photo('p25_photo_everyday_moments_936_660x466.jpg', 'Everyday moments'),
        photo('p25_photo_everyday_moments_938_661x466.jpg', 'Everyday moments'),
        photo('p25_photo_everyday_moments_940_661x466.jpg', 'Everyday moments'),
        photo('p25_photo_everyday_moments_942_661x467.jpg', 'Everyday moments'),
    ],
    deliveringCare: [
        photo('p26_photo_delivering_care_958_660x466.jpg', 'Bupa delivering care'),
        photo('p26_photo_delivering_care_960_661x466.jpg', 'Bupa delivering care'),
        photo('p26_photo_delivering_care_962_661x466.jpg', 'Bupa delivering care'),
        photo('p26_photo_delivering_care_964_660x465.jpg', 'Bupa delivering care'),
    ],
    portraits: [
        photo('p27_photo_portraits_979_661x466.jpg', 'Portrait'),
        photo('p27_photo_portraits_981_661x463.jpg', 'Portrait'),
        photo('p27_photo_portraits_983_661x463.jpg', 'Portrait'),
        photo('p27_photo_portraits_985_660x466.jpg', 'Portrait'),
    ],
    stillLife: [
        photo('p28_photo_still_life_1000_661x466.jpg', 'Everyday still-life'),
        photo('p28_photo_still_life_1002_661x466.jpg', 'Everyday still-life'),
        photo('p28_photo_still_life_1004_661x466.jpg', 'Everyday still-life'),
        photo('p28_photo_still_life_1006_660x467.jpg', 'Everyday still-life'),
    ],
    touchOfBlue: [
        photo('p31_photo_touch_of_blue_1075_453x313.jpg', 'Image with a touch of blue'),
        photo('p31_photo_touch_of_blue_1076_455x317.jpg', 'Image with a touch of blue'),
        photo('p31_photo_touch_of_blue_1078_456x316.jpg', 'Image with a touch of blue'),
        photo('p31_photo_touch_of_blue_1080_455x318.jpg', 'Image with a touch of blue'),
        photo('p31_photo_touch_of_blue_1082_456x315.jpg', 'Image with a touch of blue'),
        photo('p31_photo_touch_of_blue_1084_455x317.jpg', 'Image with a touch of blue'),
    ],
    colourAdjust: [
        photo('p32_photo_colour_adjust_1099_429x287.jpg', 'Adjusting an image — a touch of blue'),
        photo('p32_photo_colour_adjust_1101_429x287.jpg', 'Adjusting an image — a touch of blue'),
        photo('p32_photo_colour_adjust_1103_429x288.jpg', 'Adjusting an image — a touch of blue'),
        photo('p32_photo_colour_adjust_1105_429x288.jpg', 'Adjusting an image — a touch of blue'),
        photo('p32_photo_colour_adjust_1109_429x287.jpg', 'Adjusting an image — a touch of blue'),
        photo('p32_photo_colour_adjust_1113_429x287.jpg', 'Adjusting an image — a touch of blue'),
    ],
    choosingWiselyGood: photo('p30_photo_choosing_wisely_1048_478x319.jpg', 'A genuine, observational moment'),
    choosingWiselyBad: photo('p30_photo_choosing_wisely_1047_478x319.jpg', 'A staged image lacking authenticity'),
    homepageHeader: photo('p33_photo_homepage_header_1133_497x345.jpg', 'Homepage header photo with top-right focal point'),
    homepageHeaderCrops: [
        photo('p33_photo_homepage_header_1129_497x345.jpg', 'Homepage/header photo — responsive crop'),
        photo('p33_photo_homepage_header_1131_373x255.jpg', 'Homepage/header photo — narrow responsive crop'),
        photo('p33_photo_homepage_header_1135_497x345.jpg', 'Homepage/header photo — responsive crop'),
        photo('p33_photo_homepage_header_1137_497x345.jpg', 'Homepage/header photo — responsive crop'),
    ],
    colourExample: photo('p12_colour_examples_494_698x466.jpg', 'Colour used to organise information'),
    usingColour: photo('p17_using_colour_612_1086x724.jpg', 'Using colour across applications'),
    messageBox: photo('p18_message_boxes_667_416x278.jpg', 'Message box over a photograph'),
    typography: [
        photo('p19_typography_examples_715_960x640.jpg', 'Typographic hierarchy'),
        photo('p21_typography_examples_826_1018x678.jpg', 'Short headline over imagery'),
    ],
    buttons: photo('p59_page59_1850_1024x683.png', 'Buttons in context'),

    // 2023 brand-asset photography — real photos supplied with guidelines
    everydayMomentsGallery: [
        photo('assets/everyday-moments/everyday-moments-01.jpg', 'Everyday moment — authentic people living everyday lives'),
        photo('assets/everyday-moments/everyday-moments-02.jpg', 'Everyday moment — real, natural expressions'),
        photo('assets/everyday-moments/everyday-moments-03.jpg', 'Everyday moment — unscripted and observational'),
        photo('assets/everyday-moments/everyday-moments-04.jpg', 'Everyday moment — warm and inviting'),
    ],
    deliveringCareGallery: [
        photo('assets/delivering-care/delivering-care-01.jpg', 'Bupa delivering care — health and care services'),
        photo('assets/delivering-care/delivering-care-02.jpg', 'Bupa delivering care — with customers and colleagues'),
        photo('assets/delivering-care/delivering-care-03.jpg', 'Bupa delivering care — tight crop emphasising people'),
        photo('assets/delivering-care/delivering-care-04.jpg', 'Bupa delivering care — community focus'),
    ],
    portraitsGallery: [
        photo('assets/portraits/portrait-01.jpg', 'Portrait — in the moment, relaxed expression'),
        photo('assets/portraits/portrait-02.jpg', 'Portrait — real environment, natural lighting'),
        photo('assets/portraits/portrait-03.jpg', 'Portrait — looking off camera'),
        photo('assets/portraits/portrait-04.jpg', 'Portrait — authentic and unstaged'),
    ],
    stillLifeGallery: [
        photo('assets/everyday-still-life/still-life-01.jpg', 'Everyday still-life — full of life'),
        photo('assets/everyday-still-life/still-life-02.jpg', 'Everyday still-life — imperfect moments'),
        photo('assets/everyday-still-life/still-life-03.jpg', 'Everyday still-life — touches of personality'),
        photo('assets/everyday-still-life/still-life-04.jpg', 'Everyday still-life — irreverent detail'),
    ],
    touchOfBlueBefore: [
        photo('documentation/adding-a-touch-of-blue/touch-of-blue-01.jpg', 'Before — image with no touch of blue'),
        photo('documentation/adding-a-touch-of-blue/touch-of-blue-02.jpg', 'Before — image with no touch of blue'),
        photo('documentation/adding-a-touch-of-blue/touch-of-blue-03.jpg', 'Before — image with no touch of blue'),
    ],
    touchOfBlueAfter: [
        photo('documentation/adding-a-touch-of-blue/touch-of-blue-04.jpg', 'After — touch of blue added, colour balanced and sharpened'),
        photo('documentation/adding-a-touch-of-blue/touch-of-blue-05.jpg', 'After — touch of blue added, colour balanced and sharpened'),
        photo('documentation/adding-a-touch-of-blue/touch-of-blue-06.jpg', 'After — touch of blue added, colour balanced and sharpened'),
    ],
    rejected: [
        photo('documentation/okay-isnt-good-enough/reject-01.jpg', 'Rejected — cheesy, staged imagery'),
        photo('documentation/okay-isnt-good-enough/reject-02.jpg', 'Rejected — fake smiles, unnatural poses'),
        photo('documentation/okay-isnt-good-enough/reject-03.jpg', 'Rejected — golden sunset, perfect models'),
        photo('documentation/okay-isnt-good-enough/reject-04.jpg', 'Rejected — overly perfect and staged'),
    ],
    retouching: [
        photo('documentation/retouching-photography/retouch-01.jpg', 'Original image before retouching'),
        photo('documentation/retouching-photography/retouch-02.jpg', 'Step 1 — Sharpen image, tighten crop'),
        photo('documentation/retouching-photography/retouch-03.jpg', 'Step 2 — Adjust Levels to balance colours'),
        photo('documentation/retouching-photography/retouch-04.jpg', 'Step 3 — Adjust Brightness/Contrast to lighten faces'),
        photo('documentation/retouching-photography/retouch-05.jpg', 'Step 4 — Add a touch of blue'),
        photo('documentation/retouching-photography/retouch-06.jpg', 'Final — retouched image'),
    ],
    choosingWiselyBadGallery: [
        photo('documentation/choosing-wisely/choosing-wisely-01.jpg', 'Staged image — lacks genuine emotion, golden sunset feels unnatural'),
        photo('documentation/choosing-wisely/choosing-wisely-03.jpg', 'Clothing feels unreal, strong forward lighting lacks authenticity'),
        photo('documentation/choosing-wisely/choosing-wisely-05.jpg', 'Swimming with dry hair and make-up — lacks authenticity'),
        photo('documentation/choosing-wisely/choosing-wisely-07.jpg', 'Does not feel like a genuine moment in time'),
        photo('documentation/choosing-wisely/choosing-wisely-09.jpg', 'Staged and unnatural'),
        photo('documentation/choosing-wisely/choosing-wisely-11.jpg', 'Lacks authenticity and real emotion'),
    ],
    choosingWiselyGoodGallery: [
        photo('documentation/choosing-wisely/choosing-wisely-02.jpg', 'Genuine moment — authentic, natural lighting and imperfect detail'),
        photo('documentation/choosing-wisely/choosing-wisely-04.jpg', 'Observational — blurred foreground gives authentic feel'),
        photo('documentation/choosing-wisely/choosing-wisely-06.jpg', 'Authentic — shallow depth of field creates an observational feel'),
        photo('documentation/choosing-wisely/choosing-wisely-08.jpg', 'Real and warm, in the moment'),
        photo('documentation/choosing-wisely/choosing-wisely-10.jpg', 'Genuine and naturally inviting'),
        photo('documentation/choosing-wisely/choosing-wisely-12.jpg', 'Natural, observational and real'),
    ],
    inSitu: [
        photo('documentation/in-situ/in-situ-01.jpg', 'Image focal area — focal point top-right'),
        photo('documentation/in-situ/in-situ-02.jpg', 'Desktop responsive view — text over image'),
        photo('documentation/in-situ/in-situ-03.jpg', 'Mobile responsive view — image scales down gracefully'),
        photo('documentation/in-situ/in-situ-04.jpg', 'Text over image — headline and buttons in low-contrast area'),
        photo('documentation/in-situ/in-situ-05.jpg', 'Text over image — message box over a busy image'),
        photo('documentation/in-situ/in-situ-06.jpg', 'Text over image — additional example'),
    ],
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

/* ---- Bupa icon set (public/brand-assets/bupa-icons) --------------------- */

const bupaIconNames = [
    'Air-conditioning', 'Allergology', 'Anaesthesiology', 'Appointments',
    'Approval', 'Assistance', 'Authorisations', 'Bag', 'Bicycle', 'Bin',
    'Box', 'Brochure', 'Cafe', 'Calculator', 'Calendar', 'Call-back',
    'Camera', 'Caminar', 'Car', 'Card', 'Cardiology', 'Childcare', 'Clip',
    'Copayment', 'Cosmetic-surgery', 'Cursor', 'Dentistry', 'Diagnostic-x-rays',
    'Digestive-system', 'Documentation', 'ENT', 'Emergencies',
    'Endocrinology-and-nutrition', 'Factura', 'First-aid-kit', 'Folder',
    'General-medicine', 'General-surgery', 'Haematology', 'Hairdressers',
    'Handicapped', 'Heart', 'Height', 'Home', 'Hospital', 'Hourglass',
    'Image', 'Internal-medicine', 'Library', 'Location', 'Log', 'Map-view',
    'Medical-report', 'Menu', 'Mic-on', 'Mobile', 'Mundo', 'Nephrology',
    'Neurology', 'Neurosurgery', 'Obstetrics-and-gynaecology', 'Offspring',
    'Ophthalmology', 'Paediatrics', 'Parking', 'Pdf', 'Pencil', 'People',
    'Phone', 'Plane', 'Pneumology', 'Podiatry', 'Postcard', 'Prize',
    'Psychology', 'Records', 'Rehabilitation', 'Reimbursements', 'Report',
    'Rheumatology', 'Run', 'Search', 'Share', 'Speak', 'Speech-therapy',
    'Star', 'Tag', 'Test', 'Tienda', 'Traumatology', 'Two-people',
    'Video-call', 'Wifi',
]

export interface BupaIconItem {
    name: string
    src: string
}

export const bupaIcons: BupaIconItem[] = bupaIconNames.map(slug => ({
    name: slug.replace(/-/g, ' '),
    src: `/brand-assets/bupa-icons/${slug}.png`,
}))

export const BupaIconGrid = ({ items = bupaIcons }: { items?: BupaIconItem[] }) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map(icon => (
            <div
                key={icon.name}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey hover:border-cyan dark:hover:border-cyan transition-colors"
            >
                <img
                    src={icon.src}
                    alt={icon.name}
                    loading="lazy"
                    className="w-10 h-10 object-contain"
                />
                <span className="text-caption text-center text-grey dark:text-light-grey leading-tight">
                    {icon.name}
                </span>
            </div>
        ))}
    </div>
)

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
