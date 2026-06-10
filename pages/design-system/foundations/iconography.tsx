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
import { BupaIconGrid, bupaIcons } from '../../../styleguide-components/brandAssets'

const toc = [
    { id: 'library', title: 'Library' },
    { id: 'usage', title: 'Usage' },
    { id: 'bupa-icons', title: 'Bupa icon set' },
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

        <Section id="bupa-icons" title="Bupa icon set">
            <p className="text-grey dark:text-light-grey">
                The Bupa icon set covers health services, specialties, facilities and
                functional actions — {bupaIcons.length} icons supplied as PNG assets.
                These complement the inline SVG library above and are intended for use
                at <strong>48–64px</strong> with a supporting label. Full brand guidance
                lives on the{' '}
                <a
                    href="/design-system/brand/iconography"
                    className="font-semibold text-cyan hover:underline"
                >
                    Brand → Icons
                </a>{' '}
                page.
            </p>
            <div className="mt-6">
                <BupaIconGrid />
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Iconography
