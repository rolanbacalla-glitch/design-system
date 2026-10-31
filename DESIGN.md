# Design System: Antigravity Perceptual & Spatial Workbench (v2.4)
**Project ID:** projects/antigravity-design-system

## 1. Visual Theme & Atmosphere
The Antigravity Design System synthesizes **Material 3 Expressive** perceptual OKLCH tonal mathematics with **Apple HIG Liquid Glass** Z-axis spatial discipline and **Swiss Design Engineering** grids. Content surfaces rest on crisp, zero-blur tonal containers (`Z-Level 1`), while floating navigation chrome and transient command overlays utilize optical Liquid Glass refraction (`Z-Level 2`).

## 2. Color Palette & Roles (3-Tier OKLCH + Hex Dual-Polarity)
All semantic roles guarantee **WCAG 2.2 AA/AAA** contrast across both **Obsidian Dark** and **Alabaster Light** modes.

```yaml
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
```

## 3. Typography Rules
```yaml
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
```

## 4. Layout & 8px Spatial Grid
```yaml
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section-gap: 48px
  container-max: 1400px
```

## 5. Shapes & Concentric Rounding
```yaml
rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  pill: 9999px
```

## 6. Core Component Token Mappings
```yaml
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
```
