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
  List,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      } else if (e.key === "Escape") {
        setCommandOpen(false);
        setMobileMenuOpen(false);
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
      {/* Z-Level 2: Unified Floating Liquid Glass Top Navbar (Travel-Kin Pattern) */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        <nav
          aria-label="Main navigation"
          className={cn(
            "max-w-[1400px] mx-auto pointer-events-auto rounded-2xl liquid-glass-regular transition-[background,box-shadow,backdrop-filter,padding,border-color] duration-300",
            isScrolled
              ? "px-4 sm:px-6 py-2.5 shadow-2xl border-[var(--sys-outline)]"
              : "px-4 sm:px-6 py-3.5 shadow-xl"
          )}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Brand + Architectural Badge */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Antigravity Design System — scroll to top"
              className="flex items-center gap-3 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--border-focus-ring)] rounded-lg"
            >
              <div className="w-7 h-7 rounded-full bg-[var(--sys-primary)] flex items-center justify-center text-[var(--sys-on-primary)] font-mono text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-[var(--sys-on-surface)]">
                  ANTIGRAVITY
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--sys-surface-high)]/70 text-[var(--sys-on-surface-secondary)] border border-[var(--sys-outline-variant)]">
                  v2.4 SPEC
                </span>
              </div>
            </button>

            {/* Center Navigation Links inside the Unified Glass Bar */}
            <div className="hidden lg:flex items-center gap-1">
              {WORKBENCH_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => onSelectSection(sec.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--border-focus-ring)]",
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
            </div>

            {/* Right Utility Controls: Seed Indicator + Command Palette + Polarity Switch + Mobile Toggle */}
            <div className="flex items-center gap-2">
              {/* Active Seed Indicator */}
              <button
                type="button"
                onClick={() => onSelectSection("tokens")}
                title="Configure OKLCH Seed Tokens"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-[var(--sys-surface-high)]/50 hover:bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] border border-[var(--sys-outline-variant)] transition-colors cursor-pointer"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/30"
                  style={{ backgroundColor: "var(--sys-primary)" }}
                />
                <span className="font-mono text-[11px] tabular-nums">{seed.hue}°</span>
              </button>

              {/* Command K Trigger */}
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-[var(--sys-surface-high)]/60 hover:bg-[var(--sys-surface-highest)] text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] border border-[var(--sys-outline-variant)] transition-colors cursor-pointer"
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
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "Alabaster Light" : "Obsidian Dark"} mode`}
                title="Toggle Theme Polarity (Shortcut: T)"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)] border border-[var(--sys-outline-variant)] shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
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

              {/* Mobile Navigation Drawer Toggle */}
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden p-2 rounded-xl text-[var(--sys-on-surface)] hover:bg-[var(--sys-surface-high)]/60 border border-[var(--sys-outline-variant)] transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X size={18} /> : <List size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Expandable Glass Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-[var(--sys-outline-variant)] grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {WORKBENCH_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                const Icon = sec.icon;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      onSelectSection(sec.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 text-left transition-all cursor-pointer",
                      isActive
                        ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-semibold shadow-sm"
                        : "text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] hover:bg-[var(--sys-surface-high)]/50"
                    )}
                  >
                    <Icon size={14} />
                    <span className="font-mono text-[10px] opacity-70 tabular-nums">{sec.index}</span>
                    <span className="truncate">{sec.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </nav>
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
