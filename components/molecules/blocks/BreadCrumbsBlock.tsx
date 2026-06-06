import { BannerSection } from '../../molecules/sections/BannerSection'
import { ChevronRightIcon } from '../../atoms/icons/ChevronRightIcon'
import { Fragment } from 'react'
import { readFromLocalStorage, removeFromLocalStorage, writeToLocalStorage } from '../../../utils/localStorage'


export const setBreadcrumbBackLink = (key: string, crumb: BreadCrumb) => {
    const breadcrumbBackLink: BreadcrumbBackLink = (readFromLocalStorage('breadcrumbBackLink') ?? {}) as BreadcrumbBackLink;
    breadcrumbBackLink[key] = crumb;
    writeToLocalStorage('breadcrumbBackLink', breadcrumbBackLink);
};

const expireBreadcrumbBackLinks = () => {
    const breadcrumbBackLinks: BreadcrumbBackLink = (readFromLocalStorage('breadcrumbBackLink') ?? {}) as BreadcrumbBackLink;
    if (Object.keys(breadcrumbBackLinks).length === 0) {
        removeFromLocalStorage('breadcrumbBackLink');
        return;
    }
    Object.keys(breadcrumbBackLinks).forEach((k) => {
        const bCrumb = breadcrumbBackLinks[k];
        if (bCrumb.expiry !== undefined) {
            if (bCrumb.lastVisited !== window.location.pathname) {
                bCrumb.expiry = bCrumb.expiry! - 1;
                bCrumb.lastVisited = window.location.pathname;
                breadcrumbBackLinks[k] = bCrumb;
            } else if (bCrumb.expiry == 0) {
                delete breadcrumbBackLinks[k];
            }
        }
    });
    writeToLocalStorage('breadcrumbBackLink', breadcrumbBackLinks);
};

export interface BreadcrumbBackLink {
    [key:string]: BreadCrumb;
}

export interface BreadCrumb {
    title: string
    link: string
    expiry?: number
    lastVisited?: string
}

export const BreadCrumbsBlock = ({
    breadcrumbs,
    title,
}: {
    breadcrumbs: BreadCrumb[] | undefined
    title: string
}) => {
    expireBreadcrumbBackLinks();
    
    const BackLinks = () => {
        const BreadcrumbBackLink = readFromLocalStorage('breadcrumbBackLink') ?? {} as BreadcrumbBackLink;
        const links = Object.values(BreadcrumbBackLink);
        return (
            <div className="flex ml-auto">
                {links.map((crumb, i) => (
                        <Fragment key={i}>
                            <ChevronRightIcon className="fill-navy mx-4 my-auto transform rotate-180" />
                            <a
                                className="underline hover:text-cyan"
                                href={crumb.link}
                            >
                                {crumb.title}
                            </a>
                        </Fragment>
                    )
                )}
            </div>
        )
    }

    return (
        <BannerSection bannerLayout="12" className="block">
            <div className="flex text-sm content-end text-navy my-3">
                <div className="hidden md:flex">
                    {breadcrumbs &&
                        breadcrumbs.map((breadcrumb, i) => {
                            return (
                                <Fragment key={i}>
                                    <a
                                        className="underline hover:text-cyan"
                                        href={breadcrumb.link}
                                    >
                                        {breadcrumb.title}
                                    </a>
                                    <ChevronRightIcon className="fill-navy mx-4 my-auto" />
                                </Fragment>
                            )
                        })}
                    <span className="font-semibold">{title.split(' |')[0]}</span>
                </div>
                <BackLinks />
            </div>
        </BannerSection>
    )
}
