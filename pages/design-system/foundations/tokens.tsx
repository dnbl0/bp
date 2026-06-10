import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    SwatchGrid,
    TokenTable,
    TokenName,
} from '../../../styleguide-components/primitives'
import type { TokenRow } from '../../../styleguide-components/primitives'
import {
    animationDelays,
    colorGroups,
    elevation,
    layering,
    motion,
    radiusScale,
    spacingScale,
    typeScale,
} from '../../../styleguide-components/tokens'

const toc = [
    { id: 'color', title: 'Color' },
    { id: 'typography', title: 'Typography' },
    { id: 'spacing', title: 'Spacing' },
    { id: 'radius', title: 'Radius' },
    { id: 'elevation', title: 'Elevation' },
    { id: 'layering', title: 'Layering' },
    { id: 'motion', title: 'Motion' },
]

/** Strip the parenthetical px hint, e.g. "0.5rem (8px)" -> "0.5rem". */
const rawValue = (value: string): string => value.split(' ')[0]

const typeRows: TokenRow[] = typeScale.map(step => ({
    token: step.token,
    value: `${step.sizes.base} → ${step.sizes.lg}`,
    preview: (
        <span
            className="text-navy dark:text-white"
            style={{ fontSize: step.sizes.base, lineHeight: 1 }}
        >
            Ag
        </span>
    ),
    description: step.cssVar,
}))

const spacingRows: TokenRow[] = spacingScale.map(token => ({
    token: `p-${token.token} · m-${token.token} · gap-${token.token}`,
    value: token.value,
}))

const radiusRows: TokenRow[] = radiusScale.map(token => ({
    token: token.token,
    value: token.value,
    preview: (
        <div
            className="w-10 h-10 bg-cyan-50 border border-cyan"
            style={{ borderRadius: rawValue(token.value) }}
        />
    ),
}))

const elevationRows: TokenRow[] = elevation.map(shadow => ({
    token: shadow.token,
    value: shadow.value,
    description: shadow.description,
    preview: (
        <div
            className="w-16 h-10 rounded-lg bg-white"
            style={{ boxShadow: shadow.value }}
        />
    ),
}))

const motionRows: TokenRow[] = [...motion, ...animationDelays].map(token => ({
    token: token.token,
    value: token.value,
}))

const Tokens: NextPageWithLayout = () => (
    <DesignSystemLayout title="Design tokens" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Design tokens"
            status="stable"
            intro="Every token on this page is read live from tailwind.config.js and typography.css — the production source of truth — so the reference can never drift from the real theme. Use this as the one-stop lookup; each section links to its deep-dive foundations page."
        />

        <p className="text-grey dark:text-light-grey">
            New to tokens? See{' '}
            <Link href="/design-system/foundations/token-anatomy">
                <a className="text-cyan font-semibold hover:underline">
                    Anatomy of a token
                </a>
            </Link>{' '}
            for how to read these names and how the tiers fit together.
        </p>

        <Section id="color" title="Color">
            <p className="text-grey dark:text-light-grey">
                The full palette grouped into primary, secondary, UI and
                background families. See{' '}
                <Link href="/design-system/foundations/color">
                    <a className="text-cyan font-semibold hover:underline">
                        Color
                    </a>
                </Link>{' '}
                for usage guidance and contrast notes.
            </p>
            <TokenName
                segments={[
                    { text: 'bg', label: 'Property', description: 'Background colour (also text, border).' },
                    { text: 'cyan', label: 'Palette', description: 'The named colour family in the theme.' },
                    { text: '50', label: 'Tint step', description: 'The lightness stop within that family.' },
                ]}
            />
            {colorGroups.map(group => (
                <SwatchGrid key={group.name} group={group} />
            ))}
        </Section>

        <Section id="typography" title="Typography">
            <p className="text-grey dark:text-light-grey">
                The semantic, responsive type scale. Values shown are the base
                and large-breakpoint sizes; full detail lives on{' '}
                <Link href="/design-system/foundations/typography">
                    <a className="text-cyan font-semibold hover:underline">
                        Typography
                    </a>
                </Link>
                .
            </p>
            <TokenName
                segments={[
                    { text: 'text', label: 'Property', description: 'Sets the font size.' },
                    { text: 'heading', label: 'Role', description: 'The semantic role in the type scale.' },
                    { text: 'l', label: 'Scale step', description: 'The size step: xl, l, m, s.' },
                ]}
            />
            <TokenTable rows={typeRows} withPreview withDescription />
        </Section>

        <Section id="spacing" title="Spacing">
            <p className="text-grey dark:text-light-grey">
                The 4px spacing scale, applied through padding, margin and gap
                utilities.
            </p>
            <TokenName
                segments={[
                    { text: 'p', label: 'Property', description: 'Padding on all sides (also m for margin, gap for gaps).' },
                    { text: '3', label: 'Spacing step', description: 'The step on the 4px scale; step 3 resolves to 12px.' },
                ]}
            />
            <TokenTable rows={spacingRows} />
        </Section>

        <Section id="radius" title="Radius">
            <p className="text-grey dark:text-light-grey">
                Corner-radius tokens for cards, inputs and pills.
            </p>
            <TokenTable rows={radiusRows} withPreview />
        </Section>

        <Section id="elevation" title="Elevation">
            <p className="text-grey dark:text-light-grey">
                Resting and hover shadows. See{' '}
                <Link href="/design-system/foundations/elevation">
                    <a className="text-cyan font-semibold hover:underline">
                        Elevation
                    </a>
                </Link>{' '}
                for when to use each.
            </p>
            <TokenTable rows={elevationRows} withPreview withDescription />
        </Section>

        <Section id="layering" title="Layering">
            <p className="text-grey dark:text-light-grey">
                The named z-index scale for predictable stacking. See{' '}
                <Link href="/design-system/foundations/layering">
                    <a className="text-cyan font-semibold hover:underline">
                        Layering
                    </a>
                </Link>
                .
            </p>
            <TokenTable rows={layering.map(l => ({ token: l.token, value: l.value }))} />
        </Section>

        <Section id="motion" title="Motion">
            <p className="text-grey dark:text-light-grey">
                Animation utilities and staggered delays. See{' '}
                <Link href="/design-system/foundations/motion">
                    <a className="text-cyan font-semibold hover:underline">
                        Motion
                    </a>
                </Link>
                .
            </p>
            <TokenTable rows={motionRows} />
        </Section>
    </DesignSystemLayout>
)

export default Tokens
