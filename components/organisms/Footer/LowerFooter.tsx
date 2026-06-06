import { FooterData } from '../../../lib/requestFooterData'
import { MenuItem } from '../../../types/menuItem'
import { cx } from '../../../utils/cx'
import { FinePrintLinks } from './FinePrintLinks'
import { SocialMediaLinks } from './SocialMediaLinks'

export const LowerFooter = ({
    copyRightNotice,
    tagLine,
    finePrintLinks,
    socialLinks,
}: {
    copyRightNotice?: string
    tagLine?: string
    finePrintLinks?: MenuItem[]
    socialLinks?: FooterData['socialLinks']
}) => {
    return (
        <div
            className={cx(
                'text-center md:text-left',
                'flex flex-col gap-2',
                'md:grid',
                'md:gap-x-4 md:gap-y-4',
                'md:grid-rows-[auto_auto]',
                'md:grid-cols-[auto_auto]'
            )}
        >
            {socialLinks && (
                <div className="col-start-1">
                    <SocialMediaLinks socialLinks={socialLinks} />
                </div>
            )}

            {finePrintLinks && (
                <div className="col-start-1">
                    <FinePrintLinks finePrintLinks={finePrintLinks} />
                </div>
            )}

            <div className="col-start-2 row-start-1 row-span-2">
                <div
                    className={cx(
                        'text-sm',
                        'flex-row justify-end items-center gap-4 h-full',
                        'md:flex'
                    )}
                >
                    <div
                        className={cx(
                            'font-semibold',
                            'whitespace-nowrap',
                            'hidden lg:block'
                        )}
                    >
                        {tagLine}
                    </div>
                    <div className="md:whitespace-nowrap">
                        {copyRightNotice}
                    </div>
                </div>
            </div>
        </div>
    )
}
