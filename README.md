# Antigravity Design System (`v2.4 SPEC`)

> **Perceptual OKLCH & Spatial Liquid Glass Design System Workbench** — An enterprise 3-tier W3C DTCG token pipeline, WCAG 2.2 AA verified component architecture, and multi-platform compiler bridging **Figma Variables**, **Google Stitch (`DESIGN.md`)**, **Google Antigravity (`AGENTS.md`)**, **Cursor (`.cursor/rules`)**, and **Next.js 16 + Tailwind CSS v4**.

---

## Architectural Highlights (Portfolio Case Study)

1. **Perceptual 3-Tier OKLCH Token Engine (`/tokens` → `scripts/build-tokens.mjs`)**
   - **Tier 1 (`tokens/primitives.json`):** 13-step perceptual OKLCH + sRGB Hex tonal scales derived from seed parameters (`--seed-hue`, `--seed-chroma`), 8px spatial grid, optical typography scales, concentric corner radii, and spring physics curves.
   - **Tier 2 (`tokens/semantic.light.json` & `tokens/semantic.dark.json`):** Contextual intent tokens (`--bg-action-primary`, `--bg-action-primary-hover`, `--text-primary`, `--text-feedback-error`, `--border-focus-ring`) mapped completely across **Obsidian Dark** and **Alabaster Light** polarities.
   - **Tier 3 (`tokens/components.json`):** Element-scoped overrides for `button`, `form-field`, `modal-dialog`, and `data-table`, enforcing WCAG 2.2 SC 2.5.8 target minimums (`>= 40px`) and SC 2.4.11 focus ring geometry (`2px` solid outline with `2px` offset).

2. **Z-Axis Spatial Discipline (Material 3 Expressive + Apple HIG Liquid Glass)**
   - **Z-Level 0 (`Canvas`):** Base environment background (`var(--bg-canvas)` / `var(--sys-surface-canvas)`).
   - **Z-Level 1 (`Content Layer`):** 5-step tonal surface containers (`.tonal-card`, `.tonal-card-elevated`) with `1px` specular top hairlines and **zero backdrop blur** (preventing glass-on-glass muddiness and GPU overdraw).
   - **Z-Level 2 (`Floating Chrome Layer`):** Optical Liquid Glass (`.liquid-glass-regular` `24px` blur / `190%` saturation) reserved strictly for sticky navigation bars, `Cmd+K` command palettes, and transient popovers.

3. **Multi-Platform AI & Design Tool Synchronization**
   Running `npm run build:tokens` compiles `/tokens/*.json` simultaneously into **5 platform targets**:
   - `src/styles/tokens.generated.css` — CSS Custom Properties (`:root`, `.dark`, `[data-theme="dark"]`) + Tailwind CSS v4 `@theme inline` bindings.
   - `src/lib/tokens.generated.ts` — Strongly-typed TypeScript token lineage & WCAG contrast dictionary.
   - `public/exports/figma-variables.tokens.json` — W3C DTCG JSON bundle for **Figma Variables** & **Tokens Studio**.
   - `DESIGN.md` — Semantic design system specification for **Google Stitch** (`@google/design.md`).
   - `.cursor/rules/design-system.mdc` & `AGENTS.md` — AI guardrails for **Cursor** and **Google Antigravity**.

---

## Interactive Routes & Component Portal

| Route | Description | Key Engineering & Accessibility Features |
| :--- | :--- | :--- |
| **`/`** | **7-Section Perceptual & Spatial Workbench** | Live OKLCH seed modulator, `Cmd+K` command bar, Z-axis glass stage, M3 typography lab, concentric radius calculator, Phosphor icon studio, and live multi-platform compiler. |
| **`/components/form-field`** | **Accessible Form Field Input Portal** | 6-state interactive simulator (`Default`, `Hover`, `Focus-Visible`, `Active`, `Disabled`, `Error`), `<label htmlFor>`, `aria-invalid`, `aria-describedby`, `aria-live="polite"`, zero keyboard trap. |
| **`/components/modal-dialog`** | **Focus-Trapped Modal Dialog Portal** | WAI-ARIA `role="dialog" aria-modal="true"`, FocusScope `Tab` / `Shift+Tab` cycle containment, `Escape` dismissal, and trigger focus restoration. |
| **`/components/data-table`** | **Interactive Telemetry & Token Data Table** | Sortable `<th scope="col" aria-sort>` headers, live search filter, selectable rows (`aria-selected`), and mandatory `tabular-nums` alignment. |
| **`/components/button`** | **M3 Shape-Morphing Action Button** | Material 3 Expressive active corner morphing (`12px` resting radius → `9999px` pill on press) and 40px touch target compliance. |

---

## Architecture & Verification Documentation

- **[Information Architecture & System Topology (`docs/information-architecture.md`)](./docs/information-architecture.md):** Full 6-tier IA schema covering Foundations, 3-Tier Token Taxonomy, 31-Component Functional Directory, Design Patterns, Cross-Platform Sync, and Next.js 16 Workspace Topology.
- **[Automated WCAG 2.2 AA Verification Report (`docs/verification-report.md`)](./docs/verification-report.md):** Mathematical contrast audit verifying all 11 foreground/background semantic pairs across Light and Dark modes.
- **[Master AI Architect Prompt (`docs/ai-architect-prompt.md`)](./docs/ai-architect-prompt.md):** Reusable prompt engineering specification for autonomous multi-platform design system generation.

---

## Local Development & Verification Pipeline

```bash
# 1. Compile 3-Tier W3C DTCG tokens across all 5 platform targets
npm run build:tokens

# 2. Run automated WCAG 2.2 AA dual-polarity contrast & artifact verification
npm run verify:wcag

# 3. Run strict TypeScript & ESLint verification
npx tsc --noEmit
npm run lint

# 4. Build production Next.js 16 static & SSG routes
npm run build

# 5. Start local development workbench
npm run dev
```
