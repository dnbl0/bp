// ──────────────────────────────────────────────────────────────────────────
// Agent runtime — the plan-and-execute loop.
//
// `plan()` turns a member message + context (+ short conversational memory)
// into an AgentTurn: a spoken lead-in, an ordered list of tool steps, an
// optional spoken "offer" a bare "yes" can act on, and follow-up suggestions.
// It is the deterministic "brain" — intent matching over the tool registry —
// and is the single seam a real LLM would slot behind later (same AgentTurn
// shape). It handles smalltalk, affirmations, compound requests (multiple
// intents in one message) and pronoun/name references to a vehicle.
//
// `runTurn()` executes a plan's steps in order, emitting status as it goes,
// pausing at consequential steps until the caller confirms, and bailing early
// if the caller signals cancellation. UI-free: the caller supplies the
// update/confirm/cancel/delay handlers.
// ──────────────────────────────────────────────────────────────────────────

import { offers, type Section } from "../../data/dashboard";
import { lifestyleOffers } from "../../data/benefits";
import { findModelManual, matchBrochureTopic, matchTopic } from "../../data/manuals";
import type { UserContext, VehicleView } from "./context";
import { getTool, type ToolContext, type ToolResult } from "./tools";

// Distinctive name tokens of the curated travel/lifestyle picks (e.g. "raes",
// "jackalope", "wategos"). Used to spot "tell me about <pick>" so it routes to
// the concierge handoff instead of the capability list.
const PICK_STOP = new Set([
  "hotel", "resort", "lodge", "the", "on", "one", "only", "and", "at", "by",
  "of", "valley", "spa", "encore", "escape", "escapes",
]);
const TRAVEL_PICK_TOKENS = Array.from(
  new Set(
    [...offers, ...lifestyleOffers]
      .flatMap((o) => o.brand.toLowerCase().split(/[^a-z]+/))
      .filter((w) => w.length >= 4 && !PICK_STOP.has(w))
  )
);
function mentionsTravelPick(msg: string): boolean {
  const m = msg.toLowerCase();
  return TRAVEL_PICK_TOKENS.some((t) => new RegExp(`\\b${t}\\b`).test(m));
}

export type StepStatus =
  | "pending"
  | "running"
  | "awaiting-confirm"
  | "done"
  | "error"
  | "skipped";

export interface PlanStep {
  id: string;
  toolId: string;
  args: Record<string, unknown>;
  /** Verb-phrase shown while the step runs. */
  label: string;
  consequential: boolean;
  /** Prompt shown at the confirm gate (consequential steps only). */
  confirm?: string;
}

/** An action the agent has spoken but not yet run — a bare "yes" triggers it. */
export interface Offer {
  toolId: string;
  args?: Record<string, unknown>;
  label: string;
  confirm?: string;
}

export interface AgentTurn {
  /** The agent's lead-in line, streamed before steps appear. */
  say: string;
  steps: PlanStep[];
  /** Suggested next prompts (quick-reply chips). */
  followups: string[];
  /** When the turn offers but doesn't run an action, what "yes" should do. */
  offer?: Offer;
}

/** Short carry-over the controller threads back in on the next message. */
export interface Memory {
  /** The action the agent last offered (so "yes / do it" can run it). */
  offer?: Offer;
  /** The vehicle the last turn acted on (so "the other one" can flip it). */
  vehicleId?: string;
  /** Tools the last turn ran (so "book one of these" knows the context). */
  lastToolIds?: string[];
}

export interface RunStep extends PlanStep {
  status: StepStatus;
  result?: ToolResult;
}

let seq = 0;
const nextId = () => `step-${++seq}`;

/** Build a PlanStep from a tool id, inheriting the tool's label/consequence. */
export function stepFor(
  toolId: string,
  args: Record<string, unknown> = {},
  overrides: Partial<Pick<PlanStep, "label" | "confirm">> = {}
): PlanStep {
  const tool = getTool(toolId);
  return {
    id: nextId(),
    toolId,
    args,
    label: overrides.label ?? tool?.label ?? toolId,
    consequential: tool?.consequential ?? false,
    confirm: overrides.confirm,
  };
}

// ── Vehicle reference resolution ────────────────────────────────────────────

/**
 * Resolve which vehicle a message is about. Honours an explicit model mention
 * ("the UX", "my NX"), then a "other/different car" flip against memory, then
 * a caller-supplied preference, falling back to the primary vehicle.
 */
/** A vehicle named explicitly by its model token ("the UX", "my NX"), else none. */
function resolveNamedVehicle(message: string, ctx: UserContext): VehicleView | undefined {
  const msg = message.toLowerCase();
  return ctx.vehicles.find((v) => {
    const token = v.shortName.split(" ")[0].toLowerCase();
    return token.length >= 2 && new RegExp(`\\b${token}\\b`).test(msg);
  });
}

/** Small cardinals for the garage lead-in ("two vehicles"); numeral past four. */
function numberWord(n: number): string {
  return ["zero", "one", "two", "three", "four"][n] ?? String(n);
}

function resolveVehicleRef(
  message: string,
  ctx: UserContext,
  opts: { prefer?: VehicleView; memoryVehicleId?: string } = {}
): VehicleView {
  const msg = message.toLowerCase();

  // Explicit model mention — match on the leading model token (ux, nx, …).
  const named = resolveNamedVehicle(message, ctx);
  if (named) return named;

  // "the other / different / my second car" → flip away from memory/primary.
  if (/\b(other|different|second|the one|that one)\b/.test(msg) && ctx.vehicles.length > 1) {
    const anchorId = opts.memoryVehicleId ?? ctx.defaultVehicle.id;
    const flipped = ctx.vehicles.find((v) => v.id !== anchorId);
    if (flipped) return flipped;
  }

  // Otherwise stay on the car the conversation is already about (memory),
  // then a caller preference, then the primary vehicle.
  const remembered = opts.memoryVehicleId
    ? ctx.vehicles.find((v) => v.id === opts.memoryVehicleId)
    : undefined;
  return opts.prefer ?? remembered ?? ctx.defaultVehicle;
}

// ── Intent registry ─────────────────────────────────────────────────────────

interface Intent {
  id: string;
  test: RegExp;
  build: (ctx: UserContext, message: string, memory: Memory) => AgentTurn;
}

// Ordered — more specific intents sit above general ones. Unlike before, the
// planner collects *all* matches so compound requests chain (see `plan`).
const INTENTS: Intent[] = [
  {
    id: "service",
    // Note: bare "book" is deliberately *not* here — it over-matched
    // "book a loan car", "book valet". Informational asks are excluded so they
    // route elsewhere: "service history/record" → history intent; "service
    // interval/schedule" and "maintenance schedule" → manual intent. The
    // remaining service words gate this booking intent.
    test: /\b(servicing|logbook|mechanic)\b|\bmaintenance\b(?!\s+(?:schedule|guide|interval|intervals))|\bservice\b(?!\s+(?:history|record|records|interval|intervals|schedule))/i,
    build: (ctx, message, memory) => {
      const v = resolveVehicleRef(message, ctx, {
        prefer: ctx.vehicles.find((x) => x.nextService) ?? ctx.defaultVehicle,
        memoryVehicleId: memory.vehicleId,
      });
      return {
        // Surfaces the booking steps inline (see the booking-flow card) — the
        // member picks dealer, date, time and loan car right here in chat.
        say: `Let's book the service on your ${v.shortName} — I'll walk you through it right here.`,
        steps: [stepFor("book-service", { vehicleId: v.id })],
        followups: ["See my service history", "Change my preferred dealer"],
      };
    },
  },
  {
    id: "lounge",
    test: /\b(lounge|airport|dragonpass|flight|flying|fly)\b/i,
    build: () => ({
      say: "Happy to set up your airport lounge access — just confirm below.",
      steps: [stepFor("redeem-lounge")],
      followups: ["Plan a trip around it", "Reserve valet parking"],
    }),
  },
  {
    id: "valet",
    test: /\b(valet|parking|park)\b/i,
    build: () => ({
      // Surfaces valet location selection inline (booking-flow card).
      say: "Let's sort complimentary valet — pick your location below.",
      steps: [stepFor("book-valet")],
      followups: ["Show all valet locations", "What are my Encore benefits?"],
    }),
  },
  {
    id: "roadside",
    test: /\b(roadside|breakdown|broke down|broken down|tow|towed|flat tyre|flat tire|flat battery|dead battery|jump ?start|stranded|drivecare|accident|crash|emergency|won'?t start|won'?t go|not starting)\b/i,
    build: () => ({
      say: "Let's get you help right now.",
      steps: [stepFor("roadside")],
      followups: ["Book a loan car", "Find my nearest dealer"],
    }),
  },
  {
    id: "connect",
    test: /\b(connect|connected services?|remote|over.the.air|ota)\b/i,
    build: (ctx, message, memory) => {
      const v = resolveVehicleRef(message, ctx, {
        prefer: ctx.defaultVehicle,
        memoryVehicleId: memory.vehicleId,
      });
      return {
        say: `Let's get your ${v.shortName} connected.`,
        steps: [
          stepFor("connect-vehicle", { vehicleId: v.id }, {
            confirm: `Start Connected Services setup for your ${v.shortName}?`,
          }),
        ],
        followups: ["What do connected services do?"],
      };
    },
  },
  {
    id: "travel",
    test: /\b(travel|trip|escape|weekend|holiday|getaway|dining|restaurant|eat|hotel|stay|away)\b/i,
    build: () => ({
      say: "Let me pull a few escapes I think you'll like.",
      steps: [stepFor("recommend-travel")],
      followups: ["How do I book one?", "Set up a lounge pass"],
    }),
  },
  {
    id: "lifestyle",
    // Curated experiences (driving days, dining, golf, wellness…) aren't
    // directly bookable — the concierge arranges them. Answer honestly rather
    // than dropping to the capability list.
    test: /\b(experiences?|lifestyle|driving day|track day|hot lap|masterclass|degustation|tasting|private chef|golf|wellness|spa)\b/i,
    build: (ctx) => conciergeArranged(ctx, "experience"),
  },
  {
    id: "benefits",
    test: /\b(points|tier|benefits?|perks?|entitlements?|encore|redeem|rewards?|platinum)\b/i,
    build: () => ({
      say: "Here's what your membership has on tap.",
      steps: [stepFor("list-benefits")],
      followups: ["Plan a trip", "Set up a lounge pass"],
    }),
  },
  {
    id: "account",
    // Membership identity / renewal / tenure — distinct from `benefits`
    // (what you can redeem) and `profile` (contact details).
    test: /\b(membership|member (?:id|number)|account number|renews?|renewal|member since|how long have i been|when did i join|joined encore|my account details)\b/i,
    build: () => ({
      say: "Here's your Encore membership at a glance.",
      steps: [stepFor("account")],
      followups: ["What can I redeem?", "Show my details"],
    }),
  },
  {
    id: "history",
    test: /\b(history|past service|last service|records?|serviced)\b/i,
    build: () => ({
      say: "Pulling your service record.",
      steps: [stepFor("service-history")],
      followups: ["Book the next service", "Change my dealer"],
    }),
  },
  {
    id: "garage",
    // The member's cars as a set — "tell me about my vehicles", "what cars do
    // I have", "both my cars". Sits above `status` (which targets one vehicle)
    // so a collective ask lists the whole garage. Also why the bare singular
    // `\bvehicle\b` in `status` never caught the plural "vehicles" — that
    // dropped to the fallback before this intent existed.
    test: /\b(vehicles|cars|fleet)\b|\bwhat (?:cars?|vehicles?) (?:do|have) i\b|\b(?:both|all)\b.*\b(?:cars?|vehicles?)\b/i,
    build: (ctx, message, memory) => {
      // A specific model in the message → just that one (defer to single status).
      const named = resolveNamedVehicle(message, ctx);
      if (named || ctx.vehicles.length <= 1) {
        const v = named ?? ctx.defaultVehicle;
        return {
          say: `Here's the latest on your ${v.shortName}.`,
          steps: [stepFor("vehicle-status", { vehicleId: v.id })],
          followups: ["Book a service", "See service history"],
        };
      }
      // Otherwise summarise every vehicle — a spoken detail line per car
      // (odometer + service timing), then one status card each.
      const rundown = ctx.vehicles
        .map((v) => {
          const svc = v.nextService
            ? `next service ${v.nextServiceRelative ?? "coming up"}`
            : "nothing due";
          return `your ${v.shortName} is on ${v.odometer} with ${svc}`;
        })
        .join("; ");
      return {
        say: `You've ${numberWord(ctx.vehicles.length)} vehicles on your account, ${ctx.member.firstName} — ${rundown}. Here's each in full.`,
        steps: ctx.vehicles.map((v) =>
          stepFor("vehicle-status", { vehicleId: v.id }, {
            label: `Checking your ${v.shortName}`,
          })
        ),
        followups: ["Book a service", "Connect my car", "See service history"],
      };
    },
  },
  {
    id: "status",
    // Note: "tyre"/"battery" belong to the manual intent (tyre pressures, EV
    // battery care), so they're deliberately not status triggers here.
    test: /\b(status|odometer|odo|km|kms|mileage|health|my car|my lexus|vehicle|rego|registration|number plate|plate|vin)\b/i,
    build: (ctx, message, memory) => {
      const v = resolveVehicleRef(message, ctx, {
        memoryVehicleId: memory.vehicleId,
      });
      return {
        say: `Here's the latest on your ${v.shortName}.`,
        steps: [stepFor("vehicle-status", { vehicleId: v.id })],
        followups: ["Book a service", "See service history"],
      };
    },
  },
  {
    id: "profile",
    // Specific personal/contact fields → answer with the details on file.
    // Bare "profile"/"account" stay with `navigate` (they open the page).
    // "phone number"/"mobile", not bare "phone" — "pair my phone" is a manual
    // how-to, not a request for the number on file.
    test: /\b(email|e-mail|phone number|mobile|my number|contact details?|contact info|home address|postal address|my address|date of birth|dob|driver'?s? licen[cs]e|licen[cs]e number|personal details|my details)\b/i,
    build: () => ({
      say: "Here are the details we hold for you.",
      steps: [stepFor("profile")],
      followups: ["Update my details", "Show my membership"],
    }),
  },
  {
    id: "manual",
    // Owner's-manual / how-to questions ("how do I charge it", "what does this
    // warning light mean") AND eBrochure / model-overview questions (specs,
    // features, dimensions, grades, colours, pricing). The model and the
    // specific topic are resolved inside build().
    // No trailing \b: it must still match the plural forms owners use
    // ("drive modes", "warning lights", "service intervals", "tyre pressures").
    test: /\b(owner'?s? manual|manual|handbook|user guide|brochure|warning light|dashboard light|dash light|charg(?:e|ing)|drive mode|tyre pressure|tire pressure|service interval|service schedule|maintenance schedule|pair (?:my )?phone|ev battery|battery care|battery health|battery warranty|how to charge|specs?|specifications?|features?|equipment|dimensions?|how big|boot|cargo|seats?|seating|towing|fuel economy|fuel consumption|fuel type|performance|how powerful|power output|engine|motor|drive ?train|power ?train|transmission|gearbox|awd|4wd|all wheel drive|hybrid system|is it electric|is it a hybrid|grades?|variants?|trims?|line ?up|colou?rs?|paint|interior trim|price|pricing|cost|how much (?:is|does|are|to)|rrp|drive ?away)/i,
    build: (ctx, message, memory) => {
      // Which car? A named model the member owns, else a model from the AU
      // catalog ("an RX"), else the vehicle in focus / their default.
      const ownedVehicle = resolveNamedVehicle(message, ctx);
      const catalogModel = ownedVehicle ? undefined : findModelManual(message);
      const vehicle =
        ownedVehicle ??
        (catalogModel
          ? undefined
          : resolveVehicleRef(message, ctx, { memoryVehicleId: memory.vehicleId }));

      // How-to (manual) first; if none, a spec/feature (brochure/overview) topic.
      const topic = matchTopic(
        message,
        vehicle ? vehicle.powertrain : catalogModel?.powertrains ?? "Petrol"
      );
      const spec = topic ? undefined : matchBrochureTopic(message);
      const subject = vehicle?.shortName ?? catalogModel?.model ?? ctx.defaultVehicle.shortName;

      const args: Record<string, unknown> = {};
      if (vehicle) args.vehicleId = vehicle.id;
      if (catalogModel) args.modelId = catalogModel.id;
      if (topic) args.topicId = topic.id;
      if (spec) args.specId = spec.id;

      const say = topic
        ? `Let me check the ${subject} owner's manual on that.`
        : spec
        ? spec.source === "overview"
          ? `Let me pull up the ${subject} details.`
          : `Here's what the ${subject} brochure covers.`
        : `Here's the ${subject} brochure and guides.`;

      return {
        say,
        steps: [stepFor("owners-manual", args)],
        followups:
          topic || spec
            ? ["What features does it have?", "Book a service", "Check my vehicle"]
            : [
                "How do I charge it?",
                "What are the specs?",
                "Service intervals",
              ],
      };
    },
  },
  {
    id: "loan-car",
    test: /\b(loan car|loan-car|loaner|courtesy car|hire car|replacement car|on demand|on-demand)\b/i,
    build: () => ({
      say: "Let's get you into a loan car.",
      steps: [stepFor("loan-car")],
      followups: ["Book my service", "Find my nearest dealer"],
    }),
  },
  {
    id: "dealer",
    test: /\b(dealer|dealership|preferred dealer|nearest dealer|local dealer|service cent(?:re|er))\b/i,
    build: (ctx) => ({
      say: `Your preferred dealer is ${ctx.preferredDealer.name} — let me open it.`,
      steps: [stepFor("preferred-dealer")],
      followups: ["Book my service", "See service history"],
    }),
  },
  {
    id: "notifications",
    test: /\b(notifications?|catch me up|what'?s new|unread|alerts?|any news|messages?|inbox)\b/i,
    build: () => ({
      say: "Let me catch you up.",
      steps: [stepFor("notifications")],
      followups: ["Book my service", "Plan a weekend escape"],
    }),
  },
  {
    id: "bookings",
    // The member's existing bookings/appointments — read-only summary. Noun
    // forms only ("my bookings"), so it never catches "book a service".
    test: /\b(bookings?|appointments?|reservations?|upcoming|what'?s? (?:coming up|booked|scheduled)|anything booked|have i got booked|my schedule)\b/i,
    build: () => ({
      say: "Let me check what's on your calendar.",
      steps: [stepFor("bookings")],
      followups: ["Book my service", "Plan a weekend escape"],
    }),
  },
  {
    id: "navigate",
    // Section nouns only — kept clear of words other intents claim (e.g.
    // "my lexus"/"vehicle" belong to status, "benefits" to benefits).
    test: /\b(dashboard|home screen|my garage|the garage|garage|my profile|profile|my account|account settings)\b/i,
    build: (_ctx, message) => {
      const m = message.toLowerCase();
      const section: Section = /garage/.test(m)
        ? "My Lexus"
        : /profile|account/.test(m)
          ? "Profile"
          : "Dashboard";
      return {
        say: `Taking you to ${section}.`,
        steps: [stepFor("navigate", { section })],
        followups: ["Check my vehicle", "Book my service"],
      };
    },
  },
];

// ── Conversational shortcuts (no tools) ─────────────────────────────────────

const AFFIRM = /^(?:\s*)(yes|yep|yeah|yup|sure|ok|okay|please do|go ahead|do it|go for it|book it|sounds good|that works|please|👍)\b/i;
const DECLINE = /^(?:\s*)(no|nope|nah|not now|not right now|cancel|never mind|nevermind|don'?t)\b/i;
const GREET = /^(?:\s*)(hi|hey|hello|hiya|yo|good (morning|afternoon|evening)|gday|g'day)\b/i;
const THANKS = /\b(thanks|thank you|cheers|ta|appreciate it|much appreciated)\b/i;
const HELP = /\b(help|what can you do|what do you do|how does this work|who are you|what are you|options|capabilities)\b/i;

// ── Message normalisation ───────────────────────────────────────────────────

/**
 * Light, deterministic clean-up so the matchers see consistent text: expand
 * "what's"→"what is", drop politeness filler ("can you", "please", "I'd like
 * to"), and strip stray punctuation while keeping +, /, - (for "450h+",
 * "0-100"). No stemming, no LLM — just fewer ways for the same ask to miss.
 */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/\b(what|that|how|where|who|there|here|it|she|he)'s\b/g, "$1 is")
    .replace(
      /\b(?:can you|could you|would you|will you|can i|could i|i want to know|i'd like to know|i would like to know|i want to|i'd like to|i would like to|i need to|please|kindly|just|simply|tell me|let me know|do you know)\b/g,
      " "
    )
    .replace(/[^\w\s'+/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ── Soft keyword fallback ───────────────────────────────────────────────────
// When no intent's regex fires, score the message against each intent's keyword
// bag and route to the best match. Multi-word phrases score 2, single words
// (prefix-matched, so "charg" catches "charging") score 1. Ties keep the
// higher-priority intent. This widens recognition to natural phrasings the
// strict regexes don't enumerate — still fully deterministic.

const SOFT_KEYWORDS: Record<string, string[]> = {
  roadside: [
    "roadside", "breakdown", "broke down", "broken down", "tow", "towed",
    "stranded", "flat tyre", "flat tire", "flat battery", "dead battery",
    "jump start", "wont start", "not starting", "accident", "crash",
    "drivecare", "emergency", "stuck", "help me", "punctur",
  ],
  service: [
    "service", "servicing", "serviced", "book it in", "mechanic", "logbook",
    "log book", "oil change", "brake", "clutch", "tune up", "major service",
    "minor service", "capped price", "needs a service", "due for service",
    "overdue", "get it looked at",
  ],
  history: [
    "service history", "past service", "previous service", "last service",
    "service record", "maintenance history", "been done", "serviced before",
    "when was it serviced",
  ],
  "loan-car": [
    "loan car", "loaner", "courtesy car", "hire car", "replacement car",
    "on demand", "ondemand", "car while", "while it's serviced",
  ],
  dealer: [
    "dealer", "dealership", "preferred dealer", "nearest dealer",
    "local dealer", "service centre", "service center", "where to service",
    "closest lexus",
  ],
  lounge: [
    "lounge", "airport lounge", "dragonpass", "airport", "flight", "flying",
    "lounge pass", "lounge access",
  ],
  valet: ["valet", "parking", "park my car", "park the car", "valet parking"],
  connect: [
    "connect", "connected service", "connectivity", "pair the car", "link my car",
    "remote start", "remote access", "telematics", "over the air", "lexus connect",
    "companion app", "enrol",
  ],
  travel: [
    "travel", "trip", "holiday", "vacation", "getaway", "weekend away",
    "escape", "road trip", "dining", "restaurant", "eat out", "book a table",
    "somewhere to stay", "accommodation", "where to go",
  ],
  lifestyle: [
    "experience", "driving day", "track day", "hot lap", "masterclass",
    "degustation", "tasting", "private chef", "golf", "wellness", "spa retreat",
  ],
  benefits: [
    "points", "tier", "benefit", "perk", "reward", "redeem", "entitlement",
    "platinum", "what do i get", "included with encore",
  ],
  account: [
    "membership", "member number", "member id", "member since", "renew",
    "renewal", "expiry", "expires", "joined", "sign up date", "my account",
    "account details",
  ],
  profile: [
    "email", "e-mail", "phone number", "mobile", "my number", "contact details",
    "contact info", "home address", "postal address", "my address",
    "date of birth", "dob", "licence", "license", "my details",
    "personal details", "update my details",
  ],
  bookings: [
    "booking", "appointment", "reservation", "upcoming", "scheduled",
    "what is on", "my calendar", "anything booked", "what have i got on",
    "got anything on", "anything on this", "anything coming up",
  ],
  notifications: [
    "notification", "alert", "what is new", "unread", "any news", "message",
    "inbox", "catch me up", "catch up",
  ],
  garage: [
    "my vehicles", "my cars", "both cars", "all my cars", "my garage", "fleet",
    "what cars", "which cars", "cars do i", "vehicles do i",
  ],
  status: [
    "odometer", "odo", "mileage", "kilometre", "kilometer", "km on", "rego",
    "registration", "number plate", "numberplate", "plate", "vin", "chassis",
    "how is my car", "health", "condition", "roadworthy", "is it due",
  ],
  manual: [
    "manual", "handbook", "owners guide", "user guide", "how do i", "how to",
    "what does", "charge", "charging", "top up", "range", "how far",
    "warning light", "dash light", "engine light", "drive mode", "eco mode",
    "sport mode", "tyre pressure", "tire pressure", "psi", "battery care",
    "battery health", "battery", "pair my phone", "bluetooth", "carplay", "android auto",
    "spec", "feature", "equipment", "dimension", "how big", "boot space",
    "cargo", "luggage", "seat", "seating", "towing", "tow capacity",
    "ground clearance", "fuel economy", "fuel consumption", "fuel type",
    "efficiency", "powertrain", "power train", "drivetrain", "drive train",
    "driveline", "engine", "motor", "transmission", "gearbox", "awd", "4wd",
    "all wheel drive", "front wheel", "horsepower", "kilowatt", "torque",
    "performance", "how powerful", "acceleration", "top speed", "grade",
    "variant", "trim", "line up", "lineup", "colour", "color", "paint",
    "interior", "upholstery", "price", "pricing", "cost", "how much", "rrp",
    "drive away", "warranty", "spare tyre", "spare wheel", "tow bar",
    "accessor", "roof rack", "child seat", "isofix",
  ],
  navigate: [
    "dashboard", "home screen", "my garage", "open my profile",
    "account settings", "take me to my", "go to my",
  ],
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Best intent for a message by keyword score, or null if nothing scores. */
function softMatch(norm: string): Intent | null {
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const bag = SOFT_KEYWORDS[intent.id];
    if (!bag) continue;
    let score = 0;
    for (const kw of bag) {
      if (kw.includes(" ")) {
        if (norm.includes(kw)) score += 2;
      } else if (new RegExp(`\\b${escapeRe(kw)}`).test(norm)) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return best;
}

/** Build the turn that runs a stored offer (the answer to "yes"). */
function runOffer(offer: Offer): AgentTurn {
  return {
    say: "On it.",
    steps: [
      stepFor(offer.toolId, offer.args ?? {}, {
        label: offer.label,
        confirm: offer.confirm,
      }),
    ],
    followups: [],
  };
}

/** The capability summary, kept in one place for the help intent + fallback. */
function capabilities(ctx: UserContext): string {
  return `I'm your Lexus Concierge, ${ctx.member.firstName}. I can book your service, set up airport lounge or valet, plan a weekend escape, connect a car or get DriveCare to you — and answer anything about your vehicles, Encore membership, benefits, bookings or how-to questions from your owner's manual. What would help?`;
}

/** What I can do when no intent matches — honest, never a faked "I'm on it". */
function fallback(ctx: UserContext): AgentTurn {
  return {
    say: `I'm not sure I can do that one directly, ${ctx.member.firstName} — but I can book a service, set up airport lounge or valet, plan a weekend escape, connect a car, sort a loan car or roadside, walk you through your owner's manual, or tell you about your vehicles, membership, benefits, bookings and account details.`,
    steps: [],
    followups:
      insightFollowups(ctx) ?? [
        "Book my service",
        "Set up a lounge pass",
        "Plan a weekend escape",
      ],
  };
}

/**
 * Honest answer for the things the concierge arranges but the agent can't
 * transact directly — curated stays ("tell me about Raes", "how do I book
 * one?") and lifestyle experiences ("book a driving experience"). It says so
 * and offers the human concierge, rather than dumping the capability list.
 */
function conciergeArranged(
  ctx: UserContext,
  kind: "stay" | "experience"
): AgentTurn {
  const lead =
    kind === "experience"
      ? `Experiences like that are arranged by our Encore concierge, ${ctx.member.firstName} — I can't book them directly, but the concierge curates the whole thing for you.`
      : `Those escapes are curated by our Encore concierge, ${ctx.member.firstName} — I can't reserve the stay directly, but the concierge arranges it end to end (including any Encore rates) and can tell you more.`;
  return {
    say: `${lead} Call Encore on 1800 023 009, any time. Meanwhile I can set up a lounge pass or valet for the trip.`,
    steps: [],
    followups: ["Set up a lounge pass", "Reserve valet parking", "Plan a weekend escape"],
  };
}

/**
 * Map a member message to a plan. Resolves smalltalk and "yes/no" against the
 * prior turn first, then collects every matching intent so compound requests
 * ("book my service and set up a lounge pass") chain into one turn. Falls back
 * to a guided, insight-led reply.
 */
export function plan(
  message: string,
  ctx: UserContext,
  memory: Memory = {}
): AgentTurn {
  const msg = message.trim();
  // Normalised text used for all intent matching (regex + soft keywords) and
  // for the builders' own sub-resolution, so phrasing variants land the same.
  const norm = normalize(msg);

  // "Yes / go ahead" — run whatever the agent last offered.
  if (AFFIRM.test(msg) && memory.offer) {
    return runOffer(memory.offer);
  }
  // "No / not now" — acknowledge, clear the offer.
  if (DECLINE.test(msg) && msg.split(/\s+/).length <= 4) {
    return {
      say: "No problem — I'll leave it. Anything else I can do?",
      steps: [],
      followups: ["Book my service", "Plan a weekend escape", "Check my vehicle"],
    };
  }
  // Greeting (only when it's essentially just a greeting, not "hi, book X").
  if (GREET.test(msg) && msg.split(/\s+/).length <= 3) {
    const lead = ctx.insights[0];
    return {
      say: `${ctx.greeting}, ${ctx.member.firstName}. ${
        lead
          ? `One thing on my radar: ${lead.title.toLowerCase()}. Want me to handle it?`
          : "What can I help you with today?"
      }`,
      steps: [],
      followups: insightFollowups(ctx) ?? [
        "Book my service",
        "Set up a lounge pass",
        "Plan a weekend escape",
      ],
      offer: lead?.suggest
        ? { toolId: lead.suggest.toolId, args: lead.suggest.args, label: lead.suggest.label }
        : undefined,
    };
  }
  // Thanks — warm acknowledgement, no tools (unless combined with a request).
  if (THANKS.test(msg) && !INTENTS.some((i) => i.test.test(norm))) {
    return {
      say: `Anytime, ${ctx.member.firstName}. I'm right here whenever you need me.`,
      steps: [],
      followups: insightFollowups(ctx) ?? ["Plan a weekend escape", "Check my vehicle"],
    };
  }
  // Help / capabilities.
  if (HELP.test(msg) && !INTENTS.some((i) => i.test.test(norm))) {
    return {
      say: capabilities(ctx),
      steps: [],
      followups: ["Book my service", "Set up a lounge pass", "Plan a weekend escape"],
    };
  }

  // Collect every matching intent (ordered by specificity) for compound asks.
  const matches = INTENTS.filter((i) => i.test.test(norm));

  if (matches.length === 0) {
    // Bare "yes/ok" with nothing pending — ask, don't guess.
    if (AFFIRM.test(msg) && msg.split(/\s+/).length <= 3) {
      return {
        say: `Happy to — what would you like me to do, ${ctx.member.firstName}?`,
        steps: [],
        followups:
          insightFollowups(ctx) ?? [
            "Book my service",
            "Set up a lounge pass",
            "Plan a weekend escape",
          ],
      };
    }
    // Anything about the curated picks — a follow-up right after we showed
    // escapes ("how do I book one?", "tell me about Raes"), or any message that
    // names a pick — routes to the honest concierge handoff, not a pivot.
    const lastWasTravel = (memory.lastToolIds ?? []).includes("recommend-travel");
    if (lastWasTravel || mentionsTravelPick(norm)) {
      return conciergeArranged(ctx, "stay");
    }
    // Soft keyword match — catch natural phrasings the strict regexes miss and
    // route to the best-fitting intent before giving up.
    const soft = softMatch(norm);
    if (soft) {
      return soft.build(ctx, norm, memory);
    }
    // Names a specific car ("tell me about my UX", "the NX") but with no action
    // verb — answer with that vehicle's status rather than the capability list.
    const named = resolveNamedVehicle(norm, ctx);
    if (named) {
      return {
        say: `Here's the latest on your ${named.shortName}.`,
        steps: [stepFor("vehicle-status", { vehicleId: named.id })],
        followups: ["Book a service", "See service history"],
      };
    }
    // Genuinely unrecognised — honest capabilities, no faked action or pivot.
    return fallback(ctx);
  }

  // Single intent — straight through.
  if (matches.length === 1) {
    return matches[0].build(ctx, norm, memory);
  }

  // Compound request — merge turns. Steps concat in specificity order,
  // de-duped by tool so overlapping intents (service ⊃ status) don't repeat.
  const built = matches.slice(0, 3).map((i) => i.build(ctx, norm, memory));
  const seen = new Set<string>();
  const steps: PlanStep[] = [];
  for (const turn of built) {
    for (const s of turn.steps) {
      if (seen.has(s.toolId)) continue;
      seen.add(s.toolId);
      steps.push(s);
    }
  }
  const followups = Array.from(
    new Set(built.flatMap((t) => t.followups))
  ).slice(0, 3);

  return {
    say: `On it, ${ctx.member.firstName} — I'll take care of ${listPhrase(
      matches.slice(0, 3).map(intentPhrase)
    )} in order.`,
    steps: steps.slice(0, 4),
    followups,
  };
}

/** Top insight CTAs as quick-reply chips, when any exist. */
function insightFollowups(ctx: UserContext): string[] | null {
  const fu = ctx.insights
    .filter((i) => i.suggest)
    .slice(0, 3)
    .map((i) => i.suggest!.label);
  return fu.length ? fu : null;
}

/** A short human phrase per intent, for the compound lead-in. */
function intentPhrase(i: Intent): string {
  switch (i.id) {
    case "service": return "your service";
    case "lounge": return "your lounge pass";
    case "valet": return "valet";
    case "roadside": return "roadside";
    case "connect": return "connecting your car";
    case "travel": return "a weekend escape";
    case "benefits": return "your benefits";
    case "account": return "your membership";
    case "profile": return "your details";
    case "bookings": return "your bookings";
    case "history": return "your service history";
    case "garage": return "your vehicles";
    case "manual": return "your owner's manual";
    case "status": return "your vehicle check";
    case "loan-car": return "a loan car";
    case "dealer": return "your dealer";
    case "notifications": return "your notifications";
    case "navigate": return "taking you there";
    default: return i.id;
  }
}

/** "a, b and c" */
function listPhrase(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const defaultDelay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export interface RunHandlers {
  /** Called after every status transition with the current step list. */
  onUpdate: (steps: RunStep[]) => void;
  /** Resolve true to run a consequential step, false to skip it. */
  confirm: (step: RunStep) => Promise<boolean>;
  /** Polled before each step — return true to abort the rest of the plan. */
  isCancelled?: () => boolean;
  /** Override the simulated "thinking" delay (tests pass a no-op). */
  delay?: (ms: number) => Promise<void>;
}

/**
 * Execute a plan's steps in order. Reads run straight through; consequential
 * steps pause at a confirm gate. Bails early (leaving later steps pending) if
 * the caller signals cancellation. Returns the final step list (with results).
 */
export async function runTurn(
  steps: PlanStep[],
  tctx: ToolContext,
  handlers: RunHandlers
): Promise<RunStep[]> {
  const delay = handlers.delay ?? defaultDelay;
  const cancelled = handlers.isCancelled ?? (() => false);
  const run: RunStep[] = steps.map((s) => ({ ...s, status: "pending" }));
  const emit = () => handlers.onUpdate(run.map((s) => ({ ...s })));
  emit();

  for (const rs of run) {
    if (cancelled()) break;

    if (rs.consequential) {
      rs.status = "awaiting-confirm";
      emit();
      const ok = await handlers.confirm(rs);
      if (cancelled()) break;
      if (!ok) {
        rs.status = "skipped";
        emit();
        continue;
      }
    }

    rs.status = "running";
    emit();
    await delay(rs.consequential ? 760 : 520);
    if (cancelled()) {
      rs.status = "skipped";
      emit();
      break;
    }

    const tool = getTool(rs.toolId);
    if (!tool) {
      rs.status = "error";
      rs.result = { ok: false, summary: `I couldn't find how to ${rs.label.toLowerCase()}.` };
      emit();
      continue;
    }

    try {
      rs.result = await tool.run(rs.args, tctx);
      rs.status = rs.result.ok ? "done" : "error";
    } catch {
      rs.status = "error";
      rs.result = { ok: false, summary: "That didn't go through — let's try another way." };
    }
    emit();
  }

  return run;
}
