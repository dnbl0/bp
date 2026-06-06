import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    IconGallery,
    Example,
} from '../../../styleguide-components/primitives'
import { productIcons } from '../../../styleguide-components/iconRegistry'
import { SearchIcon } from '../../../components/atoms/icons/SearchIcon'

const toc = [
    { id: 'library', title: 'Library' },
    { id: 'usage', title: 'Usage' },
]

const Iconography: NextPageWithLayout = () => (
    <DesignSystemLayout title="Iconography" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Iconography"
            status="stable"
            intro="Icons are inline SVG React components that inherit colour from their parent via fill-current. Size them with width and height utilities and colour them with text/fill utilities."
        />

        <Section id="library" title="Library">
            <p className="text-grey dark:text-light-grey">
                Click any icon to copy its import. {productIcons.length} icons are
                available.
            </p>
            <IconGallery icons={productIcons} />
        </Section>

        <Section id="usage" title="Usage">
            <p className="text-grey dark:text-light-grey">
                Icons default to{' '}
                <code className="font-mono text-cyan">fill-current</code>, so set the
                colour on the icon or an ancestor and the size explicitly.
            </p>
            <Example
                caption="Sizing and colouring an icon"
                code={`<SearchIcon className="w-6 h-6 fill-navy" />`}
            >
                <SearchIcon className="w-5 h-5 fill-navy" />
                <SearchIcon className="w-6 h-6 fill-cyan" />
                <SearchIcon className="w-8 h-8 fill-fuchsia" />
            </Example>
        </Section>
    </DesignSystemLayout>
)

export default Iconography
