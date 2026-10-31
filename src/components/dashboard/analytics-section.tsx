"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { SparklineChart } from '@/components/ui/sparkline-chart';
import { 
  TrendUp, 
  TrendDown, 
  Activity, 
  Users, 
  Timer, 
  ShieldCheck,
  CircleDashed,
  Lightning,
  type IconProps
} from 'phosphor-react';

interface Metric {
  id: string;
  label: string;
  value: string;
  trend: number; // percentage
  data: number[];
  color: string;
  icon: React.ComponentType<IconProps>;
}

export const AnalyticsSection = () => {
  // Initial Mock Data
  const [metrics, setMetrics] = useState<Metric[]>([
    { 
      id: 'visitors', 
      label: 'Spatial Traffic', 
      value: '12,842', 
      trend: 12.5, 
      data: [30, 45, 32, 60, 55, 80, 75], 
      color: '#60a5fa',
      icon: Users
    },
    { 
      id: 'latency', 
      label: 'Zero G Latency', 
      value: '14ms', 
      trend: -8.2, 
      data: [40, 35, 38, 30, 32, 28, 25], 
      color: '#fbbf24',
      icon: Timer
    },
    { 
      id: 'health', 
      label: 'System Integrity', 
      value: '99.9%', 
      trend: 0.1, 
      data: [99, 99.5, 99.8, 99.9, 99.7, 99.9, 100], 
      color: '#10b981',
      icon: ShieldCheck
    },
    { 
      id: 'compute', 
      label: 'Compute Refraction', 
      value: '42.1%', 
      trend: 5.4, 
      data: [20, 25, 40, 35, 38, 42, 45], 
      color: '#ec4899',
      icon: Activity
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => {
        const newData = [...m.data.slice(1), m.data[m.data.length - 1] + (Math.random() * 10 - 5)];
        return { ...m, data: newData };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="analytics" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl text-foreground">System <span className="text-primary italic">Intelligence.</span></h2>
        <div className="h-px flex-1 bg-foreground/10" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 flex items-center gap-2">
          <Activity className="text-primary animate-pulse" /> Real-time Feed
        </span>
      </div>

      {/* 1. Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <GlassCard key={m.id} variant="frost" className="p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-foreground/40 group-hover:text-primary group-hover:border-primary/30 transition-all">
                <m.icon size={18} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold",
                m.trend > 0 ? "text-green-400" : "text-amber-400"
              )}>
                {m.trend > 0 ? <TrendUp size={10} /> : <TrendDown size={10} />}
                {Math.abs(m.trend)}%
              </div>
            </div>
            
            <div className="space-y-1 mb-6">
              <div className="text-2xl font-display font-bold text-foreground">{m.value}</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-foreground/30">{m.label}</div>
            </div>

            <SparklineChart 
              data={m.data} 
              color={m.color} 
              className="w-full opacity-60 group-hover:opacity-100 transition-opacity" 
              fill 
            />
            
            {/* Background Glow */}
            <div 
              className="absolute -right-4 -bottom-4 w-16 h-16 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full"
              style={{ backgroundColor: m.color }}
            />
          </GlassCard>
        ))}
      </div>

      {/* 2. Main Intelligence Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard variant="quartz" className="lg:col-span-2 p-8 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-medium text-foreground/80 flex items-center gap-2">
              <CircleDashed className="text-primary animate-spin-slow" />
              Node Refraction Index
            </h3>
            <div className="flex gap-2">
              {['24H', '7D', '30D'].map(t => (
                <button key={t} className="px-3 py-1 rounded-full text-[10px] font-bold border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 h-64 relative mt-4">
            {/* Background Glow for the Hub */}
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
            
            <div className="relative w-full h-full flex items-end">
              <SparklineChart 
                data={[20, 45, 28, 65, 45, 90, 85, 95, 80, 100]} 
                width={800} 
                height={240}
                color="#60a5fa"
                fill
                className="w-full h-full"
              />
            </div>
          </div>
        </GlassCard>

        {/* 3. Node Status Module */}
        <GlassCard variant="mist" className="p-6 flex flex-col gap-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
            <Lightning weight="fill" className="text-secondary" /> Hot Nodes
          </h3>
          
          <div className="space-y-4">
            {[
              { name: 'Core.CSS.Refraction', status: 'optimal', load: '12%' },
              { name: 'UI.Iconography.Sync', status: 'active', load: '45%' },
              { name: 'Auth.Spatial.Gate', status: 'stress', load: '89%' },
              { name: 'Net.WebSocket.Pulse', status: 'optimal', load: '04%' },
            ].map((node, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    node.status === 'optimal' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" :
                    node.status === 'active' ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" :
                    "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)] animate-pulse"
                  )} />
                  <span className="text-[11px] font-mono text-foreground/70">{node.name}</span>
                </div>
                <span className="text-[10px] font-bold text-foreground/30 group-hover:text-foreground/60">{node.load}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/5">
            <button className="w-full py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest transition-all">
              Launch Diagnostic
            </button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
