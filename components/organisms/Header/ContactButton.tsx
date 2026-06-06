import { PersonIcon } from '../../atoms/icons/PersonIcon'
import { HeaderButton } from './HeaderButton'

export const ContactButton = ({ href }: { href: string }) => {
    return (
        <a
            className="block rounded hover:bg-[#F0F9FF] active:focus:shadow-inner-blue"
            href={href}
        >
            <HeaderButton
                icon={<PersonIcon className="fill-cyan" />}
                text="Contact us"
            />
        </a>
    )
}
