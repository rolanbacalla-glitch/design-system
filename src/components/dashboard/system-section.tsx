"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { ResourceLattice } from '@/components/ui/resource-lattice';
import { FluidGauge } from '@/components/ui/fluid-gauge';
import { 
  Globe, 
  ShieldCheck, 
  Activity, 
  Plugs, 
  Clock, 
  WifiHigh,
  Terminal,
  Warning
} from 'phosphor-react';
import { gsap } from 'gsap';

const LOG_POOL = [
  "INTC: Out of bounds memory access prevented",
  "SYSC: Node us-east-1a successfully synced",
  "OKLCH: Perceptual gamut mapping optimized",
  "GPGPU: Shader pre-compilation complete",
  "AUTH: Spatial gate handshake [SUCCESS]",
  "NET: WebSocket pulse latency < 4ms",
  "KERN: Garbage collection cycle [0.12ms]",
  "VFS: Distributed lattice manifest mounted",
  "IO: Neural bandwidth saturated @ 840Gbps",
  "SEC: Root integrity check [PASSED]",
];

const DiagnosticTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLine = `[${new Date().toLocaleTimeString('en-GB', { hour12: false })}] ${LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)]}`;
      setLogs(prev => [...prev.slice(-14), newLine]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full font-mono">
      <div className="flex items-center gap-2 mb-3 text-[9px] font-bold text-foreground/30 uppercase tracking-widest">
        <Terminal size={12} /> Live Diagnostic Feed
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 bg-black/40 rounded-xl p-4 border border-white/5 overflow-y-auto scrollbar-none"
      >
        {logs.map((log, i) => (
          <div key={i} className="text-[10px] leading-relaxed mb-1 last:mb-0">
            <span className="text-primary/60 font-bold">{log.split(' ')[0]}</span>
            <span className="text-foreground/40">{log.substring(log.indexOf(' '))}</span>
          </div>
        ))}
        {logs.length === 0 && <div className="text-[10px] text-foreground/20 italic">Awaiting telemetry...</div>}
      </div>
    </div>
  );
};

export const SystemSection = () => {
  const [cpuLoad, setCpuLoad] = useState(42);
  const [memLoad, setMemLoad] = useState(64);
  const [stressMode, setStressMode] = useState(false);

  useEffect(() => {
    // Staggered Entrance
    const ctx = gsap.context(() => {
      gsap.from(".sys-card", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });
    });

    const interval = setInterval(() => {
      if (!stressMode) {
        setCpuLoad(prev => Math.min(65, Math.max(25, prev + (Math.random() * 8 - 4))));
        setMemLoad(prev => Math.min(80, Math.max(40, prev + (Math.random() * 4 - 2))));
      } else {
        setCpuLoad(prev => Math.min(99, Math.max(85, prev + (Math.random() * 4 - 2))));
        setMemLoad(prev => Math.min(95, Math.max(88, prev + (Math.random() * 2 - 1))));
      }
    }, 3000);
    
    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, [stressMode]);

  const handleStressToggle = () => {
    setStressMode(!stressMode);
  };

  return (
    <section 
      id="system" 
      className={cn(
        "mb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 transition-colors duration-1000 p-8 rounded-3xl border border-transparent",
        stressMode && "bg-orange-500/[0.03] border-orange-500/10"
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-5xl text-foreground font-display">
            Infrastructure <span className={cn("italic transition-colors", stressMode ? "text-orange-500" : "text-secondary")}>Core.</span>
          </h2>
          <p className="text-xs text-foreground/40 font-medium">Lattice synchronization & real-time resource allocation</p>
        </div>
        
        <button 
          onClick={handleStressToggle}
          className={cn(
            "group flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all active:scale-95",
            stressMode 
              ? "bg-orange-500 text-white border-orange-400 shadow-[0_0_25px_rgba(249,115,22,0.4)]" 
              : "bg-white/5 border-white/10 text-foreground/50 hover:bg-white/10 hover:text-foreground"
          )}
        >
          {stressMode ? <Warning weight="fill" className="animate-pulse" /> : <Activity weight="bold" />}
          {stressMode ? "System Overload: Active" : "Trigger Stress Test"}
        </button>
      </div>
      
      {/* Primary Infrastructure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Environment Status (Large Status) */}
        <div className="md:col-span-4 lg:col-span-3 space-y-6">
          <GlassCard variant="mist" className="sys-card p-8 flex flex-col justify-between h-[180px]">
            <div className="flex justify-between items-start">
              <div className={cn("p-2.5 rounded-xl border transition-all", stressMode ? "bg-orange-500/20 border-orange-500/30 text-orange-400" : "bg-white/5 border-white/10 text-secondary")}>
                <Globe size={24} weight="fill" />
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter transition-all",
                stressMode ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "bg-green-500/10 text-green-400 border border-green-500/20"
              )}>
                {stressMode ? "Warning" : "Cluster: Optimal"}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/20">Primary Lattice</div>
                <div className="text-xl font-mono font-bold text-foreground">us-east-1a</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="mist" className="sys-card p-8 flex flex-col justify-between h-[200px]">
            <div className="space-y-6">
              {[
                { label: 'Neural Bandwidth', val: stressMode ? '2.4 Tbps' : '840 Gbps', icon: WifiHigh, color: stressMode ? 'text-orange-400' : 'text-primary' },
                { label: 'Interface Sync', val: stressMode ? 'Sync Delay' : 'Synced', icon: Plugs, color: stressMode ? 'text-orange-400' : 'text-secondary' },
                { label: 'Integrity Check', val: '99.99%', icon: ShieldCheck, color: 'text-green-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <item.icon size={16} className={cn("transition-transform group-hover:scale-110", item.color)} />
                    <span className="text-[11px] font-bold text-foreground/30 uppercase tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-foreground/80">{item.val}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Visual Monitoring (Main Focus) */}
        <div className="md:col-span-8 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GlassCard variant="frost" className="sys-card p-8 flex flex-col justify-between relative overflow-hidden group min-h-[400px]">
            <div className="flex justify-between items-start mb-6">
              <div className={cn("p-2.5 rounded-xl border transition-all", stressMode ? "bg-orange-500/20 border-orange-500/30 text-orange-400" : "bg-white/5 border-white/10 text-primary")}>
                <Activity size={24} weight="duotone" />
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold tracking-widest text-foreground/20 mb-1">CPU LOAD</div>
                <div className={cn("text-3xl font-mono font-bold transition-colors", stressMode ? "text-orange-400" : "text-primary")}>
                  {Math.round(cpuLoad)}%
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center -mt-4">
              <ResourceLattice active={true} load={cpuLoad} />
            </div>

            <div className="mt-8 flex items-center justify-between text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><Clock size={14} /> 16-Core Matrix Active</span>
              <span className={cn("transition-colors", stressMode && "text-orange-500/40")}>Mode: {stressMode ? "Extreme" : "Eco"}</span>
            </div>
          </GlassCard>

          <GlassCard variant="quartz" className="sys-card p-8 flex items-center justify-around min-h-[400px]">
            <FluidGauge level={Math.round(memLoad)} label="MEMORY" color={stressMode ? "#fb923c" : "#ec4899"} />
            <div className="h-40 w-px bg-white/5" />
            <FluidGauge level={Math.round(cpuLoad / 1.1)} label="STORAGE" color={stressMode ? "#fb923c" : "#6366f1"} />
          </GlassCard>
        </div>

        {/* Diagnostic Terminal (Secondary Focus) */}
        <div className="md:col-span-12 lg:col-span-3 h-[400px]">
          <GlassCard variant="mist" className="sys-card p-2 h-full">
            <DiagnosticTerminal />
          </GlassCard>
        </div>

      </div>
    </section>
  );
};
