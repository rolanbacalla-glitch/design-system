import React from 'react';

const FlyonUIExamples: React.FC = () => {
    return (
    <div className="space-y-16 pb-32 animate-in fade-in zoom-in-95 duration-700">
      <header className="space-y-4">
        <h1 className="text-5xl font-black text-white tracking-tightest uppercase italic">The Armory</h1>
        <p className="text-xs font-bold text-white/30 uppercase tracking-widest max-w-2xl leading-relaxed">
            Manifesting atomic components through the lens of atmospheric weightlessness. Powered by FlyonUI and the next generation of Tailwind.
        </p>
      </header>

            {/* Buttons Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4 px-2">
                    <span className="material-symbols-outlined text-[var(--ui-accent)] text-3xl">radio_button_checked</span>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tightest italic">Trigger Tokens</h2>
                </div>
                <div className="glass-premium p-12 rounded-[40px] border-white/5 shadow-2xl space-y-10">
                    <div className="flex flex-wrap gap-6 items-center">
                        <button className="btn btn-primary rounded-2xl px-8 h-14 font-black uppercase tracking-widest text-[10px] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">Primary Action</button>
                        <button className="btn btn-secondary rounded-2xl px-8 h-14 font-black uppercase tracking-widest text-[10px] transition-all">Secondary Envoy</button>
                        <button className="btn btn-accent rounded-2xl px-8 h-14 font-black uppercase tracking-widest text-[10px] transition-all">Accent Flux</button>
                        <button className="btn btn-ghost rounded-2xl px-8 h-14 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">Invisible</button>
                    </div>
                    <div className="flex flex-wrap gap-6 items-center">
                        <button className="btn btn-outline btn-primary rounded-2xl px-8 h-14 font-black uppercase tracking-widest text-[10px] border-2 transition-all">Outline Primary</button>
                        <button className="btn btn-soft btn-secondary rounded-2xl px-8 h-14 font-black uppercase tracking-widest text-[10px] transition-all">Soft Diffusion</button>
                        <button className="btn btn-square btn-primary rounded-2xl w-14 h-14">
                             <span className="material-symbols-outlined">add</span>
                        </button>
                        <button className="btn btn-circle btn-accent w-14 h-14">
                             <span className="material-symbols-outlined">bolt</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Badges Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4 px-2">
                    <span className="material-symbols-outlined text-[var(--ui-accent)] text-3xl">label</span>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tightest italic">Status Arrays</h2>
                </div>
                <div className="glass-premium p-12 rounded-[40px] border-white/5 shadow-2xl flex flex-wrap gap-12 items-center">
                    <div className="flex gap-4">
                        <span className="badge badge-primary rounded-lg font-black uppercase tracking-widest text-[8px] px-3 py-4 border-none">Active</span>
                        <span className="badge badge-secondary rounded-lg font-black uppercase tracking-widest text-[8px] px-3 py-4 border-none">Standby</span>
                        <span className="badge badge-accent rounded-lg font-black uppercase tracking-widest text-[8px] px-3 py-4 border-none">Flux</span>
                        <span className="badge badge-outline rounded-lg font-black uppercase tracking-widest text-[8px] px-3 py-4 border-white/20">Archived</span>
                    </div>

                    <div className="flex gap-10">
                        <div className="indicator">
                            <span className="indicator-item badge badge-secondary h-6 min-w-6 p-0 font-black text-[10px] border-2 border-[#090b0e]">9</span>
                            <div className="grid w-16 h-16 glass-premium border-white/10 text-white/40 place-items-center rounded-2xl hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">mail</span>
                            </div>
                        </div>
                        <div className="indicator">
                            <span className="indicator-item indicator-bottom indicator-end badge badge-primary h-6 px-3 font-black text-[8px] uppercase tracking-widest border-2 border-[#090b0e]">Live</span>
                            <div className="grid w-16 h-16 glass-premium border-white/10 text-white/40 place-items-center rounded-2xl hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">notifications</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cards Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4 px-2">
                    <span className="material-symbols-outlined text-[var(--ui-accent)] text-3xl">dashboard</span>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tightest italic">Surface Modules</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="glass-premium rounded-[48px] border-white/5 shadow-2xl overflow-hidden group hover:border-white/20 transition-all duration-500">
                        <figure className="h-64 bg-black/40 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--ui-accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <span className="material-symbols-outlined text-7xl text-white/5 translate-y-4 group-hover:translate-y-0 group-hover:text-white/20 transition-all duration-700">architecture</span>
                        </figure>
                        <div className="p-10 space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tightest italic">Manifest Architecture</h2>
                                <p className="text-xs font-bold text-white/30 uppercase tracking-widest leading-relaxed">Structural integrity met with atmospheric aesthetics. FlyonUI modules adapt to the foundational design system.</p>
                            </div>
                            <div className="flex justify-end pt-4">
                                <button className="btn btn-primary rounded-2xl px-10 h-14 font-black uppercase tracking-widest text-[10px] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">Execute Routine</button>
                            </div>
                        </div>
                    </div>

                    <div className="glass-premium rounded-[48px] border border-white/10 shadow-2xl p-1 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ui-accent)] to-[#4f46e5] opacity-80" />
                         <div className="relative bg-[#090b0e]/40 backdrop-blur-3xl rounded-[44px] h-full p-10 flex flex-col justify-between space-y-8">
                            <div className="space-y-4 text-center py-6">
                                <div className="w-20 h-20 bg-white/10 rounded-3xl mx-auto flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    <span className="material-symbols-outlined text-4xl text-white">diamond</span>
                                </div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tightest italic">
                                    Atmospheric Grade
                                </h2>
                                <p className="text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed px-4">
                                    Elevated surfaces utilizing the latest glassmorphism techniques for high-end digital environments.
                                </p>
                            </div>
                            <button className="w-full h-16 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-[24px] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all active:scale-[0.98]">Initialize Sequence</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inputs Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4 px-2">
                    <span className="material-symbols-outlined text-[var(--ui-accent)] text-3xl">input</span>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tightest italic">Input Shards</h2>
                </div>
                <div className="glass-premium p-12 rounded-[40px] border-white/5 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Source Identifier</label>
                            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl group hover:border-white/20 focus-within:border-[var(--ui-accent)] transition-all">
                                <input type="text" title="Name input" placeholder="ENTER IDENTIFIER" className="w-full text-lg font-black text-white focus:outline-none bg-transparent tracking-tighter placeholder:text-white/10" />
                            </div>
                        </div>
                        <div className="space-y-3">
                             <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Universal Search</label>
                            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl group hover:border-white/10 focus-within:border-[var(--ui-accent)] transition-all flex items-center gap-4">
                                <span className="material-symbols-outlined text-white/20 group-hover:text-white/60 transition-colors">search</span>
                                <input type="text" title="Search input" placeholder="GLOBAL PROBE..." className="w-full text-lg font-black text-white focus:outline-none bg-transparent tracking-tighter placeholder:text-white/10" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-10">
                        <div className="flex gap-12 pt-4">
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <input type="checkbox" title="Persistence toggle" className="checkbox checkbox-primary w-8 h-8 rounded-xl border-white/10 bg-black/40 checked:bg-white transition-all" defaultChecked />
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Persistence</span>
                            </label>
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <input type="radio" name="radio-demo" title="Protocol option" className="radio radio-primary w-8 h-8 border-white/10 bg-black/40 checked:bg-white transition-all" defaultChecked />
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Protocol A</span>
                            </label>
                        </div>
                        <div className="space-y-4">
                             <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Flux Density</label>
                                <span className="text-xs font-black text-[var(--ui-accent)]">64%</span>
                             </div>
                            <input type="range" title="Flux range" min="0" max="100" defaultValue="64" className="range range-primary h-2 bg-black/40 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6" />
                        </div>
                    </div>
                </div>
            </section>

             {/* Icons Section */}
             <section className="space-y-8">
                <div className="flex items-center gap-4 px-2">
                    <span className="material-symbols-outlined text-[var(--ui-accent)] text-3xl">token</span>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tightest italic">Glyph Registry</h2>
                </div>
                <div className="glass-premium p-12 rounded-[40px] border-white/5 shadow-2xl flex flex-wrap gap-12 justify-between items-center text-5xl">
                    <span className="material-symbols-outlined text-white hover:text-[var(--ui-accent)] transition-colors duration-500 cursor-help">neuroscience</span>
                    <span className="material-symbols-outlined text-white/40 hover:text-white transition-all transform hover:scale-125 duration-500">biotech</span>
                    <span className="material-symbols-outlined text-white/20 animate-spin-slow">settings</span>
                    <span className="material-symbols-outlined text-[var(--ui-accent)] drop-shadow-[0_0_15px_rgba(255,107,0,0.4)]">shield_with_heart</span>
                    <span className="material-symbols-outlined text-white/40 rotate-12 hover:rotate-0 transition-transform duration-700">security_update_good</span>
                    <span className="material-symbols-outlined text-white group-hover:animate-pulse">rocket_launch</span>
                    <span className="material-symbols-outlined text-white/10 hover:text-white border border-white/5 p-4 rounded-2xl transition-all">database</span>
                    <span className="material-symbols-outlined text-white/40 hover:translate-y-[-8px] transition-transform duration-500">architecture</span>
                </div>
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] text-center">
                    Rendered via Google Materials Symbols Registry
                </p>
            </section>
        </div>
    );
};

export default FlyonUIExamples;
