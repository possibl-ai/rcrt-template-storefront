# rcrt-template-storefront

> Agent-facing guide. Read this before editing any file in this template.

## What This Template Does

A public-facing marketing site. No auth required for visitors. Features hero sections, feature grids, testimonials, pricing, and an embedded chat widget for visitor assistance. Use for: marketing landing pages, product sites, portfolios, e-commerce storefronts.

## Rules
- HeroSection, FeatureGrid, PricingTable are pre-built — use them
- The embedded chat widget is pre-built — set agentId in config only
- Do not add Firebase auth to public pages — this is a public site

## Pre-Built — Do Not Reimplement

| What | Import | Usage |
|---|---|---|
| HeroSection | @possibl/rcrt-ui | `<HeroSection title="..." subtitle="..." cta={ctaConfig} />` |
| FeatureGrid | @possibl/rcrt-ui | `<FeatureGrid features={featuresArray} />` |
| PricingTable | @possibl/rcrt-ui | `<PricingTable plans={plansArray} />` |
| ChatWidget | src/components/ChatWidget.tsx | `<ChatWidget agentId="support" position="bottom-right" />` |
| StorefrontLayout | src/components/layout/StorefrontLayout.tsx | Wraps all pages |

## File Structure

```
src/
  App.tsx                    ← CONFIG: routes, public only
  pages/
    LandingPage.tsx          ← TOUCH: main landing
    ProductPage.tsx          ← TOUCH: product details
    PricingPage.tsx          ← TOUCH: pricing
  components/
    layout/
      StorefrontLayout.tsx   ← LEAVE: nav, footer
    ChatWidget.tsx           ← LEAVE: embedded chat
  config/
    content.ts               ← CONFIG: hero text, features, pricing
```

## Content Configuration

All site copy lives in `src/config/content.ts` — edit this file, not individual components:
```typescript
export const HERO = {
  title: 'Your Product',
  subtitle: 'One sentence pitch',
  cta: { text: 'Get started', href: '/signup' }
};
export const FEATURES = [
  { icon: '🚀', title: 'Feature 1', description: '...' },
];
```

## Embedding the Chat Widget

```tsx
// In LandingPage.tsx or StorefrontLayout.tsx
<ChatWidget
  agentId="storefront-assistant"  // RCRT agent name
  position="bottom-right"
  greeting="How can I help you today?"
/>
```

## Adding a New Section

1. Import the section component from @possibl/rcrt-ui
2. Add it to LandingPage.tsx in the desired order
3. Add content config in content.ts
