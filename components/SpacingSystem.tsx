import React, { useState } from 'react';
import { SpacingToken } from '../types';
import { 
  Box, 
  Maximize, 
  Settings, 
  Zap, 
  ArrowRight, 
  Layout, 
  Grid3X3, 
  Copy, 
  Check, 
  Cpu,
  Layers,
  Sparkles,
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
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      
      {/* Hero Section */}
      <section className="space-y-8 max-w-5xl">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <Sparkles className="text-emerald-400" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Spatial Genesis v3.0</span>
        </div>
        <h2 className="text-7xl md:text-9xl font-black text-white tracking-tightest leading-none uppercase italic">
            Space <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">Arch.</span>
        </h2>
        <p className="text-xl font-medium text-white/30 max-w-2xl leading-relaxed uppercase tracking-widest px-1">
            Engineering the invisible grid of pure communication through precise mathematical intervals and gravitational spatial logic.
        </p>
      </section>

      {/* Tools Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Unit Converter */}
          <section className="lg:col-span-5 glass-premium p-12 rounded-[60px] border border-white/10 shadow-4xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                  <Cpu size={140} />
              </div>
              <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-lg">
                          <Settings className="text-emerald-400" size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tightest italic uppercase">Unit Reactor</h3>
                  </div>

                  <div className="flex items-end gap-6">
                      <div className="flex-1 space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-1">Linear Dimension (PX)</label>
                          <div className="relative">
                              <input 
                                  type="number"
                                  placeholder="0"
                                  value={pxInput}
                                  title="Pixel input"
                                  onChange={(e) => setPxInput(e.target.value)}
                                  className="w-full bg-black/40 rounded-[28px] border border-white/10 p-6 text-2xl font-black text-white focus:outline-none focus:border-emerald-400/50 transition-all shadow-inner placeholder:text-white/5 uppercase"
                              />
                              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/10 uppercase tracking-widest">PX Instance</span>
                          </div>
                      </div>
                      <div className="pb-6 opacity-20">
                          <ArrowRight size={24} />
                      </div>
                      <div className="flex-1 space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-1">Relative Scale (EM)</label>
                          <div className="bg-emerald-500/5 rounded-[28px] border border-emerald-500/10 p-6 shadow-inner flex items-center justify-between min-h-[82px] group/res">
                              <span className="text-2xl font-black text-emerald-400 uppercase tracking-tightest">{emValue}</span>
                              <span className="text-[10px] font-black text-emerald-400/20 uppercase tracking-widest">EM Token</span>
                              
                              <button 
                                onClick={() => navigator.clipboard.writeText(`${emValue}em`)}
                                className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-500 text-black rounded-xl shadow-xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center border border-emerald-400/50 opacity-0 group-hover/res:opacity-100"
                              >
                                <Copy size={16} strokeWidth={3} />
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Simulator Selection */}
          <section className="lg:col-span-7 glass-premium p-12 rounded-[60px] border border-white/10 shadow-4xl relative overflow-hidden group">
               <div className="relative z-10 flex flex-col h-full justify-between gap-10">
                   <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-lg">
                               <Layout className="text-emerald-400" size={24} />
                           </div>
                           <h3 className="text-2xl font-black text-white tracking-tightest italic uppercase">Arch. Simulator</h3>
                       </div>
                       <div className="flex bg-black/40 rounded-full p-1.5 border border-white/10 shadow-inner">
                           {(['stack', 'grid', 'inset'] as const).map(mode => (
                               <button 
                                   key={mode}
                                   onClick={() => setSimMode(mode)}
                                   className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${simMode === mode ? 'bg-white text-black shadow-xl' : 'text-white/20 hover:text-white'}`}
                               >
                                   {mode}
                               </button>
                           ))}
                       </div>
                   </div>

                   <div className="flex-1 bg-black/40 rounded-[40px] border border-white/5 p-12 overflow-hidden relative shadow-inner min-h-[220px] flex items-center justify-center">
                        <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay [background-image:linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] [background-size:24px_24px]"></div>
                        
                        <div className={`transition-all duration-700 flex flex-wrap gap-4 items-center justify-center ${simMode === 'stack' ? 'flex-col' : simMode === 'grid' ? 'grid grid-cols-2' : ''}`}>
                             <div className="w-24 h-24 bg-white/5 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center"><Box className="text-white/10" size={32} /></div>
                             <div className={`bg-emerald-400/10 rounded-2xl border border-emerald-400/20 transition-all duration-700 flex items-center justify-center overflow-hidden`} 
                                  style={{ 
                                      width: simMode === 'inset' ? '180px' : '64px', 
                                      height: simMode === 'inset' ? '180px' : '64px',
                                      padding: simMode === 'inset' ? `${spacing[2].value}px` : '0',
                                      gap: simMode !== 'inset' ? `${spacing[2].value}px` : '0'
                                  }}>
                                  <div className="w-full h-full bg-emerald-400/20 rounded-xl" />
                             </div>
                             <div className="w-24 h-24 bg-white/5 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center"><Box className="text-white/10" size={32} /></div>
                        </div>
                   </div>
               </div>
          </section>
      </div>

      {/* Dimension Matrix */}
      <div className="grid grid-cols-1 gap-12">
          {spacing.map((token, idx) => (
              <div 
                  key={token.name} 
                  className="p-12 glass-premium rounded-[60px] border border-white/10 shadow-5xl relative group hover:border-emerald-400/40 transition-all duration-700 overflow-hidden flex flex-col lg:flex-row gap-16 items-center"
              >
                  {/* Token Data */}
                  <div className="lg:w-96 space-y-10 border-b lg:border-b-0 lg:border-r border-white/10 pb-10 lg:pb-0 lg:pr-16 shrink-0">
                       <div className="flex justify-between items-start">
                           <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Spatial Id: {idx + 1}</span>
                                </div>
                                <h4 className="text-4xl font-black text-white uppercase italic tracking-tightest leading-none">Token <span className="text-white/40">{token.name}</span></h4>
                           </div>
                           <button 
                                onClick={() => copyToken(token)}
                                className={`p-4 rounded-2xl transition-all border ${copiedToken === token.name ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-xl' : 'bg-white/5 border-white/5 text-white/20 hover:text-white hover:bg-white/10 shadow-inner'}`}
                           >
                              {copiedToken === token.name ? <Check size={18} /> : <Command size={18} />}
                           </button>
                       </div>

                       <div className="space-y-6">
                           <div className="flex justify-between items-end px-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Coordinate (PX)</label>
                                <span className="text-4xl font-black text-white tracking-tightest leading-none">{token.value}<span className="text-xs text-white/10 ml-2">PX</span></span>
                           </div>
                           <input 
                               type="range" min="0" max="256" step="4"
                               value={token.value}
                               title="Spacing value scale"
                               onChange={(e) => handleSpacingChange(token.name, Number(e.target.value))}
                               className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-emerald-400 shadow-xl"
                           />
                       </div>
                  </div>

                  {/* Architectural View */}
                  <div className="flex-1 w-full bg-black/40 rounded-[48px] border border-white/5 py-12 px-10 relative overflow-hidden group/stage shadow-inner min-h-[300px] flex items-center justify-center perspective-[1000px]">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                        
                        <div className="flex items-center gap-6 relative z-10 transform-gpu group-hover/stage:translate-z-10 transition-transform duration-700">
                             <div className="w-24 h-24 bg-white/5 rounded-[24px] border border-white/10 shadow-3xl flex items-center justify-center animate-in fade-in zoom-in duration-700">
                                   <Layers className="text-white/5" size={40} />
                             </div>
                             
                             <div 
                                className="h-24 bg-emerald-400/20 rounded-[20px] border border-emerald-400/40 relative flex items-center justify-center transition-all duration-700 group-hover/stage:shadow-[0_0_50px_rgba(52,211,153,0.2)]"
                                style={{ width: `${Math.max(4, token.value)}px` }}
                             >
                                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-400 uppercase tracking-widest whitespace-nowrap opacity-0 group-hover/stage:opacity-100 transition-all translate-y-2 group-hover/stage:translate-y-0">
                                     Shift: {token.value}px
                                 </div>
                                 <div className="absolute inset-y-0 left-0 w-px bg-emerald-400/40" />
                                 <div className="absolute inset-y-0 right-0 w-px bg-emerald-400/40" />
                                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-emerald-400/20" />
                             </div>

                             <div className="w-24 h-24 bg-white/5 rounded-[24px] border border-white/10 shadow-3xl flex items-center justify-center animate-in fade-in zoom-in duration-700">
                                   <Layers className="text-white/5" size={40} />
                             </div>
                        </div>

                        {/* Industrial Metadata */}
                        <div className="absolute bottom-6 flex gap-4">
                            <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">
                                Projection Stage: S-{idx + 1}
                            </div>
                        </div>
                  </div>

                  <div className="absolute top-0 right-0 py-10 px-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity rotate-90 origin-top-right">
                         <span className="text-4xl font-black uppercase tracking-[1em] whitespace-nowrap">SPATIAL CORE SYSTEM</span>
                  </div>
              </div>
          ))}
      </div>

      {/* Footer Branding */}
      <div className="pt-24 pb-12 flex justify-between items-center opacity-10">
           <div className="h-px w-48 bg-white"></div>
           <span className="text-[10px] font-black uppercase tracking-[1em]">Universal Spatial Logic</span>
           <div className="h-px w-48 bg-white"></div>
      </div>
    </div>
  );
};

export default SpacingSystem;