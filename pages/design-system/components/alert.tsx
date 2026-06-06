import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
} from '../../../styleguide-components/primitives'
import AlertBlock from '../../../components/molecules/blocks/AlertBlock'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
    { id: 'behaviour', title: 'Behaviour' },
]

const Alert: NextPageWithLayout = () => (
    <DesignSystemLayout title="Alert" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Alert"
            status="stable"
            intro="A dismissible, full-width notification banner for site-wide messages. It uses the alert background colour and collapses smoothly when closed."
        />

        <Section id="example" title="Example">
            <p className="text-grey dark:text-light-grey">
                Click the close icon to dismiss the banner.
            </p>
            <Example
                surface="tinted"
                code={`<AlertBlock>
  Our contact centre hours have changed over the holiday period.
</AlertBlock>`}
            >
                <div className="w-full">
                    <AlertBlock>
                        Our contact centre hours have changed over the holiday
                        period.
                    </AlertBlock>
                </div>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'children',
                        type: 'ReactNode',
                        description: 'The message content shown in the banner, centred within the available width.',
                    },
                ]}
            />
        </Section>

        <Section id="behaviour" title="Behaviour">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>The banner is dismissible; closing it animates the height to zero over 300ms.</li>
                <li>Dismissal is local to the component instance and is not persisted.</li>
                <li>The close control carries an accessible “Close” label for screen readers.</li>
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default Alert
