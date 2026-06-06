import { useState } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    Anatomy,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'
import { cx } from '../../../utils/cx'

/*
    A self-contained reproduction of the production AccordionPanel markup
    (components/molecules/blocks/AccordionBlock/AccordionPanel.tsx) so the docs
    can render a live, interactive example without the CMS data layer.
*/
const DemoPanel = ({
    header,
    children,
    first,
}: {
    header: string
    children: React.ReactNode
    first?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div
            className={cx(
                'border-b-[1px] border-cool-paper-200',
                first && 'border-t-[1px]'
            )}
        >
            <h3
                onClick={() => setIsOpen(open => !open)}
                className="group p-6 cursor-pointer select-none text-navy font-medium flex flex-row"
            >
                <span className={cx('flex-grow group-hover:underline', isOpen && 'underline')}>
                    {header}
                </span>
                <span className={cx('accordion-state-icon', isOpen && 'accordion-state-icon--open')} />
            </h3>
            <div
                className="overflow-hidden transition-height duration-300"
                style={{ height: isOpen ? 'auto' : 0 }}
            >
                <div className="pb-6 px-6 text-grey">{children}</div>
            </div>
        </div>
    )
}

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Accordion: NextPageWithLayout = () => (
    <DesignSystemLayout title="Accordion" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Accordion"
            status="stable"
            intro="A list of expandable panels that let people scan headings and reveal detail on demand. Used for FAQs and long supporting content. The plus icon rotates to a minus as a panel opens."
        />

        <ComponentHero name="AccordionBlock" />

        <Section id="example" title="Example">
            <Example surface="paper" caption="Click a heading to expand it">
                <div className="w-full bg-white">
                    <DemoPanel first header="What is residential aged care?">
                        Residential aged care provides accommodation and support for
                        older people who can no longer live at home.
                    </DemoPanel>
                    <DemoPanel header="How much does it cost?">
                        Fees depend on your financial situation and the services you
                        choose. Use the cost-of-care calculator for an estimate.
                    </DemoPanel>
                    <DemoPanel header="How do I arrange a tour?">
                        Contact your preferred care home directly, or enquire online and
                        the team will be in touch.
                    </DemoPanel>
                </div>
            </Example>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Header', description: 'The always-visible, clickable heading that toggles the panel.' },
                    { number: 2, name: 'State icon', description: 'A plus that animates to a minus to signal open/closed state.' },
                    { number: 3, name: 'Body', description: 'Rich-text content (and optional image) revealed when open.' },
                ]}
            >
                <div className="w-full max-w-sm bg-white border border-cool-paper-200 rounded">
                    <div className="flex items-center justify-between p-4 text-navy font-medium">
                        <span>Header</span>
                        <span className="accordion-state-icon" />
                    </div>
                    <div className="px-4 pb-4 text-body-small text-grey">Body content</div>
                </div>
            </Anatomy>
        </Section>

        <Section id="props" title="Props">
            <p className="text-grey dark:text-light-grey">
                <code className="font-mono text-cyan">AccordionBlock</code> takes a CMS{' '}
                <code className="font-mono text-cyan">component</code> whose{' '}
                <code className="font-mono text-cyan">itemsCollection</code> drives the
                panels. Each item maps to an{' '}
                <code className="font-mono text-cyan">AccordionItem</code>:
            </p>
            <PropsTable
                label="Field"
                rows={[
                    { name: 'heading', type: 'string', required: true, description: 'The panel header. Items without a heading are skipped.' },
                    { name: 'body', type: 'RichText', description: 'Rich-text body content. An item needs body or image to render.' },
                    { name: 'image', type: 'CmsImage', description: 'Optional image rendered above the body, capped at its natural width.' },
                    { name: 'anchorId', type: 'string', description: 'Optional scroll-target anchor for in-page navigation.' },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Use concise, question-style headings people can scan quickly.">
                    <div className="w-full max-w-xs bg-white border border-cool-paper-200 rounded p-4 text-navy font-medium flex justify-between">
                        <span>How much does it cost?</span>
                        <span className="accordion-state-icon" />
                    </div>
                </Do>
                <Dont note="Don't hide critical information that everyone needs inside a collapsed panel.">
                    <div className="w-full max-w-xs bg-white border border-cool-paper-200 rounded p-4 text-navy font-medium flex justify-between">
                        <span>Emergency contact details</span>
                        <span className="accordion-state-icon" />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Accordion
