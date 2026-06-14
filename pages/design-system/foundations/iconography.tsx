import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    MaterialSymbolsExplorer,
} from '../../../styleguide-components/primitives'
import { allSymbols } from '../../../styleguide-components/materialSymbols'

const toc = [
    { id: 'library', title: 'Library' },
    { id: 'usage', title: 'Usage' },
]

const Iconography: NextPageWithLayout = () => (
    <DesignSystemLayout title="Iconography" toc={toc} wide>
        <PageHeader
            eyebrow="Foundations"
            title="Material Symbols"
            status="stable"
            intro="Our icons are Google Material Symbols — a single variable font with over 2,500 glyphs across three styles. Adjust the fill, weight, grade and optical size to match any context, then copy the icon you need."
        />

        <Section id="library" title="Library">
            <p className="text-grey dark:text-light-grey">
                Browse the {allSymbols.length} catalogued symbols below. Choose a style,
                tune the four axes, filter by category or search by name, then click an
                icon to copy its markup — exactly like{' '}
                <a
                    href="https://fonts.google.com/icons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-cyan hover:underline"
                >
                    fonts.google.com/icons
                </a>
                .
            </p>
            <MaterialSymbolsExplorer />
        </Section>

        <Section id="usage" title="Usage">
            <p className="text-grey dark:text-light-grey">
                Load the Material Symbols stylesheet once, then render any glyph by
                putting its ligature name inside a styled <code className="font-mono text-cyan">span</code>.
                The four variable-font axes are controlled with{' '}
                <code className="font-mono text-cyan">font-variation-settings</code>.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-cool-paper-100 dark:bg-cool-grey border border-cool-paper-200 dark:border-charcoal p-4 text-caption font-mono text-grey dark:text-light-grey">
{`<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<span class="material-symbols-outlined">favorite</span>

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}`}
            </pre>
            <ul className="mt-6 space-y-2 text-body-small text-grey dark:text-light-grey">
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        <strong>FILL</strong> (0–1) switches between the outlined and filled
                        appearance; use it to signal a selected or active state.
                    </span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        <strong>Weight</strong> (100–700) sets the stroke thickness; 400 is
                        the default.
                    </span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        <strong>Grade</strong> (−25–200) fine-tunes emphasis without changing
                        the icon size — handy for dark backgrounds.
                    </span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        <strong>Optical size</strong> (20–48px) adapts the design to the
                        rendered size so strokes stay legible.
                    </span>
                </li>
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default Iconography
