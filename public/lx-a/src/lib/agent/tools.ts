// ──────────────────────────────────────────────────────────────────────────
// Agent tools — the co-pilot's executable capabilities.
//
// Each tool is a small, typed unit of work the runtime can call. Read tools
// answer questions from context; act tools mutate real app state through the
// injected `providers` bridge (the same FlyoutProvider handlers the rest of
// the app uses). Tools flagged `consequential` make a real change and so are
// gated behind a confirmation step before they run.
//
// Tools return a `ToolResult` carrying a short line for the agent to "say" and
// an optional structured `card` for the UI to render. Nothing here imports
// React — the providers are passed in, so the registry stays headless.
// ──────────────────────────────────────────────────────────────────────────

import type { FlyoutKind } from "../../flyout/FlyoutProvider";
import type { Booking, BookingKind } from "../../data/bookings";
import type { Section } from "../../data/dashboard";
import type { SubView } from "../../App";
import { serviceHistory } from "../../data/service";
import {
  brochureTopics,
  lexusOwnersHub,
  manualTopics,
  modelManuals,
  topicsFor,
  topicsForAny,
  type ModelManual,
} from "../../data/manuals";
import { type UserContext, travelPicks } from "./context";

/** The action surface the agent drives — mirrors FlyoutProvider + App nav. */
export interface AgentProviders {
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  openFlyout: (kind: FlyoutKind, payload?: Record<string, unknown>) => void;
  setInterests: (tags: string[]) => void;
  navigate: (section: Section) => void;
  openVehicle: (id: string) => void;
  /** Open an Encore benefit page (valet / lounge) with its own booking steps. */
  openBenefit: (subview: SubView) => void;
}

export interface ToolContext {
  ctx: UserContext;
  providers: AgentProviders;
}

/** Structured payloads the UI renders as rich cards beneath a tool's step. */
export type ResultCard =
  | { kind: "booking"; title: string; detail: string; when: string; deepLink?: FlyoutKind }
  | { kind: "booking-flow"; flow: "service" | "valet" | "lounge"; vehicleName?: string }
  | { kind: "vehicle"; name: string; rows: { label: string; value: string }[] }
  | { kind: "details"; title: string; rows: { label: string; value: string }[] }
  | { kind: "offers"; items: { id: string; brand: string; location: string; image: string }[] }
  | { kind: "benefits"; tier: string; points: string; lines: string[] }
  | { kind: "contact"; name: string; phone: string; note: string }
  | { kind: "history"; rows: { title: string; meta: string }[] }
  | {
      kind: "manual";
      title: string;
      section?: string;
      body?: string;
      links: { label: string; url: string }[];
      topics?: string[];
    };

export interface ToolResult {
  ok: boolean;
  /** One-line summary the agent speaks after the step completes. */
  summary: string;
  card?: ResultCard;
}

export interface Tool {
  id: string;
  /** Verb-phrase shown on the running step, e.g. "Booking your service". */
  label: string;
  description: string;
  /** Makes a real change → requires confirmation before running. */
  consequential: boolean;
  run: (
    args: Record<string, unknown>,
    tctx: ToolContext
  ) => ToolResult | Promise<ToolResult>;
}

/** Resolve the vehicle an action targets — explicit id, else the default. */
function resolveVehicle(args: Record<string, unknown>, ctx: UserContext) {
  const id = args.vehicleId as string | undefined;
  return ctx.vehicles.find((v) => v.id === id) ?? ctx.defaultVehicle;
}

// ── Read tools ─────────────────────────────────────────────────────────────

const vehicleStatus: Tool = {
  id: "vehicle-status",
  label: "Checking your vehicle",
  description: "Summarise a vehicle's status, odometer and service timing.",
  consequential: false,
  run: (args, { ctx }) => {
    const v = resolveVehicle(args, ctx);
    return {
      ok: true,
      summary: `Here's where your ${v.shortName} stands.`,
      card: {
        kind: "vehicle",
        name: `${v.year} ${v.name}`,
        rows: [
          { label: "Odometer", value: v.odometer },
          { label: "Rego", value: v.rego },
          {
            label: "Next service",
            value: v.nextService
              ? `${v.nextServiceRelative ?? "upcoming"} · ${v.nextService}`
              : "Nothing due",
          },
        ],
      },
    };
  },
};

const serviceHistoryTool: Tool = {
  id: "service-history",
  label: "Pulling your service history",
  description: "List recent and upcoming services for the member's vehicles.",
  consequential: false,
  run: () => {
    return {
      ok: true,
      summary: "Here's your recent service record.",
      card: {
        kind: "history",
        rows: serviceHistory.slice(0, 4).map((s) => ({
          title: s.title,
          meta: `${s.date} · ${s.dealer}`,
        })),
      },
    };
  },
};

const listBenefits: Tool = {
  id: "list-benefits",
  label: "Reviewing your benefits",
  description: "Summarise tier, points and headline Encore entitlements.",
  consequential: false,
  run: (_args, { ctx }) => ({
    ok: true,
    summary: `As an Encore ${ctx.member.tier} member you're sitting on ${ctx.member.points} points.`,
    card: {
      kind: "benefits",
      tier: ctx.member.tier,
      points: ctx.member.points,
      lines: [
        `${ctx.entitlements.valetRedemptions} valet redemptions available`,
        `${ctx.entitlements.loungeRedemptions} airport lounge passes available`,
        "Complimentary On Demand weekend vehicle",
        "24/7 DriveCare roadside assistance",
      ],
    },
  }),
};

const accountSummary: Tool = {
  id: "account",
  label: "Pulling up your account",
  description:
    "Summarise Encore membership identity — tier, member ID, renewal, tenure and points.",
  consequential: false,
  run: (_args, { ctx }) => ({
    ok: true,
    summary: `You're an Encore ${ctx.member.tier} member${
      ctx.member.tenureYears >= 1 ? `, ${ctx.member.tenureYears} years in` : ""
    } — member ${ctx.member.memberId}, renewing ${ctx.member.renews}, with ${ctx.member.points} points on hand.`,
    card: {
      kind: "details",
      title: "Your Encore membership",
      rows: [
        { label: "Member", value: ctx.member.fullName },
        { label: "Tier", value: `${ctx.member.program} ${ctx.member.tier}` },
        { label: "Member ID", value: ctx.member.memberId },
        { label: "Member since", value: ctx.member.memberSince },
        { label: "Renews", value: ctx.member.renews },
        { label: "Points", value: `${ctx.member.points} pts` },
      ],
    },
  }),
};

const profileDetails: Tool = {
  id: "profile",
  label: "Pulling up your details",
  description: "Show the member's personal and contact details on file.",
  consequential: false,
  run: (_args, { ctx }) => ({
    ok: true,
    summary:
      "Here's what we've got on file — head to Profile any time to update any of it.",
    card: {
      kind: "details",
      title: "Your details",
      rows: ctx.personal.map((d) => ({ label: d.label, value: d.value })),
    },
  }),
};

const upcomingBookings: Tool = {
  id: "bookings",
  label: "Checking your bookings",
  description: "List the member's upcoming bookings and appointments.",
  consequential: false,
  run: (_args, { ctx }) => {
    const upcoming = ctx.bookings; // already sorted soonest-first
    if (upcoming.length === 0) {
      return {
        ok: true,
        summary:
          "You've nothing booked at the moment — want me to set up a service, valet or lounge pass?",
      };
    }
    return {
      ok: true,
      summary: `You've ${upcoming.length} thing${
        upcoming.length === 1 ? "" : "s"
      } coming up — here they are.`,
      card: {
        kind: "history",
        rows: upcoming.slice(0, 5).map((b) => ({
          title: b.title,
          meta: `${b.when} · ${b.detail}`,
        })),
      },
    };
  },
};

/** "a, b and c" for the up-to-three topics we can talk through. */
function listTopics(items: string[]): string {
  const top = items.slice(0, 3).map((s) => s.toLowerCase());
  if (top.length <= 1) return top[0] ?? "the basics";
  return `${top.slice(0, -1).join(", ")} and ${top[top.length - 1]}`;
}

const ownersManual: Tool = {
  id: "owners-manual",
  label: "Opening the owner's manual",
  description:
    "Answer an owner's-manual / how-to question and link the official Lexus manual.",
  consequential: false,
  run: (args, { ctx }) => {
    const vehicleId = args.vehicleId as string | undefined;
    const modelId = args.modelId as string | undefined;
    const topicId = args.topicId as string | undefined;
    const specId = args.specId as string | undefined;

    // Subject: a member's vehicle, else a named catalog model, else the
    // member's default vehicle.
    const vehicle = vehicleId
      ? ctx.vehicles.find((v) => v.id === vehicleId)
      : undefined;
    const model: ModelManual | undefined =
      vehicle?.modelManual ??
      (modelId ? modelManuals.find((m) => m.id === modelId) : undefined) ??
      ctx.defaultVehicle.modelManual;

    const name = vehicle
      ? vehicle.shortName
      : model
      ? model.model
      : ctx.defaultVehicle.shortName;

    const brochureLink = model
      ? { label: `${model.model} brochure (PDF)`, url: model.brochureUrl }
      : { label: "Lexus owner resources", url: lexusOwnersHub };
    const overviewLink = model
      ? { label: `${model.model} model overview`, url: model.overviewUrl }
      : null;
    // Default order: brochure first, then overview.
    const links = overviewLink ? [brochureLink, overviewLink] : [brochureLink];

    // How-to question answered from the owner's manual.
    const topic = topicId ? manualTopics.find((t) => t.id === topicId) : undefined;
    if (topic) {
      return {
        ok: true,
        summary: topic.answer(name),
        card: {
          kind: "manual",
          title: `${name} · ${topic.label}`,
          section: `Owner's manual — ${topic.section}`,
          links,
        },
      };
    }

    // Spec / feature / range question answered from the eBrochure or overview.
    const spec = specId ? brochureTopics.find((t) => t.id === specId) : undefined;
    if (spec && model) {
      const ordered =
        spec.source === "overview" && overviewLink
          ? [overviewLink, brochureLink]
          : links;
      return {
        ok: true,
        summary: spec.answer({
          model,
          name,
          powertrains: vehicle ? [vehicle.powertrain] : model.powertrains,
        }),
        card: {
          kind: "manual",
          title: `${name} · ${spec.label}`,
          section:
            spec.source === "overview"
              ? `Model overview — ${spec.label}`
              : `Lexus eBrochure — ${spec.label}`,
          links: ordered,
        },
      };
    }

    const topics = (
      vehicle
        ? topicsFor(vehicle.powertrain)
        : model
        ? topicsForAny(model.powertrains)
        : topicsFor("Petrol")
    ).map((t) => t.label);
    return {
      ok: true,
      summary: `Here's the ${name} brochure with the full specs and features. I can also walk you through ${listTopics(
        topics
      )} from the owner's manual right here — just ask.`,
      card: {
        kind: "manual",
        title: `${name} brochure & guides`,
        body: "Download the eBrochure for specs and features, or ask me a how-to question and I'll answer it from the owner's manual here.",
        links,
        topics,
      },
    };
  },
};

const recommendTravel: Tool = {
  id: "recommend-travel",
  label: "Curating escapes for you",
  description: "Suggest stays and experiences tuned to the member's interests.",
  consequential: false,
  run: (_args, { ctx }) => {
    const picks = travelPicks(ctx);
    const tags = ctx.interests.slice(0, 2).join(" and ").toLowerCase();
    return {
      ok: true,
      summary: tags
        ? `Based on your taste for ${tags}, here are three worth a look — our concierge can arrange any of them.`
        : "Here are three escapes worth a look — our concierge can arrange any of them.",
      card: { kind: "offers", items: picks },
    };
  },
};

// ── Act tools (consequential unless noted) ──────────────────────────────────

const bookService: Tool = {
  id: "book-service",
  label: "Setting up your service booking",
  description:
    "Surface the service booking steps (dealer, date, time, loan car) inline in the concierge.",
  consequential: false,
  run: (args, { ctx }) => {
    const v = resolveVehicle(args, ctx);
    // No flyout — the booking-flow card runs the whole flow inline in the
    // concierge thread and writes the real booking when confirmed.
    return {
      ok: true,
      // Empty summary → no redundant closing line after the inline form; the
      // intent lead-in already set it up and the form follows.
      summary: "",
      card: {
        kind: "booking-flow",
        flow: "service",
        vehicleName: `${v.year} ${v.name}`,
      },
    };
  },
};

const redeemLounge: Tool = {
  id: "redeem-lounge",
  label: "Setting up your lounge pass",
  description: "Surface the DragonPass lounge redemption step inline.",
  consequential: false,
  run: () => ({
    ok: true,
    summary: "",
    card: { kind: "booking-flow", flow: "lounge" },
  }),
};

const bookValet: Tool = {
  id: "book-valet",
  label: "Setting up valet parking",
  description: "Surface the complimentary valet booking steps inline.",
  consequential: false,
  run: () => ({
    ok: true,
    summary: "",
    card: { kind: "booking-flow", flow: "valet" },
  }),
};

const roadside: Tool = {
  id: "roadside",
  label: "Connecting DriveCare",
  description: "Surface 24/7 roadside assistance and how to reach it.",
  consequential: false,
  run: (_args, { providers }) => {
    providers.openFlyout("drivecare", { returnTo: "concierge" });
    return {
      ok: true,
      summary:
        "DriveCare is on call 24/7. I've opened it — or call 1800 023 009, option 2.",
      card: {
        kind: "contact",
        name: "Lexus DriveCare",
        phone: "1800 023 009",
        note: "24-hour roadside assistance for Encore members.",
      },
    };
  },
};

const connectVehicle: Tool = {
  id: "connect-vehicle",
  label: "Starting connection",
  description: "Open the Connected Services setup for a vehicle.",
  consequential: true,
  run: (args, { ctx, providers }) => {
    const v = resolveVehicle(args, ctx);
    providers.openFlyout("connect", {
      vehicleId: v.id,
      vehicleName: `${v.year} ${v.name}`,
      returnTo: "concierge",
    });
    return {
      ok: true,
      summary: `I've started Connected Services setup for your ${v.shortName} — a few quick confirmations and you're live.`,
    };
  },
};

const navigateTool: Tool = {
  id: "navigate",
  label: "Taking you there",
  description: "Navigate to a section or open a specific vehicle.",
  consequential: false,
  run: (args, { providers }) => {
    const vehicleId = args.vehicleId as string | undefined;
    if (vehicleId) {
      providers.openVehicle(vehicleId);
      return { ok: true, summary: "Opening that vehicle for you." };
    }
    const section = (args.section as Section) ?? "Dashboard";
    providers.navigate(section);
    return { ok: true, summary: `Taking you to ${section}.` };
  },
};

const loanCar: Tool = {
  id: "loan-car",
  label: "Arranging a loan car",
  description: "Open On Demand / service loan-car booking.",
  consequential: false,
  run: (_args, { providers }) => {
    providers.openFlyout("loan-car", { returnTo: "concierge" });
    return {
      ok: true,
      summary:
        "I've opened On Demand loan-car booking — pick your dates and I'll hold a car for you.",
    };
  },
};

const preferredDealerTool: Tool = {
  id: "preferred-dealer",
  label: "Opening your dealer",
  description: "Show and change the member's preferred service dealer.",
  consequential: false,
  run: (_args, { ctx, providers }) => {
    providers.openFlyout("preferred-dealer", { returnTo: "concierge" });
    return {
      ok: true,
      summary: `Your preferred dealer is ${ctx.preferredDealer.name}. I've opened it so you can change it whenever you like.`,
    };
  },
};

const catchUp: Tool = {
  id: "notifications",
  label: "Checking your notifications",
  description: "Summarise the member's unread notifications.",
  consequential: false,
  run: (_args, { ctx }) => {
    const unread = ctx.notifications.filter((n) => n.unread);
    if (unread.length === 0) {
      return { ok: true, summary: "You're all caught up — nothing unread right now." };
    }
    return {
      ok: true,
      summary: `You've ${unread.length} unread update${
        unread.length === 1 ? "" : "s"
      } — here's the gist.`,
      card: {
        kind: "history",
        rows: unread.map((n) => ({ title: n.title, meta: n.body })),
      },
    };
  },
};

export const TOOLS: Tool[] = [
  vehicleStatus,
  serviceHistoryTool,
  listBenefits,
  accountSummary,
  profileDetails,
  upcomingBookings,
  ownersManual,
  recommendTravel,
  catchUp,
  bookService,
  redeemLounge,
  bookValet,
  roadside,
  connectVehicle,
  loanCar,
  preferredDealerTool,
  navigateTool,
];

const TOOL_MAP = new Map(TOOLS.map((t) => [t.id, t] as const));

export function getTool(id: string): Tool | undefined {
  return TOOL_MAP.get(id);
}

export type { BookingKind };
