import { defineConfig, loadEnv, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error — plain .mjs core, no types needed here
import { createGeminiHandler } from "./server/gemini-proxy.mjs";

/**
 * Same-origin Gemini proxy for `vite dev` and `vite preview`. Holds the
 * server-only GEMINI_API_KEY (never shipped to the browser) and enforces the
 * shared free-tier rate limit. Production uses the equivalent Cloudflare
 * Worker in worker/ — same core, same behaviour.
 */
function geminiProxy(env: Record<string, string>): PluginOption {
  const handler = createGeminiHandler({
    apiKey: env.GEMINI_API_KEY,
    model: env.GEMINI_MODEL || undefined,
    rpm: Number(env.GEMINI_MAX_RPM || 10),
    rpd: Number(env.GEMINI_MAX_RPD || 200),
  });

  const mount = (server: { middlewares: { use: Function } }) => {
    server.middlewares.use(
      "/api/gemini",
      (req: any, res: any, next: () => void) => {
        if (req.method !== "POST") return next();
        let body = "";
        req.on("data", (c: Buffer) => (body += c));
        req.on("end", async () => {
          const out = await handler(body);
          res.statusCode = out.status;
          res.setHeader("Content-Type", "application/json");
          res.end(out.body);
        });
      }
    );
  };

  return {
    name: "gemini-proxy",
    configureServer: mount,
    configurePreviewServer: mount,
  };
}

export default defineConfig(({ mode }) => {
  // Empty prefix → loads non-VITE_ vars too (e.g. GEMINI_API_KEY) for the proxy.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), geminiProxy(env)],
    server: { port: 5173, open: false },
  };
});
