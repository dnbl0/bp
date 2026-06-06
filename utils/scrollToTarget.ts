import { updateUrlHash } from './urlState'

export const scrollToTarget = (href: string) => {
    const hash = href.slice(1)

    updateUrlHash(hash)

    // Bring the target element into view
    const targetElement = document.getElementById(href.replace('#', ''))
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}
