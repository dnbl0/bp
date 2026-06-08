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
    Anatomy,
} from '../../../styleguide-components/primitives'
import { ChevronDownIcon } from '../../../components/atoms/icons/ChevronDownIcon'
import { cx } from '../../../utils/cx'
import { showMoreDefaultSpecs } from '../../../styleguide-components/specs/show-more.specs'

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
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
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

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Content region', description: 'The collapsible area that is clamped when collapsed.' },
                    { number: 2, name: 'Fade', description: 'An optional gradient hinting there is more content below.' },
                    { number: 3, name: 'Toggle', description: 'The show more / show less control that expands the region.' },
                ]}
            >
                <div className="w-full">
                    <Demo />
                </div>
            </Anatomy>
        </Section>

        <Section id="example" title="Example">
            <Example
                surface="paper"
                code={`const [open, setOpen] = useState(false)

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
</div>`}
            >
                <div className="w-full">
                    <Demo />
                </div>
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={showMoreDefaultSpecs} withTable>
                <div className="w-full">
                    <Demo />
                </div>
            </Specifications>
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

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Swap the label to match the state, e.g. 'Show more' when collapsed and 'Show less' when expanded.">
                    <button className="button button--ghost text-center">
                        <span>Show more</span>
                        <span>
                            <ChevronDownIcon className="fill-current" />
                        </span>
                    </button>
                </Do>
                <Dont note="Don't hide essential content behind it — reserve it for optional supporting detail.">
                    <button className="button button--ghost text-center">
                        <span>Show price</span>
                        <span>
                            <ChevronDownIcon className="fill-current" />
                        </span>
                    </button>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default ShowMore
