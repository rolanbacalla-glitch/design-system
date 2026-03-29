import React, { useState, useEffect, useMemo } from 'react';
import { IconSizeToken, ColourToken } from '../types';
import { 
  Search, 
  Command, 
  Cpu, 
  Zap, 
  X, 
  Download, 
  Copy as CopyIcon, 
  Check, 
  ChevronDown,
  Sparkles,
  Layers,
  Monitor
} from 'lucide-react';

interface IconographyProps {
  iconSizes: IconSizeToken[];
  setIconSizes: (sizes: IconSizeToken[]) => void;
  iconStyle: 'filled' | 'outlined';
  setIconStyle: (style: 'filled' | 'outlined') => void;
  iconWeight: number;
  setIconWeight: (weight: number) => void;
  colours: ColourToken[];
}

const defaultPreviewIcons = [
    'search', 'home', 'settings', 'check_circle', 'warning', 'menu', 
    'favorite', 'share', 'delete', 'edit', 'info', 'add', 
    'arrow_forward', 'star', 'notifications', 'account_circle',
    'face', 'fingerprint', 'verified', 'light_mode', 'dark_mode',
    'shopping_cart', 'visibility', 'language'
];

interface IconAssetModalProps {
  icon: string;
  sizeToken: IconSizeToken;
  initialColour: string;
  initialWeight: number;
  initialFill: boolean;
  onClose: () => void;
}

const IconAssetModal: React.FC<IconAssetModalProps> = ({ icon, sizeToken, initialColour, initialWeight, initialFill, onClose }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'web' | 'svg'>('web');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  
  const [weight, setWeight] = useState(initialWeight);
  const [filled, setFilled] = useState(initialFill);
  const [colour, setColour] = useState(initialColour);
  const [size, setSize] = useState(sizeToken.value);
  const [, setFetchError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFetchError(false);

    let params = 'default';
    const parts = [];
    if (filled) parts.push('fill1');
    if (weight !== 400) parts.push(`wght${weight}`);
    parts.sort();
    if (parts.length > 0) params = parts.join('_');

    const url = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${icon}/${params}/24px.svg`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.text();
      })
      .then(text => {
        setSvgContent(text);
        setLoading(false);
      })
      .catch(() => {
        fetch(`https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${icon}/default/24px.svg`)
          .then(res => res.text())
          .then(text => {
             setSvgContent(text);
             setFetchError(true);
             setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, [icon, weight, filled]);

  const getProcessedSvg = () => {
    if (!svgContent) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svg = doc.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', size.toString());
      svg.setAttribute('height', size.toString());
      svg.setAttribute('fill', colour);
      if (!svg.getAttribute('viewBox')) svg.setAttribute('viewBox', '0 0 24 24');
      return svg.outerHTML;
    }
    return svgContent;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(label);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  const exportSvg = () => {
    const svgData = getProcessedSvg();
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${icon}_${size}px.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[var(--ui-bg)]/80 backdrop-blur-4xl animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="glass-premium bg-[var(--ui-surface)]/90 rounded-[50px] shadow-5xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-[var(--ui-border)] relative" 
        onClick={e => e.stopPropagation()}
      >
        {/* Atmosphere Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--ui-text)]/5 blur-[150px] rounded-full -mr-48 -mt-48 pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between p-10 border-b border-[var(--ui-border)] relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 rounded-[28px] bg-[var(--ui-bg-muted)] flex items-center justify-center border border-[var(--ui-border)] shadow-inner group">
                <div className="w-full h-full flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6">
                    <span className="material-symbols-outlined text-5xl" style={{ 
                        color: colour,
                        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`
                    }}>{icon}</span>
                </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl font-black text-[var(--ui-text)] capitalize tracking-tightest leading-none">{icon.replace(/_/g, ' ')}</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text)] opacity-40">System Vector Asset // Ref-00{icon.length}</p>
            </div>
          </div>
          <button 
            type="button"
            title="Close modal"
            onClick={onClose} 
            className="w-14 h-14 flex items-center justify-center bg-[var(--ui-text)]/5 hover:bg-red-500/20 text-[var(--ui-text)]/40 hover:text-red-400 rounded-2xl transition-all active:scale-90 border border-[var(--ui-border)] focus:outline-none focus:ring-2 focus:ring-red-500/40"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Configuration */}
            <div className="lg:col-span-7 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-8">
                       <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ui-text-muted)] block px-1">Structure Variant</label>
                        <div className="flex bg-[var(--ui-bg-muted)] rounded-[20px] p-1.5 border border-[var(--ui-border)] shadow-inner">
                            <button 
                              type="button"
                              onClick={() => setFilled(false)}
                              title="Set outlined style for asset"
                              className={`flex-1 py-3 px-6 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${!filled ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                            >
                              Outlined
                            </button>
                            <button 
                              type="button"
                              onClick={() => { setFilled(true); setWeight(400); }}
                              title="Set filled style for asset"
                              className={`flex-1 py-3 px-6 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${filled ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                            >
                              Filled
                            </button>
                        </div>
                      </div>

                      {!filled && (
                        <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-500">
                             <div className="flex justify-between items-center px-1">
                                <label htmlFor="asset-optical-weight" className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">Optical Weight</label>
                                <span className="text-xs font-black text-[var(--ui-text)]">{weight}</span>
                            </div>
                            <input 
                                id="asset-optical-weight"
                                type="range" min="100" max="700" step="100"
                                value={weight}
                                title="Stroke weight adjustment"
                                onChange={(e) => setWeight(Number(e.target.value))}
                                className="w-full h-1 bg-[var(--ui-text)]/5 rounded-full appearance-none cursor-pointer accent-[var(--ui-text)]"
                            />
                        </div>
                      )}

                      <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-500">
                           <div className="flex justify-between items-center px-1">
                              <label htmlFor="asset-scale-protocol" className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">Scale Protocol</label>
                              <span className="text-xs font-black text-[var(--ui-text)]">{size}px</span>
                          </div>
                          <input 
                              id="asset-scale-protocol"
                              type="range" min="16" max="96" step="4"
                              value={size}
                              title="Global scale adjustment"
                              onChange={(e) => setSize(Number(e.target.value))}
                              className="w-full h-1 bg-[var(--ui-text)]/5 rounded-full appearance-none cursor-pointer accent-[var(--ui-text)]"
                          />
                      </div>
                   </div>

                   <div className="space-y-8">
                       <div className="space-y-4">
                          <label htmlFor="asset-colour-input" className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ui-text-muted)] block px-1">Chroma Instance</label>
                          <div className="flex items-center gap-4 bg-[var(--ui-bg-muted)] px-5 py-4 rounded-[24px] border border-[var(--ui-border)] shadow-inner group/input focus-within:border-[var(--ui-text)]/20 transition-all">
                              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[var(--ui-border)] shadow-2xl flex-shrink-0">
                                  <input 
                                    id="asset-colour-picker"
                                    type="color" 
                                    value={colour} 
                                    title="Visual chroma picker"
                                    onChange={e => setColour(e.target.value)} 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer scale-[5]" 
                                  />
                                  <div className="w-full h-full" style={{ backgroundColor: colour }} />
                              </div>
                              <input 
                                id="asset-colour-input"
                                type="text" 
                                value={colour.toUpperCase()} 
                                title="HEX chroma signature"
                                onChange={e => setColour(e.target.value)} 
                                className="flex-1 bg-transparent border-none text-[var(--ui-text)] text-lg font-black tracking-tightest focus:ring-0 outline-none uppercase font-mono" 
                              />
                          </div>
                       </div>
                   </div>
              </div>

              {/* Preview Canvas */}
              <div className="bg-[var(--ui-bg)] border border-[var(--ui-border)] rounded-[48px] p-24 relative overflow-hidden flex items-center justify-center min-h-[400px] shadow-4xl group/stage">
                  <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay [background-image:radial-gradient(circle_at_center,var(--ui-text)_0.5px,transparent_0.5px)] [background-size:32px_32px]"></div>
                  
                  {loading ? (
                       <Zap className="animate-pulse text-[var(--ui-text)] opacity-20" size={64} />
                  ) : (
                      <div 
                        className="transition-transform duration-700 hover:scale-125 drop-shadow-[0_0_60px_rgba(var(--ui-text-rgb),0.1)] transform-gpu hover:rotate-3"
                        style={{ color: colour, width: size * 2.5, height: size * 2.5 }}
                        dangerouslySetInnerHTML={{ __html: getProcessedSvg() }}
                      />
                  )}

                  <div className="absolute bottom-10 flex gap-4">
                      <div className="px-6 py-2 glass-premium rounded-full border border-[var(--ui-border)] text-[10px] font-black text-[var(--ui-text-muted)] uppercase tracking-[0.3em] whitespace-nowrap">
                         Preview Stage // {size}px Base
                      </div>
                  </div>
              </div>
            </div>

            {/* Right: Code & Assets */}
            <div className="lg:col-span-5 space-y-10">
               <div className="flex bg-[var(--ui-bg-muted)] rounded-[24px] p-1.5 border border-[var(--ui-border)] shadow-inner">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('web')}
                    title="CDN Integration protocol"
                    className={`flex-1 py-3 px-6 text-[10px] font-black uppercase tracking-widest transition-all rounded-[18px] focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${activeTab === 'web' ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                  >
                    CDN Integration
                  </button>
                  <button 
                    type="button"
                    onClick={() => setActiveTab('svg')}
                    title="Inline SVG protocol"
                    className={`flex-1 py-3 px-6 text-[10px] font-black uppercase tracking-widest transition-all rounded-[18px] focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${activeTab === 'svg' ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                  >
                    Inline Protocol
                  </button>
               </div>

               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--ui-text)] to-transparent rounded-[40px] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative bg-[var(--ui-bg)] rounded-[40px] p-10 border border-[var(--ui-border)] overflow-hidden shadow-2xl">
                    <button 
                      type="button"
                      onClick={() => {
                          const text = activeTab === 'web' 
                              ? `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24; font-size: ${size}px; color: ${colour};">\n  ${icon}\n</span>`
                              : getProcessedSvg();
                          copyToClipboard(text, 'COPIED TO BUFFER');
                      }}
                      title="Copy code specification"
                      className={`absolute top-8 right-8 p-4 bg-[var(--ui-text)]/5 hover:bg-[var(--ui-text)]/10 rounded-2xl transition-all border border-[var(--ui-border)] focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${copyFeedback ? 'text-emerald-500 border-emerald-500/20' : 'text-[var(--ui-text)]/20 hover:text-[var(--ui-text)]'}`}
                    >
                      {copyFeedback ? <Check size={20} /> : <CopyIcon size={20} />}
                    </button>
                    
                    <div className="mb-8">
                       <span className="text-[10px] font-black text-[var(--ui-text)] uppercase tracking-[0.3em]">{activeTab === 'web' ? 'Dynamic Font Implementation' : 'Scalable Vector Logic'}</span>
                    </div>

                    <pre className="text-[var(--ui-text)]/60 font-mono text-[11px] leading-relaxed overflow-x-auto custom-scrollbar whitespace-pre-wrap break-all max-h-[350px]">
                      {activeTab === 'web' && (
`<span class="material-symbols-outlined" style="
  font-variation-settings: 'FILL' ${filled ? 1 : 0}, 'wght' ${weight}; 
  font-size: ${size}px; 
  color: ${colour};
">
  ${icon}
</span>`
                      )}
                      {activeTab === 'svg' && (loading ? '// COMPILING VECTOR...' : getProcessedSvg())}
                    </pre>
                  </div>
               </div>
               
               <div className="grid grid-cols-3 gap-4">
                  <button 
                    type="button"
                    title="Export asset as PNG"
                    className="py-5 bg-[var(--ui-text)] text-[var(--ui-bg)] rounded-[24px] font-black text-[10px] uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-3xl flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20"
                  >
                      <Download size={14} />
                      PNG
                  </button>
                  <button 
                    type="button"
                    onClick={exportSvg}
                    title="Export asset as SVG"
                    className="py-5 bg-[var(--ui-text)] text-[var(--ui-bg)] rounded-[24px] font-black text-[10px] uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-3xl flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20"
                  >
                      <Download size={14} />
                      SVG
                  </button>
                  <button 
                    type="button"
                    title="View component API documentation"
                    className="py-5 bg-[var(--ui-text)]/5 border border-[var(--ui-border)] text-[var(--ui-text)] rounded-[24px] font-black text-[10px] uppercase tracking-widest transition-all hover:bg-[var(--ui-text)]/10 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20"
                  >
                      <CopyIcon size={14} />
                      API
                  </button>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const Iconography: React.FC<IconographyProps> = ({ 
    iconSizes, setIconSizes, 
    iconStyle, setIconStyle, 
    iconWeight, setIconWeight, 
    colours 
}) => {
  const [selectedColour, setSelectedColour] = useState<string>(colours[0]?.value || '#000000');
  const [activeModalIcon, setActiveModalIcon] = useState<{name: string, sizeToken: IconSizeToken} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [allIcons, setAllIcons] = useState<string[]>([]);
  const [isFetchingIcons, setIsFetchingIcons] = useState(false);
  const [isColourDropdownOpen, setIsColourDropdownOpen] = useState(false);

  useEffect(() => {
    setIsFetchingIcons(true);
    fetch('https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/MaterialSymbolsOutlined%5BFILL%2CGRAD%2Copsz%2Cwght%5D.codepoints')
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(text => {
         const names = text.split('\n').map(line => line.split(' ')[0]).filter(Boolean);
         setAllIcons([...new Set(names)]);
         setIsFetchingIcons(false);
      })
      .catch(() => {
         setAllIcons(defaultPreviewIcons);
         setIsFetchingIcons(false);
      });
  }, []);

  const filteredIcons = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    let result = allIcons;
    if (term) result = result.filter(name => name.includes(term));
    return result.slice(0, term ? 120 : 60);
  }, [allIcons, searchTerm]);

  return (
    <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Header Section */}
      <div className="space-y-6 max-w-4xl px-4">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--ui-text)]/5 border border-[var(--ui-text)]/10">
            <Sparkles className="text-[var(--ui-text)]" size={12} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text)]">Scalable Design Engine</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-[var(--ui-text)] tracking-tightest leading-none uppercase">Symbol <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ui-text)] to-[var(--ui-text-muted)]">Matrix</span></h2>
        <p className="text-lg font-medium text-[var(--ui-text-muted)] uppercase tracking-[0.2em] leading-relaxed">The atomic visual language for ultra-premium interfaces. Vector-perfect variable tokens for universal scale.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Controls Hub */}
          <aside className="lg:col-span-12 xl:col-span-4 space-y-8">
              <div className={`glass-premium p-10 rounded-[50px] border-[var(--ui-border)] shadow-3xl space-y-12 relative ${isColourDropdownOpen ? 'z-50' : 'z-10'}`}>
                   <div className="absolute top-0 right-0 p-8 opacity-5 text-[var(--ui-text)]">
                      <Cpu size={120} />
                   </div>

                   <div className="space-y-10 relative z-10">
                       <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text-muted)] px-1">Global Rendering Protocol</label>
                           <div className="grid grid-cols-2 gap-3 p-2 bg-[var(--ui-bg-muted)] rounded-[28px] border border-[var(--ui-border)] shadow-inner">
                               <button 
                                type="button"
                                onClick={() => setIconStyle('outlined')}
                                title="Switch to outlined icon set"
                                className={`py-4 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${iconStyle === 'outlined' ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-2xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                               >
                                Outlined
                               </button>
                               <button 
                                type="button"
                                onClick={() => setIconStyle('filled')}
                                title="Switch to filled icon set"
                                className={`py-4 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 ${iconStyle === 'filled' ? 'bg-[var(--ui-text)] text-[var(--ui-bg)] shadow-2xl' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                               >
                                Filled
                               </button>
                           </div>
                       </div>

                       <div className="space-y-6">
                           <div className="flex justify-between items-end px-1">
                               <div className="space-y-1">
                                   <label htmlFor="global-icon-weight" className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text-muted)]">Vector Density</label>
                                   <p className="text-[9px] font-bold text-[var(--ui-text-muted)] uppercase tracking-widest">Modulates optical weight</p>
                               </div>
                               <span className="text-2xl font-black text-[var(--ui-text)]">{iconWeight}</span>
                           </div>
                           <input 
                               id="global-icon-weight"
                               type="range" min="100" max="700" step="100"
                               value={iconWeight} 
                               title="Global vector stroke weight"
                               onChange={(e) => setIconWeight(Number(e.target.value))}
                               className="w-full h-1.5 bg-[var(--ui-text)]/5 rounded-full appearance-none cursor-pointer accent-[var(--ui-text)] shadow-xl"
                           />
                           <div className="flex justify-between text-[8px] font-black text-[var(--ui-text-muted)] uppercase tracking-[0.3em]">
                               <span>Hairline</span>
                               <span>System</span>
                               <span>Industrial</span>
                           </div>
                       </div>

                       <div className="space-y-4">
                           <label htmlFor="primary-chroma-button" className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--ui-text-muted)] px-1">Primary Chroma</label>
                           <div className="relative">
                               <button 
                                      id="primary-chroma-button"
                                      type="button"
                                      onClick={() => setIsColourDropdownOpen(!isColourDropdownOpen)}
                                      title="Select primary chroma from palette"
                                      className="w-full flex items-center justify-between gap-6 bg-[var(--ui-bg-muted)] border border-[var(--ui-border)] p-6 rounded-[28px] group hover:border-[var(--ui-text)]/20 transition-all shadow-inner focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20"
                               >
                                   <div className="flex items-center gap-4">
                                       <div className="w-8 h-8 rounded-xl shadow-2xl border border-[var(--ui-border)]" style={{ backgroundColor: selectedColour }}></div>
                                       <span className="text-sm font-black text-[var(--ui-text)] uppercase tracking-widest">{colours.find(c => c.value === selectedColour)?.label || 'Custom Logic'}</span>
                                   </div>
                                   <ChevronDown size={18} className={`text-[var(--ui-text-muted)] group-hover:text-[var(--ui-text)] transition-transform duration-300 ${isColourDropdownOpen ? 'rotate-180' : ''}`} />
                               </button>
                               
                               {isColourDropdownOpen && (
                                   <div className="absolute top-full left-0 right-0 mt-6 p-3 bg-[var(--ui-surface)] rounded-[32px] border border-[var(--ui-border)] z-30 shadow-5xl animate-in fade-in zoom-in-95 duration-400">
                                       {colours.map(c => (
                                           <button
                                               key={c.name}
                                               type="button"
                                               onClick={() => { setSelectedColour(c.value); setIsColourDropdownOpen(false); }}
                                               title={`Select ${c.label} chroma`}
                                               className={`w-full flex items-center gap-4 px-6 py-4 text-xs font-black text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] hover:bg-[var(--ui-text)]/5 rounded-2xl transition-all uppercase tracking-widest focus:outline-none focus:bg-[var(--ui-text)]/5 ${selectedColour === c.value ? 'text-[var(--ui-text)]' : ''}`}
                                           >
                                               <div className="w-5 h-5 rounded-lg border border-[var(--ui-border)] shadow-lg" style={{ backgroundColor: c.value }}></div>
                                               {c.label}
                                               {selectedColour === c.value && <Check size={16} className="ml-auto text-emerald-500" />}
                                           </button>
                                       ))}
                                   </div>
                               )}
                           </div>
                       </div>
                   </div>
              </div>

              {/* Stat Card */}
              <div className="bg-gradient-to-br from-[var(--ui-bg)] to-[var(--ui-bg-muted)] p-10 rounded-[50px] border border-[var(--ui-border)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-[var(--ui-text)]/5 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="relative space-y-6">
                      <div className="w-16 h-16 rounded-[24px] bg-[var(--ui-text)]/5 flex items-center justify-center border border-[var(--ui-border)]">
                          <Layers className="text-[var(--ui-text)]" size={24} />
                      </div>
                      <div className="space-y-2">
                           <h5 className="text-xl font-black text-[var(--ui-text)] uppercase tracking-tightest leading-none">Universal Sync</h5>
                           <p className="text-[11px] font-bold text-[var(--ui-text-muted)] uppercase tracking-widest leading-relaxed">Variable font technology allows for fluid transitions across 7 weight classes and 0-100 fill states without reloading assets.</p>
                      </div>
                  </div>
              </div>
          </aside>

               {/* Matrix Explorer */}
          <main className="lg:col-span-12 xl:col-span-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 px-4">
                  <div className="relative flex-1 group">
                      <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                          <Search className="text-[var(--ui-text-muted)] group-focus-within:text-[var(--ui-text)] transition-colors" size={20} />
                      </div>
                      <input 
                          id="matrix-search-input"
                          type="text"
                          placeholder="Command search system assets..."
                          title="Search symbol matrix"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-[var(--ui-bg-muted)] border border-[var(--ui-border)] rounded-[32px] pl-20 pr-10 py-7 text-lg font-black text-[var(--ui-text)] placeholder:text-[var(--ui-text-muted)] focus:outline-none focus:ring-4 focus:ring-[var(--ui-text)]/5 focus:border-[var(--ui-text)]/20 transition-all shadow-inner"
                      />
                      <div className="absolute right-8 inset-y-0 flex items-center pointer-events-none opacity-20 text-[var(--ui-text)]">
                           <Command size={18} />
                      </div>
                  </div>
              </div>

              {/* Asset Matrix */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-8 px-4">
                  {filteredIcons.map((icon, i) => (
                    <button 
                        key={icon}
                        type="button"
                        onClick={() => setActiveModalIcon({ name: icon, sizeToken: iconSizes[1] })}
                        title={`View vector definition for ${icon}`}
                        className="group relative glass-premium bg-[var(--ui-bg-muted)]/20 p-10 rounded-[48px] border border-[var(--ui-border)] hover:border-[var(--ui-text)]/30 hover:-translate-y-4 transition-all duration-500 overflow-hidden flex flex-col items-center justify-center gap-8 focus:outline-none focus:-translate-y-4 focus:border-[var(--ui-text)]/30"
                        style={{ animationDelay: `${i * 20}ms` }}
                    >
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--ui-text)]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="relative w-24 h-24 rounded-[32px] bg-[var(--ui-bg-muted)] flex items-center justify-center text-[var(--ui-text)]/10 group-hover:text-[var(--ui-text)] group-focus:text-[var(--ui-text)] transition-all shadow-inner border border-[var(--ui-border)] group-hover:scale-110 group-hover:rotate-6 group-focus:scale-110 group-focus:rotate-6 transform-gpu">
                            <span 
                                className="material-symbols-outlined transition-all duration-500" 
                                style={{ 
                                    fontSize: '48px',
                                    fontVariationSettings: `'FILL' ${iconStyle === 'filled' ? 1 : 0}, 'wght' ${iconWeight}, 'GRAD' 0, 'opsz' 24`
                                }}
                            >
                                {icon}
                            </span>
                        </div>
                        
                        <div className="space-y-1 text-center w-full px-2">
                             <span className="text-[9px] font-black text-[var(--ui-text-muted)] uppercase tracking-widest block">v-0{i+1}</span>
                             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ui-text-muted)] group-hover:text-[var(--ui-text)] group-focus:text-[var(--ui-text)] transition-colors truncate block">
                                {icon.replace(/_/g, ' ')}
                            </span>
                        </div>

                        <div className="absolute inset-0 rounded-[48px] border border-[var(--ui-text)]/0 group-hover:border-[var(--ui-text)]/10 transition-all pointer-events-none"></div>
                    </button>
                  ))}
                  
                  {isFetchingIcons && Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-[48px] bg-[var(--ui-bg-muted)] animate-pulse border border-[var(--ui-border)]"></div>
                  ))}
              </div>

              {filteredIcons.length === 0 && !isFetchingIcons && (
                <div className="py-24 flex flex-col items-center justify-center glass-premium rounded-[60px] border-dashed border-[var(--ui-border)] mx-4 space-y-8">
                    <div className="w-40 h-40 rounded-full bg-[var(--ui-bg-muted)] border border-[var(--ui-border)] flex items-center justify-center opacity-20 text-[var(--ui-text)]">
                        <Monitor size={80} strokeWidth={1} />
                    </div>
                    <div className="text-center space-y-2">
                         <h4 className="text-3xl font-black text-[var(--ui-text-muted)] uppercase tracking-tightest leading-none">Matrix Disconnect</h4>
                         <p className="text-[10px] font-bold text-[var(--ui-text-muted)] uppercase tracking-[0.4em]">No matching vector signatures found in repository</p>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setSearchTerm('')}
                        title="Clear search query"
                        className="px-8 py-3 bg-[var(--ui-text)]/10 hover:bg-[var(--ui-text)] text-[var(--ui-text-muted)] hover:text-[var(--ui-bg)] rounded-full font-black text-[10px] uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]"
                    >
                        Reset Matrix Search
                    </button>
                </div>
              )}
          </main>
      </div>

      {/* Asset Modal Render */}
      {activeModalIcon && (
        <IconAssetModal 
            icon={activeModalIcon.name}
            sizeToken={activeModalIcon.sizeToken}
            initialColour={selectedColour}
            initialFill={iconStyle === 'filled'}
            initialWeight={activeModalIcon.sizeToken.weight || iconWeight}
            onClose={() => setActiveModalIcon(null)}
        />
      )}

      {/* Footer Branding */}
      <div className="pt-24 pb-12 flex justify-center opacity-10">
           <div className="flex items-center gap-4">
                <div className="h-px w-24 bg-[var(--ui-text)]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[var(--ui-text)]">End of Archive</span>
                <div className="h-px w-24 bg-[var(--ui-text)]"></div>
           </div>
      </div>
    </div>
  );
};

export default Iconography;
