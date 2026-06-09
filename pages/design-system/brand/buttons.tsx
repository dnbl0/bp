import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    BrandHero,
    Section,
    Subsection,
    Specifications,
    SpecGroup,
} from '../../../styleguide-components/primitives'
import { photography, BrandFigure } from '../../../styleguide-components/brandAssets'

const toc = [
    { id: 'types', title: 'Button types' },
    { id: 'specs', title: 'Button design' },
    { id: 'hierarchy', title: 'Hierarchy & placement' },
]

const specGroups: SpecGroup[] = [
    {
        title: 'Button design',
        dimensions: [
            { label: 'Button height', value: '52px', type: 'height' },
            { label: 'Touch target (min)', value: '48px', type: 'height' },
            { label: 'Corner radius', value: '4px', type: 'border-radius' },
            { label: 'Label', value: '18pt Montserrat SemiBold', type: 'font-size' },
            { label: 'Icon size', value: '12px', type: 'width' },
            { label: 'Text–icon gap', value: '14px', type: 'gap' },
            { label: 'Horizontal padding (min)', value: '14px', type: 'padding', direction: 'left' },
        ],
    },
]

const Buttons: NextPageWithLayout = () => (
    <DesignSystemLayout title="Buttons" toc={toc}>
        <BrandHero
            eyebrow="Design toolkit"
            title="Buttons"
            intro="Buttons influence user decisions, so make them simple and clear, and let them stand out against surrounding elements."
        />

        <Section id="types" title="Button types">
            <Subsection title="Primary buttons">
                <p className="text-body-small text-grey dark:text-light-grey">
                    Solid colour with white text and a white icon. Primary CTA colours
                    are Bupa Blue, Navy or white; conversion buttons are Orange or
                    Fuchsia.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                    <button className="button bg-cyan text-white">Find out more</button>
                    <button className="button bg-navy text-white">Learn more</button>
                    <button className="button bg-orange text-white">Apply now</button>
                    <button className="button bg-fuchsia text-white">Get a quote</button>
                </div>
            </Subsection>
            <Subsection title="Secondary buttons">
                <p className="text-body-small text-grey dark:text-light-grey">
                    A keyline with a white or transparent background; text and icon in
                    the same colour as the keyline.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                    <button className="button border-2 border-cyan text-cyan bg-transparent">
                        Find out more
                    </button>
                    <button className="button border-2 border-navy text-navy bg-transparent">
                        View offer
                    </button>
                </div>
            </Subsection>
            <Subsection title="Tertiary buttons">
                <p className="text-body-small text-grey dark:text-light-grey">
                    For less important links or CTAs, use text without a button shape.
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                    <a className="font-semibold text-cyan hover:underline">Read more →</a>
                    <a className="font-semibold text-cyan hover:underline">View our services →</a>
                </div>
            </Subsection>
        </Section>

        <Section id="specs" title="Button design">
            <p className="text-grey dark:text-light-grey">
                Buttons must be HTML elements, not images, with enough space around them
                to tap comfortably with one finger. Text and icon are centre-aligned;
                button width can be adjusted so pairs of buttons share an equal width.
            </p>
            <Specifications groups={specGroups} variant="Primary">
                <button className="button bg-cyan text-white">Find out more</button>
            </Specifications>
        </Section>

        <Section id="hierarchy" title="Hierarchy & placement">
            <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Keep the choice simple — ideally just one CTA button. If you use two, make one primary.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Make button text short and descriptive, clear when read out of context (e.g. “Get a quote”).</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Place buttons as close to the top of the page as possible — primary buttons should sit above the fold.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>If a button is over a photo, place it on an area that isn’t too busy.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Use the active/rest status palette to indicate interaction, with a 0.2-second animation.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Don’t use elements that look like buttons but have no link or interaction.</span>
                </li>
            </ul>
            <div className="mt-6 sm:max-w-xl">
                <BrandFigure
                    image={photography.buttons}
                    caption="Buttons in context — a single, clear primary action placed high on the page."
                />
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Buttons
