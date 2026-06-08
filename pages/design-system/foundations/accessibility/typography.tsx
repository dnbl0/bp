import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Do,
    Dont,
    DoDontGrid,
    CriteriaList,
} from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'resize', title: 'Resize & zoom' },
    { id: 'reflow', title: 'Reflow' },
    { id: 'spacing', title: 'Text spacing' },
    { id: 'images-of-text', title: 'Images of text' },
    { id: 'criteria', title: 'Success criteria' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Typography & low vision" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Typography & low vision"
            status="stable"
            intro="Many people enlarge text, zoom the page or override spacing to read comfortably. Layouts must adapt to those changes without clipping, overlapping or forcing two-dimensional scrolling."
        />

        <Section id="resize" title="Resize & zoom">
            <p className="text-grey dark:text-light-grey">
                Content and functionality must remain usable when text is enlarged
                to <strong>200%</strong>. Size type in{' '}
                <code className="font-mono text-cyan">rem</code>/
                <code className="font-mono text-cyan">em</code> rather than fixed
                pixels so it responds to the user&apos;s browser and system settings,
                and never disable browser zoom with a fixed viewport scale.
            </p>
        </Section>

        <Section id="reflow" title="Reflow">
            <p className="text-grey dark:text-light-grey">
                At 400% zoom — equivalent to a <strong>320px</strong>-wide viewport —
                content must reflow into a single column without horizontal
                scrolling (tables and maps are reasonable exceptions). Build with the
                responsive layout primitives and let columns stack rather than fixing
                widths that force side-by-side content.
            </p>
            <DoDontGrid>
                <Do note="Let two-column layouts stack into one column as the viewport narrows.">
                    <div className="w-full max-w-[160px] space-y-2">
                        <div className="h-6 rounded bg-cyan-50 dark:bg-charcoal" />
                        <div className="h-6 rounded bg-cyan-50 dark:bg-charcoal" />
                    </div>
                </Do>
                <Dont note="Force a fixed multi-column width so the user must scroll sideways to read.">
                    <div className="w-[220px] max-w-none flex gap-2 overflow-hidden">
                        <div className="h-6 w-28 flex-none rounded bg-error-red/20" />
                        <div className="h-6 w-28 flex-none rounded bg-error-red/20" />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>

        <Section id="spacing" title="Text spacing">
            <p className="text-grey dark:text-light-grey">
                Users can override line height, and letter, word and paragraph
                spacing to aid readability. Nothing should clip or overlap when they
                do. Avoid fixed-height containers around text and don&apos;t truncate
                with hard heights — let blocks grow with their content.
            </p>
        </Section>

        <Section id="images-of-text" title="Images of text">
            <p className="text-grey dark:text-light-grey">
                Use real, selectable text rather than pictures of text. Real text
                scales crisply, recolours for dark mode and high-contrast modes, and
                is read by assistive technology. Logos and essential branding are the
                only exceptions.
            </p>
        </Section>

        <Section id="criteria" title="Success criteria">
            <CriteriaList
                items={[
                    { id: '1.4.4', title: 'Resize Text', level: 'AA' },
                    { id: '1.4.5', title: 'Images of Text', level: 'AA' },
                    { id: '1.4.10', title: 'Reflow', level: 'AA' },
                    { id: '1.4.12', title: 'Text Spacing', level: 'AA' },
                    {
                        id: '1.4.13',
                        title: 'Content on Hover or Focus',
                        level: 'AA',
                    },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Page
