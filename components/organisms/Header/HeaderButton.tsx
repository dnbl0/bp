export const HeaderButton = ({
    icon,
    text,
}: {
    icon: React.ReactNode
    text: React.ReactNode
}) => {
    return (
        <div className="flex flex-col items-center cursor-pointer px-4 py-2">
            <div>{icon}</div>
            <div className="text-navy font-semibold whitespace-nowrap">
                {text}
            </div>
        </div>
    )
}
