import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
} from '../../../styleguide-components/primitives'
import { Tag } from '../../../components/atoms/Tag'

const toc = [
    { id: 'examples', title: 'Examples' },
    { id: 'props', title: 'Props' },
]

const Tags: NextPageWithLayout = () => (
    <DesignSystemLayout title="Tag" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Tag"
            status="stable"
            intro="A small, colourable label that links to a page or in-page anchor. Tags are used to categorise content such as blog stories and care-home features."
        />

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
    </DesignSystemLayout>
)

export default Tags
