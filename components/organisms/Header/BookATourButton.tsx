import HomeIcon from '../../atoms/icons/HomeIcon'
import { HeaderButton } from './HeaderButton'

export const BookATourButton = ({ href }: { href: string }) => {
    return (
        <a
            className="block rounded hover:bg-[#F0F9FF] active:focus:shadow-inner-blue"
            href={href}
            data-link-type="cta-button-book-a-tour"
        >
            <HeaderButton
                icon={<HomeIcon className="fill-cyan" />}
                text="Book a tour"
            />
        </a>
    )
}
