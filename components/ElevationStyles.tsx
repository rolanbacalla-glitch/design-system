import React, { useState } from 'react';
import { ElevationToken } from '../types';
import { 
  Layers, 
  Sun, 
  Moon, 
  Box, 
  Terminal, 
  Check, 
  Sparkles, 
  Command,
  Zap,
  Maximize2,
  Settings2,
  Cpu,
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
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-lg shadow-amber-500/5">
            <Zap className="text-amber-400" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">Spatial Hierarchy Protocol v3.0</span>
        </div>
        <h2 className="text-7xl md:text-9xl font-black text-white tracking-tightest leading-none uppercase italic">
            Shadow <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Depth.</span>
        </h2>
        <p className="text-xl font-medium text-white/30 max-w-2xl leading-relaxed uppercase tracking-widest px-1">
            Defining the gravitational hierarchy and structural integrity of information through weighted light projection and layered volumetric depth.
        </p>
      </section>

      {/* Atmospheric Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Controls Hub */}
          <aside className="lg:col-span-12 xl:col-span-4 space-y-8">
              <section className="glass-premium p-10 rounded-[50px] border border-white/10 shadow-4xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                      <Settings2 size={120} />
                  </div>
                  
                  <div className="relative z-10 space-y-12">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-lg">
                              <Sun className="text-amber-400" size={24} />
                          </div>
                          <h3 className="text-2xl font-black text-white tracking-tightest italic uppercase">Light Reactor</h3>
                      </div>

                      <div className="space-y-6">
                           <div className="flex justify-between items-end px-1">
                               <div className="space-y-1">
                                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Lumen Intensity</label>
                                   <p className="text-[9px] font-bold text-white/10 uppercase tracking-widest italic">Gamma Modulation</p>
                               </div>
                               <span className="text-2xl font-black text-amber-400">{lightIntensity}%</span>
                           </div>
                           <input 
                               type="range" min="0" max="100"
                               value={lightIntensity}
                               title="Light intensity"
                               onChange={(e) => setLightIntensity(Number(e.target.value))}
                               className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-amber-400 shadow-xl"
                           />
                      </div>

                      <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-1">Material Logic</label>
                           <div className="grid grid-cols-3 gap-3 p-2 bg-black/40 rounded-[28px] border border-white/10 shadow-inner">
                               {(['glass', 'matte', 'glossy'] as const).map(m => (
                                   <button 
                                       key={m}
                                       onClick={() => setMaterial(m)}
                                       className={`py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${material === m ? 'bg-white text-black shadow-2xl' : 'text-white/20 hover:text-white'}`}
                                   >
                                       {m}
                                   </button>
                               ))}
                           </div>
                      </div>
                  </div>
              </section>

              {/* Status Card */}
              <section className="bg-gradient-to-br from-black to-gray-900/50 p-10 rounded-[50px] border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-amber-500/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="relative space-y-6">
                      <div className="w-16 h-16 rounded-[24px] bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                          <UnfoldVertical className="text-amber-400" size={24} />
                      </div>
                      <div className="space-y-2">
                           <h5 className="text-xl font-black text-white uppercase tracking-tightest leading-none">Volumetric Integrity</h5>
                           <p className="text-[11px] font-bold text-white/20 uppercase tracking-widest leading-relaxed">System depth tokens are calibrated for P3 wide gamut displays with HDR highlight support in shadow falloff.</p>
                      </div>
                  </div>
              </section>
          </aside>

          {/* Depth Matrix */}
          <main className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              {elevation.map((token, idx) => (
                  <div 
                      key={token.name} 
                      className="group p-12 glass-premium rounded-[60px] border border-white/10 shadow-5xl relative transition-all duration-700 overflow-hidden flex flex-col gap-12 hover:border-amber-400/40"
                  >
                      {/* Depth Stage */}
                      <div className="relative flex-1 bg-black/40 rounded-[48px] border border-white/5 flex items-center justify-center p-16 min-h-[300px] shadow-inner perspective-[1000px] group-hover:bg-black/60 transition-all duration-700">
                           <div className="absolute inset-x-0 bottom-0 h-px bg-white/5" />
                           <div className="absolute inset-y-0 right-0 w-px bg-white/5" />
                           
                           {/* Floating Specimen */}
                           <div 
                                className={`w-32 h-32 rounded-[32px] border border-white/20 transition-all duration-1000 group-hover:scale-125 transform-gpu group-hover:-translate-y-8 flex items-center justify-center relative z-10 ${
                                    material === 'glass' ? 'bg-white/[0.03] backdrop-blur-xl' : 
                                    material === 'matte' ? 'bg-[#121212]' : 
                                    'bg-white/[0.08]'
                                }`}
                                style={{ 
                                    boxShadow: token.shadow.replace(/rgba\(0,0,0,0\.\d+\)/g, `rgba(0,0,0,${lightIntensity / 200})`),
                                    transform: `translateZ(${idx * 20}px) ${idx % 2 === 0 ? 'rotateY(10deg)' : 'rotateY(-10deg)'}`
                                }}
                           >
                                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                                <div className="space-y-3 px-6 w-full opacity-10 group-hover:opacity-40 transition-opacity duration-700">
                                     <div className="w-full h-1.5 bg-white/20 rounded-full" />
                                     <div className="w-3/4 h-1.5 bg-white/20 rounded-full" />
                                     <div className="w-1/2 h-1.5 bg-white/20 rounded-full" />
                                </div>
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)] animate-pulse" />
                           </div>

                           <div className="absolute bottom-6 flex gap-4">
                                <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">Z-Vector: {idx + 1}</span>
                           </div>
                      </div>

                      {/* Config Area */}
                      <div className="space-y-8">
                           <div className="flex justify-between items-end">
                                <div className="space-y-2">
                                     <div className="flex items-center gap-3">
                                         <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Token Id: {idx + 1}</span>
                                     </div>
                                     <h4 className="text-3xl font-black text-white uppercase italic tracking-tightest leading-none">{token.name}</h4>
                                </div>
                                <div className="px-6 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
                                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Level {token.level}</span>
                                </div>
                           </div>
                           
                           <div className="relative group/field">
                                <input 
                                    type="text"
                                    value={token.shadow}
                                    title="Shadow value code"
                                    onChange={(e) => handleShadowChange(token.name, e.target.value)}
                                    className="w-full bg-black/40 rounded-2xl border border-white/10 p-5 pr-16 text-[11px] text-white font-black tracking-tightest focus:outline-none focus:border-amber-400/50 shadow-inner"
                                />
                                <button 
                                    onClick={() => copyToken(token)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${copiedToken === token.name ? 'bg-emerald-500 text-black shadow-lg' : 'bg-white/5 text-white/20 hover:text-white border border-white/5'}`}
                                >
                                    {copiedToken === token.name ? <Check size={16} strokeWidth={3} /> : <Terminal size={16} />}
                                </button>
                           </div>
                      </div>

                      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-90 origin-top-right">
                           <span className="text-3xl font-black uppercase tracking-[0.6em] whitespace-nowrap">ATMOSPHERIC DEPTH</span>
                      </div>
                  </div>
              ))}
          </main>
      </div>

      {/* Footer Branding */}
      <div className="pt-24 pb-12 flex justify-center opacity-10">
           <div className="flex items-center gap-4">
                <div className="h-px w-24 bg-white"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.8em]">End of Spatial Archive</span>
                <div className="h-px w-24 bg-white"></div>
           </div>
      </div>
    </div>
  );
};

export default ElevationStyles;