"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SEED_PRESETS, type SeedConfig } from "@/lib/tokens";
import {
  Sun,
  Moon,
  Command,
  MagnifyingGlass,
  Swatches,
  Stack,
  TextT,
  Cube,
  Waves,
  Sparkle,
  Code,
  ArrowRight,
  X,
} from "phosphor-react";

export interface WorkbenchNavProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  seed: SeedConfig;
  onSelectPreset: (preset: SeedConfig) => void;
}

export const WORKBENCH_SECTIONS = [
  { id: "tokens", index: "01", label: "Tokens", title: "3-Tier OKLCH Token Engine", icon: Swatches },
  { id: "surfaces", index: "02", label: "Surfaces & Glass", title: "Tonal Depth vs. Liquid Glass", icon: Stack },
  { id: "typography", index: "03", label: "Typography", title: "M3 Emphasized Scale & Metrics", icon: TextT },
  { id: "components", index: "04", label: "Components", title: "Interactive Primitive Matrix", icon: Cube },
  { id: "motion", index: "05", label: "Motion & Geometry", title: "Spring Physics & Concentric Radii", icon: Waves },
  { id: "icons", index: "06", label: "Icons", title: "Optical Iconography Studio", icon: Sparkle },
  { id: "export", index: "07", label: "Export", title: "Live Spec & Code Compiler", icon: Code },
] as const;

export const FloatingCommandBar: React.FC<WorkbenchNavProps> = ({
  activeSection,
  onSelectSection,
  theme,
  onToggleTheme,
  seed,
  onSelectPreset,
}) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      } else if (
        e.key.toLowerCase() === "t" &&
        !commandOpen &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        onToggleTheme();
      } else if (e.key === "Escape" && commandOpen) {
        setCommandOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commandOpen, onToggleTheme]);

  const filteredSections = WORKBENCH_SECTIONS.filter(
    (s) =>
      s.label.toLowerCase().includes(query.toLowerCase()) ||
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.index.includes(query)
  );

  const filteredPresets = SEED_PRESETS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Z-Level 2: Floating Liquid Glass Header Chrome */}
      <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3">
          {/* Brand + Architectural Badge */}
          <div className="liquid-glass-regular pointer-events-auto rounded-full px-4 py-2 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--sys-primary)] flex items-center justify-center text-[var(--sys-on-primary)] font-mono text-xs font-bold shadow-sm">
              A
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs tracking-tight text-[var(--sys-on-surface)]">
                ANTIGRAVITY
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-secondary)] border border-[var(--sys-outline-variant)]">
                v2.4 SPEC
              </span>
            </div>
          </div>

          {/* Center Navigation Pill — True Liquid Glass Control Layer */}
          <nav
            aria-label="Design System Sections"
            className="liquid-glass-regular pointer-events-auto hidden xl:flex items-center gap-1 p-1.5 rounded-full"
          >
            {WORKBENCH_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => onSelectSection(sec.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer",
                    isActive
                      ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-semibold shadow-sm"
                      : "text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] hover:bg-[var(--sys-surface-high)]/50"
                  )}
                >
                  <span className="font-mono text-[10px] opacity-65 tabular-nums">{sec.index}</span>
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Utility Controls: Command Palette + Theme Polarity Switch */}
          <div className="liquid-glass-regular pointer-events-auto rounded-full p-1.5 flex items-center gap-1.5">
            {/* Active Seed Indicator */}
            <button
              onClick={() => onSelectSection("tokens")}
              title="Configure OKLCH Seed Tokens"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] hover:bg-[var(--sys-surface-high)]/60 transition-colors cursor-pointer"
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/30"
                style={{ backgroundColor: "var(--sys-primary)" }}
              />
              <span className="font-mono text-[11px] tabular-nums">{seed.hue}°</span>
            </button>

            {/* Command K Trigger */}
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-[var(--sys-surface-high)]/70 hover:bg-[var(--sys-surface-highest)] text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] border border-[var(--sys-outline-variant)] transition-colors cursor-pointer"
              aria-label="Open Command Menu"
            >
              <MagnifyingGlass size={13} weight="bold" />
              <span className="hidden md:inline text-[11px]">Jump...</span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--sys-surface-lowest)]/60 text-[var(--sys-on-surface-tertiary)]">
                ⌘K
              </kbd>
            </button>

            {/* Obsidian Dark / Alabaster Light Switcher */}
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "Alabaster Light" : "Obsidian Dark"} mode`}
              title="Toggle Theme Polarity (Shortcut: T)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)] hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              {theme === "dark" ? (
                <>
                  <Moon size={14} weight="fill" />
                  <span className="hidden sm:inline text-[11px]">Obsidian</span>
                </>
              ) : (
                <>
                  <Sun size={14} weight="fill" />
                  <span className="hidden sm:inline text-[11px]">Alabaster</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Z-Level 2: Command Palette Modal */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center pt-24 px-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="liquid-glass-regular w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--sys-outline-variant)]">
              <Command size={18} className="text-[var(--sys-primary)]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section, apply OKLCH seed preset, or toggle polarity..."
                className="flex-1 bg-transparent text-sm text-[var(--sys-on-surface)] placeholder:text-[var(--sys-on-surface-tertiary)] outline-none"
              />
              <button
                onClick={() => setCommandOpen(false)}
                className="p-1 rounded-lg text-[var(--sys-on-surface-tertiary)] hover:text-[var(--sys-on-surface)]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
              {/* Sections */}
              <div>
                <div className="px-2.5 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--sys-on-surface-tertiary)]">
                  Architecture & Documentation Sections
                </div>
                <div className="space-y-1">
                  {filteredSections.map((sec) => {
                    const Icon = sec.icon;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => {
                          onSelectSection(sec.id);
                          setCommandOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[var(--sys-surface-high)]/80 text-left transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[var(--sys-primary)] tabular-nums">
                            {sec.index}
                          </span>
                          <Icon size={16} className="text-[var(--sys-on-surface-secondary)]" />
                          <div>
                            <div className="text-xs font-semibold text-[var(--sys-on-surface)]">
                              {sec.label}
                            </div>
                            <div className="text-[11px] text-[var(--sys-on-surface-tertiary)]">
                              {sec.title}
                            </div>
                          </div>
                        </div>
                        <ArrowRight
                          size={14}
                          className="text-[var(--sys-on-surface-tertiary)] group-hover:text-[var(--sys-primary)] group-hover:translate-x-0.5 transition-all"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Presets */}
              <div>
                <div className="px-2.5 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--sys-on-surface-tertiary)]">
                  OKLCH Perceptual Seed Presets
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {filteredPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        onSelectPreset(preset);
                        setCommandOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[var(--sys-surface-high)]/80 border border-transparent hover:border-[var(--sys-outline-variant)] text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/25"
                          style={{
                            backgroundColor: `oklch(0.65 ${preset.chroma} ${preset.hue})`,
                          }}
                        />
                        <span className="text-xs font-medium text-[var(--sys-on-surface)]">
                          {preset.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--sys-on-surface-tertiary)] tabular-nums">
                        H:{preset.hue}° C:{preset.chroma}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[var(--sys-outline-variant)] bg-[var(--sys-surface-lowest)]/40 flex items-center justify-between text-[11px] text-[var(--sys-on-surface-tertiary)] font-mono">
              <span>Press [T] anywhere to toggle Obsidian Dark / Alabaster Light</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
