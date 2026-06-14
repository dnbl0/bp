import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { BupaLogo } from '../components/atoms/icons/BupaLogo'
import { ChevronDownIcon } from '../components/atoms/icons/ChevronDownIcon'
import { cx } from '../utils/cx'
import { switcherBrands, brandGuidelines } from './brands'
import { useBrand } from './BrandContext'

const brandIconMap: Record<string, string> = {
    'health-care':       '/brand-assets/bupa-brand-icons/health-care/health-care.png',
    'dental':            '/brand-assets/bupa-brand-icons/dental/dental.png',
    'aged-care':         '/brand-assets/bupa-brand-icons/aged-care/aged-care.png',
    'corporate-business':'/brand-assets/bupa-brand-icons/corporate/corporate.png',
    'vision':            '/brand-assets/bupa-brand-icons/optical/optical.png',
}

/**
 * The global brand switcher in the header, modelled on Primer's site switcher.
 * Lists the shared core plus every sub-brand, marks the active one and
 * navigates to each brand's landing page. Supports keyboard navigation and
 * closes on Escape or an outside click.
 */
export const BrandSwitcher = () => {
    const brand = useBrand()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

    // Close on an outside click.
    useEffect(() => {
        if (!open) return
        const onPointerDown = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        window.addEventListener('mousedown', onPointerDown)
        return () => window.removeEventListener('mousedown', onPointerDown)
    }, [open])

    // Move focus onto the highlighted item while the menu is open.
    useEffect(() => {
        if (open) itemRefs.current[active]?.focus()
    }, [open, active])

    const openMenu = () => {
        const current = switcherBrands.findIndex(b => b.id === brand.id)
        setActive(current === -1 ? 0 : current)
        setOpen(true)
    }

    const onTriggerKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openMenu()
        }
    }

    const onMenuKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            event.preventDefault()
            setOpen(false)
            return
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            setActive(prev => (prev + 1) % switcherBrands.length)
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActive(prev => (prev - 1 + switcherBrands.length) % switcherBrands.length)
        }
    }

    return (
        <div ref={containerRef} className="relative flex-none">
            <button
                type="button"
                onClick={() => (open ? setOpen(false) : openMenu())}
                onKeyDown={onTriggerKeyDown}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="bds-brand-menu"
                className={cx(
                    'flex items-center gap-2 px-3 h-9 rounded-lg text-body-small font-semibold bg-white dark:bg-cool-grey border-2 border-cool-paper-200 dark:border-charcoal text-navy dark:text-white hover:border-cyan dark:hover:border-cyan transition-colors min-w-[10rem]',
                    open && 'border-cyan dark:border-cyan'
                )}
            >
                <span className="flex-1 text-left truncate">
                    {brand.isCore
                        ? 'Bupa core'
                        : brand.id === brandGuidelines.id
                          ? 'Select brand'
                          : brand.label}
                </span>
                <ChevronDownIcon
                    className={cx(
                        'w-3 h-3 flex-none fill-current transition-transform',
                        open && 'rotate-180'
                    )}
                />
            </button>

            {open && (
                <ul
                    id="bds-brand-menu"
                    role="menu"
                    aria-label="Switch brand"
                    onKeyDown={onMenuKeyDown}
                    className="absolute left-0 z-dropdown mt-2 w-72 max-h-[70vh] overflow-y-auto rounded-xl bg-white dark:bg-cool-grey border border-cool-paper-200 dark:border-charcoal shadow p-1.5"
                >
                    {switcherBrands.map((item, index) => {
                        const current = item.id === brand.id
                        return (
                            <li key={item.id} role="none">
                                <Link href={item.basePath}>
                                    <a
                                        ref={el => (itemRefs.current[index] = el)}
                                        role="menuitem"
                                        aria-current={current ? 'true' : undefined}
                                        onClick={() => setOpen(false)}
                                        onMouseEnter={() => setActive(index)}
                                        className={cx(
                                            'flex items-center gap-2 px-3 py-2 rounded-lg outline-none',
                                            index === active
                                                ? 'bg-cool-paper-100 dark:bg-charcoal'
                                                : 'hover:bg-cool-paper-100 dark:hover:bg-charcoal'
                                        )}
                                    >
                                        {brandIconMap[item.id] ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={brandIconMap[item.id]}
                                                alt=""
                                                className="h-5 w-5 flex-none rounded-sm object-contain"
                                            />
                                        ) : (
                                            <BupaLogo className="h-5 w-5 flex-none rounded-sm" />
                                        )}
                                        <span
                                            className={cx(
                                                'font-semibold',
                                                current
                                                    ? 'text-cyan'
                                                    : 'text-navy dark:text-white'
                                            )}
                                        >
                                            {item.label}
                                        </span>
                                        {item.isCore && current && (
                                            <span aria-hidden="true" className="ml-auto text-cyan">
                                                ✓
                                            </span>
                                        )}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
