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
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
]

const Tags: NextPageWithLayout = () => (
    <DesignSystemLayout title="Tags block" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Tags block"
            status="stable"
            intro="A wrapping group of Tag atoms, used to surface a set of categories or care-home features together."
        />

        <Section id="example" title="Example">
            <Example>
                <div className="flex flex-row flex-wrap">
                    <Tag title="Respite care" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
                    <Tag title="Dementia support" href="#" openInNewTab={false} bgColor="c-#f0f9ff" textColor="c-#0079c8" />
                    <Tag title="Allied health" href="#" openInNewTab={false} bgColor="c-#f8f7f4" textColor="c-#942151" />
                    <Tag title="Social activities" href="#" openInNewTab={false} bgColor="c-#f2f5f7" textColor="c-#00335b" />
                </div>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <p className="text-grey dark:text-light-grey">
                The block takes a CMS collection whose items each render a{' '}
                <code className="font-mono text-cyan">Tag</code>. See the{' '}
                <a className="text-cyan hover:underline" href="/design-system/components/tag">
                    Tag
                </a>{' '}
                page for the per-tag fields.
            </p>
            <PropsTable
                label="Field"
                rows={[
                    { name: 'items', type: 'CmsTagBlock[]', description: 'The tags to render; nullish items are filtered out.' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Tags
