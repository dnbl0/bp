import { useState } from "react";
import { X } from "./icons";
import { usePersistedState } from "../lib/usePersistedState";

/**
 * Surfaces a single, gentle onboarding moment per visit — anniversary,
 * milestone, or welcome — dismissible per moment.
 */
export function OnboardingBanner({
  member,
  enabled = true,
}: {
  member: {
    firstName: string;
    memberSinceYear: number;
  };
  enabled?: boolean;
}) {
  const year = new Date().getFullYear();
  const years = year - member.memberSinceYear;
  const momentId = years > 0 ? `anniversary-${year}` : "welcome";
  const [dismissed, setDismissed] = usePersistedState<string[]>(
    "lexus.onboarding.dismissed",
    []
  );
  const [hiding, setHiding] = useState(false);
  if (!enabled || dismissed.includes(momentId)) return null;

  const headline =
    years >= 1
      ? `${years} year${years === 1 ? "" : "s"} with Encore`
      : "Welcome to Encore";
  const body =
    years >= 1
      ? `Thank you for ${years} ${
          years === 1 ? "year" : "years"
        } as an Encore Platinum member, ${member.firstName}. Your concierge is on hand whenever you need them.`
      : `Welcome, ${member.firstName}. Take a moment to add your vehicle, link a payment method and meet your concierge.`;

  const dismiss = () => {
    setHiding(true);
    window.setTimeout(() => {
      setDismissed((prev) => [...prev, momentId]);
    }, 280);
  };

  return (
    <div className={`onboard${hiding ? " is-hiding" : ""}`} role="status">
      <div className="onboard__mark" aria-hidden="true" />
      <div className="onboard__text">
        <p className="onboard__eyebrow">A moment for you</p>
        <h2 className="onboard__title">{headline}</h2>
        <p className="onboard__body">{body}</p>
      </div>
      <button
        type="button"
        className="onboard__dismiss"
        aria-label="Dismiss"
        onClick={dismiss}
      >
        <X width={16} height={16} />
      </button>
    </div>
  );
}
