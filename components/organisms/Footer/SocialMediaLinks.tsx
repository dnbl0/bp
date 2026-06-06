import { FooterData, SociaMediaService } from '../../../lib/requestFooterData'
import { Fragment, ReactNode } from 'react'

import { FacebookIcon } from '../../atoms/icons/FacebookIcon'
import { InstagramIcon } from '../../atoms/icons/InstagramIcon'
import { LinkedInIcon } from '../../atoms/icons/LinkedInIcon'
import { TwitterIcon } from '../../atoms/icons/TwitterIcon'
import { YouTubeIcon } from '../../atoms/icons/YouTubeIcon'
import { cx } from '../../../utils/cx'

export const SocialMediaLinks = ({
    socialLinks,
}: {
    socialLinks: Required<FooterData>['socialLinks']
}) => {
    return (
        <ul
            className={cx(
                'flex flex-row gap-4',
                'justify-center md:justify-start'
            )}
        >
            {socialLinks.map((item, index) => (
                <Fragment key={item.service}>
                    {item.href && (
                        <li key={index}>
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="sr-only">{item.service}</span>
                                {sociaMediaIcons[item.service]}
                            </a>
                        </li>
                    )}
                </Fragment>
            ))}
        </ul>
    )
}

const sociaMediaIcons: Record<SociaMediaService, ReactNode> = {
    Facebook: <FacebookIcon />,
    Twitter: <TwitterIcon />,
    Instagram: <InstagramIcon />,
    YouTube: <YouTubeIcon />,
    LinkedIn: <LinkedInIcon />,
}
