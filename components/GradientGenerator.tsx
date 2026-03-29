import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  Sparkles,
  Palette,
  Zap,
  Code,
  Layout,
  Layers,
  MousePointer2
} from 'lucide-react';

interface GradientGeneratorProps {
  savedGradients: GradientToken[];
  onSave: (gradient: GradientToken) => void;
}

// Ultra-Premium Preset Gradients
const PRESET_GRADIENTS: GradientToken[] = [
    {
      name: 'Cyber Neon',
      type: 'linear',
      rotation: 135,
      stops: [ { id: 's1', colour: '#00F260', position: 0 }, { id: 's2', colour: '#0575E6', position: 100 } ]
    },
    {
      name: 'Ethereal Mist',
      type: 'linear',
      rotation: 45,
      stops: [ { id: 's1', colour: '#E0EAFC', position: 0 }, { id: 's2', colour: '#CFDEF3', position: 100 } ]
    },
    {
      name: 'Infrared Pulse',
      type: 'linear',
      rotation: 90,
      stops: [ { id: 's1', colour: '#8E2DE2', position: 0 }, { id: 's2', colour: '#4A00E0', position: 100 } ]
    },
    {
      name: 'Solar Flare',
      type: 'linear',
      rotation: 180,
      stops: [ { id: 's1', colour: '#FDC830', position: 0 }, { id: 's2', colour: '#F37335', position: 100 } ]
    },
    {
      name: 'Deep Oceanic',
      type: 'linear',
      rotation: 225,
      stops: [ { id: 's1', colour: '#2b5876', position: 0 }, { id: 's2', colour: '#4e4376', position: 100 } ]
    },
    {
      name: 'Lush Mint',
      type: 'linear',
      rotation: 0,
      stops: [ { id: 's1', colour: '#11998e', position: 0 }, { id: 's2', colour: '#38ef7d', position: 100 } ]
    }
];

// Circular Angle Picker Component
const AnglePicker: React.FC<{ angle: number, onChange: (angle: number) => void }> = ({ angle, onChange }) => {
    const dialRef = useRef<HTMLDivElement>(null);

    const handleInteraction = (clientX: number, clientY: number) => {
        if (!dialRef.current) return;
        const rect = dialRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = clientX - centerX;
        const y = clientY - centerY;
        let deg = Math.atan2(y, x) * (180 / Math.PI) + 90;
        if (deg < 0) deg += 360;
        onChange(Math.round(deg / 15) * 15); // Snap to 15 degrees
    };

    const onMouseDown = (e: React.MouseEvent) => {
        handleInteraction(e.clientX, e.clientY);
        const handleMouseMove = (mm: MouseEvent) => handleInteraction(mm.clientX, mm.clientY);
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div 
            ref={dialRef}
            onMouseDown={onMouseDown}
            className="w-32 h-32 rounded-full bg-black/40 border border-white/5 relative flex items-center justify-center cursor-crosshair group shadow-inner"
        >
            {/* Degree Marks */}
            {Array.from({ length: 8 }).map((_, i) => (
                <div 
                    key={i} 
                    className="absolute w-0.5 h-2 bg-white/10 rounded-full" 
                    style={{ transform: `rotate(${i * 45}deg) translateY(-54px)` }}
                />
            ))}
            
            {/* Center Pointer */}
            <div 
                className="absolute w-1 h-14 bg-gradient-to-t from-[var(--ui-accent)] to-transparent rounded-full origin-bottom bottom-1/2 transition-transform duration-200 ease-out"
                style={{ transform: `rotate(${angle}deg)` }}
            />
            
            {/* Handle */}
            <div 
                className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-[var(--ui-accent)] transition-all duration-200"
                style={{ transform: `rotate(${angle - 90}deg) translateX(48px)` }}
            />

            <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/10 transition-colors" />
            
            <div className="absolute bottom-6 text-[10px] font-black text-white/40 uppercase tracking-widest">
                {angle}°
            </div>
        </div>
    );
};

const GradientGenerator: React.FC<GradientGeneratorProps> = ({ savedGradients, onSave }) => {
  // --- State ---
  const [stops, setStops] = useState<GradientStop[]>([
    { id: '1', colour: '#D4145A', position: 0 },
    { id: '2', colour: '#FBB03B', position: 100 }
  ]);
  const [rotation, setRotation] = useState(135);
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [selectedStopId, setSelectedStopId] = useState<string>('1');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [gallery, setGallery] = useState<GradientToken[]>(PRESET_GRADIENTS);

  const sliderRef = useRef<HTMLDivElement>(null);

  const selectedStop = useMemo(() => 
    stops.find(s => s.id === selectedStopId) || stops[0]
  , [stops, selectedStopId]);

  // --- Logic ---
  const generateCss = (currentStops: GradientStop[], angle: number, gradType: 'linear' | 'radial') => {
    const sorted = [...currentStops].sort((a, b) => a.position - b.position);
    const stopStr = sorted.map(s => `${s.colour} ${s.position}%`).join(', ');
    return gradType === 'linear' ? `linear-gradient(${angle}deg, ${stopStr})` : `radial-gradient(circle, ${stopStr})`;
  };

  const handleSliderClick = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const newId = Date.now().toString();
    setStops([...stops, { id: newId, colour: '#ffffff', position: pos }]);
    setSelectedStopId(newId);
  };

  const updateStop = (id: string, updates: Partial<GradientStop>) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleCopy = (mode: 'css' | 'tailwind') => {
    const css = generateCss(stops, rotation, type);
    const text = mode === 'css' ? `background: ${css};` : `bg-[${css}]`;
    navigator.clipboard.writeText(text);
    setCopyFeedback(mode);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const randomize = () => {
    const rand = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setStops([
        { id: Date.now() + 'a', colour: rand(), position: 0 },
        { id: Date.now() + 'b', colour: rand(), position: 100 }
    ]);
    setRotation(Math.floor(Math.random() * 360));
  };

  const currentCss = generateCss(stops, rotation, type);

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ui-accent-faint)] border border-[var(--ui-accent)]/20">
                <Layers className="text-[var(--ui-accent)]" size={12} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--ui-accent)]">Dynamic Assets</span>
            </div>
            <h2 className="text-6xl font-black text-white tracking-tightest uppercase italic leading-none">Hyper-Gradient <span className="text-[var(--ui-accent)]">Lab</span></h2>
            <p className="text-sm font-medium text-white/30 uppercase tracking-widest max-w-xl">Architect multi-dimensional atmospheric tokens with industrial precision.</p>
        </div>
        
        <div className="flex bg-black/40 p-2 rounded-[24px] border border-white/5 backdrop-blur-xl">
             <button 
                onClick={() => setType('linear')}
                className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${type === 'linear' ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'}`}
             >
                 Linear
             </button>
             <button 
                onClick={() => setType('radial')}
                className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${type === 'radial' ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'}`}
             >
                 Radial
             </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Configuration Panel */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
            <div className="glass-premium p-10 rounded-[50px] border-white/10 shadow-3xl space-y-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Zap size={120} />
                </div>

                {/* Gradient Track */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Atmosphere Track</label>
                        <span className="text-[9px] font-bold text-[var(--ui-accent)] uppercase tracking-widest bg-[var(--ui-accent-faint)] px-2 py-0.5 rounded-md">
                            {stops.length} STOPS
                        </span>
                    </div>
                    
                    <div className="relative pt-10 pb-4">
                        <div 
                            ref={sliderRef}
                            onClick={handleSliderClick}
                            className="h-16 rounded-[28px] relative cursor-pointer shadow-inner border border-white/10 overflow-visible transition-transform hover:scale-[1.01]"
                            style={{ background: currentCss }}
                        >
                            {stops.map(stop => (
                                <button
                                    key={stop.id}
                                    onClick={(e) => { e.stopPropagation(); setSelectedStopId(stop.id); }}
                                    className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 shadow-3xl transition-all duration-300 group
                                        ${selectedStopId === stop.id ? 'border-white scale-125 z-20 ring-4 ring-[var(--ui-accent)]/30' : 'border-white/20 hover:scale-110 hover:border-white/50'}`}
                                    style={{ left: `calc(${stop.position}% - 20px)`, backgroundColor: stop.colour }}
                                >
                                    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 text-[8px] font-black text-white opacity-0 group-hover:opacity-60 transition-opacity">
                                        {stop.position}%
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-[9px] text-center font-bold text-white/20 uppercase tracking-widest italic pt-2">Click track to inject a new color stop</p>
                </div>

                {/* Config Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                        <div className="space-y-4">
                             <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Vector Projection</label>
                             <div className="flex justify-center py-4">
                                <AnglePicker angle={rotation} onChange={setRotation} />
                             </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Stop refinement</label>
                            <div className="bg-black/40 p-6 rounded-[32px] border border-white/5 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[9px] font-black text-white/30 uppercase tracking-widest">
                                        <span>Value</span>
                                        <span>{selectedStop.colour.toUpperCase()}</span>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                                        <div className="w-8 h-8 rounded-xl relative overflow-hidden border border-white/10 shadow-inner group">
                                            <input 
                                                type="color" 
                                                value={selectedStop.colour}
                                                title="Pick color"
                                                onChange={(e) => updateStop(selectedStop.id, { colour: e.target.value })}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer scale-150"
                                            />
                                            <div className="w-full h-full" style={{ backgroundColor: selectedStop.colour }} />
                                        </div>
                                        <input 
                                            type="text" 
                                            title="Hex value"
                                            value={selectedStop.colour.toUpperCase()}
                                            onChange={(e) => updateStop(selectedStop.id, { colour: e.target.value })}
                                            className="bg-transparent border-none text-white font-black text-lg focus:ring-0 outline-none w-full"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-[9px] font-black text-white/30 uppercase tracking-widest">
                                        <span>Position</span>
                                        <span>{selectedStop.position}%</span>
                                    </div>
                                    <input 
                                        type="range" min="0" max="100"
                                        value={selectedStop.position}
                                        title="Position percentage"
                                        onChange={(e) => updateStop(selectedStop.id, { position: Number(e.target.value) })}
                                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[var(--ui-accent)]"
                                    />
                                </div>
                                
                                <button
                                    onClick={() => {
                                        if (stops.length > 2) setStops(stops.filter(s => s.id !== selectedStopId));
                                    }}
                                    title="Remove stop"
                                    className="w-full py-3 bg-red-500/5 hover:bg-red-500/10 text-red-500/40 hover:text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                                >
                                    Purge Stop
                                </button>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Output Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button 
                        onClick={randomize}
                        title="Randomize gradient"
                        className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-black rounded-[24px] border border-white/5 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-[10px]"
                    >
                        <RefreshCw size={14} />
                        Entropy Sync
                    </button>
                    <button 
                         onClick={() => handleCopy('css')}
                         title="Copy CSS snippet"
                         className="flex-1 py-5 bg-white text-black font-black rounded-[24px] transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-white/20"
                    >
                        {copyFeedback === 'css' ? 'Copied Static' : 'Generate CSS'}
                        {!copyFeedback && <Code size={14} />}
                    </button>
                    <button 
                         onClick={() => handleCopy('tailwind')}
                         title="Copy Tailwind class"
                         className="flex-1 py-5 bg-[var(--ui-accent)] text-[var(--ui-accent-on)] font-black rounded-[24px] transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-[10px] shadow-2xl hover:bg-[var(--ui-accent-hover)]"
                    >
                        {copyFeedback === 'tailwind' ? 'Copied Component' : 'Generate Utility'}
                        {!copyFeedback && <Zap size={14} />}
                    </button>
                </div>
            </div>
        </div>

        {/* Live Preview / High-Fidelity Rendering */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-8">
            <div 
                className="w-full h-full min-h-[600px] rounded-[60px] shadow-4xl border-[16px] border-black/40 relative overflow-hidden group transition-all duration-1000 hover:scale-[1.01] flex items-center justify-center"
                 style={{ background: currentCss }}
            >
                {/* Background Atmosphere */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute top-10 right-10 flex gap-4 opacity-0 group-hover:opacity-100 transition-all translate-x-10 group-hover:translate-x-0 duration-500">
                    <button title="Fullscreen" className="p-4 glass-premium rounded-3xl text-white/40 hover:text-white border-white/10 hover:scale-110 active:scale-90 transition-all">
                        <Maximize2 size={24} />
                    </button>
                    <button title="Layout" className="p-4 glass-premium rounded-3xl text-white/40 hover:text-white border-white/10 hover:scale-110 active:scale-90 transition-all">
                        <Layout size={24} />
                    </button>
                </div>

                {/* Premium Mockup Hero overlay */}
                <div className="glass-premium p-16 rounded-[48px] border-white/20 backdrop-blur-4xl shadow-5xl max-w-[85%] relative overflow-hidden group/hero group-hover:-translate-y-4 transition-all duration-700">
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 blur-[100px] rounded-full group-hover/hero:scale-150 transition-transform duration-1000"></div>
                    <div className="relative text-center space-y-8">
                        <div className="w-20 h-20 rounded-[28px] bg-white text-black flex items-center justify-center mx-auto shadow-2xl rotate-3 group-hover/hero:rotate-0 transition-transform duration-500">
                            <Sparkles size={36} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tightest leading-none uppercase italic">Chroma Zenith</h3>
                            <p className="text-sm font-bold text-white/40 uppercase tracking-[0.3em]">Premium Atmosphere Protocol</p>
                        </div>
                        <div className="flex justify-center gap-6 pt-6">
                            <div className="px-8 py-4 bg-white/10 rounded-2xl border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">Dynamic</div>
                            <div className="px-8 py-4 bg-white/10 rounded-2xl border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">Weightless</div>
                        </div>
                    </div>
                </div>

                {/* Mouse Interaction Indicator */}
                <div className="absolute bottom-10 left-10 flex items-center gap-4 text-white/20">
                     <MousePointer2 size={16} />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Holographic Engine Active</span>
                </div>
            </div>
        </div>

      </div>

      {/* Preset Repository */}
      <section className="pt-20 space-y-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
               <div className="space-y-2">
                    <h3 className="text-4xl font-black text-white tracking-tightest uppercase italic leading-none">The Foundry</h3>
                    <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Reference standard for architectural atmospheres</p>
               </div>
               <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--ui-accent)] animate-pulse" />
                   <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Cloud Sync Active</span>
               </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-2">
                {gallery.map((grad, i) => (
                    <div 
                        key={grad.name}
                        className="glass-premium rounded-[50px] border-white/5 shadow-3xl hover:border-white/20 hover:-translate-y-4 transition-all duration-500 overflow-hidden group relative"
                    >
                         <div 
                            className="h-64 w-full relative cursor-pointer active:scale-95 transition-transform"
                            style={{ background: generateCss(grad.stops, grad.rotation, grad.type) }}
                            onClick={() => {
                                setStops(grad.stops.map(s => ({...s})));
                                setRotation(grad.rotation);
                                setType(grad.type);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                         >
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md flex items-center justify-center">
                                 <div className="px-10 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl scale-90 group-hover:scale-100 transition-all duration-500">
                                     Inject Token
                                 </div>
                            </div>
                         </div>
                         <div className="p-8 flex items-center justify-between bg-black/20 backdrop-blur-xl border-t border-white/5">
                             <div className="space-y-1">
                                 <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">preset-0{i+1}</span>
                                 <h4 className="text-lg font-black text-white uppercase tracking-tightest">{grad.name}</h4>
                             </div>
                             <button 
                                onClick={(e) => { e.stopPropagation(); setFavorites(prev => prev.includes(grad.name) ? prev.filter(f => f !== grad.name) : [...prev, grad.name]); }}
                                className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${favorites.includes(grad.name) ? 'bg-red-500/10 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-white/5 text-white/20 hover:bg-white/10 hover:text-white border border-white/5'}`}
                             >
                                 <Heart size={20} fill={favorites.includes(grad.name) ? "currentColor" : "none"} />
                             </button>
                         </div>
                    </div>
                ))}
           </div>
           
           <div className="flex justify-center pt-16 pb-24">
                <button className="px-16 py-6 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/40 uppercase tracking-[0.4em] hover:bg-white/10 hover:text-white transition-all active:scale-95 group shadow-4xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    Browse Eternal Depository
                </button>
           </div>
      </section>
    </div>
  );
};

export default GradientGenerator;
