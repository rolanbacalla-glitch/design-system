import React, { useState, useEffect } from 'react';
import { ColourToken } from '../types';
import { getPaletteSuggestions } from '../services/geminiService';
import { hexToRgb, getLuminance, getContrastRatio } from '../utils';
import { 
  Palette, 
  Sparkles, 
  Zap, 
  RefreshCcw, 
  Terminal, 
  Check, 
  Contrast, 
  Eye, 
  EyeOff, 
  Search, 
  Command,
  Layers,
  Cpu,
  UnfoldVertical,
  Maximize2
} from 'lucide-react';

// --- Contrast Lab Component ---

const ContrastLab: React.FC = () => {
    const [textColour, setTextColour] = useState('#00E5FF');
    const [bgColour, setBgColour] = useState('#0B1015');
    const [contrast, setContrast] = useState(0);

    useEffect(() => {
        const textRgb = hexToRgb(textColour);
        const bgRgb = hexToRgb(bgColour);
        if (textRgb && bgRgb) {
            const ratio = getContrastRatio(getLuminance(textRgb.r, textRgb.g, textRgb.b), getLuminance(bgRgb.r, bgRgb.g, bgRgb.b));
            setContrast(parseFloat(ratio.toFixed(2)));
        }
    }, [textColour, bgColour]);

    const status = contrast >= 7 ? 'ELITE' : contrast >= 4.5 ? 'PASS' : contrast >= 3 ? 'FAIR' : 'FAIL';
    const statusColor = status === 'FAIL' ? 'text-red-400' : status === 'FAIR' ? 'text-amber-400' : 'text-emerald-400';

    return (
        <section className="glass-premium p-12 rounded-[60px] border border-white/10 shadow-5xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <Contrast size={160} />
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                {/* Controls */}
                <div className="lg:col-span-5 space-y-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-lg">
                            <Eye className="text-cyan-400" size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tightest italic uppercase">Contrast Lab</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-1">Fore (Text)</label>
                            <div className="relative group/input">
                                <input 
                                    type="text" value={textColour} onChange={(e) => setTextColour(e.target.value)}
                                    title="Text color"
                                    className="w-full bg-black/40 rounded-[28px] border border-white/10 p-6 text-lg font-black text-white focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner uppercase font-mono"
                                />
                                <input 
                                    type="color" value={textColour} onChange={(e) => setTextColour(e.target.value)}
                                    title="Color picker"
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 pointer-events-none" style={{ backgroundColor: textColour }} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-1">Back (Canvas)</label>
                            <div className="relative group/input">
                                <input 
                                    type="text" value={bgColour} onChange={(e) => setBgColour(e.target.value)}
                                    title="Background color"
                                    className="w-full bg-black/40 rounded-[28px] border border-white/10 p-6 text-lg font-black text-white focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner uppercase font-mono"
                                />
                                <input 
                                    type="color" value={bgColour} onChange={(e) => setBgColour(e.target.value)}
                                    title="Color picker"
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 pointer-events-none" style={{ backgroundColor: bgColour }} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/40 rounded-[40px] border border-white/10 p-8 shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Cpu size={40} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 block">Ratio Analysis</span>
                                <span className={`text-6xl font-black tracking-tightest leading-none ${statusColor}`}>{contrast}:1</span>
                            </div>
                            <div className="text-right space-y-2">
                                <div className={`px-6 py-2 rounded-full border uppercase text-[10px] font-black tracking-widest ${statusColor} border-current bg-current/5 shadow-xl`}>
                                    {status}
                                </div>
                                <div className="flex gap-1 justify-end opacity-20 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[9px] font-black text-white px-2 py-0.5 rounded border border-white/10">WCAG AA</span>
                                    <span className="text-[9px] font-black text-white px-2 py-0.5 rounded border border-white/10">AAA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Stage */}
                <div 
                    className="lg:col-span-7 rounded-[48px] p-16 flex flex-col items-center justify-center text-center shadow-inner relative transition-all duration-700 min-h-[440px] border border-white/10 overflow-hidden group perspective-[1000px]"
                    style={{ backgroundColor: bgColour, color: textColour }}
                >
                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay [background-image:linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] [background-size:32px_32px]"></div>
                    <div className="relative space-y-8 transform-gpu group-hover:translate-z-10 transition-transform duration-700">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tightest leading-none uppercase italic translate-y-2">Spectre</h2>
                        <p className="text-xl md:text-2xl font-medium max-w-md leading-relaxed uppercase tracking-widest opacity-80 decoration-current decoration-2 underline-offset-8 decoration-dotted">
                            Precision clarity protocols for the next evolution of structural interfaces.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <div className="w-12 h-1.5 rounded-full bg-current opacity-20"></div>
                            <div className="w-24 h-1.5 rounded-full bg-current opacity-60"></div>
                            <div className="w-12 h-1.5 rounded-full bg-current opacity-20"></div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
};

// --- Main Palette Component ---

interface ColourPaletteProps {
  colours: ColourToken[];
  setColours: (colours: ColourToken[]) => void;
  applyTheme: boolean;
  setApplyTheme: (apply: boolean) => void;
}

const ColourPalette: React.FC<ColourPaletteProps> = ({ colours, setColours, applyTheme, setApplyTheme }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedToken, setCopiedToken] = useState<string | null>(null);

    const handleColourChange = (name: string, value: string) => {
        setColours(colours.map(c => c.name === name ? { ...c, value } : c));
    };

    const handleSuggestPalette = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const suggestions = await getPaletteSuggestions(colours);
            setColours(colours.map(c => suggestions[c.name] ? { ...c, value: suggestions[c.name] } : c));
        } catch (err: any) {
            setError(err.message || 'Chromatic synthesis failure.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyTokenCss = (token: ColourToken) => {
        navigator.clipboard.writeText(`--color-${token.name}: ${token.value};`);
        setCopiedToken(token.name);
        setTimeout(() => setCopiedToken(null), 2000);
    };

    return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative max-w-7xl">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
              <Sparkles className="text-cyan-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Spectrum Registry v3.0</span>
          </div>
          <h2 className="text-7xl md:text-9xl font-black text-white tracking-tightest leading-none uppercase italic">
            Chroma <span className="text-white/30">Registry.</span>
          </h2>
          <p className="text-xl font-medium text-white/30 max-w-2xl leading-relaxed uppercase tracking-widest px-1">
            Architecting the visual DNA through high-fidelity chromatic transitions and multi-spectrum physics.
          </p>
        </div>
        
        <div className="flex items-center gap-6 flex-wrap">
            <button 
                onClick={() => setApplyTheme(!applyTheme)}
                className={`group flex items-center gap-4 px-10 py-5 rounded-[28px] border transition-all duration-700 font-black text-[10px] uppercase tracking-widest shadow-2xl active:scale-95
                    ${applyTheme ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-400 shadow-cyan-500/10' : 'bg-white/5 border-white/10 text-white/20 hover:text-white/60'}`}
            >
                {applyTheme ? <Check size={18} strokeWidth={3} /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
                Environment Sync
            </button>

            <button
                onClick={handleSuggestPalette}
                disabled={isLoading}
                className="relative overflow-hidden group flex items-center gap-4 bg-white text-black font-black py-5 px-12 rounded-[28px] transition-all duration-500 disabled:opacity-50 shadow-4xl hover:scale-[1.05] active:scale-95"
            >
                {isLoading ? <RefreshCcw size={18} className="animate-spin" /> : <Zap size={18} className="group-hover:rotate-12 transition-transform" />}
                {isLoading ? 'Processing DNA...' : 'AI SYNTHESIS'}
            </button>
        </div>
      </section>

      {error && (
        <div className="glass-premium p-10 rounded-[40px] border border-red-500/30 bg-red-500/5 flex items-center gap-8 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 rounded-[24px] bg-red-500/20 flex items-center justify-center border border-red-500/30">
            <Command className="text-red-500" />
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-xl text-white uppercase italic tracking-tightest">Chromatic Exception</h4>
            <p className="text-red-400/80 font-bold uppercase text-[11px] tracking-widest">{error}</p>
          </div>
        </div>
      )}

      {/* Lab Modules */}
      <div className="grid grid-cols-1 gap-20">
        <ContrastLab />

        <div className="space-y-12">
          <div className="flex items-center gap-6 px-4">
              <h3 className="text-4xl font-black text-white tracking-tightest italic uppercase">Vector Tokens</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {colours.map((token, idx) => (
              <div 
                  key={token.name} 
                  className="p-10 glass-premium rounded-[50px] border border-white/10 shadow-5xl group hover:border-cyan-400/40 transition-all duration-700 relative overflow-hidden flex flex-col gap-10"
              >
                  <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                          <div 
                              className="w-20 h-20 rounded-[32px] border-4 border-white/10 shadow-4xl group-hover:scale-105 transition-transform duration-700 relative overflow-hidden" 
                              style={{ backgroundColor: token.value }}
                          >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent shadow-inner"></div>
                          </div>
                          <div className="space-y-1">
                              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 block">Ref: 0x0{idx + 1}</span>
                              <h4 className="text-3xl font-black text-white italic uppercase tracking-tightest leading-none">{token.label}</h4>
                          </div>
                      </div>
                      <button 
                          onClick={() => copyTokenCss(token)}
                          className={`p-4 rounded-2xl transition-all border ${copiedToken === token.name ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/5 text-white/20 hover:text-white hover:bg-white/10'}`}
                      >
                         {copiedToken === token.name ? <Check size={18} strokeWidth={3} /> : <Terminal size={18} />}
                      </button>
                  </div>

                  <p className="text-sm font-medium text-white/30 uppercase tracking-widest leading-relaxed line-clamp-2 px-1">{token.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-end pt-10 border-t border-white/10">
                      <div className="sm:col-span-3 space-y-3">
                          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/10 px-1">HEX Signature</label>
                          <div className="relative group/hex">
                             <input 
                                type="text" value={token.value.toUpperCase()} title="Hex value"
                                onChange={(e) => handleColourChange(token.name, e.target.value)}
                                className="w-full bg-black/40 rounded-[20px] border border-white/5 p-4 text-sm font-black text-white font-mono tracking-widest focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner uppercase"
                             />
                             <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-20"><Palette size={14} /></div>
                          </div>
                      </div>
                      <div className="sm:col-span-2 space-y-3">
                          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/10 px-1">Optical Pick</label>
                          <div className="relative h-[54px] w-full rounded-[20px] border border-white/5 overflow-hidden">
                              <input 
                                 type="color" value={token.value} title="Color picker"
                                 onChange={(e) => handleColourChange(token.name, e.target.value)}
                                 className="absolute inset-0 w-full h-[150%] -translate-y-4 cursor-pointer scale-125"
                              />
                          </div>
                      </div>
                  </div>

                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none rotate-90 origin-top-right">
                       <span className="text-4xl font-black uppercase tracking-[1em] whitespace-nowrap">CHROMA CORE</span>
                  </div>
              </div>
              ))}
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-24 pb-12 flex justify-between items-center opacity-10">
           <div className="h-px w-64 bg-white"></div>
           <span className="text-[10px] font-black uppercase tracking-[1.2em]">Universal Registry End</span>
           <div className="h-px w-64 bg-white"></div>
      </div>
    </div>
  );
};

export default ColourPalette;
