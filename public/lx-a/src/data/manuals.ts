// ──────────────────────────────────────────────────────────────────────────
// Lexus owner's-manual knowledge base.
//
// Two layers feed the concierge:
//   • `modelManuals` — the full Lexus Australia range, each linked to its
//     official overview page and its public eBrochure PDF (the owner's manuals
//     themselves are gated behind a My Lexus account, so we link the genuine,
//     freely downloadable eBrochure for specs and features instead).
//   • `manualTopics` — the how-to / reference answers owners actually ask for,
//     keyed by powertrain so one set covers the whole range. Each answer cites
//     the manual chapter and defers exact figures to it.
//
// Sources: Lexus Australia owners hub (lexus.com.au/owners), model pages
// (lexus.com.au/models/<id>/overview) and the AU 2026 range. Figures are kept
// general on purpose — the owner's manual and the in-door tyre placard are the
// authoritative reference for a specific VIN.
// ──────────────────────────────────────────────────────────────────────────

/** Official Lexus Australia owner resources — manuals live in the My Lexus area. */
export const lexusOwnersHub = "https://www.lexus.com.au/owners";
export const lexusConnectedHub = "https://www.lexus.com.au/connected";

export type Powertrain = "Petrol" | "Hybrid" | "PHEV" | "BEV";

export interface ModelManual {
  /** Slug used in the model URL and for matching a member's car. */
  id: string;
  model: string;
  /** Friendly grade/variant spread, for display. */
  fullName: string;
  segment: "SUV" | "Sedan" | "Coupe" | "People mover";
  powertrains: Powertrain[];
  /** Real Lexus AU model overview page. */
  overviewUrl: string;
  /** Public eBrochure PDF on the official Lexus AU media server. */
  brochureUrl: string;
}

const overview = (id: string): string =>
  `https://www.lexus.com.au/models/${id}/overview`;

// Models whose eBrochure PDF is bundled locally under public/assets/eBrochures.
// Those link to the local copy (instant, offline); the rest fall back to the
// official Lexus AU media server.
const LOCAL_BROCHURES = new Set(["es", "lbx", "lm", "ls", "nx", "ux"]);
const brochure = (id: string): string =>
  LOCAL_BROCHURES.has(id)
    ? `assets/eBrochures/${id}_ebrochure.pdf`
    : `https://www.lexus.com.au/-/media/lexus/ebrochures/${id}_ebrochure.pdf`;

/** The current Lexus Australia range (2026). */
export const modelManuals: ModelManual[] = [
  {
    id: "lbx",
    model: "LBX",
    fullName: "LBX",
    segment: "SUV",
    powertrains: ["Hybrid"],
    overviewUrl: overview("lbx"),
    brochureUrl: brochure("lbx"),
  },
  {
    id: "ux",
    model: "UX",
    fullName: "UX 300h / UX 300e",
    segment: "SUV",
    powertrains: ["Hybrid", "BEV"],
    overviewUrl: overview("ux"),
    brochureUrl: brochure("ux"),
  },
  {
    id: "nx",
    model: "NX",
    fullName: "NX 250 / 350h / 450h+",
    segment: "SUV",
    powertrains: ["Petrol", "Hybrid", "PHEV"],
    overviewUrl: overview("nx"),
    brochureUrl: brochure("nx"),
  },
  {
    id: "rx",
    model: "RX",
    fullName: "RX 350 / 350h / 450h+ / 500h",
    segment: "SUV",
    powertrains: ["Petrol", "Hybrid", "PHEV"],
    overviewUrl: overview("rx"),
    brochureUrl: brochure("rx"),
  },
  {
    id: "gx",
    model: "GX",
    fullName: "GX 550",
    segment: "SUV",
    powertrains: ["Petrol"],
    overviewUrl: overview("gx"),
    brochureUrl: brochure("gx"),
  },
  {
    id: "lx",
    model: "LX",
    fullName: "LX 600 / 700h",
    segment: "SUV",
    powertrains: ["Petrol", "Hybrid"],
    overviewUrl: overview("lx"),
    brochureUrl: brochure("lx"),
  },
  {
    id: "rz",
    model: "RZ",
    fullName: "RZ (all-electric)",
    segment: "SUV",
    powertrains: ["BEV"],
    overviewUrl: overview("rz"),
    brochureUrl: brochure("rz"),
  },
  {
    id: "es",
    model: "ES",
    fullName: "ES 300h",
    segment: "Sedan",
    powertrains: ["Hybrid"],
    overviewUrl: overview("es"),
    brochureUrl: brochure("es"),
  },
  {
    id: "ls",
    model: "LS",
    fullName: "LS 500 / 500h",
    segment: "Sedan",
    powertrains: ["Petrol", "Hybrid"],
    overviewUrl: overview("ls"),
    brochureUrl: brochure("ls"),
  },
  {
    id: "lc",
    model: "LC",
    fullName: "LC 500 / 500h",
    segment: "Coupe",
    powertrains: ["Petrol", "Hybrid"],
    overviewUrl: overview("lc"),
    brochureUrl: brochure("lc"),
  },
  {
    id: "lm",
    model: "LM",
    fullName: "LM 350h",
    segment: "People mover",
    powertrains: ["Hybrid"],
    overviewUrl: overview("lm"),
    brochureUrl: brochure("lm"),
  },
];

/** Find the catalog entry for a model token ("ux", "NX 450h+", "an RX"). */
export function findModelManual(text: string): ModelManual | undefined {
  const t = text.toLowerCase();
  return modelManuals.find((m) =>
    new RegExp(`\\b${m.id}\\b`, "i").test(t)
  );
}

// ── How-to / reference topics, keyed by powertrain ──────────────────────────

export interface ManualTopic {
  id: string;
  label: string;
  /** Matches a member's question. */
  match: RegExp;
  /** Powertrains the topic is relevant to; `"all"` for every car. */
  appliesTo: Powertrain[] | "all";
  /** Manual chapter the answer is drawn from, cited to the member. */
  section: string;
  /** Answer, given the member's vehicle name (or the model in question). */
  answer: (vehicle: string) => string;
}

export const manualTopics: ManualTopic[] = [
  {
    id: "charging",
    label: "Charging",
    match: /\b(charg(?:e|ing)|plug ?in|top ?up the battery|range|how far|kwh|public charger|fast charg)/i,
    appliesTo: ["BEV", "PHEV"],
    section: "Charging",
    answer: (v) =>
      `Your ${v} charges through the port behind the charge-port door — a Type 2 connector covers everyday AC charging (an overnight top-up at home), and the battery-electric models also accept DC fast charging on a CCS2 plug when you're out. Lexus suggests charging to about 80% for daily driving and topping to 100% only before a longer run. Exact charge times, connector types and rates for your car are in the Charging chapter of your owner's manual.`,
  },
  {
    id: "battery-care",
    label: "EV battery care",
    match: /\b(battery (?:care|health|life|degrad)|look after.*battery|preserve.*range|state of charge)/i,
    appliesTo: ["BEV", "PHEV"],
    section: "Hybrid/EV system",
    answer: (v) =>
      `To keep your ${v}'s high-voltage battery healthy, charge to around 80% for daily use, avoid leaving it sitting near 0% or 100% for long periods, and let it warm up (precondition) before DC fast charging in the cold. Your Encore cover includes an annual battery health check at a Lexus dealer — I can book that with your next service.`,
  },
  {
    id: "warning-light",
    label: "Warning lights",
    match: /\b(warning light|dashboard light|dash light|indicator light|engine light|what does.*light|light on (?:my )?dash|symbol on)/i,
    appliesTo: "all",
    section: "When trouble arises",
    answer: (v) =>
      `On your ${v}, a red warning light means stop as soon as it's safe and call for help — an amber light means have it checked soon but you can usually drive on with care. The full symbol-by-symbol guide is in the "When trouble arises" chapter of your owner's manual. If a red light is on now, I can get DriveCare roadside to you or book the car in — just say the word.`,
  },
  {
    id: "drive-mode",
    label: "Drive modes",
    match: /\b(drive mode|driving mode|eco mode|sport mode|normal mode|ev mode|mode select)/i,
    appliesTo: "all",
    section: "Driving",
    answer: (v) =>
      `Your ${v} has selectable drive modes — Eco, Normal and Sport — chosen with the drive-mode selector. Hybrid and plug-in models add an EV/HV mode to hold or save electric drive, and F Sport grades add a Custom mode you can tailor. The "Driving" chapter of the owner's manual walks through what each one changes.`,
  },
  {
    id: "tyre-pressure",
    label: "Tyre pressures",
    match: /\b(tyre pressure|tire pressure|psi|inflation|how much air|pump.*tyre)/i,
    appliesTo: "all",
    section: "Maintenance and care",
    answer: (v) =>
      `The recommended tyre pressures for your ${v} are printed on the placard inside the driver's door jamb, and repeated in the "Maintenance and care" chapter of the owner's manual — they're the authoritative figures for your wheel and tyre fitment. Check them cold (before driving). If a pressure-warning light is on, I can book a quick check at your dealer.`,
  },
  {
    id: "maintenance",
    label: "Service intervals",
    match: /\b(service interval|service schedule|how often.*service|when.*service due|maintenance schedule|logbook|when to service)/i,
    appliesTo: "all",
    section: "Maintenance schedule",
    answer: (v) =>
      `Lexus Australia logbook servicing for your ${v} is due every 12 months or 15,000 km, whichever comes first — the schedule of what's done at each visit is in the Warranty & Maintenance guide. Want me to pull your service history or book the next one?`,
  },
  {
    id: "connected",
    label: "Connected Services",
    match: /\b(connected services?|pair (?:my )?phone|bluetooth|remote start|lexus connect|app setup|link my car)/i,
    appliesTo: "all",
    section: "Connected Services",
    answer: (v) =>
      `Connected Services on your ${v} run through the Lexus Connected app — pair your phone over Bluetooth, sign in with your Lexus account, then enable remote lock, climate and live vehicle health. The setup steps are in the Connected Services guide, and I can start the in-car connection for you here.`,
  },
];

/** Topics relevant to a given powertrain, in display order. */
export function topicsFor(powertrain: Powertrain): ManualTopic[] {
  return manualTopics.filter(
    (t) => t.appliesTo === "all" || t.appliesTo.includes(powertrain)
  );
}

/** Topics relevant to any of a model's powertrains (e.g. RX spans petrol→PHEV). */
export function topicsForAny(powertrains: Powertrain[]): ManualTopic[] {
  return manualTopics.filter(
    (t) =>
      t.appliesTo === "all" ||
      powertrains.some((p) => (t.appliesTo as Powertrain[]).includes(p))
  );
}

/** Best-matching topic for a free-text question, across the given powertrains. */
export function matchTopic(
  text: string,
  powertrains: Powertrain | Powertrain[]
): ManualTopic | undefined {
  const pool = Array.isArray(powertrains)
    ? topicsForAny(powertrains)
    : topicsFor(powertrains);
  return pool.find((t) => t.match.test(text));
}

// ── Brochure / model-overview topics ───────────────────────────────────────
// Spec, feature, range and pricing questions — the things answered by the
// public eBrochure (specs/features) or the model overview page (range, look,
// Build & Price). Answers stay grounded in what we know (powertrain, segment,
// grade spread) and defer exact figures to the linked source.

const POWERTRAIN_WORD: Record<Powertrain, string> = {
  BEV: "battery-electric",
  PHEV: "plug-in hybrid",
  Hybrid: "self-charging hybrid",
  Petrol: "petrol",
};

/** "self-charging hybrid and battery-electric" from a set of powertrains. */
export function powertrainPhrase(powertrains: Powertrain[]): string {
  const words = Array.from(new Set(powertrains.map((p) => POWERTRAIN_WORD[p])));
  if (words.length <= 1) return words[0] ?? "petrol";
  return `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
}

/** Context handed to a brochure-topic answer. */
export interface BrochureContext {
  model: ModelManual;
  /** The specific car ("UX 300e") or the model name ("UX"). */
  name: string;
  /** The relevant powertrain(s) — one for an owned car, all for a model. */
  powertrains: Powertrain[];
}

export interface BrochureTopic {
  id: string;
  label: string;
  match: RegExp;
  /** Which source best answers it — drives the primary link. */
  source: "brochure" | "overview";
  answer: (ctx: BrochureContext) => string;
}

/** Opening clause: "The UX 300e is a battery-electric SUV". */
function modelLead(ctx: BrochureContext): string {
  // Keep the "SUV" acronym upper-case; lower-case the spelled-out segments.
  const seg = ctx.model.segment === "SUV" ? "SUV" : ctx.model.segment.toLowerCase();
  const phrase = powertrainPhrase(ctx.powertrains);
  return ctx.powertrains.length > 1
    ? `The ${ctx.name} comes as ${phrase} in Lexus's ${seg} range`
    : `The ${ctx.name} is a ${phrase} ${seg}`;
}

/** The efficiency wording that fits the powertrain mix. */
function efficiencyWord(ps: Powertrain[]): string {
  const hasBEV = ps.includes("BEV");
  const hasPHEV = ps.includes("PHEV");
  const hasCombustion = ps.some((p) => p === "Petrol" || p === "Hybrid" || p === "PHEV");
  if (hasBEV && !hasCombustion) return "energy use and driving range";
  if (hasPHEV) return "fuel economy, energy use and electric range";
  if (hasBEV) return "fuel economy and electric range";
  return "fuel economy";
}

/** A direct, grounded answer to "what's the drivetrain / is it electric?". */
const DRIVETRAIN_DESC: Record<Powertrain, string> = {
  BEV: "fully battery-electric — an electric motor powered by a high-voltage battery, with no petrol engine",
  PHEV: "a plug-in hybrid — a petrol engine paired with electric motors and a rechargeable battery, so it runs on electric power for shorter trips, then as a hybrid",
  Hybrid: "a self-charging hybrid — a petrol engine and electric motor working together, with nothing to plug in",
  Petrol: "petrol-powered",
};
function drivetrainAnswer(c: BrochureContext): string {
  if (c.powertrains.length > 1) {
    return `The ${c.model.model} is offered with ${powertrainPhrase(
      c.powertrains
    )} drivetrains — the ${c.model.model} eBrochure breaks down the outputs for each.`;
  }
  return `Your ${c.name} is ${
    DRIVETRAIN_DESC[c.powertrains[0]]
  }. The full outputs and figures are in the ${c.model.model} eBrochure.`;
}

export const brochureTopics: BrochureTopic[] = [
  {
    id: "drivetrain",
    label: "Drivetrain",
    // Answered directly from what we know (the powertrain) — sits first so
    // "what engine / is it electric" gives a real answer, not a spec deflection.
    match: /\b(drive ?train|power ?train|drive ?line|transmission|gearbox|all ?wheel drive|awd|4wd|2wd|front ?wheel drive|rear ?wheel drive|fuel type|petrol or electric|electric or petrol|is it (?:electric|a hybrid|a plug|petrol)|what(?:'s| is| kind of)? (?:the )?(?:engine|motor)|hybrid system)\b/i,
    source: "brochure",
    answer: (c) => drivetrainAnswer(c),
  },
  {
    id: "performance",
    label: "Performance & efficiency",
    match: /\b(specs?|specifications?|performance|how powerful|power(?: output)?|kw|kilowatts|torque|engine|0-?100|acceleration|fuel economy|fuel consumption|efficiency|how economical)\b/i,
    source: "brochure",
    answer: (c) =>
      `${modelLead(c)}. The power, torque and ${efficiencyWord(
        c.powertrains
      )} figures are all set out in the ${c.model.model} eBrochure — I can open it for you.`,
  },
  {
    id: "dimensions",
    label: "Dimensions & capacity",
    match: /\b(dimensions?|how big|boot|cargo|luggage|length|width|height|wheelbase|ground clearance|seats?|seating|how many seats|towing|tow(?:ing)? capacity|payload)\b/i,
    source: "brochure",
    answer: (c) =>
      `${modelLead(c)}. Boot space, exterior dimensions, seating and towing capacity are detailed in the ${c.model.model} eBrochure.`,
  },
  {
    id: "features",
    label: "Features & technology",
    match: /\b(features?|equipment|spec level|what'?s included|tech(?:nology)?|infotainment|multimedia|screen|sound system|mark levinson|safety (?:features?|system)|driver assist|apple carplay|android auto)\b/i,
    source: "brochure",
    answer: (c) =>
      `${modelLead(c)}, with Lexus's latest multimedia and the Lexus Safety System+ suite. The full equipment list grade-by-grade is in the ${c.model.model} eBrochure.`,
  },
  {
    id: "grades",
    label: "Grades & range",
    match: /\b(grades?|variants?|trims?|line ?up|which (?:grade|model|version)|what (?:grade|version)s?|f sport|sports luxury|build (?:and|&) price)\b/i,
    source: "overview",
    answer: (c) =>
      `The ${c.model.model} range is offered as ${c.model.fullName}. You can compare the grades and build one on the model overview page.`,
  },
  {
    id: "colours",
    label: "Colours & gallery",
    match: /\b(colou?rs?|paint|exterior colou?r|interior (?:colou?r|trim)|upholstery|what does it look like|images|photos|gallery)\b/i,
    source: "overview",
    answer: (c) =>
      `You can explore the ${c.model.model}'s exterior paint colours and interior trims, with full imagery, on the model overview page.`,
  },
  {
    id: "pricing",
    label: "Pricing",
    match: /\b(price|pricing|cost|how much (?:is|does|are|to|would|will)|rrp|drive ?away|msrp|how expensive)\b/i,
    source: "overview",
    answer: (c) =>
      `For current ${c.model.model} pricing, the Build & Price tool on the model overview page gives drive-away figures for your postcode — or I can connect you with your dealer.`,
  },
];

/** First brochure/overview topic matching a free-text question. */
export function matchBrochureTopic(text: string): BrochureTopic | undefined {
  return brochureTopics.find((t) => t.match.test(text));
}

// ── Resource list shown in the Manuals flyout ───────────────────────────────

export interface ManualResource {
  id: string;
  title: string;
  description: string;
  format: "PDF" | "Video" | "Web";
  size: string;
  /** Where the resource opens — the genuine Lexus AU owner resource. */
  url: string;
}

export const manualResources: ManualResource[] = [
  {
    id: "owners-manual",
    title: "Owner's manual",
    description:
      "Complete reference for operating your Lexus, including features, controls and safety.",
    format: "PDF",
    size: "18 MB",
    url: lexusOwnersHub,
  },
  {
    id: "warranty",
    title: "Warranty handbook",
    description:
      "Coverage, claims and the Lexus Encore Platinum extended warranty terms.",
    format: "PDF",
    size: "2.4 MB",
    url: lexusOwnersHub,
  },
  {
    id: "service-guide",
    title: "Service & maintenance guide",
    description: "Recommended service intervals, fluids and approved parts.",
    format: "PDF",
    size: "3.1 MB",
    url: lexusOwnersHub,
  },
  {
    id: "connected",
    title: "Connected services setup",
    description:
      "How to pair your phone and enable remote start, locate-my-Lexus and live health.",
    format: "Video",
    size: "4 min",
    url: lexusConnectedHub,
  },
  {
    id: "battery-care",
    title: "EV battery care",
    description:
      "Charging best practices, range optimisation and high-voltage battery health checks.",
    format: "Web",
    size: "Article",
    url: lexusOwnersHub,
  },
];
