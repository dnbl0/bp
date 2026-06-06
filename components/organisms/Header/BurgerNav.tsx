import { MenuItem } from '../../../types/menuItem'
import { FullScreenModal } from '../../atoms/FullScreenModal'
import { BurgerNavBottom } from './BurgerNavBottom'
import { BurgerNavMenuItems } from './BurgerNavMenuItems'
import { BurgerNavTop } from './BurgerNavTop'
import { SmallSearchInput } from '../../atoms/SmallSearchInput'

export const BurgerNav = ({
    menuItems,
    contactUsHref,
    bookATourHref,
    searchInputPlaceholder,
    onClose,
}: {
    menuItems: MenuItem[]
    contactUsHref: string | undefined
    bookATourHref: string | undefined
    searchInputPlaceholder: string
    onClose: () => void
}) => {
    return (
        <FullScreenModal>
            <div className="bg-white h-full w-full">
                <div className="flex flex-col h-full">
                    <div
                        className="overflow-y-scroll grow"
                        // iOS fix: Prevent scrolling the body when scrolling the modal
                        onTouchMove={e => e.stopPropagation()}
                    >
                        <BurgerNavTop onClose={onClose} />
                        <div className="p-6">
                            <SmallSearchInput
                                allowEmptySearch
                                focusOnMount={false}
                                placeholder={searchInputPlaceholder}
                            />
                        </div>
                        <BurgerNavMenuItems
                            menuItems={menuItems}
                            onNavigate={onClose}
                        />
                    </div>
                    {contactUsHref && bookATourHref && (
                        <BurgerNavBottom
                            onClose={onClose}
                            contactUsHref={contactUsHref}
                            bookATourHref={bookATourHref}
                        />
                    )}
                </div>
            </div>
        </FullScreenModal>
    )
}
