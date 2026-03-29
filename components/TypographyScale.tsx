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
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 font-inter">
        
        {/* Header Section */}
        <header className="space-y-8 max-w-5xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[var(--ui-text)]/5 border border-[var(--ui-border)] shadow-lg shadow-[var(--ui-text)]/5">
                <Zap className="text-[var(--ui-text)] animate-pulse" size={14} aria-hidden="true" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--ui-text-muted)]">Foundry Engine v3.0</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[var(--ui-text)] tracking-tightest leading-none uppercase italic">
                Type <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ui-text)] to-[var(--ui-text-muted)]">Arch.</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-12 items-start">
                <p className="text-xl font-medium text-[var(--ui-text-muted)] max-w-2xl leading-relaxed uppercase tracking-widest px-1">
                    Defining the mathematical harmony of structural communication through variable axis modulation and spatial weight protocols.
                </p>
                <nav className="flex bg-[var(--ui-bg-muted)] rounded-[28px] p-2 border border-[var(--ui-border)] shadow-inner">
                    <button 
                        onClick={() => setViewMode('desktop')}
                        type="button"
                        title="Switch to Desktop View visualization mode"
                        className={`p-4 rounded-[22px] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${viewMode === 'desktop' ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-2xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                    >
                        <Monitor size={20} />
                    </button>
                    <button 
                        onClick={() => setViewMode('mobile')}
                        type="button"
                        title="Switch to Mobile View visualization mode"
                        className={`p-4 rounded-[22px] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${viewMode === 'mobile' ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-2xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                    >
                        <Smartphone size={20} />
                    </button>
                </nav>
            </div>
        </header>

        {/* Console Config */}
        <section className="glass-premium p-8 rounded-[32px] border border-[var(--ui-border)] shadow-4xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" aria-hidden="true">
                <Settings2 size={160} className="text-[var(--ui-text)]" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                <div className="lg:col-span-4 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--ui-text)]/5 flex items-center justify-center border border-[var(--ui-border)] shadow-lg" aria-hidden="true">
                            <Type className="text-[var(--ui-text)]" size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-[var(--ui-text)] tracking-tightest italic uppercase leading-none">Master Foundry</h3>
                    </div>
                    <div className="space-y-4">
                        <label htmlFor="master-typeface" className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text-muted)] px-1 block">Global Typeface Protocol</label>
                        <div className="relative group/select">
                            <select 
                                id="master-typeface"
                                value={globalFont} 
                                onChange={(e) => handleGlobalFontChange(e.target.value)}
                                title="Select global typeface protocol for synchronization"
                                className="w-full bg-[var(--ui-bg-muted)] rounded-[24px] border border-[var(--ui-border)] p-6 text-[var(--ui-text)] text-lg font-black tracking-tightest appearance-none cursor-pointer focus:outline-none focus:border-[var(--ui-text)]/40 transition-all shadow-inner uppercase font-mono"
                            >
                                {fontFamilies.map(ff => <option key={ff} value={ff} className="bg-[var(--ui-bg)] text-[var(--ui-text)]">{ff}</option>)}
                            </select>
                            <ChevronRight size={20} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--ui-text-muted)] group-hover/select:text-[var(--ui-text)] rotate-90 transition-all" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8 self-end pb-1">
                     <label htmlFor="nuclear-sync-checkbox" className="flex items-center gap-6 cursor-pointer group bg-[var(--ui-bg-muted)] p-6 rounded-[32px] border border-[var(--ui-border)] hover:border-[var(--ui-text)]/20 transition-all shadow-inner focus-within:ring-2 focus-within:ring-[var(--ui-text)]/20">
                        <div className="relative flex items-center">
                            <input 
                                id="nuclear-sync-checkbox"
                                type="checkbox" 
                                checked={isGlobalSync} 
                                title="Lock master typeface across entire typographic manifest"
                                onChange={(e) => toggleGlobalSync(e.target.checked)}
                                className="peer sr-only"
                            />
                            <div className="w-10 h-10 rounded-[14px] border-2 border-[var(--ui-border)] peer-checked:bg-[var(--ui-text)] peer-checked:border-[var(--ui-text)] bg-[var(--ui-bg)] transition-all flex items-center justify-center shadow-lg group-hover:border-[var(--ui-text-muted)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ui-text)]/20">
                                 {isGlobalSync && <Check size={20} className="text-[var(--ui-bg)]" />}
                            </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-lg font-black text-[var(--ui-text)] tracking-tightest uppercase italic leading-none block">Nuclear Sync</span>
                          <span className="text-[9px] font-bold text-[var(--ui-text-muted)] uppercase tracking-widest block">Lock master typeface across manifest</span>
                        </div>
                    </label>
                </div>

                <div className="lg:col-span-4 space-y-8">
                     <div className="space-y-4">
                        <label htmlFor="specimen-preview" className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text-muted)] px-1 block">Specimen Preview Logic</label>
                        <div className="relative group/input">
                            <input 
                                id="specimen-preview"
                                type="text"
                                value={previewText}
                                title="Edit custom specimen preview text for live visualization"
                                onChange={(e) => setPreviewText(e.target.value)}
                                className="w-full bg-[var(--ui-bg-muted)] rounded-[24px] border border-[var(--ui-border)] p-6 text-[var(--ui-text)] text-lg font-black tracking-tightest focus:outline-none focus:border-[var(--ui-text)]/20 transition-all shadow-inner placeholder:text-[var(--ui-text-muted)]"
                                placeholder="Enter preview text..."
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 text-[var(--ui-text)]" aria-hidden="true">
                                <Code size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Specimen Matrix */}
        <main className="grid grid-cols-1 gap-8">
            {typography.map((token, idx) => (
                <section 
                    key={token.name} 
                    className="p-8 glass-premium rounded-[32px] border border-[var(--ui-border)] shadow-5xl relative group hover:border-[var(--ui-text)]/20 transition-all duration-700 overflow-hidden flex flex-col lg:flex-row gap-10 items-center"
                >
                    {/* Token Info & Controls */}
                    <div className="lg:w-80 space-y-8 border-b lg:border-b-0 lg:border-r border-[var(--ui-border)] pb-8 lg:pb-0 lg:pr-10 shrink-0">
                         <div className="flex justify-between items-start">
                             <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[var(--ui-text)]/50 shadow-[0_0_10px_rgba(var(--ui-text-rgb),0.5)]" aria-hidden="true" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--ui-text-muted)]">Ref: 0x0{idx + 1}</span>
                                </div>
                                <h4 className="text-3xl font-black text-[var(--ui-text)] uppercase italic tracking-tightest leading-none">{token.label}</h4>
                             </div>
                             <button 
                                onClick={() => copyCSS(token)}
                                type="button"
                                title={`Copy ${token.label} CSS Typographic specification to clipboard`}
                                className={`p-4 rounded-2xl transition-all border focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${copiedToken === token.name ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-lg' : 'bg-[var(--ui-glass-bg)] border border-[var(--ui-border)] text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] hover:bg-[var(--ui-bg-muted)] shadow-inner'}`}
                             >
                                {copiedToken === token.name ? <Check size={18} /> : <Terminal size={18} />}
                             </button>
                         </div>

                         <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-3">
                                <label htmlFor={`size-${token.name}`} className="text-[9px] font-black uppercase tracking-widest text-[var(--ui-text-muted)] px-1 block">Optical Scale</label>
                                <div className="relative">
                                    <input 
                                        id={`size-${token.name}`}
                                        type="number" 
                                        value={token.fontSize} 
                                        title={`Typographic size optical scale adjustment for ${token.label}`}
                                        onChange={e => handleTypographyChange(token.name, 'fontSize', Number(e.target.value))}
                                        className="w-full bg-[var(--ui-bg-muted)] rounded-xl border border-[var(--ui-border)] p-4 text-[var(--ui-text)] text-base font-black tracking-tightest focus:outline-none focus:border-[var(--ui-text)]/20 shadow-inner"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-[var(--ui-text-muted)] uppercase tracking-widest pointer-events-none">PX</span>
                                </div>
                             </div>
                             <div className="space-y-3">
                                <label htmlFor={`leading-${token.name}`} className="text-[9px] font-black uppercase tracking-widest text-[var(--ui-text-muted)] px-1 block">Leading Protocol</label>
                                <div className="relative">
                                    <input 
                                        id={`leading-${token.name}`}
                                        type="number" 
                                        value={token.lineHeight} 
                                        title={`Line height spatial leading protocol for ${token.label}`}
                                        onChange={e => handleTypographyChange(token.name, 'lineHeight', Number(e.target.value))}
                                        className="w-full bg-[var(--ui-bg-muted)] rounded-xl border border-[var(--ui-border)] p-4 text-[var(--ui-text)] text-base font-black tracking-tightest focus:outline-none focus:border-[var(--ui-text)]/20 shadow-inner"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-[var(--ui-text-muted)] uppercase tracking-widest pointer-events-none">PX</span>
                                </div>
                             </div>
                             <div className="space-y-3 col-span-2">
                                <label htmlFor={`weight-${token.name}`} className="text-[9px] font-black uppercase tracking-widest text-[var(--ui-text-muted)] px-1 block">Chroma Signature (Weight)</label>
                                <div className="relative group/sel">
                                    <select 
                                        id={`weight-${token.name}`}
                                        value={token.fontWeight}
                                        title={`Typographic weight axis selection for ${token.label}`}
                                        onChange={e => handleTypographyChange(token.name, 'fontWeight', Number(e.target.value))}
                                        className="w-full bg-[var(--ui-bg-muted)] rounded-xl border border-[var(--ui-border)] p-4 text-[var(--ui-text)] text-base font-black tracking-tightest appearance-none cursor-pointer focus:outline-none focus:border-[var(--ui-text)]/20 shadow-inner uppercase font-mono"
                                    >
                                        {fontWeights.map(fw => <option key={fw} value={fw} className="bg-[var(--ui-bg)] text-[var(--ui-text)]">{fw}</option>)}
                                    </select>
                                    <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--ui-text-muted)] rotate-90" aria-hidden="true" />
                                </div>
                             </div>
                         </div>
                    </div>

                    {/* Specimen View */}
                    <div className={`flex-1 flex items-center relative overflow-hidden transition-all duration-700 ${viewMode === 'mobile' ? 'max-w-md mx-auto' : ''}`}>
                         {/* Axis Guides */}
                         <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay [background-image:linear-gradient(to_right,var(--ui-text-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--ui-text-muted)_1px,transparent_1px)] [background-size:20px_20px]" aria-hidden="true"></div>
                         
                         <div className="relative w-full">
                            <p 
                                style={{
                                    fontFamily: token.fontFamily === 'SF Pro' ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' : token.fontFamily,
                                    fontWeight: token.fontWeight,
                                    fontSize: `${viewMode === 'mobile' ? Math.max(12, token.fontSize * 0.8) : token.fontSize}px`,
                                    lineHeight: `${viewMode === 'mobile' ? token.lineHeight * 0.8 : token.lineHeight}px`,
                                    letterSpacing: `${token.letterSpacing}px`,
                                    color: 'var(--ui-text)'
                                }}
                                className="leading-tight w-full transition-all duration-700 cursor-text selection:bg-[var(--ui-text)]/[0.3] break-words"
                            >
                                {previewText || 'Foundry Precision Logic v3.0'}
                            </p>
                            
                            {/* Metadata Overlays */}
                            <div className="mt-12 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <span className="text-[9px] font-black text-[var(--ui-text-muted)] uppercase tracking-[0.3em] bg-[var(--ui-bg-muted)] px-4 py-1.5 rounded-full border border-[var(--ui-border)] shadow-sm">
                                    Axis: Z-100
                                </span>
                                <span className="text-[9px] font-black text-[var(--ui-text-muted)] uppercase tracking-[0.3em] bg-[var(--ui-bg-muted)] px-4 py-1.5 rounded-full border border-[var(--ui-border)] shadow-sm">
                                    Vector: {token.fontWeight}
                                </span>
                            </div>
                         </div>
                    </div>

                    {/* Industrial Badge */}
                    <div className="absolute top-0 right-0 py-10 px-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity rotate-90 origin-top-right" aria-hidden="true">
                         <span className="text-4xl font-black uppercase tracking-widest whitespace-nowrap text-[var(--ui-text)]">FOUNDRY SYSTEM CORE</span>
                    </div>
                </section>
            ))}
        </main>

        {/* Action Footer */}
        <footer className="pt-12 pb-24 flex justify-between items-center border-t border-[var(--ui-border)]">
             <div className="flex gap-4">
                 <button 
                    type="button" 
                    title="Commit entire typographic manifest specification to persistent project memory"
                    className="px-10 py-5 bg-[var(--ui-text)] text-[var(--ui-bg)] rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-[1.05] active:scale-95 shadow-3xl flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/40"
                >
                     <Download size={14} aria-hidden="true" />
                     Commit Manifest
                 </button>
                 <button 
                    type="button" 
                    title="Toggle full-screen typographic specimen visualization matrix"
                    className="px-10 py-5 bg-[var(--ui-bg-muted)] border border-[var(--ui-border)] text-[var(--ui-text)] rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-[var(--ui-bg)] hover:scale-[1.05] active:scale-95 flex items-center gap-4 shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20"
                >
                     <Maximize2 size={14} aria-hidden="true" />
                     Full Specimen View
                 </button>
             </div>
             
             <div className="hidden md:flex items-center gap-8 opacity-20 text-[var(--ui-text)] pointer-events-none">
                 <div className="h-px w-32 bg-current" aria-hidden="true"></div>
                 <span className="text-[10px] font-black uppercase tracking-[1em]">TERMINAL STATE</span>
             </div>
        </footer>
    </div>
  );
};

export default TypographyScale;
