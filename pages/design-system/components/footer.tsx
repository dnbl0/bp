import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    Anatomy,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
    Specifications,
} from '../../../styleguide-components/primitives'
import { FacebookIcon } from '../../../components/atoms/icons/FacebookIcon'
import { InstagramIcon } from '../../../components/atoms/icons/InstagramIcon'
import { LinkedInIcon } from '../../../components/atoms/icons/LinkedInIcon'
import { YouTubeIcon } from '../../../components/atoms/icons/YouTubeIcon'
import { footerDefaultSpecs } from '../../../styleguide-components/specs/footer.specs'

const menus = [
    { title: 'Aged care', links: ['Find a home', 'Types of care', 'Costs & fees'] },
    { title: 'About', links: ['Our approach', 'Careers', 'News'] },
    { title: 'Support', links: ['Contact us', 'FAQs', 'Feedback'] },
]

const FooterDemo = () => (
    <div className="w-full bg-navy text-white rounded-lg overflow-hidden">
        <div className="p-6">
            <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
                <p className="text-body-small text-light-grey">
                    Bupa Aged Care provides residential aged care and support services
                    across Australia.
                </p>
                <div className="grid grid-cols-3 gap-4">
                    {menus.map(menu => (
                        <div key={menu.title}>
                            <p className="font-semibold mb-2">{menu.title}</p>
                            <ul className="space-y-1 text-body-small text-light-grey">
                                {menu.links.map(link => (
                                    <li key={link}>{link}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="my-6 border-t-white/40" />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="text-caption text-light-grey">
                    <span className="block">© Bupa Aged Care Australia</span>
                    <span className="block">Caring for the moments that matter.</span>
                </div>
                <div className="flex gap-3">
                    {[FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon].map(
                        (Icon, index) => (
                            <Icon key={index} className="w-6 h-6 fill-white" />
                        )
                    )}
                </div>
            </div>
        </div>
    </div>
)

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Footer: NextPageWithLayout = () => (
    <DesignSystemLayout title="Footer" toc={toc}>
        <PageHeader
            eyebrow="Components · Organisms"
            title="Footer"
            status="stable"
            intro="The global site footer on a navy surface. An upper region holds the about text and navigation menus; a lower region holds the copyright, tagline, fine-print links and social media links."
        />

        <ComponentHero name="Footer" />

        <Section id="example" title="Example">
            <p className="text-grey dark:text-light-grey">
                A representative footer composed from the same structure as the
                production component.
            </p>
            <Example
                surface="paper"
                code={`<div className="w-full bg-navy text-white rounded-lg overflow-hidden">
  <div className="p-6">
    <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
      <p className="text-body-small text-light-grey">
        Bupa Aged Care provides residential aged care and support services
        across Australia.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {menus.map(menu => (
          <div key={menu.title}>
            <p className="font-semibold mb-2">{menu.title}</p>
            <ul className="space-y-1 text-body-small text-light-grey">
              {menu.links.map(link => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <hr className="my-6 border-t-white/40" />
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="text-caption text-light-grey">
        <span className="block">© Bupa Aged Care Australia</span>
        <span className="block">Caring for the moments that matter.</span>
      </div>
      <div className="flex gap-3">
        {[FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon].map(
          (Icon, index) => (
            <Icon key={index} className="w-6 h-6 fill-white" />
          )
        )}
      </div>
    </div>
  </div>
</div>`}
            >
                <FooterDemo />
            </Example>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Upper footer', description: 'About text and the multi-column footer navigation menus.' },
                    { number: 2, name: 'Divider', description: 'A hairline rule separating the upper and lower regions.' },
                    { number: 3, name: 'Lower footer', description: 'Copyright notice, tagline and fine-print legal links.' },
                    { number: 4, name: 'Social links', description: 'Facebook, Instagram, LinkedIn and YouTube icon links.' },
                ]}
            >
                <div className="w-full max-w-xs bg-navy text-white rounded p-4 text-caption space-y-2">
                    <div className="h-3 bg-white/30 rounded w-3/4" />
                    <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 bg-white/15 rounded" />
                        <div className="h-8 bg-white/15 rounded" />
                        <div className="h-8 bg-white/15 rounded" />
                    </div>
                    <hr className="border-t-white/40" />
                    <div className="flex justify-between">
                        <div className="h-3 bg-white/30 rounded w-1/3" />
                        <div className="h-3 bg-white/30 rounded w-1/4" />
                    </div>
                </div>
            </Anatomy>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={[footerDefaultSpecs]} withTable>
                <FooterDemo />
            </Specifications>
        </Section>

        <Section id="props" title="Props">
            <p className="text-grey dark:text-light-grey">
                The footer is driven by{' '}
                <code className="font-mono text-cyan">FooterData</code> requested from
                the CMS:
            </p>
            <PropsTable
                label="Field"
                rows={[
                    { name: 'aboutText', type: 'string', description: 'Short description shown in the upper footer.' },
                    { name: 'footerMenu', type: 'Menu[]', description: 'The navigation menu columns.' },
                    { name: 'copyRightNotice', type: 'string', description: 'Copyright line in the lower footer.' },
                    { name: 'tagLine', type: 'string', description: 'Brand tagline shown beside the copyright.' },
                    { name: 'finePrintLinks', type: 'Link[]', description: 'Legal and policy links.' },
                    { name: 'socialLinks', type: 'SocialLink[]', description: 'Social media destinations rendered as icons.' },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep footer link text light on the navy surface so it meets contrast against the dark background.">
                    <div className="w-full bg-navy text-white rounded p-4">
                        <p className="font-semibold mb-2">Aged care</p>
                        <ul className="space-y-1 text-body-small text-light-grey">
                            <li>Find a home</li>
                            <li>Types of care</li>
                        </ul>
                    </div>
                </Do>
                <Dont note="Don't use dark text on the navy footer — it fails contrast and becomes unreadable.">
                    <div className="w-full bg-navy text-white rounded p-4">
                        <p className="font-semibold mb-2 text-navy">Aged care</p>
                        <ul className="space-y-1 text-body-small text-navy">
                            <li>Find a home</li>
                            <li>Types of care</li>
                        </ul>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Footer
