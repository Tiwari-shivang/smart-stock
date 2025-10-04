
# SmartStock Dashboard — UI/UX Style Guide (2025)

**Product context:** SmartStock is a trend‑aware, context-driven inventory recommendation dashboard for 7‑Eleven store managers (East Asia focus). This guide defines layout, components, theming, typography, and engineering best practices for an enterprise‑grade React + TypeScript app.

---

## 1) Layout System (12‑Column Grid)

- **Viewport targets:** Desktop (1440×900), Tablet (1024×768), Mobile (414×896).
- **Grid:** 12 columns, **Column width** varies by breakpoint, **Gutter** 16px, **Outer margin** 64px (desktop), 24px (tablet), 16px (mobile).
- **Units:** Use columns for sizing + `minmax()` with CSS grid.
- **Container radius:** 12px (cards/panels), 20px (hero panels).
- **Elevation:** 0/1/2/3 with shadow tokens (`--shadow-sm/md/lg/xl`).

### Desktop Layout Map (1440px wide)

| Region | Columns (span) | Height (approx) | Notes/Content |
|---|---:|---:|---|
| **Top App Bar** | 1–12 | 80px | Product title, tabs (Overview/Inventory/Trends/Analytics/Leaderboard), global search, profile. |
| **A1 Greeting / Summary** | 1–6 | 128px | Daily highlights, quick actions (Approve All/Defer/Export). |
| **A2 Quick Card: Add Event** | 7–8 | 60px | Create Football/Festival/Concert; auto-tag categories/SKUs. |
| **A3 Quick Card: Weather Impact** | 9–10 | 60px | Demand modifiers (Rain/Heat). |
| **A4 Quick Card: Bulk Approvals** | 7–8 | 60px | Batch accept/reject with preview. |
| **A5 Quick Card: Command Search** | 9–10 | 60px | Jump to filtered views via query. |
| **A6 Store Overview** | 11–12 | 128px | Rank, sync status, KPI mini‑tiles. |
| **B1 Demand Bubbles** | 1–9 | 240px | Bubble chart: Restock/Replace/Promote; size=impact; hover=explain/confidence. |
| **B2 Upcoming Events & Context** | 10–12 | 112px | Football Final, Rain alert, Festivals, Tourist mix. |
| **B3 Today’s Actions** | 10–12 | 104px | Next steps: X Restock, Y Replace, Z Promote. |
| **C Recommendation Feed (Cards)** | 1–12 | 140px+ (auto) | Per card: image, action, “why”, confidence, shelf‑fit, cross‑sell, approve/reject. |
| **D1 Current Promotions & Bundles** | 1–8 | 120px | Chips+Cola, Noodles+Eggs, etc. |
| **D2 Impact & Trend Snapshot** | 9–12 | 120px | 7‑day uplift, waste delta, stockouts trend, data freshness. |
| **Footer Status Bar** | 1–12 | 56px | Online/offline, version, quick tips, language toggle. |

> **Tablet:** Collapse **A2–A5** into a single 2×2 grid; **B2 + B3** stack; **D1/D2** stack.  
> **Mobile:** Single column; sticky **Action Bar** at bottom for Approve/Reject.

---

## 2) Component Specifications (Containers)

### 2.1 Hero Scorecards (KPI Tiles)
- **Contents:** Title, value, delta badge, trend sparkline (7‑day), tooltip with definition.
- **Sizes:** 240×120 (desktop), 180×100 (tablet), 160×92 (mobile).
- **States:** default, loading (skeleton), error (retry), empty (N/A).

### 2.2 Recommendation Card
- **Header:** SKU name, image, action chip (Restock/Replace/Promote), confidence gauge.
- **Body:** “Why” chips (Event/Weather/Trend), shelf‑fit check, cross‑sell suggestions.
- **Footer:** Approve / Reject / Defer; shortcut keys: **A/R/D**.
- **Batch mode:** checkbox + action bar.

### 2.3 Demand Bubble Chart
- **Visual:** size=impact score, color=action (green/red/blue), border=volatility, opacity=confidence.
- **Interaction:** hover=explainability popover; click=drill to SKU card.

### 2.4 Context Panel
- **Sections:** Weather (today/48h), Events (timeline), Festivals, Tourist/Local mix.
- **Badges:** Impact arrows (↑/↓) with estimated uplift.

### 2.5 Store Overview
- **Elements:** Store ID, rank, last sync, alerts count, KPI mini‑tiles; CTA: “View full analytics”.

### 2.6 Promotions & Bundles
- **Row cards** with attach‑rate and projected uplift; CTA: “Activate” / “Edit bundle”.

### 2.7 Impact Snapshot
- **Charts:** line (sales uplift), bar (waste), area (stockouts).  
- **Legends:** Toggle series; export CSV/PNG.

---

## 3) Theming

Use CSS variables with a theme provider. Prefix tokens with `--ss-`.

### Core Theme Tokens
- **Radii:** `--r-0: 0`, `--r-sm: 8px`, `--r-md: 12px`, `--r-lg: 20px`, `--r-pill: 999px`
- **Shadows:** `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`
- **Spacing scale:** 4px grid (`--space-1:4`, `--space-2:8`, …, `--space-8:32`, `--space-12:48`)

### Light Theme
- **Backgrounds:** `--bg: #F7FAFC`, `--panel: #FFFFFF`, `--muted: #F2F4F7`
- **Text:** `--text: #0F172A`, `--subtle: #475569`
- **Primary:** `--primary: #1F6AAE` (links/buttons)
- **Accents:** `--green: #16A34A` (Restock), `--red: #DC2626` (Replace), `--blue: #2563EB` (Promote)
- **Borders:** `--line: #E5E7EB`

### Dark Theme
- **Backgrounds:** `--bg: #0B1220`, `--panel: #121A2A`, `--muted: #0F1422`
- **Text:** `--text: #E5E7EB`, `--subtle: #9CA3AF`
- **Primary:** `--primary: #4EA1FF`
- **Accents:** `--green: #34D399`, `--red: #F87171`, `--blue: #60A5FA`
- **Borders:** `--line: #1F2A3C`

### Semantic Colors
- **Info:** `#0EA5E9`, **Warning:** `#F59E0B`, **Success:** `#22C55E`, **Danger:** `#EF4444`

---

## 4) Typography

- **Font Family:** `Inter` (primary), `IBM Plex Sans` (fallback), `Noto Sans` for CJK where needed.
- **Scale (fluid):**
  - Display: 34–44px
  - H1: 28–32px
  - H2: 22–24px
  - H3: 18–20px
  - Body: 14–16px
  - Caption/Meta: 12–13px
- **Weights:** 600 (headings), 500 (labels), 400 (body).
- **Line-height:** 1.3 (titles), 1.5 (body).

---

## 5) Iconography & Imagery

- **Icon set:** `lucide-react` (stroke 1.5), filled states for primary actions.
- **Illustrations/empty states:** Lottie JSON or SVG; keep friendly and minimal.

---

## 6) Motion & Interaction

- **Library:** Framer Motion.
- **Durations:** 160ms (micro), 240ms (modal), 320ms (page).
- **Easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Micro‑interactions:** hover lift (2px), button ripple, card fade‑in.
- **Reduce motion:** Respect `prefers-reduced-motion`.

---

## 7) React + TypeScript Project Structure

```
smartstock/
├─ apps/web/                      # React app (Vite or Next.js App Router)
│  ├─ src/
│  │  ├─ app/                     # routes (Next) or pages (Vite+TanStack Router)
│  │  ├─ components/
│  │  │  ├─ ui/                   # design system (buttons, input, card, chip, modal)
│  │  │  ├─ charts/               # Recharts wrappers
│  │  │  ├─ dashboard/            # feature widgets (bubbles, rec-cards, leaderboards)
│  │  ├─ features/
│  │  │  ├─ recommendations/
│  │  │  ├─ inventory/
│  │  │  ├─ trends-events/
│  │  │  ├─ analytics/
│  │  │  └─ gamification/
│  │  ├─ hooks/                   # shared hooks (useTheme, useCommandBar)
│  │  ├─ lib/                     # utils (date, number, i18n, api clients)
│  │  ├─ store/                   # state (Zustand/Redux Toolkit)
│  │  ├─ styles/                  # CSS variables, themes, tailwind.css
│  │  ├─ i18n/                    # locales (en, vi, jp, zh, kr)
│  │  ├─ tests/                   # React Testing Library + Vitest/Jest
│  │  └─ types/                   # TypeScript types (SKU, Event, Recommendation, Theme)
│  ├─ public/
│  └─ index.html
├─ packages/design-system/        # shared UI kit (optional monorepo)
├─ packages/config/               # ESLint, Prettier, tsconfig, Tailwind config
├─ .editorconfig
├─ .eslintrc.cjs
├─ tailwind.config.ts
├─ tsconfig.json
└─ vite.config.ts or next.config.mjs
```

---

## 8) Engineering Best Practices (Enterprise‑Grade)

### Code Quality & DX
- **TypeScript strict mode**; use `zod` or `io-ts` for runtime validation at boundaries.
- **ESLint + Prettier** with import sorting; **absolute imports** via TS paths.
- **Storybook** for UI components; capture states (loading/empty/error).
- **ADR docs** for key decisions (state mgmt, data fetching).

### State & Data
- **Server state:** React Query (TanStack Query) with cache keys (`storeId`, `dateRange`).
- **Client state:** Zustand or Redux Toolkit for UI state (theme, modals, filters).
- **Selectors & memoization** for large tables.
- **Error boundaries** per route and per widget.

### Performance
- Code‑split by route and widget; lazy‑load charts.
- Virtualize long lists (react‑virtualized / tanstack‑virtual).
- Use **suspense** for data fetching; show skeletons.
- Memoize expensive charts; debounce search inputs.

### Accessibility (WCAG 2.2 AA)
- Proper landmarks (header/nav/main/aside/footer).
- Keyboard focus order & visible focus rings.
- ARIA labels for charts and controls; alt text for images.
- Color contrast ≥ 4.5:1; support **`prefers-reduced-motion`**.
- Localized number/date formats; RTL readiness where applicable.

### Theming & Intl
- Theme provider with CSS variables; **system theme** default.
- i18n via `react-intl` or `lingui`; pluralization; ICU messages.
- Units/locales for East Asia (CJK fonts via `Noto Sans`).

### Security & Auth
- OIDC/OAuth2; httpOnly cookies; CSRF protection.
- Sanitize HTML from external feeds; Content Security Policy.
- Role‑based access (store manager vs. regional).

### Testing & QA
- **Unit:** Vitest/Jest; **Component:** React Testing Library; **E2E:** Playwright/Cypress.
- Visual regression with Storybook + Chromatic/Playwright snapshots.
- Contract tests for API clients (msw for mocks).

### CI/CD
- Lint + typecheck + tests on PR; preview deployments (Vercel/Netlify).
- Bundle analysis; Lighthouse checks; Sentry for error tracking.

---

## 9) Theme Implementation Snippet (CSS variables)

```css
:root {
  --ss-bg:#F7FAFC; --ss-panel:#FFF; --ss-muted:#F2F4F7;
  --ss-text:#0F172A; --ss-subtle:#475569;
  --ss-primary:#1F6AAE;
  --ss-green:#16A34A; --ss-red:#DC2626; --ss-blue:#2563EB;
  --ss-line:#E5E7EB; --ss-r-md:12px; --ss-shadow:0 4px 12px rgba(0,0,0,0.06);
}
[data-theme="dark"] {
  --ss-bg:#0B1220; --ss-panel:#121A2A; --ss-muted:#0F1422;
  --ss-text:#E5E7EB; --ss-subtle:#9CA3AF;
  --ss-primary:#4EA1FF;
  --ss-green:#34D399; --ss-red:#F87171; --ss-blue:#60A5FA;
  --ss-line:#1F2A3C;
}
```

---

## 10) Sample React Card (TypeScript)

```tsx
type RecAction = 'RESTOCK' | 'REPLACE' | 'PROMOTE';

export interface Recommendation {
  id: string;
  sku: string;
  imageUrl?: string;
  action: RecAction;
  confidence: number; // 0..1
  impactScore: number; // normalized 0..100
  reasons: string[]; // ['Football Final', 'Rain forecast']
}

export function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <div className="rounded-[var(--ss-r-md)] bg-[var(--ss-panel)] shadow-[var(--ss-shadow)] p-16">
      <header className="flex items-center gap-12 mb-12">
        <img src={rec.imageUrl} alt="" className="w-56 h-56 rounded" />
        <h3 className="text-18 font-semibold text-[var(--ss-text)]">{rec.sku}</h3>
        <span className="ml-auto px-10 py-4 rounded-full text-12" data-action={rec.action}>
          {rec.action}
        </span>
      </header>
      <p className="text-14 text-[var(--ss-subtle)]">Why: {rec.reasons.join(' • ')}</p>
      <footer className="mt-12 flex gap-8">
        <button className="btn btn-primary">Approve</button>
        <button className="btn btn-ghost">Reject</button>
      </footer>
    </div>
  );
}
```

---

## 11) Token Naming & Usage

- Use semantic tokens first (e.g., `--color-action-restock`) and map to base tokens.
- Prefer utility classes (Tailwind) with design tokens for consistency.
- Export tokens to Storybook for designer–dev parity.

---

## 12) Versioning

- Maintain this guide in `/docs/style-guide.md`.  
- Use semver: UI tokens & components are versioned; breaking changes require a migration note.

---

**End of document.**
