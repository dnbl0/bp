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
    Anatomy,
} from '../../../styleguide-components/primitives'
import { Tag } from '../../../components/atoms/Tag'

const toc = [
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'examples', title: 'Examples' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Tags: NextPageWithLayout = () => (
    <DesignSystemLayout title="Tag" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Tag"
            status="stable"
            intro="A small, colourable label that links to a page or in-page anchor. Tags are used to categorise content such as blog stories and care-home features."
        />

        <ComponentHero name="Tag" />

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Container', description: 'The rounded pill holding the tag.' },
                    { number: 2, name: 'Label', description: 'The category or filter text.' },
                    { number: 3, name: 'Remove', description: 'An optional trailing icon that removes the tag.' },
                ]}
            >
                <Tag title="Wellbeing" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
            </Anatomy>
        </Section>

        <Section id="examples" title="Examples">
            <Example
                caption="Tags with different colours"
                code={`<Tag
  title="Wellbeing"
  href="#"
  openInNewTab={false}
  bgColor="c-#e1fcfd"
  textColor="c-#008385"
/>`}
            >
                <Tag title="Wellbeing" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
                <Tag title="Nutrition" href="#" openInNewTab={false} bgColor="c-#f0f9ff" textColor="c-#0079c8" />
                <Tag title="Community" href="#" openInNewTab={false} bgColor="c-#f8f7f4" textColor="c-#942151" />
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    { name: 'title', type: 'string', required: true, description: 'The label shown inside the tag.' },
                    { name: 'href', type: 'string', required: true, description: 'Destination URL. An href containing "#" renders a plain anchor; otherwise a Next.js link is used.' },
                    { name: 'openInNewTab', type: 'boolean', required: true, description: 'Opens the link in a new tab with rel="noreferrer".' },
                    { name: 'bgColor', type: 'string', required: true, description: 'Background colour token. The hex after the first "-" is applied as the background.' },
                    { name: 'textColor', type: 'string', required: true, description: 'Text colour token, parsed the same way as bgColor.' },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep tag labels to one or two words so they stay scannable.">
                    <Tag title="Wellbeing" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
                </Do>
                <Dont note="Don't write a sentence in a tag — long labels defeat the at-a-glance purpose.">
                    <Tag title="Supports a range of wellbeing activities" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Tags
