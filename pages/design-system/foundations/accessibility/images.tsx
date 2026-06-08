import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
    Do,
    Dont,
    DoDontGrid,
    CriteriaList,
} from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'alt', title: 'Alternative text' },
    { id: 'decorative', title: 'Decorative images' },
    { id: 'icons', title: 'Icons & icon buttons' },
    { id: 'media', title: 'Audio & video' },
    { id: 'criteria', title: 'Success criteria' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Images & media" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Images & media"
            status="stable"
            intro="Anything non-text — images, icons, audio and video — needs a text alternative so the information it carries is available to people who can't see or hear it."
        />

        <Section id="alt" title="Alternative text">
            <p className="text-grey dark:text-light-grey">
                Informative images need concise{' '}
                <code className="font-mono text-cyan">alt</code> text describing
                their <em>purpose</em>, not their pixels. Ask what the image is there
                to tell the reader and write that. Don&apos;t start with “image
                of” — the screen reader already announces it as an image.
            </p>
            <DoDontGrid>
                <Do note='Describe the purpose: alt="Nurse helping a resident in the garden".'>
                    <code className="font-mono text-body-small text-dark-green">
                        alt=&quot;Nurse helping a resident in the garden&quot;
                    </code>
                </Do>
                <Dont note='Pad it with redundant words: alt="image of a photo of people".'>
                    <code className="font-mono text-body-small text-error-red">
                        alt=&quot;image of a photo of people&quot;
                    </code>
                </Dont>
            </DoDontGrid>
        </Section>

        <Section id="decorative" title="Decorative images">
            <p className="text-grey dark:text-light-grey">
                Images that add no information — background flourishes, decorative
                dividers — take an empty{' '}
                <code className="font-mono text-cyan">alt=&quot;&quot;</code> so
                screen readers skip them. An empty alt is deliberate and correct;{' '}
                <em>omitting</em> the attribute makes some screen readers read the
                file name instead.
            </p>
        </Section>

        <Section id="icons" title="Icons & icon buttons">
            <p className="text-grey dark:text-light-grey">
                A decorative icon next to a visible text label should be hidden with{' '}
                <code className="font-mono text-cyan">aria-hidden=&quot;true&quot;</code>.
                An icon-only button has no visible text, so it needs an{' '}
                <code className="font-mono text-cyan">aria-label</code> that names the
                action (&quot;Close&quot;, &quot;Search&quot;) — not the icon shape.
            </p>
        </Section>

        <Section id="media" title="Audio & video">
            <Subsection title="Captions & transcripts">
                <p className="text-grey dark:text-light-grey">
                    Pre-recorded video with meaningful audio needs synchronised{' '}
                    <strong>captions</strong>; pre-recorded audio needs a{' '}
                    <strong>transcript</strong>. Where visual information isn&apos;t
                    described in the dialogue, add an{' '}
                    <strong>audio description</strong> or an equivalent text
                    alternative.
                </p>
            </Subsection>
            <Subsection title="Auto-play">
                <p className="text-grey dark:text-light-grey">
                    Audio that plays automatically for more than three seconds must
                    have a visible control to pause or stop it, independent of the
                    system volume.
                </p>
            </Subsection>
        </Section>

        <Section id="criteria" title="Success criteria">
            <CriteriaList
                items={[
                    { id: '1.1.1', title: 'Non-text Content', level: 'A' },
                    {
                        id: '1.2.1',
                        title: 'Audio-only & Video-only (Prerecorded)',
                        level: 'A',
                    },
                    { id: '1.2.2', title: 'Captions (Prerecorded)', level: 'A' },
                    {
                        id: '1.2.3',
                        title: 'Audio Description or Media Alternative',
                        level: 'A',
                    },
                    { id: '1.2.4', title: 'Captions (Live)', level: 'AA' },
                    {
                        id: '1.2.5',
                        title: 'Audio Description (Prerecorded)',
                        level: 'AA',
                    },
                    { id: '1.4.2', title: 'Audio Control', level: 'A' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Page
