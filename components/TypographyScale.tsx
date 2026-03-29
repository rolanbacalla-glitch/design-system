import React, { useState } from 'react';
import { TypographyToken } from '../types';
import { 
  Type, 
  Settings2, 
  Terminal, 
  Code, 
  Download, 
  Check, 
  Monitor, 
  Smartphone, 
  Maximize2,
  ChevronRight,
  Sparkles,
  Layers,
  Search,
  Zap
} from 'lucide-react';

interface TypographyScaleProps {
  typography: TypographyToken[];
  setTypography: (typography: TypographyToken[]) => void;
}

const fontFamilies = ['SF Pro', 'Inter', 'Roboto', 'Montserrat', 'Space Grotesk', 'Outfit', 'Playfair Display'];
const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const TypographyScale: React.FC<TypographyScaleProps> = ({ typography, setTypography }) => {
  const [globalFont, setGlobalFont] = useState(typography[0]?.fontFamily || 'Outfit');
  const [isGlobalSync, setIsGlobalSync] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [previewText, setPreviewText] = useState('Foundry Precision Logic v3.0');

  const handleGlobalFontChange = (font: string) => {
    setGlobalFont(font);
    if (isGlobalSync) {
        setTypography(typography.map(t => ({ ...t, fontFamily: font })));
    }
  };

  const toggleGlobalSync = (checked: boolean) => {
    setIsGlobalSync(checked);
    if (checked) {
        setTypography(typography.map(t => ({ ...t, fontFamily: globalFont })));
    }
  };

  const handleTypographyChange = <K extends keyof TypographyToken>(
    name: string,
    field: K,
    value: TypographyToken[K]
  ) => {
    setTypography(typography.map(typo =>
      typo.name === name ? { ...typo, [field]: value } : typo
    ));
  };

  const copyCSS = (token: TypographyToken) => {
      const css = `/* ${token.label} */\nfont-family: "${token.fontFamily}";\nfont-weight: ${token.fontWeight};\nfont-size: ${token.fontSize}px;\nline-height: ${token.lineHeight}px;\nletter-spacing: ${token.letterSpacing}px;`;
      navigator.clipboard.writeText(css);
      setCopiedToken(token.name);
      setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        
        {/* Hero Header */}
        <section className="space-y-8 max-w-5xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                <Zap className="text-blue-400 animate-pulse" size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Foundry Engine v3.0</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black text-white tracking-tightest leading-none uppercase italic">
                Type <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Arch.</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-12 items-start">
                <p className="text-xl font-medium text-white/30 max-w-2xl leading-relaxed uppercase tracking-widest px-1">
                    Defining the mathematical harmony of structural communication through variable axis modulation and spatial weight protocols.
                </p>
                <div className="flex bg-black/40 rounded-[28px] p-2 border border-white/10 shadow-inner">
                    <button 
                        onClick={() => setViewMode('desktop')}
                        className={`p-4 rounded-[22px] transition-all ${viewMode === 'desktop' ? 'bg-white text-black shadow-2xl' : 'text-white/20 hover:text-white'}`}
                    >
                        <Monitor size={20} />
                    </button>
                    <button 
                        onClick={() => setViewMode('mobile')}
                        className={`p-4 rounded-[22px] transition-all ${viewMode === 'mobile' ? 'bg-white text-black shadow-2xl' : 'text-white/20 hover:text-white'}`}
                    >
                        <Smartphone size={20} />
                    </button>
                </div>
            </div>
        </section>

        {/* Console Config */}
        <section className="glass-premium p-12 rounded-[60px] border border-white/10 shadow-4xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <Settings2 size={160} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                <div className="lg:col-span-4 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <Type className="text-blue-400" size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tightest italic uppercase">Master Foundry</h3>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-1">Global Typeface Protocol</label>
                        <div className="relative group/select">
                            <select 
                                value={globalFont} 
                                onChange={(e) => handleGlobalFontChange(e.target.value)}
                                title="Global font"
                                className="w-full bg-black/40 rounded-[24px] border border-white/10 p-6 text-white text-lg font-black tracking-tightest appearance-none cursor-pointer focus:border-blue-400/50 transition-all shadow-inner uppercase font-mono"
                            >
                                {fontFamilies.map(ff => <option key={ff} value={ff} className="bg-slate-950 text-white">{ff}</option>)}
                            </select>
                            <ChevronRight size={20} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover/select:text-white rotate-90 transition-all" />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8 self-end pb-1">
                     <label className="flex items-center gap-6 cursor-pointer group bg-white/5 p-6 rounded-[32px] border border-white/5 hover:border-blue-400/30 transition-all shadow-inner">
                        <div className="relative flex items-center">
                            <input 
                                type="checkbox" 
                                checked={isGlobalSync} 
                                title="Global sync"
                                onChange={(e) => toggleGlobalSync(e.target.checked)}
                                className="peer sr-only"
                            />
                            <div className="w-10 h-10 rounded-[14px] border-2 border-white/10 peer-checked:bg-blue-400 peer-checked:border-blue-400 bg-black/40 transition-all flex items-center justify-center shadow-lg group-hover:border-white/30">
                                 {isGlobalSync && <Check size={20} className="text-black font-black" />}
                            </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-lg font-black text-white tracking-tightest uppercase italic leading-none block">Nuclear Sync</span>
                          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block">Lock master typeface across manifest</span>
                        </div>
                    </label>
                </div>

                <div className="lg:col-span-4 space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-1">Specimen Preview Logic</label>
                        <div className="relative group/input">
                            <input 
                                type="text"
                                value={previewText}
                                title="Preview text"
                                onChange={(e) => setPreviewText(e.target.value)}
                                className="w-full bg-black/40 rounded-[24px] border border-white/10 p-6 text-white text-lg font-black tracking-tightest focus:outline-none focus:border-blue-400/50 transition-all shadow-inner placeholder:text-white/5"
                                placeholder="..."
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                                <Code size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Specimen Matrix */}
        <div className="grid grid-cols-1 gap-10">
            {typography.map((token, idx) => (
                <div 
                    key={token.name} 
                    className="p-12 glass-premium rounded-[60px] border border-white/10 shadow-5xl relative group hover:border-blue-400/40 transition-all duration-700 overflow-hidden flex flex-col lg:flex-row gap-16 item-center"
                >
                    {/* Token Info & Controls */}
                    <div className="lg:w-96 space-y-10 border-b lg:border-b-0 lg:border-r border-white/10 pb-10 lg:pb-0 lg:pr-16 shrink-0">
                         <div className="flex justify-between items-start">
                             <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Ref: 0x0{idx + 1}</span>
                                </div>
                                <h4 className="text-3xl font-black text-white uppercase italic tracking-tightest leading-none">{token.label}</h4>
                             </div>
                             <button 
                                onClick={() => copyCSS(token)}
                                className={`p-4 rounded-2xl transition-all border ${copiedToken === token.name ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-lg' : 'bg-white/5 border-white/5 text-white/20 hover:text-white hover:bg-white/10 shadow-inner'}`}
                             >
                                {copiedToken === token.name ? <Check size={18} /> : <Terminal size={18} />}
                             </button>
                         </div>

                         <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-3">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/10 px-1">Optical Scale</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={token.fontSize} 
                                        title="Size"
                                        onChange={e => handleTypographyChange(token.name, 'fontSize', Number(e.target.value))}
                                        className="w-full bg-black/40 rounded-xl border border-white/5 p-4 text-white text-base font-black tracking-tightest focus:outline-none focus:border-blue-400/50 shadow-inner"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-white/10 uppercase tracking-widest pointer-events-none">PX</span>
                                </div>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/10 px-1">Leading Protocol</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={token.lineHeight} 
                                        title="Line height"
                                        onChange={e => handleTypographyChange(token.name, 'lineHeight', Number(e.target.value))}
                                        className="w-full bg-black/40 rounded-xl border border-white/5 p-4 text-white text-base font-black tracking-tightest focus:outline-none focus:border-blue-400/50 shadow-inner"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-white/10 uppercase tracking-widest pointer-events-none">PX</span>
                                </div>
                             </div>
                             <div className="space-y-3 col-span-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/10 px-1">Chroma Signature (Weight)</label>
                                <select 
                                    value={token.fontWeight}
                                    title="Weight"
                                    onChange={e => handleTypographyChange(token.name, 'fontWeight', Number(e.target.value))}
                                    className="w-full bg-black/40 rounded-xl border border-white/5 p-4 text-white text-base font-black tracking-tightest appearance-none cursor-pointer focus:border-blue-400/50 shadow-inner uppercase font-mono"
                                >
                                    {fontWeights.map(fw => <option key={fw} value={fw} className="bg-slate-950 text-white">{fw}</option>)}
                                </select>
                             </div>
                         </div>
                    </div>

                    {/* Specimen View */}
                    <div className={`flex-1 flex items-center relative overflow-hidden transition-all duration-700 ${viewMode === 'mobile' ? 'max-w-md mx-auto' : ''}`}>
                         {/* Axis Guides */}
                         <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay [background-image:linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] [background-size:20px_20px]"></div>
                         
                         <div className="relative w-full">
                            <p 
                                style={{
                                    fontFamily: token.fontFamily === 'SF Pro' ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' : token.fontFamily,
                                    fontWeight: token.fontWeight,
                                    fontSize: `${viewMode === 'mobile' ? Math.max(12, token.fontSize * 0.8) : token.fontSize}px`,
                                    lineHeight: `${viewMode === 'mobile' ? token.lineHeight * 0.8 : token.lineHeight}px`,
                                    letterSpacing: `${token.letterSpacing}px`
                                }}
                                className="text-white leading-tight w-full transition-all duration-700 cursor-text selection:bg-blue-500/30 break-words"
                            >
                                {previewText || 'Foundry Precision Logic v3.0'}
                            </p>
                            
                            {/* Metadata Overlays */}
                            <div className="mt-12 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.3em] bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                                    Axis: Z-100
                                </span>
                                <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.3em] bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                                    Vector: {token.fontWeight}
                                </span>
                            </div>
                         </div>
                    </div>

                    {/* Industrial Badge */}
                    <div className="absolute top-0 right-0 py-10 px-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity rotate-90 origin-top-right">
                         <span className="text-4xl font-black uppercase tracking-widest whitespace-nowrap">FOUNDRY SYSTEM CORE</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Action Footer */}
        <div className="pt-12 pb-24 flex justify-between items-center border-t border-white/5">
             <div className="flex gap-4">
                 <button className="px-10 py-5 bg-white text-black rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-[1.05] active:scale-95 shadow-3xl flex items-center gap-4">
                     <Download size={14} />
                     Commit Manifest
                 </button>
                 <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-white/10 hover:scale-[1.05] active:scale-95 flex items-center gap-4 shadow-xl">
                     <Maximize2 size={14} />
                     Full Specimen View
                 </button>
             </div>
             
             <div className="hidden md:flex items-center gap-8 opacity-20">
                 <div className="h-px w-32 bg-white"></div>
                 <span className="text-[10px] font-black uppercase tracking-[1em]">TERMINAL STATE</span>
             </div>
        </div>
    </div>
  );
};

export default TypographyScale;
