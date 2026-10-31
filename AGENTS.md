<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Antigravity Design System (`v2.4 SPEC`) — AI Agent Architecture Rules

When generating or modifying UI inside this workspace (Google Antigravity, Claude Code, Cursor, or Stitch handoff):

1. **Single Source of Truth (`/tokens/*.json` -> `scripts/build-tokens.mjs`)**:
   - Tier 1 Primitives: `tokens/primitives.json`
   - Tier 2 Semantic Intent: `tokens/semantic.light.json` & `tokens/semantic.dark.json`
   - Tier 3 Component Overrides: `tokens/components.json`
   - Run `npm run build:tokens` after editing any token file to regenerate `src/styles/tokens.generated.css`, `src/lib/tokens.generated.ts`, `public/exports/figma-variables.tokens.json`, `DESIGN.md`, and `.cursor/rules/design-system.mdc`.

2. **Z-Axis Spatial Hierarchy**:
   - **Z-Level 0 (Canvas)**: `var(--bg-canvas)` / `var(--sys-surface-canvas)`.
   - **Z-Level 1 (Content Layer)**: Use `.tonal-card` or `.tonal-card-elevated` (`var(--bg-surface-card)` / `var(--sys-surface-low)`). **Never apply `backdrop-filter: blur()` to Z-Level 1 content containers.**
   - **Z-Level 2 (Floating Chrome)**: Use `.liquid-glass-regular` or `.liquid-glass-clear` strictly for sticky navbars, command bars, modals, and transient popovers.

3. **WCAG 2.2 AA Compliance**:
   - Text contrast must be `>= 4.5:1` (`>= 3.0:1` for UI borders and focus rings).
   - Interactive hit targets must be `>= 24x24px` (`40px` touch standard per SC 2.5.8).
   - Focus-visible rings must use `2px solid var(--border-focus-ring)` with `2px` offset (SC 2.4.11).
   - Keyboard focus trapping is permitted ONLY inside modal dialogues (`role="dialog" aria-modal="true"`).

4. **British English (`en-GB`) Copy Standard**:
   - All user-facing UI headings, descriptions, labels, and documentation must use British English spelling (e.g., *colour*, *customise*, *customiser*, *synchronise*, *optimise*, *analyse*, *behaviour*, *centre*, *dialogue*, *grey*).
   - Keep CSS/HTML/JS/W3C DTCG technical syntax identifiers unchanged (`color`, `items-center`, `role="dialog"`).
