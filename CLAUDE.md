# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (runs type-check)
npm run lint     # ESLint via next lint
npm run start    # Serve production build
```

There are no tests configured in this project.

## Architecture

Single-page marketing site built with **Next.js 15 App Router**. The entire site renders from `app/page.tsx`, which assembles server components in order: `Navbar → Hero → Ticker → BentoGrid → NicheSection → ProcessSection → FounderSection → FAQ → ContactForm → Footer`.

**Key architectural decisions:**

- **All components are in `components/`** — server components by default. Only `ContactForm` is `"use client"` (needs form state and fetch).
- **Form submission goes directly to an external n8n webhook** (`https://j2kanda.app.n8n.cloud/webhook/ghaflow-contact`) — there is no Next.js API route. Validation is Zod + react-hook-form client-side only; the n8n side must handle its own validation.
- **No database, no auth, no server routes** — purely static/client rendering plus one external POST.

## Styling system

Three layers, all must stay in sync:

1. **`app/globals.css`** — CSS custom properties (`--accent`, `--bg-base`, `--text-primary`, etc.) and `@layer components` classes (`btn-glow`, `btn-ghost`, `input-base`, `glass`, `tag-badge`, `section-wrapper`, `section-heading`, `section-sub`). These are the reusable primitives.
2. **`tailwind.config.ts`** — Extends Tailwind with the same design tokens as semantic names (`accent`, `surface`, `muted`, `border`), custom `boxShadow` (`glow`, `card`, `glass`), fluid `fontSize` scales (`display-xl/lg/md`), and named `animation`/`keyframes`.
3. **`lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge) used everywhere for conditional classes.

**Design constraints:** Dark-only (`#050505` base). Accent cyan `#00F0FF` / OKLCH `oklch(88% 0.16 195)` — used at ≤10% of surface area. No gradient text. No pure black or pure white.

## Animation pattern

All scroll-reveal animations follow the same pattern using Framer Motion:

```tsx
const ref    = useRef(null)
const inView = useInView(ref, inViewOptions)   // from lib/animations.ts

<motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
  <motion.div variants={fadeInUp}>...</motion.div>
</motion.div>
```

Pre-built variants in `lib/animations.ts`: `fadeInUp`, `fadeIn`, `scaleIn`, `slideInLeft`, `slideInRight`, `stagger`, `staggerFast`, `hoverLift`, `inViewOptions`. Always use these instead of writing ad-hoc transition values.

## Logo component

`components/Logo.tsx` exports `GhaflowLogo` with props `size`, `variant` (`"color" | "mono" | "white"`), `animated`, `className`. The SVG uses a 3-pass clipPath technique to achieve the interlocked rings effect — both rings share a single `userSpaceOnUse` linearGradient so color flows consistently. IDs are namespaced per variant (`lg-g-color`, etc.) because header and footer render the logo concurrently and duplicate SVG `id` attributes would conflict.

## Security headers

HTTP security headers are configured in `next.config.ts` via `headers()` and apply to all routes: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. A full Content-Security-Policy has not yet been added — it requires enumerating all external origins (Google Fonts, n8n webhook, Framer Motion).
