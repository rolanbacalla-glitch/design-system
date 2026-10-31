# Antigravity Design System (`v2.4 SPEC`) — Information Architecture & System Topology

> **Single Source of Truth (SSOT) Blueprint** bridging **Next.js 16 (App Router) + Tailwind CSS v4**, **Figma (W3C DTCG Variables & Code Connect)**, **Google Stitch (`DESIGN.md`)**, **Google Antigravity (`AGENTS.md`)**, and **Cursor (`.cursor/rules/design-system.mdc`)**.

---

## Cross-Prompt Alignment Matrix

Before diving into the 6-tier IA tree, this matrix verifies 100% alignment between the **Master Execution Prompt (`docs/ai-architect-prompt.md`)**, the **existing v2.4 Workbench codebase**, and this **Information Architecture schema**:

| Original Prompt Requirement | IA Blueprint Section | Exact Workspace Implementation Path |
| :--- | :--- | :--- |
| **Phase 2.1: 3-Tier JSON Token Architecture (`/tokens`)** | `Section 2: Styles & 3-Tier Design Token Taxonomy` | `tokens/primitives.json` (Tier 1)<br>`tokens/semantic.light.json` & `tokens/semantic.dark.json` (Tier 2)<br>`tokens/components.json` (Tier 3) |
| **Phase 2.2: Token Transpilation Pipeline & Tailwind Dark Mode** | `Section 2` & `Section 5: Cross-Platform Sync` | `scripts/build-tokens.mjs` → `src/styles/tokens.generated.css` (`:root`, `.dark, [data-theme="dark"]`, `@theme inline`) + `src/lib/tokens.generated.ts` |
| **Phase 3.1–3.3: Interactive Component Portal (`[componentName]`)** | `Section 3: Functional Component Directory` | `src/app/components/[componentName]/page.tsx` + `src/lib/component-registry.ts` (Playground, State Matrix, Code Tab, Tier-2 Token Inspector, WCAG Keyboard/ARIA) |
| **Phase 4.1: GitHub Actions CI/CD Pipeline** | `Section 6: Repository & Workspace Topology` | `.github/workflows/design-system-build.yml` (`npm run build:tokens`, `tsc --noEmit`, `npm run lint`, `npm run build`) |
| **Verification Gate: WCAG 2.2 AA Audit Report** | `Section 1.2` & `Section 6` | `scripts/verify-design-system.mjs` → `docs/verification-report.md` |
| **Multi-Platform AI & Design Tool Portability** | `Section 5: Cross-Platform Sync Architecture` | `public/exports/figma-variables.tokens.json` (Figma)<br>`DESIGN.md` (Google Stitch)<br>`AGENTS.md` & `.cursor/rules/design-system.mdc` (Antigravity & Cursor) |

---

## 1. CORE PHILOSOPHY, GOVERNANCE & ACCESSIBILITY ARCHITECTURE

```text
01-Core-Philosophy-and-Foundations/
├── 1.1-Architectural-Principles/
│   ├── Perceptual-Uniformity-OKLCH
│   │   ├── Rule: All color tokens derive mathematically from seed parameters (--seed-hue, --seed-chroma) in Oklab/OKLCH perceptual space.
│   │   └── Benefit: Guarantees uniform perceived lightness (L) across hues so swapping brand seeds never breaks contrast ratios.
│   ├── Z-Axis-Spatial-Discipline
│   │   ├── Z-Level-0 (Canvas): Base environment background (--sys-surface-canvas / --bg-canvas). Zero blur, zero elevation.
│   │   ├── Z-Level-1 (Content Surfaces): 5-step tonal elevation (--sys-surface-lowest to --sys-surface-highest) + 1px specular top hairline.
│   │   │   └── Mandate: NEVER apply backdrop-filter blur to Z-Level-1 content cards (prevents muddiness and GPU overdraw).
│   │   └── Z-Level-2 (Floating Chrome): True Apple HIG Liquid Glass (.liquid-glass-regular 24px blur / 190% sat) reserved strictly for floating navbars, command bars, and modal overlays.
│   └── Swiss-Grid-and-Scannability
│       ├── 8px spatial rhythm grid, 1px structural hairlines (--sys-outline-variant), and 60ch–72ch readable measure guards.
│       └── Mandatory tabular numerals (font-variant-numeric: tabular-nums) on all counters, prices, sliders, and telemetry tables.
│
├── 1.2-WCAG-2.2-AA-Conformance-Policy/
│   ├── Perceptual-Contrast-Floors
│   │   ├── Body & Label Text (< 24px): Minimum 4.5:1 WCAG 2.2 AA contrast ratio (Target >= 7.0:1 AAA for primary ink).
│   │   ├── Large Display Text (>= 24px or >= 18.66px bold): Minimum 3.0:1 contrast ratio.
│   │   └── Non-Text UI Controls, Borders & Focus Rings (SC 1.4.11): Minimum 3.0:1 contrast against adjacent surface.
│   ├── Focus-Appearance-and-Clearance (WCAG 2.2 SC 2.4.11, 2.4.12, 2.4.13)
│   │   ├── Focus Ring Geometry: 2px solid --border-focus-ring (--sys-primary) with 2px offset (--comp-focus-ring-offset).
│   │   └── Scroll Padding Mandate: scroll-padding-top: 96px on root html so focused elements are never obscured beneath Z-Level-2 sticky Liquid Glass headers.
│   ├── Pointer-and-Motor-Accessibility (WCAG 2.2 SC 2.5.7 & 2.5.8)
│   │   ├── Target Size Minimum (SC 2.5.8): Every interactive control enforces >= 24x24px bounding box (40x40px default touch height via --comp-target-min-touch).
│   │   └── Dragging Movements (SC 2.5.7): Every slider, range control, or reorderable item provides single-pointer click/stepper and keyboard arrow alternatives.
│   ├── Cognitive-and-Form-Accessibility (WCAG 2.2 SC 3.2.6, 3.3.7, 3.3.8)
│   │   ├── Explicit programmatic labels (<label htmlFor>, aria-labelledby), inline error linking (aria-invalid, aria-describedby), and polite live regions (aria-live="polite").
│   │   └── Never rely on placeholder text as the sole label or color alone to communicate error/status state.
│   └── Environmental-Media-Queries
│       ├── @media (prefers-reduced-motion: reduce): Collapses spring durations to <= 0.01ms and disables decorative ambient pulses.
│       └── @media (prefers-reduced-transparency: reduce): Replaces Z-Level-2 Liquid Glass translucency with solid --sys-surface-high backgrounds.
│
├── 1.3-Contribution-and-Lifecycle-Model/
│   ├── Stage-01-RFC-Proposal: Token & API specification drafted in /docs/rfcs/ with WAI-ARIA role mapping and Tier-2 token bindings.
│   ├── Stage-02-Experimental (Alpha): Implemented in src/components/ui/ with interactive state matrix in src/lib/component-registry.ts.
│   ├── Stage-03-Validated (Beta): Passes automated scripts/verify-design-system.mjs (WCAG 2.2 contrast + zero TypeScript/ESLint warnings).
│   └── Stage-04-Stable (Production): Exported to Figma Code Connect, Google Stitch DESIGN.md, and Cursor/Antigravity agent rules.
│
└── 1.4-Versioning-and-Deprecation-Governance/
    ├── Semantic-Versioning (SemVer):
    │   ├── MAJOR (v3.0.0): Breaking changes to Tier-2 semantic token names or required React component props.
    │   ├── MINOR (v2.5.0): New components, new seed presets, or backward-compatible Tier-3 token additions.
    │   └── PATCH (v2.4.1): Contrast tuning, optical spacing refinements, or bug fixes.
    └── Automated-CI-Enforcement: .github/workflows/design-system-build.yml blocks any Pull Request where token compilation or WCAG 2.2 AA verification fails.
```

---

## 2. STYLES & 3-TIER DESIGN TOKEN TAXONOMY (THE GLOBAL DNA)

All tokens follow the **W3C Design Tokens Community Group (DTCG)** specification (`$value`, `$type`, `$description`) inside `/tokens/*.json` and compile into **both** the prompt-standard semantic variables (`--bg-action-primary-hover`, `--text-feedback-error`) and the Workbench system variables (`--sys-*`).

```text
02-Styles-and-3-Tier-Design-Tokens/
├── Tier-1-Primitives (tokens/primitives.json — Global Raw Values)
│   ├── Color-Primitives/
│   │   ├── Seed-Parameters: hue (258), chroma (0.19), secondaryHue (215), tertiaryHue (162), neutralChroma (0.012)
│   │   ├── Primary-Cobalt-Scale (13 Tonal Stops): 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100
│   │   ├── Secondary-Cyan-Scale (13 Tonal Stops): 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100
│   │   ├── Tertiary-Emerald-Scale (13 Tonal Stops): 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100
│   │   ├── Neutral-Obsidian-Scale (13 Tonal Stops): 0, 4, 6, 10, 12, 17, 22, 30, 50, 70, 90, 92, 94, 96, 98, 100
│   │   └── Status-Palettes:
│   │       ├── Success-Green: 10, 20, 30, 40, 70, 90, 95
│   │       ├── Warning-Amber: 10, 20, 30, 40, 70, 90, 95
│   │       └── Error-Crimson: 10, 20, 30, 40, 70, 90, 95
│   ├── Typography-Primitives/
│   │   ├── Font-Families:
│   │   │   ├── font.family.sans: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
│   │   │   ├── font.family.serif: "Instrument Serif, Georgia, serif"
│   │   │   └── font.family.mono: "JetBrains Mono, ui-monospace, monospace"
│   │   ├── Font-Sizes: xs (12px), sm (14px), md (15px), lg (18px), xl (22px), 2xl (28px), 3xl (36px), 4xl (44px), 5xl (52px)
│   │   ├── Line-Heights: tight (1.06), snug (1.20), normal (1.50), relaxed (1.65)
│   │   └── Letter-Spacing: tightest (-0.03em), tight (-0.015em), normal (0em), wide (0.06em), widest (0.12em)
│   ├── Spacing-and-Grid-Primitives/
│   │   ├── 8px-Base-Scale: 0 (0px), 0.5 (2px), 1 (4px), 1.5 (6px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px)
│   │   └── Layout-Grid: columns (12), maxWidth (1400px), gutterComfort (24px), gutterCompact (16px)
│   ├── Shape-and-Radius-Primitives/
│   │   └── Corner-Scale: none (0px), xs (4px), sm (8px), md (12px), lg (16px), xl (24px), 2xl (32px), pill (9999px)
│   └── Elevation-Blur-and-Motion-Primitives/
│       ├── Optical-Blur: sm (8px), md (12px), lg (16px), xl (24px)
│       ├── Easing-Curves:
│       │   ├── ease.spatial.spring: "cubic-bezier(0.22, 1.28, 0.36, 1)"
│       │   ├── ease.effects.smooth: "cubic-bezier(0.22, 1, 0.36, 1)"
│       │   └── ease.out.quart: "cubic-bezier(0.165, 0.84, 0.44, 1)"
│       └── Durations: instant (75ms), fast (150ms), normal (220ms), slow (380ms)
│
├── Tier-2-Semantic-Tokens (tokens/semantic.light.json & tokens/semantic.dark.json — Contextual Intent)
│   ├── Surface-Hierarchy (Z-Level 0 & Z-Level 1)/
│   │   ├── bg-canvas / --sys-surface-canvas             (Light: neutral.98  | Dark: neutral.6)
│   │   ├── bg-surface-recessed / --sys-surface-lowest   (Light: neutral.100 | Dark: neutral.4)
│   │   ├── bg-surface-card / --sys-surface-low          (Light: neutral.96  | Dark: neutral.10)
│   │   ├── bg-surface-elevated / --sys-surface-container(Light: neutral.94  | Dark: neutral.12)
│   │   ├── bg-surface-hover / --sys-surface-high        (Light: neutral.92  | Dark: neutral.17)
│   │   └── bg-surface-active / --sys-surface-highest    (Light: neutral.90  | Dark: neutral.22)
│   ├── Action-Intent-Tokens/
│   │   ├── bg-action-primary / --sys-primary            (Light: primary.40  | Dark: primary.70)
│   │   ├── bg-action-primary-hover / --sys-primary-strong (Light: primary.30 | Dark: primary.80)
│   │   ├── bg-action-primary-subtle / --sys-primary-container (Light: primary.90 | Dark: primary.20)
│   │   ├── bg-action-secondary / --sys-secondary        (Light: secondary.40| Dark: secondary.70)
│   │   └── text-on-action / --sys-on-primary            (Light: primary.100 | Dark: primary.10)
│   ├── Typography-and-Ink-Hierarchy/
│   │   ├── text-primary / --sys-on-surface              (Light: neutral.10  | Dark: neutral.96 — >= 13.5:1 AAA)
│   │   ├── text-secondary / --sys-on-surface-secondary  (Light: neutral.30  | Dark: neutral.70 — >= 7.2:1 AAA)
│   │   ├── text-muted / --sys-on-surface-tertiary       (Light: neutral.40  | Dark: neutral.60 — >= 4.6:1 AA)
│   │   └── text-disabled / --sys-on-surface-quaternary  (Light: neutral.60  | Dark: neutral.40 — decorative/disabled)
│   ├── Feedback-and-Validation-Tokens/
│   │   ├── text-feedback-error                           (Light: error.30    | Dark: error.80   — >= 5.4:1 AA)
│   │   ├── bg-feedback-error-subtle                      (Light: error.95    | Dark: error.20)
│   │   ├── border-feedback-error                         (Light: error.40    | Dark: error.70   — >= 3.8:1 AA)
│   │   ├── text-feedback-success                         (Light: success.30  | Dark: success.80 — >= 5.2:1 AA)
│   │   ├── bg-feedback-success-subtle                    (Light: success.95  | Dark: success.20)
│   │   ├── text-feedback-warning                         (Light: warning.30  | Dark: warning.80 — >= 5.8:1 AA)
│   │   └── bg-feedback-warning-subtle                    (Light: warning.95  | Dark: warning.20)
│   └── Borders-Focus-and-Liquid-Glass (Z-Level 2)/
│       ├── border-default / --sys-outline               (Light: neutral.30/22% | Dark: neutral.90/18%)
│       ├── border-subtle / --sys-outline-variant        (Light: neutral.30/12% | Dark: neutral.90/10%)
│       ├── border-focus-ring                            (Light: primary.40     | Dark: primary.70 — >= 4.8:1 AA)
│       ├── surface-glass-regular / --glass-regular-bg   (Z-2 Floating Chrome 24px blur)
│       └── surface-glass-clear / --glass-clear-bg       (Z-2 Transient Control 12px blur)
│
└── Tier-3-Component-Tokens (tokens/components.json — Element-Scoped Overrides)
    ├── component.button.*
    │   ├── bg.primary: "{semantic.bg-action-primary}"
    │   ├── bg.primaryHover: "{semantic.bg-action-primary-hover}"
    │   ├── text.primary: "{semantic.text-on-action}"
    │   ├── radius.default: "{primitive.radius.md}"
    │   ├── radius.activeMorph: "{primitive.radius.pill}"
    │   └── minHeight: "40px" (WCAG 2.2 SC 2.5.8 compliant)
    ├── component.form-field.*
    │   ├── bg.default: "{semantic.bg-surface-recessed}"
    │   ├── bg.hover: "{semantic.bg-surface-hover}"
    │   ├── text.value: "{semantic.text-primary}"
    │   ├── text.label: "{semantic.text-secondary}"
    │   ├── text.error: "{semantic.text-feedback-error}"
    │   ├── border.default: "{semantic.border-default}"
    │   ├── border.focus: "{semantic.border-focus-ring}"
    │   ├── border.error: "{semantic.border-feedback-error}"
    │   ├── radius: "{primitive.radius.md}"
    │   ├── minHeight: "44px"
    │   └── focusRingWidth: "2px" / focusRingOffset: "2px"
    ├── component.modal-dialog.*
    │   ├── bg.surface: "{semantic.bg-surface-elevated}"
    │   ├── bg.backdrop: "oklch(0.08 0.01 258 / 0.68)"
    │   ├── border.specular: "{semantic.border-default}"
    │   ├── radius: "{primitive.radius.xl}"
    │   └── padding: "{primitive.spacing.6}"
    └── component.data-table.*
        ├── bg.container: "{semantic.bg-surface-card}"
        ├── bg.header: "{semantic.bg-surface-elevated}"
        ├── bg.rowHover: "{semantic.bg-surface-hover}"
        ├── border.row: "{semantic.border-subtle}"
        └── cellPaddingY: "12px" / cellPaddingX: "16px"
```

---

## 3. FUNCTIONAL COMPONENT DIRECTORY (THE COMPONENT TREE)

### 3.0 Universal Component Metadata Sub-Schema
Every component registered in `src/lib/component-registry.ts` and rendered at `src/app/components/[componentName]/page.tsx` adheres to this 6-part structural contract:

```text
[ComponentName] (/components/[componentName])
├── 01-Overview
│   ├── Functional definition, Z-Axis layer assignment (Z-1 Tonal vs. Z-2 Liquid Glass)
│   └── Explicit When-to-Use (Do) vs. When-Not-to-Use (Don't) architectural guardrails
├── 02-Visual-Anatomy
│   ├── Annotated slot breakdown (Container, Leading Icon, Label/Input Slot, Helper/Validation Slot, Trailing Action)
│   └── Concentric geometry rules (R_outer = R_inner + Padding), internal spacing, and 24px/40px target metrics
├── 03-Interactive-State-Matrix
│   └── Live interactive state switcher: Default | Hover | Focus-Visible | Active/Pressed | Disabled | Error (plus Light/Dark polarity)
├── 04-Tokens-and-Specs
│   └── Live Tier-3 -> Tier-2 Semantic -> Tier-1 Primitive token lineage table with computed Light & Dark OKLCH/Hex values
├── 05-Accessibility-Rules (WCAG 2.2 AA & WAI-ARIA 1.2)
│   ├── WAI-ARIA role, state attributes (aria-invalid, aria-expanded, aria-checked, aria-describedby, aria-live)
│   └── Keyboard navigation bindings (Tab, Shift+Tab, Arrow keys, Enter/Space, Escape, Radix FocusScope trap rules)
└── 06-Platform-Code-Bindings
    ├── Copyable React 19 / TypeScript strict implementation
    └── Cross-platform mappings for Figma Code Connect & Google Stitch YAML
```

### 3.1 Complete 6-Bucket Functional Taxonomy

```text
03-Component-Directory/
│
├── Bucket-01-Actions-and-Triggers/
│   ├── Button (/components/button)
│   │   ├── Overview: Primary, Secondary, Tonal, Outline, and Danger triggers with M3 Expressive active shape morphing (12px -> 9999px pill on press).
│   │   ├── Visual Anatomy: [Container (min-h 40px, px-4, py-2.5)] -> [Leading Icon 16px] + [Label (font-sans 600)] + [Trailing Badge/Icon].
│   │   ├── Interactive States: Default, Hover (scale 1.01 + --bg-action-primary-hover), Focus-Visible (2px ring + 2px offset), Pressed (rounded-full morph), Disabled (opacity-45, pointer-events-none), Error/Destructive.
│   │   ├── Tokens & Specs: --comp-button-primary-bg -> --bg-action-primary -> {color.primary.40/70}; --comp-button-primary-text -> --text-on-action.
│   │   └── Accessibility Rules: Native <button type="button">, aria-busy for loading state, SC 2.5.8 target >= 40px height, Enter/Space activation.
│   │
│   ├── IconButton (/components/icon-button)
│   │   ├── Overview: Compact square/circular icon-only action trigger for toolbars, card headers, and dialog close controls.
│   │   ├── Visual Anatomy: [Hit Target 40x40px (dense min 28x28px)] -> [Centered Optical Icon 18px/20px] + [Tooltip Trigger].
│   │   ├── Interactive States: Default, Hover (--bg-surface-hover), Focus-Visible, Pressed (scale 0.94), Disabled, Active-Toggled (aria-pressed="true").
│   │   ├── Tokens & Specs: --bg-surface-elevated, --text-secondary, --border-subtle, --border-focus-ring.
│   │   └── Accessibility Rules: Mandatory aria-label describing action (never icon name), aria-pressed for toggle variants, SC 2.5.8 >= 24x24px.
│   │
│   ├── Link (/components/link)
│   │   ├── Overview: Inline editorial and navigation anchor with animated optical underline offset.
│   │   ├── Visual Anatomy: [Anchor Text] + [Underline (2px offset)] + [Optional External ArrowUpRight Icon 14px].
│   │   ├── Interactive States: Default, Hover (underline thickness 2px), Focus-Visible (rounded 4px outline), Visited, Disabled (aria-disabled="true").
│   │   ├── Tokens & Specs: --text-action-primary (--sys-primary), --border-focus-ring.
│   │   └── Accessibility Rules: Native <a href>, rel="noopener noreferrer" + sr-only "(opens in new tab)" when target="_blank".
│   │
│   └── SegmentedControl (/components/segmented-control)
│       ├── Overview: Mutually exclusive view/mode switcher (2–5 segments) with spring-animated active pill indicator.
│       ├── Visual Anatomy: [Recessed Track (p-1, rounded-full, --bg-surface-recessed)] -> [Segment Pill (px-3.5, py-1.5, rounded-full)].
│       ├── Interactive States: Default, Hover, Focus-Visible, Selected (active indicator), Disabled Segment.
│       ├── Tokens & Specs: Track: --bg-surface-recessed; Active Pill: --bg-action-primary / --text-on-action; Inactive: --text-secondary.
│       └── Accessibility Rules: role="radiogroup" (or role="tablist"), roving tabIndex (0 on active, -1 on inactive), Left/Right Arrow navigation.
│
├── Bucket-02-Forms-and-Inputs/
│   ├── FormField (/components/form-field)
│   │   ├── Overview: Enterprise text input primitive with floating/stacked label, helper metadata, prefix/suffix slots, and live validation states.
│   │   ├── Visual Anatomy: [Label + Required Badge] -> [Input Wrapper (min-h 44px, px-3.5, rounded-md)] -> [Helper / Error Message Row with Icon].
│   │   ├── Interactive States: Default, Hover (--bg-surface-hover), Focus-Visible (2px --border-focus-ring), Disabled, Read-Only, Error (aria-invalid="true" + --border-feedback-error).
│   │   ├── Tokens & Specs: --comp-field-bg -> --bg-surface-recessed; --comp-field-border -> --border-default; --comp-field-error -> --text-feedback-error.
│   │   └── Accessibility Rules: Zero keyboard trap (Tab moves cleanly in/out), explicit htmlFor/id pairing, aria-invalid="true", aria-describedby="[id]-helper [id]-error", aria-live="polite" on error message.
│   │
│   ├── Checkbox (/components/checkbox)
│   │   ├── Overview: Binary and tri-state (indeterminate) selection control for multi-select lists, bulk table actions, and consent forms.
│   │   ├── Visual Anatomy: [Touch Wrapper (min-h 32px)] -> [Control Box 20x20px, rounded-xs] + [SVG Check/Minus Glyph] + [Label & Description Stack].
│   │   ├── Interactive States: Unchecked, Checked, Indeterminate (aria-checked="mixed"), Hover, Focus-Visible, Disabled, Error.
│   │   ├── Tokens & Specs: Checked Fill: --bg-action-primary; Glyph: --text-on-action; Unchecked Border: --border-default; Error Border: --border-feedback-error.
│   │   └── Accessibility Rules: role="checkbox", Space key toggles state, aria-checked="true|false|mixed", linked description via aria-describedby.
│   │
│   ├── RadioGroup (/components/radio-group)
│   │   ├── Overview: Mutually exclusive option selector rendered as standard radio rows or tonal selection cards.
│   │   ├── Visual Anatomy: [Fieldset + Legend] -> [Radio Option Card (p-4, rounded-lg)] -> [Outer Ring 20px + Inner Dot 10px] + [Label + Subtext].
│   │   ├── Interactive States: Unselected, Selected, Hover, Focus-Visible, Disabled, Error.
│   │   ├── Tokens & Specs: Selected Card: --bg-action-primary-subtle + --border-focus-ring; Unselected: --bg-surface-card + --border-subtle.
│   │   └── Accessibility Rules: role="radiogroup" with aria-labelledby, roving tabIndex, Up/Down/Left/Right Arrow keys select and move focus.
│   │
│   ├── Switch (/components/switch)
│   │   ├── Overview: Immediate binary state toggle for system preferences, live theme polarity, and feature flags.
│   │   ├── Visual Anatomy: [Track 44x24px, rounded-full, p-0.5] -> [Spring Thumb 20x20px, rounded-full] + [Inline Label].
│   │   ├── Interactive States: Off, On, Hover, Focus-Visible, Pressed (thumb widens to 24px), Disabled.
│   │   ├── Tokens & Specs: Track On: --bg-action-primary; Track Off: --bg-surface-active; Thumb: --text-on-action.
│   │   └── Accessibility Rules: role="switch", aria-checked="true|false", Space/Enter toggles immediately without form submit.
│   │
│   ├── Select (/components/select)
│   │   ├── Overview: Accessible listbox selector supporting keyboard typeahead, option groups, and Z-Level-2 Liquid Glass dropdown menu.
│   │   ├── Visual Anatomy: [Trigger Button (min-h 44px, px-3.5)] -> [Z-2 Popover Listbox (p-1.5, rounded-lg)] -> [Option Rows (min-h 36px, Check Icon)].
│   │   ├── Interactive States: Closed, Open, Hover, Focus-Visible, Option-Highlighted, Disabled, Error.
│   │   ├── Tokens & Specs: Trigger: --bg-surface-recessed; Menu: --surface-glass-regular; Highlighted Option: --bg-action-primary-subtle.
│   │   └── Accessibility Rules: Trigger aria-haspopup="listbox" + aria-expanded, menu role="listbox", options role="option" + aria-selected, Arrow Up/Down/Home/End/Escape.
│   │
│   └── PrecisionSlider (/components/slider)
│       ├── Overview: Continuous and stepped numeric range input with tabular-nums readout and WCAG 2.2 SC 2.5.7 stepper buttons.
│       ├── Visual Anatomy: [Header (Label + Tabular Readout + -/+ Stepper Buttons)] -> [Track 6px] + [Filled Range] + [Thumb 20x20px].
│       ├── Interactive States: Default, Hover (thumb scale 1.16), Focus-Visible, Dragging/Active (thumb scale 0.94), Disabled.
│       ├── Tokens & Specs: Track: --bg-surface-active; Fill: --bg-action-primary; Thumb Border: --border-focus-ring.
│       └── Accessibility Rules: role="slider", aria-valuemin/max/now/valuetext, Arrow keys (+/- step), PageUp/PageDown (+/- 10%), plus single-click -/+ buttons for SC 2.5.7 compliance.
│
├── Bucket-03-Navigation-and-Wayfinding/
│   ├── FloatingCommandBar (/components/command-bar)
│   │   ├── Overview: Z-Level-2 Apple HIG Liquid Glass top navigation chrome with Cmd+K global search palette, preset switcher, and theme toggle.
│   │   ├── Visual Anatomy: [Fixed Z-50 Header] -> [Brand Pill] + [Section Nav Pill (.liquid-glass-regular)] + [Seed/Theme/Cmd+K Action Pill].
│   │   ├── Interactive States: Idle, Section-Active, Hover, Focus-Visible, Command-Modal-Open (Cmd+K).
│   │   ├── Tokens & Specs: --glass-regular-bg, --glass-specular-border, --bg-action-primary, --text-on-action.
│   │   └── Accessibility Rules: <header> + <nav aria-label="Primary">, Cmd+K modal uses role="dialog" aria-modal="true" with focus trap and Escape dismissal.
│   │
│   ├── Tabs (/components/tabs)
│   │   ├── Overview: Horizontal content view organizer synchronizing tab triggers with associated content panels.
│   │   ├── Visual Anatomy: [TabList Bar (border-b --border-subtle)] -> [Tab Trigger (px-4, py-2.5, 2px active indicator)] -> [TabPanel Container].
│   │   ├── Interactive States: Inactive, Hover, Focus-Visible, Active/Selected (aria-selected="true"), Disabled.
│   │   ├── Tokens & Specs: Active Text/Indicator: --bg-action-primary; Inactive Text: --text-secondary; Panel: --bg-surface-card.
│   │   └── Accessibility Rules: role="tablist", role="tab" (aria-selected, aria-controls), role="tabpanel" (aria-labelledby), Left/Right Arrow roving focus.
│   │
│   ├── Accordion (/components/accordion)
│   │   ├── Overview: Vertically stacked progressive disclosure panels for token lineage details, FAQs, and inspector groups.
│   │   ├── Visual Anatomy: [Item Container (tonal-card)] -> [Header Heading > Trigger Button + Rotating Caret] -> [Collapsible Region].
│   │   ├── Interactive States: Collapsed, Expanded, Hover, Focus-Visible, Disabled.
│   │   ├── Tokens & Specs: Surface: --bg-surface-card; Expanded Header: --bg-surface-elevated; Border: --border-subtle.
│   │   └── Accessibility Rules: Header button has aria-expanded="true|false" and aria-controls="[panel-id]", panel has role="region" and aria-labelledby.
│   │
│   ├── Breadcrumbs (/components/breadcrumbs)
│   │   ├── Overview: Hierarchical trail indicating current route depth inside the Design System portal (e.g., Workbench / Components / FormField).
│   │   ├── Visual Anatomy: [<nav aria-label="Breadcrumb">] -> [<ol> List] -> [Link Item] + [Slash/Chevron Separator (aria-hidden="true")] + [Current Page].
│   │   ├── Interactive States: Default Link, Hover, Focus-Visible, Current Page (non-interactive).
│   │   ├── Tokens & Specs: Ancestor Links: --text-secondary; Separator: --text-muted; Current Page: --text-primary (font-semibold).
│   │   └── Accessibility Rules: <nav aria-label="Breadcrumb">, current item has aria-current="page", separators hidden from screen readers.
│   │
│   ├── Sidebar (/components/sidebar)
│   │   ├── Overview: Collapsible vertical wayfinding rail for multi-category documentation and mobile drawer navigation.
│   │   ├── Visual Anatomy: [Aside Rail (w-64)] -> [Category Group Header (font-mono uppercase)] -> [Nav Link Items (min-h 36px, active pill)].
│   │   ├── Interactive States: Default, Hover, Focus-Visible, Active Route (aria-current="page"), Collapsed/Mobile Drawer Open.
│   │   ├── Tokens & Specs: Desktop Rail: --bg-surface-card; Mobile Drawer: --surface-glass-regular; Active Item: --bg-action-primary-subtle.
│   │   └── Accessibility Rules: <aside> + <nav aria-label="Documentation Sidebar">, Escape closes mobile drawer and restores focus to trigger button.
│   │
│   └── Pagination (/components/pagination)
│       ├── Overview: Page-indexed and cursor navigation bar for large data tables and audit logs.
│       ├── Visual Anatomy: [Summary Text (tabular-nums)] + [Page Controls: Prev Button + Page Number Pills (min 36x36px) + Ellipsis + Next Button].
│       ├── Interactive States: Default Page, Hover, Focus-Visible, Active Page (aria-current="page"), Disabled Prev/Next (at boundary).
│       ├── Tokens & Specs: Active Pill: --bg-action-primary / --text-on-action; Default Pill: --bg-surface-elevated / --text-secondary.
│       └── Accessibility Rules: <nav aria-label="Pagination">, buttons have explicit aria-label="Go to page X", boundary buttons use disabled + aria-disabled.
│
├── Bucket-04-Feedback-and-Status/
│   ├── Alert (/components/alert)
│   │   ├── Overview: Contextual inline callout for semantic feedback (Info, Success, Warning, Error) inside forms and documentation.
│   │   ├── Visual Anatomy: [Container (p-4, rounded-lg, 1px semantic border)] -> [Status Icon 20px] + [Title + Description Stack] + [Optional Action/Dismiss].
│   │   ├── Interactive States: Static Info/Success/Warning/Error, Action Button Hover/Focus-Visible, Dismissed.
│   │   ├── Tokens & Specs: Error: --bg-feedback-error-subtle, --border-feedback-error, --text-feedback-error (and corresponding Success/Warning tokens).
│   │   └── Accessibility Rules: role="alert" (for urgent errors) or role="status" (for polite updates), icon is aria-hidden="true" paired with visible status label.
│   │
│   ├── Banner (/components/banner)
│   │   ├── Overview: Full-width system status strip announcing version deprecations, stress-test telemetry overrides, or CI build states.
│   │   ├── Visual Anatomy: [Full-Width Strip (px-6, py-2.5)] -> [Pulse Indicator + Monospace Tag] + [Message Text] + [CTA Link + Dismiss Button].
│   │   ├── Interactive States: Default, Stress-Overload Mode, Action Hover/Focus, Dismissed.
│   │   ├── Tokens & Specs: --bg-action-primary-subtle, --border-default, --text-primary.
│   │   └── Accessibility Rules: role="region" aria-label="System Announcement", dismiss button has aria-label="Dismiss announcement".
│   │
│   ├── ProgressBar-and-FluidGauge (/components/progress)
│   │   ├── Overview: Determinate/indeterminate linear progress bars and circular FluidGauge telemetry meters.
│   │   ├── Visual Anatomy: [Header (Label + Tabular Percentage)] -> [Track (h-2, rounded-full, --bg-surface-active)] -> [Animated Fill Bar].
│   │   ├── Interactive States: Determinate (0–100%), Indeterminate Shimmer, Warning Threshold (>80%), Critical Overload (>90%).
│   │   ├── Tokens & Specs: Track: --bg-surface-active; Normal Fill: --bg-action-primary; Overload Fill: --text-feedback-warning / --text-feedback-error.
│   │   └── Accessibility Rules: role="progressbar", aria-valuemin={0}, aria-valuemax={100}, aria-valuenow={value}, aria-labelledby="[label-id]".
│   │
│   ├── Spinner-and-Skeleton (/components/spinner)
│   │   ├── Overview: Non-blocking loading indicators (SVG orbital spinner and tonal shimmer placeholder blocks).
│   │   ├── Visual Anatomy: [SVG Ring (16px/24px/32px, stroke-dasharray)] or [Skeleton Block (rounded-md, pulse animation)].
│   │   ├── Interactive States: Active-Spinning, Reduced-Motion Static Pulse, Completed-Unmount.
│   │   ├── Tokens & Specs: Spinner Stroke: --bg-action-primary; Skeleton Base: --bg-surface-elevated -> --bg-surface-hover.
│   │   └── Accessibility Rules: role="status" with <span className="sr-only">Loading...</span>; parent container sets aria-busy="true".
│   │
│   ├── StatusBadge (/components/badge)
│   │   ├── Overview: Compact semantic pill tag for WCAG conformance grades (AAA/AA), token tiers, and cluster health status.
│   │   ├── Visual Anatomy: [Pill (px-2.5, py-0.5, rounded-full, border)] -> [Optional 6px Status Dot] + [Monospace Label (11px uppercase)].
│   │   ├── Interactive States: Static Semantic (Neutral, Primary, Success, Warning, Error), Interactive Filter Chip (Hover, Focus-Visible, Selected).
│   │   ├── Tokens & Specs: --bg-feedback-success-subtle, --text-feedback-success, --border-subtle.
│   │   └── Accessibility Rules: Never rely on dot color alone—text label explicitly states status (e.g., "WCAG AAA 8.4:1", "Optimal", "Error").
│   │
│   └── Tooltip (/components/tooltip)
│       ├── Overview: Z-Level-2 transient micro-overlay displaying keyboard shortcuts (`Cmd+K`) or resolved OKLCH coordinates on hover/focus.
│       ├── Visual Anatomy: [Trigger Element] -> [Floating Z-50 Pill (px-2.5, py-1, rounded-sm, .liquid-glass-regular)] -> [Label + Kbd Badge].
│       ├── Interactive States: Hidden, Delayed-Open (150ms), Instant-Warm-Open, Dismissed-on-Escape.
│       ├── Tokens & Specs: --glass-regular-bg, --glass-specular-border, --text-primary.
│       └── Accessibility Rules: role="tooltip" linked via aria-describedby on trigger; opens on both pointer hover and keyboard focus-visible; Escape dismisses immediately (WCAG 1.4.13 Hoverable, Dismissible, Persistent).
│
├── Bucket-05-Overlays-and-Containment/
│   ├── ModalDialog (/components/modal-dialog)
│   │   ├── Overview: High-priority accessible modal overlay with focus trapping (`FocusScope`), backdrop scrim, and cross-platform asset export controls.
│   │   ├── Visual Anatomy: [Backdrop Scrim (z-50, bg-black/65, backdrop-blur-sm)] -> [Dialog Surface (max-w-xl, p-6, rounded-xl, --bg-surface-elevated)] -> [Header + Close IconButton] + [Body Slot] + [Footer Action Bar].
│   │   ├── Interactive States: Closed, Opening (spring scale 0.96 -> 1.0), Open-Trapped, Action-Focused, Validation-Error, Closing.
│   │   ├── Tokens & Specs: Surface: --comp-modal-bg -> --bg-surface-elevated; Border: --border-default; Focus Ring: --border-focus-ring.
│   │   └── Accessibility Rules: role="dialog", aria-modal="true", aria-labelledby="[title-id]", aria-describedby="[desc-id]". Mandatory keyboard focus trap (Tab/Shift+Tab cycle strictly inside modal), Escape closes modal, focus returns to trigger element on close.
│   │
│   ├── DrawerSheet (/components/drawer)
│   │   ├── Overview: Edge-anchored slide-over panel for mobile navigation, token JSON inspection, and multi-attribute filtering.
│   │   ├── Visual Anatomy: [Backdrop Scrim] -> [Right/Left Sheet (w-full max-w-md, h-dvh, p-6, .liquid-glass-regular)] -> [Sticky Header + Scrollable Body + Sticky Footer].
│   │   ├── Interactive States: Closed, Sliding-In, Open-Trapped, Closing.
│   │   ├── Tokens & Specs: --glass-regular-bg, --glass-specular-border, --text-primary.
│   │   └── Accessibility Rules: role="dialog", aria-modal="true", focus trap active while open, Escape key and backdrop click close drawer.
│   │
│   ├── Popover (/components/popover)
│   │   ├── Overview: Non-modal Z-Level-2 floating inspector anchored to a trigger button (used for color pickers and seed preset tuners).
│   │   ├── Visual Anatomy: [Trigger Button] -> [Floating Container (w-72, p-4, rounded-lg, .liquid-glass-regular)].
│   │   ├── Interactive States: Closed, Open, Focus-Within, Dismissed.
│   │   ├── Tokens & Specs: --glass-regular-bg, --glass-specular-border, --glass-shadow.
│   │   └── Accessibility Rules: Trigger sets aria-expanded="true|false" and aria-controls; Escape closes popover and returns focus to trigger.
│   │
│   └── TonalAndGlassCard (/components/card)
│       ├── Overview: Foundational containment primitives enforcing Z-Axis discipline: TonalCard (Z-1 content, no blur) vs. GlassCard (Z-2 floating chrome).
│       ├── Visual Anatomy: [Outer Container (rounded-lg, 1px border, 1px top specular inset)] -> [Header Slot] + [Content Slot (p-6)] + [Footer Slot].
│       ├── Interactive States: Static Container, Interactable Card (role="button", tabIndex=0, hover:scale-[1.01], focus-visible:ring-2, active:scale-[0.99]).
│       ├── Tokens & Specs: Z-1 Tonal: --bg-surface-card, --border-subtle, --sys-specular-top; Z-2 Glass: --glass-regular-bg, --glass-specular-border.
│       └── Accessibility Rules: Non-interactive cards use semantic <article> or <section>; interactable cards support Enter/Space activation and visible 2px focus ring.
│
└── Bucket-06-Data-Presentation/
    ├── DataTable (/components/data-table)
    │   ├── Overview: Enterprise interactive data grid with sortable columns, live search filtering, row selection checkboxes, status badges, and tabular numerals.
    │   ├── Visual Anatomy: [Toolbar (Search Input + Filter Pills + Export CTA)] -> [Table Wrapper (rounded-lg, border --border-subtle)] -> [Sticky <thead --bg-surface-elevated>] + [<tbody> Rows (min-h 48px, tabular-nums)] + [Pagination Footer].
    │   ├── Interactive States: Default Row, Row Hover (--bg-surface-hover), Row Selected (aria-selected="true"), Column Sort (ascending/descending/none), Empty Filter State, Error State.
    │   ├── Tokens & Specs: Container: --comp-table-bg -> --bg-surface-card; Header: --bg-surface-elevated; Row Hover: --bg-surface-hover; Border: --border-subtle.
    │   └── Accessibility Rules: Semantic <table>, <th scope="col" aria-sort="ascending|descending|none">, sort buttons inside <th> with 40px hit target, zero keyboard trap (standard Tab navigation across interactive cells).
    │
    ├── DescriptionList (/components/description-list)
    │   ├── Overview: Structured key-value metadata specification list for token resolution chains and WCAG audit parameters.
    │   ├── Visual Anatomy: [<dl> Grid] -> [Row (py-3, border-b --border-subtle)] -> [<dt> Term (--text-secondary)] + [<dd> Value (font-mono tabular-nums --text-primary)].
    │   ├── Interactive States: Default Row, Hover Row, Copyable Value Action (Hover/Focus-Visible/Copied).
    │   ├── Tokens & Specs: --text-primary, --text-secondary, --border-subtle, --bg-surface-card.
    │   └── Accessibility Rules: Semantic <dl>, <dt>, and <dd> pairing; copy buttons announce "Copied [token] to clipboard" via aria-live="polite".
    │
    └── KeyValueMetricCard (/components/metric-card)
        ├── Overview: Bento telemetry tile pairing a primary tabular KPI counter with a semantic trend badge and SVG SparklineChart.
        ├── Visual Anatomy: [TonalCard (p-6)] -> [Header (Label + Icon + Trend Pill)] -> [KPI Value (text-3xl font-mono tabular-nums)] -> [Sparkline SVG].
        ├── Interactive States: Default, Hover (sparkline opacity 100%), Focus-Visible, Stress-Overload Alert State.
        ├── Tokens & Specs: --bg-surface-card, --text-primary, --text-feedback-success, --text-feedback-warning.
        └── Accessibility Rules: Sparkline SVG carries role="img" and aria-label summarizing the data trend for screen readers.
```

---

## 4. DESIGN PATTERNS & FULL-PAGE LAYOUT COMPOSITIONS

```text
04-Design-Patterns-and-Layouts/
├── 4.1-Layout-Archetypes/
│   ├── Archetype-01-Perceptual-Workbench-Shell (src/app/page.tsx)
│   │   ├── Z-Level-2 FloatingCommandBar (top sticky chrome + Cmd+K palette + Light/Dark/Seed switchers)
│   │   ├── Architectural Hero Banner (Editorial Serif + Functional Sans + Live Telemetry Ribbon + Cross-Platform Export Trigger)
│   │   └── 7-Section Modular Workbench Grid (01 Tokens, 02 Surfaces & Glass, 03 Typography, 04 Components, 05 Motion, 06 Icons, 07 Multi-Platform Compiler)
│   │
│   ├── Archetype-02-Interactive-Component-Portal (src/app/components/[componentName]/page.tsx)
│   │   ├── Breadcrumb & Component switcher rail (FormField, ModalDialog, DataTable, Button)
│   │   ├── Split-Pane Live Playground:
│   │   │   ├── Left Pane (7 cols): Live rendered component stage + Interactive State Matrix Toolbar (Default, Hover, Focus-Visible, Disabled, Error) + Polarity toggle
│   │   │   └── Right Pane (5 cols): Tabbed Inspector (Tier-2 Semantic Token Lineage | Accessibility & ARIA Spec | Copyable React/TS Code)
│   │   └── Visual Anatomy & Concentric Geometry Specification Card
│   │
│   └── Archetype-03-Search-and-Filter-Telemetry-Matrix
│       ├── Instant debounced search bar + SegmentedControl category filter + active filter count badge
│       └── Responsive grid/table view with deterministic Empty State fallback and single-click "Reset Filters" recovery
│
└── 4.2-Systemic-Validation-and-Resilience-UX/
    ├── Pattern-01-Inline-and-Summary-Form-Validation
    │   ├── Field-level validation triggers on blur or submit (never prematurely on first keystroke).
    │   ├── Invalid fields bind aria-invalid="true" and aria-describedby to an inline error node with a WarningCircle icon and --text-feedback-error.
    │   └── Form-level error summary banner uses role="alert" so screen readers announce the exact error count and allow jumping to the first invalid input.
    │
    ├── Pattern-02-Cross-Platform-Export-Handoff
    │   ├── Triggered from the Hero "Export System Assets" CTA or Section 07 Compiler.
    │   └── Provides instant one-click copy and file download for Tailwind v4 CSS, W3C DTCG Figma JSON, Google Stitch DESIGN.md, and Cursor/Antigravity agent rules.
    │
    └── Pattern-03-Zero-Data-and-Fallback-States
        ├── Empty search/filter states display clear diagnostic iconography, the exact query that returned 0 results, and a primary "Reset Filter" button.
        └── Hydration-safe client rendering prevents layout shift (CLS = 0) across dark/light polarity switches.
```

---

## 5. CROSS-PLATFORM & AI-AGENT SYNC ARCHITECTURE

This section defines how the single `/tokens/*.json` directory powers **Figma**, **Google Stitch**, **Google Antigravity**, **Cursor**, and **Next.js 16**:

```text
05-Cross-Platform-Sync-Architecture/
├── Source-of-Truth: /tokens/
│   ├── tokens/primitives.json         (Tier 1: OKLCH + Hex scales, 8px spacing, typography, radii, motion)
│   ├── tokens/semantic.light.json     (Tier 2: Alabaster Light intent mappings)
│   ├── tokens/semantic.dark.json      (Tier 2: Obsidian Dark intent mappings)
│   └── tokens/components.json         (Tier 3: Component-scoped tokens & WCAG 2.2 geometry)
│
├── Compiler-Engine: scripts/build-tokens.mjs (Zero-Dependency Node.js ESM Transpiler)
│   │
│   ├── Output-01-NextJS-and-Tailwind-v4:
│   │   ├── src/styles/tokens.generated.css
│   │   │   ├── Emits :root (Light), [data-theme="dark"], .dark (Dark), and @theme inline utility mappings.
│   │   │   └── Imported into src/app/globals.css alongside Z-Level-1 tonal and Z-Level-2 Liquid Glass utilities.
│   │   └── src/lib/tokens.generated.ts
│   │       └── Strongly-typed TypeScript constants (TOKEN_DICTIONARY, SEMANTIC_TOKEN_LIST, COMPONENT_TOKEN_LIST) for the live UI inspector.
│   │
│   ├── Output-02-Figma-Variables-and-Tokens-Studio:
│   │   └── public/exports/figma-variables.tokens.json
│   │       ├── W3C DTCG compliant JSON ($schema: "https://tr.designtokens.org/format/").
│   │       └── Maps directly to 3 Figma Variable Collections: "01 Primitives", "02 Semantic (Light/Dark Modes)", and "03 Components".
│   │
│   ├── Output-03-Google-Stitch-Semantic-Spec:
│   │   └── DESIGN.md
│   │       ├── Structured for @google/design.md and Stitch MCP (upload_design_md / create_design_system_from_design_md).
│   │       └── Synchronizes Visual Theme, YAML Color Roles, Typography Rules, 8px Spacing Grid, Concentric Radii, and Component Token Mappings.
│   │
│   └── Output-04-Google-Antigravity-and-Cursor-Guardrails:
│       ├── AGENTS.md (Read automatically by Google Antigravity & Claude Code)
│       └── .cursor/rules/design-system.mdc (Read automatically by Cursor IDE)
│           ├── Enforces Next.js 16 async params + Tailwind v4 @theme conventions.
│           ├── Lists mandatory Tier-2 semantic tokens (--bg-action-primary, --sys-primary, etc.) and forbids raw hex values.
│           └── Enforces Z-Axis Spatial Discipline (Z-1 Tonal Cards vs. Z-2 Liquid Glass) and WCAG 2.2 AA contrast/target rules.
```

---

## 6. REPOSITORIES, CI/CD & NEXT.JS 16 WORKSPACE TOPOLOGY

```text
Design-System/ (Workspace Root)
├── .cursor/
│   └── rules/
│       └── design-system.mdc                  # Auto-generated Cursor AI rules for token & component compliance
├── .github/
│   └── workflows/
│       └── design-system-build.yml            # CI/CD pipeline: build:tokens -> verify:wcag -> tsc -> lint -> next build
├── docs/
│   ├── ai-architect-prompt.md                 # Reusable Master Prompt for AI-Native Design System Engineering
│   ├── information-architecture.md            # This complete 6-tier IA & System Topology specification
│   └── verification-report.md                 # Automated WCAG 2.2 AA contrast & build verification report
├── public/
│   └── exports/
│       └── figma-variables.tokens.json        # Compiled W3C DTCG token bundle for Figma Variables import
├── scripts/
│   ├── build-tokens.mjs                       # Multi-platform token compiler (JSON -> CSS, TS, Figma, DESIGN.md, Cursor)
│   └── verify-design-system.mjs               # Automated WCAG 2.2 AA contrast & token integrity verifier
├── tokens/
│   ├── primitives.json                        # Tier 1: Global Primitives (OKLCH/Hex colors, 8px spacing, type, radii)
│   ├── semantic.light.json                    # Tier 2: Semantic tokens mapped for Alabaster Light mode
│   ├── semantic.dark.json                     # Tier 2: Semantic tokens mapped for Obsidian Dark mode
│   └── components.json                        # Tier 3: Component-specific overrides (form-field, modal-dialog, data-table, button)
├── src/
│   ├── app/
│   │   ├── globals.css                        # Tailwind v4 @theme + imported tokens.generated.css + Z-Axis utilities
│   │   ├── layout.tsx                         # Root layout loading Plus Jakarta Sans, Instrument Serif, JetBrains Mono
│   │   ├── page.tsx                           # Main Perceptual & Spatial Design System Workbench (Sections 01–07)
│   │   └── components/
│   │       └── [componentName]/
│   │           └── page.tsx                   # Dynamic Interactive Component Portal (FormField, ModalDialog, DataTable, Button)
│   ├── components/
│   │   ├── workbench/
│   │   │   ├── floating-command-bar.tsx       # Z-Level-2 Liquid Glass navigation, Cmd+K palette, theme/seed controls
│   │   │   ├── token-engine-section.tsx       # 01 // Interactive 3-Tier OKLCH Token Engine & Seed Modulator
│   │   │   ├── surfaces-glass-section.tsx     # 02 // Z-Axis Tonal Surfaces vs. Apple HIG Liquid Glass Lab
│   │   │   ├── typography-section.tsx         # 03 // M3 Emphasized Typography & Tabular Numerals Lab
│   │   │   ├── components-section.tsx         # 04 // Interactive Component Primitive Matrix + Deep-Link Portal Cards
│   │   │   ├── motion-geometry-section.tsx    # 05 // Spring Physics & Concentric Radii Architect
│   │   │   └── export-compiler-section.tsx    # 07 // Live Multi-Platform Exporter (Tailwind, Figma, Stitch, Cursor)
│   │   ├── dashboard/
│   │   │   └── icon-playground.tsx            # 06 // Optical Iconography Studio (Phosphor weight & refraction lab)
│   │   └── ui/
│   │       └── glass-card.tsx                 # Reusable containment primitive
│   ├── lib/
│   │   ├── tokens.ts                          # Dynamic runtime OKLCH seed math & live code generators
│   │   ├── tokens.generated.ts                # Compiled static 3-tier token lineage & WCAG contrast dictionary
│   │   ├── component-registry.ts              # Complete metadata, state matrices, code snippets & token specs for [componentName]
│   │   └── utils.ts                           # Classname merge utility (clsx + tailwind-merge)
│   └── styles/
│       └── tokens.generated.css               # Auto-compiled CSS custom properties (:root, .dark, [data-theme="dark"])
├── AGENTS.md                                  # Next.js 16 + Antigravity Design System rules for AI coding agents
├── CLAUDE.md                                  # Pointer to AGENTS.md
├── DESIGN.md                                  # Auto-compiled Google Stitch semantic design system specification
├── next.config.ts                             # Next.js 16 configuration
├── package.json                               # Scripts: build:tokens, verify:wcag, prebuild, dev, build, lint
└── tsconfig.json                              # Strict TypeScript configuration (@/* -> ./src/*)
```
