import { BookATourButton } from './BookATourButton'
import { CallBackButton } from './CallBackButton'
import { ContactButton } from './ContactButton'

export const BurgerNavBottom = ({
    contactUsHref,
    bookATourHref,
    onClose,
}: {
    contactUsHref: string
    bookATourHref: string
    onClose: () => void
}) => {
    return (
        <div
            className="flex flex-row justify-center gap-6 py-6 px-6"
            onClick={onClose}
        >
            <ContactButton href={contactUsHref} />
            <BookATourButton href={bookATourHref} />
        </div>
    )
}
