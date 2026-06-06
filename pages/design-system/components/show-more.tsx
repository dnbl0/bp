import { useState } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
} from '../../../styleguide-components/primitives'
import { ChevronDownIcon } from '../../../components/atoms/icons/ChevronDownIcon'
import { cx } from '../../../utils/cx'

const Demo = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex flex-col items-center w-full">
            {open && (
                <div className="p-6 w-full text-grey">
                    Additional detail revealed by the control. In product this region
                    renders markdown content supplied by the CMS.
                </div>
            )}
            <button
                className="button button--ghost text-center"
                onClick={() => setOpen(o => !o)}
            >
                <span>{open ? 'Show less' : 'Show more'}</span>
                <span>
                    <ChevronDownIcon className={cx(open && 'rotate-180', 'fill-current')} />
                </span>
            </button>
        </div>
    )
}

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
]

const ShowMore: NextPageWithLayout = () => (
    <DesignSystemLayout title="Show more" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Show more"
            status="stable"
            intro="A ghost button that toggles additional markdown content into view. The chevron rotates 180° to signal the expanded state. Use it to keep long supporting copy out of the way until requested."
        />

        <ComponentHero name="ShowMoreButton" />

        <Section id="example" title="Example">
            <Example surface="paper">
                <div className="w-full">
                    <Demo />
                </div>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    { name: 'displayText', type: 'string', required: true, description: 'Markdown content revealed when expanded.' },
                    { name: 'linkShowText', type: 'string', required: true, description: 'Button label in the collapsed state.' },
                    { name: 'linkHideText', type: 'string', required: true, description: 'Button label in the expanded state.' },
                    { name: 'onShow', type: '() => void', description: 'Optional callback fired when the content is expanded.' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default ShowMore
