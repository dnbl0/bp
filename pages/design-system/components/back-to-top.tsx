import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
} from '../../../styleguide-components/primitives'
import { ArrowUp } from '../../../components/atoms/icons/ArrowUp'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
    { id: 'behaviour', title: 'Behaviour' },
]

const BackToTopPage: NextPageWithLayout = () => (
    <DesignSystemLayout title="Back to top" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Back to top"
            status="stable"
            intro="A floating circular control, fixed to the bottom-right of the viewport, that smooth-scrolls the page back to the top. It carries a screen-reader label and darkens on hover and press."
        />

        <Section id="example" title="Example">
            <p className="text-grey dark:text-light-grey">
                Shown here in place; in product it is fixed to the bottom-right corner.
            </p>
            <Example align="center" surface="tinted">
                <div className="group flex cursor-pointer">
                    <div className="rounded-full bg-cyan p-4 group-hover:drop-shadow group-hover:bg-[#000055] group-active:bg-[#000055]">
                        <ArrowUp className="fill-white" />
                    </div>
                </div>
            </Example>
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
    </DesignSystemLayout>
)

export default BackToTopPage
