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
import AlertBlock from '../../../components/molecules/blocks/AlertBlock'
import { alertDefaultSpecs } from '../../../styleguide-components/specs/alert.specs'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'behaviour', title: 'Behaviour' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Alert: NextPageWithLayout = () => (
    <DesignSystemLayout title="Alert" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Alert"
            status="stable"
            intro="A dismissible, full-width notification banner for site-wide messages. It uses the alert background colour and collapses smoothly when closed."
        />

        <ComponentHero name="AlertBlock" />

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

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={[alertDefaultSpecs]} withTable>
                <div className="w-full">
                    <AlertBlock>
                        Our contact centre hours have changed over the holiday
                        period.
                    </AlertBlock>
                </div>
            </Specifications>
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

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Show a single alert for the most important site-wide message so it can't be missed.">
                    <div className="w-full">
                        <AlertBlock>
                            Our contact centre hours have changed.
                        </AlertBlock>
                    </div>
                </Do>
                <Dont note="Don't stack multiple alerts at once — competing banners dilute urgency and push content down.">
                    <div className="w-full space-y-2">
                        <AlertBlock>Holiday hours apply this week.</AlertBlock>
                        <AlertBlock>New online enquiry form is live.</AlertBlock>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Alert
