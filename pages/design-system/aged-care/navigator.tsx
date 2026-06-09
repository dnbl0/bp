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
    Specifications,
} from '../../../styleguide-components/primitives'
import {
    navigatorOptionButtonDefaultSpecs,
    navigatorProgressSpecs,
    navigatorResultCardSpecs,
    navigatorInformationPanelSpecs,
} from '../../../styleguide-components/specs/navigator.specs'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'option-button', title: 'Option button' },
    { id: 'progress', title: 'Progress indicator' },
    { id: 'result-card', title: 'Result card' },
    { id: 'information-panel', title: 'Information panel' },
    { id: 'props', title: 'Props' },
    { id: 'usage', title: 'Usage' },
    { id: 'guidelines', title: 'Guidelines' },
]

/* ─── Static visual mocks ─────────────────────────────────────────────── */

const NavigatorPageBannerMock = () => (
    <div className="w-full bg-cyan px-6 py-8 flex flex-col gap-6 rounded-t-lg">
        <div className="flex items-start justify-between gap-4">
            <p className="text-3xl font-light text-white leading-tight">
                Getting Started with Aged Care
            </p>
            <div className="flex flex-col gap-1.5 shrink-0 min-w-[148px] text-right">
                <span className="text-sm tracking-wider text-white/80">Step 1 of 5</span>
                <div className="w-36 h-3 bg-white/30 rounded-full overflow-hidden">
                    <div className="w-[30px] h-full bg-white rounded-full" />
                </div>
            </div>
        </div>
        <div>
            <div className="inline-flex items-center gap-3 bg-white border-2 border-lighter-grey rounded px-3.5 py-3 text-body font-bold text-grey">
                <span className="shrink-0 h-10 w-10 bg-cool-paper-100 rounded-full flex items-center justify-center text-xs text-silver">
                    icon
                </span>
                Book a call with an expert
            </div>
        </div>
    </div>
)

const NavigatorStepMock = () => (
    <div className="w-full bg-cool-paper-50 px-6 py-8 flex flex-col gap-6 rounded-b-lg">
        <div>
            <p className="font-semibold text-heading-s text-navy">Who are you planning care for?</p>
            <p className="text-body text-grey mt-1">Choose the option that best describes your situation.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {/* Selected */}
            <div className="relative flex flex-col items-center justify-center gap-4 border-2 border-cyan bg-cyan-50 rounded p-[26px] text-center">
                <span className="absolute top-3 left-3 h-4 w-4 rounded-sm bg-cyan flex items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                        <path d="M1 3.5L3.8 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <span className="h-[57px] w-[57px] rounded-full bg-cool-paper-100 flex items-center justify-center text-xs text-silver">icon</span>
                <span className="flex flex-col items-center gap-2">
                    <span className="font-bold text-body text-grey">A parent</span>
                    <span className="text-body-small text-navy">or relative</span>
                </span>
            </div>
            {(['Myself', 'My partner', 'Someone else'] as const).map((label) => (
                <div key={label} className="flex flex-col items-center justify-center gap-4 border-2 border-lighter-grey bg-white rounded p-[26px] text-center">
                    <span className="h-[57px] w-[57px] rounded-full bg-cool-paper-100 flex items-center justify-center text-xs text-silver">icon</span>
                    <span className="font-bold text-body text-grey">{label}</span>
                </div>
            ))}
        </div>
        <div className="flex gap-3 self-end">
            <button className="button button--secondary">← Back</button>
            <button className="button button--primary">Next →</button>
        </div>
    </div>
)

const NavigatorMock = () => (
    <div className="w-full max-w-2xl rounded-lg overflow-hidden border border-cool-paper-200 shadow-DEFAULT">
        <NavigatorPageBannerMock />
        <NavigatorStepMock />
    </div>
)

const OptionButtonVariantsMock = () => (
    <div className="flex flex-col gap-6">
        <div>
            <p className="text-body-small font-semibold text-grey mb-3">Vertical — Default &amp; Selected</p>
            <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center gap-4 border-2 border-lighter-grey bg-white rounded p-[26px] text-center w-[180px]">
                    <span className="h-[57px] w-[57px] rounded-full bg-cool-paper-100 flex items-center justify-center text-xs text-silver">icon</span>
                    <span className="flex flex-col items-center gap-2">
                        <span className="font-bold text-body text-grey">Heading</span>
                        <span className="text-body-small text-navy">Description</span>
                    </span>
                </div>
                <div className="relative flex flex-col items-center justify-center gap-4 border-2 border-cyan bg-cyan-50 rounded p-[26px] text-center w-[180px]">
                    <span className="absolute top-3 left-3 h-4 w-4 rounded-sm bg-cyan flex items-center justify-center">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                            <path d="M1 3.5L3.8 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <span className="h-[57px] w-[57px] rounded-full bg-cyan-50 border border-cyan flex items-center justify-center text-xs text-cyan">icon</span>
                    <span className="flex flex-col items-center gap-2">
                        <span className="font-bold text-body text-grey">Heading</span>
                        <span className="text-body-small text-navy">Description</span>
                    </span>
                </div>
            </div>
        </div>
        <div>
            <p className="text-body-small font-semibold text-grey mb-3">Horizontal — Default &amp; Selected</p>
            <div className="flex flex-col gap-2 w-[280px]">
                <div className="flex items-center gap-4 border-2 border-lighter-grey bg-white rounded px-[18px] py-[10px]">
                    <span className="h-10 w-10 shrink-0 rounded-full bg-cool-paper-100 flex items-center justify-center text-xs text-silver">ic</span>
                    <span className="flex flex-col gap-1">
                        <span className="font-bold text-body text-grey">Heading</span>
                        <span className="text-body-small text-navy">Description</span>
                    </span>
                </div>
                <div className="flex items-center gap-4 border-2 border-cyan bg-cyan-50 rounded px-[18px] py-[10px]">
                    <span className="h-10 w-10 shrink-0 rounded-full bg-cyan-50 border border-cyan flex items-center justify-center text-xs text-cyan">ic</span>
                    <span className="flex flex-col gap-1">
                        <span className="font-bold text-body text-grey">Heading</span>
                        <span className="text-body-small text-navy">Description</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
)

const ProgressMock = () => (
    <div className="flex flex-col gap-4 bg-cyan rounded-lg px-8 py-6 w-fit">
        {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex flex-col gap-1.5 w-36">
                <span className="text-sm tracking-wider text-white/80">Step {step} of 5</span>
                <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${(step / 5) * 100}%` }} />
                </div>
            </div>
        ))}
    </div>
)

const ResultCardMock = () => (
    <div className="border border-light-grey rounded-lg overflow-hidden max-w-lg">
        <div className="bg-warm-paper-100 flex flex-col gap-8 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                    <span className="shrink-0 h-[57px] w-[57px] bg-cool-paper-100 rounded-full flex items-center justify-center text-xs text-silver">icon</span>
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold text-heading-s leading-[30px] text-navy">Heading</p>
                        <p className="text-body leading-7 text-grey">Description of this result or service.</p>
                    </div>
                </div>
                <button className="button button--primary self-start md:self-center shrink-0">
                    Button →
                </button>
            </div>
        </div>
    </div>
)

const InformationPanelMock = () => (
    <div className="border border-cyan rounded-lg bg-cool-paper-50 p-6 max-w-lg">
        <div className="flex gap-4 items-start">
            <span className="shrink-0 h-[57px] w-[57px] bg-cyan/10 rounded-full flex items-center justify-center text-xs text-cyan">i</span>
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-heading-s leading-6 text-navy">Need more help with aged care?</p>
                    <p className="text-body leading-7 text-grey">
                        Our customer concierge team is available Mon–Fri 9am–5pm and can assist with your aged care enquiry.
                    </p>
                </div>
                <span className="inline-flex items-center gap-2 border border-cyan rounded text-body-small font-semibold text-cyan px-2 py-2 self-start">
                    Call 1800 957 237 ›
                </span>
            </div>
        </div>
    </div>
)

/* ─── Page ─────────────────────────────────────────────────────────────── */

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
                The navigator lowers the barrier to entry for families who don&apos;t
                yet know what kind of care they need. It opens with an
                introduction, walks through a set of single-choice steps, and ends
                on a results screen that points to the most relevant service.
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                The organism is CMS-driven — steps, options and results are all Contentful
                entries — so this page documents the component&apos;s visual sub-parts and
                their content model rather than a live interactive demo.
                Implemented in{' '}
                <code className="font-mono text-cyan">
                    components/molecules/blocks/AgedCareNavigator.tsx
                </code>
                , with reusable sub-components under{' '}
                <code className="font-mono text-cyan">components/molecules/</code>.
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    {
                        number: 1,
                        name: 'Page banner',
                        description:
                            'Cyan header band showing the navigator title, progress indicator, and the "Book a call with an expert" shortcut button.',
                    },
                    {
                        number: 2,
                        name: 'Step container',
                        description:
                            'Light-blue (#f3faff) section holding the current question, option button grid, and Back/Next navigation.',
                    },
                    {
                        number: 3,
                        name: 'Option button',
                        description:
                            'Single-select card with icon, heading and optional description. Selected state uses a cyan border and filled checkbox.',
                    },
                    {
                        number: 4,
                        name: 'Navigation controls',
                        description:
                            'Back (secondary) and Next (primary) buttons aligned to the right; Next is disabled until an option is chosen.',
                    },
                ]}
            >
                <NavigatorMock />
            </Anatomy>
        </Section>

        {/* ── Option button ────────────────────────────────────────────── */}
        <Section id="option-button" title="Option button">
            <p className="text-grey dark:text-light-grey mb-6">
                <code className="font-mono text-cyan">NavigatorOptionButton</code> (
                <code className="font-mono text-cyan">
                    components/molecules/NavigatorOptionButton.tsx
                </code>
                ) is a standalone sub-component representing a single selectable answer within a step.
            </p>
            <OptionButtonVariantsMock />
            <Specifications
                variant="horizontal"
                groups={navigatorOptionButtonDefaultSpecs}
            >
                <div className="relative flex flex-col items-center justify-center gap-4 border-2 border-cyan bg-cyan-50 rounded p-[26px] text-center w-[180px]">
                    <span className="absolute top-3 left-3 h-4 w-4 rounded-sm bg-cyan flex items-center justify-center">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                            <path d="M1 3.5L3.8 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <span className="h-[57px] w-[57px] rounded-full bg-cyan-50 border border-cyan flex items-center justify-center text-xs text-cyan">icon</span>
                    <span className="flex flex-col items-center gap-2">
                        <span className="font-bold text-body text-grey">Heading</span>
                        <span className="text-body-small text-navy">Description</span>
                    </span>
                </div>
            </Specifications>
            <PropsTable
                rows={[
                    { name: 'heading', type: 'string', required: true, description: 'Primary label for the option.' },
                    { name: 'description', type: 'string', required: false, description: 'Secondary label shown below the heading.' },
                    { name: 'icon', type: 'React.ReactNode', required: false, description: 'Icon element (57×57 vertical, 40×40 horizontal).' },
                    { name: 'direction', type: "'vertical' | 'horizontal'", required: false, description: "Layout orientation. Defaults to 'vertical'." },
                    { name: 'state', type: "'default' | 'selected'", required: false, description: "Visual selection state. Defaults to 'default'." },
                    { name: 'onClick', type: '() => void', required: false, description: 'Click handler — marks the option as selected.' },
                ]}
            />
            <CodeBlock
                code={`// 4-option grid (desktop) / stacked (mobile)
<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
  <NavigatorOptionButton heading="A parent" icon={<img … />} state="selected" />
  <NavigatorOptionButton heading="Myself"   icon={<img … />} />
  <NavigatorOptionButton heading="My partner" icon={<img … />} />
  <NavigatorOptionButton heading="Someone else" icon={<img … />} />
</div>`}
            />
        </Section>

        {/* ── Progress indicator ───────────────────────────────────────── */}
        <Section id="progress" title="Progress indicator">
            <p className="text-grey dark:text-light-grey mb-6">
                The progress indicator lives inside the page banner and communicates how far
                through the assessment the user is. It uses white-on-cyan colours so it remains
                legible over the cyan background.
            </p>
            <ProgressMock />
            <Specifications
                variant="horizontal"
                groups={navigatorProgressSpecs}
            >
                <div className="flex flex-col gap-1.5 bg-cyan rounded px-4 py-3 w-36">
                    <span className="text-sm tracking-wider text-white/80">Step 3 of 5</span>
                    <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: '60%' }} />
                    </div>
                </div>
            </Specifications>
        </Section>

        {/* ── Result card ──────────────────────────────────────────────── */}
        <Section id="result-card" title="Result card">
            <p className="text-grey dark:text-light-grey mb-6">
                <code className="font-mono text-cyan">NavigatorResultCard</code> (
                <code className="font-mono text-cyan">
                    components/molecules/NavigatorResultCard.tsx
                </code>
                ) shows the recommended service on the results screen.
                A warm-paper background distinguishes it from the step container.
            </p>
            <ResultCardMock />
            <Specifications variant="horizontal" groups={navigatorResultCardSpecs}>
                <ResultCardMock />
            </Specifications>
            <PropsTable
                rows={[
                    { name: 'heading', type: 'string', required: true, description: 'Card title.' },
                    { name: 'description', type: 'string', required: false, description: 'Supporting body copy.' },
                    { name: 'icon', type: 'React.ReactNode', required: false, description: 'Icon or image (57×57).' },
                    { name: 'ctaText', type: 'string', required: false, description: 'Primary CTA button label.' },
                    { name: 'ctaHref', type: 'string', required: false, description: 'Primary CTA destination.' },
                ]}
            />
        </Section>

        {/* ── Information panel ────────────────────────────────────────── */}
        <Section id="information-panel" title="Information panel">
            <p className="text-grey dark:text-light-grey mb-6">
                <code className="font-mono text-cyan">NavigatorInformationPanel</code> (
                <code className="font-mono text-cyan">
                    components/molecules/NavigatorInformationPanel.tsx
                </code>
                ) surfaces contextual help — a phone number, membership note, or similar —
                at relevant points in the flow. Its cyan border distinguishes it from the
                surrounding cool-paper background.
            </p>
            <InformationPanelMock />
            <Specifications variant="horizontal" groups={navigatorInformationPanelSpecs}>
                <InformationPanelMock />
            </Specifications>
            <PropsTable
                rows={[
                    { name: 'heading', type: 'string', required: true, description: 'Panel heading.' },
                    { name: 'description', type: 'string', required: true, description: 'Body copy.' },
                    { name: 'icon', type: 'React.ReactNode', required: false, description: 'Icon (57×57) shown left of the text block.' },
                    { name: 'ctaText', type: 'string', required: false, description: 'Link label (e.g. "Call 1800 957 237").' },
                    { name: 'ctaHref', type: 'string', required: false, description: 'Link destination.' },
                ]}
            />
        </Section>

        {/* ── Props ────────────────────────────────────────────────────── */}
        <Section id="props" title="Props (organism)">
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
                    { name: 'navigatorHeading', type: 'string', description: 'Heading shown in the page banner.' },
                    { name: 'introductionContent', type: 'RichText', description: 'Opening copy that frames the assessment.' },
                    { name: 'introductionDisclaimer', type: 'RichText', description: 'Fine print clarifying the guidance is not advice.' },
                    { name: 'navigatorStepsCollection', type: 'NavigatorStep[]', description: 'The ordered steps; each step has a question, description and options with icons.' },
                    { name: 'navigatorResultsCollection', type: 'NavigatorResult[]', description: 'The possible outcomes mapped to the answers a family gives.' },
                    { name: 'navigatorHeadingButtonText / Url / Icon', type: 'string / Asset', description: 'The "Book a call with an expert" shortcut in the banner.' },
                ]}
            />
        </Section>

        {/* ── Usage ────────────────────────────────────────────────────── */}
        <Section id="usage" title="Usage">
            <ul className="list-disc space-y-2 pl-5 text-grey dark:text-light-grey">
                <li>Placed near the top of aged-care landing and category pages, where intent is still forming.</li>
                <li>
                    Authored in Contentful via{' '}
                    <code className="font-mono text-cyan">requestAgedCareNavigator</code>{' '}
                    and the <code className="font-mono text-cyan">fragmentNavigatorStep</code> shape.
                </li>
                <li>Keep steps to four or fewer single-choice questions; longer flows lose people before the result.</li>
                <li>Always pair the result with a clear next action (book a tour, call, or open the home finder).</li>
                <li>
                    The <code className="font-mono text-cyan">NavigatorOptionButton</code>,{' '}
                    <code className="font-mono text-cyan">NavigatorResultCard</code> and{' '}
                    <code className="font-mono text-cyan">NavigatorInformationPanel</code> sub-components
                    can be used independently outside the full navigator context.
                </li>
            </ul>
            <CodeBlock
                code={`import { AgedCareNavigator } from '@/components/molecules/blocks/AgedCareNavigator'

<AgedCareNavigator component={navigatorEntry} />`}
            />
            <CodeBlock
                code={`import { NavigatorOptionButton } from '@/components/molecules/NavigatorOptionButton'
import { NavigatorResultCard } from '@/components/molecules/NavigatorResultCard'
import { NavigatorInformationPanel } from '@/components/molecules/NavigatorInformationPanel'

<NavigatorOptionButton
  heading="A parent or relative"
  description="Planning care for a family member"
  icon={<img src={iconSrc} width={57} height={57} alt="" />}
  state="selected"
  onClick={() => handleSelect('parent')}
/>

<NavigatorResultCard
  heading="Residential aged care"
  description="We have more than 50 care homes across Australia."
  ctaText="Find a care home"
  ctaHref="/find-a-home"
/>

<NavigatorInformationPanel
  heading="Need more help with aged care?"
  description="Our team is available Mon–Fri 9am–5pm."
  ctaText="Call 1800 957 237"
  ctaHref="tel:1800957237"
/>`}
            />
        </Section>

        {/* ── Guidelines ───────────────────────────────────────────────── */}
        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Ask one plain-language question per step and show progress.">
                    <span className="text-body-small text-grey">
                        "Who is the care for?" · Step 2 of 5
                    </span>
                </Do>
                <Dont note="Don't stack multiple questions or free-text fields into a single step.">
                    <span className="text-body-small text-grey">
                        Name, budget, postcode, needs… all at once
                    </span>
                </Dont>
            </DoDontGrid>
            <DoDontGrid>
                <Do note="Use the vertical layout (2–4 columns) for the main step grid; switch to horizontal for compact secondary choices.">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="border-2 border-lighter-grey rounded p-3 flex flex-col items-center gap-2 text-center text-caption text-grey">
                            <span className="h-8 w-8 bg-cool-paper-100 rounded-full" />
                            Option A
                        </div>
                        <div className="border-2 border-lighter-grey rounded p-3 flex flex-col items-center gap-2 text-center text-caption text-grey">
                            <span className="h-8 w-8 bg-cool-paper-100 rounded-full" />
                            Option B
                        </div>
                    </div>
                </Do>
                <Dont note="Don't exceed four options per step — more choices increase decision fatigue.">
                    <div className="grid grid-cols-3 gap-1">
                        {['A','B','C','D','E','F'].map(l => (
                            <div key={l} className="border border-lighter-grey rounded p-2 text-center text-caption text-grey">{l}</div>
                        ))}
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Navigator
