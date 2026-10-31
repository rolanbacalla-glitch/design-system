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
      name: "Recessed Surface",
      z: "Level 0 • Recessed Well",
      lDark: "L = 0.110",
      lLight: "L = 0.996",
      usage: "Code blocks, inset wells, and recessed background tracks",
      bg: "var(--sys-surface-lowest)",
    },
    {
      token: "--sys-surface-low",
      name: "Standard Card",
      z: "Level 1 • Base Card",
      lDark: "L = 0.165",
      lLight: "L = 0.972",
      usage: "Main content cards, feature panels, and sidebars",
      bg: "var(--sys-surface-low)",
    },
    {
      token: "--sys-surface-container",
      name: "Elevated Card",
      z: "Level 1 • Elevated Card",
      lDark: "L = 0.190",
      lLight: "L = 0.958",
      usage: "Nested cards, interactive tiles, and table headers",
      bg: "var(--sys-surface-container)",
    },
    {
      token: "--sys-surface-high",
      name: "Interactive Surface",
      z: "Level 1 • Hover & Input",
      lDark: "L = 0.225",
      lLight: "L = 0.940",
      usage: "Hover states, search inputs, and secondary buttons",
      bg: "var(--sys-surface-high)",
    },
    {
      token: "--sys-surface-highest",
      name: "Highlighted Surface",
      z: "Level 1 • Active State",
      lDark: "L = 0.260",
      lLight: "L = 0.920",
      usage: "Selected tags, slider tracks, and active badges",
      bg: "var(--sys-surface-highest)",
    },
  ];

  return (
    <section id="surfaces" className="scroll-mt-24 space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--sys-outline-variant)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[var(--sys-primary)]">
            <span>Depth & Materials</span>
            <span className="text-[var(--sys-on-surface-quaternary)]">•</span>
            <span>Layered Surface Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sys-on-surface)]">
            Clean Content Cards vs.{" "}
            <span className="font-serif italic font-normal text-[var(--sys-primary)]">
              Frosted Glass Overlays
            </span>
          </h2>
          <p className="text-sm text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
            To keep interfaces fast and easy to read,{" "}
            <strong className="text-[var(--sys-on-surface)] font-semibold">
              everyday content sits on solid, distraction-free cards
            </strong>
            , while translucent frosted glass is saved exclusively for floating navigation bars,
            modals, and quick toolbars.
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
              <span>Showing Common Mistake: Glass on Glass</span>
            </>
          ) : (
            <>
              <CheckCircle size={16} weight="fill" className="text-emerald-400" />
              <span>Preview Common Mistake: Glass on Glass</span>
            </>
          )}
        </button>
      </div>

      {/* Part 1: 5-Step Solid Content Surfaces */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--sys-on-surface-secondary)] flex items-center gap-2">
            <Stack size={16} className="text-[var(--sys-primary)]" />
            5-Step Solid Card Surfaces (For Page Content & Data)
          </h3>
          <span className="text-xs text-[var(--sys-on-surface-tertiary)]">
            Subtle brightness steps create depth without heavy drop shadows
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

      {/* Part 2: Interactive Frosted Glass Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Lensing Viewport */}
        <div className="lg:col-span-8 tonal-card p-6 flex flex-col justify-between space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-[var(--sys-on-surface)] flex items-center gap-2">
                <Sparkle size={16} weight="fill" className="text-[var(--sys-primary)]" />
                Interactive Frosted Glass Preview
              </h3>
              <p className="text-xs text-[var(--sys-on-surface-tertiary)] mt-0.5">
                Compare standard Frosted Glass vs. Clear Glass over different page backgrounds.
              </p>
            </div>

            {/* Stage Background Selector */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] text-xs">
              {(
                [
                  { id: "chromatic", label: "Colourful Media" },
                  { id: "editorial", label: "Article Text" },
                  { id: "grid", label: "Grid Layout" },
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
                    <div className="font-mono text-[10px] uppercase opacity-70">Now Playing</div>
                    <div className="text-lg font-bold mt-1">Spatial Audio Stream</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/25 border border-white/15 text-white">
                    <div className="font-mono text-[10px] uppercase opacity-70">Brightness</div>
                    <div className="text-lg font-bold mt-1 tabular-nums">1,240 nits HDR</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/25 border border-white/15 text-white">
                    <div className="font-mono text-[10px] uppercase opacity-70">Refresh Rate</div>
                    <div className="text-lg font-bold mt-1 tabular-nums">120 Hz Smooth</div>
                  </div>
                </div>
              </div>
            )}

            {stageBackdrop === "editorial" && (
              <div className="absolute inset-0 bg-[var(--sys-surface-lowest)] p-8 overflow-hidden space-y-4">
                <div className="font-serif italic text-3xl text-[var(--sys-on-surface)]">
                  “Translucent surfaces separate floating controls from the content underneath.”
                </div>
                <p className="text-sm text-[var(--sys-on-surface-secondary)] leading-relaxed">
                  Frosted glass creates a dedicated layer for navigation bars, search menus, and
                  floating toolbars. When page text scrolls behind a frosted glass bar, background
                  blur softens the text behind it so your navigation stays crisp and easy to read.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="p-3 rounded-lg bg-[var(--sys-surface-low)] border border-[var(--sys-outline-variant)] text-xs font-medium text-[var(--sys-on-surface-secondary)]"
                    >
                      Article Card 0{n} • Solid Surface
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stageBackdrop === "grid" && (
              <div className="absolute inset-0 swiss-grid-bg bg-[var(--sys-surface-lowest)] flex items-center justify-between px-12">
                <div className="w-40 h-40 rounded-full border-2 border-dashed border-[var(--sys-primary)]/50 flex items-center justify-center font-mono text-xs text-[var(--sys-primary)]">
                  LAYOUT GRID
                </div>
                <div className="w-56 h-32 rounded-xl bg-[var(--sys-primary-container)] border border-[var(--sys-primary)] p-4 flex flex-col justify-between">
                  <span className="font-mono text-[10px] text-[var(--sys-on-primary-container)]">
                    COLOUR ACCENT CARD
                  </span>
                  <span className="font-bold text-sm text-[var(--sys-on-primary-container)]">
                    Blur Preview Card
                  </span>
                </div>
              </div>
            )}

            {/* Optional 35% Dimming Layer for Clear Glass over bright media */}
            {dimmingLayer && (
              <div className="absolute inset-0 bg-black/35 transition-opacity pointer-events-none" />
            )}

            {/* Floating Liquid Glass Control Component */}
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
                      Floating Control Bar ({glassVariant === "regular" ? "Frosted Glass" : "Clear Glass"})
                    </div>
                    <div className="text-xs text-[var(--sys-on-surface-secondary)]">
                      {blurRadius}px Blur • {saturation}% Colour Richness
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[var(--sys-surface-high)]/80 text-[var(--sys-on-surface)] border border-[var(--sys-outline)]">
                  Floating Layer
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
                    <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                      <WarningCircle size={13} weight="fill" />
                      Avoid: Stacking Glass Inside Glass
                    </div>
                    <p className="text-[11px] text-[var(--sys-on-surface-secondary)]">
                      Placing a second blurred glass card inside an already blurred toolbar makes text
                      muddy and slows down scrolling. Use solid fills for inner buttons and cards instead.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4-Level Text Hierarchy Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {[
              {
                role: "1. Primary Text",
                token: "--sys-on-surface",
                color: "var(--sys-on-surface)",
                desc: "Headings & main body text",
              },
              {
                role: "2. Secondary Text",
                token: "--sys-on-surface-secondary",
                color: "var(--sys-on-surface-secondary)",
                desc: "Subtitles & supporting copy",
              },
              {
                role: "3. Muted Text",
                token: "--sys-on-surface-tertiary",
                color: "var(--sys-on-surface-tertiary)",
                desc: "Captions & keyboard hints",
              },
              {
                role: "4. Subtle Text",
                token: "--sys-on-surface-quaternary",
                color: "var(--sys-on-surface-quaternary)",
                desc: "Disabled labels & dividers",
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

        {/* Right Controls: Adjust Glass Effect & Surface Guide */}
        <div className="lg:col-span-4 tonal-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-[var(--sys-outline-variant)] pb-4">
              <SlidersHorizontal size={18} className="text-[var(--sys-primary)]" />
              <h3 className="text-sm font-semibold text-[var(--sys-on-surface)]">
                Adjust Glass Effect
              </h3>
            </div>

            {/* Variant Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[var(--sys-on-surface-secondary)]">
                Glass Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: "regular", label: "Frosted Glass" },
                    { id: "clear", label: "Clear Glass" },
                  ] as const
                ).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setGlassVariant(v.id)}
                    className={cn(
                      "py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer",
                      glassVariant === v.id
                        ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] border-[var(--sys-primary)] font-semibold"
                        : "bg-[var(--sys-surface-lowest)] text-[var(--sys-on-surface-secondary)] border-[var(--sys-outline-variant)]"
                    )}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Blur Radius */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--sys-on-surface-secondary)]">Blur Strength</span>
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
                <span className="text-[var(--sys-on-surface-secondary)]">Colour Richness</span>
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
                  Dim Bright Backgrounds
                </div>
                <div className="text-[11px] text-[var(--sys-on-surface-tertiary)]">
                  Adds a soft 35% tint behind Clear Glass so white text stays readable over bright photos.
                </div>
              </div>
              <button
                onClick={() => setDimmingLayer(!dimmingLayer)}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 cursor-pointer",
                  dimmingLayer ? "bg-[var(--sys-primary)]" : "bg-[var(--sys-surface-highest)]"
                )}
                aria-label="Toggle Dim Bright Backgrounds"
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
            <div className="text-xs font-semibold text-[var(--sys-primary)] flex items-center gap-1.5">
              <Eye size={14} /> When to Use Each Surface
            </div>
            <ul className="text-xs text-[var(--sys-on-surface-secondary)] space-y-1.5 leading-relaxed">
              <li>
                • <strong className="text-[var(--sys-on-surface)]">Cards & Data Tables:</strong>{" "}
                Use solid card surfaces (no blur) for maximum reading comfort.
              </li>
              <li>
                • <strong className="text-[var(--sys-on-surface)]">Top Navbars & Modals:</strong>{" "}
                Use Frosted Glass (<code className="font-mono text-[11px]">.liquid-glass-regular</code>).
              </li>
              <li>
                • <strong className="text-[var(--sys-on-surface)]">Photo & Video Overlays:</strong>{" "}
                Use Clear Glass with background dimming enabled.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
