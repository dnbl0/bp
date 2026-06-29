/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Turn the Gemini brain on ("true"). The API key stays server-side in the
   *  proxy; this only flips the feature + routes through the proxy. Unset →
   *  the deterministic planner is used. */
  readonly VITE_GEMINI_ENABLED?: string;
  /** Proxy endpoint (default: same-origin "/api/gemini"). Point at the
   *  deployed Cloudflare Worker URL in production. */
  readonly VITE_GEMINI_PROXY_URL?: string;
  /** Cheap client-side pre-check caps (the proxy is the real guarantee). */
  readonly VITE_GEMINI_MAX_RPM?: string;
  readonly VITE_GEMINI_MAX_RPD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
