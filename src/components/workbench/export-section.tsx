"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  generateTailwindV4Export,
  generateW3CTokensJSON,
  generateDesignMdExport,
  type SeedConfig,
} from "@/lib/tokens";
import { Copy, Check, DownloadSimple, FileCode } from "phosphor-react";

export const ExportSection: React.FC<{ seed: SeedConfig }> = ({ seed }) => {
  const [format, setFormat] = useState<"tailwind" | "w3c" | "designmd">("tailwind");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (format === "tailwind") return generateTailwindV4Export(seed);
    if (format === "w3c") return generateW3CTokensJSON(seed);
    return generateDesignMdExport(seed);
  }, [format, seed]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = () => {
    const filename =
      format === "tailwind"
        ? "globals.css"
        : format === "w3c"
          ? "tokens.w3c.json"
          : "DESIGN.md";
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="export" className="scroll-mt-24 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--sys-outline-variant)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[var(--sys-primary)]">
            <span>07 // SPECIFICATION & TOKEN COMPILER</span>
            <span className="text-[var(--sys-on-surface-quaternary)]">•</span>
            <span>TAILWIND V4 / W3C DTCG / DESIGN.MD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sys-on-surface)]">
            Live Token &{" "}
            <span className="font-serif italic font-normal text-[var(--sys-primary)]">
              Specification Compiler
            </span>
          </h2>
          <p className="text-sm text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
            Every adjustment you make in Section 01 (`{seed.name}`, Hue `{seed.hue}°`, Chroma `
            {seed.chroma}`) compiles automatically into production-ready CSS, W3C Design Tokens
            JSON, or an agent-ready `DESIGN.md` artifact.
          </p>
        </div>

        {/* Format Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--sys-surface-low)] border border-[var(--sys-outline-variant)] self-start">
          {[
            { id: "tailwind", label: "Tailwind v4 CSS" },
            { id: "w3c", label: "W3C Tokens JSON" },
            { id: "designmd", label: "DESIGN.md Spec" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFormat(tab.id as "tailwind" | "w3c" | "designmd")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer",
                format === tab.id
                  ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-semibold"
                  : "text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code Viewer Box */}
      <div className="tonal-card overflow-hidden">
        <div className="px-5 py-3.5 bg-[var(--sys-surface-container)] border-b border-[var(--sys-outline-variant)] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--sys-on-surface-secondary)]">
            <FileCode size={16} className="text-[var(--sys-primary)]" />
            <span>
              {format === "tailwind"
                ? "src/app/globals.css"
                : format === "w3c"
                  ? "design-tokens.w3c.json"
                  : "DESIGN.md"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[var(--sys-surface-high)] hover:bg-[var(--sys-surface-highest)] border border-[var(--sys-outline)] text-xs font-mono text-[var(--sys-on-surface)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Output</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-[var(--sys-primary)] text-[var(--sys-on-primary)] text-xs font-mono font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <DownloadSimple size={14} weight="bold" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        <pre className="p-6 bg-[var(--sys-surface-lowest)] font-mono text-xs text-[var(--sys-on-surface)] overflow-x-auto leading-relaxed max-h-[420px]">
          <code>{output}</code>
        </pre>
      </div>
    </section>
  );
};
