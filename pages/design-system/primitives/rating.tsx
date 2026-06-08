import { useState } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'display', title: 'Display' },
    { id: 'interactive', title: 'Interactive' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Star = ({ fill }: { fill: 'full' | 'half' | 'none' }) => {
    const id = `star-${fill}`
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-cyan"
            aria-hidden="true"
            focusable="false"
        >
            {fill === 'half' && (
                <defs>
                    <linearGradient id={id}>
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            )}
            <path
                d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.8l1.2-6.6L2.5 9.6l6.6-.9L12 2z"
                fill={
                    fill === 'full'
                        ? 'currentColor'
                        : fill === 'half'
                          ? `url(#${id})`
                          : 'none'
                }
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    )
}

const StarRatingDisplay = ({ value, max = 5 }: { value: number; max?: number }) => (
    <div
        className="flex items-center gap-2"
        role="img"
        aria-label={`Rated ${value} out of ${max}`}
    >
        <div className="flex">
            {Array.from({ length: max }, (_, i) => {
                const fill: 'full' | 'half' | 'none' =
                    value >= i + 1 ? 'full' : value >= i + 0.5 ? 'half' : 'none'
                return <Star key={i} fill={fill} />
            })}
        </div>
        <span className="text-body-small text-grey dark:text-light-grey">
            {value} of {max}
        </span>
    </div>
)

const InteractiveRating = () => {
    const [value, setValue] = useState(0)
    const [hover, setHover] = useState(0)
    const max = 5
    const shown = hover || value
    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="flex"
                role="radiogroup"
                aria-label={`Rate out of ${max}`}
            >
                {Array.from({ length: max }, (_, i) => {
                    const star = i + 1
                    return (
                        <button
                            key={star}
                            type="button"
                            role="radio"
                            aria-checked={value === star}
                            aria-label={`${star} of ${max} stars`}
                            className="rounded-full p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                            onClick={() => setValue(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onFocus={() => setHover(star)}
                            onBlur={() => setHover(0)}
                        >
                            <Star fill={shown >= star ? 'full' : 'none'} />
                        </button>
                    )
                })}
            </div>
            <span className="text-body-small text-grey dark:text-light-grey">
                {value ? `You rated ${value} of ${max}` : 'Not yet rated'}
            </span>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Rating" toc={toc}>
        <PageHeader
            eyebrow="Primitives"
            title="Rating"
            status="in-review"
            intro="A star rating for showing an aggregate score and for capturing a person's own rating. It supports half stars for display and is fully keyboard-operable when interactive, always pairing the stars with a numeric label."
        />

        <p className="text-grey dark:text-light-grey">
            A proposed primitive identified from bupa.com.au, not yet a shipped
            component — this page is a reference spec built from the design
            tokens to guide adoption.
        </p>

        <Section id="display" title="Display">
            <p className="text-grey dark:text-light-grey">
                Read-only stars summarise a score. Half stars round to the
                nearest 0.5, and the whole control exposes an accessible label
                such as <span className="font-mono">aria-label="Rated 4.5 out of 5"</span>.
            </p>
            <Example
                align="center"
                caption="A read-only 4.5 out of 5 rating"
                code={`<div
  className="flex items-center gap-2"
  role="img"
  aria-label="Rated 4.5 out of 5"
>
  <div className="flex">
    {/* four full stars, one half star, rendered with an inline SVG */}
  </div>
  <span className="text-body-small text-grey dark:text-light-grey">
    4.5 of 5
  </span>
</div>`}
            >
                <StarRatingDisplay value={4.5} />
            </Example>
        </Section>

        <Section id="interactive" title="Interactive">
            <p className="text-grey dark:text-light-grey">
                Each star is a real radio button, so it is clickable, focusable
                and operable with the arrow and Tab keys. Hover and keyboard
                focus preview the value, and the selection is held in state.
            </p>
            <Example
                align="center"
                caption="A keyboard-operable rating with hover preview"
                code={`const [value, setValue] = useState(0)
const [hover, setHover] = useState(0)
const shown = hover || value

<button
  type="button"
  role="radio"
  aria-checked={value === star}
  aria-label={\`\${star} of 5 stars\`}
  className="rounded-full p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
  onClick={() => setValue(star)}
  onMouseEnter={() => setHover(star)}
  onMouseLeave={() => setHover(0)}
  onFocus={() => setHover(star)}
  onBlur={() => setHover(0)}
>
  <Star fill={shown >= star ? 'full' : 'none'} />
</button>`}
            >
                <InteractiveRating />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'value',
                        type: 'number',
                        required: true,
                        description:
                            'Current rating. Supports half steps (e.g. 4.5) in display mode.',
                    },
                    {
                        name: 'max',
                        type: 'number',
                        default: '5',
                        description: 'Total number of stars in the scale.',
                    },
                    {
                        name: 'readOnly',
                        type: 'boolean',
                        default: 'false',
                        description:
                            'Renders a static, non-interactive display rating.',
                    },
                    {
                        name: 'onChange',
                        type: '(value: number) => void',
                        description:
                            'Called with the chosen star when interactive. Required unless readOnly.',
                    },
                    {
                        name: 'label',
                        type: 'string',
                        required: true,
                        description:
                            'Accessible label for the group, e.g. "Rate this article".',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Always pair the stars with a numeric label — rating must never be conveyed by the gold/cyan fill alone.">
                    <StarRatingDisplay value={4} />
                </Do>
                <Dont note="Don't show stars with no number; a screen-reader or colour-blind user can't read the score from fill alone.">
                    <div className="flex" aria-hidden="true">
                        <Star fill="full" />
                        <Star fill="full" />
                        <Star fill="full" />
                        <Star fill="none" />
                        <Star fill="none" />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
