import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
    Specifications,
} from '../../../styleguide-components/primitives'
import { SkipLinks } from '../../../components/atoms/SkipLinks'
import { skipLinksDefaultSpecs } from '../../../styleguide-components/specs/skip-links.specs'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'usage', title: 'Usage' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Skip links" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Skip links"
            status="stable"
            intro="Visually-hidden navigation shortcuts that become visible on focus, letting keyboard and screen-reader users bypass the header and jump straight to the main landmarks. They are the first focusable element on every page."
        />

        <ComponentHero name="SkipLinks" />

        <Section id="example" title="Example">
            <p className="text-grey dark:text-light-grey">
                Skip links are invisible until focused. Press{' '}
                <span className="font-mono">Tab</span> with focus in the canvas
                below to reveal the first link.
            </p>
            <Example
                surface="tinted"
                code={`<SkipLinks
  links={[
    { href: '#main', label: 'Skip to content' },
    { href: '#footer', label: 'Skip to footer' },
    { href: '#chat', label: 'Skip to chat' },
  ]}
/>`}
            >
                <div className="w-full">
                    <SkipLinks />
                </div>
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={[skipLinksDefaultSpecs]} withTable>
                <div className="w-full">
                    <SkipLinks />
                </div>
            </Specifications>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'links',
                        type: 'SkipLink[]',
                        description:
                            'The destinations offered. Each SkipLink has an href (in-page anchor) and a label. Defaults to content, footer and chat.',
                    },
                ]}
            />
        </Section>

        <Section id="usage" title="Usage">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>
                    Render <span className="font-mono">SkipLinks</span> as the
                    very first element inside the page template, before the
                    header.
                </li>
                <li>
                    Ensure each target id (e.g.{' '}
                    <span className="font-mono">#main</span>,{' '}
                    <span className="font-mono">#footer</span>) exists on the
                    page and can receive focus.
                </li>
                <li>
                    The links are off-screen until focused, then pin to the
                    top-left at the fixed layer so they sit above the header.
                </li>
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default Page
