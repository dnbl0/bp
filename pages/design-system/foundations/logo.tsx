import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'
import { logos, importSnippet } from '../../../styleguide-components/iconRegistry'

const PrimaryLogo = logos[0]?.Component
const SquareLogo = logos[1]?.Component ?? logos[0]?.Component

const Logo: NextPageWithLayout = () => (
    <DesignSystemLayout title="Logo">
        <PageHeader
            eyebrow="Foundations"
            title="Logo"
            status="stable"
            intro="The Bupa Aged Care logo is supplied as scalable SVG components. Keep clear space around it, never distort it, and ensure sufficient contrast with the background."
        />

        <Section id="marks" title="Marks">
            <div className="grid gap-6 sm:grid-cols-2">
                {logos.map(logo => {
                    const Mark = logo.Component
                    return (
                        <div
                            key={logo.name}
                            className="rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden"
                        >
                            <div className="flex items-center justify-center p-10 bg-white">
                                <Mark className="h-16 w-auto" />
                            </div>
                            <div className="p-4 bg-cool-paper-50 dark:bg-cool-grey">
                                <code className="font-mono text-caption text-cyan break-all">
                                    {importSnippet(logo)}
                                </code>
                            </div>
                        </div>
                    )
                })}
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
