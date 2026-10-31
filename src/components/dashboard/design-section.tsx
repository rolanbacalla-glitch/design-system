"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { IconPlayground } from '@/components/dashboard/icon-playground';
import { 
  Palette, 
  TextT, 
  Drop, 
  Sparkle, 
  Copy, 
  Check, 
  Intersect,
  Flask,
  Cpu
} from 'phosphor-react';

const ColorSwatch = ({ name, value, description }: { name: string, value: string, description: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative flex flex-col gap-3">
      <div 
        className="w-full aspect-square rounded-2xl border border-white/10 shadow-lg shadow-black/5 flex items-center justify-center relative overflow-hidden group/swatch"
        style={{ backgroundColor: value }}
      >
        <button 
          onClick={handleCopy}
          className="opacity-0 group-hover/swatch:opacity-100 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all hover:scale-110 active:scale-90"
        >
          {copied ? <Check size={16} weight="bold" /> : <Copy size={16} weight="bold" />}
        </button>
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-foreground/80 mb-0.5">{name}</div>
        <div className="text-[10px] font-mono text-foreground/30 truncate">{value}</div>
        <p className="text-[10px] text-foreground/40 mt-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export const DesignSection = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'materials' | 'layout' | 'icons'>('tokens');

  return (
    <section id="design" className="mb-20 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-foreground/5">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3 text-primary">
            <Sparkle size={24} weight="fill" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Design Core / Phase 01</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-foreground font-display">System <span className="text-primary italic">Architecture.</span></h2>
          <p className="text-sm text-foreground/50 leading-relaxed">
            The foundational building blocks of the Antigravity experience. A synthesis of spatial physics, 
            perceptual color theory, and material tactility.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm self-start">
          {[
            { id: 'tokens', label: 'Tokens', icon: Intersect },
            { id: 'materials', label: 'Materials', icon: Flask },
            { id: 'layout', label: 'Layout', icon: TextT },
            { id: 'icons', label: 'Asset Workshop', icon: Palette }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'tokens' | 'materials' | 'layout' | 'icons')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all",
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-foreground/40 hover:text-foreground hover:bg-white/5"
              )}
            >
              <tab.icon size={14} weight="bold" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Content Sections */}
      <div className="min-h-[600px]">
        {activeTab === 'tokens' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Color System */}
            <div className="md:col-span-8 space-y-8">
              <div className="flex items-center gap-3">
                <Palette size={20} weight="duotone" className="text-secondary" />
                <h3 className="text-xl font-bold uppercase tracking-tight">The OKLCH Spectrum</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <ColorSwatch 
                  name="Primary / Liquid Blue" 
                  value="oklch(0.6 0.18 260)" 
                  description="High-vibrancy core for primary actions and spatial depth." 
                />
                <ColorSwatch 
                  name="Secondary / Void Pink" 
                  value="oklch(0.7 0.12 200)" 
                  description="Adaptive accent for secondary UI layers and metadata." 
                />
                <ColorSwatch 
                  name="Accent / Lime Pulse" 
                  value="oklch(0.8 0.15 150)" 
                  description="High-frequency contrast for critical alerts and trends." 
                />
                <ColorSwatch 
                  name="Surface / Deep Void" 
                  value="oklch(0.1 0.01 260)" 
                  description="Foundation layer for all interface materials." 
                />
                <ColorSwatch 
                  name="Emergency / Plasma Red" 
                  value="oklch(0.6 0.22 25)" 
                  description="Saturated critical core for emergency protocols and fatal exceptions." 
                />
                <ColorSwatch 
                  name="Spatial / Electric Violet" 
                  value="oklch(0.6 0.22 310)" 
                  description="Deep spatial accent for tertiary layers and power states." 
                />
                <ColorSwatch 
                  name="Highlight / Solar Gold" 
                  value="oklch(0.85 0.12 85)" 
                  description="Premium highlight for high-value data and milestones." 
                />
                <ColorSwatch 
                  name="Status / Crystal Mint" 
                  value="oklch(0.9 0.08 160)" 
                  description="Stable trend color for positive system health indicators." 
                />
              </div>
            </div>

            {/* Typography Matrix */}
            <div className="md:col-span-4 space-y-8">
              <div className="flex items-center gap-3">
                <TextT size={20} weight="duotone" className="text-primary" />
                <h3 className="text-xl font-bold uppercase tracking-tight">Typing Lab</h3>
              </div>
              <GlassCard className="p-6 space-y-6">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-foreground/20">Display / Outfit</div>
                  <div className="text-3xl font-display leading-tight">Spatial Heading</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-foreground/20">Body / Inter</div>
                  <div className="text-sm text-foreground/60 leading-relaxed">
                    Zero-gravity legibility optimized for complex dashboard layouts and dense monitoring views.
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-foreground/20">Mono / IBM Plex</div>
                  <div className="text-xs font-mono text-primary">v4.2.0-spatial_sync_active</div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
            {[
              { 
                variant: 'mist' as const, 
                title: 'Mist', 
                desc: '8px Blur / 10% Opacity. Optimal for secondary non-modal overlays.',
                icon: Drop
              },
              { 
                variant: 'frost' as const, 
                title: 'Frost', 
                desc: '16px Blur / 15% Opacity. The standard interaction primitive for bento cells.',
                icon: Intersect
              },
              { 
                variant: 'quartz' as const, 
                title: 'Quartz', 
                desc: '24px Blur / 30% Opacity. High-density surface for modal logic and hero containers.',
                icon: Sparkle
              }
            ].map((material) => (
              <div key={material.title} className="space-y-4">
                <GlassCard variant={material.variant} interactable className="h-64 p-8 flex flex-col justify-center items-center text-center gap-4">
                  <material.icon size={48} weight="light" className="text-primary/40 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-2xl font-display">{material.title}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mt-1">Material ID: {material.variant}</p>
                  </div>
                </GlassCard>
                <div className="px-2">
                  <p className="text-xs text-foreground/50 leading-relaxed">{material.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Spacing Scale */}
            <div className="md:col-span-7 space-y-10">
              <div className="flex items-center gap-3">
                <Intersect size={20} weight="duotone" className="text-secondary" />
                <h3 className="text-xl font-bold uppercase tracking-tight">The Spacing Pulse</h3>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'space-1', px: 4 },
                  { label: 'space-2', px: 8 },
                  { label: 'space-4', px: 16 },
                  { label: 'space-6', px: 24 },
                  { label: 'space-8', px: 32 },
                  { label: 'space-12', px: 48 },
                  { label: 'space-16', px: 64 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 group">
                    <div className="w-24 text-[10px] font-mono font-bold text-foreground/30 uppercase">{item.label}</div>
                    <div className="flex-1 flex items-center h-8 relative">
                      <div 
                        className="h-full bg-primary/20 border-r-2 border-primary group-hover:bg-primary/40 transition-all rounded-r"
                        style={{ width: `${item.px}px` }}
                      />
                      <div className="ml-4 text-[10px] font-bold text-foreground/40">{item.px}px <span className="text-foreground/20 ml-2">/ {item.px / 16}rem</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radii & Grid */}
            <div className="md:col-span-5 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <Drop size={20} weight="duotone" className="text-primary" />
                  <h3 className="text-xl font-bold uppercase tracking-tight">Corner Architect</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'xs', val: '4px', class: 'rounded-[4px]' },
                    { label: 'sm', val: '8px', class: 'rounded-[8px]' },
                    { label: 'md', val: '16px', class: 'rounded-[16px]' },
                    { label: 'lg', val: '24px', class: 'rounded-[24px]' },
                    { label: 'xl', val: '32px', class: 'rounded-[32px]' },
                    { label: 'pill', val: 'full', class: 'rounded-full' },
                  ].map((radius) => (
                    <div key={radius.label} className="flex flex-col items-center gap-2">
                      <div className={cn("size-16 bg-white/5 border border-white/10 flex items-center justify-center", radius.class)}>
                        <div className={cn("size-3 bg-primary/20 rounded-sm", radius.class)} />
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] font-bold uppercase text-foreground/80">{radius.label}</div>
                        <div className="text-[9px] font-mono text-foreground/30">{radius.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Cpu size={20} weight="duotone" className="text-accent" />
                  <h3 className="text-xl font-bold uppercase tracking-tight">Grid Mesh</h3>
                </div>
                <GlassCard className="p-1 aspect-video relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 grid grid-cols-12 gap-1 p-1 opacity-20 pointer-events-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-full bg-primary/50 border border-primary/20 rounded-sm" />
                    ))}
                  </div>
                  <div className="relative text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/40 text-center">
                    Universal 12-Column Mesh
                    <div className="text-[8px] mt-1 normal-case font-normal text-foreground/20">Max-Width: 1280px / 7xl</div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'icons' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <IconPlayground />
          </div>
        )}
      </div>

    </section>
  );
};
