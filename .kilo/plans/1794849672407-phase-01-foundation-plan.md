# Phase 01 — Website Foundation Plan

## 1. What Was Inspected

- **README.md**: Gradient Library — open-source collection of distinctive, reusable gradient backgrounds for modern websites and AI-assisted development. Core features: browse/preview gradients, copy CSS, copy AI-ready prompts.
- **DEVELOPMENT-PHASES.md**: Three-phase approach. Phase 01 = build first working website with 1–2 gradients, establish layout, visual direction, responsive foundation.
- **Git branch**: `phase/01-website-foundation` (correct branch for this work)
- **Repository state**: Empty except for the two markdown files. No package.json, no build config, no source code.

---

## 2. Recommended Frontend Stack

| Technology | Reason |
|------------|--------|
| **Vite + React 19.3.x + TypeScript** | Current stable React, fast dev server, zero-config TS, small production bundles |
| **Tailwind CSS v4 via `@tailwindcss/vite`** | Official Vite plugin, no PostCSS config needed, modern CSS-first architecture |
| **No component library** | Keep dependencies minimal; build custom gradient-focused components |
| **No router** | Single-page layout; routing deferred to Phase 2 if needed |

**Why not Next.js?** Overkill for a static gradient showcase. Vite + React is simpler, faster to iterate, and deploys anywhere (Netlify, Vercel, GitHub Pages) without server requirements.

---

## 3. Proposed Layout & Visual Direction

### Layout (Single Page, Mobile-First)
```
┌─────────────────────────────────────┐
│ Header: Site title                  │
├─────────────────────────────────────┤
│ Gallery: Responsive grid (1–2 cards)│
│       Each card:                    │
│       - Gradient swatch (aspect-ratio)│
│       - Gradient name               │
├─────────────────────────────────────┤
│ Footer: Minimal credit line         │
└─────────────────────────────────────┘
```

**Key change**: No separate hero section duplicating a gradient. The gallery *is* the experience — large, prominent gradient cards that command attention.

### Visual Direction (Design Proposal)
- **Dark background default** — gradients pop against dark neutrals; proposed as starting point, not final decision
- **Editorial, minimal** — generous whitespace, large typography, subtle motion
- **Color palette**: Neutral dark base (`slate-950`), warm accent (`amber-400` for interactive elements), gradients provide the color
- **Typography**: System font stack via Tailwind; display headings large (`text-5xl md:text-7xl`)
- **Motion**: `transition-colors duration-300`, subtle `hover:scale-[1.02]` on cards
- **Reference**: Aura Gradients for UX patterns (gallery focus), but our identity is more minimal, typographic, and AI-dev oriented

---

## 4. Implementation Plan (Ordered Tasks)

### 4.1 Project Setup
- [ ] Initialize Vite + React 19 + TypeScript project in repository root
- [ ] Install `@tailwindcss/vite` and `tailwindcss` (v4)
- [ ] Configure Vite plugin in `vite.config.ts`: `import tailwindcss from '@tailwindcss/vite'`
- [ ] Add `index.css` with `@import "tailwindcss"` and base styles
- [ ] Configure TypeScript strict mode, path aliases (`@/*`)

### 4.2 Core Components
- [ ] `Header` — site title only, minimal, fixed top with backdrop blur
- [ ] `GradientCard` — reusable card: gradient swatch (aspect-ratio 16:9 or 4:3), gradient name
- [ ] `Gallery` — responsive CSS grid: 1 col <640px, 2 cols ≥640px, gap-6/8
- [ ] `Footer` — single credit line (e.g., "Gradient Library — Open source")

### 4.3 Gradient System
- [ ] Define 2 showcase gradients as CSS custom properties in `:root` within `index.css`
- [ ] Create `gradients.ts` data array: `{ id, name, cssVariable }` — minimal, reusable
- [ ] Apply gradients via Tailwind arbitrary values: `bg-[var(--gradient-1)]`

### 4.4 Responsive & Polish
- [ ] Test breakpoints: 375px, 768px, 1024px, 1440px
- [ ] Ensure touch targets ≥44px, focus-visible outlines
- [ ] Add `prefers-reduced-motion` respect
- [ ] Dark mode only (no toggle in Phase 01)

### 4.5 Build & Deploy Ready
- [ ] `npm run build` produces `dist/` with static assets
- [ ] Add `.gitignore`, update `README.md` with dev commands
- [ ] Verify `npm run preview` works locally

---

## 5. Out of Scope (Phase 01)
- Copy-to-clipboard functionality (Phase 02)
- AI prompt generation (Phase 02)
- Gradient search/filter (Phase 02+)
- Light mode toggle
- More than 2 gradients
- Separate hero/preview section
- Animation library (Framer Motion, etc.) — use CSS transitions only

---

## 6. Validation Checklist
- [ ] `npm run dev` starts without errors
- [ ] Page loads with header, gallery (2 gradient cards), footer
- [ ] Responsive: single column on mobile, two columns on tablet+
- [ ] Gradients render correctly (no white flashes)
- [ ] No console errors or warnings
- [ ] `npm run build` completes, `dist/` contains `index.html` + assets
- [ ] Keyboard navigable, focus indicators visible
- [ ] `prefers-reduced-motion` honored

---

## 7. Open Questions
None — plan is implementation-ready pending approval.