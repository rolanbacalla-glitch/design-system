"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Stack,
  Sparkle,
  WarningCircle,
  CheckCircle,
  Play,
  SkipForward,
  SpeakerHigh,
  SlidersHorizontal,
  Eye,
} from "phosphor-react";

export const SurfacesGlassSection: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  const [glassVariant, setGlassVariant] = useState<"regular" | "clear">("regular");
  const [dimmingLayer, setDimmingLayer] = useState(false);
  const [stageBackdrop, setStageBackdrop] = useState<"chromatic" | "editorial" | "grid">("chromatic");
  const [blurRadius, setBlurRadius] = useState(24);
  const [saturation, setSaturation] = useState(190);
  const [antiPatternMode, setAntiPatternMode] = useState(false);

  const tonalSurfaces = [
    {
      token: "--sys-surface-lowest",
      name: "Surface Lowest",
      z: "Z-0 / Recessed Well",
      lDark: "L = 0.110",
      lLight: "L = 0.996",
      usage: "Code wells, recessed canvas tracks, inset data containers",
      bg: "var(--sys-surface-lowest)",
    },
    {
      token: "--sys-surface-low",
      name: "Surface Low",
      z: "Z-1 / Base Card",
      lDark: "L = 0.165",
      lLight: "L = 0.972",
      usage: "Primary structural bento cells, documentation panels, sidebars",
      bg: "var(--sys-surface-low)",
    },
    {
      token: "--sys-surface-container",
      name: "Surface Container",
      z: "Z-1 / Elevated Card",
      lDark: "L = 0.190",
      lLight: "L = 0.958",
      usage: "Nested cards, interactive tiles, table headers",
      bg: "var(--sys-surface-container)",
    },
    {
      token: "--sys-surface-high",
      name: "Surface High",
      z: "Z-1 / Hover & Active",
      lDark: "L = 0.225",
      lLight: "L = 0.940",
      usage: "Hover states, input fields, secondary button fills",
      bg: "var(--sys-surface-high)",
    },
    {
      token: "--sys-surface-highest",
      name: "Surface Highest",
      z: "Z-1 / Peak Tonal",
      lDark: "L = 0.260",
      lLight: "L = 0.920",
      usage: "Selected chips, slider tracks, non-glass tooltips",
      bg: "var(--sys-surface-highest)",
    },
  ];

  return (
    <section id="surfaces" className="scroll-mt-24 space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--sys-outline-variant)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[var(--sys-primary)]">
            <span>02 // SPATIAL DEPTH & MATERIALS</span>
            <span className="text-[var(--sys-on-surface-quaternary)]">•</span>
            <span>APPLE HIG LIQUID GLASS + M3 TONAL ELEVATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sys-on-surface)]">
            Z-Axis Discipline:{" "}
            <span className="font-serif italic font-normal text-[var(--sys-primary)]">
              Tonal Surfaces vs. Liquid Glass
            </span>
          </h2>
          <p className="text-sm text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
            Apple’s Human Interface Guidelines establish a strict rule:{" "}
            <strong className="text-[var(--sys-on-surface)] font-semibold">
              never use Liquid Glass in the content layer, and never stack glass on glass.
            </strong>{" "}
            Content hierarchy (Z-Level 1) is communicated via Material 3’s 5-step tonal surface
            luminance, while optical Liquid Glass is reserved exclusively for floating control chrome
            (Z-Level 2).
          </p>
        </div>

        {/* Anti-Pattern Interactive Toggle */}
        <button
          onClick={() => setAntiPatternMode(!antiPatternMode)}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2.5 self-start cursor-pointer",
            antiPatternMode
              ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
              : "bg-[var(--sys-surface-low)] border-[var(--sys-outline-variant)] text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)]"
          )}
        >
          {antiPatternMode ? (
            <>
              <WarningCircle size={16} weight="fill" className="text-amber-400" />
              <span>Showing HIG Anti-Pattern: Glass-on-Glass</span>
            </>
          ) : (
            <>
              <CheckCircle size={16} weight="fill" className="text-emerald-400" />
              <span>Compare vs. Glass-on-Glass Violation</span>
            </>
          )}
        </button>
      </div>

      {/* Part 1: Z-Level 1 — M3 5-Step Tonal Surface Hierarchy */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--sys-on-surface-secondary)] flex items-center gap-2">
            <Stack size={16} className="text-[var(--sys-primary)]" />
            Z-Level 1 Content Layer — 5-Step Tonal Surface Containers (Zero Backdrop Blur)
          </h3>
          <span className="text-xs font-mono text-[var(--sys-on-surface-tertiary)]">
            1px Top Specular Hairline + Stepped OKLCH Lightness
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tonalSurfaces.map((s, idx) => (
            <div
              key={s.token}
              style={{ backgroundColor: s.bg }}
              className="rounded-2xl p-5 border border-[var(--sys-outline-variant)] shadow-[0_1px_0_0_var(--sys-specular-top)_inset] flex flex-col justify-between min-h-[195px] transition-transform hover:-translate-y-0.5"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)] font-semibold">
                    Step 0{idx + 1}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--sys-on-surface-tertiary)] tabular-nums">
                    {theme === "dark" ? s.lDark : s.lLight}
                  </span>
                </div>
                <div className="text-base font-bold text-[var(--sys-on-surface)] pt-1">{s.name}</div>
                <div className="font-mono text-[11px] text-[var(--sys-primary)]">{s.token}</div>
              </div>

              <div className="pt-4 border-t border-[var(--sys-outline-variant)] space-y-1">
                <div className="font-mono text-[10px] uppercase text-[var(--sys-on-surface-tertiary)]">
                  {s.z}
                </div>
                <p className="text-xs text-[var(--sys-on-surface-secondary)] leading-relaxed">
                  {s.usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Z-Level 2 — Apple HIG Optical Liquid Glass Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Lensing Viewport */}
        <div className="lg:col-span-8 tonal-card p-6 flex flex-col justify-between space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--sys-on-surface)] flex items-center gap-2">
                <Sparkle size={16} weight="fill" className="text-[var(--sys-primary)]" />
                Z-Level 2 Floating Control Stage — Optical Liquid Glass
              </h3>
              <p className="text-xs text-[var(--sys-on-surface-tertiary)] mt-0.5">
                Test <code className="font-mono">Glass.regular</code> vs.{" "}
                <code className="font-mono">Glass.clear</code> (with HIG 35% dimming option) over
                underlying content.
              </p>
            </div>

            {/* Stage Background Selector */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] text-xs">
              {(
                [
                  { id: "chromatic", label: "Chromatic Media" },
                  { id: "editorial", label: "Dense Text" },
                  { id: "grid", label: "Swiss Blueprint" },
                ] as const
              ).map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setStageBackdrop(bg.id)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
                    stageBackdrop === bg.id
                      ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)]"
                      : "text-[var(--sys-on-surface-tertiary)] hover:text-[var(--sys-on-surface)]"
                  )}
                >
                  {bg.label}
                </button>
              ))}
            </div>
          </div>

          {/* The Stage Canvas */}
          <div className="relative h-[340px] rounded-2xl overflow-hidden border border-[var(--sys-outline)] flex items-center justify-center p-6 select-none">
            {/* Underlying Content Layer (Z-Level 0/1) */}
            {stageBackdrop === "chromatic" && (
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: `
                    radial-gradient(circle at 20% 30%, var(--sys-primary) 0%, transparent 55%),
                    radial-gradient(circle at 80% 70%, var(--sys-tertiary) 0%, transparent 55%),
                    radial-gradient(circle at 60% 20%, var(--sys-secondary) 0%, transparent 50%),
                    var(--sys-surface-lowest)
                  `,
                }}
              >
                <div className="p-8 grid grid-cols-3 gap-4 opacity-85">
                  <div className="p-4 rounded-xl bg-black/25 backdrop-blur-none border border-white/15 text-white">
                    <div className="font-mono text-[10px] uppercase opacity-70">Base Content</div>
                    <div className="text-lg font-bold mt-1">Spatial Audio Stream</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/25 border border-white/15 text-white">
                    <div className="font-mono text-[10px] uppercase opacity-70">Luminance</div>
                    <div className="text-lg font-bold mt-1 tabular-nums">1,240 nits HDR</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/25 border border-white/15 text-white">
                    <div className="font-mono text-[10px] uppercase opacity-70">Frame Pacing</div>
                    <div className="text-lg font-bold mt-1 tabular-nums">120 Hz ProMotion</div>
                  </div>
                </div>
              </div>
            )}

            {stageBackdrop === "editorial" && (
              <div className="absolute inset-0 bg-[var(--sys-surface-lowest)] p-8 overflow-hidden space-y-4">
                <div className="font-serif italic text-3xl text-[var(--sys-on-surface)]">
                  “Materials help visually separate foreground controls from underlying content.”
                </div>
                <p className="text-sm text-[var(--sys-on-surface-secondary)] leading-relaxed">
                  Liquid Glass forms a distinct functional layer for controls and navigation elements
                  — like tab bars, command palettes, and floating toolbars — that floats above the
                  content layer. When underlying text scrolls beneath a regular Liquid Glass bar,
                  luminosity adaptation and saturation lensing preserve foreground contrast.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="p-3 rounded-lg bg-[var(--sys-surface-low)] border border-[var(--sys-outline-variant)] text-xs font-mono text-[var(--sys-on-surface-secondary)]"
                    >
                      Content Block 0{n} {"//"} Tonal Surface
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stageBackdrop === "grid" && (
              <div className="absolute inset-0 swiss-grid-bg bg-[var(--sys-surface-lowest)] flex items-center justify-between px-12">
                <div className="w-40 h-40 rounded-full border-2 border-dashed border-[var(--sys-primary)]/50 flex items-center justify-center font-mono text-xs text-[var(--sys-primary)]">
                  Z-0 GRID ORIGIN
                </div>
                <div className="w-56 h-32 rounded-xl bg-[var(--sys-primary-container)] border border-[var(--sys-primary)] p-4 flex flex-col justify-between">
                  <span className="font-mono text-[10px] text-[var(--sys-on-primary-container)]">
                    HIGH-CHROMA OBJECT
                  </span>
                  <span className="font-bold text-sm text-[var(--sys-on-primary-container)]">
                    Refraction Test Target
                  </span>
                </div>
              </div>
            )}

            {/* Optional HIG 35% Dimming Layer for Clear Glass over bright media */}
            {dimmingLayer && (
              <div className="absolute inset-0 bg-black/35 transition-opacity pointer-events-none" />
            )}

            {/* Floating Z-Level 2 Liquid Glass Control Component */}
            <div
              style={{
                backdropFilter: `blur(${blurRadius}px) saturate(${saturation}%)`,
                WebkitBackdropFilter: `blur(${blurRadius}px) saturate(${saturation}%)`,
              }}
              className={cn(
                "relative z-10 w-full max-w-lg rounded-3xl p-5 transition-all duration-300",
                glassVariant === "regular" ? "liquid-glass-regular" : "liquid-glass-clear"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--sys-primary)] flex items-center justify-center text-[var(--sys-on-primary)] shadow-md">
                    <Sparkle size={20} weight="fill" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--sys-on-surface)]">
                      Floating Control Layer ({glassVariant === "regular" ? "Glass.regular" : "Glass.clear"})
                    </div>
                    <div className="text-xs text-[var(--sys-on-surface-secondary)]">
                      Z-Level 2 • {blurRadius}px Blur • {saturation}% Saturation Lensing
                    </div>
                  </div>
                </div>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[var(--sys-surface-high)]/80 text-[var(--sys-on-surface)] border border-[var(--sys-outline)]">
                  HIG COMPLIANT
                </span>
              </div>

              {/* Simulated Media / Spatial Transport Bar */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    className="p-2.5 rounded-full bg-[var(--sys-primary)] text-[var(--sys-on-primary)] hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                    aria-label="Play"
                  >
                    <Play size={14} weight="fill" />
                  </button>
                  <button
                    className="p-2 rounded-full bg-[var(--sys-surface-high)]/60 text-[var(--sys-on-surface)] hover:bg-[var(--sys-surface-highest)] transition-all cursor-pointer"
                    aria-label="Skip"
                  >
                    <SkipForward size={14} weight="fill" />
                  </button>
                  <div className="flex-1 h-2 rounded-full bg-[var(--sys-on-surface)]/15 overflow-hidden">
                    <div className="h-full w-2/3 rounded-full bg-[var(--sys-primary)]" />
                  </div>
                  <SpeakerHigh size={16} className="text-[var(--sys-on-surface-secondary)]" />
                </div>

                {/* Anti-Pattern Demonstration inside the Glass Container */}
                {antiPatternMode && (
                  <div className="mt-3 p-3 rounded-xl bg-white/15 backdrop-blur-xl border border-amber-400/50 text-xs space-y-1">
                    <div className="font-mono text-[10px] font-bold uppercase text-amber-300 flex items-center gap-1.5">
                      <WarningCircle size={13} weight="fill" />
                      HIG Violation: Glass Stacked on Glass
                    </div>
                    <p className="text-[11px] text-[var(--sys-on-surface-secondary)]">
                      Stacking a second blurred glass card inside a glass container doubles GPU
                      sampling cost and washes out foreground contrast. Use solid tonal fills or
                      vibrancy labels inside glass instead.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Apple HIG 4-Level Vibrancy Hierarchy Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {[
              {
                role: "1. Vibrant Primary",
                token: "--sys-on-surface",
                color: "var(--sys-on-surface)",
                desc: "Titles, primary glyphs (≥ 7:1)",
              },
              {
                role: "2. Vibrant Secondary",
                token: "--sys-on-surface-secondary",
                color: "var(--sys-on-surface-secondary)",
                desc: "Subtitles, metadata (≥ 4.5:1)",
              },
              {
                role: "3. Vibrant Tertiary",
                token: "--sys-on-surface-tertiary",
                color: "var(--sys-on-surface-tertiary)",
                desc: "Captions, kbd hints",
              },
              {
                role: "4. Quaternary",
                token: "--sys-on-surface-quaternary",
                color: "var(--sys-on-surface-quaternary)",
                desc: "Disabled & subtle hairlines",
              },
            ].map((v) => (
              <div
                key={v.token}
                className="p-3 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)]"
              >
                <div className="text-xs font-bold" style={{ color: v.color }}>
                  {v.role}
                </div>
                <div className="font-mono text-[10px] text-[var(--sys-on-surface-tertiary)] mt-0.5 truncate">
                  {v.token}
                </div>
                <div className="text-[11px] text-[var(--sys-on-surface-secondary)] mt-1">
                  {v.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Controls: Optical Parameters & HIG Rules */}
        <div className="lg:col-span-4 tonal-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-[var(--sys-outline-variant)] pb-4">
              <SlidersHorizontal size={18} className="text-[var(--sys-primary)]" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--sys-on-surface)]">
                Optical Shader Parameters
              </h3>
            </div>

            {/* Variant Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[var(--sys-on-surface-secondary)]">
                Apple HIG Liquid Glass Variant
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["regular", "clear"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setGlassVariant(v)}
                    className={cn(
                      "py-2 px-3 rounded-xl text-xs font-mono uppercase border transition-all cursor-pointer",
                      glassVariant === v
                        ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] border-[var(--sys-primary)] font-semibold"
                        : "bg-[var(--sys-surface-lowest)] text-[var(--sys-on-surface-secondary)] border-[var(--sys-outline-variant)]"
                    )}
                  >
                    Glass.{v}
                  </button>
                ))}
              </div>
            </div>

            {/* Blur Radius */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--sys-on-surface-secondary)]">Gaussian Blur Radius</span>
                <span className="font-mono font-semibold text-[var(--sys-primary)] tabular-nums">
                  {blurRadius}px
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={40}
                value={blurRadius}
                onChange={(e) => setBlurRadius(Number(e.target.value))}
                className="precision-slider"
              />
            </div>

            {/* Saturation Lensing */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--sys-on-surface-secondary)]">Chromatic Lensing (Saturate)</span>
                <span className="font-mono font-semibold text-[var(--sys-primary)] tabular-nums">
                  {saturation}%
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={240}
                step={10}
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="precision-slider"
              />
            </div>

            {/* 35% Dimming Toggle */}
            <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] flex items-center justify-between">
              <div className="pr-3">
                <div className="text-xs font-semibold text-[var(--sys-on-surface)]">
                  35% Luminance Dimming Layer
                </div>
                <div className="text-[11px] text-[var(--sys-on-surface-tertiary)]">
                  Recommended by Apple HIG when using <code className="font-mono">Glass.clear</code>{" "}
                  over bright backgrounds.
                </div>
              </div>
              <button
                onClick={() => setDimmingLayer(!dimmingLayer)}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 cursor-pointer",
                  dimmingLayer ? "bg-[var(--sys-primary)]" : "bg-[var(--sys-surface-highest)]"
                )}
                aria-label="Toggle 35% Dimming Layer"
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white shadow transition-transform",
                    dimmingLayer ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Decision Matrix */}
          <div className="p-4 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--sys-primary)] flex items-center gap-1.5">
              <Eye size={14} /> Material Selection Matrix
            </div>
            <ul className="text-xs text-[var(--sys-on-surface-secondary)] space-y-1.5 leading-relaxed">
              <li>
                • <strong className="text-[var(--sys-on-surface)]">Data Cards & Tables:</strong>{" "}
                Use <code className="font-mono text-[11px]">--sys-surface-low</code> (No blur).
              </li>
              <li>
                • <strong className="text-[var(--sys-on-surface)]">Nav Bars & Command Docks:</strong>{" "}
                Use <code className="font-mono text-[11px]">.liquid-glass-regular</code>.
              </li>
              <li>
                • <strong className="text-[var(--sys-on-surface)]">Media Overlays:</strong> Use{" "}
                <code className="font-mono text-[11px]">.liquid-glass-clear</code> + 35% dim.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
