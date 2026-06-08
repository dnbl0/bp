import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'principles', title: 'Principles' },
    { id: 'writing', title: 'While you’re writing' },
    { id: 'swaps', title: 'Word swaps' },
    { id: 'in-action', title: 'Tone in action' },
]

const principles: { title: string; body: string }[] = [
    {
        title: 'Know our stuff',
        body: 'Showing we know what we’re talking about helps people trust we’re experienced. Show what makes us good rather than just saying we’re good.',
    },
    {
        title: 'Make things easy',
        body: 'Healthcare can be complicated. Keep it short and snappy, use everyday words not jargon, and keep each sentence to one thought.',
    },
    {
        title: 'Show we care',
        body: 'Our language needs to be warm and empathetic. Make it human — it should sound natural when you read it aloud. Contractions add warmth.',
    },
    {
        title: 'Be light-hearted, when it’s right',
        body: 'Aim for a wry smile, not a belly laugh. Use clever, witty humour — never at other people’s expense — and be careful not to undermine our expertise.',
    },
]

const swaps: { before: string; after: string }[] = [
    { before: 'Assist', after: 'Help' },
    { before: 'Ensure', after: 'Make sure' },
    { before: 'Commence', after: 'Start' },
    { before: 'Prior to', after: 'Before' },
    { before: 'PMI', after: 'Health Insurance' },
    { before: 'Self-pay', after: 'Pay as you go' },
    { before: 'It is / We are / There is', after: 'It’s / We’re / There’s' },
    { before: 'Facilitation', after: 'Facilitate' },
    { before: 'Customer engagement initiative', after: 'How we’ll talk and write to customers' },
]

const BeforeAfter = ({
    label,
    before,
    after,
}: {
    label: string
    before: string
    after: string
}) => (
    <div>
        <h3 className="text-body-small font-bold uppercase tracking-wide text-disabled-text">
            {label}
        </h3>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey">
                <p className="text-caption font-semibold uppercase tracking-wide text-disabled-text">
                    Before
                </p>
                <p className="mt-2 text-body-small text-grey dark:text-light-grey">{before}</p>
            </div>
            <div className="rounded-xl border border-cyan/40 p-5 bg-cyan-50 dark:bg-charcoal">
                <p className="text-caption font-semibold uppercase tracking-wide text-cyan">
                    After
                </p>
                <p className="mt-2 text-body-small text-navy dark:text-white">{after}</p>
            </div>
        </div>
    </div>
)

const ToneOfVoice: NextPageWithLayout = () => (
    <DesignSystemLayout title="Tone of voice" toc={toc}>
        <PageHeader
            eyebrow="Tone of voice"
            title="Tone of voice"
            status="stable"
            intro="We want all our communications to be helpful, straightforward, friendly and inviting. It helps us better connect with our audiences."
        />

        <Section id="principles" title="Principles">
            <div className="grid gap-4 sm:grid-cols-2">
                {principles.map(principle => (
                    <div
                        key={principle.title}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey"
                    >
                        <h3 className="text-heading-s font-semibold text-cyan">
                            {principle.title}
                        </h3>
                        <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                            {principle.body}
                        </p>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="writing" title="While you’re writing">
            <Subsection title="Before you start">
                <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>Who are you talking to — are they new to Bupa? Do they understand healthcare?</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>What do they need to know, what’s the benefit for them, how do you want them to feel, and what do you want them to do?</span>
                    </li>
                </ul>
            </Subsection>
            <Subsection title="As you write">
                <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>Keep each sentence to one thought; swap abstract words for concrete ones.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>Find natural ways to tie language to health and care, without getting repetitive.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>Use contractions and personal pronouns to add warmth and make it human.</span>
                    </li>
                </ul>
            </Subsection>
        </Section>

        <Section id="swaps" title="Word swaps">
            <p className="text-grey dark:text-light-grey">
                Swap office-speak for everyday language.
            </p>
            <div className="mt-6 overflow-x-auto">
                <table className="w-full text-body-small border-collapse">
                    <thead>
                        <tr className="border-b border-cool-paper-200 dark:border-charcoal text-left">
                            <th className="p-3 font-semibold text-grey dark:text-light-grey">Before</th>
                            <th className="p-3 font-semibold text-grey dark:text-light-grey">After</th>
                        </tr>
                    </thead>
                    <tbody>
                        {swaps.map(swap => (
                            <tr
                                key={swap.before}
                                className="border-b border-cool-paper-100 dark:border-charcoal"
                            >
                                <td className="p-3 text-grey dark:text-light-grey line-through decoration-error-red/50">
                                    {swap.before}
                                </td>
                                <td className="p-3 font-semibold text-navy dark:text-white">
                                    {swap.after}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Section>

        <Section id="in-action" title="Tone in action">
            <div className="space-y-8">
                <BeforeAfter
                    label="Brochure"
                    before="Our focus extends to cardiovascular disease management. Bupa health insurance members have access to the COACH Program following hospitalisation for a cardiac or stroke related illness. A qualified dietitian works closely with your doctor to identify steps they can take to reduce the likelihood of future complications…"
                    after="When you’re recovering from a stroke or a heart attack, it’s natural to worry that it could happen again. If you have health insurance with us, you’ll have access to our COACH program. Our dietitians will work with your doctor to come up with a plan for your recovery. Then they’ll give you support over the phone to help you get better — and stay healthy."
                />
                <BeforeAfter
                    label="Flyer"
                    before="Dermatology appointments available. Speak to a receptionist who can assist with your booking."
                    after="Show your skin some extra care. Speak to reception about seeing a dermatologist sooner."
                />
                <BeforeAfter
                    label="Insurance letter"
                    before="If you are happy to renew, there’s nothing further you need to do because your health plan will renew automatically as per the date shown on your insurance certificate. Please be aware that the renewal terms offered are based on your circumstances as previously advised to us…"
                    after="If you’re happy to renew your insurance you don’t have to do anything. Your plan will renew automatically on the date on your insurance certificate. We’ve based the terms on what you last told us about your situation. If that’s changed, please let us know straight away — otherwise it could affect your cover."
                />
            </div>
            <p className="mt-6 text-body-small text-grey dark:text-light-grey">
                What changed? We started with gentle observation, used inclusive pronouns
                and everyday language, kept it positive, and broke long sentences into
                shorter, more digestible ones.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default ToneOfVoice
