import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../../styleguide-components/primitives'

const toc = [
    { id: 'types', title: 'Flash types' },
    { id: 'colour', title: 'Colour' },
]

const FlashContent = () => (
    <span className="flex flex-col items-center leading-none">
        <span className="text-caption opacity-90">From only</span>
        <span className="text-heading-s font-bold">$14.95</span>
        <span className="text-caption opacity-90">a week</span>
    </span>
)

const PromotionalFlashes: NextPageWithLayout = () => (
    <DesignSystemLayout title="Promotional flashes" toc={toc}>
        <PageHeader
            eyebrow="Design toolkit"
            title="Promotional flashes"
            status="stable"
            intro="Promotional flashes can be used in both digital and print to highlight an offer or call to action."
        />

        <Section id="types" title="Flash types">
            <div className="grid gap-6 sm:grid-cols-3 place-items-center">
                <figure className="text-center">
                    {/* Roundel */}
                    <div className="w-32 h-32 rounded-full bg-cyan text-white flex items-center justify-center text-center p-4">
                        <FlashContent />
                    </div>
                    <figcaption className="mt-3 text-body-small font-semibold text-navy dark:text-white">
                        Roundel
                    </figcaption>
                </figure>

                <figure className="text-center">
                    {/* Starburst — a square rotated behind itself approximates the burst */}
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <span
                            aria-hidden="true"
                            className="absolute inset-2 bg-fuchsia rotate-45"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute inset-2 bg-fuchsia"
                        />
                        <span className="relative text-white text-center p-4">
                            <FlashContent />
                        </span>
                    </div>
                    <figcaption className="mt-3 text-body-small font-semibold text-navy dark:text-white">
                        Starburst
                    </figcaption>
                </figure>

                <figure className="text-center">
                    {/* Heart */}
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <span
                            aria-hidden="true"
                            className="absolute left-1/2 top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-orange rounded-bl-[1.5rem]"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute left-[34%] top-[30%] w-16 h-16 rounded-full bg-orange"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute left-[50%] top-[30%] w-16 h-16 rounded-full bg-orange"
                        />
                        <span className="relative text-white text-center p-4">
                            <FlashContent />
                        </span>
                    </div>
                    <figcaption className="mt-3 text-body-small font-semibold text-navy dark:text-white">
                        Heart
                    </figcaption>
                </figure>
            </div>
            <p className="mt-6 text-body-small text-grey dark:text-light-grey">
                The shapes above are simplified stand-ins. Production promotional flashes
                can be downloaded from Bupa Inspire.
            </p>
        </Section>

        <Section id="colour" title="Colour">
            <p className="text-grey dark:text-light-grey">
                Flashes can appear in any colour from the primary palette or the core
                colours from the secondary palette. Keep the message short — a price, an
                offer or a single call to action.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default PromotionalFlashes
