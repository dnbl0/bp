import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Do,
    Dont,
    DoDontGrid,
    DownloadableMark,
} from '../../../styleguide-components/primitives'
import { logos } from '../../../styleguide-components/iconRegistry'

const PrimaryLogo = logos[0]?.Component
const SquareLogo = logos[1]?.Component ?? logos[0]?.Component

const toc = [
    { id: 'marks', title: 'Marks' },
    { id: 'usage', title: 'Usage' },
]

const Logo: NextPageWithLayout = () => (
    <DesignSystemLayout title="Logo" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Logo"
            status="stable"
            intro="The brand marks are supplied as scalable SVG components: the Bupa logo, the Bupa Aged Care lockup and the heartbeat pulse. Keep clear space around them, never distort them, and ensure sufficient contrast with the background."
        />

        <Section id="marks" title="Marks">
            <p className="mb-5 text-grey dark:text-light-grey">
                Import each mark as a React component, or download it as an SVG, PNG
                or JPEG using the buttons below.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
                {logos.map(logo => (
                    <DownloadableMark key={logo.name} logo={logo} />
                ))}
            </div>
        </Section>

        <Section id="usage" title="Usage">
            <DoDontGrid>
                <Do note="Give the logo room to breathe with generous clear space.">
                    {PrimaryLogo && <PrimaryLogo className="h-12 w-auto" />}
                </Do>
                <Dont note="Don't place the logo on a low-contrast or busy background.">
                    <div className="p-2 bg-cyan-400">
                        {SquareLogo && <SquareLogo className="h-12 w-auto" />}
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Logo
