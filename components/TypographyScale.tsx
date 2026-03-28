
import React, { useState } from 'react';
import { TypographyToken } from '../types';
import { X, Check, Copy, Share2 } from 'lucide-react';

interface TypographyScaleProps {
  typography: TypographyToken[];
  setTypography: (typography: TypographyToken[]) => void;
}

const fontFamilies = ['SF Pro', 'Inter', 'Roboto', 'Noto Sans', 'Montserrat', 'Space Grotesk', 'Outfit'];
const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const TypographyExportModal: React.FC<{ typography: TypographyToken[], onClose: () => void }> = ({ typography, onClose }) => {
    const [copied, setCopied] = useState(false);
    
    const jsonOutput = JSON.stringify(typography, null, 2);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-[var(--app-surface)] rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-[var(--app-border)]">
                    <h3 className="text-xl font-semibold text-[var(--app-text)]">Export Typography Tokens</h3>
                    <button onClick={onClose} className="p-2 hover:bg-[var(--app-background)] rounded-full text-[var(--app-text)] transition-colors">
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <p className="text-sm text-[var(--app-text-muted)] mb-4">
                        Copy this JSON structure to use with Figma plugins or your own build tools.
                    </p>
                    <div className="relative group">
                        <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs font-mono overflow-x-auto max-h-[400px]">
                            {jsonOutput}
                        </pre>
                        <button 
                            onClick={handleCopy}
                            className="absolute top-4 right-4 px-3 py-1.5 bg-white text-gray-900 rounded text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm"
                        >
                            {copied ? <Check size={14} strokeWidth={1.5} /> : <Copy size={14} strokeWidth={1.5} />}
                            {copied ? 'Copied' : 'Copy JSON'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TypographyScale: React.FC<TypographyScaleProps> = ({ typography, setTypography }) => {
  const [globalFont, setGlobalFont] = useState(typography[0]?.fontFamily || 'Inter');
  const [isGlobalFont, setIsGlobalFont] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleGlobalFontChange = (font: string) => {
    setGlobalFont(font);
    if (isGlobalFont) {
        const newTypography = typography.map(t => ({ ...t, fontFamily: font }));
        setTypography(newTypography);
    }
  };

  const toggleGlobalFont = (checked: boolean) => {
    setIsGlobalFont(checked);
    if (checked) {
        const newTypography = typography.map(t => ({ ...t, fontFamily: globalFont }));
        setTypography(newTypography);
    }
  };

  const handleTypographyChange = <K extends keyof TypographyToken>(
    name: string,
    field: K,
    value: TypographyToken[K]
  ) => {
    const newTypography = typography.map(typo =>
      typo.name === name ? { ...typo, [field]: value } : typo
    );
    setTypography(newTypography);
  };

  const copyCSS = (token: TypographyToken) => {
      const css = `
font-family: "${token.fontFamily}";
font-weight: ${token.fontWeight};
font-size: ${token.fontSize}px;
line-height: ${token.lineHeight}px;
letter-spacing: ${token.letterSpacing}px;
      `.trim();
      navigator.clipboard.writeText(css);
      setCopiedToken(token.name);
      setTimeout(() => setCopiedToken(null), 2000);
  };
  
  return (
    <div className="space-y-8 relative">
        {showExport && <TypographyExportModal typography={typography} onClose={() => setShowExport(false)} />}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 className="text-4xl font-bold text-[var(--ui-text)] tracking-tighter">Typography Scale</h2>
                <p className="text-[var(--ui-text-muted)] mt-1 font-medium">Establish a clear hierarchy for text elements.</p>
            </div>
            <button 
                onClick={() => setShowExport(true)}
                className="flex items-center gap-2 bg-[var(--ui-surface)] border border-[var(--ui-border)] hover:bg-[var(--ui-surface-hover)] text-[var(--ui-text)] px-4 py-2 rounded-xl font-semibold transition-all shadow-sm active:scale-95"
            >
                <Share2 size={20} strokeWidth={1.5} />
                Export
            </button>
        </div>

        {/* Global Settings Panel */}
        <div className="bg-[var(--ui-surface)] p-6 rounded-2xl border border-[var(--ui-border)] shadow-sm">
            <h3 className="text-lg font-semibold text-[var(--ui-text)] mb-4 tracking-tight">Global Settings</h3>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                <div className="w-full md:w-64">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-muted)] block mb-1">Global Font Family</label>
                    <select 
                        value={globalFont} 
                        onChange={(e) => handleGlobalFontChange(e.target.value)} 
                        className="w-full bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)] p-2 text-[var(--ui-text)] focus:outline-none focus:ring-2 focus:ring-[var(--ui-accent)] transition-all text-sm"
                    >
                        {fontFamilies.map(ff => <option key={ff} value={ff}>{ff}</option>)}
                    </select>
                </div>
                
                <label className="flex items-center gap-2 cursor-pointer select-none group pb-2">
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            checked={isGlobalFont} 
                            onChange={(e) => toggleGlobalFont(e.target.checked)}
                            className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded border-2 border-[var(--ui-text-muted)] peer-checked:bg-[var(--ui-accent)] peer-checked:border-[var(--ui-accent)] bg-transparent transition-all flex items-center justify-center">
                             {isGlobalFont && <Check size={14} strokeWidth={2} className="text-[var(--ui-accent-on)] font-bold" />}
                        </div>
                    </div>
                    <span className="text-sm font-semibold text-[var(--ui-text)]">Apply to all styles</span>
                </label>
            </div>
        </div>

        <div className="space-y-4">
            {typography.map(token => (
                <div key={token.name} className="p-6 bg-[var(--ui-surface)] rounded-2xl border border-[var(--ui-border)] shadow-sm relative group hover:border-[var(--ui-text-muted)] transition-all">
                    <div className="flex justify-between items-start mb-4">
                         <div className="flex items-center gap-3">
                             <p className="text-[var(--ui-text-muted)] font-semibold text-xs uppercase tracking-widest">{token.label}</p>
                             <span className="text-[10px] font-semibold bg-[var(--ui-bg)] text-[var(--ui-text-muted)] px-2 py-0.5 rounded-full border border-[var(--ui-border)] uppercase">
                                {token.fontSize}px / {token.lineHeight}px
                             </span>
                         </div>
                         <button 
                            onClick={() => copyCSS(token)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-[var(--ui-accent)] hover:bg-[var(--ui-accent-faint)] px-3 py-1 rounded-lg flex items-center gap-1"
                            title="Copy CSS"
                         >
                            {copiedToken === token.name ? <Check size={14} strokeWidth={1.5} /> : <Copy size={14} strokeWidth={1.5} />}
                            {copiedToken === token.name ? 'Copied' : 'CSS'}
                         </button>
                    </div>
                    
                    <p 
                        style={{
                            fontFamily: token.fontFamily === 'SF Pro' ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' : token.fontFamily,
                            fontWeight: token.fontWeight,
                            fontSize: `${token.fontSize}px`,
                            lineHeight: `${token.lineHeight}px`,
                            letterSpacing: `${token.letterSpacing}px`
                        }}
                        className="text-[var(--ui-text)] truncate mb-6"
                    >
                        The quick brown fox jumps over the lazy dog.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[var(--ui-border)] pt-4">
                       <SelectInput 
                            label="Font Family" 
                            value={token.fontFamily} 
                            onChange={e => handleTypographyChange(token.name, 'fontFamily', e.target.value)}
                            disabled={isGlobalFont}
                        >
                            {fontFamilies.map(ff => <option key={ff} value={ff}>{ff}</option>)}
                       </SelectInput>
                       <SelectInput label="Font Weight" value={token.fontWeight} onChange={e => handleTypographyChange(token.name, 'fontWeight', Number(e.target.value))}>
                            {fontWeights.map(fw => <option key={fw} value={fw}>{fw}</option>)}
                       </SelectInput>
                       <NumberInput label="Font Size (px)" value={token.fontSize} onChange={e => handleTypographyChange(token.name, 'fontSize', Number(e.target.value))} />
                       <NumberInput label="Line Height (px)" value={token.lineHeight} onChange={e => handleTypographyChange(token.name, 'lineHeight', Number(e.target.value))} />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

// Helper components for inputs
const NumberInput: React.FC<{ label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-muted)] block mb-1">{label}</label>
        <input 
            type="number" 
            value={value} 
            onChange={onChange} 
            className="w-full min-w-0 bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)] p-2 text-[var(--ui-text)] focus:outline-none focus:ring-2 focus:ring-[var(--ui-accent)] transition-all text-sm font-mono"
        />
    </div>
);

const SelectInput: React.FC<{ label: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, disabled?: boolean, children: React.ReactNode }> = ({ label, value, onChange, disabled, children }) => (
    <div>
        <label className={`text-xs font-semibold uppercase tracking-wider block mb-1 ${disabled ? 'opacity-30' : 'text-[var(--ui-text-muted)]'}`}>{label}</label>
        <select 
            value={value} 
            onChange={onChange} 
            disabled={disabled}
            className={`w-full min-w-0 bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)] p-2 text-[var(--ui-text)] focus:outline-none focus:ring-2 focus:ring-[var(--ui-accent)] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm`}
        >
            {children}
        </select>
    </div>
);

export default TypographyScale;
