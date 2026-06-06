import { CallBackIcon } from '../../atoms/icons/CallBackIcon'
import { HeaderButton } from './HeaderButton'

export const CallBackButton = ({ href }: { href: string }) => {
    return (
        <a
            className="block rounded hover:bg-[#F0F9FF] active:focus:shadow-inner-blue"
            href={href}
        >
            <HeaderButton
                icon={<CallBackIcon className="fill-cyan" />}
                text="Call me back"
            />
        </a>
    )
}
