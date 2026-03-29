import React, { useState, useRef } from 'react';
import { DesignSystem } from '../types';
import { 
  Palette, 
  Type, 
  Grid3X3, 
  Layers, 
  Component, 
  Zap, 
  Wind, 
  LayoutDashboard,
  Moon,
  Sun,
  Cpu,
  Sparkles
} from 'lucide-react';

type View = 'colours' | 'typography' | 'spacing' | 'elevation' | 'icons' | 'gradients' | 'tailwind' | 'flyonui';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  designSystem: DesignSystem;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, theme, toggleTheme, designSystem }) => {
  const [items, setItems] = useState<{ id: View; label: string; icon: any; ref: string }[]>([
    { id: 'colours', label: 'Spectrum', icon: Palette, ref: '0x01' },
    { id: 'typography', label: 'Foundry', icon: Type, ref: '0x02' },
    { id: 'spacing', label: 'Spatial', icon: Grid3X3, ref: '0x03' },
    { id: 'elevation', label: 'Shadows', icon: Layers, ref: '0x04' },
    { id: 'icons', label: 'Symbols', icon: Component, ref: '0x05' },
    { id: 'gradients', label: 'Chroma', icon: Zap, ref: '0x06' },
    { id: 'tailwind', label: 'Tailwind', icon: Wind, ref: '0x07' },
    { id: 'flyonui', label: 'FlyonUI', icon: LayoutDashboard, ref: '0x08' },
  ]);

  const dragItem = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent, position: number) => {
    dragItem.current = position;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    if (dragItem.current === null) return;
    
    if (dragItem.current !== position) {
        const newItems = [...items];
        const draggedItemContent = newItems[dragItem.current];
        newItems.splice(dragItem.current, 1);
        newItems.splice(position, 0, draggedItemContent);
        
        if ('startViewTransition' in document) {
            (document as any).startViewTransition(() => {
                setItems(newItems);
                dragItem.current = position;
            });
        } else {
            setItems(newItems);
            dragItem.current = position;
        }
    }
  };

  const handleDragEnd = () => {
    dragItem.current = null;
  };

  return (
    <nav className="fixed md:static bottom-0 left-0 right-0 md:min-h-screen md:w-56 glass-premium rounded-none p-4 flex md:flex-col items-center md:items-stretch transition-all duration-700 z-50 backdrop-blur-3xl border-r border-[var(--ui-border)] gap-8 font-inter">
      
      {/* Brand & Status */}
      <header className="hidden md:flex flex-col gap-6 px-2">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-[var(--ui-text)] text-[var(--ui-bg)] rounded-[18px] flex items-center justify-center shadow-4xl group-hover:scale-105 transition-transform duration-500 relative overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--ui-text)] to-[var(--ui-text-muted)] opacity-20"></div>
                <Cpu size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tightest leading-none flex items-center gap-2 text-[var(--ui-text)] uppercase italic">
                GENESIS
                <span className="text-[10px] bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] px-2 py-0.5 rounded-full font-mono not-italic" aria-label="Version 4.0">v4.0</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" aria-hidden="true"></div>
                  <span className="text-[9px] font-black text-[var(--ui-text-muted)] uppercase tracking-[0.3em]">Protocol Active</span>
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-[var(--ui-text)]/10 via-[var(--ui-text)]/5 to-transparent" aria-hidden="true"></div>
      </header>

      {/* Navigation Matrix */}
      <ul className="flex md:flex-col gap-3 w-full overflow-x-auto md:overflow-x-visible no-scrollbar p-1 list-none" role="menubar">
        {items.map((item, index) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <li 
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className="flex-shrink-0 md:w-full"
              role="none"
            >
              <button
                onClick={() => setCurrentView(item.id)}
                role="menuitem"
                aria-current={isActive ? 'page' : undefined}
                title={`Switch to ${item.label} manifest view`}
                className={`relative group flex items-center px-4 py-3 md:px-2 md:py-4 w-full transition-all duration-500 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20 rounded-xl
                  ${isActive ? 
                    'text-[var(--ui-text)] border-b border-[var(--ui-text)]/60 bg-[var(--ui-text)]/5' : 
                    'text-[var(--ui-text-muted)] border-b border-transparent hover:text-[var(--ui-text)]/80 hover:bg-[var(--ui-text)]/[0.02]'}`}
              >
                <div className="relative z-10 flex items-center justify-between w-full pointer-events-none">
                  <div className="flex items-center gap-5">
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="transition-all duration-500" aria-hidden="true" />
                    <div className="hidden md:flex flex-col items-start">
                        <span className={`font-black text-[12px] uppercase tracking-widest transition-all duration-500 ${isActive ? 'translate-x-1' : ''}`}>{item.label}</span>
                        <span className={`text-[8px] font-mono mt-0.5 transition-colors ${isActive ? 'text-[var(--ui-text-muted)]' : 'text-[var(--ui-text)]/20'}`}>{item.ref}</span>
                    </div>
                  </div>
                  {isActive && <div className="hidden md:block w-1 h-1 rounded-full bg-[var(--ui-text)] animate-pulse" aria-hidden="true" />}
                </div>
              </button>
            </li>
          );
        })}
        
        {/* Utilities Section */}
        <li className="hidden md:block mt-8 border-t border-[var(--ui-border)] pt-8" role="none">
          <div className="flex flex-col gap-4">
            <button 
                onClick={toggleTheme}
                type="button"
                className="flex items-center justify-center h-16 rounded-[24px] bg-[var(--ui-bg-muted)] border border-[var(--ui-border)] text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] hover:bg-[var(--ui-bg)] transition-all duration-500 group shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--ui-text)]/20"
                title={`Shift to ${theme === 'light' ? 'Dark' : 'Light'} UI protocol`}
                aria-label={`Toggle theme, currently ${theme} mode`}
            >
                {theme === 'light' ? <Moon size={20} className="group-hover:rotate-12 transition-transform" aria-hidden="true" /> : <Sun size={20} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />}
            </button>

            <div className="flex flex-col items-center gap-2 mt-4 opacity-50 pointer-events-none">
                <Sparkles size={16} className="text-[var(--ui-text-muted)]" aria-hidden="true" />
                <span className="text-[8px] font-black uppercase tracking-[1em] text-[var(--ui-text-muted)]">END OF COMMAND</span>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
