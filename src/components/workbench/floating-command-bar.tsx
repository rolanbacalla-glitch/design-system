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
  { id: "tokens", index: "01", label: "Colours", title: "Adaptive Colour Palettes & Themes", icon: Swatches },
  { id: "surfaces", index: "02", label: "Surfaces", title: "Clean Cards & Frosted Glass", icon: Stack },
  { id: "typography", index: "03", label: "Typography", title: "Readable Type & Live Numbers", icon: TextT },
  { id: "components", index: "04", label: "Components", title: "Interactive UI Building Blocks", icon: Cube },
  { id: "motion", index: "05", label: "Motion", title: "Smooth Animation & Rounded Corners", icon: Waves },
  { id: "icons", index: "06", label: "Icons", title: "Icon Library & Customiser", icon: Sparkle },
  { id: "export", index: "07", label: "Export", title: "Export for Code, Figma & AI", icon: Code },
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
      {/* Subtle top viewport mask so scrolling content fades smoothly above the floating glass bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 h-6 bg-gradient-to-b from-[var(--sys-surface-canvas)]/90 to-transparent pointer-events-none z-40"
      />

      {/* Z-Level 2: Unified Floating Frosted Glass Top Navbar (Travel-Kin Pattern) */}
      <nav
        aria-label="Main navigation"
        style={{
          backdropFilter: "blur(40px) saturate(190%)",
          WebkitBackdropFilter: "blur(40px) saturate(190%)",
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 mx-4 sm:mx-6 mt-3 sm:mt-4 rounded-2xl liquid-glass-regular backdrop-blur-2xl transition-[padding,box-shadow,border-color] duration-300",
          isScrolled
            ? "px-4 sm:px-6 py-2.5 shadow-2xl border-[var(--sys-outline)]"
            : "px-4 sm:px-6 py-3.5 shadow-xl"
        )}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3">
          {/* Brand + Version Badge */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Antigravity Design System — back to top"
            className="flex items-center gap-3 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--border-focus-ring)] rounded-lg"
          >
            <div className="w-7 h-7 rounded-full bg-[var(--sys-primary)] flex items-center justify-center text-[var(--sys-on-primary)] font-mono text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-[var(--sys-on-surface)]">
                Antigravity
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--sys-surface-high)]/80 text-[var(--sys-on-surface-secondary)] border border-[var(--sys-outline-variant)]">
                v2.4
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
                    "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--border-focus-ring)]",
                    isActive
                      ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] font-semibold shadow-sm"
                      : "text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] hover:bg-[var(--sys-surface-high)]/60"
                  )}
                >
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Utility Controls: Theme Color + Search + Light/Dark Switch + Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Active Theme Colour Indicator */}
            <button
              type="button"
              onClick={() => onSelectSection("tokens")}
              title="Customise Theme Colour"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-[var(--sys-surface-high)]/60 hover:bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] border border-[var(--sys-outline-variant)] transition-colors cursor-pointer"
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/30"
                style={{ backgroundColor: "var(--sys-primary)" }}
              />
              <span className="text-[11px] font-medium">{seed.name.split(" ")[0]}</span>
            </button>

            {/* Quick Search Trigger */}
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-[var(--sys-surface-high)]/70 hover:bg-[var(--sys-surface-highest)] text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] border border-[var(--sys-outline-variant)] transition-colors cursor-pointer"
              aria-label="Open Quick Search"
            >
              <MagnifyingGlass size={13} weight="bold" />
              <span className="hidden md:inline text-[11px]">Search</span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--sys-surface-lowest)]/70 text-[var(--sys-on-surface-tertiary)]">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
              title="Switch between Dark and Light mode (Shortcut: T)"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)] border border-[var(--sys-outline-variant)] shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              {theme === "dark" ? (
                <>
                  <Moon size={14} weight="fill" />
                  <span className="hidden sm:inline text-[11px]">Dark</span>
                </>
              ) : (
                <>
                  <Sun size={14} weight="fill" />
                  <span className="hidden sm:inline text-[11px]">Light</span>
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
          <div className="max-w-[1400px] mx-auto lg:hidden mt-3 pt-3 border-t border-[var(--sys-outline-variant)] grid grid-cols-2 sm:grid-cols-3 gap-1.5">
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
                  <span className="truncate">{sec.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Z-Level 2: Quick Search & Theme Switcher Modal */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center pt-24 px-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setCommandOpen(false)}
        >
          <div
            style={{
              backdropFilter: "blur(40px) saturate(190%)",
              WebkitBackdropFilter: "blur(40px) saturate(190%)",
            }}
            className="liquid-glass-regular backdrop-blur-2xl w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
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
                placeholder="Search sections, switch colour themes, or toggle dark mode..."
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
                  Design System Sections
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
                          <Icon size={16} className="text-[var(--sys-primary)]" />
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
                  Colour Theme Presets
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
                        {preset.hue}°
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[var(--sys-outline-variant)] bg-[var(--sys-surface-lowest)]/40 flex items-center justify-between text-[11px] text-[var(--sys-on-surface-tertiary)] font-mono">
              <span>Press [T] anywhere to switch Dark / Light mode</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
