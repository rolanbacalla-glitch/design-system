import React from 'react';
import { ElevationToken } from '../types';
import { Copy, Calculator } from 'lucide-react';

interface ElevationStylesProps {
  elevation: ElevationToken[];
  setElevation: (elevation: ElevationToken[]) => void;
}

const ElevationStyles: React.FC<ElevationStylesProps> = ({ elevation, setElevation }) => {
  
  const handleShadowChange = (name: string, value: string) => {
    const newElevation = elevation.map(e =>
      e.name === name ? { ...e, shadow: value } : e
    );
    setElevation(newElevation);
  };

  const copyCss = (token: ElevationToken) => {
    const css = `--elevation-${token.name}: ${token.shadow};`;
    navigator.clipboard.writeText(css);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-4xl font-bold text-[var(--ui-text)] tracking-tighter">Elevation</h2>
        <p className="text-[var(--ui-text-muted)] mt-1 font-medium">Define depth and hierarchy with a consistent shadow system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {elevation.map(token => (
          <div key={token.name} className="p-6 bg-[var(--ui-surface)] rounded-2xl border border-[var(--ui-border)] flex flex-col shadow-sm hover:border-[var(--ui-text-muted)] transition-all group">
            <div className="flex-grow flex items-center justify-center p-12 bg-[var(--ui-bg)] rounded-xl mb-6">
              <div 
                className="w-32 h-32 bg-[var(--ui-surface)] border border-[var(--ui-border)] rounded-2xl transition-all duration-500 group-hover:scale-110" 
                style={{ boxShadow: token.shadow }}
              ></div>
            </div>
            <div className="border-t border-[var(--ui-border)] pt-4">
              <p className="font-semibold text-[var(--ui-text)] capitalize tracking-tight mb-2">{token.name}</p>
              <div className="relative">
                <input 
                  type="text"
                  value={token.shadow}
                  onChange={(e) => handleShadowChange(token.name, e.target.value)}
                  className="w-full bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)] p-3 pr-20 text-xs text-[var(--ui-text)] font-mono focus:outline-none focus:ring-2 focus:ring-[var(--ui-accent)] transition-all"
                  placeholder="e.g., 0 1px 3px rgba(0,0,0,0.1)"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button 
                        onClick={() => copyCss(token)}
                        className="p-1.5 bg-[var(--ui-surface)] border border-[var(--ui-border)] rounded-lg text-[var(--ui-text-muted)] hover:text-[var(--ui-accent)] transition-all active:scale-90"
                        title="Copy CSS"
                    >
                        <Copy size={14} />
                    </button>
                    <div className="text-[var(--ui-text-muted)] p-1.5">
                        <Calculator size={14} />
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElevationStyles;