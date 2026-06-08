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
import {
    buttonPrimaryStandardSpecs,
    buttonPrimaryGiantSpecs,
    buttonPrimarySmallSpecs,
    buttonSecondaryStandardSpecs,
} from '../../../styleguide-components/specs/button.specs'

const toc = [
    { id: 'variants', title: 'Variants' },
    { id: 'sizes', title: 'Sizes' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'states', title: 'States' },
    { id: 'inverse', title: 'Inverse' },
    { id: 'api', title: 'Class API' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Button: NextPageWithLayout = () => (
    <DesignSystemLayout title="Button" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Button"
            status="stable"
            intro="Buttons trigger actions. They are styled entirely with the .button class and its modifiers, so any <button> or <a> can become one. Use exactly one primary button per view to keep the call to action clear."
        />

        <ComponentHero name="Button" />

        <Section id="variants" title="Variants">
            <p className="text-grey dark:text-light-grey">
                Four variants express decreasing emphasis: primary, secondary,
                ghost and tertiary.
            </p>
            <Example
                caption="The four button variants"
                code={`<button className="button">Primary</button>
<button className="button button--secondary">Secondary</button>
<button className="button button--ghost">Ghost</button>
<button className="button button--tertiary">Tertiary</button>`}
            >
                <button className="button">Primary</button>
                <button className="button button--secondary">Secondary</button>
                <button className="button button--ghost">Ghost</button>
                <button className="button button--tertiary">Tertiary</button>
            </Example>
            <p className="text-grey dark:text-light-grey">
                A <code className="font-mono text-cyan">--pink</code> modifier recolours
                primary buttons for campaign contexts.
            </p>
            <Example
                caption="Pink modifier"
                code={`<button className="button button--pink">Enquire now</button>`}
            >
                <button className="button button--pink">Enquire now</button>
            </Example>
        </Section>

        <Section id="sizes" title="Sizes">
            <Example
                align="center"
                caption="Giant, standard and small"
                code={`<button className="button button--giant">Giant</button>
<button className="button">Standard</button>
<button className="button button--small">Small</button>`}
            >
                <button className="button button--giant">Giant</button>
                <button className="button">Standard</button>
                <button className="button button--small">Small</button>
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Each button variant and size has precise spacing, sizing, and color specifications. Click "Show specs" to see annotated measurements.
            </p>
            <h3 className="text-heading-sm font-semibold mt-8 mb-4">Primary Standard</h3>
            <Specifications variant="Primary Standard" groups={buttonPrimaryStandardSpecs} withTable>
                <button className="button">Primary Button</button>
            </Specifications>

            <h3 className="text-heading-sm font-semibold mt-8 mb-4">Primary Giant</h3>
            <Specifications variant="Primary Giant" groups={buttonPrimaryGiantSpecs} withTable>
                <button className="button button--giant">Giant Button</button>
            </Specifications>

            <h3 className="text-heading-sm font-semibold mt-8 mb-4">Primary Small</h3>
            <Specifications variant="Primary Small" groups={buttonPrimarySmallSpecs} withTable>
                <button className="button button--small">Small</button>
            </Specifications>

            <h3 className="text-heading-sm font-semibold mt-8 mb-4">Secondary Standard</h3>
            <Specifications variant="Secondary Standard" groups={buttonSecondaryStandardSpecs} withTable>
                <button className="button button--secondary">Secondary</button>
            </Specifications>
        </Section>

        <Section id="states" title="States">
            <Example
                caption="Default and disabled"
                code={`<button className="button">Default</button>
<button className="button" disabled>Disabled</button>`}
            >
                <button className="button">Default</button>
                <button className="button" disabled>
                    Disabled
                </button>
            </Example>
            <p className="text-grey dark:text-light-grey">
                Hover, active and focus states are built in. Focus shows a 4px
                focus-blue ring for keyboard users via the global focus styles.
            </p>
        </Section>

        <Section id="inverse" title="Inverse">
            <p className="text-grey dark:text-light-grey">
                Add <code className="font-mono text-cyan">--inverse</code> when placing
                buttons on a dark or coloured surface.
            </p>
            <Example
                surface="dark"
                caption="Inverse variants on a navy surface"
                code={`<button className="button button--inverse">Primary</button>
<button className="button button--secondary button--inverse">Secondary</button>
<button className="button button--ghost button--inverse">Ghost</button>`}
            >
                <button className="button button--inverse">Primary</button>
                <button className="button button--secondary button--inverse">
                    Secondary
                </button>
                <button className="button button--ghost button--inverse">Ghost</button>
            </Example>
        </Section>

        <Section id="api" title="Class API">
            <PropsTable
                label="Class"
                rows={[
                    { name: 'button', type: 'base', description: 'Required base class for every button.' },
                    { name: 'button--secondary', type: 'variant', description: 'Outlined, lower-emphasis action.' },
                    { name: 'button--ghost', type: 'variant', description: 'Text-only action with no border or fill.' },
                    { name: 'button--tertiary', type: 'variant', description: 'Inline, link-like action that underlines on hover.' },
                    { name: 'button--giant', type: 'size', description: 'Large 20×40 padding for prominent CTAs.' },
                    { name: 'button--small', type: 'size', description: 'Compact 3×12 padding for dense UI.' },
                    { name: 'button--inverse', type: 'modifier', description: 'Recolours the button for dark/coloured backgrounds.' },
                    { name: 'button--pink', type: 'modifier', description: 'Campaign pink recolour for primary buttons.' },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Pair one primary button with a secondary for the lower-priority choice.">
                    <div className="flex gap-3">
                        <button className="button">Save</button>
                        <button className="button button--secondary">Cancel</button>
                    </div>
                </Do>
                <Dont note="Don't compete two primary buttons against each other.">
                    <div className="flex gap-3">
                        <button className="button">Save</button>
                        <button className="button">Cancel</button>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Button
