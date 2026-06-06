import { BupaAgedCareLogo } from '../../atoms/icons/BupaAgedCareLogo'
import { BurgerIcon } from '../../atoms/icons/BurgerIcon'
import { BurgerNav } from './BurgerNav'
import { CloseIcon } from '../../atoms/icons/CloseIcon'
import { ContactButton } from './ContactButton'
import { SearchButton } from './SearchButton'
import { Section } from '../../atoms/Section'
import { SmallSearchInput } from '../../atoms/SmallSearchInput'
import { WideScreenNav } from './WideScreenNav'
import { cx } from '../../../utils/cx'
import { useLockBodyScroll } from 'react-use'
import { useMicroCopy } from '../../../hooks/useMicroCopy'
import { useNavigationMenu } from '../../../hooks/useNavigationMenu'
import { useEffect, useState } from 'react'
import { BookATourButton } from './BookATourButton'
import { CallNowIcon } from '../../atoms/icons/CallNowIcon'
import { CallNowButton } from './CallNowButton'
import { useRouter } from 'next/router'
import { findDeepValue, findDeepValueForPathname } from '../../../utils/findDeepValue'

export const Header = () => {
    const router = useRouter();
    const [showItems, setShowItems] = useState(true);
    const [showCallNow, setShowCallNow] = useState(true);
    const [showContactUs, setShowContactUs] = useState(true);
    const [showBookATour, setShowBookATour] = useState(true);
    const [showSearch, setShowSearch] = useState(true);


    // console.log('Current route:', router);

    const { data: menuItems } = useNavigationMenu('MainMenu')
    //TODO[Jason]: Join microCopy calls into 1 resource set call
    const { data: searchInputPlaceholder } = useMicroCopy(
        'searchInputPlaceholder'
    )
    const { data: contactUsHref } = useMicroCopy('contactUsHref')
    const { data: bookATourHref } = useMicroCopy('bookATourHref')
    const { data: headerIconPhoneNumber } = useMicroCopy('headerIconPhoneNumber')

    const [isSearchActive, setIsSearchActive] = useState(false)
    const [isBurgerNavActive, setIsBurgerNavActive] = useState(false)

    useLockBodyScroll(isBurgerNavActive)
    const wide = (
        <div className="py-4 flex flex-row gap-3 items-center min-h-[5.5rem]">
            <a className="cursor-pointer" href={'/'}>
                <span className="sr-only">Bupa Aged Care</span>
                <BupaAgedCareLogo />
            </a>

            <div className="flex-grow" >
                <div className="hidden xl:flex">
                    {showItems && menuItems && <WideScreenNav menuItems={menuItems} />}
                </div>
            </div>

            <div className="relative hidden xl:block">
                <div
                    className={cx(
                        'flex flex-row gap-4 items-center',
                        isSearchActive && 'invisible'
                    )}
                >
                    {showCallNow && headerIconPhoneNumber && <CallNowButton phoneNumber={headerIconPhoneNumber} />}
                    {showContactUs && contactUsHref && <ContactButton href={contactUsHref} />}
                    {showBookATour && bookATourHref && <BookATourButton href={bookATourHref} />}
                    {showSearch && <SearchButton onClick={() => setIsSearchActive(true)} />}
                </div>
                {isSearchActive && (
                    <div
                        className={cx(
                            'absolute inset-0',
                            'flex flex-row items-center gap-1'
                        )}
                    >
                        <div className="flex-grow">
                            <SmallSearchInput
                                allowEmptySearch
                                focusOnMount={true}
                                placeholder={
                                    searchInputPlaceholder ||
                                    searchInputPlaceholderFallback
                                }
                            />
                        </div>
                        <button
                            className="p-4"
                            onClick={() => setIsSearchActive(false)}
                        >
                            <span className="sr-only">Close</span>
                            <CloseIcon className="fill-navy" />
                        </button>
                    </div>
                )}
            </div>

            <div className="xl:hidden flex flex-row">
                <button
                    className="px-4 py-4 cursor-pointer"
                    onClick={() =>
                        !isBurgerNavActive && setIsBurgerNavActive(true)
                    }
                >
                    <span className="sr-only">Open menu</span>
                    <BurgerIcon className="fill-cyan" />
                </button>
            </div>
        </div>
    )

    useEffect(() => {
        const menuItemsToHide = findDeepValueForPathname(router, 'menuItemsToHide');
        setShowItems(!(menuItemsToHide && menuItemsToHide.includes('Hide Main Items')));
        setShowCallNow(!(menuItemsToHide && menuItemsToHide.includes('Hide Call now')));
        setShowContactUs(!(menuItemsToHide && menuItemsToHide.includes('Hide Contact')));
        setShowBookATour(!(menuItemsToHide && menuItemsToHide.includes('Hide Book a tour')));
        setShowSearch(!(menuItemsToHide && menuItemsToHide.includes('Hide Search')));
    }, [router]);

    return (
        <header className="shadow z-header">
            <Section wide={wide} />
            {menuItems && isBurgerNavActive && (
                <BurgerNav
                    menuItems={menuItems}
                    contactUsHref={contactUsHref}
                    bookATourHref={bookATourHref}
                    searchInputPlaceholder={
                        searchInputPlaceholder || searchInputPlaceholderFallback
                    }
                    onClose={() => setIsBurgerNavActive(false)}
                />
            )}
        </header>
    )
}

const searchInputPlaceholderFallback = ''
