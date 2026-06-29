// ──────────────────────────────────────────────────────────────────────────
// Gemini proxy core — framework-agnostic.
//
// Holds the API key, enforces an authoritative shared rate limit (per-minute +
// per-day), validates the payload shape, and forwards to Google. Shared by the
// Vite dev/preview middleware (local) and the Cloudflare Worker (production).
// Uses only global fetch + Date — runs on Node 18+ and the Workers runtime.
// ──────────────────────────────────────────────────────────────────────────

const GEMINI_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models";

const j = (status, obj) => ({ status, body: JSON.stringify(obj) });

/**
 * Build a handler. Counters are closure state (per server instance / Worker
 * isolate). For strictly-global enforcement across many Worker isolates, back
 * `reserve()` with KV or a Durable Object — for a single instance this is exact.
 *
 * @returns {(body: string) => Promise<{status:number, body:string}>}
 */
export function createGeminiHandler({
  apiKey,
  model = "gemini-2.0-flash",
  rpm = 10,
  rpd = 200,
  maxBytes = 100_000,
} = {}) {
  let day = "";
  let dayCount = 0;
  let recent = [];

  const todayKey = () => new Date().toISOString().slice(0, 10);

  function reserve() {
    const now = Date.now();
    if (day !== todayKey()) {
      day = todayKey();
      dayCount = 0;
      recent = [];
    }
    recent = recent.filter((t) => now - t < 60_000);
    if (recent.length >= rpm || dayCount >= rpd) return false;
    recent.push(now);
    dayCount += 1;
    return true;
  }

  return async function handle(body) {
    if (!apiKey) {
      return j(503, { error: "Proxy: GEMINI_API_KEY is not configured." });
    }
    if (typeof body !== "string" || body.length === 0) {
      return j(400, { error: "Empty request body." });
    }
    if (body.length > maxBytes) {
      return j(413, { error: "Request too large." });
    }
    // Light shape check — only forward generateContent-style payloads so the
    // proxy can't be repurposed to call arbitrary endpoints with the key.
    try {
      const parsed = JSON.parse(body);
      if (!parsed || !Array.isArray(parsed.contents)) {
        return j(400, { error: "Expected a generateContent body." });
      }
    } catch {
      return j(400, { error: "Invalid JSON." });
    }
    // Authoritative shared budget.
    if (!reserve()) {
      return j(429, { error: "Rate limit reached — try again shortly." });
    }
    try {
      const r = await fetch(
        `${GEMINI_BASE}/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }
      );
      return { status: r.status, body: await r.text() };
    } catch {
      return j(502, { error: "Upstream Gemini request failed." });
    }
  };
}
