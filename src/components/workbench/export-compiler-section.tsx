"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  generateTailwindV4Export,
  generateW3CTokensJSON,
  generateDesignMdExport,
  type SeedConfig,
} from "@/lib/tokens";
import {
  Copy,
  Check,
  DownloadSimple,
  FigmaLogo,
  Sparkle,
  TerminalWindow,
  FileCode,
} from "phosphor-react";
import { useToast } from "@/components/ui/toast-provider";

interface ExportCompilerSectionProps {
  seed: SeedConfig;
}

type ExportTarget = "tailwind" | "figma" | "stitch" | "cursor";

export const ExportCompilerSection: React.FC<ExportCompilerSectionProps> = ({ seed }) => {
  const [activeTarget, setActiveTarget] = useState<ExportTarget>("tailwind");
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const cursorRulesPreview = useMemo(
    () => `---
description: Antigravity Design System (${seed.name}) — AI Coding Agent Guardrails
globs: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.css", "tokens/**/*.json"]
alwaysApply: true
---

# Antigravity Multi-Platform Agent Rules (Cursor & Google Antigravity)
- Active Preset: ${seed.name} (Hue: ${seed.hue}°, Chroma: ${seed.chroma}, Radius Scale: ${seed.radiusScale}x)
- Next.js 16.2+ App Router: dynamic route params are Promises and must be awaited.
- Tailwind CSS v4: bind strictly to Tier-2 Semantic Tokens (--bg-action-primary, --sys-primary, --text-primary, --text-feedback-error).
- Z-Axis Spatial Discipline:
  - Z-Level 1 (.tonal-card): Content cards & data tables (NO backdrop blur).
  - Z-Level 2 (.liquid-glass-regular): Floating navbars, command bars & modals ONLY.
- WCAG 2.2 AA: Minimum 4.5:1 text contrast, 2px solid --border-focus-ring with 2px offset, >= 24x24px hit targets.`,
    [seed]
  );

  const exportOutputs: Record<
    ExportTarget,
    { label: string; filename: string; platform: string; code: string }
  > = useMemo(
    () => ({
      tailwind: {
        label: "Tailwind v4 + CSS Vars",
        filename: "src/styles/tokens.generated.css",
        platform: "Next.js 16 + Tailwind CSS v4",
        code: generateTailwindV4Export(seed),
      },
      figma: {
        label: "Figma Variables (DTCG)",
        filename: "public/exports/figma-variables.tokens.json",
        platform: "Figma Variables & Tokens Studio",
        code: generateW3CTokensJSON(seed),
      },
      stitch: {
        label: "Google Stitch (DESIGN.md)",
        filename: "DESIGN.md",
        platform: "Google Stitch (@google/design.md)",
        code: generateDesignMdExport(seed),
      },
      cursor: {
        label: "Antigravity & Cursor Rules",
        filename: ".cursor/rules/design-system.mdc",
        platform: "Google Antigravity & Cursor IDE",
        code: cursorRulesPreview,
      },
    }),
    [seed, cursorRulesPreview]
  );

  const current = exportOutputs[activeTarget];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    showToast(`Copied ${current.label} to clipboard`);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = () => {
    const blob = new Blob([current.code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = current.filename.split("/").pop() || "tokens.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="export" className="scroll-mt-24 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--sys-outline-variant)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[var(--sys-primary)]">
            <span>07 // EXPORT & HANDOFF</span>
            <span className="text-[var(--sys-on-surface-quaternary)]">•</span>
            <span>FIGMA + STITCH + ANTIGRAVITY + CURSOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sys-on-surface)]">
            Export Your Theme for{" "}
            <span className="font-serif italic font-normal text-[var(--sys-primary)]">
              Code, Figma & AI
            </span>
          </h2>
          <p className="text-sm text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
            Every colour and corner adjustment you make above updates these files live. Copy or
            download ready-to-use files for Tailwind CSS v4, Figma Variables, Google Stitch{" "}
            <code className="font-mono">DESIGN.md</code>, and AI coding assistants.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/exports/figma-variables.tokens.json"
            download="figma-variables.tokens.json"
            className="min-h-[40px] px-4 py-2 rounded-[var(--sys-radius-md)] bg-[var(--sys-surface-high)] hover:bg-[var(--sys-surface-highest)] text-[var(--sys-on-surface)] border border-[var(--sys-outline)] text-xs font-mono font-semibold inline-flex items-center gap-2"
          >
            <DownloadSimple size={15} />
            <span>Download Figma Tokens</span>
          </a>
        </div>
      </div>

      <div className="tonal-card overflow-hidden">
        {/* Platform Target Tabs */}
        <div className="p-4 bg-[var(--sys-surface-container)] border-b border-[var(--sys-outline-variant)] flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" aria-label="Export Platform Target" className="flex flex-wrap gap-2">
            {[
              { id: "tailwind" as const, label: "Tailwind v4 CSS", icon: FileCode },
              { id: "figma" as const, label: "Figma Variables (DTCG)", icon: FigmaLogo },
              { id: "stitch" as const, label: "Google Stitch (DESIGN.md)", icon: Sparkle },
              { id: "cursor" as const, label: "Antigravity / Cursor Rules", icon: TerminalWindow },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTarget === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setActiveTarget(tab.id)}
                  className={cn(
                    "min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-2 cursor-pointer transition-all",
                    active
                      ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-semibold shadow-sm"
                      : "bg-[var(--sys-surface-low)] text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] border border-[var(--sys-outline-variant)]"
                  )}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--sys-surface-low)] hover:bg-[var(--sys-surface-high)] text-[var(--sys-on-surface)] border border-[var(--sys-outline)] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <DownloadSimple size={14} />
              <span>Save File</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[var(--sys-primary)] text-[var(--sys-on-primary)] inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : "Copy Output"}</span>
            </button>
          </div>
        </div>

        {/* Metadata Bar */}
        <div className="px-6 py-2.5 bg-[var(--sys-surface-lowest)] border-b border-[var(--sys-outline-variant)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--sys-on-surface-tertiary)]">
          <span>
            Target Path: <strong className="text-[var(--sys-on-surface)]">{current.filename}</strong>
          </span>
          <span>
            Platform: <strong className="text-[var(--sys-primary)]">{current.platform}</strong>
          </span>
        </div>

        {/* Code Output Well */}
        <pre className="p-6 bg-[var(--sys-surface-lowest)] text-xs font-mono text-[var(--sys-on-surface)] overflow-x-auto leading-relaxed max-h-[460px]">
          <code>{current.code}</code>
        </pre>
      </div>
    </section>
  );
};
