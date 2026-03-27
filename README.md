# RCRT Template: Storefront

Marketing site with an embedded AI chat widget. Use this template for product landing pages, public sites, or any scenario where you want a marketing presence combined with a chat interface.

## What's Included

- React 18 + Vite + TypeScript + Tailwind CSS
- `@rcrt/api` client pre-configured
- Firebase authentication (Google sign-in)
- Top navigation bar (responsive with mobile hamburger menu)
- Landing page with hero section, feature cards, testimonial
- Full chat page with SSE streaming
- About page
- Site footer with navigation links
- Dockerfile + Cloud Build config for Cloud Run deploy

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment config
cp .env.example .env
# Edit .env with your RCRT API URL and Firebase config

# Start dev server
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Your RCRT API Gateway URL |
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_RCRT_PREVIEW_TOKEN` | Preview token (for WebContainer preview) |

## Project Structure

```
src/
  App.tsx                    — Routing + auth wrapper
  main.tsx                   — Entry point
  index.css                  — Tailwind + design tokens
  pages/
    LandingPage.tsx          — Hero + features + testimonial
    ChatPage.tsx             — Chat interface with SSE
    AboutPage.tsx            — About page
  components/
    layout/
      AppLayout.tsx          — Top nav + footer shell
      Navbar.tsx             — Responsive top navigation
      Footer.tsx             — Site footer
  lib/
    api-client.ts            — RcrtClient singleton
    auth.tsx                 — Firebase auth gate
    store.ts                 — Zustand state (chat messages)
    utils.ts                 — cn() helper
```

## Customizing

- **Add a page**: Create `src/pages/MyPage.tsx` → add Route in `App.tsx` → add nav link in `Navbar.tsx` and `Footer.tsx`
- **Change theme**: Edit CSS variables in `src/index.css`
- **Edit hero content**: Modify `LandingPage.tsx` headline, description, and CTA buttons
- **Feature cards**: Edit the `features` array in `LandingPage.tsx`

## Deploy

Push to main triggers Cloud Build → Cloud Run (if `cloudbuild.yaml` is configured).

## Built with RCRT

This template is designed for [RCRT Code Studio](https://github.com/possibl-ai/rcrt-v2). RCRT is the backend — all state lives in breadcrumbs, all AI runs through agents, all external APIs connect through services.
