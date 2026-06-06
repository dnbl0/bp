import { ArrowUp } from './icons/ArrowUp'

export const BackToTop = ({ linkText }: { linkText: string | undefined }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }
    return (
        <div
            className="group flex fixed right-3 md:right-12 bottom-12 cursor-pointer z-fixed"
            id="back-to-top"
        >
            <span className="sr-only">{linkText}</span>
            <a title={linkText} onClick={scrollToTop}>
                <div className="rounded-full bg-cyan p-4 group-hover:drop-shadow group-hover:bg-[#000055] group-active:bg-[#000055]">
                    <ArrowUp className="fill-white" />
                </div>
            </a>
        </div>
    )
}
