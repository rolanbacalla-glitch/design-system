"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SEED_PRESETS, type SeedConfig } from "@/lib/tokens";
import { TOKEN_BUILD_METADATA } from "@/lib/tokens.generated";
import { FloatingCommandBar } from "@/components/workbench/floating-command-bar";
import { TokenEngineSection } from "@/components/workbench/token-engine-section";
import { SurfacesGlassSection } from "@/components/workbench/surfaces-glass-section";
import { TypographySection } from "@/components/workbench/typography-section";
import { ComponentsSection } from "@/components/workbench/components-section";
import { MotionGeometrySection } from "@/components/workbench/motion-geometry-section";
import { ExportCompilerSection } from "@/components/workbench/export-compiler-section";
import { IconPlayground } from "@/components/dashboard/icon-playground";
import {
  DownloadSimple,
  Cube,
  ShieldCheck,
  Swatches,
  ArrowUpRight,
  Sparkle,
  FigmaLogo,
  TerminalWindow,
} from "phosphor-react";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [seed, setSeed] = useState<SeedConfig>(SEED_PRESETS[0]);
  const [activeSection, setActiveSection] = useState<string>("tokens");

  // Sync live seed parameters and theme polarity to root CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
    root.style.setProperty("--seed-hue", String(seed.hue));
    root.style.setProperty("--seed-chroma", String(seed.chroma));
    root.style.setProperty("--seed-secondary-hue", String(seed.secondaryHue));
    root.style.setProperty("--seed-tertiary-hue", String(seed.tertiaryHue));
    root.style.setProperty("--seed-neutral-chroma", String(seed.neutralChroma));
    root.style.setProperty("--seed-radius-scale", String(seed.radiusScale));
  }, [theme, seed]);

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--sys-surface-canvas)] text-[var(--sys-on-surface)] selection:bg-[var(--sys-primary)]/25">
      {/* Z-Level 2: Floating Liquid Glass Navigation & Command Bar */}
      <FloatingCommandBar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        seed={seed}
        onSelectPreset={(preset) => setSeed(preset)}
      />

      {/* Main Content Container */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-28 pb-24 space-y-24">
        {/* Architectural Hero & Portfolio Case Study Header */}
        <section className="tonal-card p-6 sm:p-12 relative overflow-hidden swiss-grid-bg">
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)] font-semibold flex items-center gap-1.5">
                <Sparkle size={13} weight="fill" />
                ANTIGRAVITY DESIGN SYSTEM v{TOKEN_BUILD_METADATA.version}
              </span>
              <span className="px-3 py-1 rounded-full bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-secondary)] border border-[var(--sys-outline-variant)]">
                W3C DTCG 3-Tier Pipeline
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                <ShieldCheck size={14} weight="fill" />
                {TOKEN_BUILD_METADATA.wcagTarget} Verified
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[var(--sys-on-surface)] leading-[1.06]">
              Perceptual OKLCH &{" "}
              <span className="font-serif italic font-normal text-[var(--sys-primary)]">
                Spatial Liquid Glass
              </span>{" "}
              Architecture.
            </h1>

            <p className="text-base sm:text-lg text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
              An enterprise 3-tier design token and component engineering workbench bridging{" "}
              <strong className="text-[var(--sys-on-surface)]">Figma Variables</strong>,{" "}
              <strong className="text-[var(--sys-on-surface)]">Google Stitch (DESIGN.md)</strong>,{" "}
              <strong className="text-[var(--sys-on-surface)]">Google Antigravity</strong>,{" "}
              <strong className="text-[var(--sys-on-surface)]">Cursor</strong>, and{" "}
              <strong className="text-[var(--sys-on-surface)]">Next.js 16 + Tailwind CSS v4</strong>.
            </p>

            {/* Primary Hero Actions (Fully Wired) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectSection("export")}
                className="min-h-[44px] px-6 py-3 rounded-[var(--sys-radius-md)] active:rounded-full bg-[var(--sys-primary)] text-[var(--sys-on-primary)] text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-lg cursor-pointer transition-all hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sys-primary)]"
              >
                <DownloadSimple size={18} weight="bold" />
                <span>Export System Assets</span>
              </button>

              <Link
                href="/components/form-field"
                className="min-h-[44px] px-6 py-3 rounded-[var(--sys-radius-md)] bg-[var(--sys-surface-high)] hover:bg-[var(--sys-surface-highest)] text-[var(--sys-on-surface)] border border-[var(--sys-outline)] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sys-primary)]"
              >
                <Cube size={18} className="text-[var(--sys-primary)]" />
                <span>Interactive Component Portal</span>
                <ArrowUpRight size={15} />
              </Link>

              <Link
                href="/components/modal-dialog"
                className="min-h-[44px] px-4 py-3 rounded-[var(--sys-radius-md)] bg-[var(--sys-surface-low)] hover:bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] border border-[var(--sys-outline-variant)] text-xs font-mono inline-flex items-center gap-1.5 transition-all"
              >
                <span>/components/modal-dialog</span>
                <ArrowUpRight size={13} />
              </Link>

              <Link
                href="/components/data-table"
                className="min-h-[44px] px-4 py-3 rounded-[var(--sys-radius-md)] bg-[var(--sys-surface-low)] hover:bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] border border-[var(--sys-outline-variant)] text-xs font-mono inline-flex items-center gap-1.5 transition-all"
              >
                <span>/components/data-table</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* Architectural Telemetry Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[var(--sys-outline-variant)] font-mono tabular-nums">
              <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)]">
                <div className="text-[10px] uppercase text-[var(--sys-on-surface-tertiary)] flex items-center gap-1.5">
                  <Swatches size={13} className="text-[var(--sys-primary)]" />
                  Compiled Tokens
                </div>
                <div className="text-xl font-bold text-[var(--sys-on-surface)] mt-1">
                  {TOKEN_BUILD_METADATA.tier1Count +
                    TOKEN_BUILD_METADATA.tier2Count +
                    TOKEN_BUILD_METADATA.tier3Count}{" "}
                  <span className="text-xs font-normal text-[var(--sys-primary)]">3-Tier</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)]">
                <div className="text-[10px] uppercase text-[var(--sys-on-surface-tertiary)] flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  Primary Contrast
                </div>
                <div className="text-xl font-bold text-[var(--sys-on-surface)] mt-1">
                  16.2:1 <span className="text-xs font-normal text-emerald-400">AAA</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)]">
                <div className="text-[10px] uppercase text-[var(--sys-on-surface-tertiary)] flex items-center gap-1.5">
                  <FigmaLogo size={13} className="text-[var(--sys-primary)]" />
                  Token Format
                </div>
                <div className="text-xl font-bold text-[var(--sys-on-surface)] mt-1">
                  W3C <span className="text-xs font-normal text-[var(--sys-on-surface-secondary)]">DTCG</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)]">
                <div className="text-[10px] uppercase text-[var(--sys-on-surface-tertiary)] flex items-center gap-1.5">
                  <TerminalWindow size={13} className="text-[var(--sys-primary)]" />
                  Platform Sync
                </div>
                <div className="text-xl font-bold text-[var(--sys-on-surface)] mt-1">
                  5 <span className="text-xs font-normal text-[var(--sys-on-surface-secondary)]">Targets</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 01 // 3-Tier OKLCH Token Engine */}
        <TokenEngineSection seed={seed} onChangeSeed={setSeed} theme={theme} />

        {/* 02 // Z-Axis Spatial Discipline: Tonal Surfaces vs. Liquid Glass */}
        <SurfacesGlassSection theme={theme} />

        {/* 03 // M3 Emphasized Typography & Tabular Numerals */}
        <TypographySection />

        {/* 04 // Interactive Component Primitive Matrix + Portal Deep Links */}
        <ComponentsSection />

        {/* 05 // Spring Physics & Concentric Radii Geometry */}
        <MotionGeometrySection />

        {/* 06 // Optical Iconography Studio */}
        <IconPlayground />

        {/* 07 // Live Multi-Platform Exporter (Tailwind v4, Figma DTCG, Stitch DESIGN.md, Cursor) */}
        <ExportCompilerSection seed={seed} />
      </main>
    </div>
  );
}
