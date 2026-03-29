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
  ChevronRight,
  Cpu,
  UnfoldVertical,
  Activity,
  Terminal,
  Ship,
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
    <nav className="fixed md:static bottom-0 left-0 right-0 md:h-screen md:w-80 glass-premium rounded-none p-6 md:p-8 flex md:flex-col items-center md:items-stretch transition-all duration-700 z-50 backdrop-blur-3xl border-r border-white/10 gap-10">
      
      {/* Brand & Status */}
      <div className="hidden md:flex flex-col gap-6 px-2">
          <div className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-white text-black rounded-[22px] flex items-center justify-center shadow-4xl group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-400 opacity-20"></div>
                <Cpu size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tightest leading-none flex items-center gap-2">
                GENESIS
                <span className="text-[10px] bg-white/10 text-white/40 px-2 py-0.5 rounded-full font-mono">v3.0</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse"></div>
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Protocol Active</span>
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
      </div>

      {/* Navigation Matrix */}
      <ul className="flex md:flex-col gap-3 w-full overflow-x-auto md:overflow-y-auto md:overflow-x-visible no-scrollbar p-1 flex-1">
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
            >
              <button
                onClick={() => setCurrentView(item.id)}
                className={`relative group flex items-center md:px-2 md:py-4 w-full transition-all duration-500 overflow-hidden
                  ${isActive ? 
                    'text-white border-b border-white/60' : 
                    'text-white/20 border-b border-transparent hover:text-white/60'}`}
              >
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex items-center gap-5">
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="transition-all duration-500" />
                    <div className="hidden md:flex flex-col items-start">
                        <span className={`font-black text-[12px] uppercase tracking-widest transition-all duration-500 ${isActive ? 'translate-x-1' : ''}`}>{item.label}</span>
                        <span className={`text-[8px] font-mono mt-0.5 transition-colors ${isActive ? 'text-white/40' : 'text-white/10'}`}>{item.ref}</span>
                    </div>
                  </div>
                  {isActive && <div className="hidden md:block w-1 h-1 rounded-full bg-white animate-pulse" />}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* System Deck Footer */}
      <div className="hidden md:flex flex-col gap-4 mt-auto">
          <div className="flex gap-3">
            <button 
                onClick={toggleTheme}
                className="flex-1 flex items-center justify-center h-16 rounded-[24px] bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all duration-500 group shadow-xl"
                title="Theme Shift"
            >
                {theme === 'light' ? <Moon size={20} className="group-hover:rotate-12 transition-transform" /> : <Sun size={20} className="group-hover:rotate-12 transition-transform" />}
            </button>
            <button 
                className="flex-1 flex items-center justify-center h-16 rounded-[24px] bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all duration-500 group shadow-xl"
                title="Terminal Access"
            >
                <Terminal size={20} />
            </button>
          </div>

          <button 
            className="relative h-20 w-full bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-[28px] overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-4xl flex items-center justify-center gap-4"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-300 opacity-20"></div>
            <Ship size={18} strokeWidth={3} className="animate-bounce" />
            DEPLOY SYSTEM
          </button>

          <div className="flex flex-col items-center gap-2 mt-4 opacity-5">
              <Sparkles size={16} />
              <span className="text-[8px] font-black uppercase tracking-[1em]">END OF COMMAND</span>
          </div>
      </div>
    </nav>
  );
};

export default Sidebar;
