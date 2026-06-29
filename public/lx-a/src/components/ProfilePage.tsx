import { useState } from "react";
import { DataTable } from "./Table";
import { ChevronRight } from "./icons";
import { PointsSparkline } from "./PointsSparkline";
import { useFlyout } from "../flyout/FlyoutProvider";
import { dealers } from "../data/service";
import { commsPreferences, type DetailRow, type PaymentMethod } from "../data/profile";

export function ProfilePage({
  profile,
  membership,
  canEditProfile = true,
  hasLexusVehicle = true,
  restrictionsCopy,
}: {
  profile: {
    firstName: string;
    lastName: string;
    initials: string;
    personal: DetailRow[];
    interests: string[];
    payments: PaymentMethod[];
  };
  membership: {
    program: string;
    tier: string;
    memberId: string;
    memberSince: string;
    renews: string;
    points: string;
  };
  canEditProfile?: boolean;
  hasLexusVehicle?: boolean;
  restrictionsCopy?: string;
}) {
  const {
    open: openFlyout,
    preferredDealerId,
    personal,
    interests,
    payments,
  } = useFlyout();
  const dealer =
    dealers.find((d) => d.id === preferredDealerId) ?? dealers[0];

  const shownPersonal = canEditProfile ? personal : profile.personal;
  const shownInterests = canEditProfile ? interests : profile.interests;
  const shownPayments = canEditProfile ? payments : profile.payments;

  const [comms, setComms] = useState(commsPreferences);
  const toggleComm = (id: string) =>
    setComms((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );

  return (
    <div className="profile">
      <header className="profile__head">
        <div className="shell">
          <p className="eyebrow eyebrow--muted">
            <span className="tick" /> My Profile
          </p>
          <div className="profile__identity">
            <span className="avatar avatar--xl">{profile.initials}</span>
            <div>
              <h1 className="page-title">
                {profile.firstName} {profile.lastName}
              </h1>
              <span className="profile__sub">
                {membership.program} · {membership.tier}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="shell profile__grid">
        {/* ---- Main column ---- */}
        <div className="profile__main">
          {/* Personal details */}
          <section className="card">
            <header className="profile__sectionhead">
              <h2 className="card__title card__title--flush">
                Personal Details
              </h2>
              <button
                className="link-arrow"
                type="button"
                disabled={!canEditProfile}
                onClick={() => canEditProfile && openFlyout("edit-personal")}
              >
                Edit
              </button>
            </header>
            <DataTable rows={shownPersonal} />
          </section>

          {/* Interests */}
          <section className="card">
            <header className="profile__sectionhead">
              <h2 className="card__title card__title--flush">Interests</h2>
              <button
                className="link-arrow"
                type="button"
                disabled={!canEditProfile}
                onClick={() => canEditProfile && openFlyout("edit-interests")}
              >
                Edit
              </button>
            </header>
            <p className="profile__hint">
              We use your interests to tailor offers and experiences.
            </p>
            <ul className="taglist">
              {shownInterests.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </section>

          {/* Communication preferences */}
          <section className="card">
            <header className="profile__sectionhead">
              <h2 className="card__title card__title--flush">
                Communication Preferences
              </h2>
            </header>
            <ul className="prefs">
              {comms.map((c) => (
                <li key={c.id} className="prefs__row">
                  <div className="prefs__text">
                    <span className="prefs__label">{c.label}</span>
                    <span className="prefs__desc">{c.description}</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={c.enabled}
                    aria-label={c.label}
                    className={`switch${c.enabled ? " is-on" : ""}`}
                    onClick={() => toggleComm(c.id)}
                  >
                    <span className="switch__thumb" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Payment methods */}
          <section className="card">
            <header className="profile__sectionhead">
              <h2 className="card__title card__title--flush">
                Payment Methods
              </h2>
              <button
                className="link-arrow"
                type="button"
                disabled={!canEditProfile}
                onClick={() => canEditProfile && openFlyout("payment-methods")}
              >
                Manage
              </button>
            </header>
            <ul className="paylist">
              {shownPayments.length === 0 && (
                <li className="payrow">
                  <span className="payrow__exp">
                    No payment methods available on this account.
                  </span>
                </li>
              )}
              {shownPayments.map((p) => (
                <li key={p.id} className="payrow">
                  <span className="payrow__brand">{p.brand}</span>
                  <div className="payrow__text">
                    <span className="payrow__num">•••• {p.last4}</span>
                    <span className="payrow__exp">Expires {p.expiry}</span>
                  </div>
                  {p.primary && <span className="chip">Primary</span>}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ---- Side column ---- */}
        <aside className="profile__side">
          {/* Encore membership */}
          <section className="card">
            <h2 className="card__title">Encore Membership</h2>
            <div className="profile__points">
              <span className="profile__pointsval">
                {membership.points}
              </span>
              <span className="profile__pointslabel">Points balance</span>
            </div>
            {canEditProfile && <PointsSparkline />}
            <DataTable
              rows={[
                {
                  label: "Tier",
                  value: (
                    <span className="profile__tierval">
                      {membership.tier}
                    </span>
                  ),
                },
                { label: "Member ID", value: membership.memberId },
                { label: "Member since", value: membership.memberSince },
                { label: "Renews", value: membership.renews },
              ]}
            />
            {!canEditProfile && restrictionsCopy && (
              <p className="profile__hint">{restrictionsCopy}</p>
            )}
          </section>

          {/* Preferred dealer */}
          <section className="card">
            <header className="profile__sectionhead">
              <h2 className="card__title card__title--flush">
                Preferred Dealer
              </h2>
              <button
                className="link-arrow"
                type="button"
                disabled={!hasLexusVehicle}
                onClick={() => hasLexusVehicle && openFlyout("preferred-dealer")}
              >
                Change
              </button>
            </header>
            {hasLexusVehicle ? (
              <div className="dealercard">
                <span className="dealercard__name">{dealer.name}</span>
                <span className="dealercard__addr">{dealer.address}</span>
                <button
                  className="link-arrow dealercard__cta"
                  type="button"
                  onClick={() => openFlyout("preferred-dealer")}
                >
                  View dealer <ChevronRight width={15} height={15} />
                </button>
              </div>
            ) : (
              <p className="profile__hint">
                Preferred dealer is available once a Lexus is linked.
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
