import { Sparkles } from "./icons";
import { useFlyout } from "../flyout/FlyoutProvider";
import { buildUserContext } from "../lib/agent/context";

/**
 * Persistent floating launcher for the Lexus Concierge. Hides when any
 * flyout is open so it never sits beneath a scrim. Shows a count badge for the
 * proactive insights the agent has waiting.
 */
export function ConciergeButton({ enabled = true }: { enabled?: boolean }) {
  const flyout = useFlyout();
  const { open: openFlyout, isAnyOpen, activeKind } = flyout;
  const hidden = !enabled || isAnyOpen || activeKind === "concierge";

  // Cheap derive — how many things the agent would flag on open.
  const insightCount = buildUserContext({
    bookings: flyout.bookings,
    interests: flyout.interests,
    personal: flyout.personal,
    preferredDealerId: flyout.preferredDealerId,
    pendingVehicles: flyout.pendingVehicles,
    regoOverrides: flyout.regoOverrides,
  }).insights.filter((i) => i.severity === "attention").length;

  return (
    <button
      type="button"
      className={`concierge-fab${hidden ? " is-hidden" : ""}`}
      aria-label="Open Lexus Concierge"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : 0}
      onClick={() => openFlyout("concierge")}
    >
      <Sparkles width={20} height={20} />
      <span className="concierge-fab__label">Lexus Concierge</span>
      {insightCount > 0 && (
        <span className="concierge-fab__badge" aria-hidden="true">
          {insightCount}
        </span>
      )}
    </button>
  );
}
