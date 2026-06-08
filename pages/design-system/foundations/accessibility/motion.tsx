import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
    CriteriaList,
} from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'reduced-motion', title: 'Reduced motion' },
    { id: 'control', title: 'Pause, stop, hide' },
    { id: 'flashing', title: 'Flashing' },
    { id: 'criteria', title: 'Success criteria' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Motion & animation" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Motion & animation"
            status="stable"
            intro="Animation adds polish but can trigger nausea, dizziness or migraines for people with vestibular disorders, and can distract or seize attention. Keep it subtle, controllable, and respectful of the user's settings."
        />

        <Section id="reduced-motion" title="Reduced motion">
            <p className="text-grey dark:text-light-grey">
                Honour the operating-system{' '}
                <code className="font-mono text-cyan">prefers-reduced-motion</code>{' '}
                setting. When it is on, drop large transforms — parallax, big slides,
                zoom and spin — to a simple fade or no animation at all. No content or
                function may depend on an animation to be understood.
            </p>
            <Subsection title="In practice">
                <p className="text-body-small text-grey dark:text-light-grey">
                    Tailwind&apos;s{' '}
                    <code className="font-mono text-cyan">motion-safe:</code> and{' '}
                    <code className="font-mono text-cyan">motion-reduce:</code>{' '}
                    variants let you gate movement on the user&apos;s preference.
                    Apply non-essential transitions under{' '}
                    <code className="font-mono text-cyan">motion-safe:</code> so they
                    simply don&apos;t run for users who opt out.
                </p>
            </Subsection>
        </Section>

        <Section id="control" title="Pause, stop, hide">
            <p className="text-grey dark:text-light-grey">
                Any moving, blinking or auto-updating content that starts
                automatically, lasts more than five seconds and runs alongside other
                content — carousels, auto-advancing banners, animated counters — must
                give the user a way to pause, stop or hide it.
            </p>
        </Section>

        <Section id="flashing" title="Flashing">
            <p className="text-grey dark:text-light-grey">
                Nothing may flash more than three times per second. Rapid flashing can
                trigger photosensitive seizures, so avoid it entirely rather than
                trying to stay just under the threshold.
            </p>
        </Section>

        <Section id="criteria" title="Success criteria">
            <CriteriaList
                items={[
                    { id: '2.2.2', title: 'Pause, Stop, Hide', level: 'A' },
                    {
                        id: '2.3.1',
                        title: 'Three Flashes or Below Threshold',
                        level: 'A',
                    },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Page
