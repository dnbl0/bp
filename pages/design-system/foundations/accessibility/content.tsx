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
    { id: 'plain-language', title: 'Plain language' },
    { id: 'inclusive', title: 'Inclusive language' },
    { id: 'links', title: 'Link text' },
    { id: 'predictable', title: 'Predictable & consistent' },
    { id: 'time', title: 'Time limits' },
    { id: 'criteria', title: 'Success criteria' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Content & writing" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Content & writing"
            status="stable"
            intro="Clear writing is an accessibility feature. It helps people with cognitive and learning differences, non-native speakers, screen-reader users and anyone who is tired, stressed or in a hurry — which is everyone, sometimes."
        />

        <Section id="plain-language" title="Plain language">
            <p className="text-grey dark:text-light-grey">
                Write in plain language aimed at a reading age of around{' '}
                <strong>12–14</strong>. Prefer short sentences and common words, lead
                with the point, and expand an abbreviation or acronym on first use.
                Avoid jargon, idioms and metaphors that don&apos;t translate
                literally. Break content up with headings and lists so it can be
                skimmed.
            </p>
            <DoDontGrid>
                <Do note="Lead with the action in clear, direct words.">
                    <span className="text-body-small text-dark-green font-semibold">
                        Choose your cover, then add extras.
                    </span>
                </Do>
                <Dont note="Bury the point under jargon and qualifiers.">
                    <span className="text-body-small text-error-red">
                        Cover selection should be undertaken prior to the
                        consideration of ancillary inclusions.
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>

        <Section id="inclusive" title="Inclusive language">
            <p className="text-grey dark:text-light-grey">
                Use language that includes everyone. Prefer &quot;you&quot; and avoid
                gendered terms where a neutral one works. Be careful borrowing
                disability words for UI states — say a control is{' '}
                <strong>turned off</strong>, <strong>inactive</strong> or{' '}
                <strong>unavailable</strong> rather than &quot;disabled&quot; when you
                mean its state. Put people first and don&apos;t use a condition as a
                label.
            </p>
        </Section>

        <Section id="links" title="Link text">
            <p className="text-grey dark:text-light-grey">
                Make link text describe its destination so it stands alone in a screen
                reader&apos;s list of links. &quot;Read the cover guide&quot; works;
                &quot;click here&quot; and &quot;read more&quot; repeated down a page
                do not.
            </p>
        </Section>

        <Section id="predictable" title="Predictable & consistent">
            <p className="text-grey dark:text-light-grey">
                Keep behaviour predictable: changing a setting or focusing a field
                should not automatically navigate or submit without warning. Label the
                same thing the same way everywhere, keep navigation in a consistent
                order across pages, and place help mechanisms (contact, chat) in the
                same relative spot throughout a flow (WCAG 2.2).
            </p>
        </Section>

        <Section id="time" title="Time limits">
            <p className="text-grey dark:text-light-grey">
                Avoid time limits where you can. Where a session must expire, warn the
                user before it does and let them extend it — reading, thinking and
                form-filling all take some people much longer, and losing entered data
                to a silent timeout is a real barrier.
            </p>
        </Section>

        <Section id="criteria" title="Success criteria">
            <CriteriaList
                items={[
                    { id: '2.2.1', title: 'Timing Adjustable', level: 'A' },
                    { id: '3.1.1', title: 'Language of Page', level: 'A' },
                    { id: '3.1.2', title: 'Language of Parts', level: 'AA' },
                    { id: '3.2.3', title: 'Consistent Navigation', level: 'AA' },
                    {
                        id: '3.2.4',
                        title: 'Consistent Identification',
                        level: 'AA',
                    },
                    {
                        id: '3.2.6',
                        title: 'Consistent Help',
                        level: 'A',
                        isNew: true,
                    },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Page
