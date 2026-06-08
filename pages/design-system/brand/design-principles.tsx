import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../../styleguide-components/primitives'
import { BlueSquare } from '../../../styleguide-components/brandPalette'
import { photography, BrandGallery } from '../../../styleguide-components/brandAssets'

const toc = [
    { id: 'principles', title: 'Our design principles' },
    { id: 'in-action', title: 'Design in action' },
]

interface Principle {
    title: string
    lead: string
    points: string[]
}

const principles: Principle[] = [
    {
        title: 'Start with a square',
        lead: 'The square makes us distinct. We use it with confidence in everything we do.',
        points: [
            'Message boxes are square',
            'Squares frame our images, can form part of our illustrations and help in templates and layouts',
        ],
    },
    {
        title: 'Blue is the glue',
        lead: 'We use blue consistently. It’s a simple way to visually connect our communications.',
        points: [
            'Message boxes are blue; we use touches of blue in our imagery',
            'We use blue in our type, illustrations and backgrounds',
            'Other colours should never overpower our blue',
        ],
    },
    {
        title: 'Less is more',
        lead: 'We make things easy for our audiences. Our communications should be single-minded and use as few words and graphic elements as possible.',
        points: [
            'Fewer, bigger, better',
            'Provide only the most useful, helpful information',
            'A clear message linked to one core visual, short headlines, no unnecessary copy or design elements',
            'Streamlining functionality simplifies navigation and helps user experience',
            'Air to breathe is critical',
        ],
    },
    {
        title: 'Keep it real',
        lead: 'We show we care by being authentic, warm, engaging and relatable. We invite people into our communications — we’re not cold or overly clinical.',
        points: [
            'We use an unscripted and unstaged style of imagery and relatable illustration topics',
            'We can be light-hearted when the time is right',
            'Photography is our first choice over illustration',
            'Images are cropped tightly to be personal and intimate',
        ],
    },
]

const inAction = [
    'Primary colours make relevant information easier to find — familiarity appeals to users.',
    'The blue square is incorporated into message boxes and illustrations.',
    'Illustration uses the primary palette supported by secondary colours.',
    'The secondary palette creates content hierarchy; Bupa Warm Grey is used as a background.',
    'Photography is authentic and tightly cropped, always with a touch of blue.',
    'Secondary colours highlight calls to action and create standout.',
]

const PrincipleCard = ({ principle }: { principle: Principle }) => (
    <div className="rounded-2xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey">
        <div className="flex items-start gap-4">
            <BlueSquare className="w-10 h-10 flex-none rounded-sm" />
            <div>
                <h3 className="text-heading-s font-semibold text-navy dark:text-white">
                    {principle.title}
                </h3>
                <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                    {principle.lead}
                </p>
            </div>
        </div>
        <ul className="mt-4 space-y-2 border-t border-cool-paper-200 dark:border-charcoal pt-4">
            {principle.points.map(point => (
                <li
                    key={point}
                    className="flex gap-2 text-body-small text-grey dark:text-light-grey"
                >
                    <span aria-hidden="true" className="text-cyan flex-none">
                        —
                    </span>
                    <span>{point}</span>
                </li>
            ))}
        </ul>
    </div>
)

const DesignPrinciples: NextPageWithLayout = () => (
    <DesignSystemLayout title="Design principles" toc={toc}>
        <PageHeader
            eyebrow="Brand guidelines"
            title="Design principles"
            status="stable"
            intro="Four principles guide how we design for Bupa. They keep our communications distinct, connected, simple and human."
        />

        <Section id="principles" title="Our design principles">
            <div className="grid gap-5 lg:grid-cols-2">
                {principles.map(principle => (
                    <PrincipleCard key={principle.title} principle={principle} />
                ))}
            </div>
        </Section>

        <Section id="in-action" title="Design in action">
            <p className="text-grey dark:text-light-grey">
                Across web, app, print and out-of-home, the principles combine: blue
                holds everything together, the square frames and structures, and a
                single clear message does the heavy lifting.
            </p>
            <div className="mt-6">
                <BrandGallery
                    images={photography.designInAction}
                    columns="grid-cols-1 sm:grid-cols-2"
                />
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {inAction.map(note => (
                    <li
                        key={note}
                        className="flex gap-3 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-4 py-3 text-body-small text-grey dark:text-light-grey"
                    >
                        <BlueSquare className="w-5 h-5 flex-none rounded-sm" />
                        <span>{note}</span>
                    </li>
                ))}
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default DesignPrinciples
