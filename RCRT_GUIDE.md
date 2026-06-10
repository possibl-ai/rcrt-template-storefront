# rcrt-template-storefront — Agent Guide

> Guide for AI coding agents working in this repo. Generated from the
> code-studio knowledge base — matches the actual source in this template.

## What This Template Does

A public marketing/storefront site: Navbar + Footer layout, LandingPage with
hero + feature grid, AboutPage, and a full chat page at `/chat` wired to an
RCRT agent. Use for product sites, landing pages, brochure sites with an AI
assistant.

## Actual File Structure (verified against the repo)

```
src/
  App.tsx                          routes: / → LandingPage, /about, /chat
  pages/
    LandingPage.tsx                hero + features array — edit copy inline
    AboutPage.tsx
    ChatPage.tsx                   inline chat UI (sendChat + connectEvents)
  components/layout/
    AppLayout.tsx  Navbar.tsx  Footer.tsx
  lib/ (api-client, auth, rcrt-api, store, utils)
```

There is NO ChatWidget component and NO `src/config/content.ts` — page copy
lives inline in each page (e.g. the `features` array at the top of
LandingPage). Edit pages directly.

## The RCRT client (vendored — NOT an npm package)

Every template vendors its client at `src/lib/rcrt-api.ts` and exposes a
singleton via `src/lib/api-client.ts`:

```ts
import { getClient } from '../lib/api-client';
const client = getClient();
```

Real method signatures (use these EXACTLY — `queryBreadcrumbs` takes
positional args, not an options object):

```ts
queryBreadcrumbs(tags: string[], limit = 100): Promise<Breadcrumb[]>
createBreadcrumb({ name?, title?, tags?, content?, upsert? }): Promise<Breadcrumb>
getBreadcrumb(id): Promise<Breadcrumb>
updateBreadcrumb(id, { title?, content?, tags?, version }): Promise<Breadcrumb>  // version REQUIRED
deleteBreadcrumb(id): Promise<void>
sendChat(message, sessionId?): Promise<{ id, session_id }>   // reply arrives via SSE, not the response
getSessions(limit = 30) / getSessionMessages(sessionId, limit = 100)
uploadFile(file) / getFileDownloadUrl(fileId) / getFileText(fileId)
connectEvents(onEvent): () => void   // SSE: onEvent({ type: 'breadcrumb', data }) — returns disconnect fn
resolveService(name)
```

Realtime pattern (the ONLY supported way — never hand-roll EventSource):

```tsx
useEffect(() => {
  const disconnect = getClient().connectEvents(({ type, data }) => {
    if (type !== 'breadcrumb') return;
    const event = data as any;
    const tags: string[] = event.tags || [];
    // filter by your tags, e.g. tags.includes(`session:${sessionId}`)
  });
  return disconnect;
}, [deps]);
```

DO NOT import `@possibl/rcrt-api` or `@possibl/rcrt-ui` — they are NOT in
package.json. Use the vendored client and build UI with Tailwind + lucide-react.

## Hard rules

- `npm run build` runs `tsc && vite build` — your code MUST typecheck or the
  Cloud Run deploy fails. No `any`-typed imports of nonexistent modules.
- NEVER modify `src/lib/rcrt-api.ts`, `src/lib/api-client.ts`, or
  `src/lib/auth.tsx` — auth + client are correct out of the box.
- NEVER add a database, REST API layer, or custom auth. Data is breadcrumbs.
- New deps: edit package.json only when truly needed; prefer what's installed
  (react-router-dom v7, zustand, lucide-react, tailwind, clsx/tailwind-merge via `cn()`).

## Adding a page

1. Create `src/pages/MyPage.tsx` (default export).
2. Add `<Route path="/my-page" element={<MyPage />} />` inside the layout route in `src/App.tsx`.
3. Add a nav item in `src/components/layout/AppLayout.tsx`.

## Env (.env — injected automatically by `project init-repo` and the preview)

`VITE_API_URL`, `VITE_TENANT_ID`, `VITE_RCRT_PREVIEW_TOKEN` (preview auth),
optional `VITE_FIREBASE_API_KEY` / `VITE_FIREBASE_AUTH_DOMAIN` /
`VITE_FIREBASE_PROJECT_ID` (production auth). `src/lib/auth.tsx` picks
Firebase when `VITE_FIREBASE_API_KEY` is set, else falls back to the preview
token. Styling: Tailwind design tokens in `src/index.css` (`--primary`,
`--background`, ...) — change theme there.

## Common patterns

- **Rebrand**: LandingPage hero copy + features array, Navbar/Footer names,
  index.css tokens.
- **Floating chat widget**: there isn't one prebuilt; either link to `/chat`
  from the Navbar (already there) or build a small fixed-position panel that
  reuses ChatPage's send/SSE pattern.
- **New marketing page**: add page + route + Navbar link.
