import Link from 'next/link'
import { ReactNode } from 'react'
import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import { hrefFor } from '../../../../styleguide-components/designSystem.config'
import { InfoCard, cardIcons } from '../../../../styleguide-components/primitives'

/* ---- Inline pillar icons (self-contained, inherit currentColor) ---------- */

const iconProps = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
}

const BookIcon = () => (
    <svg {...iconProps}>
        <path d="M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5z" />
        <path d="M4 19a2 2 0 012-2h12" />
    </svg>
)
const ShieldIcon = () => (
    <svg {...iconProps}>
        <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
)
const ContrastIcon = () => (
    <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 010 18V3z" fill="currentColor" stroke="none" />
    </svg>
)
const TypeIcon = () => (
    <svg {...iconProps}>
        <path d="M4 7V5h16v2M9 19h6M12 5v14" />
    </svg>
)
const ImageIcon = () => (
    <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="M21 15l-5-5-7 7" />
    </svg>
)
const StructureIcon = () => (
    <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="5" rx="1" />
        <rect x="3" y="11" width="10" height="10" rx="1" />
        <path d="M16 11h5M16 15h5M16 19h5" />
    </svg>
)
const KeyboardIcon = () => (
    <svg {...iconProps}>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
    </svg>
)
const PointerIcon = () => (
    <svg {...iconProps}>
        <path d="M5 3l6 16 2-6 6-2L5 3z" />
    </svg>
)
const MotionIcon = () => (
    <svg {...iconProps}>
        <path d="M3 8c3-3 6 3 9 0s6 3 9 0M3 16c3-3 6 3 9 0s6 3 9 0" />
    </svg>
)
const FormIcon = () => (
    <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="5" rx="1.5" />
        <rect x="3" y="14" width="12" height="5" rx="1.5" />
        <path d="M19 16.5l1.5 1.5 2.5-3" transform="translate(-4 -1)" />
    </svg>
)
const PenIcon = () => (
    <svg {...iconProps}>
        <path d="M4 20h4l10-10-4-4L4 16v4z" />
        <path d="M13.5 6.5l4 4" />
    </svg>
)
const SpeakerIcon = () => (
    <svg {...iconProps}>
        <path d="M4 9v6h4l5 4V5L8 9H4z" />
        <path d="M16 9a4 4 0 010 6M18.5 7a7 7 0 010 10" />
    </svg>
)
const ChecklistIcon = () => (
    <svg {...iconProps}>
        <path d="M9 5h11M9 12h11M9 19h11" />
        <path d="M3 5l1.5 1.5L7 4M3 12l1.5 1.5L7 11M3 19l1.5 1.5L7 18" />
    </svg>
)

/* -------------------------------------------------------------------------- */

interface Pillar {
    title: string
    slug: string
    description: string
    icon: ReactNode
}

interface PillarGroup {
    band: string
    blurb: string
    pillars: Pillar[]
}

/**
 * The guideline pages, grouped by the four WCAG POUR principles plus a
 * Foundations band and a Process band. This is the same shape WCAG itself uses,
 * so the grid doubles as a teaching tool for the underlying standard.
 */
const groups: PillarGroup[] = [
    {
        band: 'Foundations',
        blurb: 'Start here — the model we design to and what conformance means.',
        pillars: [
            {
                title: 'Principles',
                slug: 'foundations/accessibility/principles',
                description:
                    'The POUR model — perceivable, operable, understandable, robust — and our WCAG 2.2 AA target.',
                icon: <BookIcon />,
            },
            {
                title: 'Conformance & statement',
                slug: 'foundations/accessibility/conformance',
                description:
                    'What AA conformance means, the standard we hold to, and how we track known issues openly.',
                icon: <ShieldIcon />,
            },
        ],
    },
    {
        band: 'Perceivable',
        blurb: 'Information must be presentable in ways everyone can perceive.',
        pillars: [
            {
                title: 'Color & contrast',
                slug: 'foundations/accessibility/contrast',
                description:
                    'Text and non-text contrast ratios, and never using colour alone to carry meaning.',
                icon: <ContrastIcon />,
            },
            {
                title: 'Typography & low vision',
                slug: 'foundations/accessibility/typography',
                description:
                    'Resize text to 200%, reflow to a narrow viewport, honour spacing overrides and zoom.',
                icon: <TypeIcon />,
            },
            {
                title: 'Images & media',
                slug: 'foundations/accessibility/images',
                description:
                    'Alt text, decorative images, icon labels, captions and transcripts for media.',
                icon: <ImageIcon />,
            },
        ],
    },
    {
        band: 'Operable',
        blurb: 'Interface and navigation must be operable by any input.',
        pillars: [
            {
                title: 'Structure & semantics',
                slug: 'foundations/accessibility/structure',
                description:
                    'Headings, landmarks, skip links, page titles and a logical reading order.',
                icon: <StructureIcon />,
            },
            {
                title: 'Keyboard & focus',
                slug: 'foundations/accessibility/keyboard',
                description:
                    'Full keyboard operation, a visible focus ring, logical order and focus management.',
                icon: <KeyboardIcon />,
            },
            {
                title: 'Pointer, touch & targets',
                slug: 'foundations/accessibility/pointer',
                description:
                    'Adequate target sizes, gesture and drag alternatives, and pointer cancellation.',
                icon: <PointerIcon />,
            },
            {
                title: 'Motion & animation',
                slug: 'foundations/accessibility/motion',
                description:
                    'Reduced-motion support, pause / stop / hide controls and flash safety.',
                icon: <MotionIcon />,
            },
        ],
    },
    {
        band: 'Understandable',
        blurb: 'Content and operation must be understandable.',
        pillars: [
            {
                title: 'Forms & validation',
                slug: 'foundations/accessibility/forms',
                description:
                    'Labels, error identification and suggestion, autocomplete and accessible authentication.',
                icon: <FormIcon />,
            },
            {
                title: 'Content & writing',
                slug: 'foundations/accessibility/content',
                description:
                    'Plain language, reading level, inclusive language, link text and consistent help.',
                icon: <PenIcon />,
            },
        ],
    },
    {
        band: 'Robust',
        blurb: 'Content must work reliably with assistive technology.',
        pillars: [
            {
                title: 'Screen readers & ARIA',
                slug: 'foundations/accessibility/assistive-technology',
                description:
                    'How assistive tech reads a page, accessible names, the five rules of ARIA and live regions.',
                icon: <SpeakerIcon />,
            },
        ],
    },
    {
        band: 'Process',
        blurb: 'How we verify the work meets the bar.',
        pillars: [
            {
                title: 'Testing & tools',
                slug: 'foundations/accessibility/testing',
                description:
                    'Automated tooling, manual screen-reader and keyboard testing, and a runnable checklist.',
                icon: <ChecklistIcon />,
            },
        ],
    },
]

const principles = [
    {
        title: 'Perceivable',
        icon: 'perceivable',
        body: 'Content meets AA contrast, has text alternatives, and never relies on colour or sound alone to convey meaning.',
    },
    {
        title: 'Operable',
        icon: 'operable',
        body: 'Everything works with a keyboard and touch, with a visible focus indicator and enough time to act.',
    },
    {
        title: 'Understandable',
        icon: 'understandable',
        body: 'Labels, errors and instructions are clear, written in plain language and announced to assistive tech.',
    },
    {
        title: 'Robust',
        icon: 'robust',
        body: 'Semantic HTML comes first; ARIA only fills genuine gaps so a wide range of assistive tech can interpret the UI.',
    },
]

const AccessibilityHome: NextPageWithLayout = () => (
    <DesignSystemLayout title="Accessibility" wide>
        {/* Hero */}
        <section className="py-2 sm:py-6">
            <p className="bds-eyebrow text-cyan">Foundations</p>
            <h1 className="mt-3 max-w-3xl text-[2.25rem] sm:text-[3rem] leading-[1.08] tracking-[-0.02em] font-bold text-navy dark:text-white">
                Accessibility
            </h1>
            <p className="mt-5 max-w-2xl bds-lead text-grey dark:text-light-grey">
                Accessibility is a default, not a feature. We build the Bupa Aged
                Care experience to{' '}
                <strong className="text-navy dark:text-white">WCAG 2.2 AA</strong>{' '}
                so people of every ability can find, understand and use it. These
                guidelines collect the shared rules every component and page is
                expected to follow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
                <Link href={hrefFor('foundations/accessibility/principles')}>
                    <a className="button">Start with the principles</a>
                </Link>
                <Link href={hrefFor('foundations/accessibility/testing')}>
                    <a className="button button--secondary">How we test</a>
                </Link>
            </div>
        </section>

        {/* Pillar grid, grouped by POUR */}
        {groups.map(group => (
            <section key={group.band} className="mt-12 first:mt-14">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="bds-h2 text-navy dark:text-white">{group.band}</h2>
                    <p className="text-body-small text-grey dark:text-light-grey">
                        {group.blurb}
                    </p>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.pillars.map(pillar => (
                        <InfoCard
                            key={pillar.slug}
                            href={hrefFor(pillar.slug)}
                            icon={pillar.icon}
                            title={pillar.title}
                            description={pillar.description}
                        />
                    ))}
                </div>
            </section>
        ))}

        {/* POUR principles callout */}
        <section className="mt-16 mb-4 rounded-2xl border border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey p-6 sm:p-8">
            <h2 className="bds-h2 text-navy dark:text-white">The POUR principles</h2>
            <p className="mt-2 max-w-2xl text-body-small text-grey dark:text-light-grey">
                Every WCAG success criterion sits under one of four ideas. They are
                the spine of these guidelines and a useful lens when reviewing any
                screen.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {principles.map(principle => (
                    <InfoCard
                        key={principle.title}
                        icon={cardIcons[principle.icon]}
                        title={principle.title}
                        description={principle.body}
                    />
                ))}
            </div>
        </section>
    </DesignSystemLayout>
)

export default AccessibilityHome
