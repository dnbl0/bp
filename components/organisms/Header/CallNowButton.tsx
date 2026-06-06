import { CallNowIcon } from '../../atoms/icons/CallNowIcon'
import { HeaderButton } from './HeaderButton'

export const CallNowButton = ({ phoneNumber }: { phoneNumber: string }) => {
    return (
        <a
            href={`tel:${phoneNumber}`}
            className="block rounded hover:bg-[#F0F9FF] active:focus:shadow-inner-blue"
        >
            <HeaderButton
                icon={<CallNowIcon className="fill-cyan" />}
                text={phoneNumber}
            />
        </a>
    )
}
