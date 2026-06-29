import type { Meta, StoryObj } from "@storybook/react";
import { TopNav } from "../../components/TopNav";
import { SectionNav } from "../../components/SectionNav";
import { Hero } from "../../components/Hero";
import { OnboardingBanner } from "../../components/OnboardingBanner";
import { TodayModule } from "../../components/TodayModule";
import { BenefitCard } from "../../components/BenefitCard";
import { OffersCarousel } from "../../components/OffersCarousel";
import { VehiclePanel } from "../../components/VehicleCard";
import { ConciergeButton } from "../../components/ConciergeButton";
import { accounts } from "../../data/accounts";
import { ArrowRight } from "../../components/icons";
const account = accounts.owner;

const meta: Meta = {
  title: "Pages/Dashboard",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
The authenticated landing page. Reads top-to-bottom as:

1. **TopNav** — Lexus mark + primary links + search/notifications + Quick
   Book + account.
2. **SectionNav** — Dashboard / My Lexus / Encore / Profile tabs.
3. **Hero** — time-of-day greeting on a member-photo backdrop.
4. **OnboardingBanner** — anniversary / welcome moment (dismissible).
5. **Encore Benefits + Offers** in the main column.
6. **Today + Vehicle panel** in the sidebar.
7. **Concierge** floating affordance.

Use this story to review composition, breakpoints and density.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="app">
    <TopNav member={account.member} switchLabel={account.switchLabel} />
      <SectionNav active="Dashboard" onChange={() => {}} />
      <main id="main" className="app__body">
      <Hero member={account.member} />
        <div className="shell">
        <OnboardingBanner member={account.member} />
        </div>
        <div className="shell dash">
          <div className="dash__main">
            <section className="benefits">
              <header className="section-head">
                <h2 className="eyebrow">Encore Benefits</h2>
                <button type="button" className="link-arrow">
                  All Encore benefits <ArrowRight width={16} height={16} />
                </button>
              </header>
              <div className="benefits__grid">
                {account.dashboardBenefits.map((b) => (
                  <BenefitCard
                    key={b.id}
                    benefit={b}
                    ctaLabel={b.id === "valet" ? "Book now" : "Redeem"}
                    onClick={b.id !== "on-demand" ? () => {} : undefined}
                  />
                ))}
              </div>
            </section>

            <OffersCarousel onExploreAll={() => {}} />
          </div>

          <div className="dash__side">
            <TodayModule onOpenVehicle={() => {}} vehicles={account.vehicles} />
            <VehiclePanel onManage={() => {}} vehicles={account.vehicles} />
          </div>
        </div>
      </main>
      <ConciergeButton />
    </div>
  ),
};
