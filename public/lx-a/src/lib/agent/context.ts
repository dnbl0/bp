// ──────────────────────────────────────────────────────────────────────────
// Agent context — the co-pilot's knowledge of the member.
//
// `buildUserContext` fuses the *live* provider state (bookings, interests,
// preferred dealer…) with the static seed data (vehicles,
// service history, membership, entitlements) into one normalised snapshot the
// agent reads from. It also derives the proactive "insights" the agent leads
// with — the things a good concierge would notice without being asked.
//
// This module is headless and UI-free: it imports data, not components, so the
// runtime and tools can be exercised without React.
// ──────────────────────────────────────────────────────────────────────────

import { vehicles as seedVehicles, type Vehicle } from "../../data/vehicles";
import { dealers, serviceHistory, type Dealer } from "../../data/service";
import { notifications, type Notification } from "../../data/notifications";
import { offers, member, timeBasedGreeting } from "../../data/dashboard";
import { lifestyleOffers } from "../../data/benefits";
import { valetRedemptions } from "../../data/valet";
import { lounge } from "../../data/lounge";
import { encoreMembership, personalDetails, type DetailRow } from "../../data/profile";
import {
  findModelManual,
  type ModelManual,
  type Powertrain,
} from "../../data/manuals";
import { type Booking } from "../../data/bookings";
import { relativeFromNow } from "../relativeTime";

/** The slice of FlyoutProvider state the agent needs to read live. */
export interface LiveState {
  bookings: Booking[];
  interests: string[];
  personal: DetailRow[];
  preferredDealerId: string;
  pendingVehicles: Vehicle[];
  regoOverrides: Record<string, string>;
}

/** A vehicle enriched with live overrides + derived service timing. */
export interface VehicleView extends Vehicle {
  /** Friendly "in 6 weeks" string for the next service, when known. */
  nextServiceRelative: string | null;
  /** Dealer name parsed out of the `nextService` label, when present. */
  nextServiceDealer: string | null;
  /** Powertrain inferred from the model grade — drives manual/how-to answers. */
  powertrain: Powertrain;
  /** The model's owner's-manual catalog entry, when recognised. */
  modelManual: ModelManual | undefined;
}

/** Infer powertrain from a grade name: "300e"/RZ → BEV, "+"→PHEV, "…h"→Hybrid. */
function powertrainOf(v: Vehicle): Powertrain {
  const name = `${v.shortName} ${v.name}`.toLowerCase();
  if (/\b300e\b/.test(name) || /\brz\b/.test(name)) return "BEV";
  if (/\+/.test(name)) return "PHEV";
  if (/\d{3}h\b/.test(name) || /hybrid/.test(name)) return "Hybrid";
  return "Petrol";
}

export type InsightSeverity = "info" | "attention" | "celebrate";

/**
 * A proactive observation the agent surfaces unprompted. `suggest` points at a
 * tool the member can run in one tap to act on it.
 */
export interface Insight {
  id: string;
  severity: InsightSeverity;
  icon: string;
  title: string;
  detail: string;
  suggest?: { toolId: string; args?: Record<string, unknown>; label: string };
}

export interface UserContext {
  member: {
    firstName: string;
    lastName: string;
    fullName: string;
    initials: string;
    tier: string;
    program: string;
    memberId: string;
    points: string;
    memberSince: string;
    /** Whole years of Encore membership as of `now`. */
    tenureYears: number;
    renews: string;
  };
  greeting: string;
  vehicles: VehicleView[];
  defaultVehicle: VehicleView;
  preferredDealer: Dealer;
  bookings: Booking[];
  notifications: Notification[];
  unreadCount: number;
  interests: string[];
  /** The member's personal + contact details (name, email, mobile, address…). */
  personal: DetailRow[];
  entitlements: {
    valetRedemptions: number;
    loungeRedemptions: number;
    /** Days until the soonest lounge e-certificate lapses, when one exists. */
    loungeCertExpiresInDays: number | null;
  };
  insights: Insight[];
}

const DAY_MS = 86_400_000;

/** Pull the dealer name out of a `"12 Aug 2026 · Lexus of Brighton"` label. */
function dealerFromServiceLabel(label: string | null): string | null {
  if (!label) return null;
  const parts = label.split("·");
  return parts.length > 1 ? parts[1].trim() : null;
}

function toVehicleView(
  v: Vehicle,
  live: LiveState
): VehicleView {
  return {
    ...v,
    rego: live.regoOverrides[v.id] ?? v.rego,
    nextServiceRelative: v.nextService ? relativeFromNow(v.nextService) : null,
    nextServiceDealer: dealerFromServiceLabel(v.nextService),
    powertrain: powertrainOf(v),
    modelManual: findModelManual(v.shortName),
  };
}

/** Build the agent's full picture of the member from live + seed data. */
export function buildUserContext(
  live: LiveState,
  now: Date = new Date()
): UserContext {
  const allVehicles = [...seedVehicles, ...live.pendingVehicles];
  const vehicleViews = allVehicles.map((v) => toVehicleView(v, live));
  const defaultVehicle = vehicleViews[0];

  const preferredDealer =
    dealers.find((d) => d.id === live.preferredDealerId) ?? dealers[0];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Soonest lounge certificate expiry, derived from live bookings.
  const loungeBooking = live.bookings
    .filter((b) => b.kind === "lounge")
    .sort((a, b) => a.at - b.at)[0];
  const loungeCertExpiresInDays = loungeBooking
    ? Math.max(0, Math.round((loungeBooking.at - now.getTime()) / DAY_MS))
    : null;

  const tenureYears = Math.max(0, now.getFullYear() - member.memberSinceYear);

  const ctx: UserContext = {
    member: {
      firstName: member.firstName,
      lastName: member.lastName,
      fullName: `${member.firstName} ${member.lastName}`,
      initials: member.initials,
      tier: member.tier,
      program: member.program,
      memberId: encoreMembership.memberId,
      points: encoreMembership.points,
      memberSince: encoreMembership.memberSince,
      tenureYears,
      renews: encoreMembership.renews,
    },
    greeting: timeBasedGreeting(now),
    vehicles: vehicleViews,
    defaultVehicle,
    preferredDealer,
    bookings: [...live.bookings].sort((a, b) => a.at - b.at),
    notifications,
    unreadCount,
    interests: live.interests,
    personal: live.personal.length ? live.personal : personalDetails,
    entitlements: {
      valetRedemptions,
      loungeRedemptions: lounge.redemptions,
      loungeCertExpiresInDays,
    },
    insights: [],
  };

  ctx.insights = deriveInsights(ctx);
  return ctx;
}

/**
 * The proactive feed — what the agent flags without being asked, ranked by
 * urgency. Pure function of the assembled context so it stays testable.
 */
export function deriveInsights(ctx: UserContext): Insight[] {
  const out: Insight[] = [];

  // Service due — strongest signal when a date is known.
  const dueVehicle = ctx.vehicles.find((v) => v.nextService);
  if (dueVehicle) {
    out.push({
      id: "service-due",
      severity: "attention",
      icon: "car",
      title: `${dueVehicle.shortName} service ${
        dueVehicle.nextServiceRelative ?? "coming up"
      }`,
      detail: `Due ${dueVehicle.nextService}. I'll walk you through the booking right here — date, time and loan car.`,
      suggest: {
        toolId: "book-service",
        args: { vehicleId: dueVehicle.id },
        // Label doubles as a quick-reply chip, so it must route as text too.
        label: "Book my service",
      },
    });
  }

  // Lounge certificate lapsing.
  if (
    ctx.entitlements.loungeCertExpiresInDays !== null &&
    ctx.entitlements.loungeCertExpiresInDays <= 30
  ) {
    const d = ctx.entitlements.loungeCertExpiresInDays;
    out.push({
      id: "lounge-expiry",
      severity: "attention",
      icon: "calendar",
      title: `Lounge pass expires in ${d} day${d === 1 ? "" : "s"}`,
      detail:
        "Your DragonPass e-certificate is about to lapse — use it before it's gone.",
      suggest: {
        toolId: "recommend-travel",
        label: "Plan a trip",
      },
    });
  }

  // Unread notifications.
  if (ctx.unreadCount > 0) {
    out.push({
      id: "unread",
      severity: "info",
      icon: "bell",
      title: `${ctx.unreadCount} new notification${
        ctx.unreadCount === 1 ? "" : "s"
      }`,
      detail: "A couple of updates are waiting — ask me to catch you up.",
      suggest: { toolId: "notifications", label: "Catch me up" },
    });
  }

  // Membership tenure — a warm, celebratory note.
  if (ctx.member.tenureYears >= 1) {
    out.push({
      id: "anniversary",
      severity: "celebrate",
      icon: "sparkles",
      title: `${ctx.member.tenureYears} years with Encore ${ctx.member.tier}`,
      detail: `${ctx.member.points} points on hand. Ask me what they're worth.`,
      suggest: { toolId: "list-benefits", label: "What can I redeem?" },
    });
  }

  const rank: Record<InsightSeverity, number> = {
    attention: 0,
    celebrate: 1,
    info: 2,
  };
  return out.sort((a, b) => rank[a.severity] - rank[b.severity]);
}

/** Interest-aware travel picks, drawn from the live offer pools. */
export function travelPicks(ctx: UserContext) {
  const wantsTravel = ctx.interests.some((i) =>
    /travel|escape|dining|wellness|golf/i.test(i)
  );
  const pool = wantsTravel
    ? [...lifestyleOffers, ...offers]
    : [...offers, ...lifestyleOffers];
  return pool.slice(0, 3).map((o) => ({
    id: o.id,
    brand: o.brand,
    location: o.location,
    image: o.image,
  }));
}
