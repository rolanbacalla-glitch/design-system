"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TextT, Play, Pause, CheckCircle, Warning } from "phosphor-react";

export const TypographySection: React.FC = () => {
  const [emphasized, setEmphasized] = useState(false);
  const [liveTicker, setLiveTicker] = useState(14829.42);
  const [isTicking, setIsTicking] = useState(true);

  useEffect(() => {
    if (!isTicking) return;
    const timer = setInterval(() => {
      setLiveTicker((prev) => Number((prev + (Math.random() * 24 - 11.5)).toFixed(2)));
    }, 140);
    return () => clearInterval(timer);
  }, [isTicking]);

  const typeScale = [
    {
      role: "Display Large",
      token: "--type-display-lg",
      size: "3.25rem (52px)",
      lineHeight: "1.06",
      tracking: "-0.03em",
      baseWeight: "font-semibold",
      emphWeight: "font-bold",
      className: "text-4xl sm:text-5xl tracking-[-0.03em] leading-[1.06]",
      sample: "Spatial Precision & Perceptual Clarity",
    },
    {
      role: "Editorial Hero (Serif)",
      token: "--type-editorial-xl",
      size: "2.75rem (44px)",
      lineHeight: "1.08",
      tracking: "-0.015em",
      baseWeight: "font-normal",
      emphWeight: "italic",
      className: "font-serif text-3xl sm:text-4xl tracking-[-0.015em] leading-[1.08] text-[var(--sys-primary)]",
      sample: "Hero Moments in Material 3 Expressive",
    },
    {
      role: "Headline Medium",
      token: "--type-headline-md",
      size: "1.75rem (28px)",
      lineHeight: "1.20",
      tracking: "-0.02em",
      baseWeight: "font-semibold",
      emphWeight: "font-bold",
      className: "text-2xl sm:text-[28px] tracking-[-0.02em] leading-[1.2]",
      sample: "Z-Axis Hierarchy Separates Chrome from Content",
    },
    {
      role: "Title Medium",
      token: "--type-title-md",
      size: "1.125rem (18px)",
      lineHeight: "1.35",
      tracking: "-0.01em",
      baseWeight: "font-medium",
      emphWeight: "font-bold",
      className: "text-lg tracking-[-0.01em] leading-[1.35]",
      sample: "Three-Tier Semantic Token Resolution Pipeline",
    },
    {
      role: "Body Default",
      token: "--type-body-md",
      size: "0.9375rem (15px)",
      lineHeight: "1.65",
      tracking: "0em",
      baseWeight: "font-normal",
      emphWeight: "font-medium",
      className: "text-[15px] leading-[1.65] text-[var(--sys-on-surface-secondary)]",
      sample:
        "Readable content guides enforce a 60ch–72ch measure so eye tracking remains effortless across wide desktop viewports.",
    },
    {
      role: "Label / Technical Mono",
      token: "--type-label-mono",
      size: "0.75rem (12px)",
      lineHeight: "1.40",
      tracking: "0.06em",
      baseWeight: "font-mono font-medium",
      emphWeight: "font-mono font-semibold",
      className: "font-mono text-xs uppercase tracking-[0.06em] text-[var(--sys-primary)]",
      sample: "TOKEN_SYNC :: OKLCH(0.77 0.152 258) // WCAG_AAA_PASS",
    },
  ];

  return (
    <section id="typography" className="scroll-mt-24 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--sys-outline-variant)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[var(--sys-primary)]">
            <span>03 // TYPOGRAPHY & METRICS</span>
            <span className="text-[var(--sys-on-surface-quaternary)]">•</span>
            <span>M3 EMPHASIZED SCALE + TABULAR DISCIPLINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sys-on-surface)]">
            Typographic Scale &{" "}
            <span className="font-serif italic font-normal text-[var(--sys-primary)]">
              Numeric Stability
            </span>
          </h2>
          <p className="text-sm text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
            Pairs geometric <strong className="text-[var(--sys-on-surface)]">Plus Jakarta Sans</strong>{" "}
            for structural UI with <strong className="text-[var(--sys-on-surface)]">Instrument Serif</strong>{" "}
            for expressive focal points and{" "}
            <strong className="text-[var(--sys-on-surface)]">JetBrains Mono</strong> for token
            inspectors. Supports Material 3’s dual Baseline / Emphasized weight states.
          </p>
        </div>

        {/* Baseline vs Emphasized Switch */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[var(--sys-surface-low)] border border-[var(--sys-outline-variant)] self-start">
          <button
            onClick={() => setEmphasized(false)}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
              !emphasized
                ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-semibold"
                : "text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)]"
            )}
          >
            Baseline Scale (15)
          </button>
          <button
            onClick={() => setEmphasized(true)}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
              emphasized
                ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-semibold"
                : "text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)]"
            )}
          >
            M3 Emphasized Scale (+15)
          </button>
        </div>
      </div>

      {/* Main Grid: Type Specimen Table + Tabular Nums Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Interactive Specimen Table */}
        <div className="lg:col-span-8 tonal-card divide-y divide-[var(--sys-outline-variant)] overflow-hidden">
          {typeScale.map((row) => (
            <div
              key={row.token}
              className="p-5 sm:p-6 flex flex-col gap-3 hover:bg-[var(--sys-surface-container)]/60 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[var(--sys-on-surface)]">{row.role}</span>
                  <span className="text-[var(--sys-primary)]">{row.token}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[var(--sys-on-surface-tertiary)] tabular-nums">
                  <span>Size: {row.size}</span>
                  <span>•</span>
                  <span>LH: {row.lineHeight}</span>
                  <span>•</span>
                  <span>Track: {row.tracking}</span>
                </div>
              </div>

              <div
                className={cn(
                  "text-[var(--sys-on-surface)] transition-all duration-150",
                  row.className,
                  emphasized ? row.emphWeight : row.baseWeight
                )}
              >
                {row.sample}
              </div>
            </div>
          ))}
        </div>

        {/* Right 4 Cols: Font Triad + Rauno Freiberg Tabular-Nums Proof */}
        <div className="lg:col-span-4 space-y-6">
          {/* Font Stack Card */}
          <div className="tonal-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--sys-primary)]">
              <TextT size={16} /> Three-Axis Font Stack
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)]">
                <div className="font-mono text-[10px] uppercase text-[var(--sys-on-surface-tertiary)]">
                  --font-sans • UI & Structural Body
                </div>
                <div className="text-lg font-bold text-[var(--sys-on-surface)] mt-0.5">
                  Plus Jakarta Sans
                </div>
                <div className="text-xs text-[var(--sys-on-surface-secondary)] mt-1">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj 0123456789
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)]">
                <div className="font-mono text-[10px] uppercase text-[var(--sys-on-surface-tertiary)]">
                  --font-serif • Expressive Hero Contrast
                </div>
                <div className="font-serif italic text-2xl text-[var(--sys-primary)] mt-0.5">
                  Instrument Serif Italic
                </div>
                <div className="text-xs text-[var(--sys-on-surface-secondary)] mt-1">
                  Editorial authority for hero callouts & quotes.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)]">
                <div className="font-mono text-[10px] uppercase text-[var(--sys-on-surface-tertiary)]">
                  --font-mono • Tokens & Telemetry
                </div>
                <div className="font-mono text-base font-semibold text-[var(--sys-on-surface)] mt-0.5">
                  JetBrains Mono
                </div>
                <div className="font-mono text-xs text-[var(--sys-on-surface-secondary)] mt-1">
                  {"() => oklch(0.77 0.152 258)"}
                </div>
              </div>
            </div>
          </div>

          {/* Tabular Numerals Live Proof */}
          <div className="tonal-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--sys-primary)]">
                Micro-Craft: Tabular Numerals
              </span>
              <button
                onClick={() => setIsTicking(!isTicking)}
                className="px-2.5 py-1 rounded-lg bg-[var(--sys-surface-high)] text-xs font-mono text-[var(--sys-on-surface)] flex items-center gap-1.5 cursor-pointer"
              >
                {isTicking ? <Pause size={12} weight="fill" /> : <Play size={12} weight="fill" />}
                {isTicking ? "Pause" : "Run"}
              </button>
            </div>

            <p className="text-xs text-[var(--sys-on-surface-secondary)] leading-relaxed">
              Without <code className="font-mono">font-variant-numeric: tabular-nums</code>, live
              scrubbers and counters jitter horizontally as narrow digits (<code className="font-mono">1</code>)
              replace wide digits (<code className="font-mono">8</code>).
            </p>

            {/* Bad: Proportional */}
            <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                <span className="flex items-center gap-1">
                  <Warning size={12} weight="fill" /> proportional-nums (Jitters)
                </span>
                <span>AVOID</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  style={{ fontVariantNumeric: "proportional-nums" }}
                  className="text-2xl font-bold text-[var(--sys-on-surface)]"
                >
                  ${liveTicker.toFixed(2)}
                </span>
                <span className="text-xs font-mono text-[var(--sys-on-surface-tertiary)]">
                  ← Watch suffix shake
                </span>
              </div>
            </div>

            {/* Good: Tabular */}
            <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                <span className="flex items-center gap-1">
                  <CheckCircle size={12} weight="fill" /> tabular-nums (Monospaced Glyph Width)
                </span>
                <span>REQUIRED</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--sys-on-surface)] tabular-nums">
                  ${liveTicker.toFixed(2)}
                </span>
                <span className="text-xs font-mono text-[var(--sys-on-surface-tertiary)]">
                  ← Zero horizontal shift
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
