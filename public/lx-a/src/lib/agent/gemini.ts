// ──────────────────────────────────────────────────────────────────────────
// Gemini planner — an LLM brain behind the same `plan()` seam.
//
// When enabled, the agent asks Google Gemini (free tier) to choose which
// deterministic tools to run and what to say, given the live member context +
// recent conversation. Tool *execution* stays deterministic (the model only
// selects ids + args), so bookings/confirms never hallucinate. On any failure
// — disabled, network error, bad JSON, timeout, rate cap — the caller falls
// back to the deterministic planner, so the offline demo is untouched.
//
// The request goes to a SAME-ORIGIN proxy (default `/api/gemini`), never to
// Google directly: the API key lives server-side only (Vite dev/preview
// middleware locally; a Cloudflare Worker in production — see worker/). The
// proxy also enforces the authoritative, shared free-tier rate limit. The
// client limiter below is just a cheap pre-check to avoid wasted round-trips.
// ──────────────────────────────────────────────────────────────────────────

import type { UserContext } from "./context";
import { TOOLS, getTool } from "./tools";
import { stepFor, type AgentTurn } from "./runtime";

const env = import.meta.env as Record<string, string | undefined>;
const ENABLED = env.VITE_GEMINI_ENABLED === "true";
const PROXY_URL = env.VITE_GEMINI_PROXY_URL || "/api/gemini";
const TIMEOUT_MS = 8000;

// ── Client-side pre-check (the server proxy is the real guarantee) ───────────
// Conservative per-minute / per-day caps so a single browser rarely even has to
// reach the proxy. The proxy enforces the authoritative shared cap server-side.
const MAX_RPM = Math.max(1, Number(env.VITE_GEMINI_MAX_RPM ?? 10));
const MAX_RPD = Math.max(1, Number(env.VITE_GEMINI_MAX_RPD ?? 200));
const QUOTA_KEY = "lexus.gemini.quota";

interface Quota {
  day: string;
  dayCount: number;
  recent: number[];
}
let memQuota: Quota | null = null;

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}
function loadQuota(): Quota {
  if (!memQuota) {
    try {
      const raw = localStorage.getItem(QUOTA_KEY);
      if (raw) memQuota = JSON.parse(raw) as Quota;
    } catch {
      /* private mode / no storage — fall back to in-memory */
    }
    if (!memQuota) memQuota = { day: todayKey(), dayCount: 0, recent: [] };
  }
  return memQuota;
}
function saveQuota(q: Quota): void {
  memQuota = q;
  try {
    localStorage.setItem(QUOTA_KEY, JSON.stringify(q));
  } catch {
    /* ignore */
  }
}

/**
 * Reserve a request slot if within the per-minute and per-day budget. Records
 * the request when allowed (call only when about to fire), so we can never go
 * over even if some requests fail. Returns false when a cap is reached.
 */
function reserveQuotaSlot(): boolean {
  const now = Date.now();
  const q = loadQuota();
  if (q.day !== todayKey()) {
    q.day = todayKey();
    q.dayCount = 0;
    q.recent = [];
  }
  q.recent = q.recent.filter((t) => now - t < 60_000);
  if (q.recent.length >= MAX_RPM || q.dayCount >= MAX_RPD) {
    saveQuota(q);
    return false;
  }
  q.recent.push(now);
  q.dayCount += 1;
  saveQuota(q);
  return true;
}

export function geminiEnabled(): boolean {
  return ENABLED;
}

/** One prior turn, flattened for the model. */
export interface HistoryTurn {
  role: "user" | "model";
  text: string;
}

const SECTIONS = ["Dashboard", "My Lexus", "Encore", "Profile"];

function systemInstruction(ctx: UserContext): string {
  const vehicles = ctx.vehicles
    .map(
      (v) =>
        `${v.shortName} (id "${v.id}"${
          v.nextService ? `, service due ${v.nextService}` : ""
        })`
    )
    .join("; ");
  const radar = ctx.insights.map((i) => i.title).join("; ") || "nothing pressing";
  const tools = TOOLS.map((t) => `- ${t.id} — ${t.description}`).join("\n");

  return [
    `You are "Lexus Concierge", the assistant inside the My Lexus app for ${ctx.member.firstName} (Encore ${ctx.member.tier} member).`,
    `You act only by selecting from a fixed set of tools — you cannot do anything outside them.`,
    ``,
    `Member context:`,
    `- Vehicles: ${vehicles}`,
    `- Preferred dealer: ${ctx.preferredDealer.name}`,
    `- Upcoming bookings: ${ctx.bookings.length}`,
    `- On your radar: ${radar}`,
    ``,
    `Available tools (id — what it does):`,
    tools,
    ``,
    `Rules:`,
    `- Put the ids of the tools that fulfil the request in "toolIds", in order. Usually one; up to three for compound requests ("book my service and a lounge pass").`,
    `- book-service, book-valet and redeem-lounge open an INLINE booking form in the chat — just select the tool. Never claim something is already booked; the member completes the form.`,
    `- If the request targets a specific vehicle, set "vehicleId" to that vehicle's id.`,
    `- For "take me to / open / show" a section, use the navigate tool and set "section".`,
    `- For greetings, thanks or small talk, return an empty toolIds with a short, warm "say".`,
    `- If no tool covers the request (e.g. booking a specific hotel from the travel picks, or anything off-topic), return an empty toolIds and honestly say you can't do that directly. For curated travel, point them to the Encore concierge on 1800 023 009. Never invent a capability or claim an action you didn't take.`,
    `- "say": 1–2 warm, concise sentences. "followups": 2–3 short tappable suggestions (max ~5 words each).`,
  ].join("\n");
}

function responseSchema(ctx: UserContext) {
  return {
    type: "OBJECT",
    properties: {
      say: { type: "STRING" },
      toolIds: {
        type: "ARRAY",
        items: { type: "STRING", enum: TOOLS.map((t) => t.id) },
      },
      vehicleId: { type: "STRING", enum: ctx.vehicles.map((v) => v.id) },
      section: { type: "STRING", enum: SECTIONS },
      followups: { type: "ARRAY", items: { type: "STRING" } },
    },
    required: ["say", "toolIds", "followups"],
  };
}

interface GeminiPlan {
  say: string;
  toolIds: string[];
  vehicleId?: string;
  section?: string;
  followups: string[];
}

/** Turn the model's choice into a runnable AgentTurn using the real registry. */
function toAgentTurn(out: GeminiPlan): AgentTurn {
  const vehicleUsers = new Set(["vehicle-status", "book-service", "connect-vehicle"]);
  const steps = (out.toolIds ?? [])
    .filter((id) => getTool(id))
    .slice(0, 4)
    .map((id) => {
      const tool = getTool(id)!;
      const args: Record<string, unknown> = {};
      if (out.vehicleId && vehicleUsers.has(id)) args.vehicleId = out.vehicleId;
      if (id === "navigate" && out.section) args.section = out.section;
      return stepFor(id, args, {
        confirm: tool.consequential
          ? `Go ahead and ${tool.label.toLowerCase()}?`
          : undefined,
      });
    });
  return {
    say: out.say?.trim() || "Here to help.",
    steps,
    followups: Array.isArray(out.followups) ? out.followups.slice(0, 3) : [],
  };
}

/**
 * Plan a turn with Gemini. Returns null on any failure so the caller can fall
 * back to the deterministic planner.
 */
export async function planWithGemini(
  message: string,
  ctx: UserContext,
  history: HistoryTurn[] = []
): Promise<AgentTurn | null> {
  if (!ENABLED) return null;
  // Client pre-check — fall back rather than make a doomed round-trip. The
  // proxy enforces the authoritative shared cap regardless.
  if (!reserveQuotaSlot()) {
    console.info("[gemini] client budget reached — using local planner.");
    return null;
  }

  // Gemini requires the conversation to begin with a user turn.
  const trimmed = [...history];
  while (trimmed.length && trimmed[0].role === "model") trimmed.shift();
  const contents = [
    ...trimmed.map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
    { role: "user", parts: [{ text: message }] },
  ];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // Same-origin proxy injects the key + enforces the shared rate limit.
    const res = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction(ctx) }] },
        contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 512,
          responseMimeType: "application/json",
          responseSchema: responseSchema(ctx),
        },
      }),
    });
    if (!res.ok) {
      console.warn(`[gemini] proxy ${res.status} — falling back to local planner.`);
      return null;
    }
    const data = await res.json();
    const text: string | undefined =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;
    const parsed = JSON.parse(text) as GeminiPlan;
    if (typeof parsed.say !== "string" || !Array.isArray(parsed.toolIds)) {
      return null;
    }
    return toAgentTurn(parsed);
  } catch (err) {
    if ((err as Error).name !== "AbortError") {
      console.warn("[gemini] request failed — falling back to local planner.", err);
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}
