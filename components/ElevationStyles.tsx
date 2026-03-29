import React, { useState } from 'react';
import { ElevationToken } from '../types';
import { 
  Sun, 
  Terminal, 
  Check, 
  Zap, 
  Settings2, 
  UnfoldVertical
} from 'lucide-react';

interface ElevationStylesProps {
  elevation: ElevationToken[];
  setElevation: (elevation: ElevationToken[]) => void;
}

const ElevationStyles: React.FC<ElevationStylesProps> = ({ elevation, setElevation }) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [lightIntensity, setLightIntensity] = useState(60);
  const [material, setMaterial] = useState<'glass' | 'matte' | 'glossy'>('glass');
  
  const handleShadowChange = (name: string, value: string) => {
    setElevation(elevation.map(e =>
      e.name === name ? { ...e, shadow: value } : e
    ));
  };

  const copyToken = (token: ElevationToken) => {
    const css = `--elevation-${token.name}: ${token.shadow};`;
    navigator.clipboard.writeText(css);
    setCopiedToken(token.name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      
      {/* Hero Header */}
      <section className="space-y-8 max-w-5xl">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[var(--ui-text)]/5 border border-[var(--ui-border)] shadow-lg shadow-[var(--ui-text)]/5">
            <Zap className="text-[var(--ui-text)]" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--ui-text-muted)]">Spatial Hierarchy Protocol v3.0</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-[var(--ui-text)] tracking-tightest leading-none uppercase">
            Shadow <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ui-text)] to-[var(--ui-text-muted)]">Depth.</span>
        </h2>
        <p className="text-xl font-medium text-[var(--ui-text-muted)] max-w-2xl leading-relaxed uppercase tracking-widest px-1">
            Defining the gravitational hierarchy and structural integrity of information through weighted light projection and layered volumetric depth.
        </p>
      </section>

      {/* Atmospheric Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Controls Hub */}
          <aside className="lg:col-span-12 xl:col-span-4 space-y-8">
              <section className="glass-premium p-10 rounded-[50px] border border-[var(--ui-border)] shadow-4xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                      <Settings2 size={120} className="text-[var(--ui-text)]" />
                  </div>
                  
                  <div className="relative z-10 space-y-12">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[var(--ui-text)]/5 flex items-center justify-center border border-[var(--ui-border)] shadow-lg">
                              <Sun className="text-[var(--ui-text)]" size={24} />
                          </div>
                          <h3 className="text-2xl font-black text-[var(--ui-text)] tracking-tightest uppercase">Light Reactor</h3>
                      </div>

                      <div className="space-y-6">
                           <div className="flex justify-between items-end px-1">
                               <div className="space-y-1">
                                   <label htmlFor="lumen-intensity" className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text-muted)]">Lumen Intensity</label>
                                   <p className="text-[9px] font-bold text-[var(--ui-text-muted)] uppercase tracking-widest">Gamma Modulation</p>
                               </div>
                               <span className="text-2xl font-black text-[var(--ui-text)]">{lightIntensity}%</span>
                           </div>
                           <input 
                               id="lumen-intensity"
                               type="range" min="0" max="100"
                               value={lightIntensity}
                               title="Spatial light intensity gamma modulation"
                               onChange={(e) => setLightIntensity(Number(e.target.value))}
                               className="w-full h-1.5 bg-[var(--ui-bg-muted)] rounded-full appearance-none cursor-pointer accent-[var(--ui-text)] shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20"
                           />
                      </div>

                      <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text-muted)] px-1">Material Logic</label>
                           <div className="grid grid-cols-3 gap-3 p-2 bg-[var(--ui-bg-muted)] rounded-[28px] border border-[var(--ui-border)] shadow-inner">
                               {(['glass', 'matte', 'glossy'] as const).map(m => (
                                   <button 
                                       key={m}
                                       type="button"
                                       onClick={() => setMaterial(m)}
                                       title={`Apply volumetric ${m} material logic`}
                                       className={`py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-1 focus:ring-[var(--ui-text)]/20 ${material === m ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-2xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                                   >
                                       {m}
                                   </button>
                               ))}
                           </div>
                      </div>
                  </div>
              </section>

              {/* Status Card */}
              <section className="bg-gradient-to-br from-[var(--ui-bg)] to-[var(--ui-bg-muted)] p-10 rounded-[50px] border border-[var(--ui-border)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-[var(--ui-text)]/5 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="relative space-y-6">
                      <div className="w-16 h-16 rounded-[24px] bg-[var(--ui-text)]/5 flex items-center justify-center border border-[var(--ui-border)]">
                          <UnfoldVertical className="text-[var(--ui-text)]" size={24} />
                      </div>
                      <div className="space-y-2">
                           <h5 className="text-xl font-black text-[var(--ui-text)] uppercase tracking-tightest leading-none">Volumetric Integrity</h5>
                           <p className="text-[11px] font-bold text-[var(--ui-text-muted)] uppercase tracking-widest leading-relaxed">System depth tokens are calibrated for P3 wide gamut displays with HDR highlight support in shadow falloff.</p>
                      </div>
                  </div>
              </section>
          </aside>

          {/* Depth Matrix */}
          <main className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              {elevation.map((token, idx) => (
                  <div 
                      key={token.name} 
                      className="group p-12 glass-premium rounded-[60px] border border-[var(--ui-border)] shadow-5xl relative transition-all duration-700 overflow-hidden flex flex-col gap-12 hover:border-[var(--ui-text)]/20"
                  >
                      {/* Depth Stage */}
                      <div className="relative flex-1 bg-[var(--ui-bg-muted)] rounded-[48px] border border-[var(--ui-border)] flex items-center justify-center p-16 min-h-[300px] shadow-inner perspective-[1000px] group-hover:bg-[var(--ui-bg)] transition-all duration-700">
                           <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--ui-border)]" />
                           <div className="absolute inset-y-0 right-0 w-px bg-[var(--ui-border)]" />
                           
                           {/* Floating Specimen */}
                           <div 
                                className={`w-32 h-32 rounded-[32px] border border-[var(--ui-border)] transition-all duration-1000 group-hover:scale-125 transform-gpu group-hover:-translate-y-8 flex items-center justify-center relative z-10 ${
                                    material === 'glass' ? 'bg-[var(--ui-glass-bg)] backdrop-blur-xl' : 
                                    material === 'matte' ? 'bg-[var(--ui-bg)]' : 
                                    'bg-[var(--ui-text)]/[0.08]'
                                }`}
                                style={{ 
                                    boxShadow: token.shadow.replace(/rgba\(0,0,0,0\.\d+\)/g, `rgba(var(--ui-text-rgb),${lightIntensity / 200})`),
                                    transform: `translateZ(${idx * 20}px) ${idx % 2 === 0 ? 'rotateY(10deg)' : 'rotateY(-10deg)'}`
                                }}
                           >
                                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[var(--ui-text)]/10 to-transparent opacity-50"></div>
                                <div className="space-y-3 px-6 w-full opacity-10 group-hover:opacity-40 transition-opacity duration-700">
                                     <div className="w-full h-1.5 bg-[var(--ui-text-muted)]/20 rounded-full" />
                                     <div className="w-3/4 h-1.5 bg-[var(--ui-text-muted)]/20 rounded-full" />
                                     <div className="w-1/2 h-1.5 bg-[var(--ui-text-muted)]/20 rounded-full" />
                                </div>
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--ui-text)]/50 shadow-[0_0_10px_rgba(var(--ui-text-rgb),0.6)] animate-pulse" />
                           </div>

                           <div className="absolute bottom-6 flex gap-4">
                                <span className="text-[9px] font-black text-[var(--ui-text-muted)] uppercase tracking-[0.4em]">Z-Vector: {idx + 1}</span>
                           </div>
                      </div>

                      {/* Config Area */}
                      <div className="space-y-8">
                           <div className="flex justify-between items-end">
                                <div className="space-y-2">
                                     <div className="flex items-center gap-3">
                                         <span className="text-[9px] font-black text-[var(--ui-text-muted)] uppercase tracking-[0.4em]">Token Id: {idx + 1}</span>
                                     </div>
                                     <h4 className="text-3xl font-black text-[var(--ui-text)] uppercase tracking-tightest leading-none">{token.name}</h4>
                                </div>
                                <div className="px-6 py-2 bg-[var(--ui-text)]/5 border border-[var(--ui-border)] rounded-full">
                                    <span className="text-[10px] font-black text-[var(--ui-text)] uppercase tracking-widest">Level {token.level}</span>
                                </div>
                           </div>
                           
                           <div className="relative group/field">
                                <label htmlFor={`shadow-${token.name}`} className="sr-only">Shadow value string for {token.name}</label>
                                <input 
                                    id={`shadow-${token.name}`}
                                    type="text"
                                    value={token.shadow}
                                    title={`Edit shadow vector string for ${token.name}`}
                                    onChange={(e) => handleShadowChange(token.name, e.target.value)}
                                    className="w-full bg-[var(--ui-bg-muted)] rounded-2xl border border-[var(--ui-border)] p-5 pr-16 text-[11px] text-[var(--ui-text)] font-black tracking-tightest focus:outline-none focus:border-[var(--ui-text)]/20 shadow-inner"
                                />
                                <button 
                                    type="button"
                                    onClick={() => copyToken(token)}
                                    title={`Copy ${token.name} shadow token specification`}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${copiedToken === token.name ? 'bg-emerald-500 text-black shadow-lg' : 'bg-[var(--ui-bg-muted)] text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] border border-[var(--ui-border)] shadow-sm'}`}
                                >
                                    {copiedToken === token.name ? <Check size={16} strokeWidth={3} /> : <Terminal size={16} />}
                                </button>
                           </div>
                      </div>

                      {/* Industrial Metadata */}
                      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-90 origin-top-right">
                           <span className="text-3xl font-black uppercase tracking-[0.6em] whitespace-nowrap text-[var(--ui-text)]">ATMOSPHERIC DEPTH</span>
                      </div>
                  </div>
              ))}
          </main>
      </div>

      {/* Footer Branding */}
      <div className="pt-24 pb-12 flex justify-center opacity-10">
           <div className="flex items-center gap-4">
                <div className="h-px w-24 bg-[var(--ui-text)]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[var(--ui-text)]">End of Spatial Archive</span>
                <div className="h-px w-24 bg-[var(--ui-text)]"></div>
           </div>
      </div>
    </div>
  );
};

export default ElevationStyles;