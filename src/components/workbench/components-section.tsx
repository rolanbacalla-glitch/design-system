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
      layer: "Primary Brand Fill",
      contrast: "8.4:1 (AAA)",
      latency: "Fast",
      status: "Readable",
    },
    {
      token: "--sys-surface-low",
      layer: "Standard Content Card",
      contrast: "14.2:1 (AAA)",
      latency: "Instant",
      status: "Readable",
    },
    {
      token: ".liquid-glass-regular",
      layer: "Floating Glass Navbar",
      contrast: "7.1:1 (AAA)",
      latency: "Blurred",
      status: "Readable",
    },
    {
      token: "--sys-outline-variant",
      layer: "Subtle Card Border",
      contrast: "1.6:1 (Divider)",
      latency: "Instant",
      status: "Synced",
    },
  ];

  return (
    <section id="components" className="scroll-mt-24 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--sys-outline-variant)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[var(--sys-primary)]">
            <span>UI Components</span>
            <span className="text-[var(--sys-on-surface-quaternary)]">•</span>
            <span>Ready-to-Use Building Blocks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sys-on-surface)]">
            Interactive{" "}
            <span className="font-serif italic font-normal text-[var(--sys-primary)]">
              Building Blocks
            </span>
          </h2>
          <p className="text-sm text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
            Every button, input, toggle, and table automatically adapts to your chosen brand colour
            and light/dark mode while maintaining full keyboard navigation and screen reader support.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[var(--sys-on-surface-tertiary)]">
          <Cube size={16} className="text-[var(--sys-primary)]" />
          <span>6 Interactive Categories • Keyboard Friendly</span>
        </div>
      </div>

      {/* Specimen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 04.1: Buttons & Interactive Shape Bounce */}
        <div className="lg:col-span-6 tonal-card p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--sys-outline-variant)] pb-3.5">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--sys-primary)]">
                Buttons & Actions
              </span>
              <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
                Button Styles & Tactile Press Feedback
              </h3>
            </div>
            <button
              onClick={() =>
                copySnippet(
                  "btn",
                  `<button className="px-4 py-2 rounded-[var(--sys-radius-md)] active:rounded-full bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-semibold transition-all">Action</button>`
                )
              }
              className="text-xs font-medium text-[var(--sys-on-surface-tertiary)] hover:text-[var(--sys-primary)] flex items-center gap-1 cursor-pointer"
            >
              {copiedCode === "btn" ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>Copy Code</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 py-2">
            {/* Primary Filled */}
            <button className="px-4 py-2.5 rounded-[var(--sys-radius-md)] active:rounded-[28px] bg-[var(--sys-primary)] text-[var(--sys-on-primary)] text-xs font-semibold shadow-sm hover:opacity-92 active:scale-[0.97] transition-all duration-150 cursor-pointer flex items-center gap-2">
              <Lightning size={14} weight="fill" />
              Primary Button
            </button>

            {/* Tonal Container */}
            <button className="px-4 py-2.5 rounded-[var(--sys-radius-md)] active:rounded-[28px] bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)] text-xs font-semibold hover:brightness-105 active:scale-[0.97] transition-all duration-150 cursor-pointer">
              Secondary Soft
            </button>

            {/* Surface Hairline Outline */}
            <button className="px-4 py-2.5 rounded-[var(--sys-radius-md)] bg-[var(--sys-surface-high)] text-[var(--sys-on-surface)] border border-[var(--sys-outline)] text-xs font-medium hover:bg-[var(--sys-surface-highest)] active:scale-[0.97] transition-all duration-150 cursor-pointer">
              Outlined Button
            </button>

            {/* Frosted Glass Button */}
            <button className="liquid-glass-regular px-4 py-2.5 rounded-full text-xs font-semibold text-[var(--sys-on-surface)] hover:border-[var(--sys-primary)] active:scale-[0.97] transition-all duration-150 cursor-pointer flex items-center gap-1.5">
              <Sparkle size={14} weight="fill" className="text-[var(--sys-primary)]" />
              Frosted Glass
            </button>
          </div>

          {/* Interactive Shape-Morph Toggle Demo */}
          <div className="p-4 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-[var(--sys-on-surface)]">
                Playful Corner Bounce
              </div>
              <div className="text-[11px] text-[var(--sys-on-surface-tertiary)]">
                Click the button to watch its corners smoothly animate from a rounded rectangle into
                a pill shape.
              </div>
            </div>
            <button
              onClick={() => setMorphActive(!morphActive)}
              style={{
                borderRadius: morphActive ? "9999px" : "12px",
                transition: "all 280ms var(--ease-spatial-spring)",
              }}
              className={cn(
                "px-5 py-2.5 text-xs font-semibold shrink-0 cursor-pointer",
                morphActive
                  ? "bg-[var(--sys-tertiary)] text-slate-950 scale-105"
                  : "bg-[var(--sys-surface-high)] text-[var(--sys-on-surface)] border border-[var(--sys-outline)]"
              )}
            >
              {morphActive ? "Pill Shape ✓" : "Try Shape Bounce"}
            </button>
          </div>
        </div>

        {/* 04.2: Tactile Controls, Segmented Bar & Slider */}
        <div className="lg:col-span-6 tonal-card p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--sys-outline-variant)] pb-3.5">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--sys-primary)]">
                Selection Controls
              </span>
              <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
                Segmented Tabs, Sliders & Toggle Switches
              </h3>
            </div>
            <Sliders size={16} className="text-[var(--sys-primary)]" />
          </div>

          {/* Segmented Control */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--sys-on-surface-secondary)] font-medium">
                Environment Switcher
              </span>
              <span className="font-mono text-[11px] text-[var(--sys-primary)] capitalize">
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
                Smooth Value Slider
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
              aria-label="Smooth Value Slider"
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
                  Auto-Adjust Contrast
                </div>
                <div className="text-[11px] text-[var(--sys-on-surface-tertiary)]">
                  Keeps text readable
                </div>
              </div>
              <button
                onClick={() => setToggleA(!toggleA)}
                className={cn(
                  "w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer",
                  toggleA ? "bg-[var(--sys-primary)]" : "bg-[var(--sys-surface-highest)]"
                )}
                aria-label="Toggle Auto-Adjust Contrast"
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
                <div className="text-[11px] text-[var(--sys-on-surface-tertiary)]">
                  Accessibility preference
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
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--sys-primary)]">
              Inputs & Alerts
            </span>
            <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
              Search Fields & Helpful Status Messages
            </h3>
          </div>

          {/* Input Field with Focus Ring */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--sys-on-surface-secondary)] flex justify-between">
              <span>Theme Colour Value</span>
              <span className="text-[11px] font-medium text-emerald-400">✓ Valid Colour</span>
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
                  High-Contrast Readability Verified
                </div>
                <p className="text-[var(--sys-on-surface-secondary)] text-[11px]">
                  All headings and body text exceed WCAG AAA readability standards in both themes.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
              <Warning size={18} weight="fill" className="text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-[var(--sys-on-surface)]">
                  Keep Data Tables Blur-Free
                </div>
                <p className="text-[var(--sys-on-surface-secondary)] text-[11px]">
                  Use solid card backgrounds for long tables so scrolling stays smooth and legible.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--sys-primary-container)]/50 border border-[var(--sys-primary)]/30 flex items-start gap-3">
              <Info size={18} weight="fill" className="text-[var(--sys-primary)] shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-[var(--sys-on-surface)]">
                  Balanced Nested Corners
                </div>
                <p className="text-[var(--sys-on-surface-secondary)] text-[11px]">
                  Inner buttons and cards automatically use slightly tighter corners than their outer container.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 04.4: Clean Data Table */}
        <div className="lg:col-span-7 tonal-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--sys-outline-variant)] pb-3.5">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--sys-primary)]">
                Data Display
              </span>
              <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
                Component Contrast & Readability Summary
              </h3>
            </div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-secondary)] border border-[var(--sys-outline-variant)]">
              Easy to Scan
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--sys-outline-variant)] bg-[var(--sys-surface-lowest)]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--sys-outline-variant)] bg-[var(--sys-surface-low)] text-[11px] font-semibold text-[var(--sys-on-surface-tertiary)]">
                  <th className="py-3 px-4">Token</th>
                  <th className="py-3 px-4">Where It’s Used</th>
                  <th className="py-3 px-4">Contrast Ratio</th>
                  <th className="py-3 px-4">Rendering</th>
                  <th className="py-3 px-4 text-right">Status</th>
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
                    <td className="py-3 px-4 text-[var(--sys-on-surface-tertiary)]">
                      {r.latency}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
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
              Clean 1px dividers and aligned numbers make dense data tables effortless to scan.
            </span>
            <a
              href="#export"
              className="font-semibold text-xs text-[var(--sys-primary)] hover:underline flex items-center gap-1 shrink-0"
            >
              Export Tokens <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* 04.5: Deep-Link Interactive Component Guides (/components/[componentName]) */}
      <div className="tonal-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--sys-outline-variant)] pb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--sys-primary)]">
              Detailed Component Guides
            </span>
            <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
              Explore Interactive States, Keyboard Shortcuts & Code Examples
            </h3>
          </div>
          <span className="text-xs text-[var(--sys-on-surface-tertiary)]">
            Click any card to open its live playground
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              slug: "form-field",
              title: "Form Field Input",
              badge: "Accessible Forms",
              desc: "Interactive text field with helpful error messages, focus rings, and 6 state previews.",
            },
            {
              slug: "modal-dialog",
              title: "Modal Dialogue",
              badge: "Keyboard Friendly",
              desc: "Pop-up dialogue that keeps keyboard focus inside and closes cleanly with the Escape key.",
            },
            {
              slug: "data-table",
              title: "Data Table",
              badge: "Sortable & Filterable",
              desc: "Interactive table with instant search filtering, column sorting, and row selection.",
            },
            {
              slug: "button",
              title: "Interactive Button",
              badge: "Touch-Ready (40px+)",
              desc: "Primary, secondary, and frosted glass buttons with smooth press animations.",
            },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/components/${item.slug}`}
              className="group p-4 rounded-xl bg-[var(--sys-surface-lowest)] hover:bg-[var(--sys-surface-high)] border border-[var(--sys-outline-variant)] hover:border-[var(--sys-primary)] transition-all flex flex-col justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sys-primary)]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)]">
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
              <div className="text-xs font-semibold text-[var(--sys-primary)]">
                Open {item.title} Guide →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
