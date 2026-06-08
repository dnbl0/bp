import { useState } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
    Specifications,
} from '../../../styleguide-components/primitives'
import { ToggleSwitch } from '../../../components/atoms/ToggleSwitch'
import { toggleDefaultSpecs } from '../../../styleguide-components/specs/toggle.specs'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'guidance', title: 'Guidance' },
    { id: 'guidelines', title: 'Guidelines' },
]

const ToggleDemo = () => {
    const [annual, setAnnual] = useState(false)
    return (
        <div className="flex flex-col items-center gap-3">
            <ToggleSwitch
                checked={annual}
                onChange={setAnnual}
                label={annual ? 'Pay annually' : 'Pay monthly'}
            />
            <span className="text-sm text-grey dark:text-light-grey">
                Billing: {annual ? 'annual' : 'monthly'}
            </span>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Toggle switch" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Toggle switch"
            status="stable"
            intro="A binary on/off control built on a real checkbox input for full keyboard and screen-reader support. Used for choices like monthly/annual payment or including an extra, where a switch reads more clearly than a checkbox."
        />

        <ComponentHero name="ToggleSwitch" />

        <Section id="example" title="Example">
            <Example
                caption="A controlled switch"
                code={`const [annual, setAnnual] = useState(false)

<ToggleSwitch
  checked={annual}
  onChange={setAnnual}
  label={annual ? 'Pay annually' : 'Pay monthly'}
/>`}
            >
                <ToggleDemo />
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={[toggleDefaultSpecs]} withTable>
                <ToggleDemo />
            </Specifications>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'checked',
                        type: 'boolean',
                        required: true,
                        description:
                            'Whether the switch is on. Controlled by the parent.',
                    },
                    {
                        name: 'onChange',
                        type: '(checked: boolean) => void',
                        required: true,
                        description:
                            'Called with the next checked state when the user toggles.',
                    },
                    {
                        name: 'label',
                        type: 'string',
                        required: true,
                        description:
                            'Visible label describing what the switch controls.',
                    },
                    {
                        name: 'hideLabel',
                        type: 'boolean',
                        description:
                            'Hides the label visually while keeping it for screen readers.',
                    },
                    {
                        name: 'disabled',
                        type: 'boolean',
                        description:
                            'Disables interaction and dims the control.',
                    },
                ]}
            />
        </Section>

        <Section id="guidance" title="Guidance">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>
                    Use a switch for an immediate on/off state; use a checkbox
                    where the choice is confirmed later by a submit.
                </li>
                <li>
                    Always provide a meaningful{' '}
                    <span className="font-mono">label</span> — use{' '}
                    <span className="font-mono">hideLabel</span> only when an
                    adjacent label is already present.
                </li>
                <li>
                    The control is fully controlled: hold the state in the
                    parent and reflect it back through{' '}
                    <span className="font-mono">checked</span>.
                </li>
            </ul>
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Use a toggle for an instant on/off setting that takes effect immediately.">
                    <ToggleSwitch checked onChange={() => undefined} label="Pay annually" />
                </Do>
                <Dont note="Don't use a toggle for a destructive action that needs confirmation — use a button instead.">
                    <ToggleSwitch checked={false} onChange={() => undefined} label="Delete my account" />
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
