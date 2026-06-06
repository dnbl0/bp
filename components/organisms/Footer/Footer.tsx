import { FooterData } from '../../../lib/requestFooterData'
import { Section } from '../../atoms/Section'
import { LowerFooter } from './LowerFooter'
import { UpperFooter } from './UpperFooter'

export const Footer = ({
    aboutText,
    copyRightNotice,
    tagLine,
    finePrintLinks,
    socialLinks,
    footerMenu,
}: FooterData) => {
    return (
        <Section className="bg-navy text-white">
            <div className="py-6 md:py-12">
                <UpperFooter aboutText={aboutText} footerMenu={footerMenu} />
                <hr className="my-4 md:my-6 border-t-white" />
                <LowerFooter
                    copyRightNotice={copyRightNotice}
                    tagLine={tagLine}
                    finePrintLinks={finePrintLinks}
                    socialLinks={socialLinks}
                />
            </div>
        </Section>
    )
}
