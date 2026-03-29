import React, { useState } from 'react';
import { 
  Users, 
  Bell, 
  Download, 
  Twitter, 
  Instagram, 
  ArrowRight, 
  ExternalLink,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Layout,
  Search,
  Settings,
  Terminal,
  Cpu,
  Zap,
  Layers,
  Component,
  Command,
  Maximize2,
  Wind,
  Activity,
  Sparkles,
  Crown,
  Diamond
} from 'lucide-react';

const PALETTES = {
  Azure: [
    { step: 50, hex: '#F0F9FF' }, { step: 100, hex: '#E0F2FE' }, { step: 200, hex: '#BAE6FD' },
    { step: 300, hex: '#7DD3FC' }, { step: 400, hex: '#38BDF8' }, { step: 500, hex: '#0EA5E9' },
    { step: 600, hex: '#0284C7' }, { step: 700, hex: '#0369A1' }, { step: 800, hex: '#075985' },
    { step: 900, hex: '#0C4A6E' }, { step: 950, hex: '#082F49' },
  ],
  Emerald: [
    { step: 50, hex: '#ECFDF5' }, { step: 100, hex: '#D1FAE5' }, { step: 200, hex: '#A7F3D0' },
    { step: 300, hex: '#6EE7B7' }, { step: 400, hex: '#34D399' }, { step: 500, hex: '#10B981' },
    { step: 600, hex: '#059669' }, { step: 700, hex: '#047857' }, { step: 800, hex: '#065F46' },
    { step: 900, hex: '#064E3B' }, { step: 950, hex: '#022C22' },
  ],
  Rose: [
    { step: 50, hex: '#FFF1F2' }, { step: 100, hex: '#FFE4E6' }, { step: 200, hex: '#FECDD3' },
    { step: 300, hex: '#FDA4AF' }, { step: 400, hex: '#FB7185' }, { step: 500, hex: '#F43F5E' },
    { step: 600, hex: '#E11D48' }, { step: 700, hex: '#BE123C' }, { step: 800, hex: '#9F1239' },
    { step: 900, hex: '#881337' }, { step: 950, hex: '#4C0519' },
  ],
  Amber: [
    { step: 50, hex: '#FFFBEB' }, { step: 100, hex: '#FEF3C7' }, { step: 200, hex: '#FDE68A' },
    { step: 300, hex: '#FCD34D' }, { step: 400, hex: '#FBBF24' }, { step: 500, hex: '#F59E0B' },
    { step: 600, hex: '#D97706' }, { step: 700, hex: '#B45309' }, { step: 800, hex: '#92400E' },
    { step: 900, hex: '#78350F' }, { step: 950, hex: '#451A03' },
  ],
  Slate: [
    { step: 50, hex: '#F8FAFC' }, { step: 100, hex: '#F1F5F9' }, { step: 200, hex: '#E2E8F0' },
    { step: 300, hex: '#CBD5E1' }, { step: 400, hex: '#94A3B8' }, { step: 500, hex: '#64748B' },
    { step: 600, hex: '#475569' }, { step: 700, hex: '#334155' }, { step: 800, hex: '#1E293B' },
    { step: 900, hex: '#0F172A' }, { step: 950, hex: '#020617' },
  ]
};

const TailwindPalette: React.FC = () => {
    const [activeKey, setActiveKey] = useState<keyof typeof PALETTES>('Azure');
    const [searchQuery, setSearchQuery] = useState('');
    const [copyState, setCopyState] = useState<string | null>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopyState(text);
        setTimeout(() => setCopyState(null), 2000);
    };

    return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        
        {/* Header Area */}
        <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 relative max-w-7xl">
            <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-lg shadow-amber-500/5">
                    <Zap className="text-amber-400" size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">Spectral Array v3.0</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-[var(--ui-text)] tracking-tightest leading-none uppercase italic">
                    Chroma <span className="opacity-30">Forge.</span>
                </h2>
                <p className="text-xl font-medium text-[var(--ui-text-muted)] max-w-2xl leading-relaxed uppercase tracking-widest px-1">
                    Engineered precision for high-fidelity interface design. Synthesizing light and logic through atomic spectral scales.
                </p>
            </div>
            
            <div className="flex bg-[var(--ui-bg-muted)] p-1.5 rounded-[32px] border border-[var(--ui-border)] backdrop-blur-3xl shadow-2xl overflow-hidden">
                 {Object.keys(PALETTES).map((name) => (
                     <button 
                        key={name}
                        onClick={() => setActiveKey(name as keyof typeof PALETTES)}
                        className={`px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all duration-500
                            ${activeKey === name ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-4xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] hover:bg-[var(--ui-text)]/5'}`}
                     >
                        {name}
                     </button>
                 ))}
            </div>
        </section>

        {/* Global Toolbar */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-3 relative group">
                <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[var(--ui-text-muted)] group-hover:text-amber-400 transition-colors">
                    <Search size={20} />
                </div>
                <input 
                    type="text" 
                    placeholder="SCAN SPECTRAL SIGNATURE (EX: #00E5FF / STEP 500)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--ui-bg-muted)] rounded-[40px] border border-[var(--ui-border)] p-8 pl-20 text-sm font-black text-[var(--ui-text)] focus:outline-none focus:border-amber-400/50 transition-all shadow-inner uppercase tracking-widest"
                />
            </div>
            <button className="h-full bg-[var(--ui-bg-muted)] border border-[var(--ui-border)] rounded-[40px] flex items-center justify-center gap-4 text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] hover:bg-[var(--ui-text)]/10 transition-all duration-500 group">
                <Settings size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-[10px] font-black uppercase tracking-widest">Filters</span>
            </button>
        </section>

        {/* Spectral Matrix */}
        <section className="glass-premium rounded-[64px] border border-[var(--ui-border)] shadow-5xl p-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 flex items-center gap-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black text-[var(--ui-text)] uppercase tracking-[0.4em]">Active Core: {activeKey}</span>
                <div className="w-3 h-3 rounded-full animate-pulse bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-10">
                {PALETTES[activeKey].map((swatch) => (
                    <div key={swatch.step} className="flex flex-col group/swatch relative h-full">
                        <div 
                            className={`h-52 w-full rounded-[32px] shadow-4xl mb-8 transition-all duration-700 group-hover/swatch:scale-105 group-hover/swatch:rounded-[60px] relative overflow-hidden flex items-center justify-center
                                ${swatch.step === 500 ? 'border-4 border-amber-400/40 ring-4 ring-amber-400/10 shadow-amber-500/20' : 'border-2 border-[var(--ui-border)]'}`}
                            style={{ backgroundColor: swatch.hex }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/swatch:opacity-100 transition-opacity duration-500" />
                            <button 
                                onClick={() => handleCopy(swatch.hex)}
                                className="relative z-10 opacity-0 group-hover/swatch:opacity-100 transition-all duration-700 transform translate-y-8 group-hover/swatch:translate-y-0 w-12 h-12 bg-[var(--ui-text)] text-[var(--ui-bg)] rounded-[20px] flex items-center justify-center hover:scale-110 shadow-2xl active:scale-95"
                            >
                                {copyState === swatch.hex ? <Check size={18} strokeWidth={3} /> : <Copy size={18} strokeWidth={3} />}
                            </button>
                        </div>
                        <div className="flex flex-col px-2 space-y-2">
                             <div className="flex justify-between items-center">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${swatch.step === 500 ? 'text-amber-400' : 'text-[var(--ui-text-muted)]'}`}>
                                    S-{swatch.step}
                                </span>
                                {swatch.step === 500 && <Zap size={10} className="text-amber-400" />}
                             </div>
                            <span className="text-[10px] text-[var(--ui-text-muted)] opacity-30 font-mono tracking-widest uppercase truncate">{swatch.hex}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="absolute top-0 left-0 p-12 opacity-[0.02] pointer-events-none rotate-90 origin-top-left">
                <span className="text-6xl font-black uppercase tracking-[1em] whitespace-nowrap">ATOMIC SCANNER</span>
            </div>
        </section>

        {/* Prototype Simulation Area */}
        <section className="space-y-16 py-24 border-t border-[var(--ui-border)]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 px-6">
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-0.5 w-16 bg-[var(--ui-text)] rounded-full opacity-20" />
                        <span className="text-[10px] font-black text-[var(--ui-text-muted)] uppercase tracking-[0.5em]">Simulation Deck.01</span>
                    </div>
                    <h3 className="text-5xl font-black text-[var(--ui-text)] uppercase tracking-tightest italic leading-none">Atomic <span className="text-[var(--ui-text-muted)]">Forge Preview.</span></h3>
                    <p className="text-[var(--ui-text-muted)] text-sm font-medium uppercase tracking-[0.2em] max-w-lg leading-relaxed">
                        Validating spectral integrity across high-contrast volumetric layouts and tactical component mapping.
                    </p>
                </div>
                <div className="flex gap-4 p-2 bg-[var(--ui-bg-muted)] rounded-[32px] border border-[var(--ui-border)] backdrop-blur-3xl shadow-2xl">
                    <button className="p-4 rounded-[24px] bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-4xl hover:scale-105 transition-all"><Monitor size={20} /></button>
                    <button className="p-4 rounded-[24px] text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] hover:bg-[var(--ui-text)]/5 transition-all"><Smartphone size={20} /></button>
                    <button className="p-4 rounded-[24px] text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] hover:bg-[var(--ui-text)]/5 transition-all"><Layout size={20} /></button>
                </div>
            </div>

            <div className="glass-premium border border-white/10 rounded-[100px] p-24 shadow-5xl relative overflow-hidden bg-gradient-to-br from-black/60 via-transparent to-transparent">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--app-primary),transparent_70%)] opacity-5 pointer-events-none" />
                
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-24 relative z-10">
                    
                    {/* Left Deck: Control Console */}
                    <div className="xl:col-span-4 space-y-16">
                        <div className="bg-[var(--ui-bg)] backdrop-blur-3xl p-16 rounded-[72px] border border-[var(--ui-border)] shadow-5xl space-y-12 hover:border-amber-400/40 transition-all duration-700 group/panel">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <div className="w-4 h-4 rounded-full bg-amber-400 animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
                                    <h4 className="text-[11px] font-black text-[var(--ui-text)] uppercase tracking-[0.6em]">System Matrix</h4>
                                </div>
                                <Terminal className="text-[var(--ui-text-muted)]/20 group-hover/panel:text-amber-400 transition-colors" size={24} />
                            </div>
                            
                            <nav className="space-y-4">
                                {[
                                    { label: 'Core Orbital Link', icon: Cpu, active: true },
                                    { label: 'Atmospheric Sync', icon: Wind, active: false },
                                    { label: 'Neural Protocols', icon: Component, active: false }
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between p-8 rounded-[36px] transition-all duration-700 cursor-pointer group/link border
                                        ${item.active ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-4xl border-[var(--ui-text)]' : 'bg-[var(--ui-bg-muted)] text-[var(--ui-text-muted)] border-transparent hover:bg-[var(--ui-text)]/10 hover:text-[var(--ui-text)] hover:border-[var(--ui-border)]'}`}>
                                        <div className="flex items-center gap-6">
                                            <item.icon size={24} strokeWidth={item.active ? 3 : 2} className="transition-transform group-hover/link:rotate-12" />
                                            <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <ArrowRight size={18} className={`transition-transform group-hover/link:translate-x-2 ${item.active ? 'opacity-100' : 'opacity-20'}`} />
                                    </div>
                                ))}
                            </nav>
                        </div>

                        <div className="bg-[var(--ui-bg-muted)] p-16 rounded-[72px] border border-[var(--ui-border)] space-y-16 backdrop-blur-md relative overflow-hidden group/stats">
                             <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000 text-[var(--ui-text)]">
                                <Activity size={120} />
                             </div>
                            <h4 className="text-[11px] font-black text-[var(--ui-text-muted)] uppercase tracking-[0.5em]">Spectral Flux Audit</h4>
                            <div className="grid grid-cols-1 gap-12">
                                <div className="space-y-5">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-[var(--ui-text-muted)] opacity-60 uppercase tracking-widest leading-none">Node Response</span>
                                        <span className="text-4xl font-black text-[var(--ui-text)] italic tracking-tighter leading-none">99.98%</span>
                                    </div>
                                    <div className="h-2 w-full bg-[var(--ui-text)]/5 rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full w-[99%] bg-[var(--ui-text)] rounded-full shadow-[0_0_15px_var(--ui-text)]" />
                                    </div>
                                </div>
                                <div className="text-center space-y-2">
                                     <span className="text-[10px] font-black text-[var(--ui-text-muted)] opacity-30 uppercase tracking-[1em] block mb-4">Atomic Precision</span>
                                     <div className="text-6xl font-black text-[var(--ui-text)] tracking-widest leading-none">+0.002MS</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Deck: Prime Viewport */}
                    <div className="xl:col-span-8 space-y-16">
                        <section className="bg-[var(--ui-surface)] rounded-[90px] p-24 shadow-5xl relative overflow-hidden group/hero transition-all duration-1000 hover:scale-[1.01] border border-[var(--ui-border)]">
                            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--ui-text)]/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-[150px] pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]" />
                            <div className="relative z-10 space-y-16">
                                <div className="flex items-center gap-6">
                                    <span className="px-6 py-3 rounded-[24px] bg-[var(--ui-text)] text-[var(--ui-bg)] text-[10px] font-black uppercase tracking-[0.6em] shadow-2xl">PHASE: OMNI.GEN</span>
                                    <div className="flex -space-x-5">
                                        {[1,2,3,4,5].map(i => (
                                            <div key={i} className="w-12 h-12 rounded-full border-4 border-[var(--ui-surface)] bg-[var(--ui-bg-muted)] shadow-xl relative overflow-hidden group/avatar">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ui-text)]/10 to-transparent opacity-40"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black text-[var(--ui-text-muted)] opacity-60 uppercase tracking-[0.3em] ml-2">Mapping 24 Global Hubs</span>
                                </div>
                                
                                <h2 className="text-6xl md:text-[100px] font-black text-[var(--ui-text)] uppercase tracking-tightest leading-[0.7] max-w-4xl italic group-hover:translate-x-2 transition-transform duration-1000">
                                    Forge <br/> <span className="text-amber-500">Atomic.</span>
                                </h2>
                                
                                <p className="text-xl font-bold text-[var(--ui-text-muted)] uppercase tracking-[0.3em] leading-relaxed max-w-2xl px-2">
                                    Architecting the next evolution of structural interfaces for sentient computing environments.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-8 pt-12">
                                    <button className="bg-[var(--ui-text)] text-[var(--ui-bg)] h-28 px-20 rounded-[44px] font-black uppercase tracking-[0.6em] text-[12px] hover:scale-105 active:scale-95 transition-all shadow-4xl flex items-center gap-8 group/prime">
                                        Initialize Protocol
                                        <div className="w-12 h-12 rounded-full bg-[var(--ui-bg)]/20 flex items-center justify-center transition-all group-hover/prime:rotate-90 group-hover/prime:bg-amber-400 group-hover/prime:text-black">
                                            <ArrowRight size={20} strokeWidth={3} />
                                        </div>
                                    </button>
                                    <button className="h-28 px-12 text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] font-black uppercase tracking-[0.5em] text-[12px] transition-all flex items-center gap-4 group/sec">
                                        Read Technical Whitepaper
                                        <ExternalLink size={18} className="opacity-40 group-hover/sec:translate-x-1 group-hover/sec:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </section>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { title: 'Essential Core', price: 'FREE', icon: Sparkles, color: 'text-[var(--ui-text-muted)]/20' },
                                { title: 'Titan Access', price: '49', icon: Crown, color: 'text-amber-400', featured: true },
                                { title: 'Enterprise Void', price: 'POA', icon: Diamond, color: 'text-[var(--ui-text-muted)]/20' }
                            ].map((plan, i) => (
                                <div key={i} className={`p-16 rounded-[72px] transition-all duration-700 hover:-translate-y-6 group/tier border-2
                                    ${plan.featured ? 'bg-[var(--ui-surface)] border-amber-400/20 shadow-5xl' : 'bg-[var(--ui-bg-muted)] border-transparent hover:border-[var(--ui-border)]'}`}>
                                    <plan.icon size={48} className={`mb-12 ${plan.color}`} strokeWidth={plan.featured ? 2.5 : 1.5} />
                                    <h5 className={`text-[11px] font-black mb-10 uppercase tracking-[0.5em] ${plan.featured ? 'text-amber-400' : 'text-[var(--ui-text-muted)] opacity-60'}`}>{plan.title}</h5>
                                    <div className={`text-7xl font-black mb-16 tracking-tightest italic uppercase ${plan.featured ? 'text-[var(--ui-text)]' : 'text-[var(--ui-text)]/10'}`}>
                                        {plan.price !== 'FREE' && plan.price !== 'POA' && <span className="text-3xl align-top mr-1 font-bold italic">$</span>}
                                        {plan.price}
                                    </div>
                                    <button className={`w-full h-20 rounded-[30px] text-[11px] font-black uppercase tracking-widest transition-all duration-500
                                        ${plan.featured ? 'bg-amber-400 text-amber-950 shadow-4xl hover:scale-105 active:scale-95' : 'bg-[var(--ui-text)]/5 text-[var(--ui-text-muted)] hover:bg-[var(--ui-text)]/10 hover:text-[var(--ui-text)]'}`}>
                                        Initialize
                                    </button>
                                </div>
                            ))}
                         </div>
                    </div>

                </div>
            </div>
        </section>

        {/* Branding Footer */}
        <footer className="pt-24 pb-12 opacity-5 flex flex-col items-center gap-6">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <span className="text-[10px] font-black uppercase tracking-[2em] whitespace-nowrap">Genesis Protocol / Chroma Core Registry End</span>
        </footer>
    </div>
    );
};

export default TailwindPalette;
