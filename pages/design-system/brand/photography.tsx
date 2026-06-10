/* eslint-disable @next/next/no-img-element -- local, pre-sized brand documentation images served statically */
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'
import {
    photography,
    BrandFigure,
    BrandGallery,
} from '../../../styleguide-components/brandAssets'

const toc = [
    { id: 'types', title: 'Our four types' },
    { id: 'qualities', title: 'What good looks like' },
    { id: 'okay', title: "Okay isn't good enough" },
    { id: 'touch-of-blue', title: 'A touch of blue' },
    { id: 'retouching', title: 'Retouching photography' },
    { id: 'over-image', title: 'Text over a photo' },
    { id: 'choosing-wisely', title: 'Choosing wisely' },
]

const types = [
    {
        title: 'Everyday moments',
        bullets: [
            'Everyday people living everyday lives',
            'Real, authentic people',
            'Natural expressions',
        ],
        images: photography.everydayMomentsGallery,
    },
    {
        title: 'Bupa delivering care',
        bullets: [
            'Demonstrates our experience delivering health and care services',
            'With our customers, colleagues and the community',
            'Tight crops emphasise our focus on people',
        ],
        images: photography.deliveringCareGallery,
    },
    {
        title: 'Portraits',
        bullets: [
            'Portraits of people in the moment',
            'Real, relaxed expressions in real environments',
            'Subjects can look at, or off, camera',
        ],
        images: photography.portraitsGallery,
    },
    {
        title: 'Everyday still-life',
        bullets: [
            'Reflects the world our customer lives in',
            'Full of life, imperfect',
            'Irreverent moments and little touches of personality',
        ],
        images: photography.stillLifeGallery,
    },
]

const qualities = [
    'Authentic, natural and unstaged',
    'Observations in the moment',
    'Tighter crops to get closer to people and the moment',
    'Always have a touch of blue',
    'Real people with real expressions, not posed',
    'Highest quality',
]

const retouchingSteps = [
    { label: 'Original', image: photography.retouching[0] },
    { label: 'Step 1 — Sharpen image, tighten crop', image: photography.retouching[1] },
    { label: 'Step 2 — Adjust Levels to balance colours', image: photography.retouching[2] },
    { label: 'Step 3 — Adjust Brightness/Contrast to lighten faces', image: photography.retouching[3] },
    { label: 'Step 4 — Add a touch of blue', image: photography.retouching[4] },
    { label: 'Final result', image: photography.retouching[5] },
]

const choosingWiselyPairs = [
    {
        bad: photography.choosingWiselyBadGallery[0],
        badNote: "Doesn't feel like a genuine moment in time. Feels staged. Lacks emotion. The golden sunset doesn't feel natural.",
        good: photography.choosingWiselyGoodGallery[0],
        goodNote: 'This image feels like we are witnessing a genuine moment in time. The imperfect clothes and untidy garden feel authentic. The lighting is natural.',
    },
    {
        bad: photography.choosingWiselyBadGallery[1],
        badNote: "Doesn't feel like a genuine moment in time. The clothing doesn't feel genuine. The strong forward lighting and obvious retouching lack authenticity.",
        good: photography.choosingWiselyGoodGallery[1],
        goodNote: 'This image feels observational — the blurred face in the foreground gives an authentic feel. The clothing, natural lighting and facial expressions all reinforce the feeling of a real moment in time.',
    },
    {
        bad: photography.choosingWiselyBadGallery[2],
        badNote: "Swimming with dry hair and make-up doesn't feel authentic. The composition lacks interest.",
        good: photography.choosingWiselyGoodGallery[2],
        goodNote: 'This image feels authentic. We are witnessing a genuine moment in a busy pool. The subject looking off camera and the shallow depth of field creates an observational feel.',
    },
    {
        bad: photography.choosingWiselyBadGallery[3],
        badNote: 'Does not feel like a genuine moment in time.',
        good: photography.choosingWiselyGoodGallery[3],
        goodNote: 'Real, authentic and in the moment.',
    },
    {
        bad: photography.choosingWiselyBadGallery[4],
        badNote: 'Staged and unnatural.',
        good: photography.choosingWiselyGoodGallery[4],
        goodNote: 'Warm, genuine and naturally inviting.',
    },
    {
        bad: photography.choosingWiselyBadGallery[5],
        badNote: 'Lacks authenticity and real emotion.',
        good: photography.choosingWiselyGoodGallery[5],
        goodNote: 'Natural, observational and real.',
    },
]

const Photography: NextPageWithLayout = () => (
    <DesignSystemLayout title="Photography" toc={toc}>
        <PageHeader
            eyebrow="Design toolkit"
            title="Photography"
            status="stable"
            intro="Photography is always our first choice over illustration. Only use the highest-quality images — our imagery captures moments that are observational and feel real, warm and inviting."
        />

        <Section id="types" title="Our four types of photography">
            <div className="space-y-12">
                {types.map((type, index) => (
                    <div key={type.title}>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex w-7 h-7 rounded-full bg-cyan text-white text-body-small font-semibold items-center justify-center flex-none">
                                {index + 1}
                            </span>
                            <h3 className="font-semibold text-navy dark:text-white">{type.title}</h3>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-[14rem_1fr]">
                            <ul className="space-y-2">
                                {type.bullets.map(bullet => (
                                    <li
                                        key={bullet}
                                        className="flex gap-2 text-body-small text-grey dark:text-light-grey"
                                    >
                                        <span className="text-cyan flex-none">—</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            <BrandGallery
                                images={type.images}
                                columns="grid-cols-2"
                                aspect="aspect-[3/2]"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="qualities" title="What good looks like">
            <p className="text-grey dark:text-light-grey">
                <strong>Okay isn't good enough.</strong> No cheesy, staged or false
                images; no fake smiles, pointing fingers or golden sunsets; no perfect
                models living perfect lives. Let's use images that are:
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {qualities.map(quality => (
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

        <Section id="okay" title="Okay isn't good enough">
            <ul className="mb-6 space-y-2 text-body-small text-grey dark:text-light-grey">
                {[
                    'No cheesy, staged or false images',
                    'No fake smiles, pointing fingers or golden sunsets',
                    'No perfect models living perfect lives',
                ].map(item => (
                    <li key={item} className="flex gap-2">
                        <span className="text-red-500 flex-none font-semibold">✕</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
            <BrandGallery
                images={photography.rejected}
                columns="grid-cols-2 sm:grid-cols-4"
                aspect="aspect-[3/2]"
            />
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
            <div className="mt-6 space-y-5">
                <div>
                    <p className="mb-3 text-body-small font-semibold text-grey dark:text-light-grey">
                        Before — these images have no touch of blue in them
                    </p>
                    <BrandGallery
                        images={photography.touchOfBlueBefore}
                        columns="grid-cols-1 sm:grid-cols-3"
                        aspect="aspect-[3/2]"
                    />
                </div>
                <div>
                    <p className="mb-3 text-body-small font-semibold text-cyan">
                        After — a touch of blue has been added; the images have been colour balanced and sharpened
                    </p>
                    <BrandGallery
                        images={photography.touchOfBlueAfter}
                        columns="grid-cols-1 sm:grid-cols-3"
                        aspect="aspect-[3/2]"
                    />
                </div>
            </div>
        </Section>

        <Section id="retouching" title="Retouching photography">
            <p className="text-grey dark:text-light-grey">
                By adjusting the crop, light and colour within an image we can achieve a
                look that is more unique for Bupa.
            </p>
            <ol className="mt-4 space-y-2">
                {[
                    'Sharpen image and tighten crop to create more impact',
                    'Adjust Levels to balance the colour and make less red — care will need to be taken to avoid the skin tones appearing cold',
                    'Adjust Brightness/Contrast to lighten the faces and create natural lighting',
                    'Add a touch of blue',
                ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-body-small text-grey dark:text-light-grey">
                        <span className="inline-flex w-5 h-5 rounded-full bg-cyan text-white text-caption font-semibold items-center justify-center flex-none mt-0.5">
                            {i + 1}
                        </span>
                        <span>{step}</span>
                    </li>
                ))}
            </ol>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {retouchingSteps.map(step => (
                    <BrandFigure
                        key={step.label}
                        image={step.image}
                        caption={step.label}
                        aspect="aspect-[3/2]"
                    />
                ))}
            </div>
        </Section>

        <Section id="over-image" title="Text over a photo">
            <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                {[
                    'Select photos where the focal point is top-right — this works best on responsive formats.',
                    'If text is used over an image, limit it to a short heading.',
                    'Contrast between image and text must guarantee legibility — adjust the photo if necessary.',
                    'Position the message in the part of the image with the least visual noise. If the text still isn\'t clear, use a message box.',
                    'Do not cover the focal point of the photo with icons, text or a message box.',
                    'Do not use cut-out, monotone or black and white imagery.',
                ].map(item => (
                    <li key={item} className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-6">
                <BrandGallery
                    images={photography.inSitu}
                    columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    aspect="aspect-[3/2]"
                />
            </div>
        </Section>

        <Section id="choosing-wisely" title="Choosing wisely">
            <p className="mb-8 text-grey dark:text-light-grey">
                Side-by-side comparisons of images that don't work versus images that do.
            </p>
            <div className="space-y-8">
                {choosingWiselyPairs.map((pair, i) => (
                    <DoDontGrid key={i}>
                        <Dont note={pair.badNote}>
                            <img
                                src={pair.bad.src}
                                alt={pair.bad.alt}
                                loading="lazy"
                                className="w-full rounded-lg aspect-[3/2] object-cover"
                            />
                        </Dont>
                        <Do note={pair.goodNote}>
                            <img
                                src={pair.good.src}
                                alt={pair.good.alt}
                                loading="lazy"
                                className="w-full rounded-lg aspect-[3/2] object-cover"
                            />
                        </Do>
                    </DoDontGrid>
                ))}
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Photography
