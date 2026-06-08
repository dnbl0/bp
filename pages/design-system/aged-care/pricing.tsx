import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    Anatomy,
    CodeBlock,
    Do,
    Dont,
    DoDontGrid,
    PageHeader,
    PropsTable,
    Section,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'props', title: 'Props' },
    { id: 'usage', title: 'Usage' },
    { id: 'guidelines', title: 'Guidelines' },
]

/** A static still of the pricing estimator card. */
const PricingMock = () => (
    <div className="w-full max-w-sm rounded-xl border border-cool-paper-200 bg-white p-5 shadow-DEFAULT">
        <p className="text-heading-s font-semibold text-navy">Estimate your costs</p>
        <div className="mt-4 flex gap-2">
            <span className="rounded-md bg-cyan px-3 py-1.5 text-caption font-semibold text-white">
                Standard
            </span>
            <span className="rounded-md border border-cool-paper-200 px-3 py-1.5 text-caption text-grey">
                Premium
            </span>
        </div>
        <dl className="mt-4 space-y-2 text-body-small">
            <div className="flex justify-between">
                <dt className="text-grey">Refundable deposit (RAD)</dt>
                <dd className="font-semibold text-navy">$450,000</dd>
            </div>
            <div className="flex justify-between">
                <dt className="text-grey">Daily payment (DAP)</dt>
                <dd className="font-semibold text-navy">$92.41/day</dd>
            </div>
            <div className="flex justify-between border-t border-cool-paper-200 pt-2">
                <dt className="text-grey">Basic daily fee</dt>
                <dd className="font-semibold text-navy">$61.96/day</dd>
            </div>
        </dl>
        <p className="mt-3 text-caption text-disabled-text">
            Estimate only. Final fees depend on an income and assets assessment.
        </p>
    </div>
)

const Pricing: NextPageWithLayout = () => (
    <DesignSystemLayout title="Pricing calculator" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Component"
            title="Pricing calculator"
            status="stable"
            intro="The accommodation and care cost estimator shown on care-home pages. It explains the refundable deposit (RAD), the equivalent daily payment (DAP) and the basic daily fee so families can compare the real cost of a room."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                Cost is the first and hardest question in aged care. The pricing
                calculator turns opaque accommodation pricing into a clear,
                comparable estimate: choose a room type and care level, and see the
                RAD/DAP split alongside the basic daily fee. Values are pulled live
                from room pricing data, and a shareable estimate is encoded in the
                URL.
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                Implemented by{' '}
                <code className="font-mono text-cyan">
                    components/molecules/blocks/PricingBlock.tsx
                </code>{' '}
                which delegates to the interactive{' '}
                <code className="font-mono text-cyan">PricingComponent</code>.
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    {
                        number: 1,
                        name: 'Room / care selector',
                        description:
                            'Toggles between room types and care levels to recalculate the estimate.',
                    },
                    {
                        number: 2,
                        name: 'RAD / DAP breakdown',
                        description:
                            'The lump-sum deposit and its equivalent daily payment, the core comparison.',
                    },
                    {
                        number: 3,
                        name: 'Disclaimer',
                        description:
                            'States the figure is an estimate pending a means assessment.',
                    },
                ]}
            >
                <PricingMock />
            </Anatomy>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'component',
                        type: 'CmsPricingCard',
                        required: true,
                        description:
                            'The pricing card entry: the care home, anchor id, and the pricing/care-cost grids.',
                    },
                ]}
            />
            <p className="mt-6 mb-3 text-body-small font-semibold text-navy dark:text-white">
                Pricing data shape
            </p>
            <PropsTable
                label="Field"
                rows={[
                    {
                        name: 'rooms[].radPrice',
                        type: 'number',
                        description: 'Refundable Accommodation Deposit (lump sum).',
                    },
                    {
                        name: 'rooms[].dapPrice',
                        type: 'number',
                        description: 'Daily Accommodation Payment (the RAD as a daily rate).',
                    },
                    {
                        name: 'rooms[].extraService',
                        type: 'boolean',
                        description: 'Whether the room is an extra-service (premium) room.',
                    },
                    {
                        name: 'additionalServices',
                        type: 'string[]',
                        description: 'Optional packages presented alongside the base price.',
                    },
                ]}
            />
        </Section>

        <Section id="usage" title="Usage">
            <ul className="list-disc space-y-2 pl-5 text-grey dark:text-light-grey">
                <li>
                    Rendered within the care-home page via{' '}
                    <code className="font-mono text-cyan">
                        AgedCareHomeDetailsTemplate
                    </code>
                    .
                </li>
                <li>
                    Room pricing is served from{' '}
                    <code className="font-mono text-cyan">/api/home-pricing</code> and
                    keyed by state and home.
                </li>
                <li>
                    Always show RAD and DAP together — many families don't realise
                    they are the same cost expressed two ways.
                </li>
                <li>
                    Round to whole dollars and keep the means-assessment disclaimer
                    adjacent to the figure.
                </li>
            </ul>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Reference rendering:
            </p>
            <CodeBlock
                code={`import { PricingBlock } from '@/components/molecules/blocks/PricingBlock'

<PricingBlock component={pricingCardEntry} />`}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Present RAD and DAP side by side with the basic daily fee, and keep the disclaimer visible.">
                    <span className="text-body-small text-grey">
                        RAD + DAP + daily fee, with caveat
                    </span>
                </Do>
                <Dont note="Don't show a single headline price that hides how accommodation is actually paid.">
                    <span className="text-body-small text-grey">
                        “From $450,000” and nothing else
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Pricing
