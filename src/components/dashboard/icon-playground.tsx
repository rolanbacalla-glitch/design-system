"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import * as Icons from "phosphor-react";

type IconWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
type PhosphorIconComponent = React.ComponentType<Icons.IconProps>;

export const IconPlayground: React.FC = () => {
  const [selectedIconName, setSelectedIconName] = useState("Cube");
  const [searchQuery, setSearchQuery] = useState("");
  const [size, setSize] = useState(56);
  const [weight, setWeight] = useState<IconWeight>("regular");
  const [showKeylines, setShowKeylines] = useState(true);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const ALL_ICONS = useMemo(() => {
    return Object.entries(Icons)
      .filter(
        ([name, Icon]) =>
          typeof Icon !== "string" &&
          name !== "IconContext" &&
          name !== "Icons" &&
          /^[A-Z]/.test(name)
      )
      .map(([name, Icon]) => ({ name, icon: Icon as unknown as PhosphorIconComponent }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredIcons = useMemo(() => {
    if (!searchQuery) return ALL_ICONS.slice(0, 48);
    return ALL_ICONS.filter((icon) =>
      icon.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 48);
  }, [searchQuery, ALL_ICONS]);

  const SelectedIcon = useMemo(() => {
    const item = ALL_ICONS.find((i) => i.name === selectedIconName);
    return item?.icon || Icons.Cube;
  }, [selectedIconName, ALL_ICONS]);

  const handleCopy = (type: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1600);
  };

  const exports = {
    react: `<${selectedIconName} size={${size}} weight="${weight}" className="text-[var(--sys-primary)]" />`,
    tokenCss: `.icon-${selectedIconName.toLowerCase()} {\n  width: ${size}px;\n  height: ${size}px;\n  color: var(--sys-primary);\n}`,
  };

  return (
    <section id="icons" className="scroll-mt-24 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--sys-outline-variant)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[var(--sys-primary)]">
            <span>06 // ICONS & SYMBOLS</span>
            <span className="text-[var(--sys-on-surface-quaternary)]">•</span>
            <span>6 STROKE WEIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sys-on-surface)]">
            Icon Library &{" "}
            <span className="font-serif italic font-normal text-[var(--sys-primary)]">
              Live Customizer
            </span>
          </h2>
          <p className="text-sm text-[var(--sys-on-surface-secondary)] max-w-3xl leading-relaxed">
            Search over 1,200 icons, preview 6 stroke weights (<code className="font-mono">thin</code>{" "}
            to <code className="font-mono">duotone</code>), check alignment guides, and copy
            ready-to-use React code.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 4 Cols: Optical Keyline Inspector & Weight Controls */}
          <div className="lg:col-span-4 tonal-card p-6 flex flex-col justify-between space-y-6">
            {/* Keyline Preview Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase text-[var(--sys-primary)]">
                  Icon Preview
                </span>
                <button
                  onClick={() => setShowKeylines(!showKeylines)}
                  className="font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--sys-surface-high)] text-[var(--sys-on-surface-secondary)] hover:text-[var(--sys-on-surface)] cursor-pointer"
                >
                  Guides: {showKeylines ? "ON" : "OFF"}
                </button>
              </div>

              <div className="relative h-56 rounded-2xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] flex items-center justify-center overflow-hidden">
                {showKeylines && (
                  <>
                    <div className="absolute inset-0 swiss-grid-bg opacity-60 pointer-events-none" />
                    {/* Keyline Circle & Square Guides */}
                    <div className="absolute w-32 h-32 rounded-full border border-dashed border-[var(--sys-primary)]/35 pointer-events-none" />
                    <div className="absolute w-28 h-28 border border-[var(--sys-primary)]/25 pointer-events-none" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--sys-primary)]/25 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--sys-primary)]/25 pointer-events-none" />
                  </>
                )}

                <SelectedIcon
                  size={size}
                  weight={weight}
                  className="text-[var(--sys-primary)] relative z-10 transition-all duration-150"
                />

                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between font-mono text-[10px] text-[var(--sys-on-surface-tertiary)]">
                  <span>{selectedIconName}</span>
                  <span className="tabular-nums">
                    {size}×{size}px • {weight}
                  </span>
                </div>
              </div>
            </div>

            {/* Weight Matrix */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-[var(--sys-on-surface-secondary)]">
                Stroke Weight
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["thin", "light", "regular", "bold", "fill", "duotone"] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={cn(
                      "py-2 px-2.5 rounded-lg text-xs font-mono capitalize border transition-all cursor-pointer",
                      weight === w
                        ? "bg-[var(--sys-primary)] text-[var(--sys-on-primary)] border-[var(--sys-primary)] font-semibold"
                        : "bg-[var(--sys-surface-lowest)] text-[var(--sys-on-surface-secondary)] border-[var(--sys-outline-variant)] hover:text-[var(--sys-on-surface)]"
                    )}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Optical Size Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--sys-on-surface-secondary)]">Icon Size</span>
                <span className="font-mono font-bold text-[var(--sys-primary)] tabular-nums">
                  {size}px
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={112}
                step={4}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="precision-slider"
              />
            </div>

            {/* Export Buttons */}
            <div className="space-y-2 pt-2 border-t border-[var(--sys-outline-variant)]">
              <button
                onClick={() => handleCopy("react", exports.react)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-[var(--sys-surface-lowest)] hover:bg-[var(--sys-surface-high)] border border-[var(--sys-outline-variant)] flex items-center justify-between text-xs font-mono text-[var(--sys-on-surface)] transition-colors cursor-pointer"
              >
                <span className="truncate pr-2">{exports.react}</span>
                {copiedType === "react" ? (
                  <Icons.Check size={14} className="text-emerald-400 shrink-0" />
                ) : (
                  <Icons.Copy size={14} className="text-[var(--sys-on-surface-tertiary)] shrink-0" />
                )}
              </button>
            </div>
          </div>

          {/* Right 8 Cols: Searchable Glyph Browser */}
          <div className="lg:col-span-8 tonal-card p-6 flex flex-col justify-between space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--sys-outline-variant)] pb-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--sys-on-surface)]">
                  Browse Icons ({ALL_ICONS.length} Available)
                </h3>
                <p className="text-xs text-[var(--sys-on-surface-tertiary)]">
                  Click any icon to preview its stroke weights and copy the code.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Icons.MagnifyingGlass
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sys-on-surface-tertiary)]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search icons (e.g. Sparkle, Heart)..."
                  className="w-full pl-8 pr-8 py-2 rounded-xl bg-[var(--sys-surface-lowest)] border border-[var(--sys-outline-variant)] focus:border-[var(--sys-primary)] text-xs text-[var(--sys-on-surface)] outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--sys-on-surface-tertiary)] hover:text-[var(--sys-on-surface)]"
                  >
                    <Icons.X size={12} />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {filteredIcons.map((item) => {
                const Icon = item.icon;
                const active = selectedIconName === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setSelectedIconName(item.name)}
                    className={cn(
                      "p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer",
                      active
                        ? "bg-[var(--sys-primary-container)] text-[var(--sys-on-primary-container)] border-[var(--sys-primary)] shadow-xs"
                        : "bg-[var(--sys-surface-lowest)] text-[var(--sys-on-surface-secondary)] border-[var(--sys-outline-variant)] hover:border-[var(--sys-outline)] hover:text-[var(--sys-on-surface)]"
                    )}
                    title={item.name}
                  >
                    <Icon size={22} weight={active ? weight : "regular"} />
                    <span className="font-mono text-[9px] truncate w-full text-center opacity-75">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
    </section>
  );
};
