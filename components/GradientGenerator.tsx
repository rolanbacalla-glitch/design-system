
import React, { useState, useRef, useEffect } from 'react';
import { GradientToken, GradientStop } from '../types';
import { 
  Copy, 
  RefreshCw, 
  Trash2, 
  Plus, 
  Heart, 
  MoreHorizontal, 
  GripVertical, 
  Maximize2, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface GradientGeneratorProps {
  savedGradients: GradientToken[];
  onSave: (gradient: GradientToken) => void;
}

// Modern Preset Gradients inspired by uiGradients
const PRESET_GRADIENTS: GradientToken[] = [
    {
      name: 'Vivid Sky',
      type: 'linear',
      rotation: 90,
      stops: [ { id: 's1', colour: '#00d2ff', position: 0 }, { id: 's2', colour: '#3a7bd5', position: 100 } ]
    },
    {
      name: 'Cherry Blossom',
      type: 'linear',
      rotation: 135,
      stops: [ { id: 's1', colour: '#FBD3E9', position: 0 }, { id: 's2', colour: '#BB377D', position: 100 } ]
    },
    {
      name: 'Ocean Deep',
      type: 'linear',
      rotation: 90,
      stops: [ { id: 's1', colour: '#2b5876', position: 0 }, { id: 's2', colour: '#4e4376', position: 100 } ]
    },
    {
        name: 'Misty Forest',
        type: 'linear',
        rotation: 180,
        stops: [ { id: 's1', colour: '#11998e', position: 0 }, { id: 's2', colour: '#38ef7d', position: 100 } ]
    },
    {
        name: 'Velvet Sun',
        type: 'linear',
        rotation: 45,
        stops: [ { id: 's1', colour: '#e1eec3', position: 0 }, { id: 's2', colour: '#f05053', position: 100 } ]
    },
    {
        name: 'Midnight Bloom',
        type: 'linear',
        rotation: 90,
        stops: [ { id: 's1', colour: '#a8c0ff', position: 0 }, { id: 's2', colour: '#3f2b96', position: 100 } ]
    },
    {
        name: 'Golden Hour',
        type: 'linear',
        rotation: 0,
        stops: [ { id: 's1', colour: '#FDC830', position: 0 }, { id: 's2', colour: '#F37335', position: 100 } ]
    },
    {
        name: 'Electric Dream',
        type: 'linear',
        rotation: 120,
        stops: [ { id: 's1', colour: '#4776E6', position: 0 }, { id: 's2', colour: '#8E54E9', position: 100 } ]
    },
    {
        name: 'Frosty Morning',
        type: 'linear',
        rotation: 180,
        stops: [ { id: 's1', colour: '#E0EAFC', position: 0 }, { id: 's2', colour: '#CFDEF3', position: 100 } ]
    },
    {
        name: 'Rose Water',
        type: 'linear',
        rotation: 60,
        stops: [ { id: 's1', colour: '#E55D87', position: 0 }, { id: 's2', colour: '#5FC3E4', position: 100 } ]
    },
    {
        name: 'Citrus Blast',
        type: 'linear',
        rotation: 90,
        stops: [ { id: 's1', colour: '#83a4d4', position: 0 }, { id: 's2', colour: '#b6fbff', position: 100 } ]
    },
    {
        name: 'Neon Night',
        type: 'linear',
        rotation: 0,
        stops: [ { id: 's1', colour: '#00F260', position: 0 }, { id: 's2', colour: '#0575E6', position: 100 } ]
    }
];

const GradientGenerator: React.FC<GradientGeneratorProps> = ({ savedGradients, onSave }) => {
  // --- State ---
  const [stops, setStops] = useState<GradientStop[]>([
    { id: '1', colour: '#F292ED', position: 0 },
    { id: '2', colour: '#F36364', position: 100 }
  ]);
  const [rotation, setRotation] = useState(90);
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [selectedStopId, setSelectedStopId] = useState<string>('1');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showMoreMenu, setShowMoreMenu] = useState<string | null>(null);
  
  // Gallery State for Reordering
  const [gallery, setGallery] = useState<GradientToken[]>(PRESET_GRADIENTS);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Ensure selectedStopId always points to a valid stop
  useEffect(() => {
    if (!stops.find(s => s.id === selectedStopId)) {
        setSelectedStopId(stops[0].id);
    }
  }, [stops, selectedStopId]);

  const selectedStop = stops.find(s => s.id === selectedStopId) || stops[0];

  // --- Helpers ---
  
  const generateCss = (currentStops: GradientStop[], currentRotation: number, currentType: 'linear' | 'radial') => {
    const sortedStops = [...currentStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops.map(s => `${s.colour} ${s.position}%`).join(', ');
    
    if (currentType === 'radial') {
        return `radial-gradient(circle, ${stopsString})`;
    }
    return `linear-gradient(${currentRotation}deg, ${stopsString})`;
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(100, Math.max(0, Math.round((clickX / rect.width) * 100)));

    const newId = Date.now().toString();
    const newStop: GradientStop = { id: newId, colour: '#ffffff', position: percent };
    
    setStops([...stops, newStop]);
    setSelectedStopId(newId);
  };

  const updateStop = (id: string, updates: Partial<GradientStop>) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteStop = (id: string) => {
      if (stops.length <= 2) return; // Min 2 stops
      setStops(stops.filter(s => s.id !== id));
  };

  const handleCopyCss = () => {
      const css = `background: ${generateCss(stops, rotation, type)};`;
      navigator.clipboard.writeText(css);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
  };

  const randomize = () => {
    const randomColour = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const newStops = [
        { id: Date.now() + '1', colour: randomColour(), position: 0 },
        { id: Date.now() + '2', colour: randomColour(), position: 100 }
    ];
    setStops(newStops);
    setRotation(Math.floor(Math.random() * 360));
    setSelectedStopId(newStops[0].id);
  };

  const toggleFavorite = (name: string) => {
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const duplicateGradient = (grad: GradientToken) => {
    const newGrad = { ...grad, name: `${grad.name} (Copy)` };
    setGallery(prev => [...prev, newGrad]);
    setShowMoreMenu(null);
  };

  const deleteGradient = (name: string) => {
    setGallery(prev => prev.filter(g => g.name !== name));
    setShowMoreMenu(null);
  };

  const loadGradient = (g: GradientToken) => {
      // Prevent loading if we just finished a drag
      if (isDragging) return;
      
      setStops(g.stops.map(s => ({...s}))); // Deep copy
      setRotation(g.rotation);
      setType(g.type);
      setSelectedStopId(g.stops[0].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Slider Drag Logic ---
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      setSelectedStopId(id);
      
      const startX = e.clientX;
      const startPos = stops.find(s => s.id === id)?.position || 0;
      const rect = sliderRef.current?.getBoundingClientRect();
      if (!rect) return;

      const handleMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.clientX - startX;
          const deltaPercent = (deltaX / rect.width) * 100;
          let newPos = Math.round(startPos + deltaPercent);
          newPos = Math.max(0, Math.min(100, newPos));
          updateStop(id, { position: newPos });
      };

      const handleMouseUp = () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
  };

  // --- Gallery Sort Logic ---
  const onSortStart = (e: React.DragEvent, index: number) => {
      dragItem.current = index;
      setIsDragging(true);
      e.dataTransfer.effectAllowed = "move";
  };

  const onSortEnter = (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (dragItem.current === null) return;
      
      if (dragItem.current !== index) {
          const newGallery = [...gallery];
          const draggedItemContent = newGallery[dragItem.current];
          newGallery.splice(dragItem.current, 1);
          newGallery.splice(index, 0, draggedItemContent);
          
          // Use View Transition API for smooth reordering if supported
          if ('startViewTransition' in document) {
              (document as any).startViewTransition(() => {
                  setGallery(newGallery);
                  dragItem.current = index;
              });
          } else {
              setGallery(newGallery);
              dragItem.current = index;
          }
      }
  };

  const onSortEnd = () => {
      dragItem.current = null;
      dragOverItem.current = null;
      setTimeout(() => setIsDragging(false), 100);
  };

  const currentCss = generateCss(stops, rotation, type);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-4xl font-bold text-[var(--ui-text)] tracking-tighter">Gradient Generator</h2>
        <p className="text-[var(--ui-text-muted)] mt-1 font-medium">Create beautiful gradients and export the CSS.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Controls */}
        <div className="bg-[var(--ui-surface)] p-8 rounded-3xl border border-[var(--ui-border)] shadow-sm">
            {/* Slider */}
            <div className="mb-10">
                <div 
                    ref={sliderRef}
                    className="h-8 rounded-2xl relative cursor-pointer shadow-inner ring-1 ring-black/5"
                    style={{ background: `linear-gradient(to right, ${[...stops].sort((a,b) => a.position - b.position).map(s => `${s.colour} ${s.position}%`).join(', ')})` }}
                    onClick={handleSliderClick}
                >
                    {stops.map(stop => (
                        <div
                            key={stop.id}
                            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 cursor-grab active:cursor-grabbing shadow-lg transition-transform hover:scale-110
                                ${selectedStopId === stop.id ? 'border-white ring-4 ring-[var(--ui-accent)] scale-110 z-10' : 'border-white'}`}
                            style={{ left: `calc(${stop.position}% - 12px)`, backgroundColor: stop.colour }}
                            onMouseDown={(e) => handleMouseDown(e, stop.id)}
                            onClick={(e) => { e.stopPropagation(); setSelectedStopId(stop.id); }}
                        />
                    ))}
                </div>
                <p className="text-[10px] font-semibold text-center text-[var(--ui-text-muted)] mt-4 uppercase tracking-widest">Click bar to add stop. Drag handles to adjust.</p>
            </div>

            {/* Selected Stop Controls */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--ui-text-muted)] mb-2">Colour</label>
                    <div className="flex items-center gap-3 border border-[var(--ui-border)] rounded-xl p-2 bg-[var(--ui-bg)] focus-within:ring-2 focus-within:ring-[var(--ui-accent)] transition-all">
                        <div className="relative w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden border border-[var(--ui-border)]">
                            <input 
                                type="color" 
                                value={selectedStop.colour} 
                                onChange={(e) => updateStop(selectedStop.id, { colour: e.target.value })}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer scale-150"
                            />
                            <div className="w-full h-full" style={{ backgroundColor: selectedStop.colour }} />
                        </div>
                        <input 
                            type="text" 
                            value={selectedStop.colour.toUpperCase()} 
                            onChange={(e) => updateStop(selectedStop.id, { colour: e.target.value })}
                            className="w-full text-sm font-mono font-semibold text-[var(--ui-text)] focus:outline-none bg-transparent"
                        />
                    </div>
                </div>
                
                <div className="flex flex-col">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--ui-text-muted)] mb-2">Position</label>
                    <div className="flex items-center gap-3 border border-[var(--ui-border)] rounded-xl p-2 bg-[var(--ui-bg)] focus-within:ring-2 focus-within:ring-[var(--ui-accent)] transition-all h-[46px]">
                        <input 
                            type="number" 
                            min="0" 
                            max="100"
                            value={selectedStop.position}
                            onChange={(e) => updateStop(selectedStop.id, { position: Number(e.target.value) })}
                            className="w-full text-sm font-semibold text-[var(--ui-text)] focus:outline-none bg-transparent"
                        />
                        <span className="text-xs font-semibold text-[var(--ui-text-muted)] pr-1">%</span>
                    </div>
                </div>
            </div>

            {/* Global Settings */}
            <div className="grid grid-cols-2 gap-6 mb-10">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--ui-text-muted)] mb-2">Rotation</label>
                    <div className="relative border border-[var(--ui-border)] rounded-xl bg-[var(--ui-bg)] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--ui-accent)] transition-all">
                         <select 
                            value={rotation} 
                            onChange={(e) => setRotation(Number(e.target.value))}
                            className="w-full p-2.5 text-sm font-semibold text-[var(--ui-text)] bg-transparent focus:outline-none appearance-none cursor-pointer"
                        >
                            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                                <option key={deg} value={deg}>{deg}°</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--ui-text-muted)]" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--ui-text-muted)] mb-2">Type</label>
                     <div className="relative border border-[var(--ui-border)] rounded-xl bg-[var(--ui-bg)] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--ui-accent)] transition-all">
                        <select 
                            value={type} 
                            onChange={(e) => setType(e.target.value as any)}
                            className="w-full p-2.5 text-sm font-semibold text-[var(--ui-text)] bg-transparent focus:outline-none appearance-none cursor-pointer"
                        >
                            <option value="linear">Linear</option>
                            <option value="radial">Radial</option>
                        </select>
                         <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--ui-text-muted)]" />
                    </div>
                </div>
            </div>

             {/* Actions */}
             <div className="flex gap-4">
                 <button 
                    onClick={randomize}
                    className="flex-1 py-3 bg-[var(--ui-bg)] text-[var(--ui-text)] font-semibold rounded-xl border border-[var(--ui-border)] hover:bg-[var(--ui-surface-hover)] transition-all active:scale-95 flex items-center justify-center gap-2"
                 >
                     <RefreshCw size={18} />
                     Random
                 </button>
                 <div className="flex-1 relative">
                    <button 
                        onClick={handleCopyCss}
                        className="w-full py-3 bg-[var(--ui-accent)] text-[var(--ui-accent-on)] font-semibold rounded-xl hover:bg-[var(--ui-accent-hover)] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-[var(--ui-accent)]/20"
                    >
                        {copyFeedback ? 'Copied!' : 'Copy CSS'}
                        {!copyFeedback && <Copy size={18} />}
                    </button>
                 </div>
             </div>
             
             {stops.length > 2 && (
                 <button 
                    onClick={() => deleteStop(selectedStopId)}
                    className="mt-6 w-full text-red-500 text-xs font-semibold uppercase tracking-widest hover:text-red-600 flex items-center justify-center gap-2 transition-colors"
                 >
                     <Trash2 size={18} />
                     Remove stop
                 </button>
             )}
        </div>

        {/* RIGHT COLUMN: Preview */}
        <div 
            className="rounded-[2.5rem] shadow-2xl border-8 border-[var(--ui-surface)] min-h-[400px] lg:min-h-full relative overflow-hidden group transition-all duration-700 hover:rotate-1"
            style={{ background: currentCss }}
        >
             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             <button className="absolute top-6 right-6 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-2xl text-white transition-all opacity-0 group-hover:opacity-100 active:scale-90 shadow-xl">
                <Maximize2 size={20} />
             </button>
        </div>

      </div>

      {/* Gallery Section */}
      <div className="mt-16">
          <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-3xl font-bold text-[var(--ui-text)] tracking-tighter">Presets</h3>
                <p className="text-[var(--ui-text-muted)] font-medium">Curated collection of modern gradients inspired by uiGradients.</p>
              </div>
              <p className="text-[10px] font-semibold text-[var(--ui-text-muted)] uppercase tracking-widest bg-[var(--ui-surface)] px-3 py-1 rounded-full border border-[var(--ui-border)]">Drag to reorder</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((grad, i) => (
                  <div 
                    key={grad.name} 
                    className={`bg-[var(--ui-surface)] rounded-3xl border border-[var(--ui-border)] shadow-sm transition-all overflow-hidden group 
                        ${dragItem.current === i ? 'opacity-50 scale-95 ring-4 ring-[var(--ui-accent)] ring-offset-4 dark:ring-offset-gray-900' : 'hover:shadow-xl hover:-translate-y-1 hover:border-[var(--ui-text-muted)]'}`}
                    draggable
                    onDragStart={(e) => onSortStart(e, i)}
                    onDragEnter={(e) => onSortEnter(e, i)}
                    onDragEnd={onSortEnd}
                    onDragOver={(e) => e.preventDefault()}
                    style={{ 
                        cursor: 'grab', 
                        viewTransitionName: `grad-${grad.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}` 
                    } as any}
                  >
                      <div 
                        className="h-40 w-full relative active:cursor-grabbing"
                        style={{ background: generateCss(grad.stops, grad.rotation, grad.type) }}
                        onClick={() => loadGradient(grad)}
                      >
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                               <span className="bg-white text-gray-950 px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl pointer-events-none scale-90 group-hover:scale-100 transition-transform">
                                   Load
                               </span>
                           </div>
                      </div>
                      <div className="p-5 flex items-center justify-between bg-[var(--ui-surface)]">
                          <div className="flex items-center gap-3">
                              <GripVertical size={20} className="text-[var(--ui-text-muted)] cursor-grab active:cursor-grabbing opacity-50" />
                              <span className="font-semibold text-[var(--ui-text)] tracking-tight">{grad.name}</span>
                          </div>
                          <div className="flex gap-1 relative">
                             <button 
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(grad.name); }}
                                className={`p-2 transition-colors rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 ${favorites.includes(grad.name) ? 'text-red-500' : 'text-[var(--ui-text-muted)] hover:text-red-500'}`}
                             >
                                 <Heart size={20} fill={favorites.includes(grad.name) ? "currentColor" : "none"} />
                             </button>
                             <button 
                                onClick={(e) => { e.stopPropagation(); setShowMoreMenu(showMoreMenu === grad.name ? null : grad.name); }}
                                className="p-2 text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] transition-colors rounded-xl hover:bg-[var(--ui-bg)]"
                             >
                                 <MoreHorizontal size={20} />
                             </button>

                             {showMoreMenu === grad.name && (
                                <div className="absolute right-0 bottom-full mb-2 w-40 bg-[var(--ui-surface)] border border-[var(--ui-border)] rounded-xl shadow-2xl z-20 py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                    <button 
                                        onClick={() => duplicateGradient(grad)}
                                        className="w-full text-left px-4 py-2 text-sm font-semibold text-[var(--ui-text)] hover:bg-[var(--ui-bg)] flex items-center gap-2"
                                    >
                                        <Copy size={16} />
                                        Duplicate
                                    </button>
                                    <button 
                                        onClick={() => deleteGradient(grad.name)}
                                        className="w-full text-left px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                             )}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
          <div className="flex justify-center mt-12">
              <button className="px-8 py-3 bg-[var(--ui-surface)] hover:bg-[var(--ui-surface-hover)] text-[var(--ui-text)] font-semibold rounded-2xl border border-[var(--ui-border)] transition-all active:scale-95 shadow-sm uppercase tracking-widest text-xs flex items-center gap-2">
                  <Sparkles size={16} />
                  Browse all gradients
              </button>
          </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
