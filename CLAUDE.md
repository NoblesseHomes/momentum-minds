# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a fresh Next.js (App Router, JS not TS) scaffold for the **Momentum Minds** marketing site — a single-page site for a Czech multi-service company (marketing/advertising, BOZP training, translation/escort services, transfer, housing placement). Almost none of the actual site is built yet: `src/app/page.js` is still the placeholder `<h1>Home</h1>` and `globals.css`/`layout.js` still have the default `create-next-app` values (Geist fonts, generic light/dark tokens, `title: 'Create Next App'`). Building out the real page means implementing the two spec docs below, not extending the placeholder incrementally.

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint (flat config, eslint-config-next core-web-vitals)
```

No test runner is configured. `next.config.mjs` enables `reactCompiler: true` (babel-plugin-react-compiler), so avoid patterns that fight the compiler's memoization assumptions (e.g. manual `useMemo`/`useCallback` for compiler-eligible code is unnecessary).

## Architecture

- **Path alias**: `@/*` → `./src/*` (see `jsconfig.json`).
- **Styling**: Tailwind CSS v4 via `@import "tailwindcss"` in `src/app/globals.css` + `@theme inline` token mapping — no `tailwind.config.js`; theme tokens are defined as CSS custom properties directly in `globals.css`.
- **Language**: JavaScript (`.js`/`.jsx`), no TypeScript.
- **Locale**: `<html lang="cs">` — site copy is Czech-facing (see tone rules below), even though the spec docs themselves are written in Russian for the AI agent's benefit.

## The two spec docs (`docs/`)

These are the actual product spec, written in Russian, and are authoritative over any assumption made from the placeholder code:

- **`docs/momentum-minds-design-system.md`** — the "Tranzit" design system: color tokens, typography (Archivo for display, Inter for body, JetBrains Mono for tags/labels/legal data), spacing scale, breakpoints, component specs (buttons, tag "boarding-pass" pills, cards, form fields), motion rules, and a full section-by-section markup spec for the page (header, hero, services, partners, contact form, footer). **Do not use `next/font` Geist fonts for the real build** — the design system specifies Google Fonts Archivo/Inter/JetBrains Mono instead; replace the current Geist setup in `layout.js` when implementing.
- **`docs/momentum-minds-site-concept.md`** — content/structure rationale: what each section says and why, the 5 service categories (MKT/BOZP/TLM/DOP/UBY) and their card copy, the single-funnel philosophy (every CTA scrolls to the one contact form — no separate conversion paths), and explicit scope exclusions (no blog, no pricing calculators, no modals/popups/chat widgets).

Where the two docs conflict: design-system.md wins on visual questions, site-concept.md wins on content/structure questions (stated explicitly in site-concept.md §7).

Key fixed decisions called out in the docs (do not change without asking, per the docs' own "ЗАФИКСИРОВАНО"/"fixed" markers):
- Hero background is a looped, desaturated cityscape video (`hero_video.mp4`, gitignored — expect it to be supplied out-of-band, not committed) with specific color-grade, overlay, `prefers-reduced-motion`/`save-data` fallback-to-poster requirements.
- Hero H1/subtitle copy is fixed Czech text (design-system.md §7.2).
- One primary CTA per screen/section; all CTAs funnel to the single contact form (no parallel conversion paths).
- GDPR consent checkbox is required and blocks form submission if unchecked.
