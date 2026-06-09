/* eslint-disable @next/next/no-img-element -- local, pre-sized brand documentation images served statically */
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    BrandHero,
    PullQuote,
    Section,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'
import {
    photography,
    AssetImage,
    BrandFigure,
    BrandGallery,
} from '../../../styleguide-components/brandAssets'
import { photographyQualities } from '../../../styleguide-components/brand/content'

const toc = [
    { id: 'types', title: 'Our four types' },
    { id: 'qualities', title: 'What good looks like' },
    { id: 'touch-of-blue', title: 'A touch of blue' },
    { id: 'over-image', title: 'Text over a photo' },
    { id: 'dos', title: 'Do & don’t' },
]

const types: { title: string; body: string; images: AssetImage[] }[] = [
    {
        title: 'Everyday moments',
        body: 'Everyday people living everyday lives — real, authentic people with natural expressions.',
        images: photography.everydayMoments,
    },
    {
        title: 'Bupa delivering care',
        body: 'Demonstrates our experience delivering health and care services with customers, colleagues and the community. Tight crops emphasise our focus on people.',
        images: photography.deliveringCare,
    },
    {
        title: 'Portraits',
        body: 'Portraits of people in the moment, with real, relaxed expressions in real environments. Subjects can look at, or off, camera.',
        images: photography.portraits,
    },
    {
        title: 'Everyday still-life',
        body: 'Reflects the world our customer lives in — full of life, imperfect, with irreverent moments and little touches of personality.',
        images: photography.stillLife,
    },
]

const Photography: NextPageWithLayout = () => (
    <DesignSystemLayout title="Photography" toc={toc}>
        <BrandHero
            eyebrow="Design toolkit"
            title="Photography"
            intro="Photography is always our first choice over illustration. Only use the highest-quality images — our imagery captures moments that are observational and feel real, warm and inviting."
        />

        <PullQuote cite="Keep it real">
            Photography is our first choice over illustration.
        </PullQuote>

        <Section id="types" title="Our four types of photography">
            <div className="space-y-8">
                {types.map((type, index) => (
                    <div key={type.title}>
                        <div className="flex items-center gap-3">
                            <span className="inline-flex w-7 h-7 flex-none rounded-full bg-cyan text-white text-body-small font-semibold items-center justify-center">
                                {index + 1}
                            </span>
                            <h3 className="font-semibold text-navy dark:text-white">
                                {type.title}
                            </h3>
                        </div>
                        <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                            {type.body}
                        </p>
                        <div className="mt-4">
                            <BrandGallery
                                images={type.images}
                                columns="grid-cols-2 sm:grid-cols-4"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="qualities" title="What good looks like">
            <p className="text-grey dark:text-light-grey">
                <strong>Okay isn’t good enough.</strong> No cheesy, staged or false
                images; no fake smiles, pointing fingers or golden sunsets; no perfect
                models living perfect lives. Let’s use images that are:
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {photographyQualities.map(quality => (
                    <li
                        key={quality}
                        className="flex gap-2 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-4 py-3 text-body-small text-grey dark:text-light-grey"
                    >
                        <span className="text-cyan flex-none">✓</span>
                        <span>{quality}</span>
                    </li>
                ))}
            </ul>
        </Section>

        <Section id="touch-of-blue" title="A touch of blue">
            <p className="text-grey dark:text-light-grey">
                All images should have a touch of blue — but keep it natural and not
                over-exaggerated; it can be a minor part of the image. Adjusting the
                crop, light and colour (sharpen, balance levels, lighten faces, add a
                touch of blue) achieves a look that is more uniquely Bupa. Before
                modifying photographs, make sure you have the correct usage rights —
                speak to your local brand and legal teams.
            </p>
            <div className="mt-6">
                <BrandGallery images={photography.touchOfBlue} columns="grid-cols-1 sm:grid-cols-3" />
            </div>
            <p className="mt-8 text-body-small text-grey dark:text-light-grey">
                Adjusting an image — sharpen, balance the levels, lighten faces and add
                a touch of blue — gives a look that is more uniquely Bupa:
            </p>
            <div className="mt-3">
                <BrandGallery images={photography.colourAdjust} columns="grid-cols-2 sm:grid-cols-3" />
            </div>
        </Section>

        <Section id="over-image" title="Text over a photo">
            <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>If text is used over an image, limit it to a short heading.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        Contrast between image and text must guarantee legibility —
                        adjust the photo if necessary.
                    </span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        Position the message in the part of the image with the least
                        visual noise. If the text still isn’t clear, use a message box.
                    </span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        For homepage and header photos, choose images whose focal point
                        is top-right — this works best on responsive formats.
                    </span>
                </li>
            </ul>
            <div className="mt-6 sm:max-w-md">
                <BrandFigure
                    image={photography.homepageHeader}
                    caption="A homepage/header photo with the focal point top-right, so it scales gracefully to mobile."
                />
            </div>
            <p className="mt-8 text-body-small text-grey dark:text-light-grey">
                The same scene cropped for different formats — the top-right focal
                point survives each crop:
            </p>
            <div className="mt-3">
                <BrandGallery
                    images={photography.homepageHeaderCrops}
                    columns="grid-cols-2 sm:grid-cols-4"
                />
            </div>
        </Section>

        <Section id="dos" title="Do & don’t">
            <DoDontGrid>
                <Do note="Use authentic, tightly cropped photography with a natural touch of blue.">
                    <img
                        src={photography.choosingWiselyGood.src}
                        alt={photography.choosingWiselyGood.alt}
                        loading="lazy"
                        className="w-full max-w-xs rounded-lg aspect-[3/2] object-cover"
                    />
                </Do>
                <Dont note="Don’t use staged, cheesy imagery, golden sunsets, or cut-out, monotone and black-and-white photography.">
                    <img
                        src={photography.choosingWiselyBad.src}
                        alt={photography.choosingWiselyBad.alt}
                        loading="lazy"
                        className="w-full max-w-xs rounded-lg aspect-[3/2] object-cover grayscale"
                    />
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Photography
