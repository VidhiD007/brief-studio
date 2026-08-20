# Brief Studio

A real implementation of the "Brief Studio" design (originally prototyped as
`design-source/project/Brief Studio.dc.html` in Claude Design — kept in this repo for
reference) — a 5-step brief-capture wizard for interior designers that compiles a client
meeting into a structured "Design Strategy Document" using Claude.

This is built as a lightweight demo/pitch project (not hardened for long-term production use):

- **`web/`** — React + Vite + TypeScript frontend. Pixel-matches the original dark studio
  aesthetic (charcoal background, amber accent, Inter + JetBrains Mono).
- **`server/`** — Node + Express + TypeScript backend. A thin proxy that calls the Claude API
  server-side (so the API key never reaches the browser) and validates the response against a
  strict schema using `output_config.format` (Zod), matching the exact JSON structure the UI
  expects — no more fragile regex-based JSON extraction.

## Why this shape

- **Model:** `claude-sonnet-5` — a good cost/accuracy balance for this task (structured
  multi-part reasoning, no image bytes sent to the model — see below). Swap to `claude-opus-5`
  in `server/src/index.ts` if you want the strongest possible output and don't mind ~1.7x the
  per-token cost.
- **No image uploads to a backend/storage:** floor plan, space photos, and reference images stay
  client-side as in-memory base64 (same as the original prototype). Nothing is sent to the model
  either — the original design never actually attached image bytes to the generation call, only
  text describing what was uploaded. This keeps the demo simple (no storage bill, nothing to
  clean up after the pitch) and keeps token usage — and therefore cost — low. If you later want
  the AI to actually read the floor plan image, that's a deliberate scope change (real vision
  input, more tokens, more latency) — ask before adding it.
- **Structured outputs instead of prompt-and-parse:** the original prototype asked Claude to
  "return ONLY valid JSON" and then regex/JSON.parse'd the response with a fallback. The backend
  here uses the API's native structured-output support instead, so the response is guaranteed to
  match the schema — fewer wasted tokens on malformed retries, more reliable for a client demo.

## Setup

```bash
# 1. Backend
cd server
cp .env.example .env
# edit .env and set ANTHROPIC_API_KEY=sk-ant-...
npm install
npm run dev        # http://localhost:8787

# 2. Frontend (separate terminal)
cd web
npm install
npm run dev         # http://localhost:5173 (proxies /api to :8787)
```

Open http://localhost:5173. Without `ANTHROPIC_API_KEY` set, `/api/generate` and `/api/refine`
still work but return clearly-labeled mock output, so the UI flow is fully testable without a key.

## Deploying for the pitch

Since this is meant to be live for less than a month:

- Cheapest path: deploy `server/` to any small always-on Node host (Render, Railway, Fly.io) with
  `ANTHROPIC_API_KEY` set as an env var, and `web/` as a static build (`npm run build` → `dist/`)
  on Vercel/Netlify/Cloudflare Pages, pointing its `/api/*` requests at the server's URL (update
  `vite.config.ts`'s proxy for local dev, and set the frontend's fetch base URL for production —
  currently `web/src/api.ts` calls relative `/api/...`, so put the server behind the same domain
  or a reverse-proxy path if you want to avoid a CORS/env-var dance).
- No database, no persistent storage, no auth — intentional for a short-lived demo. Refreshing
  the page loses all in-progress data (matches the original prototype's behavior).

## What's not wired up

- "Download as PDF" and "Save draft" are still UI-only, matching the state the original design
  was left in.
