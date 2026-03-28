
import React, { useState, useEffect } from 'react';
import { ColourToken } from '../types';
import { getPaletteSuggestions } from '../services/geminiService';
import { hexToRgb, getLuminance, getContrastRatio } from '../utils';
import { 
  Star, 
  Contrast, 
  Maximize2, 
  CheckCircle2, 
  XCircle, 
  Circle, 
  Sparkles, 
  AlertCircle, 
  Palette 
} from 'lucide-react';

// --- Contrast Checker Component ---

const StarRating: React.FC<{ rating: number; max?: number, className?: string }> = ({ rating, max = 5, className = "" }) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[...Array(max)].map((_, i) => (
        <Star 
          key={i} 
          size={18} 
          strokeWidth={1.5}
          className={i < rating ? 'fill-current' : 'text-black/20'} 
        />
      ))}
    </div>
  );
};

const ContrastChecker: React.FC = () => {
    const [textColour, setTextColour] = useState('#112A46');
    const [bgColour, setBgColour] = useState('#ACC8E5');
    const [contrast, setContrast] = useState(0);

    useEffect(() => {
        const textRgb = hexToRgb(textColour);
        const bgRgb = hexToRgb(bgColour);

        if (textRgb && bgRgb) {
            const textLuminance = getLuminance(textRgb.r, textRgb.g, textRgb.b);
            const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
            const ratio = getContrastRatio(textLuminance, bgLuminance);
            setContrast(parseFloat(ratio.toFixed(2)));
        }
    }, [textColour, bgColour]);

    // Determine status and theme
    let status: 'poor' | 'fair' | 'good' | 'excellent' = 'poor';
    if (contrast >= 7) status = 'excellent';
    else if (contrast >= 4.5) status = 'good';
    else if (contrast >= 3) status = 'fair';
    
    // Theme logic based on status
    const themeBg = status === 'poor' ? 'bg-red-500/10' : (status === 'fair' ? 'bg-amber-500/10' : 'bg-emerald-500/10');
    const themeText = status === 'poor' ? 'text-red-500' : (status === 'fair' ? 'text-amber-500' : 'text-emerald-500');
    const themeStarColour = status === 'poor' ? 'text-red-500' : (status === 'fair' ? 'text-amber-500' : 'text-emerald-500');
    
    // Stars calculation
    const scoreStars = status === 'excellent' ? 5 : (status === 'good' ? 4 : (status === 'fair' ? 3 : 1));

    // Pass/Fail Logic
    const smallTextPass = contrast >= 4.5;
    const largeTextPass = contrast >= 3;

    return (
        <div className="bg-[var(--ui-surface)] p-6 rounded-2xl border border-[var(--ui-border)] shadow-sm mt-8">
             <div className="flex items-center gap-2 mb-6">
                 <Contrast size={20} strokeWidth={1.5} className="text-[var(--ui-text-muted)]" />
                 <h3 className="text-xl font-semibold text-[var(--ui-text)] tracking-tight">Contrast Checker</h3>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Controls & Score */}
                <div className="space-y-6">
                    {/* Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-muted)] mb-2">Text colour</label>
                            <div className="flex items-center gap-2 border border-[var(--ui-border)] rounded-xl p-2 bg-[var(--ui-bg)] focus-within:ring-2 focus-within:ring-[var(--ui-accent)] hover:border-[var(--ui-text-muted)] transition-all">
                                <input 
                                    type="text" 
                                    value={textColour} 
                                    onChange={(e) => setTextColour(e.target.value)}
                                    className="w-full min-w-0 text-sm font-mono text-[var(--ui-text)] focus:outline-none uppercase bg-transparent ml-1"
                                />
                                <div className="relative w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden ring-1 ring-black/5">
                                    <input 
                                        type="color" 
                                        value={textColour} 
                                        onChange={(e) => setTextColour(e.target.value)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="w-full h-full" style={{ backgroundColor: textColour }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-muted)] mb-2">Background colour</label>
                            <div className="flex items-center gap-2 border border-[var(--ui-border)] rounded-xl p-2 bg-[var(--ui-bg)] focus-within:ring-2 focus-within:ring-[var(--ui-accent)] hover:border-[var(--ui-text-muted)] transition-all">
                                <input 
                                    type="text" 
                                    value={bgColour} 
                                    onChange={(e) => setBgColour(e.target.value)}
                                    className="w-full min-w-0 text-sm font-mono text-[var(--ui-text)] focus:outline-none uppercase bg-transparent ml-1"
                                />
                                <div className="relative w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden ring-1 ring-black/5">
                                    <input 
                                        type="color" 
                                        value={bgColour} 
                                        onChange={(e) => setBgColour(e.target.value)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="w-full h-full" style={{ backgroundColor: bgColour }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Score Card */}
                    <div className="overflow-hidden rounded-2xl border border-[var(--ui-border)]">
                        <div className={`p-6 flex items-center justify-between ${themeBg} ${themeText}`}>
                            <span className="text-6xl font-bold tracking-tighter">{contrast}</span>
                            <div className="text-right flex flex-col items-end">
                                <div className="font-semibold text-lg mb-1">{status === 'excellent' ? 'Excellent' : (status === 'good' ? 'Very good' : (status === 'fair' ? 'Fair' : 'Poor'))}</div>
                                <StarRating rating={scoreStars} className={themeStarColour} />
                            </div>
                        </div>
                        
                        {/* Breakdown */}
                        <div className="grid grid-cols-2 border-t border-[var(--ui-border)]">
                            <div className={`p-4 border-r border-[var(--ui-border)] flex items-center justify-between bg-[var(--ui-bg)]/50`}>
                                <span className={`text-sm font-medium text-[var(--ui-text)]`}>Small text</span>
                                <div className="flex gap-1 text-xs">
                                     {smallTextPass ? 
                                        <span className="font-bold text-emerald-500 flex items-center gap-1 uppercase tracking-tighter"><CheckCircle2 size={14} strokeWidth={1.5} /> Pass</span>
                                        : <span className="font-bold text-red-500 flex items-center gap-1 uppercase tracking-tighter"><XCircle size={14} strokeWidth={1.5} /> Fail</span>
                                     }
                                </div>
                            </div>
                            <div className={`p-4 flex items-center justify-between bg-[var(--ui-bg)]/50`}>
                                <span className={`text-sm font-medium text-[var(--ui-text)]`}>Large text</span>
                                <div className="flex gap-1 text-xs">
                                    {largeTextPass ? 
                                        <span className="font-bold text-emerald-500 flex items-center gap-1 uppercase tracking-tighter"><CheckCircle2 size={14} strokeWidth={1.5} /> Pass</span>
                                        : <span className="font-bold text-red-500 flex items-center gap-1 uppercase tracking-tighter"><XCircle size={14} strokeWidth={1.5} /> Fail</span>
                                     }
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-[var(--ui-text-muted)] leading-relaxed italic">
                        Good contrast for small text (below 18pt) and great contrast for large text (above 18pt or bold above 14pt).
                    </p>
                </div>

                {/* Right Column: Preview */}
                <div 
                    className="rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-inner relative transition-colors duration-200 min-h-[340px] border border-black/5"
                    style={{ backgroundColor: bgColour, color: textColour }}
                >
                    <Maximize2 size={20} strokeWidth={1.5} className="absolute top-4 right-4 opacity-50" />
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Preview</h1>
                    <p className="text-lg opacity-90 max-w-sm leading-relaxed font-medium">
                        Colour choices shape perception, emotions, and the way people connect with a design.
                    </p>
                </div>
             </div>
        </div>
    );
};


// --- Main Color Palette Component ---

interface ColourPaletteProps {
  colours: ColourToken[];
  setColours: (colours: ColourToken[]) => void;
  applyTheme: boolean;
  setApplyTheme: (apply: boolean) => void;
}

const ColourTokenEditor: React.FC<{ token: ColourToken; onChange: (value: string) => void }> = ({ token, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-4 bg-[var(--ui-surface)] rounded-2xl border border-[var(--ui-border)] hover:border-[var(--ui-text-muted)] transition-all group">
      <div className="md:col-span-1 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl border-2 border-[var(--ui-border)] shadow-sm group-hover:scale-105 transition-transform" style={{ backgroundColor: token.value }}></div>
        <div>
          <p className="font-semibold text-[var(--ui-text)] capitalize tracking-tight">{token.label}</p>
          <p className="text-xs font-mono text-[var(--ui-text-muted)]">{token.name}</p>
        </div>
      </div>
      <p className="md:col-span-2 text-sm text-[var(--ui-text-muted)] leading-snug">{token.description}</p>
      <div className="md:col-span-2 flex items-center gap-2 bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)] p-2 focus-within:ring-2 focus-within:ring-[var(--ui-accent)] transition-all">
        <div className="relative w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden ring-1 ring-black/5">
            <input
                type="color"
                value={token.value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label={`Select colour for ${token.label}`}
            />
            <div className="w-full h-full" style={{ backgroundColor: token.value }} />
        </div>
        <input
          type="text"
          value={token.value.toUpperCase()}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent text-[var(--ui-text)] font-mono tracking-wider focus:outline-none text-sm uppercase"
        />
      </div>
    </div>
  );
};

const ColourPalette: React.FC<ColourPaletteProps> = ({ colours, setColours, applyTheme, setApplyTheme }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleColourChange = (name: string, value: string) => {
        const newColours = colours.map(colour =>
            colour.name === name ? { ...colour, value } : colour
        );
        setColours(newColours);
    };

    const handleSuggestPalette = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const suggestions = await getPaletteSuggestions(colours);
            const newColours = colours.map(colour => {
                const suggestedValue = suggestions[colour.name];
                return suggestedValue ? { ...colour, value: suggestedValue } : colour;
            });
            setColours(newColours);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-bold text-[var(--ui-text)] tracking-tighter">Colour Palette</h2>
          <p className="text-[var(--ui-text-muted)] mt-1 font-medium">Define the foundational colours and check accessibility.</p>
        </div>
        
        <div className="flex items-center gap-4">
            {/* Apply Theme Toggle */}
            <button 
                onClick={() => setApplyTheme(!applyTheme)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 font-semibold text-sm
                    ${applyTheme ? 'bg-[var(--ui-accent-faint)] border-[var(--ui-accent)] text-[var(--ui-accent)]' : 'bg-[var(--ui-surface)] border-[var(--ui-border)] text-[var(--ui-text-muted)] hover:border-[var(--ui-text-muted)]'}`}
            >
                {applyTheme ? <CheckCircle2 size={18} strokeWidth={1.5} /> : <Circle size={18} strokeWidth={1.5} />}
                Apply Theme
            </button>

            <button
                onClick={handleSuggestPalette}
                disabled={isLoading}
                className="flex items-center gap-2 bg-[var(--ui-accent)] text-[var(--ui-accent-on)] font-semibold py-2.5 px-6 rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--ui-accent)]/20 active:scale-95"
            >
                {isLoading ? (
                    <Sparkles size={18} strokeWidth={1.5} className="animate-pulse" />
                ) : (
                    <Sparkles size={18} strokeWidth={1.5} />
                )}
                {isLoading ? 'Generating...' : 'Smart Suggestions'}
            </button>
        </div>
      </div>

       {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-center gap-3">
          <AlertCircle size={20} strokeWidth={1.5} />
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <ContrastChecker />

      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--ui-border)] pb-2">
            <Palette size={20} strokeWidth={1.5} className="text-[var(--ui-text-muted)]" />
            <h3 className="text-xl font-semibold text-[var(--ui-text)] tracking-tight">Colour Tokens</h3>
        </div>
        <div className="grid gap-3">
            {colours.map(token => (
            <ColourTokenEditor
                key={token.name}
                token={token}
                onChange={(value) => handleColourChange(token.name, value)}
            />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ColourPalette;
