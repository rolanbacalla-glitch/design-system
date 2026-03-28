
import React, { useState, useEffect } from 'react';
import { IconSizeToken, ColourToken } from '../types';

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
  
  // Customization State
  const [weight, setWeight] = useState(initialWeight);
  const [filled, setFilled] = useState(initialFill);
  const [colour, setColour] = useState(initialColour);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [opticalSize, setOpticalSize] = useState(sizeToken.value); 
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFetchError(false);

    let params = 'default';
    const parts = [];
    if (filled) parts.push('fill1');
    if (weight !== 400) parts.push(`wght${weight}`);
    
    parts.sort();
    
    if (parts.length > 0) {
      params = parts.join('_');
    }

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
      .catch(err => {
        console.warn(`Failed to fetch specific variant: ${url}. Fallback to default.`);
        fetch(`https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${icon}/default/24px.svg`)
          .then(res => res.text())
          .then(text => {
             setSvgContent(text);
             setFetchError(true);
             setLoading(false);
          })
          .catch(e => setLoading(false));
      });
  }, [icon, weight, filled]);

  const getProcessedSvg = (forDisplay: boolean = false) => {
    if (!svgContent) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svg = doc.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', sizeToken.value.toString());
      svg.setAttribute('height', sizeToken.value.toString());
      svg.setAttribute('fill', colour);
      if (!svg.getAttribute('viewBox')) {
        svg.setAttribute('viewBox', '0 0 24 24');
      }
      return svg.outerHTML;
    }
    return svgContent;
  };

  const handleDownloadSvg = () => {
    const content = getProcessedSvg(true);
    const blob = new Blob([content], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${icon}_${filled ? 'filled' : 'outlined'}_w${weight}_${sizeToken.value}px.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = sizeToken.value;
    canvas.height = sizeToken.value;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = `${weight} ${sizeToken.value}px "Material Symbols Outlined"`;
        ctx.fillStyle = colour;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        
        if (!fetchError && svgContent) {
            const img = new Image();
            const svgData = getProcessedSvg(true);
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            img.onload = () => {
                ctx.drawImage(img, 0, 0, sizeToken.value, sizeToken.value);
                const pngUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = pngUrl;
                a.download = `${icon}_${filled ? 'filled' : 'outlined'}_w${weight}_${sizeToken.value}px.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            };
            img.src = url;
        } else {
             const img = new Image();
             const svgData = getProcessedSvg(true);
             const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
             const url = URL.createObjectURL(blob);
             img.onload = () => {
                ctx.drawImage(img, 0, 0, sizeToken.value, sizeToken.value);
                 const pngUrl = canvas.toDataURL('image/png');
                 const a = document.createElement('a');
                 a.href = pngUrl;
                 a.download = `${icon}_${filled ? 'filled' : 'outlined'}_w${weight}_${sizeToken.value}px.png`;
                 document.body.appendChild(a);
                 a.click();
                 document.body.removeChild(a);
             }
             img.src = url;
        }
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(label);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[var(--ui-surface)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col border border-[var(--ui-border)]" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--ui-border)]">
          <h3 className="text-2xl font-bold text-[var(--ui-text)] capitalize flex items-center gap-3 tracking-tighter">
             <span className="material-symbols-outlined text-4xl text-[var(--ui-accent)]" style={{ 
                 fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`
             }}>{icon}</span>
             {icon}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-[var(--ui-bg)] rounded-full transition-all text-[var(--ui-text)] active:scale-90">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Col: Preview & Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Controls */}
              <div className="bg-[var(--ui-bg)] p-6 rounded-2xl border border-[var(--ui-border)] space-y-6">
                  <h4 className="font-semibold text-[var(--ui-text-muted)] text-xs uppercase tracking-widest">Customize</h4>
                  
                  {/* Fill Toggle */}
                  <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-[var(--ui-text)]">Style</label>
                      <div className="flex bg-[var(--ui-surface)] rounded-xl border border-[var(--ui-border)] p-1">
                          <button 
                            onClick={() => setFilled(false)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${!filled ? 'bg-[var(--ui-accent)] text-[var(--ui-accent-on)] shadow-sm' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                          >
                            Outlined
                          </button>
                          <button 
                            onClick={() => {
                                setFilled(true);
                                setWeight(400); 
                            }}
                            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${filled ? 'bg-[var(--ui-accent)] text-[var(--ui-accent-on)] shadow-sm' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                          >
                            Filled
                          </button>
                      </div>
                  </div>

                  {/* Weight Slider */}
                  {!filled && (
                    <div className="transition-all duration-300">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold text-[var(--ui-text)]">Weight</label>
                            <span className="text-xs font-mono font-semibold text-[var(--ui-accent)]">{weight}</span>
                        </div>
                        <input 
                            type="range" 
                            min="100" 
                            max="700" 
                            step="100"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full h-1.5 bg-[var(--ui-border)] rounded-lg appearance-none cursor-pointer accent-[var(--ui-accent)]"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-[var(--ui-text-muted)] mt-2 uppercase tracking-tighter">
                            <span>Thin</span>
                            <span>Regular</span>
                            <span>Bold</span>
                        </div>
                    </div>
                  )}

                  {/* Colour Picker */}
                   <div>
                       <label className="text-sm font-bold text-[var(--ui-text)] block mb-2">Colour</label>
                       <div className="flex items-center gap-3">
                           <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-[var(--ui-border)] shadow-sm">
                               <input type="color" value={colour} onChange={e => setColour(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer scale-150" />
                               <div className="w-full h-full" style={{ backgroundColor: colour }} />
                           </div>
                           <input type="text" value={colour} onChange={e => setColour(e.target.value)} className="flex-1 bg-[var(--ui-surface)] border border-[var(--ui-border)] text-[var(--ui-text)] rounded-xl px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[var(--ui-accent)] outline-none" />
                       </div>
                   </div>
              </div>

              {/* Preview Box */}
              <div className="bg-[var(--ui-bg)] border border-[var(--ui-border)] rounded-2xl flex items-center justify-center p-12 relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9IiNlNWU1ZTUiLz48cGF0aCBkPSJNOCA4aDh2OGg4eiIgZmlsbD0iI2U1ZTVlNSIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9IiMzMzMiLz48cGF0aCBkPSJNOCA4aDh2OGg4eiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==')]">
                 {loading ? (
                    <span className="material-symbols-outlined animate-spin text-4xl text-[var(--ui-text-muted)]">progress_activity</span>
                 ) : (
                    <div 
                      className="transition-all duration-500 hover:scale-110 drop-shadow-xl"
                      style={{ 
                        color: colour,
                        width: sizeToken.value,
                        height: sizeToken.value
                      }}
                      dangerouslySetInnerHTML={{ __html: getProcessedSvg() }}
                    />
                 )}
              </div>
              
              {fetchError && (
                  <div className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 p-3 rounded-xl border border-amber-200 dark:border-amber-800 uppercase tracking-tight">
                      Note: The exact SVG path for this weight/fill combo could not be fetched from the CDN. Fallback applied.
                  </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={handleDownloadSvg}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 bg-[var(--ui-accent)] hover:bg-[var(--ui-accent-hover)] text-[var(--ui-accent-on)] py-3 px-4 rounded-xl font-semibold transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-[var(--ui-accent)]/20"
                    >
                      <span className="material-symbols-outlined text-[20px]">svg</span>
                      SVG
                    </button>
                    <button 
                      onClick={handleDownloadPng}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 bg-[var(--ui-surface)] border border-[var(--ui-border)] hover:bg-[var(--ui-surface-hover)] text-[var(--ui-text)] py-3 px-4 rounded-xl font-semibold transition-all disabled:opacity-50 active:scale-95 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[20px]">image</span>
                      PNG
                    </button>
                 </div>
            </div>

            {/* Right Col: Code Snippets */}
            <div className="lg:col-span-5 space-y-6">
               <div className="flex border-b border-[var(--ui-border)]">
                  <button 
                    onClick={() => setActiveTab('web')}
                    className={`pb-3 px-6 text-xs font-semibold uppercase tracking-widest transition-all relative ${activeTab === 'web' ? 'text-[var(--ui-accent)]' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                  >
                    Web
                    {activeTab === 'web' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--ui-accent)] rounded-t-full"></div>}
                  </button>
                  <button 
                    onClick={() => setActiveTab('svg')}
                    className={`pb-3 px-6 text-xs font-semibold uppercase tracking-widest transition-all relative ${activeTab === 'svg' ? 'text-[var(--ui-accent)]' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                  >
                    SVG
                    {activeTab === 'svg' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--ui-accent)] rounded-t-full"></div>}
                  </button>
               </div>

               <div className="bg-gray-950 rounded-2xl p-6 relative group border border-white/5">
                  <button 
                    onClick={() => {
                        const text = activeTab === 'web' 
                            ? `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24; font-size: ${sizeToken.value}px; color: ${colour};">\n  ${icon}\n</span>`
                            : getProcessedSvg();
                        copyToClipboard(text, 'Copied!');
                    }}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all active:scale-90"
                    title="Copy to clipboard"
                  >
                    <span className="material-symbols-outlined text-[20px]">{copyFeedback === 'Copied!' ? 'check' : 'content_copy'}</span>
                  </button>
                  
                  <pre className="text-gray-300 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap break-all max-h-[400px]">
                    {activeTab === 'web' && (
`<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24; font-size: ${sizeToken.value}px; color: ${colour};">
  ${icon}
</span>`
                    )}
                    {activeTab === 'svg' && (loading ? 'Loading...' : getProcessedSvg())}
                  </pre>
               </div>
               
               {activeTab === 'web' && (
                 <div className="text-[10px] font-bold text-[var(--ui-text-muted)] space-y-3 uppercase tracking-tight">
                   <p>Requires the Material Symbols stylesheet linked in your HTML head.</p>
                   <div className="font-mono bg-[var(--ui-bg)] p-3 rounded-xl border border-[var(--ui-border)] text-[var(--ui-text)] break-all normal-case font-medium">
                     &lt;link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined..." rel="stylesheet" /&gt;
                   </div>
                 </div>
               )}
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
  const [isUniversal, setIsUniversal] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(iconSizes.map(s => s.name));
  const [isColourDropdownOpen, setIsColourDropdownOpen] = useState(false);

  useEffect(() => {
    setIsFetchingIcons(true);
    fetch('https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/MaterialSymbolsOutlined%5BFILL%2CGRAD%2Copsz%2Cwght%5D.codepoints')
      .then(r => {
          if(!r.ok) throw new Error("Network response was not ok");
          return r.text();
      })
      .then(text => {
         const names = text.split('\n').map(line => line.split(' ')[0]).filter(Boolean);
         setAllIcons([...new Set(names)]);
         setIsFetchingIcons(false);
      })
      .catch(err => {
         console.error("Failed to fetch icon list", err);
         setIsFetchingIcons(false);
      });
  }, []);

  const handleSizeChange = (name: string, value: number) => {
    const newSizes = iconSizes.map(size =>
      size.name === name ? { ...size, value: Math.max(0, value) } : size
    );
    setIconSizes(newSizes);
  };

  const handleWeightChange = (newVal: number) => {
      setIconWeight(newVal); 
      const updatedSizes = iconSizes.map(size => {
          if (isUniversal || selectedSizes.includes(size.name)) {
              return { ...size, weight: newVal };
          }
          return size;
      });
      setIconSizes(updatedSizes);
  };

  const toggleSizeSelection = (name: string) => {
      if (selectedSizes.includes(name)) {
          setSelectedSizes(selectedSizes.filter(s => s !== name));
          const updatedSizes = iconSizes.map(size => 
             size.name === name ? { ...size, weight: 400 } : size
          );
          setIconSizes(updatedSizes);
      } else {
          setSelectedSizes([...selectedSizes, name]);
          const updatedSizes = iconSizes.map(size => 
             size.name === name ? { ...size, weight: iconWeight } : size
          );
          setIconSizes(updatedSizes);
      }
  };

  const displayedIcons = searchTerm 
    ? allIcons.filter(name => name.includes(searchTerm.toLowerCase().trim())).slice(0, 48) 
    : defaultPreviewIcons;

  return (
    <div className="space-y-8 relative animate-in fade-in slide-in-from-bottom-4 duration-700">
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

      <div>
        <h2 className="text-4xl font-bold text-[var(--ui-text)] tracking-tighter">Iconography</h2>
        <p className="text-[var(--ui-text-muted)] mt-1 font-medium">Manage icon sizes, styles, and export assets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Editor Section */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8 lg:h-fit">
              
               {/* Style & Weight */}
              <div className="bg-[var(--ui-surface)] p-6 rounded-2xl border border-[var(--ui-border)] shadow-sm space-y-6">
                  <h3 className="text-lg font-semibold text-[var(--ui-text)] tracking-tight">Global Settings</h3>
                  
                  <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-[var(--ui-text-muted)] block mb-3">Variant</label>
                      <div className="flex bg-[var(--ui-bg)] rounded-xl p-1 border border-[var(--ui-border)]">
                          <button
                             onClick={() => setIconStyle('outlined')}
                             className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${iconStyle === 'outlined' ? 'bg-[var(--ui-surface)] text-[var(--ui-accent)] shadow-sm' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                          >
                             Outlined
                          </button>
                          <button
                             onClick={() => {
                                 setIconStyle('filled');
                                 setIconWeight(400); 
                             }}
                             className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${iconStyle === 'filled' ? 'bg-[var(--ui-surface)] text-[var(--ui-accent)] shadow-sm' : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'}`}
                          >
                             Filled
                          </button>
                      </div>
                  </div>

                  {iconStyle === 'outlined' && (
                      <div className="transition-all duration-300">
                          <div className="flex justify-between mb-2">
                              <label className="text-sm font-semibold text-[var(--ui-text)]">Stroke Weight</label>
                              <span className="text-xs font-mono font-semibold text-[var(--ui-accent)]">{iconWeight}</span>
                          </div>
                          <input 
                              type="range" 
                              min="100" 
                              max="700" 
                              step="100"
                              value={iconWeight} 
                              onChange={(e) => handleWeightChange(Number(e.target.value))}
                              className="w-full h-1.5 bg-[var(--ui-border)] rounded-lg appearance-none cursor-pointer accent-[var(--ui-accent)]"
                          />
                          <div className="flex justify-between text-[10px] font-bold text-[var(--ui-text-muted)] mt-2 uppercase tracking-tighter">
                              <span>Thin</span>
                              <span>Regular</span>
                              <span>Bold</span>
                          </div>

                          <div className="mt-6 border-t border-[var(--ui-border)] pt-6">
                                <label className="flex items-center gap-3 mb-2 cursor-pointer select-none group">
                                    <div className="relative flex items-center">
                                        <input 
                                            type="checkbox" 
                                            checked={isUniversal} 
                                            onChange={(e) => {
                                                setIsUniversal(e.target.checked);
                                                if(e.target.checked) {
                                                    setSelectedSizes(iconSizes.map(s => s.name));
                                                    const updatedSizes = iconSizes.map(s => ({ ...s, weight: iconWeight }));
                                                    setIconSizes(updatedSizes);
                                                }
                                            }}
                                            className="peer sr-only"
                                        />
                                        <div className="w-5 h-5 rounded border-2 border-[var(--ui-text-muted)] peer-checked:bg-[var(--ui-accent)] peer-checked:border-[var(--ui-accent)] bg-transparent transition-all flex items-center justify-center">
                                             {isUniversal && <span className="material-symbols-outlined text-[14px] text-[var(--ui-accent-on)] font-semibold" style={{ fontVariationSettings: "'wght' 700" }}>check</span>}
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-[var(--ui-text)]">Apply to all sizes</span>
                                </label>

                                {!isUniversal && (
                                    <div className="ml-8 space-y-2 mt-4 bg-[var(--ui-bg)] p-4 rounded-2xl border border-[var(--ui-border)]">
                                        <p className="text-[10px] font-bold text-[var(--ui-text-muted)] mb-3 uppercase tracking-widest">Apply changes to:</p>
                                        {iconSizes.map(size => (
                                            <label key={size.name} className="flex items-center gap-3 cursor-pointer select-none hover:bg-[var(--ui-surface)] rounded-lg px-2 py-1.5 transition-all group">
                                                <div className="relative flex items-center">
                                                    <input 
                                                        type="checkbox"
                                                        checked={selectedSizes.includes(size.name)}
                                                        onChange={() => toggleSizeSelection(size.name)}
                                                        className="peer sr-only"
                                                    />
                                                    <div className="w-4 h-4 rounded border-2 border-[var(--ui-text-muted)] peer-checked:bg-[var(--ui-accent)] peer-checked:border-[var(--ui-accent)] bg-transparent transition-all flex items-center justify-center">
                                                        {selectedSizes.includes(size.name) && <span className="material-symbols-outlined text-[12px] text-[var(--ui-accent-on)] font-bold" style={{ fontVariationSettings: "'wght' 700" }}>check</span>}
                                                    </div>
                                                </div>
                                                <span className="text-sm font-bold text-[var(--ui-text)] capitalize">{size.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                      </div>
                  )}
              </div>

               {/* Sizes */}
              <div className="bg-[var(--ui-surface)] p-6 rounded-2xl border border-[var(--ui-border)] shadow-sm space-y-6">
                  <h3 className="text-lg font-semibold text-[var(--ui-text)] tracking-tight">Icon Sizes</h3>
                  {iconSizes.map(token => (
                      <div key={token.name} className="space-y-2">
                          <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-sm text-[var(--ui-text)] capitalize tracking-tight">{token.name}</span>
                              <div className="flex items-center gap-2">
                                  {iconStyle === 'outlined' && (
                                      <span className="text-[10px] text-[var(--ui-accent)] font-mono font-semibold">W:{token.weight || 400}</span>
                                  )}
                                  <span className="text-[10px] font-semibold text-[var(--ui-text-muted)] bg-[var(--ui-bg)] px-2 py-0.5 rounded-full border border-[var(--ui-border)] uppercase">{token.value}px</span>
                              </div>
                          </div>
                          <div className="flex items-center gap-3">
                              <input 
                                  type="range" 
                                  min="8" 
                                  max="64" 
                                  value={token.value} 
                                  onChange={(e) => handleSizeChange(token.name, Number(e.target.value))}
                                  className="w-full h-1.5 bg-[var(--ui-border)] rounded-lg appearance-none cursor-pointer accent-[var(--ui-accent)]"
                              />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-8 space-y-6">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[var(--ui-border)]">
                    <div>
                        <h3 className="text-2xl font-bold text-[var(--ui-text)] tracking-tighter">Preview & Export</h3>
                        <p className="text-sm text-[var(--ui-text-muted)] mt-1 font-medium">
                            {searchTerm ? `Found ${displayedIcons.length} matching icons` : 'Showing popular icons'}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Search Input */}
                        <div className="relative flex-grow md:flex-grow-0">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[var(--ui-text-muted)] text-[20px]">search</span>
                            </span>
                            <input 
                                type="text" 
                                placeholder="Search all icons..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-[var(--ui-surface)] text-[var(--ui-text)] border border-[var(--ui-border)] rounded-xl text-sm w-full md:w-64 focus:ring-2 focus:ring-[var(--ui-accent)] outline-none placeholder-[var(--ui-text-muted)] shadow-sm transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <button 
                                    onClick={() => setIsColourDropdownOpen(!isColourDropdownOpen)}
                                    className="flex items-center gap-2 bg-[var(--ui-surface)] border border-[var(--ui-border)] text-[var(--ui-text)] text-sm font-bold rounded-xl focus:ring-2 focus:ring-[var(--ui-accent)] outline-none p-2 pr-8 transition-all min-w-[140px] text-left relative"
                                >
                                    <div className="w-4 h-4 rounded-md border border-[var(--ui-border)]" style={{ backgroundColor: selectedColour }}></div>
                                    <span>{colours.find(c => c.value === selectedColour)?.label || 'Select Colour'}</span>
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--ui-text-muted)] text-sm pointer-events-none">expand_more</span>
                                </button>
                                
                                {isColourDropdownOpen && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-10" 
                                            onClick={() => setIsColourDropdownOpen(false)}
                                        ></div>
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-[var(--ui-surface)] border border-[var(--ui-border)] rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                                            {colours.map(c => (
                                                <button
                                                    key={c.name}
                                                    onClick={() => {
                                                        setSelectedColour(c.value);
                                                        setIsColourDropdownOpen(false);
                                                    }}
                                                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold transition-all hover:bg-[var(--ui-bg)] ${selectedColour === c.value ? 'text-[var(--ui-accent)]' : 'text-[var(--ui-text)]'}`}
                                                >
                                                    <div className="w-4 h-4 rounded-md border border-[var(--ui-border)]" style={{ backgroundColor: c.value }}></div>
                                                    <span>{c.label}</span>
                                                    {selectedColour === c.value && (
                                                        <span className="ml-auto material-symbols-outlined text-sm">check</span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
               </div>

               <div className="space-y-10">
                   {isFetchingIcons && allIcons.length === 0 ? (
                       <div className="text-center p-12 text-[var(--ui-text-muted)]">
                           <span className="material-symbols-outlined animate-spin text-4xl mb-3 text-[var(--ui-accent)]">sync</span>
                           <p className="font-semibold uppercase tracking-widest text-xs">Loading icon library...</p>
                       </div>
                   ) : (
                    iconSizes.map(size => (
                       <div key={size.name} className="space-y-4">
                           <p className="text-xs font-black text-[var(--ui-text-muted)] uppercase tracking-[0.2em]">{size.name} <span className="text-[var(--ui-accent)] opacity-50">/</span> {size.value}px</p>
                           <div className="bg-[var(--ui-surface)] p-8 rounded-3xl border border-[var(--ui-border)] flex flex-wrap gap-8 min-h-[120px] shadow-sm">
                               {displayedIcons.length === 0 ? (
                                   <div className="w-full text-center text-[var(--ui-text-muted)] py-8 font-bold uppercase tracking-widest text-xs opacity-50">
                                       No icons found matching "{searchTerm}"
                                   </div>
                               ) : (
                                   displayedIcons.map(icon => (
                                       <button 
                                            key={icon} 
                                            onClick={() => setActiveModalIcon({ name: icon, sizeToken: size })}
                                            className="flex flex-col items-center gap-2 group relative p-3 rounded-2xl hover:bg-[var(--ui-bg)] transition-all active:scale-90"
                                            title={`Export ${icon} (${size.value}px)`}
                                       >
                                            <span 
                                                className="material-symbols-outlined transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 drop-shadow-sm"
                                                style={{ 
                                                    fontSize: `${size.value}px`, 
                                                    color: selectedColour,
                                                    fontVariationSettings: `'FILL' ${iconStyle === 'filled' ? 1 : 0}, 'wght' ${size.weight || iconWeight}, 'GRAD' 0, 'opsz' 24`
                                                }}
                                            >
                                                {icon}
                                            </span>
                                            <span className="absolute -bottom-10 bg-gray-950 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-10 shadow-xl translate-y-2 group-hover:translate-y-0">
                                                {icon}
                                            </span>
                                       </button>
                                   ))
                               )}
                           </div>
                       </div>
                   ))
                  )}
               </div>
          </div>
      </div>
    </div>
  );
};

export default Iconography;
