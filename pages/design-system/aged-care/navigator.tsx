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

/** A static, representative still of the navigator step UI (not the live, CMS-driven component). */
const NavigatorMock = () => (
    <div className="w-full max-w-sm rounded-xl border border-cool-paper-200 bg-white p-5 shadow-DEFAULT">
        <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-cyan" />
            <span className="h-1.5 w-6 rounded-full bg-cyan" />
            <span className="h-1.5 w-6 rounded-full bg-cool-paper-200" />
            <span className="ml-auto text-caption text-disabled-text">Step 2 of 3</span>
        </div>
        <p className="mt-4 text-heading-s font-semibold text-navy">
            Who is the care for?
        </p>
        <div className="mt-4 space-y-2">
            <div className="rounded-lg border-2 border-cyan bg-cyan-50 px-4 py-2.5 text-body-small font-semibold text-navy">
                A parent or relative
            </div>
            <div className="rounded-lg border border-cool-paper-200 px-4 py-2.5 text-body-small text-grey">
                Myself
            </div>
            <div className="rounded-lg border border-cool-paper-200 px-4 py-2.5 text-body-small text-grey">
                Someone I care for
            </div>
        </div>
        <div className="mt-5 flex justify-between text-body-small font-semibold">
            <span className="text-grey">Back</span>
            <span className="rounded-lg bg-cyan px-4 py-2 text-white">Continue</span>
        </div>
    </div>
)

const Navigator: NextPageWithLayout = () => (
    <DesignSystemLayout title="Care navigator" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Component"
            title="Care navigator"
            status="stable"
            intro="A guided, multi-step needs assessment that asks a family a short series of questions and recommends an aged-care pathway. Authored entirely in Contentful so the steps and results can change without a deploy."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                The navigator lowers the barrier to entry for families who don't
                yet know what kind of care they need. It opens with an
                introduction, walks through a set of single-choice steps, and ends
                on a results screen that points to the most relevant service. It is
                a CMS-driven organism — the steps, options and results are all
                Contentful entries — so this page documents its structure and
                content model rather than a live demo.
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                Implemented by{' '}
                <code className="font-mono text-cyan">
                    components/molecules/blocks/AgedCareNavigator.tsx
                </code>
                .
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    {
                        number: 1,
                        name: 'Progress indicator',
                        description:
                            'Shows how many steps remain so the assessment never feels open-ended.',
                    },
                    {
                        number: 2,
                        name: 'Step question',
                        description:
                            'A single, plain-language question per step from navigatorStepsCollection.',
                    },
                    {
                        number: 3,
                        name: 'Options',
                        description:
                            'Single-select answers; the chosen option is carried into the results logic.',
                    },
                    {
                        number: 4,
                        name: 'Navigation',
                        description:
                            'Back and Continue controls; the final step resolves to a results screen.',
                    },
                ]}
            >
                <NavigatorMock />
            </Anatomy>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'component',
                        type: 'CmsAgedCareNavigator',
                        required: true,
                        description:
                            'The full navigator entry from Contentful, including the introduction, steps and results.',
                    },
                ]}
            />
            <p className="mt-6 mb-3 text-body-small font-semibold text-navy dark:text-white">
                Key content fields
            </p>
            <PropsTable
                label="Field"
                rows={[
                    {
                        name: 'navigatorHeading',
                        type: 'string',
                        description: 'Heading shown above the navigator.',
                    },
                    {
                        name: 'introductionContent',
                        type: 'RichText',
                        description: 'Opening copy that frames the assessment.',
                    },
                    {
                        name: 'introductionDisclaimer',
                        type: 'RichText',
                        description: 'Fine print clarifying the guidance is not advice.',
                    },
                    {
                        name: 'navigatorStepsCollection',
                        type: 'NavigatorStep[]',
                        description:
                            'The ordered steps; each step has a question and a set of options.',
                    },
                    {
                        name: 'navigatorResultsCollection',
                        type: 'NavigatorResult[]',
                        description:
                            'The possible outcomes mapped to the answers a family gives.',
                    },
                    {
                        name: 'navigatorHeadingButtonText / Url',
                        type: 'string',
                        description: 'An optional shortcut action beside the heading.',
                    },
                ]}
            />
        </Section>

        <Section id="usage" title="Usage">
            <ul className="list-disc space-y-2 pl-5 text-grey dark:text-light-grey">
                <li>
                    Placed near the top of aged-care landing and category pages,
                    where intent is still forming.
                </li>
                <li>
                    Authored in Contentful via{' '}
                    <code className="font-mono text-cyan">requestAgedCareNavigator</code>{' '}
                    and the <code className="font-mono text-cyan">fragmentNavigatorStep</code> shape.
                </li>
                <li>
                    Keep steps to four or fewer single-choice questions; longer
                    flows lose people before the result.
                </li>
                <li>
                    Always pair the result with a clear next action (book a tour,
                    call, or open the home finder).
                </li>
            </ul>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Reference rendering:
            </p>
            <CodeBlock
                code={`import { AgedCareNavigator } from '@/components/molecules/blocks/AgedCareNavigator'

<AgedCareNavigator component={navigatorEntry} />`}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Ask one plain-language question per step and show progress.">
                    <span className="text-body-small text-grey">
                        “Who is the care for?” · Step 2 of 3
                    </span>
                </Do>
                <Dont note="Don't stack multiple questions or free-text fields into a single step.">
                    <span className="text-body-small text-grey">
                        Name, budget, postcode, needs… all at once
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Navigator
