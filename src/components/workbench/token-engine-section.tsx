"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  SEED_PRESETS,
  computeTonalScale,
  type SeedConfig,
} from "@/lib/tokens";
import {
  Swatches,
  Sliders,
  Copy,
  Check,
  ArrowRight,
  ArrowsClockwise,
  Info,
} from "phosphor-react";

interface TokenEngineSectionProps {
  seed: SeedConfig;
  onChangeSeed: (next: SeedConfig) => void;
  theme: "dark" | "light";
}

export const TokenEngineSection: React.FC<TokenEngineSectionProps> = ({
  seed,
  onChangeSeed,
  theme,
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<"all" | "reference" | "system" | "component">("all");

  const primaryScale = useMemo(
    () => computeTonalScale(seed.hue, seed.chroma),
    [seed.hue, seed.chroma]
  );
  const secondaryScale = useMemo(
    () => computeTonalScale(seed.secondaryHue, Math.max(0.02, seed.chroma * 0.72)),
    [seed.secondaryHue, seed.chroma]
  );
  const tertiaryScale = useMemo(
    () => computeTonalScale(seed.tertiaryHue, Math.max(0.02, seed.chroma * 0.78)),
    [seed.tertiaryHue, seed.chroma]
  );
  const neutralScale = useMemo(
    () => computeTonalScale(seed.hue, seed.neutralChroma),
    [seed.hue, seed.neutralChroma]
  );

  const copyValue = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedToken(key);
    setTimeout(() => setCopiedToken(null), 1600);
  };

  const palettes = [
    { id: "primary", label: "Primary Key", subtitle: `H:${seed.hue}° C:${seed.chroma}`, scale: primaryScale },
    {
      id: "secondary",
      label: "Secondary Key",
      subtitle: `H:${seed.secondaryHue}° C:${(seed.chroma * 0.72).toFixed(2)}`,
      scale: secondaryScale,
    },
    {
      id: "tertiary",
      label: "Tertiary Accent",
      subtitle: `H:${seed.tertiaryHue}° C:${(seed.chroma * 0.78).toFixed(2)}`,
      scale: tertiaryScale,
    },
    {
      id: "neutral",
      label: "Neutral Surface",
      subtitle: `H:${seed.hue}° C:${seed.neutralChroma}`,
      scale: neutralScale,
    },
  ];

  const semanticTokenMappings = [
    {
      tier1: `--ref-primary-${theme === "dark" ? "70" : "40"}`,
      tier1Val:
        theme === "dark"
          ? primaryScale.find((s) => s.tone === 70)?.oklch
          : primaryScale.find((s) => s.tone === 40)?.oklch,
      tier2: "--sys-primary",
      role: "Primary interactive fill & focus ring",
      tier3: "--comp-button-primary-bg",
    },
    {
      tier1: `--ref-primary-${theme === "dark" ? "10" : "100"}`,
      tier1Val:
        theme === "dark"
          ? primaryScale.find((s) => s.tone === 10)?.oklch
          : primaryScale.find((s) => s.tone === 100)?.oklch,
      tier2: "--sys-on-primary",
      role: "Guaranteed high-contrast ink atop --sys-primary",
      tier3: "--comp-button-primary-label",
    },
    {
      tier1: `--ref-neutral-${theme === "dark" ? "6" : "98"}`,
      tier1Val: `oklch(${theme === "dark" ? "0.135" : "0.985"} ${seed.neutralChroma} ${seed.hue})`,
      tier2: "--sys-surface-canvas",
      role: "Z-Level 0 foundational environment canvas",
      tier3: "--comp-page-canvas",
    },
    {
      tier1: `--ref-neutral-${theme === "dark" ? "12" : "94"}`,
      tier1Val: `oklch(${theme === "dark" ? "0.190" : "0.958"} ${seed.neutralChroma} ${seed.hue})`,
      tier2: "--sys-surface-container",
      role: "Z-Level 1 default card & container surface",
      tier3: "--comp-card-surface",
    },
    {
      tier1: `--ref-neutral-${theme === "dark" ? "17" : "92"}`,
      tier1Val: `oklch(${theme === "dark" ? "0.225" : "0.940"} ${seed.neutralChroma} ${seed.hue})`,
      tier2: "--sys-surface-high",
      role: "Z-Level 1 elevated interactive surface & hover state",
      tier3: "--comp-input-hover-bg",
    },
  ];

  return (
    <section id="tokens" className="scroll-mt-24 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--sys-outline-variant)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[var(--sys-primary)]">
            <span>01 // FOUNDATIONS</span>
            <span className="text-[var(--sys-on-surface-quaternary)]">•</span>
            <span>MATERIAL 3 HCT / OKLCH ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sys-on-surface)]">
            Perceptual Color &{" "}
            <span className="font-serif italic font-normal text-[var(--sys-primary)]">
              Three-Tier Token Architecture
            </span>
          </h2>
          <p className="text-sm text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
            Unlike RGB or HSL—where equal lightness values yield wildly uneven human brightness
            perception—this engine computes 13-step tonal palettes in perceptual{" "}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--sys-surface-high)] text-[var(--sys-on-surface)]">
              oklch(L C H)
            </code>{" "}
            space. Any two tokens sharing Lightness <code className="font-mono text-xs">L</code>{" "}
            guarantee identical WCAG contrast across every hue.
          </p>
        </div>

        {/* Curated Architectural Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          {SEED_PRESETS.map((preset) => {
            const active = seed.name === preset.name && seed.hue === preset.hue;
            return (
              <button
                key={preset.name}
                onClick={() => onChangeSeed(preset)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-2 cursor-pointer",
                  active
                    ? "bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)] border-[var(--sys-primary)] shadow-xs"
                    : "bg-[var(--sys-surface-low)] text-[var(--sys-on-surface-secondary)] border-[var(--sys-outline-variant)] hover:border-[var(--sys-outline)] hover:text-[var(--sys-on-surface)]"
                )}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/25"
                  style={{ backgroundColor: `oklch(0.65 ${preset.chroma} ${preset.hue})` }}
                />
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Seed Modulator + 3-Tier Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live OKLCH Seed Synthesizer */}
        <div className="lg:col-span-5 tonal-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--sys-outline-variant)] pb-4">
            <div className="flex items-center gap-2.5">
              <Sliders size={18} className="text-[var(--sys-primary)]" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--sys-on-surface)]">
                Live OKLCH Seed Modulator
              </h3>
            </div>
            <button
              onClick={() => onChangeSeed(SEED_PRESETS[0])}
              className="text-xs font-mono text-[var(--sys-on-surface-tertiary)] hover:text-[var(--sys-primary)] flex items-center gap-1 cursor-pointer"
              title="Reset to Cobalt Obsidian"
            >
              <ArrowsClockwise size={13} />
              Reset
            </button>
          </div>

          <div className="space-y-5">
            {/* Primary Hue */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[var(--sys-on-surface-secondary)]">
                  Primary Seed Hue <code className="font-mono text-[11px] opacity-70">(--seed-hue)</code>
                </span>
                <span className="font-mono font-semibold text-[var(--sys-primary)] tabular-nums">
                  {seed.hue}°
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                value={seed.hue}
                onChange={(e) =>
                  onChangeSeed({ ...seed, name: "Custom Seed", hue: Number(e.target.value) })
                }
                className="precision-slider"
                aria-label="Primary Seed Hue"
              />
              <div className="flex justify-between text-[10px] font-mono text-[var(--sys-on-surface-quaternary)] tabular-nums">
                <span>0° Red</span>
                <span>120° Green</span>
                <span>240° Blue</span>
                <span>360°</span>
              </div>
            </div>

            {/* Primary Chroma */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[var(--sys-on-surface-secondary)]">
                  Peak Chroma <code className="font-mono text-[11px] opacity-70">(--seed-chroma)</code>
                </span>
                <span className="font-mono font-semibold text-[var(--sys-primary)] tabular-nums">
                  {seed.chroma.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={0.01}
                max={0.28}
                step={0.01}
                value={seed.chroma}
                onChange={(e) =>
                  onChangeSeed({ ...seed, name: "Custom Seed", chroma: Number(e.target.value) })
                }
                className="precision-slider"
                aria-label="Primary Chroma"
              />
              <div className="flex justify-between text-[10px] font-mono text-[var(--sys-on-surface-quaternary)]">
                <span>0.01 Achromatic</span>
                <span>0.15 Balanced</span>
                <span>0.28 P3 Vivid</span>
              </div>
            </div>

            {/* Secondary & Tertiary Hue Row */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[var(--sys-on-surface-secondary)]">
                    Secondary Hue
                  </span>
                  <span className="font-mono text-[var(--sys-secondary)] tabular-nums">
                    {seed.secondaryHue}°
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={seed.secondaryHue}
                  onChange={(e) =>
                    onChangeSeed({
                      ...seed,
                      name: "Custom Seed",
                      secondaryHue: Number(e.target.value),
                    })
                  }
                  className="precision-slider"
                  aria-label="Secondary Hue"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[var(--sys-on-surface-secondary)]">
                    Tertiary Hue
                  </span>
                  <span className="font-mono text-[var(--sys-tertiary)] tabular-nums">
                    {seed.tertiaryHue}°
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={seed.tertiaryHue}
                  onChange={(e) =>
                    onChangeSeed({
                      ...seed,
                      name: "Custom Seed",
                      tertiaryHue: Number(e.target.value),
                    })
                  }
                  className="precision-slider"
                  aria-label="Tertiary Hue"
                />
              </div>
            </div>

            {/* Neutral Chroma & Corner Radius Scale */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[var(--sys-on-surface-secondary)]">
                    Neutral Tint
                  </span>
                  <span className="font-mono text-[var(--sys-on-surface)] tabular-nums">
                    {seed.neutralChroma.toFixed(3)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={0.03}
                  step={0.002}
                  value={seed.neutralChroma}
                  onChange={(e) =>
                    onChangeSeed({
                      ...seed,
                      name: "Custom Seed",
                      neutralChroma: Number(e.target.value),
                    })
                  }
                  className="precision-slider"
                  aria-label="Neutral Surface Chroma"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[var(--sys-on-surface-secondary)]">
                    Radius Scale
                  </span>
                  <span className="font-mono text-[var(--sys-on-surface)] tabular-nums">
                    {seed.radiusScale.toFixed(2)}x
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1.75}
                  step={0.25}
                  value={seed.radiusScale}
                  onChange={(e) =>
                    onChangeSeed({
                      ...seed,
                      name: "Custom Seed",
                      radiusScale: Number(e.target.value),
                    })
                  }
                  className="precision-slider"
                  aria-label="Global Corner Radius Scale"
                />
              </div>
            </div>
          </div>

          {/* Live Computed Root Formula Readout */}
          <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] font-mono text-[11px] space-y-1">
            <div className="text-[var(--sys-on-surface-tertiary)]">
              {`/* Active System Primary (${theme.toUpperCase()}) */`}
            </div>
            <div className="text-[var(--sys-on-surface)] flex items-center justify-between">
              <span>
                --sys-primary:{" "}
                <span className="text-[var(--sys-primary)] font-semibold">
                  oklch({theme === "dark" ? "0.77" : "0.49"}{" "}
                  {(seed.chroma * (theme === "dark" ? 0.8 : 1)).toFixed(3)} {seed.hue})
                </span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-secondary)]">
                AAA Ready
              </span>
            </div>
          </div>
        </div>

        {/* Right: 3-Tier Token Pipeline Visualizer */}
        <div className="lg:col-span-7 tonal-card p-6 flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--sys-outline-variant)] pb-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--sys-on-surface)]">
                Three-Tier Semantic Resolution Pipeline
              </h3>
              <p className="text-xs text-[var(--sys-on-surface-tertiary)] mt-0.5">
                Reference values never leak directly into components—they resolve through theme-aware System roles.
              </p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] text-[11px] font-mono">
              {(["all", "reference", "system", "component"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTier(t)}
                  className={cn(
                    "px-2 py-1 rounded capitalize transition-colors cursor-pointer",
                    selectedTier === t
                      ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-semibold"
                      : "text-[var(--sys-on-surface-tertiary)] hover:text-[var(--sys-on-surface)]"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Pipeline Rows */}
          <div className="space-y-3">
            {semanticTokenMappings.map((row) => (
              <div
                key={row.tier2}
                className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] hover:border-[var(--sys-outline)] transition-colors grid grid-cols-1 md:grid-cols-11 gap-3 items-center"
              >
                {/* Tier 1 Reference */}
                <div
                  className={cn(
                    "md:col-span-3 flex items-center gap-2.5",
                    selectedTier !== "all" && selectedTier !== "reference" && "opacity-35"
                  )}
                >
                  <span
                    className="w-5 h-5 rounded-md border border-white/20 shrink-0"
                    style={{ backgroundColor: row.tier1Val }}
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase text-[var(--sys-on-surface-tertiary)]">
                      1. Reference
                    </div>
                    <div className="font-mono text-xs font-medium text-[var(--sys-on-surface)] truncate">
                      {row.tier1}
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex md:col-span-1 justify-center text-[var(--sys-on-surface-quaternary)]">
                  <ArrowRight size={14} />
                </div>

                {/* Tier 2 System */}
                <div
                  className={cn(
                    "md:col-span-3",
                    selectedTier !== "all" && selectedTier !== "system" && "opacity-35"
                  )}
                >
                  <div className="text-[10px] font-mono uppercase text-[var(--sys-primary)]">
                    2. System ({theme})
                  </div>
                  <button
                    onClick={() => copyValue(row.tier2, `var(${row.tier2})`)}
                    className="font-mono text-xs font-semibold text-[var(--sys-on-surface)] hover:text-[var(--sys-primary)] flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{row.tier2}</span>
                    {copiedToken === row.tier2 ? (
                      <Check size={12} className="text-emerald-400" />
                    ) : (
                      <Copy size={12} className="opacity-40" />
                    )}
                  </button>
                </div>

                <div className="hidden md:flex md:col-span-1 justify-center text-[var(--sys-on-surface-quaternary)]">
                  <ArrowRight size={14} />
                </div>

                {/* Tier 3 Component */}
                <div
                  className={cn(
                    "md:col-span-3",
                    selectedTier !== "all" && selectedTier !== "component" && "opacity-35"
                  )}
                >
                  <div className="text-[10px] font-mono uppercase text-[var(--sys-on-surface-tertiary)]">
                    3. Component Slot
                  </div>
                  <div className="font-mono text-xs text-[var(--sys-on-surface-secondary)] truncate">
                    {row.tier3}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--sys-on-surface-tertiary)] pt-2 border-t border-[var(--sys-outline-variant)]">
            <span className="flex items-center gap-1.5">
              <Info size={14} className="text-[var(--sys-primary)]" />
              Click any token or tonal cell below to copy its CSS variable or OKLCH value.
            </span>
            <span className="font-mono text-[11px] tabular-nums">13 Stops × 4 Key Palettes = 52 Reference Tokens</span>
          </div>
        </div>
      </div>

      {/* 13-Step Tonal Palette Matrix */}
      <div className="tonal-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--sys-on-surface)] flex items-center gap-2">
              <Swatches size={18} className="text-[var(--sys-primary)]" />
              13-Step Perceptual Tonal Scale (Material 3 HCT / OKLCH)
            </h3>
            <p className="text-xs text-[var(--sys-on-surface-tertiary)] mt-0.5">
              Notice how Tone 40 across all rows has identical perceived brightness (`L=0.49`), guaranteeing predictable contrast pairing.
            </p>
          </div>
          {copiedToken && (
            <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-1.5">
              <Check size={13} weight="bold" />
              Copied: {copiedToken}
            </div>
          )}
        </div>

        <div className="space-y-5">
          {palettes.map((pal) => (
            <div key={pal.id} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--sys-on-surface)]">{pal.label}</span>
                <span className="font-mono text-[11px] text-[var(--sys-on-surface-tertiary)] tabular-nums">
                  {pal.subtitle}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-13 gap-1.5">
                {pal.scale.map((stop) => {
                  const key = `--ref-${pal.id}-${stop.tone}`;
                  const isCopied = copiedToken === stop.oklch;
                  return (
                    <button
                      key={stop.tone}
                      onClick={() => copyValue(stop.oklch, stop.oklch)}
                      title={`${key}: ${stop.oklch} | Contrast vs Dark: ${stop.contrastVsDarkCanvas}`}
                      className="group relative h-20 rounded-lg p-2 flex flex-col justify-between text-left border border-black/10 dark:border-white/10 transition-transform hover:scale-[1.04] active:scale-95 cursor-pointer overflow-hidden"
                      style={{
                        backgroundColor: stop.oklch,
                        color: stop.recommendedText === "dark" ? "#0b0d13" : "#f8fafc",
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-[11px] font-bold tabular-nums">
                          {stop.tone}
                        </span>
                        {isCopied ? (
                          <Check size={12} weight="bold" />
                        ) : (
                          <Copy
                            size={11}
                            className="opacity-0 group-hover:opacity-80 transition-opacity"
                          />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-mono text-[9px] opacity-75 tabular-nums">
                          L:{(stop.lightness * 100).toFixed(0)}
                        </div>
                        <div className="font-mono text-[9px] opacity-60 tabular-nums">
                          {theme === "dark" ? stop.contrastVsDarkCanvas : stop.contrastVsLightCanvas}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
