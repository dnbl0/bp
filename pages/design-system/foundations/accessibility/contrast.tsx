import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
    Do,
    Dont,
    DoDontGrid,
    CriteriaList,
} from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'text', title: 'Text contrast' },
    { id: 'non-text', title: 'Non-text contrast' },
    { id: 'colour-meaning', title: 'Colour & meaning' },
    { id: 'criteria', title: 'Success criteria' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Color & contrast" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Color & contrast"
            status="stable"
            intro="Sufficient contrast keeps text and controls legible for people with low vision or colour-vision deficiencies, and in bright sunlight or on poor screens. Colour must never be the only thing carrying meaning."
        />

        <Section id="text" title="Text contrast">
            <p className="text-grey dark:text-light-grey">
                Body text needs a contrast ratio of at least{' '}
                <strong>4.5:1</strong> against its background. Large text — 24px
                regular or 19px bold and up — may drop to <strong>3:1</strong>. Navy
                on white and white on cyan both pass comfortably; pale tokens such as{' '}
                <code className="font-mono text-cyan">disabled-text</code> are for
                genuinely non-essential text only and should never be used for
                content someone must read.
            </p>
        </Section>

        <Section id="non-text" title="Non-text contrast">
            <p className="text-grey dark:text-light-grey">
                Interactive boundaries and meaningful graphics — input borders,
                toggle states, focus rings, icons that carry information — need at
                least <strong>3:1</strong> against what sits next to them. The focus
                ring uses <code className="font-mono text-cyan">focus-blue</code>,
                chosen to clear 3:1 on both light and dark surfaces.
            </p>
        </Section>

        <Section id="colour-meaning" title="Colour & meaning">
            <p className="text-grey dark:text-light-grey">
                Roughly one in twelve men has a colour-vision deficiency, so meaning
                signalled only by hue is lost on them — and on screen-reader users
                entirely. Always pair a state colour (
                <code className="font-mono text-cyan">error-red</code>,{' '}
                <code className="font-mono text-cyan">success-green</code>) with an
                icon, text label or shape.
            </p>
            <DoDontGrid>
                <Do note="Pair status colour with an icon and text so meaning survives without colour.">
                    <span className="inline-flex items-center gap-2 text-error-red font-semibold">
                        <span aria-hidden="true">✕</span> Payment failed
                    </span>
                </Do>
                <Dont note="Rely on colour alone — colour-blind users and screen readers miss the message.">
                    <span className="w-4 h-4 rounded-full bg-error-red inline-block" />
                </Dont>
            </DoDontGrid>
            <Subsection title="Tip">
                <p className="text-body-small text-grey dark:text-light-grey">
                    Check pairs with a contrast tool (the Color page lists ratios for
                    every token) and review designs in greyscale — if a state is
                    unreadable without colour, it fails here.
                </p>
            </Subsection>
        </Section>

        <Section id="criteria" title="Success criteria">
            <CriteriaList
                items={[
                    { id: '1.4.1', title: 'Use of Color', level: 'A' },
                    { id: '1.4.3', title: 'Contrast (Minimum)', level: 'AA' },
                    { id: '1.4.11', title: 'Non-Text Contrast', level: 'AA' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Page
