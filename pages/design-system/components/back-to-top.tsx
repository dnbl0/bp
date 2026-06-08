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
import { ArrowUp } from '../../../components/atoms/icons/ArrowUp'
import { backToTopDefaultSpecs } from '../../../styleguide-components/specs/back-to-top.specs'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'behaviour', title: 'Behaviour' },
    { id: 'guidelines', title: 'Guidelines' },
]

const BackToTopPage: NextPageWithLayout = () => (
    <DesignSystemLayout title="Back to top" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Back to top"
            status="stable"
            intro="A floating circular control, fixed to the bottom-right of the viewport, that smooth-scrolls the page back to the top. It carries a screen-reader label and darkens on hover and press."
        />

        <ComponentHero name="BackToTop" />

        <Section id="example" title="Example">
            <p className="text-grey dark:text-light-grey">
                Shown here in place; in product it is fixed to the bottom-right corner.
            </p>
            <Example
                align="center"
                surface="tinted"
                code={`<div className="group flex cursor-pointer">
  <div className="rounded-full bg-cyan p-4 group-hover:drop-shadow group-hover:bg-[#000055] group-active:bg-[#000055]">
    <ArrowUp className="fill-white" />
  </div>
</div>`}
            >
                <div className="group flex cursor-pointer">
                    <div className="rounded-full bg-cyan p-4 group-hover:drop-shadow group-hover:bg-[#000055] group-active:bg-[#000055]">
                        <ArrowUp className="fill-white" />
                    </div>
                </div>
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={[backToTopDefaultSpecs]} withTable>
                <div className="group flex cursor-pointer">
                    <div className="rounded-full bg-cyan p-4 group-hover:drop-shadow group-hover:bg-[#000055] group-active:bg-[#000055]">
                        <ArrowUp className="fill-white" />
                    </div>
                </div>
            </Specifications>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'linkText',
                        type: 'string | undefined',
                        description: 'Accessible label for the control, used by screen readers and as the title attribute.',
                    },
                ]}
            />
        </Section>

        <Section id="behaviour" title="Behaviour">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>Clicking smooth-scrolls the window to the top.</li>
                <li>Fixed at the <code className="font-mono text-cyan">z-fixed</code> layer, offset further from the edge on larger screens.</li>
                <li>The visible label is screen-reader only; the icon communicates the action visually.</li>
            </ul>
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Reserve this control for long, scrollable pages where returning to the top saves real effort.">
                    <div className="group flex cursor-pointer">
                        <div className="rounded-full bg-cyan p-4 group-hover:drop-shadow">
                            <ArrowUp className="fill-white" />
                        </div>
                    </div>
                </Do>
                <Dont note="Don't add it to short pages that fit on one screen, where it only adds clutter.">
                    <div className="flex opacity-40">
                        <div className="rounded-full bg-cyan p-4">
                            <ArrowUp className="fill-white" />
                        </div>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default BackToTopPage
