"use client";

import React, { useState } from "react";
import { Waves, Play, ArrowsOutCardinal, CheckCircle } from "phosphor-react";

export const MotionGeometrySection: React.FC = () => {
  const [innerRadius, setInnerRadius] = useState(12);
  const [padding, setPadding] = useState(12);
  const [pulseActive, setPulseActive] = useState(false);

  const outerRadius = innerRadius + padding;

  const curves = [
    {
      name: "Spatial Spring",
      token: "--ease-spatial-spring",
      bezier: "cubic-bezier(0.22, 1.28, 0.36, 1)",
      duration: "220ms",
      role: "Physical geometry transitions, button morphs, modal entry, thumb scaling",
    },
    {
      name: "Effects Smooth",
      token: "--ease-effects-smooth",
      bezier: "cubic-bezier(0.22, 1, 0.36, 1)",
      duration: "180ms",
      role: "Opacity, tonal color transitions, hairline illumination (zero overshoot)",
    },
    {
      name: "Quartic Deceleration",
      token: "--ease-out-quart",
      bezier: "cubic-bezier(0.165, 0.84, 0.44, 1)",
      duration: "260ms",
      role: "Drawer slide-overs, command bar expansion, layout reflows",
    },
  ];

  return (
    <section id="motion" className="scroll-mt-24 space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--sys-outline-variant)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[var(--sys-primary)]">
            <span>05 // MOTION & CONCENTRIC GEOMETRY</span>
            <span className="text-[var(--sys-on-surface-quaternary)]">•</span>
            <span>SPRING PHYSICS & OPTICAL RADII</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sys-on-surface)]">
            Concentric Nesting &{" "}
            <span className="font-serif italic font-normal text-[var(--sys-primary)]">
              Dual-Curve Motion Physics
            </span>
          </h2>
          <p className="text-sm text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
            Spatial movements use an expressive spring curve (<code className="font-mono">--ease-spatial-spring</code>),
            while color and opacity changes use a critically damped curve (<code className="font-mono">--ease-effects-smooth</code>)
            so alpha values never overshoot 100%.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--sys-on-surface-tertiary)]">
          <Waves size={16} className="text-[var(--sys-primary)]" />
          <span>prefers-reduced-motion: Compliant</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Concentric Radius Interactive Calculator */}
        <div className="lg:col-span-6 tonal-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--sys-outline-variant)] pb-3.5">
            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--sys-primary)]">
                05.1 // CONCENTRIC RADIUS FORMULA
              </span>
              <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
                R_outer ({outerRadius}px) = R_inner ({innerRadius}px) + Padding ({padding}px)
              </h3>
            </div>
            <ArrowsOutCardinal size={18} className="text-[var(--sys-primary)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label htmlFor="inner-radius-slider" className="text-[var(--sys-on-surface-secondary)]">
                  Inner Radius (R_inner)
                </label>
                <span className="tabular-nums font-bold text-[var(--sys-primary)]">{innerRadius}px</span>
              </div>
              <input
                id="inner-radius-slider"
                type="range"
                min={4}
                max={24}
                value={innerRadius}
                onChange={(e) => setInnerRadius(Number(e.target.value))}
                className="precision-slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label htmlFor="padding-slider" className="text-[var(--sys-on-surface-secondary)]">
                  Container Padding (P)
                </label>
                <span className="tabular-nums font-bold text-[var(--sys-primary)]">{padding}px</span>
              </div>
              <input
                id="padding-slider"
                type="range"
                min={4}
                max={28}
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="precision-slider"
              />
            </div>
          </div>

          {/* Live Concentric Visualizer */}
          <div className="flex items-center justify-center py-6 bg-[var(--sys-surface-lowest)] rounded-xl border border-[var(--sys-outline-variant)]">
            <div
              style={{
                borderRadius: `${outerRadius}px`,
                padding: `${padding}px`,
              }}
              className="bg-[var(--sys-surface-high)] border-2 border-[var(--sys-primary)] transition-all duration-150 shadow-lg"
            >
              <div
                style={{
                  borderRadius: `${innerRadius}px`,
                }}
                className="px-6 py-4 bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-mono text-xs font-bold tabular-nums"
              >
                Inner {innerRadius}px • Outer {outerRadius}px
              </div>
            </div>
          </div>
        </div>

        {/* Motion Curve Choreography */}
        <div className="lg:col-span-6 tonal-card p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--sys-outline-variant)] pb-3.5">
            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--sys-primary)]">
                05.2 // CHOREOGRAPHY CURVES
              </span>
              <h3 className="text-base font-bold text-[var(--sys-on-surface)]">
                Spring vs. Damped Easing Tokens
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setPulseActive((prev) => !prev)}
              className="min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[var(--sys-primary)] text-[var(--sys-on-primary)] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Play size={13} weight="fill" />
              <span>Test Curves</span>
            </button>
          </div>

          <div className="space-y-3">
            {curves.map((c) => (
              <div
                key={c.token}
                className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[var(--sys-primary)]">{c.token}</span>
                  <span className="text-[var(--sys-on-surface-tertiary)]">{c.duration}</span>
                </div>
                <p className="text-xs text-[var(--sys-on-surface-secondary)]">{c.role}</p>
                <div className="h-2 rounded-full bg-[var(--sys-surface-high)] overflow-hidden">
                  <div
                    style={{
                      width: pulseActive ? "100%" : "28%",
                      transition: `width ${c.duration} ${c.bezier}`,
                    }}
                    className="h-full rounded-full bg-[var(--sys-primary)]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--sys-on-surface-secondary)]">
            <CheckCircle size={15} weight="fill" className="text-emerald-400 shrink-0" />
            <span>
              All animations automatically collapse to 0.01ms when{" "}
              <code className="font-mono">prefers-reduced-motion: reduce</code> is active.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
