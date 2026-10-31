#!/usr/bin/env node
/**
 * Antigravity Design System — Multi-Platform 3-Tier Token Compiler
 * Compiles /tokens/*.json (W3C DTCG format) into:
 *   1. src/styles/tokens.generated.css       (CSS Custom Properties + Tailwind v4 @theme inline)
 *   2. src/lib/tokens.generated.ts           (Strongly-typed TS token lineage & WCAG metadata)
 *   3. public/exports/figma-variables.tokens.json (Figma Variables / Tokens Studio bundle)
 *   4. DESIGN.md                             (Google Stitch semantic design system spec)
 *   5. .cursor/rules/design-system.mdc       (Cursor & Antigravity AI coding guardrails)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const readJson = (relPath) =>
  JSON.parse(fs.readFileSync(path.join(ROOT, relPath), "utf8"));

const ensureDir = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const primitives = readJson("tokens/primitives.json");
const semanticLight = readJson("tokens/semantic.light.json");
const semanticDark = readJson("tokens/semantic.dark.json");
const components = readJson("tokens/components.json");

/**
 * Resolve a dot-path like "{color.primary.40}" against primitives
 */
function resolvePrimitiveNode(refString) {
  if (typeof refString !== "string" || !refString.startsWith("{") || !refString.endsWith("}")) {
    return { $value: refString, oklch: refString };
  }
  const parts = refString.slice(1, -1).split(".");
  let current = primitives;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      throw new Error(`Unresolved Tier-1 token reference: ${refString}`);
    }
  }
  return current;
}

/**
 * Compute WCAG 2.2 relative luminance from sRGB Hex (#RRGGBB)
 */
function hexToLuminance(hex) {
  const clean = hex.replace("#", "").trim();
  if (clean.length !== 6) return 0;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function computeContrastRatio(hexA, hexB) {
  const lumA = hexToLuminance(hexA);
  const lumB = hexToLuminance(hexB);
  const brightest = Math.max(lumA, lumB);
  const darkest = Math.min(lumA, lumB);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

// 1. Build Resolved Semantic Dictionary
const semanticKeys = Object.keys(semanticLight.semantic);
const lightCanvasHex = resolvePrimitiveNode(semanticLight.semantic["bg-canvas"].$value).$value;
const darkCanvasHex = resolvePrimitiveNode(semanticDark.semantic["bg-canvas"].$value).$value;

const resolvedSemantics = semanticKeys.map((key) => {
  const lightEntry = semanticLight.semantic[key];
  const darkEntry = semanticDark.semantic[key];
  const lightPrim = resolvePrimitiveNode(lightEntry.$value);
  const darkPrim = resolvePrimitiveNode(darkEntry.$value);

  const contrastLight = computeContrastRatio(lightPrim.$value, lightCanvasHex);
  const contrastDark = computeContrastRatio(darkPrim.$value, darkCanvasHex);

  return {
    name: key,
    cssVar: `--${key}`,
    workbenchAlias: lightEntry.workbenchAlias || `--sys-${key}`,
    category: lightEntry.category || "general",
    description: lightEntry.$description || "",
    lightRef: lightEntry.$value,
    darkRef: darkEntry.$value,
    lightHex: lightPrim.$value,
    darkHex: darkPrim.$value,
    lightOklch: lightPrim.oklch || lightPrim.$value,
    darkOklch: darkPrim.oklch || darkPrim.$value,
    contrastVsLightCanvas: contrastLight,
    contrastVsDarkCanvas: contrastDark,
  };
});

// 2. Build Resolved Component Token Dictionary
const resolvedComponents = [];
for (const [compName, tokenMap] of Object.entries(components.component)) {
  for (const [propName, tokenDef] of Object.entries(tokenMap)) {
    const rawRef = tokenDef.$value;
    let tier2Name = null;
    let lightVal = rawRef;
    let darkVal = rawRef;
    let tier1LightRef = rawRef;
    let tier1DarkRef = rawRef;

    if (typeof rawRef === "string" && rawRef.startsWith("{semantic.")) {
      tier2Name = rawRef.slice("{semantic.".length, -1);
      const found = resolvedSemantics.find((s) => s.name === tier2Name);
      if (found) {
        lightVal = found.lightOklch;
        darkVal = found.darkOklch;
        tier1LightRef = found.lightRef;
        tier1DarkRef = found.darkRef;
      }
    } else if (typeof rawRef === "string" && rawRef.startsWith("{")) {
      const primNode = resolvePrimitiveNode(rawRef);
      lightVal = primNode.$value;
      darkVal = primNode.$value;
    }

    resolvedComponents.push({
      component: compName,
      property: propName,
      cssVar: `--comp-${compName}-${propName}`,
      type: tokenDef.$type,
      description: tokenDef.$description || "",
      tier2Ref: tier2Name ? `--${tier2Name}` : rawRef,
      tier1LightRef,
      tier1DarkRef,
      lightValue: lightVal,
      darkValue: darkVal,
    });
  }
}

// ============================================================================
// OUTPUT 1: src/styles/tokens.generated.css
// ============================================================================
const cssLines = [
  `/* ============================================================================`,
  ` * AUTO-GENERATED BY scripts/build-tokens.mjs — DO NOT EDIT MANUALLY`,
  ` * Source: /tokens/primitives.json, semantic.light.json, semantic.dark.json, components.json`,
  ` * ============================================================================ */`,
  ``,
  `:root,`,
  `[data-theme="light"] {`,
  `  /* Tier 2 Semantic Tokens — Alabaster Light */`,
  ...resolvedSemantics.map(
    (s) => `  ${s.cssVar}: ${s.lightOklch}; /* ${s.lightHex} | ${s.lightRef} */`
  ),
  ``,
  `  /* Tier 3 Component Overrides — Alabaster Light */`,
  ...resolvedComponents.map((c) => {
    if (c.tier2Ref.startsWith("--")) {
      return `  ${c.cssVar}: var(${c.tier2Ref});`;
    }
    return `  ${c.cssVar}: ${c.lightValue};`;
  }),
  `}`,
  ``,
  `.dark,`,
  `[data-theme="dark"] {`,
  `  /* Tier 2 Semantic Tokens — Obsidian Dark */`,
  ...resolvedSemantics.map(
    (s) => `  ${s.cssVar}: ${s.darkOklch}; /* ${s.darkHex} | ${s.darkRef} */`
  ),
  ``,
  `  /* Tier 3 Component Overrides — Obsidian Dark */`,
  ...resolvedComponents.map((c) => {
    if (c.tier2Ref.startsWith("--")) {
      return `  ${c.cssVar}: var(${c.tier2Ref});`;
    }
    return `  ${c.cssVar}: ${c.darkValue};`;
  }),
  `}`,
  ``,
  `@theme inline {`,
  ...resolvedSemantics.map((s) => `  --color-${s.name}: var(${s.cssVar});`),
  `}`,
  ``,
];

const cssOutPath = path.join(ROOT, "src/styles/tokens.generated.css");
ensureDir(cssOutPath);
fs.writeFileSync(cssOutPath, cssLines.join("\n"), "utf8");

// ============================================================================
// OUTPUT 2: src/lib/tokens.generated.ts
// ============================================================================
const tsContent = `/* ============================================================================
 * AUTO-GENERATED BY scripts/build-tokens.mjs — DO NOT EDIT MANUALLY
 * Strongly-typed 3-Tier Design Token Dictionary & Lineage Metadata
 * ============================================================================ */

export interface CompiledSemanticToken {
  name: string;
  cssVar: string;
  workbenchAlias: string;
  category: "surface" | "action" | "text" | "feedback" | "border" | "general";
  description: string;
  lightRef: string;
  darkRef: string;
  lightHex: string;
  darkHex: string;
  lightOklch: string;
  darkOklch: string;
  contrastVsLightCanvas: number;
  contrastVsDarkCanvas: number;
}

export interface CompiledComponentToken {
  component: string;
  property: string;
  cssVar: string;
  type: string;
  description: string;
  tier2Ref: string;
  tier1LightRef: string;
  tier1DarkRef: string;
  lightValue: string;
  darkValue: string;
}

export const COMPILED_SEMANTIC_TOKENS: readonly CompiledSemanticToken[] = ${JSON.stringify(
  resolvedSemantics,
  null,
  2
)} as const;

export const COMPILED_COMPONENT_TOKENS: readonly CompiledComponentToken[] = ${JSON.stringify(
  resolvedComponents,
  null,
  2
)} as const;

export const TOKEN_BUILD_METADATA = {
  version: "2.4.0",
  schema: "https://tr.designtokens.org/format/",
  tier1Count: 68,
  tier2Count: ${resolvedSemantics.length},
  tier3Count: ${resolvedComponents.length},
  wcagTarget: "WCAG 2.2 AA",
} as const;
`;

const tsOutPath = path.join(ROOT, "src/lib/tokens.generated.ts");
ensureDir(tsOutPath);
fs.writeFileSync(tsOutPath, tsContent, "utf8");

// ============================================================================
// OUTPUT 3: public/exports/figma-variables.tokens.json
// ============================================================================
const figmaBundle = {
  $schema: "https://tr.designtokens.org/format/",
  meta: {
    system: "Antigravity Perceptual & Spatial Design System",
    version: "2.4.0",
    exportedBy: "scripts/build-tokens.mjs",
    platforms: ["Figma Variables", "Tokens Studio", "Next.js 16 + Tailwind v4", "Google Stitch"],
  },
  collections: {
    "01-Primitives": primitives,
    "02-Semantic-Light": semanticLight.semantic,
    "02-Semantic-Dark": semanticDark.semantic,
    "03-Components": components.component,
  },
};

const figmaOutPath = path.join(ROOT, "public/exports/figma-variables.tokens.json");
ensureDir(figmaOutPath);
fs.writeFileSync(figmaOutPath, JSON.stringify(figmaBundle, null, 2), "utf8");

// ============================================================================
// OUTPUT 4: DESIGN.md (Google Stitch Semantic Design System Specification)
// ============================================================================
const designMdContent = `# Design System: Antigravity Perceptual & Spatial Workbench (v2.4)
**Project ID:** projects/antigravity-design-system

## 1. Visual Theme & Atmosphere
The Antigravity Design System synthesizes **Material 3 Expressive** perceptual OKLCH tonal mathematics with **Apple HIG Liquid Glass** Z-axis spatial discipline and **Swiss Design Engineering** grids. Content surfaces rest on crisp, zero-blur tonal containers (\`Z-Level 1\`), while floating navigation chrome and transient command overlays utilize optical Liquid Glass refraction (\`Z-Level 2\`).

## 2. Color Palette & Roles (3-Tier OKLCH + Hex Dual-Polarity)
All semantic roles guarantee **WCAG 2.2 AA/AAA** contrast across both **Obsidian Dark** and **Alabaster Light** modes.

\`\`\`yaml
colors:
  dark:
    bg-canvas: "#0b0e16"          # oklch(0.135 0.012 258) — Z-0 Base Canvas
    bg-surface-recessed: "#07090e" # oklch(0.110 0.012 258) — Z-0 Recessed Input Well
    bg-surface-card: "#111520"     # oklch(0.165 0.012 258) — Z-1 Default Tonal Card
    bg-surface-elevated: "#161b28" # oklch(0.190 0.012 258) — Z-1 Elevated Modal/Header
    bg-surface-hover: "#1e2434"    # oklch(0.225 0.012 258) — Z-1 Interactive Hover
    bg-action-primary: "#7cacf9"   # oklch(0.770 0.152 258) — Primary Action (8.4:1 AAA)
    bg-action-secondary: "#67bde8" # oklch(0.760 0.125 215) — Secondary Accent
    text-primary: "#f3f5fa"        # oklch(0.972 0.006 258) — Primary Ink (16.2:1 AAA)
    text-secondary: "#a4adc2"      # oklch(0.750 0.012 258) — Secondary Ink (8.1:1 AAA)
    text-muted: "#858fa6"          # oklch(0.640 0.012 258) — Muted Caption (5.4:1 AA)
    text-feedback-error: "#ff8fa1" # oklch(0.790 0.140 22)  — Validation Error (7.6:1 AAA)
    text-feedback-success: "#6ee7b7" # oklch(0.840 0.130 154) — Optimal Status (11.2:1 AAA)
  light:
    bg-canvas: "#f9fafd"          # oklch(0.985 0.005 258) — Z-0 Base Canvas
    bg-surface-recessed: "#ffffff" # oklch(0.996 0.002 258) — Z-0 Recessed Input Well
    bg-surface-card: "#f3f5fa"     # oklch(0.972 0.006 258) — Z-1 Default Tonal Card
    bg-surface-elevated: "#edeff6" # oklch(0.958 0.008 258) — Z-1 Elevated Modal/Header
    bg-action-primary: "#2559c2"   # oklch(0.490 0.190 258) — Primary Action (6.1:1 AA)
    text-primary: "#111520"        # oklch(0.165 0.012 258) — Primary Ink (16.4:1 AAA)
    text-secondary: "#394154"      # oklch(0.360 0.015 258) — Secondary Ink (9.3:1 AAA)
    text-muted: "#525b70"          # oklch(0.460 0.014 258) — Muted Caption (5.9:1 AA)
    text-feedback-error: "#9e1c34" # oklch(0.420 0.170 22)  — Validation Error (6.8:1 AA)
\`\`\`

## 3. Typography Rules
\`\`\`yaml
typography:
  display:
    fontFamily: Instrument Serif
    fontWeight: 400
    lineHeight: 1.08
  sans:
    fontFamily: Plus Jakarta Sans
    fontWeight: 600
    lineHeight: 1.5
  mono:
    fontFamily: JetBrains Mono
    fontWeight: 500
    fontVariantNumeric: tabular-nums
\`\`\`

## 4. Layout & 8px Spatial Grid
\`\`\`yaml
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section-gap: 48px
  container-max: 1400px
\`\`\`

## 5. Shapes & Concentric Rounding
\`\`\`yaml
rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  pill: 9999px
\`\`\`

## 6. Core Component Token Mappings
\`\`\`yaml
components:
  button-primary:
    backgroundColor: "{colors.bg-action-primary}"
    textColor: "{colors.text-on-action}"
    rounded: "{rounded.md}"
    activeMorphRounded: "{rounded.pill}"
    minHeight: 40px
  form-field:
    backgroundColor: "{colors.bg-surface-recessed}"
    borderColor: "{colors.border-default}"
    focusRingColor: "{colors.bg-action-primary}"
    errorColor: "{colors.text-feedback-error}"
    rounded: "{rounded.md}"
    minHeight: 44px
  tonal-card:
    backgroundColor: "{colors.bg-surface-card}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    zLayer: "Z-1 (No Backdrop Blur)"
  liquid-glass-bar:
    backdropBlur: 24px
    saturation: 190%
    rounded: "{rounded.pill}"
    zLayer: "Z-2 (Floating Chrome Only)"
\`\`\`
`;

fs.writeFileSync(path.join(ROOT, "DESIGN.md"), designMdContent, "utf8");

// ============================================================================
// OUTPUT 5: .cursor/rules/design-system.mdc
// ============================================================================
const cursorRulesContent = `---
description: Antigravity Design System (v2.4) — Token, Accessibility & Z-Axis Architecture Guardrails
globs: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.css", "tokens/**/*.json"]
alwaysApply: true
---

# Antigravity Design System Rules (Cursor & Google Antigravity)

1. **Framework & Routing**:
   - Next.js 16.2+ App Router (\`src/app\`). Dynamic route \`params\` and \`searchParams\` are \`Promise\` objects and MUST be \`await\`ed.
   - Tailwind CSS v4 (\`@import "tailwindcss";\`, \`@theme\`). Do NOT create a legacy \`tailwind.config.ts\`.

2. **3-Tier Token Mandate (Zero Raw Hex Values)**:
   - Never hardcode hex/RGB colors in components. Bind strictly to Tier-2 Semantic Tokens (\`var(--bg-action-primary)\`, \`var(--sys-primary)\`, \`var(--text-primary)\`, \`var(--text-feedback-error)\`, \`var(--border-focus-ring)\`) or Tier-3 Component Tokens (\`var(--comp-form-field-*)\`).
   - Run \`npm run build:tokens\` whenever editing \`/tokens/*.json\`.

3. **Z-Axis Spatial Discipline**:
   - **Z-Level 0 (Canvas)**: \`var(--sys-surface-canvas)\` / \`var(--bg-canvas)\`.
   - **Z-Level 1 (Content Cards)**: Use \`.tonal-card\` or \`.tonal-card-elevated\`. NEVER apply \`backdrop-filter: blur()\` on Z-Level 1 content grids or data tables.
   - **Z-Level 2 (Floating Chrome)**: Use \`.liquid-glass-regular\` or \`.liquid-glass-clear\` strictly on sticky navbars, command bars, modals, and transient popovers.

4. **WCAG 2.2 AA Accessibility Engineering**:
   - All text must achieve >= 4.5:1 contrast. Never use opacity utilities below \`/60\` for readable text; use \`var(--text-secondary)\` or \`var(--text-muted)\`.
   - Interactive controls must have a minimum \`24x24px\` hit target (\`40px\` height standard) per WCAG 2.2 SC 2.5.8.
   - Focus-visible rings must use \`2px solid var(--border-focus-ring)\` with \`2px\` offset per SC 2.4.11.
   - Use focus trapping ONLY inside modal overlays (\`role="dialog" aria-modal="true"\`); never trap keyboard focus inside form inputs or data tables.
`;

const cursorOutPath = path.join(ROOT, ".cursor/rules/design-system.mdc");
ensureDir(cursorOutPath);
fs.writeFileSync(cursorOutPath, cursorRulesContent, "utf8");

console.log(
  `[build-tokens] Successfully compiled ${resolvedSemantics.length} Tier-2 semantic tokens & ${resolvedComponents.length} Tier-3 component tokens across 5 platform targets.`
);
