import React, { useState } from 'react';
import { SpacingToken } from '../types';
import { 
  Box, 
  Settings, 
  Sparkles, 
  ArrowRight, 
  Layout, 
  Copy, 
  Check, 
  Cpu,
  Layers,
  Command
} from 'lucide-react';

interface SpacingSystemProps {
  spacing: SpacingToken[];
  setSpacing: (spacing: SpacingToken[]) => void;
}

const SpacingSystem: React.FC<SpacingSystemProps> = ({ spacing, setSpacing }) => {
  const [pxInput, setPxInput] = useState('');
  const [basePx] = useState(16);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [simMode, setSimMode] = useState<'stack' | 'grid' | 'inset'>('stack');

  const handleSpacingChange = (name: string, value: number) => {
    setSpacing(spacing.map(space =>
      space.name === name ? { ...space, value: Math.max(0, value) } : space
    ));
  };

  const copyToken = (token: SpacingToken) => {
    const css = `--spacing-${token.name}: ${token.value}px;`;
    navigator.clipboard.writeText(css);
    setCopiedToken(token.name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const emValue = pxInput ? (parseFloat(pxInput) / basePx).toFixed(3) : '0.000';

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 font-inter">
      
      {/* Header Section */}
      <header className="space-y-8 max-w-5xl">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[var(--ui-text)]/5 border border-[var(--ui-border)] shadow-lg shadow-[var(--ui-text)]/5">
            <Sparkles className="text-[var(--ui-text)]" size={14} aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--ui-text-muted)]">Spatial Genesis v3.0</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-[var(--ui-text)] tracking-tightest leading-none uppercase italic">
            Space <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ui-text)] to-[var(--ui-text-muted)]">Arch.</span>
        </h2>
        <p className="text-xl font-medium text-[var(--ui-text-muted)] max-w-2xl leading-relaxed uppercase tracking-widest px-1">
            Engineering the invisible grid of pure communication through precise mathematical intervals and gravitational spatial logic.
        </p>
      </header>

      {/* Tools Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Unit Reactor */}
          <section className="lg:col-span-5 glass-premium p-8 rounded-[32px] border border-[var(--ui-border)] shadow-4xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000" aria-hidden="true">
                  <Cpu size={140} className="text-[var(--ui-text)]" />
              </div>
              <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--ui-text)]/5 flex items-center justify-center border border-[var(--ui-border)] shadow-lg" aria-hidden="true">
                          <Settings className="text-[var(--ui-text)]" size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-[var(--ui-text)] tracking-tightest italic uppercase leading-none">Unit Reactor</h3>
                  </div>

                  <div className="flex items-end gap-6">
                      <div className="flex-1 space-y-4">
                          <label htmlFor="px-unit-input" className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text-muted)] px-1 block">Linear Dimension (PX)</label>
                          <div className="relative">
                              <input 
                                  id="px-unit-input"
                                  type="number"
                                  placeholder="0"
                                  value={pxInput}
                                  title="Enter pixel dimension for relative scale reactor conversion"
                                  onChange={(e) => setPxInput(e.target.value)}
                                  className="w-full bg-[var(--ui-bg-muted)] rounded-[28px] border border-[var(--ui-border)] p-6 text-2xl font-black text-[var(--ui-text)] focus:outline-none focus:border-[var(--ui-text)]/20 transition-all shadow-inner placeholder:text-[var(--ui-text-muted)] uppercase"
                              />
                              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-[var(--ui-text-muted)] uppercase tracking-widest pointer-events-none">PX Instance</span>
                          </div>
                      </div>
                      <div className="pb-6 opacity-20 text-[var(--ui-text)]" aria-hidden="true">
                          <ArrowRight size={24} />
                      </div>
                      <div className="flex-1 space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text-muted)] px-1">Relative Scale (EM)</h4>
                          <div className="bg-[var(--ui-text)]/5 rounded-[28px] border border-[var(--ui-border)] p-6 shadow-inner flex items-center justify-between min-h-[82px] group/res relative">
                              <span className="text-2xl font-black text-[var(--ui-text)] uppercase tracking-tightest">{emValue}</span>
                              <span className="text-[10px] font-black text-[var(--ui-text-muted)] uppercase tracking-widest">EM Token</span>
                              
                              <button 
                                onClick={() => navigator.clipboard.writeText(`${emValue}em`)}
                                type="button"
                                title={`Copy atomic relative scale value: ${emValue}em to clipboard`}
                                className="absolute -top-3 -right-3 w-10 h-10 bg-[var(--ui-text)] text-[var(--ui-bg)] rounded-xl shadow-xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center border border-[var(--ui-border)] opacity-0 group-hover/res:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/40"
                              >
                                <Copy size={16} strokeWidth={3} aria-hidden="true" />
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Arch. Simulator */}
          <section className="lg:col-span-7 glass-premium p-8 rounded-[32px] border border-[var(--ui-border)] shadow-4xl relative overflow-hidden group">
               <div className="relative z-10 flex flex-col h-full justify-between gap-10">
                   <header className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-[var(--ui-text)]/5 flex items-center justify-center border border-[var(--ui-border)] shadow-lg" aria-hidden="true">
                               <Layout className="text-[var(--ui-text)]" size={24} />
                           </div>
                           <h3 className="text-2xl font-black text-[var(--ui-text)] tracking-tightest italic uppercase leading-none">Arch. Simulator</h3>
                       </div>
                       <nav className="flex bg-[var(--ui-bg-muted)] rounded-full p-1.5 border border-[var(--ui-border)] shadow-inner">
                           {(['stack', 'grid', 'inset'] as const).map(mode => (
                               <button 
                                   key={mode}
                                   onClick={() => setSimMode(mode)}
                                   type="button"
                                   title={`Switch to architectural spatial simulation mode: ${mode}`}
                                   className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${simMode === mode ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                               >
                                   {mode}
                               </button>
                           ))}
                       </nav>
                   </header>

                   <div className="flex-1 bg-[var(--ui-bg-muted)] rounded-[40px] border border-[var(--ui-border)] p-12 overflow-hidden relative shadow-inner min-h-[220px] flex items-center justify-center">
                        <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay [background-image:linear-gradient(to_right,var(--ui-text-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--ui-text-muted)_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true"></div>
                        
                        <div className={`transition-all duration-700 flex flex-wrap gap-4 items-center justify-center ${simMode === 'stack' ? 'flex-col' : simMode === 'grid' ? 'grid grid-cols-2' : ''}`}>
                             <div className="w-24 h-24 bg-[var(--ui-bg-muted)] rounded-2xl border border-[var(--ui-border)] shadow-2xl flex items-center justify-center" aria-hidden="true"><Box className="text-[var(--ui-text-muted)]" size={32} /></div>
                             <div className={`bg-[var(--ui-text)]/10 rounded-2xl border border-[var(--ui-border)] transition-all duration-700 flex items-center justify-center overflow-hidden`} 
                                  style={{ 
                                      width: simMode === 'inset' ? '180px' : '64px', 
                                      height: simMode === 'inset' ? '180px' : '64px',
                                      padding: simMode === 'inset' ? `${spacing[2].value}px` : '0',
                                      gap: simMode !== 'inset' ? `${spacing[2].value}px` : '0'
                                  }}
                                  aria-label={`Spatial gap simulation box padding ${spacing[2].value}px`}
                             >
                                  <div className="w-full h-full bg-[var(--ui-text)]/20 rounded-xl" />
                             </div>
                             <div className="w-24 h-24 bg-[var(--ui-bg-muted)] rounded-2xl border border-[var(--ui-border)] shadow-2xl flex items-center justify-center" aria-hidden="true"><Box className="text-[var(--ui-text-muted)]" size={32} /></div>
                        </div>
                   </div>
               </div>
          </section>
      </div>

      {/* Dimension Matrix */}
      <main className="grid grid-cols-1 gap-12">
          {spacing.map((token, idx) => (
              <section 
                  key={token.name} 
                  className="p-8 glass-premium rounded-[32px] border border-[var(--ui-border)] shadow-5xl relative group hover:border-[var(--ui-text)]/20 transition-all duration-700 overflow-hidden flex flex-col lg:flex-row gap-10 items-center"
              >
                  {/* Token Data */}
                  <div className="lg:w-80 space-y-8 border-b lg:border-b-0 lg:border-r border-[var(--ui-border)] pb-8 lg:pb-0 lg:pr-10 shrink-0">
                       <div className="flex justify-between items-start">
                           <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[var(--ui-text)] shadow-[0_0_10px_rgba(var(--ui-text-rgb),0.5)]" aria-hidden="true" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--ui-text-muted)]">Spatial Id: {idx + 1}</span>
                                </div>
                                <h4 className="text-4xl font-black text-[var(--ui-text)] uppercase italic tracking-tightest leading-none">Token <span className="text-[var(--ui-text-muted)]">{token.name}</span></h4>
                           </div>
                           <button 
                                onClick={() => copyToken(token)}
                                type="button"
                                title={`Copy atomic CSS definition for spatial token: ${token.name} to clipboard`}
                                className={`p-4 rounded-2xl transition-all border focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${copiedToken === token.name ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-xl' : 'bg-[var(--ui-bg-muted)] border border-[var(--ui-border)] text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] hover:bg-[var(--ui-bg)] shadow-inner'}`}
                           >
                              {copiedToken === token.name ? <Check size={18} /> : <Command size={18} />}
                           </button>
                       </div>

                       <div className="space-y-6">
                            <div className="flex justify-between items-end px-1">
                                 <label htmlFor={`coordinate-${token.name}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text-muted)] block">Coordinate (PX)</label>
                                 <span className="text-4xl font-black text-[var(--ui-text)] tracking-tightest leading-none">{token.value}<span className="text-xs text-[var(--ui-text-muted)] ml-2">PX</span></span>
                            </div>
                            <input 
                                id={`coordinate-${token.name}`}
                                type="range" min="0" max="256" step="4"
                                value={token.value}
                                title={`Adjust specific dimensional coordinate spatial value for ${token.name}`}
                                onChange={(e) => handleSpacingChange(token.name, Number(e.target.value))}
                                className="w-full h-1.5 bg-[var(--ui-bg-muted)] rounded-full appearance-none cursor-pointer accent-[var(--ui-text)] shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/40"
                            />
                       </div>
                  </div>

                  {/* Architectural View */}
                  <div className="flex-1 w-full bg-[var(--ui-bg-muted)] rounded-[48px] border border-[var(--ui-border)] py-12 px-10 relative overflow-hidden group/stage shadow-inner min-h-[300px] flex items-center justify-center perspective-[1000px]">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--ui-text) 1px, transparent 1px), linear-gradient(90deg, var(--ui-text) 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden="true" />
                        
                        <div className="flex items-center gap-6 relative z-10 transform-gpu group-hover/stage:translate-z-10 transition-transform duration-700">
                             <div className="w-24 h-24 bg-[var(--ui-text-muted)]/5 rounded-[24px] border border-[var(--ui-border)] shadow-3xl flex items-center justify-center animate-in fade-in zoom-in duration-700" aria-hidden="true">
                                   <Layers className="text-[var(--ui-text-muted)]/10" size={40} />
                             </div>
                             
                             <div 
                                className="h-24 bg-[var(--ui-text)]/10 rounded-[20px] border border-[var(--ui-border)] relative flex items-center justify-center transition-all duration-700 group-hover/stage:shadow-[0_0_50px_rgba(var(--ui-text-rgb),0.2)]"
                                style={{ width: `${Math.max(4, token.value)}px` }}
                                aria-label={`Spatial interval visualization showing ${token.value}px distance`}
                             >
                                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-[var(--ui-text)] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover/stage:opacity-100 transition-all translate-y-2 group-hover/stage:translate-y-0 pointer-events-none">
                                     Shift: {token.value}px
                                 </div>
                                 <div className="absolute inset-y-0 left-0 w-px bg-[var(--ui-text)]/20" aria-hidden="true" />
                                 <div className="absolute inset-y-0 right-0 w-px bg-[var(--ui-text)]/20" aria-hidden="true" />
                                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[var(--ui-text)]/10" aria-hidden="true" />
                             </div>

                             <div className="w-24 h-24 bg-[var(--ui-text-muted)]/5 rounded-[24px] border border-[var(--ui-border)] shadow-3xl flex items-center justify-center animate-in fade-in zoom-in duration-700" aria-hidden="true">
                                   <Layers className="text-[var(--ui-text-muted)]/10" size={40} />
                             </div>
                        </div>

                        {/* Industrial Metadata */}
                        <div className="absolute bottom-6 flex gap-4 pointer-events-none">
                            <div className="px-6 py-2 rounded-full border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] text-[9px] font-black text-[var(--ui-text-muted)] uppercase tracking-[0.4em]">
                                Projection Stage: S-{idx + 1}
                            </div>
                        </div>
                  </div>

                  {/* Industrial Badge */}
                  <div className="absolute top-0 right-0 py-10 px-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity rotate-90 origin-top-right" aria-hidden="true">
                         <span className="text-4xl font-black uppercase tracking-widest whitespace-nowrap text-[var(--ui-text)]">SPATIAL CORE SYSTEM</span>
                  </div>
              </section>
          ))}
      </main>

      {/* Footer Branding */}
      <footer className="pt-24 pb-12 flex justify-between items-center opacity-10 pointer-events-none">
           <div className="h-px w-48 bg-[var(--ui-text)]" aria-hidden="true"></div>
           <span className="text-[10px] font-black uppercase tracking-[1em] text-[var(--ui-text)]">Universal Spatial Logic</span>
           <div className="h-px w-48 bg-[var(--ui-text)]" aria-hidden="true"></div>
      </footer>
    </div>
  );
};

export default SpacingSystem;