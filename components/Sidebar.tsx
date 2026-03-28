
import React, { useState, useRef } from 'react';
import { 
  Palette, 
  Type, 
  LayoutGrid, 
  Layers, 
  Component, 
  Zap, 
  Moon, 
  Sun,
  GripVertical,
  PenTool,
  Square,
  Download
} from 'lucide-react';
import { DesignSystem } from '../types';

type View = 'colours' | 'typography' | 'spacing' | 'elevation' | 'icons' | 'gradients' | 'tailwind';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  designSystem: DesignSystem;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, theme, toggleTheme, designSystem }) => {
  const [items, setItems] = useState<{ id: View; label: string; icon: React.ElementType }[]>([
    { id: 'colours', label: 'Colours', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: LayoutGrid },
    { id: 'elevation', label: 'Elevation', icon: Layers },
    { id: 'icons', label: 'Icons', icon: Component },
    { id: 'gradients', label: 'Gradients', icon: Zap },
    { id: 'tailwind', label: 'Tailwind', icon: Square },
  ]);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

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
    dragOverItem.current = null;
  };

  return (
    <nav className="w-20 md:w-64 h-full overflow-y-auto overflow-x-hidden bg-[var(--ui-surface)] border-r border-[var(--ui-border)] p-3 md:p-4 flex flex-col items-center md:items-start transition-colors duration-300">
      <div className="mb-4 md:mb-8 flex items-center gap-3 w-full justify-center md:justify-start flex-shrink-0">
        <div className="bg-[var(--ui-accent)] p-2.5 rounded-xl text-[var(--ui-accent-on)] shadow-lg shadow-[var(--ui-accent)]/20">
          <PenTool size={20} strokeWidth={1.5} />
        </div>
        <h1 className="text-xl font-bold hidden md:block text-[var(--ui-text)] tracking-tighter leading-tight">Design System Tokens</h1>
      </div>

      <ul className="space-y-1 w-full">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <li 
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className="cursor-move"
              style={{ viewTransitionName: `nav-${item.id}` } as any}
            >
              <button
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 justify-center md:justify-start group relative
                  ${currentView === item.id ? 
                    'bg-[var(--ui-accent-faint)] text-[var(--ui-accent)]' : 
                    'text-[var(--ui-text-muted)] hover:bg-[var(--ui-surface-hover)] hover:text-[var(--ui-text)]'}`}
              >
                {currentView === item.id && (
                  <div className="absolute left-0 w-1 h-6 bg-[var(--ui-accent)] rounded-r-full hidden md:block" />
                )}
                <div className="flex items-center gap-4">
                   <Icon size={20} strokeWidth={1.5} className={`transition-transform duration-200 ${currentView === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                   <span className="hidden md:block font-medium text-sm tracking-tight">{item.label}</span>
                </div>
                <GripVertical size={14} strokeWidth={1.5} className="ml-auto opacity-0 group-hover:opacity-20 hidden md:block" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto w-full pt-4 border-t border-[var(--ui-border)] flex-shrink-0 space-y-1">
        <button 
          onClick={() => {
            parent.postMessage({ pluginMessage: { type: 'export-to-figma', designSystem } }, '*');
          }}
          className="flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 justify-center md:justify-start text-[var(--ui-accent)] bg-[var(--ui-accent-faint)] hover:bg-[var(--ui-accent)] hover:text-[var(--ui-accent-on)] group"
        >
          <div className="transition-transform duration-200 group-hover:scale-110">
            <Download size={20} strokeWidth={1.5} />
          </div>
          <span className="hidden md:block font-medium text-sm tracking-tight">
            Export to Figma
          </span>
        </button>

        <button 
          onClick={toggleTheme}
          className="flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 justify-center md:justify-start text-[var(--ui-text-muted)] hover:bg-[var(--ui-surface-hover)] hover:text-[var(--ui-text)] group"
        >
          <div className="transition-transform duration-300 group-hover:rotate-12">
            {theme === 'light' ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
          </div>
          <span className="hidden md:block font-medium text-sm tracking-tight">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
