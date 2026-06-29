// ──────────────────────────────────────────────────────────────────────────
// Cloudflare Worker — production Gemini proxy.
//
// Same core as the Vite dev middleware: holds the key server-side, enforces the
// shared free-tier rate limit, forwards to Google. Deploy with wrangler (see
// worker/README.md). Set the key as a SECRET, never as a var:
//   wrangler secret put GEMINI_API_KEY
// ──────────────────────────────────────────────────────────────────────────

import { createGeminiHandler } from "../server/gemini-proxy.mjs";

let handler;
function getHandler(env) {
  if (!handler) {
    handler = createGeminiHandler({
      apiKey: env.GEMINI_API_KEY,
      model: env.GEMINI_MODEL,
      rpm: Number(env.GEMINI_MAX_RPM || 10),
      rpd: Number(env.GEMINI_MAX_RPD || 200),
    });
  }
  return handler;
}

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(req, env) {
    const cors = corsHeaders(env);
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "POST only." }), {
        status: 405,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    const body = await req.text();
    const out = await getHandler(env)(body);
    return new Response(out.body, {
      status: out.status,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  },
};
