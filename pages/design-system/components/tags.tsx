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
import { Tag } from '../../../components/atoms/Tag'
import { tagsContainerSpecs } from '../../../styleguide-components/specs/tags.specs'

const toc = [
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Tags: NextPageWithLayout = () => (
    <DesignSystemLayout title="Tags block" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Tags block"
            status="stable"
            intro="A wrapping group of Tag atoms, used to surface a set of categories or care-home features together."
        />

        <ComponentHero name="TagsBlock" />

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Group', description: 'The wrapping container that lays tags out and wraps them across lines.' },
                    { number: 2, name: 'Tag', description: 'An individual tag within the group.' },
                ]}
            >
                <div className="flex flex-row flex-wrap">
                    <Tag title="Respite care" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
                    <Tag title="Dementia support" href="#" openInNewTab={false} bgColor="c-#f0f9ff" textColor="c-#0079c8" />
                </div>
            </Anatomy>
        </Section>

        <Section id="example" title="Example">
            <Example
                code={`<div className="flex flex-row flex-wrap">
  <Tag title="Respite care" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
  <Tag title="Dementia support" href="#" openInNewTab={false} bgColor="c-#f0f9ff" textColor="c-#0079c8" />
  <Tag title="Allied health" href="#" openInNewTab={false} bgColor="c-#f8f7f4" textColor="c-#942151" />
  <Tag title="Social activities" href="#" openInNewTab={false} bgColor="c-#f2f5f7" textColor="c-#00335b" />
</div>`}
            >
                <div className="flex flex-row flex-wrap">
                    <Tag title="Respite care" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
                    <Tag title="Dementia support" href="#" openInNewTab={false} bgColor="c-#f0f9ff" textColor="c-#0079c8" />
                    <Tag title="Allied health" href="#" openInNewTab={false} bgColor="c-#f8f7f4" textColor="c-#942151" />
                    <Tag title="Social activities" href="#" openInNewTab={false} bgColor="c-#f2f5f7" textColor="c-#00335b" />
                </div>
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={tagsContainerSpecs} withTable>
                <div className="flex flex-row flex-wrap">
                    <Tag title="Respite care" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
                    <Tag title="Dementia support" href="#" openInNewTab={false} bgColor="c-#f0f9ff" textColor="c-#0079c8" />
                </div>
            </Specifications>
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

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Show a focused handful of tags so the most relevant categories stand out.">
                    <div className="flex flex-row flex-wrap">
                        <Tag title="Respite care" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
                        <Tag title="Dementia support" href="#" openInNewTab={false} bgColor="c-#f0f9ff" textColor="c-#0079c8" />
                    </div>
                </Do>
                <Dont note="Don't flood a card with tags — too many turn the block into visual noise.">
                    <div className="flex flex-row flex-wrap">
                        <Tag title="Respite care" href="#" openInNewTab={false} bgColor="c-#e1fcfd" textColor="c-#008385" />
                        <Tag title="Dementia support" href="#" openInNewTab={false} bgColor="c-#f0f9ff" textColor="c-#0079c8" />
                        <Tag title="Allied health" href="#" openInNewTab={false} bgColor="c-#f8f7f4" textColor="c-#942151" />
                        <Tag title="Social activities" href="#" openInNewTab={false} bgColor="c-#f2f5f7" textColor="c-#00335b" />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Tags
