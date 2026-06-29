# Lexus — Authenticated Experience (Prototype)

A hi-fi React + Vite prototype of the authenticated **My Lexus** experience —
auth screens, dashboard, Encore benefits, vehicle garage, vehicle detail,
profile, and a constellation of right-anchored flyouts that close every
in-product loop (book a service, manage payments, refer a friend, and so on).

## Stack

- React 18 + TypeScript + Vite
- Real Lexus design tokens (curated dark-theme subset in
  `src/styles/tokens.css`, sourced from the Lexus AU DS token export)
- Real imagery exported from the Figma source (hero, UX 300e, benefit & offer
  cards) in `public/assets/`

## Run

```bash
npm install
npm run dev              # app → http://localhost:5173
npm run build            # production build → dist/
npm run storybook        # design-system docs → http://localhost:6006
npm run build-storybook  # static storybook → storybook-static/
```

## Storybook

The full component catalogue lives in `src/stories/` and is organised
Foundations → Primitives → Composition → Patterns → Visualisation → Pages →
Concierge → Search → Authentication. Every component story carries a
purpose statement, variants, accessibility notes and spec references back to
the design tokens.

## Screens

### Auth (unauthenticated)
- **LoginScreen** — email + password with live validation, Caps-Lock hint,
  "Stay logged in", and a demo error trigger (type `wrong`).
- **RegisterScreen** — name, email, password (with strength meter), confirm,
  Terms checkbox. Per-field validation.
- **ResetScreen** — email + "Check your inbox" success state.

### Authenticated app
- **TopNav** — Lexus mark, primary links (collapse to a hamburger drawer at
  ≤860 px), notifications popover with unread state + mark-all-read, Quick
  Book CTA wired to the booking flyout, account menu that navigates to
  Profile, My vehicles and Preferred Dealer.
- **SectionNav** — Dashboard · My Lexus · Encore · Profile. Section changes
  fade in (honours `prefers-reduced-motion`).
- **Hero** — time-of-day greeting + member name on a Lexus hero image.
- **Dashboard** — Encore Benefits grid, sliding Offers carousel (responsive
  perPage 3 / 2 / 1, keyboard arrows, touch swipe), Vehicle panel (with
  carousel when multiple cars are linked), fuel offer module.
- **BenefitsPage (Encore)** — On Demand / Valet Parking / Airport Lounge tiles
  with live remaining counts, Exclusive Offers, Lexus Service Experience
  cards (each wired to a flyout), Refer-a-Friend sidebar.
- **Valet Parking** — regions × locations, redeem flyout. Remaining count
  persists to `localStorage`.
- **Airport Lounge** — feature card, FAQ accordion, redeem flyout (also
  persisted), terms link jumps the FAQ open.
- **My Lexus (Garage)** — linked vehicles + pending-verification cards
  (desaturated visual treatment), Add a vehicle drawer.
- **VehicleDetail** — Vehicle summary with Edit registration / Connect / Encore
  info / Manuals & resources actions, Next service with relative time
  ("in 6 weeks"), expand/collapse-all accordion sections, Quick Actions rail.
- **Profile** — Personal Details, Interests, Communication Preferences,
  Payment Methods, Encore Membership, Preferred Dealer — each editable
  through its own flyout. Card-number input auto-formats and detects brand
  live.

### Flyouts (right-anchored, focus-trapped, Esc-to-close)
`book-service`, `service-history` (expandable records), `preferred-dealer`,
`edit-personal`, `edit-interests`, `payment-methods`, `add-vehicle`,
`edit-registration`, `manuals`, `connect`, `refer-friend`, `drivecare`,
`loan-car`, `encore-info`. All inherit the same focus management and a
shared `<Confirmation>` success pattern.

## Design system

- **Tokens** (`src/styles/tokens.css`) — type ramp (`--text-2xs..display-2xl`),
  spacing scale (`--space-1..11`), tracking scale (`--tracking-*`), elevation
  (`--shadow-sm/md/lg`, `--shadow-render-*`), `--radius-pill`, scrim
  (`--canvas-scrim-strong/scrim/scrim-soft`), tier border, accent-electrified.
- **Shadows** — every `box-shadow` and vehicle drop-shadow goes through
  shadow tokens. Vehicle renders share a consistent radial-backdrop stage.
- **Pagehead** — one `.pagehead` + `--bordered` / `--flush` variants spans
  every page-level header (Benefits, Valet, Lounge, Garage, VehicleDetail).
- **A11y** — focus trap and focus restore in `Flyout`; skip-to-main link;
  proper `tablist` / `tab` / `dialog` roles; arrow-key navigation in the
  DatePicker grid and segmented filters; aria-live regions on redemption
  counters and the offers carousel.

## Structure

```
src/
  App.tsx                  # shell + section routing + sign-out confirm
  components/              # presentational components
    auth/                  # LoginScreen, RegisterScreen, ResetScreen, AuthLayout
    Flyout.tsx             # focus-trapped, esc-to-close right-anchored panel
    OffersCarousel.tsx     # responsive, swipeable carousel
    VehicleCard.tsx        # primary-vehicle panel
    VehicleDetail.tsx, VehiclesGarage.tsx, ValetParking.tsx, AirportLounge.tsx
    ProfilePage.tsx
    Skeleton.tsx, DashboardSkeleton.tsx
    DatePicker.tsx, Radio.tsx, Checkbox.tsx, TextField.tsx, Table.tsx
    icons.tsx              # inline SVG icon set + Lexus mark
  flyout/                  # 14 right-anchored flyouts + FlyoutProvider
  data/                    # member, vehicles, benefits, offers, dealers,
                           # service types/times/history, valet, lounge,
                           # profile, manuals, notifications (mock)
  lib/                     # usePersistedState, useMediaQuery, relativeTime
  styles/                  # tokens.css, global.css, dashboard.css,
                           # flyout.css, auth.css
```

## Notes

Mock data lives under `src/data/`. Some screen-level state persists to
`localStorage` via `usePersistedState` (valet + lounge redemptions, redeemed
locations). Design source: Figma "Folio" file, *Lexus Auth State* page.
