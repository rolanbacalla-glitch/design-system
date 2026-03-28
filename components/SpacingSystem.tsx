import React, { useState } from 'react';
import { SpacingToken } from '../types';
import { Copy, Calculator, ArrowRightLeft } from 'lucide-react';

interface SpacingSystemProps {
  spacing: SpacingToken[];
  setSpacing: (spacing: SpacingToken[]) => void;
}

const SpacingSystem: React.FC<SpacingSystemProps> = ({ spacing, setSpacing }) => {
  const [basePx, setBasePx] = useState(16);
  const [pxInput, setPxInput] = useState('');
  const [emResult, setEmResult] = useState<string | null>(null);

  const handleSpacingChange = (name: string, value: number) => {
    const newSpacing = spacing.map(space =>
      space.name === name ? { ...space, value: Math.max(0, value) } : space
    );
    setSpacing(newSpacing);
  };

  const copyCss = (token: SpacingToken) => {
    const css = `--spacing-${token.name}: ${token.value}px;`;
    navigator.clipboard.writeText(css);
  };

  const convertPxToEm = () => {
    const px = parseFloat(pxInput);
    if (!isNaN(px) && basePx > 0) {
      setEmResult((px / basePx).toFixed(3));
    } else {
      setEmResult(null);
    }
  };
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-bold text-[var(--ui-text)] tracking-tighter">Spacing System</h2>
          <p className="text-[var(--ui-text-muted)] mt-1 font-medium">Define consistent gutters and gaps for your layouts.</p>
        </div>

        {/* Px to Em Converter Tool */}
        <div className="bg-[var(--ui-surface)] p-6 rounded-3xl border border-[var(--ui-border)] shadow-sm flex flex-col lg:flex-row items-center gap-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--ui-accent)] opacity-50"></div>
          <div className="flex items-center gap-3 text-[var(--ui-text)]">
            <div className="p-2 bg-[var(--ui-accent-faint)] rounded-xl text-[var(--ui-accent)]">
              <Calculator size={20} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest block leading-none">Converter</span>
              <span className="text-[10px] font-semibold text-[var(--ui-text-muted)] uppercase tracking-tighter">Px to Em Visualiser</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-24">
                <input 
                  type="number" 
                  placeholder="Px"
                  value={pxInput}
                  onChange={(e) => setPxInput(e.target.value)}
                  className="w-full bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)] p-3 text-sm font-mono text-[var(--ui-text)] focus:outline-none focus:ring-2 focus:ring-[var(--ui-accent)] transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[var(--ui-text-muted)] pointer-events-none">PX</span>
              </div>
              
              <ArrowRightLeft size={16} className="text-[var(--ui-text-muted)] shrink-0 rotate-90 sm:rotate-0" />
              
              <div className="relative group/result w-full sm:w-28">
                <div className="w-full bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)] p-3 text-sm font-mono text-[var(--ui-text)] min-h-[46px] flex items-center shadow-inner">
                  {emResult || '0.000'}
                </div>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[var(--ui-text-muted)]">EM</span>
                
                {emResult && (
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${emResult}em`);
                    }}
                    className="absolute -top-2 -right-2 p-1.5 bg-[var(--ui-accent)] text-[var(--ui-accent-on)] rounded-lg shadow-lg opacity-0 group-hover/result:opacity-100 transition-all active:scale-90"
                    title="Copy result"
                  >
                    <Copy size={12} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-[var(--ui-border)] pt-4 sm:pt-0 sm:pl-6 h-auto sm:h-10 w-full sm:w-auto">
              <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-0 w-full">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--ui-text-muted)] sm:mb-1 shrink-0">Base Size</label>
                <div className="relative flex-1 sm:flex-none">
                  <input 
                    type="number" 
                    value={basePx}
                    onChange={(e) => setBasePx(Number(e.target.value))}
                    className="w-full sm:w-16 bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)] p-2 text-xs font-mono text-[var(--ui-text)] focus:outline-none focus:ring-2 focus:ring-[var(--ui-accent)] transition-all"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-semibold text-[var(--ui-text-muted)] pointer-events-none">PX</span>
                </div>
              </div>
            </div>

            <button 
              onClick={convertPxToEm}
              className="w-full sm:w-auto px-6 py-3 bg-[var(--ui-accent)] text-[var(--ui-accent-on)] rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-[var(--ui-accent-hover)] transition-all active:scale-95 shadow-lg shadow-[var(--ui-accent)]/20"
            >
              Convert
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {spacing.map(token => (
          <div key={token.name} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center p-6 bg-[var(--ui-surface)] rounded-2xl border border-[var(--ui-border)] hover:border-[var(--ui-text-muted)] transition-all group">
            <div className="md:col-span-1">
                <p className="font-semibold text-[var(--ui-text)] uppercase tracking-widest text-xs">{token.name}</p>
                <p className="text-2xl font-bold text-[var(--ui-text)] mt-1">{token.value}<span className="text-xs font-medium text-[var(--ui-text-muted)] ml-1">px</span></p>
            </div>
            <div className="md:col-span-3 flex items-center overflow-hidden">
                <div 
                    className="bg-[var(--ui-accent)] h-8 rounded-lg shadow-lg shadow-[var(--ui-accent)]/20 transition-all group-hover:scale-y-110 max-w-full"
                    style={{ width: `${token.value}px`, minWidth: '4px' }}
                ></div>
            </div>
            <div className="md:col-span-1 flex flex-col gap-2 w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ui-text-muted)] mb-1">Value (px)</label>
                <div className="flex gap-2 w-full">
                    <input 
                        type="number" 
                        value={token.value} 
                        onChange={e => handleSpacingChange(token.name, Number(e.target.value))} 
                        className="flex-1 min-w-0 bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)] p-2 text-[var(--ui-text)] focus:outline-none focus:ring-2 focus:ring-[var(--ui-accent)] transition-all font-mono text-sm"
                    />
                    <button 
                        onClick={() => copyCss(token)}
                        className="p-2 bg-[var(--ui-bg)] border border-[var(--ui-border)] rounded-xl text-[var(--ui-text-muted)] hover:text-[var(--ui-accent)] transition-all active:scale-90"
                        title="Copy CSS"
                    >
                        <Copy size={16} />
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpacingSystem;