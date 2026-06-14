import { ReactNode } from 'react'
import { Card } from './Card'

/**
 * @deprecated Use {@link Card} directly. `InfoCard` now delegates to `Card` and
 * exists only so existing call sites keep working — its props are a subset of
 * `CardProps` (the no-`image` "tile" shape). New code should import `Card`.
 */
export interface InfoCardProps {
    title: ReactNode
    description?: ReactNode
    href?: string
    icon?: ReactNode
    external?: boolean
    cta?: string
}

/** @deprecated Thin wrapper around {@link Card}; see {@link InfoCardProps}. */
export const InfoCard = (props: InfoCardProps) => <Card {...props} />
