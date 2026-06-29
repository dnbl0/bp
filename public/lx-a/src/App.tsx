import { useEffect, useState } from "react";
import { Flyout } from "./components/Flyout";
import { TopNav } from "./components/TopNav";
import { SectionNav } from "./components/SectionNav";
import { Hero } from "./components/Hero";
import { BenefitCard } from "./components/BenefitCard";
import { OffersCarousel } from "./components/OffersCarousel";
import { VehiclePanel } from "./components/VehicleCard";
import { WishlistPanel } from "./components/WishlistPanel";
import { TodayModule } from "./components/TodayModule";
import { ConciergeButton } from "./components/ConciergeButton";
import { AgentPanel } from "./components/agent/AgentPanel";
import { CommandPalette } from "./components/CommandPalette";
import { BenefitsPage } from "./components/BenefitsPage";
import { ValetParking } from "./components/ValetParking";
import { AirportLounge } from "./components/AirportLounge";
import { VehiclesGarage } from "./components/VehiclesGarage";
import { VehicleDetail } from "./components/VehicleDetail";
import { ProfilePage } from "./components/ProfilePage";
import { LoginScreen } from "./components/auth/LoginScreen";
import { RegisterScreen } from "./components/auth/RegisterScreen";
import { ResetScreen } from "./components/auth/ResetScreen";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { ArrowRight } from "./components/icons";
import { accounts, type AccountId } from "./data/accounts";
import { useScrollReveal } from "./lib/useScrollReveal";

export type SubView = "valet" | "lounge";
type AuthView = "login" | "register" | "reset";
import { type Section } from "./data/dashboard";

function Dashboard({
  account,
  limited = false,
  onAllBenefits,
  onOpenBenefit,
  onManageVehicle,
  onLinkVehicle,
}: {
  account: (typeof accounts)[AccountId];
  limited?: boolean;
  onAllBenefits: () => void;
  onOpenBenefit: (id: SubView) => void;
  onManageVehicle: (id: string) => void;
  onLinkVehicle: () => void;
}) {
  const heroMarketing = account.heroMarketing
    ? {
        ...account.heroMarketing,
        ctas: account.heroMarketing.ctas.map((c) => ({
          label: c.label,
          onClick:
            c.target === "encore"
              ? onAllBenefits
              : c.target === "link"
              ? onLinkVehicle
              : undefined,
        })),
      }
    : undefined;
  // Greeting (Encore/owner) hero CTAs.
  const heroCtas = [
    { label: "Manage my vehicles", onClick: onLinkVehicle },
    { label: "View Encore benefits", onClick: onAllBenefits },
  ];
  return (
    <>
      <Hero
        member={account.member}
        image={account.heroImage}
        marketing={heroMarketing}
        ctas={heroCtas}
      />
      <div className="shell dash">
        <div className="dash__main">
          <section className="benefits">
            <header className="section-head">
              <h2 className="eyebrow">Encore Benefits</h2>
              <button
                className="link-arrow"
                onClick={onAllBenefits}
                type="button"
              >
                All Encore benefits <ArrowRight width={16} height={16} />
              </button>
            </header>
            <div className="benefits__grid">
              {account.dashboardBenefits.map((b, i) => (
                <BenefitCard
                  key={b.id}
                  benefit={b}
                  revealIndex={i}
                  ctaLabel={
                    !account.canRedeemEncore
                      ? "Join Encore"
                      : b.id === "valet"
                      ? "Book now"
                      : "Redeem"
                  }
                  onClick={
                    !account.canRedeemEncore
                      ? undefined
                      : b.id === "valet"
                      ? () => onOpenBenefit("valet")
                      : b.id === "lounge"
                      ? () => onOpenBenefit("lounge")
                      : undefined
                  }
                />
              ))}
            </div>
          </section>

          <OffersCarousel onExploreAll={onAllBenefits} />

          <TodayModule
            onOpenVehicle={onManageVehicle}
            vehicles={account.vehicles}
            canBookService={account.canBookService}
          />
        </div>

        <div className="dash__side">
          {limited ? (
            <WishlistPanel onView={onLinkVehicle} />
          ) : (
            <VehiclePanel
              onManage={onManageVehicle}
              vehicles={account.vehicles}
              canBookService={account.canBookService}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default function App() {
  // Login screens hidden for now — start inside the authenticated app.
  const [authed, setAuthed] = useState(true);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [section, setSection] = useState<Section>("Dashboard");
  const [subview, setSubview] = useState<SubView | null>(null);
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountId, setAccountId] = useState<AccountId>("owner");
  const account = accounts[accountId];

  // Each account carries its own colour scheme: the base/guest tier is a
  // light marketing surface, the owner tier respects the stored Settings
  // preference (dark by default).
  useEffect(() => {
    const root = document.documentElement;
    if (account.theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.setAttribute(
        "data-theme",
        localStorage.getItem("lexus.theme") || "dark"
      );
    }
  }, [account.theme]);

  // Reset scroll to the top of the page on every route change, instead of
  // retaining the previous page's scroll position.
  const routeKey = `${section}|${subview ?? ""}|${vehicleId ?? ""}`;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routeKey]);

  // Re-arm scroll-reveal whenever a route, the account (which swaps the whole
  // dashboard's reveal targets), the auth gate, or the loading skeleton swaps
  // in fresh DOM to observe.
  useScrollReveal(
    `${accountId}|${routeKey}|${authed ? 1 : 0}|${loading ? 1 : 0}`
  );

  const handleLogin = () => {
    setAuthed(true);
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1400);
  };

  if (!authed) {
    if (authView === "login") {
      return (
        <LoginScreen
          onLogin={handleLogin}
          onRegister={() => setAuthView("register")}
          onForgotPassword={() => setAuthView("reset")}
          onSkip={() => setAuthed(true)}
        />
      );
    }
    if (authView === "register") {
      return (
        <RegisterScreen
          onRegistered={handleLogin}
          onBack={() => setAuthView("login")}
        />
      );
    }
    return <ResetScreen onBack={() => setAuthView("login")} />;
  }

  const goSection = (s: Section) => {
    setSubview(null);
    setVehicleId(null);
    setSection(s);
  };
  const openBenefit = (id: SubView) => {
    if (!account.canRedeemEncore) {
      setSection("Encore");
      setSubview(null);
      return;
    }
    setSection("Encore");
    setSubview(id);
  };
  const openVehicle = (id: string) => {
    if (!account.hasLexusVehicle) {
      setSection("My Lexus");
      setVehicleId(null);
      return;
    }
    setSubview(null);
    setSection("My Lexus");
    setVehicleId(id);
  };
  const closeSub = () => setSubview(null);
  const switchAccount = () => {
    setAccountId((prev) => (prev === "owner" ? "guest" : "owner"));
    setConfirmSignOut(false);
    setSection("Dashboard");
    setSubview(null);
    setVehicleId(null);
  };

  const selectedVehicle =
    account.vehicles.find((v) => v.id === vehicleId) ?? null;

  return (
    <div className="app">
      <a className="skiplink" href="#main">
        Skip to main content
      </a>
      <TopNav
        member={account.member}
        switchLabel={account.switchLabel}
        canBookService={account.canBookService}
        activeSection={section}
        sectionLabels={
          accountId === "guest" ? { "My Lexus": "Wishlist" } : undefined
        }
        onNavigateSection={goSection}
        onSignOut={() => setConfirmSignOut(true)}
        onSwitchAccount={switchAccount}
        onNavigateProfile={() => goSection("Profile")}
        onNavigateVehicles={() => goSection("My Lexus")}
        onNavigateBenefits={() => goSection("Encore")}
        onNavigateLounge={() => openBenefit("lounge")}
      />
      <SectionNav
        active={section}
        onChange={goSection}
        labels={accountId === "guest" ? { "My Lexus": "Wishlist" } : undefined}
      />
      <main id="main" className="app__body" tabIndex={-1}>
        <div key={routeKey} className="app__sectionfade">
        {subview === "valet" ? (
          <ValetParking onBack={closeSub} />
        ) : subview === "lounge" ? (
          <AirportLounge onBack={closeSub} />
        ) : section === "My Lexus" ? (
          selectedVehicle ? (
            <VehicleDetail
              vehicle={selectedVehicle}
              onBack={() => setVehicleId(null)}
            />
          ) : (
            <VehiclesGarage
              onSelect={(v) => setVehicleId(v.id)}
              vehicles={account.vehicles}
              canAddVehicle={account.canAddVehicle}
              wishlistMode={accountId === "guest"}
            />
          )
        ) : (
          <>
            {section === "Dashboard" &&
              (loading ? (
                <DashboardSkeleton />
              ) : (
                <Dashboard
                  account={account}
                  limited={accountId === "guest"}
                  onAllBenefits={() => setSection("Encore")}
                  onOpenBenefit={openBenefit}
                  onManageVehicle={(id) => openVehicle(id)}
                  onLinkVehicle={() => goSection("My Lexus")}
                />
              ))}
            {section === "Encore" && (
              <BenefitsPage
                onBack={() => setSection("Dashboard")}
                onOpenBenefit={openBenefit}
                benefits={account.encoreBenefits}
                memberProgram={account.member.program}
                memberTier={account.member.tier}
                canRedeemEncore={account.canRedeemEncore}
                restrictionsCopy={account.restrictionsCopy}
                theme={account.theme}
              />
            )}
            {section === "Profile" && (
              <ProfilePage
                profile={account.profile}
                membership={account.membership}
                canEditProfile={account.canEditProfile}
                hasLexusVehicle={account.hasLexusVehicle}
                restrictionsCopy={account.restrictionsCopy}
              />
            )}
          </>
        )}
        </div>
      </main>
      <Flyout
        open={confirmSignOut}
        title="Sign out"
        onClose={() => setConfirmSignOut(false)}
        heading="Sign out of My Lexus?"
        description="You'll need to log in again next time to access your Encore benefits, vehicles and bookings."
        footer={
          <div className="flyout__actions">
            <button
              className="btn btn--primary"
              onClick={() => {
                setConfirmSignOut(false);
                setAuthed(false);
                setAuthView("login");
                setSection("Dashboard");
                setSubview(null);
                setVehicleId(null);
              }}
            >
              Sign out
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => setConfirmSignOut(false)}
            >
              Stay signed in
            </button>
          </div>
        }
      >
        <></>
      </Flyout>
      <CommandPalette
        onNavigate={(s) => goSection(s as Section)}
        onOpenVehicle={openVehicle}
        vehicles={account.vehicles}
        benefits={account.encoreBenefits}
        canBookService={account.canBookService}
        canUseConcierge={account.canUseConcierge}
        canAddVehicle={account.canAddVehicle}
        canRedeemEncore={account.canRedeemEncore}
      />
      <ConciergeButton enabled={account.canUseConcierge} />
      {account.canUseConcierge && (
        <AgentPanel
          onNavigate={goSection}
          onOpenVehicle={openVehicle}
          onOpenBenefit={openBenefit}
        />
      )}
      <footer className="footer">
        <div className="shell footer__inner">
          <span>© Lexus Australia — Prototype</span>
          <span className="footer__reassurance">
            Experience Amazing — concierge available 24/7
          </span>
          <nav className="footer__links" aria-label="Footer">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
