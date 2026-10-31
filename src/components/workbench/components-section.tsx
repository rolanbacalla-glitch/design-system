"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Cube,
  Sparkle,
  Check,
  Copy,
  MagnifyingGlass,
  ShieldCheck,
  Warning,
  Info,
  ArrowUpRight,
  Lightning,
  Sliders,
} from "phosphor-react";

export const ComponentsSection: React.FC = () => {
  // Interactive Specimen State
  const [activeSegment, setActiveSegment] = useState<"production" | "staging" | "canary">("production");
  const [sliderValue, setSliderValue] = useState(72);
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(false);
  const [morphActive, setMorphActive] = useState(false);
  const [inputVal, setInputVal] = useState("oklch(0.77 0.152 258)");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copySnippet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const telemetryRows = [
    {
      token: "--sys-primary",
      layer: "Z-1 / Accent",
      contrast: "8.4:1 (AAA)",
      latency: "0.42 ms",
      status: "Optimal",
    },
    {
      token: "--sys-surface-low",
      layer: "Z-1 / Tonal Card",
      contrast: "14.2:1 (AAA)",
      latency: "0.18 ms",
      status: "Optimal",
    },
    {
      token: ".liquid-glass-regular",
      layer: "Z-2 / Floating Chrome",
      contrast: "7.1:1 (AAA)",
      latency: "1.05 ms",
      status: "Lensing",
    },
    {
      token: "--sys-outline-variant",
      layer: "Z-1 / Hairline",
      contrast: "1.6:1 (Decorative)",
      latency: "0.09 ms",
      status: "Synced",
    },
  ];

  return (
    <section id="components" className="scroll-mt-24 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--sys-outline-variant)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[var(--sys-primary)]">
            <span>04 // COMPONENT PRIMITIVES</span>
            <span className="text-[var(--sys-on-surface-quaternary)]">•</span>
            <span>INTERACTIVE SPECIMEN MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sys-on-surface)]">
            Production Primitives &{" "}
            <span className="font-serif italic font-normal text-[var(--sys-primary)]">
              Tactile Micro-Interactions
            </span>
          </h2>
          <p className="text-sm text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
            Every primitive binds strictly to Tier-2 System Tokens (`--sys-*`). Content components
            rest on tonal surfaces (`Z-Level 1`), while transient thumbs and floating action pills
            adopt optical Liquid Glass (`Z-Level 2`) on engagement.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--sys-on-surface-tertiary)]">
          <Cube size={16} className="text-[var(--sys-primary)]" />
          <span>6 Interactive Categories • Keyboard Accessible</span>
        </div>
      </div>

      {/* Specimen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 04.1: Buttons & M3 Shape Morphing */}
        <div className="lg:col-span-6 tonal-card p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--sys-outline-variant)] pb-3.5">
            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--sys-primary)]">
                04.1 // ACTIONS & SHAPE MORPHING
              </span>
              <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
                Button Hierarchy & M3 Expressive Morph
              </h3>
            </div>
            <button
              onClick={() =>
                copySnippet(
                  "btn",
                  `<button className="px-4 py-2 rounded-[var(--sys-radius-md)] active:rounded-full bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-semibold transition-all">Action</button>`
                )
              }
              className="text-xs font-mono text-[var(--sys-on-surface-tertiary)] hover:text-[var(--sys-primary)] flex items-center gap-1 cursor-pointer"
            >
              {copiedCode === "btn" ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>Copy JSX</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 py-2">
            {/* Primary Filled */}
            <button className="px-4 py-2.5 rounded-[var(--sys-radius-md)] active:rounded-[28px] bg-[var(--sys-primary)] text-[var(--sys-on-primary)] text-xs font-semibold shadow-sm hover:opacity-92 active:scale-[0.97] transition-all duration-150 cursor-pointer flex items-center gap-2">
              <Lightning size={14} weight="fill" />
              Primary Action
            </button>

            {/* Tonal Container (M3 Signature) */}
            <button className="px-4 py-2.5 rounded-[var(--sys-radius-md)] active:rounded-[28px] bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)] text-xs font-semibold hover:brightness-105 active:scale-[0.97] transition-all duration-150 cursor-pointer">
              Tonal Secondary
            </button>

            {/* Surface Hairline Outline */}
            <button className="px-4 py-2.5 rounded-[var(--sys-radius-md)] bg-[var(--sys-surface-high)] text-[var(--sys-on-surface)] border border-[var(--sys-outline)] text-xs font-medium hover:bg-[var(--sys-surface-highest)] active:scale-[0.97] transition-all duration-150 cursor-pointer">
              Surface Outline
            </button>

            {/* Apple HIG glassProminent Button */}
            <button className="liquid-glass-regular px-4 py-2.5 rounded-full text-xs font-semibold text-[var(--sys-on-surface)] hover:border-[var(--sys-primary)] active:scale-[0.97] transition-all duration-150 cursor-pointer flex items-center gap-1.5">
              <Sparkle size={14} weight="fill" className="text-[var(--sys-primary)]" />
              .glassProminent
            </button>
          </div>

          {/* Interactive Shape-Morph Toggle Demo */}
          <div className="p-4 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-[var(--sys-on-surface)]">
                M3 Expressive Corner Morphing Specimen
              </div>
              <div className="text-[11px] text-[var(--sys-on-surface-tertiary)]">
                Click the tile to morph between <code className="font-mono">12px</code> resting rect
                and <code className="font-mono">999px</code> active pill using{" "}
                <code className="font-mono">--ease-spatial-spring</code>.
              </div>
            </div>
            <button
              onClick={() => setMorphActive(!morphActive)}
              style={{
                borderRadius: morphActive ? "9999px" : "12px",
                transition: "all 280ms var(--ease-spatial-spring)",
              }}
              className={cn(
                "px-5 py-2.5 text-xs font-mono font-bold shrink-0 cursor-pointer",
                morphActive
                  ? "bg-[var(--sys-tertiary)] text-slate-950 scale-105"
                  : "bg-[var(--sys-surface-high)] text-[var(--sys-on-surface)] border border-[var(--sys-outline)]"
              )}
            >
              {morphActive ? "MORPHED :: PILL" : "CLICK TO MORPH"}
            </button>
          </div>
        </div>

        {/* 04.2: Tactile Controls, Segmented Bar & Transient Liquid Glass Slider */}
        <div className="lg:col-span-6 tonal-card p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--sys-outline-variant)] pb-3.5">
            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--sys-primary)]">
                04.2 // TRANSIENT INTERACTIVITY
              </span>
              <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
                Segmented Controls, Spring Switches & Precision Scrubber
              </h3>
            </div>
            <Sliders size={16} className="text-[var(--sys-primary)]" />
          </div>

          {/* Segmented Control */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--sys-on-surface-secondary)] font-medium">
                Segmented Environment Selector
              </span>
              <span className="font-mono text-[11px] text-[var(--sys-primary)] uppercase">
                {activeSegment}
              </span>
            </div>
            <div className="grid grid-cols-3 p-1 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)]">
              {(["production", "staging", "canary"] as const).map((seg) => (
                <button
                  key={seg}
                  onClick={() => setActiveSegment(seg)}
                  className={cn(
                    "py-2 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer",
                    activeSegment === seg
                      ? "bg-[var(--sys-surface-high)] text-[var(--sys-on-surface)] font-semibold shadow-xs border border-[var(--sys-outline)]"
                      : "text-[var(--sys-on-surface-tertiary)] hover:text-[var(--sys-on-surface)]"
                  )}
                >
                  {seg}
                </button>
              ))}
            </div>
          </div>

          {/* Precision Tick Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--sys-on-surface-secondary)] font-medium">
                Optical Refraction Scrubber (Tabular Readout)
              </span>
              <span className="font-mono font-bold text-[var(--sys-primary)] tabular-nums">
                {sliderValue}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="precision-slider"
              aria-label="Optical Refraction Scrubber"
            />
            <div className="flex justify-between px-1">
              {Array.from({ length: 11 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "w-px h-1.5 transition-colors",
                    i * 10 <= sliderValue
                      ? "bg-[var(--sys-primary)]"
                      : "bg-[var(--sys-outline)]"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[var(--sys-on-surface)]">
                  Dynamic Tone Sync
                </div>
                <div className="text-[10px] font-mono text-[var(--sys-on-surface-tertiary)]">
                  HCT Gamut Guard
                </div>
              </div>
              <button
                onClick={() => setToggleA(!toggleA)}
                className={cn(
                  "w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer",
                  toggleA ? "bg-[var(--sys-primary)]" : "bg-[var(--sys-surface-highest)]"
                )}
                aria-label="Toggle Dynamic Tone Sync"
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white shadow transition-transform",
                    toggleA ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[var(--sys-on-surface)]">
                  Reduce Transparency
                </div>
                <div className="text-[10px] font-mono text-[var(--sys-on-surface-tertiary)]">
                  HIG Accessibility
                </div>
              </div>
              <button
                onClick={() => setToggleB(!toggleB)}
                className={cn(
                  "w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer",
                  toggleB ? "bg-[var(--sys-primary)]" : "bg-[var(--sys-surface-highest)]"
                )}
                aria-label="Toggle Reduce Transparency"
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white shadow transition-transform",
                    toggleB ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 04.3: Inputs, Search & Semantic Callout Banners */}
        <div className="lg:col-span-5 tonal-card p-6 space-y-5">
          <div className="border-b border-[var(--sys-outline-variant)] pb-3.5">
            <span className="font-mono text-[10px] uppercase text-[var(--sys-primary)]">
              04.3 // DATA ENTRY & SEMANTIC FEEDBACK
            </span>
            <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
              Tokenized Inputs & Status Callouts
            </h3>
          </div>

          {/* Input Field with Focus Ring */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--sys-on-surface-secondary)] flex justify-between">
              <span>OKLCH Color Expression</span>
              <span className="font-mono text-[10px] text-emerald-400">✓ Valid Gamut</span>
            </label>
            <div className="relative flex items-center">
              <MagnifyingGlass
                size={15}
                className="absolute left-3.5 text-[var(--sys-on-surface-tertiary)]"
              />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full pl-9 pr-16 py-2.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline)] focus:border-[var(--sys-primary)] focus:ring-2 focus:ring-[var(--sys-primary)]/25 text-xs font-mono text-[var(--sys-on-surface)] outline-none transition-all"
              />
              <kbd className="absolute right-2.5 font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-tertiary)] border border-[var(--sys-outline-variant)]">
                ESC
              </kbd>
            </div>
          </div>

          {/* Semantic Status Callouts */}
          <div className="space-y-2.5 pt-1">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-3">
              <ShieldCheck size={18} weight="fill" className="text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-[var(--sys-on-surface)]">
                  WCAG 2.2 AAA Contrast Verified
                </div>
                <p className="text-[var(--sys-on-surface-secondary)] text-[11px]">
                  All primary and secondary vibrancy labels exceed 7.0:1 against tonal containers.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
              <Warning size={18} weight="fill" className="text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-[var(--sys-on-surface)]">
                  Z-Axis Elevation Guardrail
                </div>
                <p className="text-[var(--sys-on-surface-secondary)] text-[11px]">
                  Avoid placing <code className="font-mono">.liquid-glass-regular</code> inside
                  scrolling table rows.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--sys-primary-container)]/50 border border-[var(--sys-primary)]/30 flex items-start gap-3">
              <Info size={18} weight="fill" className="text-[var(--sys-primary)] shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-[var(--sys-on-surface)]">
                  Concentric Radius Inheritance
                </div>
                <p className="text-[var(--sys-on-surface-secondary)] text-[11px]">
                  Nested inner elements automatically compute <code className="font-mono">R_in = R_out - P</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 04.4: High-Density Swiss Data Table (Linear / Geist Benchmark) */}
        <div className="lg:col-span-7 tonal-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--sys-outline-variant)] pb-3.5">
            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--sys-primary)]">
                04.4 // HIGH-DENSITY INFORMATION DESIGN
              </span>
              <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
                Swiss Hairline Token Audit Table
              </h3>
            </div>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-secondary)] border border-[var(--sys-outline-variant)]">
              Zero Blur • High Legibility
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--sys-outline-variant)] bg-[var(--sys-surface-lowest)]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--sys-outline-variant)] bg-[var(--sys-surface-low)] font-mono text-[10px] uppercase text-[var(--sys-on-surface-tertiary)]">
                  <th className="py-3 px-4">Token / Primitive</th>
                  <th className="py-3 px-4">Spatial Plane</th>
                  <th className="py-3 px-4">Contrast Ratio</th>
                  <th className="py-3 px-4">Paint Cost</th>
                  <th className="py-3 px-4 text-right">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sys-outline-variant)]">
                {telemetryRows.map((r) => (
                  <tr
                    key={r.token}
                    className="hover:bg-[var(--sys-surface-low)]/70 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-semibold text-[var(--sys-primary)]">
                      {r.token}
                    </td>
                    <td className="py-3 px-4 text-[var(--sys-on-surface-secondary)]">{r.layer}</td>
                    <td className="py-3 px-4 font-mono tabular-nums text-[var(--sys-on-surface)]">
                      {r.contrast}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-[var(--sys-on-surface-tertiary)]">
                      {r.latency}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--sys-on-surface-tertiary)] pt-1">
            <span>
              Follows Linear & Vercel Geist density rules: <code className="font-mono">1px</code>{" "}
              structural borders, <code className="font-mono">tabular-nums</code>, and zero
              decorative chart junk.
            </span>
            <a
              href="#export"
              className="font-mono text-xs text-[var(--sys-primary)] hover:underline flex items-center gap-1 shrink-0"
            >
              Export Tokens <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* 04.5: Deep-Link Interactive Component Portals (/components/[componentName]) */}
      <div className="tonal-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--sys-outline-variant)] pb-4">
          <div>
            <span className="font-mono text-[10px] uppercase text-[var(--sys-primary)]">
              04.5 // DEDICATED COMPONENT DOCUMENTATION PORTALS
            </span>
            <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
              Inspect Full State Matrices, WAI-ARIA Specs & Tier-2 Token Lineage
            </h3>
          </div>
          <span className="text-xs font-mono text-[var(--sys-on-surface-tertiary)]">
            Route: /components/[componentName]
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              slug: "form-field",
              title: "Form Field Input",
              badge: "WCAG 3.3.1 / 2.4.11",
              desc: "Floating/stacked label, aria-live validation, and 6-state interactive simulator.",
            },
            {
              slug: "modal-dialog",
              title: "Modal Dialog",
              badge: "FocusScope Trap",
              desc: "WAI-ARIA modal overlay with Tab cycle containment and Escape focus restoration.",
            },
            {
              slug: "data-table",
              title: "Telemetry Data Table",
              badge: "aria-sort + tabular-nums",
              desc: "Sortable, filterable token audit grid with selectable rows and zero focus traps.",
            },
            {
              slug: "button",
              title: "M3 Morphing Button",
              badge: "SC 2.5.8 >= 40px",
              desc: "Expressive 12px -> 9999px active pill morph with spring physics.",
            },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/components/${item.slug}`}
              className="group p-4 rounded-xl bg-[var(--sys-surface-lowest)] hover:bg-[var(--sys-surface-high)] border border-[var(--sys-outline-variant)] hover:border-[var(--sys-primary)] transition-all flex flex-col justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sys-primary)]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)] font-semibold">
                    {item.badge}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-[var(--sys-on-surface-tertiary)] group-hover:text-[var(--sys-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
                <div className="text-sm font-bold text-[var(--sys-on-surface)] group-hover:text-[var(--sys-primary)] transition-colors">
                  {item.title}
                </div>
                <p className="text-xs text-[var(--sys-on-surface-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="text-[11px] font-mono text-[var(--sys-primary)]">
                /components/{item.slug} →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
