# Lexus Concierge — Gemini proxy (Cloudflare Worker)

A tiny serverless proxy that holds the Gemini API key **server-side** and
enforces the **shared free-tier rate limit** for the deployed app. The browser
never sees the key. Locally you don't need this — `npm run dev` runs the same
proxy as Vite middleware (see `vite.config.ts`); this is for production.

It shares its core with the dev proxy (`../server/gemini-proxy.mjs`), so
behaviour is identical.

## Deploy

```bash
npm i -g wrangler            # or use: npx wrangler ...
cd worker
wrangler login
wrangler secret put GEMINI_API_KEY   # paste your key when prompted
wrangler deploy
```

`wrangler deploy` prints a URL like
`https://lexus-concierge-gemini-proxy.<you>.workers.dev`.

## Point the app at it

In the app's build environment (e.g. `.env.production` or your host's env vars):

```
VITE_GEMINI_ENABLED=true
VITE_GEMINI_PROXY_URL=https://lexus-concierge-gemini-proxy.<you>.workers.dev
```

Then rebuild/redeploy the site. For safety, set `ALLOWED_ORIGIN` in
`wrangler.toml` to your site's exact origin instead of `*`.

## Config (wrangler.toml `[vars]`)

| Var | Default | Meaning |
|---|---|---|
| `GEMINI_MODEL` | `gemini-2.0-flash` | Model to call |
| `GEMINI_MAX_RPM` | `10` | Shared requests/minute cap |
| `GEMINI_MAX_RPD` | `200` | Shared requests/day cap |
| `ALLOWED_ORIGIN` | `*` | CORS origin allow-list |

`GEMINI_API_KEY` is a **secret**, not a var — never commit it.

## A note on strict global limits

The rate counters live in the Worker isolate's memory. Cloudflare may run a few
isolates under load, so the global cap is approximate (it could be exceeded by
roughly the number of live isolates). For low-traffic prototypes this is fine.
For a hard guarantee, back the counter with **Workers KV** or a **Durable
Object** — swap the `reserve()` state in `../server/gemini-proxy.mjs` for a KV
read/write keyed by minute/day.
