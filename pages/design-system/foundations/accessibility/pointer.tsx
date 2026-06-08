import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Do,
    Dont,
    DoDontGrid,
    CriteriaList,
} from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'target-size', title: 'Target size' },
    { id: 'gestures', title: 'Gestures & dragging' },
    { id: 'cancellation', title: 'Pointer cancellation' },
    { id: 'motion-actuation', title: 'Motion actuation' },
    { id: 'criteria', title: 'Success criteria' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Pointer, touch & targets" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Pointer, touch & targets"
            status="stable"
            intro="Touch and pointer input must work for people with tremors, limited dexterity or large fingers. Targets need room, complex gestures need simple alternatives, and accidental taps must be recoverable."
        />

        <Section id="target-size" title="Target size">
            <p className="text-grey dark:text-light-grey">
                Interactive targets must be at least <strong>24×24 CSS pixels</strong>,
                or have enough spacing around them that a 24px circle wouldn&apos;t
                overlap a neighbour (WCAG 2.2 AA). Aim higher where you can:{' '}
                <strong>44–48px</strong> is the comfortable touch size recommended by
                Apple and Material. The visible icon can stay small as long as the
                padded hit area meets the size.
            </p>
            <DoDontGrid>
                <Do note="Pad small icon controls so the tap target reaches at least 24px, ideally 44px.">
                    <button className="w-11 h-11 flex items-center justify-center rounded-lg bg-cyan-50 dark:bg-charcoal text-cyan">
                        <span aria-hidden="true">★</span>
                    </button>
                </Do>
                <Dont note="Ship a tiny target that's easy to miss and easy to mis-tap.">
                    <button className="w-4 h-4 flex items-center justify-center rounded bg-error-red/20 text-error-red text-[8px]">
                        <span aria-hidden="true">★</span>
                    </button>
                </Dont>
            </DoDontGrid>
        </Section>

        <Section id="gestures" title="Gestures & dragging">
            <p className="text-grey dark:text-light-grey">
                Any path-based or multi-point gesture (swipe, pinch) must have a
                simple single-pointer alternative such as a tap on a button. Under
                WCAG 2.2, anything done by <strong>dragging</strong> — reordering a
                list, a slider, drag-and-drop — also needs a non-drag alternative
                (for example, up/down buttons or a numeric input), unless dragging is
                genuinely essential.
            </p>
        </Section>

        <Section id="cancellation" title="Pointer cancellation">
            <p className="text-grey dark:text-light-grey">
                Trigger actions on the pointer <em>up</em> event, not down, so a user
                who presses the wrong control can slide off it to cancel. Avoid
                committing irreversible actions the instant a finger touches down.
            </p>
        </Section>

        <Section id="motion-actuation" title="Motion actuation">
            <p className="text-grey dark:text-light-grey">
                If a feature is triggered by moving the device (shake to undo, tilt to
                scroll), provide a conventional UI control that does the same thing,
                and let users turn the motion trigger off. Not everyone can move a
                device deliberately, and some have it mounted.
            </p>
        </Section>

        <Section id="criteria" title="Success criteria">
            <CriteriaList
                items={[
                    { id: '2.5.1', title: 'Pointer Gestures', level: 'A' },
                    { id: '2.5.2', title: 'Pointer Cancellation', level: 'A' },
                    { id: '2.5.4', title: 'Motion Actuation', level: 'A' },
                    {
                        id: '2.5.7',
                        title: 'Dragging Movements',
                        level: 'AA',
                        isNew: true,
                    },
                    {
                        id: '2.5.8',
                        title: 'Target Size (Minimum)',
                        level: 'AA',
                        isNew: true,
                    },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Page
