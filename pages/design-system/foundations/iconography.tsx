import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section, Example } from '../../../styleguide-components/primitives'
import { IconExplorer } from '../../../styleguide-components/primitives/IconExplorer'
import { icons } from '../../../styleguide-components/iconRegistry'
import { bupaIcons } from '../../../styleguide-components/brandAssets'
import { SearchIcon } from '../../../components/atoms/icons/SearchIcon'

const toc = [
    { id: 'explorer', title: 'Icon explorer' },
    { id: 'usage', title: 'Usage' },
]

const Iconography: NextPageWithLayout = () => (
    <DesignSystemLayout title="Iconography" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Iconography"
            status="stable"
            intro="Inline SVG components that inherit colour via fill-current, plus the Bupa PNG icon set. Click any icon to see its import path and size variants."
        />

        <Section id="explorer" title="Icon explorer">
            <IconExplorer systemIcons={icons} bupaIcons={bupaIcons} />
        </Section>

        <Section id="usage" title="Usage">
            <Example
                caption="Set colour on the icon or an ancestor with text/fill utilities, and control size with width/height utilities"
                code={`<SearchIcon className="w-6 h-6 fill-navy" />
<SearchIcon className="w-6 h-6 fill-cyan" />
<SearchIcon className="w-8 h-8 fill-fuchsia" />`}
            >
                <div className="flex items-center gap-4">
                    <SearchIcon className="w-5 h-5 fill-navy" />
                    <SearchIcon className="w-6 h-6 fill-cyan" />
                    <SearchIcon className="w-8 h-8 fill-fuchsia" />
                </div>
            </Example>
        </Section>
    </DesignSystemLayout>
)

export default Iconography
