import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    BrandHero,
    PullQuote,
    PrincipleCard,
    Section,
} from '../../../styleguide-components/primitives'
import { BlueSquare } from '../../../styleguide-components/brandPalette'
import { photography, BrandGallery } from '../../../styleguide-components/brandAssets'
import { designPrinciples, designInAction } from '../../../styleguide-components/brand/content'

const toc = [
    { id: 'principles', title: 'Our design principles' },
    { id: 'in-action', title: 'Design in action' },
]

const DesignPrinciples: NextPageWithLayout = () => (
    <DesignSystemLayout title="Design principles" toc={toc}>
        <BrandHero
            eyebrow="Brand guidelines"
            title="Four principles guide everything we design"
            intro="They keep our communications distinct, connected, simple and human — so every piece feels unmistakably Bupa."
        />

        <Section id="principles" title="Our design principles">
            <div className="grid gap-5 lg:grid-cols-2">
                {designPrinciples.map((principle, index) => (
                    <PrincipleCard
                        key={principle.title}
                        principle={principle}
                        index={index + 1}
                    />
                ))}
            </div>
        </Section>

        <Section id="in-action" title="Design in action">
            <PullQuote>
                Blue holds everything together, the square frames and structures,
                and a single clear message does the heavy lifting.
            </PullQuote>
            <p className="text-grey dark:text-light-grey">
                Across web, app, print and out-of-home, the principles combine into
                work that is recognisably ours.
            </p>
            <div className="mt-6">
                <BrandGallery
                    images={photography.designInAction}
                    columns="grid-cols-1 sm:grid-cols-2"
                />
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {designInAction.map(note => (
                    <li
                        key={note}
                        className="flex gap-3 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-4 py-3 text-body-small text-grey dark:text-light-grey"
                    >
                        <BlueSquare className="w-5 h-5 flex-none rounded-sm" />
                        <span>{note}</span>
                    </li>
                ))}
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default DesignPrinciples
