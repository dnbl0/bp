import { FooterData } from '../../../lib/requestFooterData'
import { FooterMenu } from './FooterMenu'
import Link from 'next/link'
import { SquareBupaLogo } from '../../atoms/icons/SquareBupaLogo'

export const UpperFooter = ({
    aboutText,
    footerMenu,
}: {
    aboutText?: string
    footerMenu?: FooterData['footerMenu']
}) => {
    return (
        <div className="flex flex-row gap-12">
            <div className="hidden max-w-[30%] lg:block">
                <div className="mb-6">
                    <a href="/" className="cursor-pointer inline-block">
                        <span className="sr-only">Bupa Age Care</span>
                        <SquareBupaLogo />
                    </a>
                </div>
                {aboutText && (
                    <p className="font-semibold text-sm italic">{aboutText}</p>
                )}
            </div>

            {footerMenu && (
                <div className="flex-grow">
                    <FooterMenu footerMenu={footerMenu} />
                </div>
            )}
        </div>
    )
}
