
import React from 'react';
import { 
  Users, 
  Bell, 
  Download, 
  Twitter, 
  Instagram, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';

const BLUE_SCALE = [
    { step: 50, hex: '#F0F7FF' },
    { step: 100, hex: '#E0F0FF' },
    { step: 200, hex: '#B8DBFF' },
    { step: 300, hex: '#85C2FF' },
    { step: 400, hex: '#4D9DFF' },
    { step: 500, hex: '#0066FF' }, // Primary
    { step: 600, hex: '#0052CC' },
    { step: 700, hex: '#003D99' },
    { step: 800, hex: '#002966' },
    { step: 900, hex: '#001433' },
    { step: 950, hex: '#000A1A' },
];

const TailwindPalette: React.FC = () => {
    return (
        <div className="font-sans text-[var(--ui-text)] min-h-screen bg-[var(--ui-bg)] -m-4 md:-m-8 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* 1. Header Area */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-[var(--ui-text)] mb-1">Tailwind Colours</h1>
                    <p className="text-[var(--ui-text-muted)] font-medium">Create, preview and export your Tailwind CSS palette</p>
                </div>
                
                <nav className="flex items-center gap-6 text-sm font-medium text-[var(--ui-text-muted)] overflow-x-auto pb-2 md:pb-0">
                    <a href="#" className="hover:text-[var(--ui-accent)] transition-colors whitespace-nowrap">Generate</a>
                    <a href="#" className="hover:text-[var(--ui-accent)] transition-colors whitespace-nowrap">Palettes</a>
                    <a href="#" className="hover:text-[var(--ui-accent)] transition-colors whitespace-nowrap">Contrast checker</a>
                    <a href="#" className="hover:text-[var(--ui-accent)] transition-colors whitespace-nowrap">Visualiser</a>
                    <a href="#" className="hover:text-[var(--ui-accent)] transition-colors whitespace-nowrap">Colour picker</a>
                    <a href="#" className="text-[var(--ui-accent)] bg-[var(--ui-accent-faint)] px-3 py-1.5 rounded-full whitespace-nowrap">Tailwind Colours</a>
                </nav>
            </header>

            {/* 2. Main Palette Section */}
            <section className="bg-[var(--ui-surface)] rounded-2xl shadow-sm border border-[var(--ui-border)] p-8 mb-12 relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--ui-text)]">Palette 1 – Digital Blue</h2>
                        <p className="text-[var(--ui-text-muted)] mt-1">Primary Brand Scale</p>
                    </div>
                    
                    {/* Visual Toggle */}
                    <div className="flex bg-[var(--ui-bg)] p-1 rounded-lg border border-[var(--ui-border)]">
                        <div className="bg-[var(--ui-surface)] shadow-sm px-3 py-1.5 rounded-md text-xs font-semibold text-[var(--ui-text)] cursor-default">Light</div>
                        <div className="px-3 py-1.5 rounded-md text-xs font-semibold text-[var(--ui-text-muted)] cursor-default">Dark</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4">
                    {BLUE_SCALE.map((swatch) => (
                        <div key={swatch.step} className="flex flex-col group cursor-pointer">
                            <div 
                                className={`h-16 w-full rounded-lg shadow-inner mb-3 transition-transform group-hover:scale-105 ${swatch.step === 500 ? 'ring-2 ring-offset-2 ring-[var(--ui-accent)]' : ''}`}
                                style={{ backgroundColor: swatch.hex }}
                            ></div>
                            <div className="flex flex-col px-1">
                                <span className={`text-sm font-bold ${swatch.step === 500 ? 'text-[var(--ui-accent)]' : 'text-[var(--ui-text)]'}`}>
                                    {swatch.step}
                                </span>
                                <span className="text-xs text-[var(--ui-text-muted)] uppercase font-mono mt-0.5">{swatch.hex.replace('#', '')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Example UI Preview Area */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[var(--ui-text)]">Interface Preview</h3>
                    <span className="text-sm text-[var(--ui-text-muted)]">Mockup generated using Palette 1</span>
                </div>

                <div className="bg-[var(--ui-bg)] border border-[var(--ui-border)] rounded-3xl p-8 lg:p-12 shadow-inner">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Column 1: Dashboard & Nav */}
                        <div className="space-y-6">
                            {/* Nav Card */}
                            <div className="bg-[var(--ui-surface)] p-6 rounded-2xl shadow-sm border border-[var(--ui-border)]">
                                <h4 className="text-xs font-bold text-[var(--ui-text-muted)] uppercase tracking-wider mb-4">Settings</h4>
                                <ul className="space-y-1">
                                    <li className="flex items-center gap-3 p-2 rounded-lg bg-[var(--ui-accent-faint)] text-[var(--ui-accent)] font-medium text-sm cursor-pointer">
                                        <Users size={18} strokeWidth={1.5} />
                                        Manage team access
                                    </li>
                                    <li className="flex items-center gap-3 p-2 rounded-lg text-[var(--ui-text-muted)] hover:bg-[var(--ui-surface-hover)] hover:text-[var(--ui-text)] font-medium text-sm transition-colors cursor-pointer">
                                        <Bell size={18} strokeWidth={1.5} />
                                        Notification settings
                                    </li>
                                    <li className="flex items-center gap-3 p-2 rounded-lg text-[var(--ui-text-muted)] hover:bg-[var(--ui-surface-hover)] hover:text-[var(--ui-text)] font-medium text-sm transition-colors cursor-pointer">
                                        <Download size={18} strokeWidth={1.5} />
                                        Download reports
                                    </li>
                                </ul>
                            </div>

                            {/* Stats Card */}
                            <div className="bg-[var(--ui-surface)] p-6 rounded-2xl shadow-sm border border-[var(--ui-border)]">
                                <h4 className="text-xs font-bold text-[var(--ui-text-muted)] uppercase tracking-wider mb-4">Performance</h4>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-[var(--ui-text-muted)] mb-1">Total Subscribers</div>
                                        <div className="flex items-end gap-2">
                                            <span className="text-2xl font-bold text-[var(--ui-text)]">24.8k</span>
                                            <span className="text-xs font-bold text-[var(--ui-accent)] bg-[var(--ui-accent-faint)] px-1.5 py-0.5 rounded mb-1">+12%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-[var(--ui-text-muted)] mb-1">Avg. Open Rate</div>
                                        <div className="flex items-end gap-2">
                                            <span className="text-2xl font-bold text-[var(--ui-text)]">58.3%</span>
                                            <span className="text-xs font-bold text-[var(--ui-accent)] bg-[var(--ui-accent-faint)] px-1.5 py-0.5 rounded mb-1">+2.4%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Hero & Pills */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Hero Card */}
                            <div className="bg-[var(--ui-surface)] rounded-2xl shadow-sm border border-[var(--ui-border)] overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--ui-accent)] opacity-5 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
                                <div className="p-8 relative z-10">
                                    <span className="inline-block px-3 py-1 rounded-full bg-[var(--ui-accent)] text-[var(--ui-accent-on)] text-xs font-bold mb-4">NEW FEATURE</span>
                                    <h2 className="text-3xl font-extrabold text-[var(--ui-text)] mb-4 leading-tight tracking-tight">Increase your revenue <br/> by <span className="text-[var(--ui-accent)]">3x</span> using Analytics.</h2>
                                    <p className="text-[var(--ui-text-muted)] mb-8 max-w-md leading-relaxed">Unlock powerful insights with our new dashboard tools designed for modern SaaS companies.</p>
                                    <div className="flex gap-4">
                                        <button className="bg-[var(--ui-accent)] text-[var(--ui-accent-on)] px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-[var(--ui-accent)]/20 active:scale-95 flex items-center gap-2">
                                            Start growing
                                            <ArrowRight size={16} strokeWidth={1.5} />
                                        </button>
                                        <button className="text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] px-6 py-3 rounded-lg font-bold text-sm hover:bg-[var(--ui-surface-hover)] transition-all active:scale-95">
                                            Learn more
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Categories Grid */}
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['Grocery Stores', 'Restaurants', 'Utilities', 'Sport'].map((cat, i) => (
                                    <div key={i} className={`text-center py-3 px-2 rounded-xl border text-sm font-bold transition-all cursor-pointer active:scale-95
                                        ${i === 0 ? 'bg-[var(--ui-accent)] border-[var(--ui-accent)] text-[var(--ui-accent-on)] shadow-lg shadow-[var(--ui-accent)]/20' : 'bg-[var(--ui-surface)] border-[var(--ui-border)] text-[var(--ui-text-muted)] hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]'}`}>
                                        {cat}
                                    </div>
                                ))}
                            </div>

                             {/* Pricing Cards */}
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: 'Individual', price: '£0', desc: 'Forever free', btn: 'Get started', primary: false },
                                    { title: 'Team', price: '£49', desc: 'Per month', btn: 'Start trial', primary: true },
                                    { title: 'Enterprise', price: 'Custom', desc: 'Contact sales', btn: 'Contact us', primary: false }
                                ].map((plan, i) => (
                                    <div key={i} className={`p-5 rounded-2xl border flex flex-col items-start transition-all hover:shadow-md ${plan.primary ? 'bg-[var(--ui-text)] border-[var(--ui-text)] text-[var(--ui-bg)]' : 'bg-[var(--ui-surface)] border-[var(--ui-border)] text-[var(--ui-text)]'}`}>
                                        <h5 className={`text-sm font-bold mb-2 ${plan.primary ? 'opacity-70' : 'text-[var(--ui-text-muted)]'}`}>{plan.title}</h5>
                                        <div className="text-2xl font-black mb-1 tracking-tight">{plan.price}</div>
                                        <div className={`text-xs mb-6 ${plan.primary ? 'opacity-60' : 'text-[var(--ui-text-muted)]'}`}>{plan.desc}</div>
                                        <button className={`w-full py-2 rounded-lg text-xs font-bold transition-all mt-auto active:scale-95
                                            ${plan.primary ? 'bg-[var(--ui-accent)] text-[var(--ui-accent-on)] hover:opacity-90' : 'bg-[var(--ui-bg)] text-[var(--ui-text)] border border-[var(--ui-border)] hover:bg-[var(--ui-surface-hover)]'}`}>
                                            {plan.btn}
                                        </button>
                                    </div>
                                ))}
                             </div>
                        </div>

                    </div>
                    
                    {/* Bottom Row: Tickets & Calendar */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                         {/* Tickets List */}
                         <div className="bg-[var(--ui-surface)] p-6 rounded-2xl shadow-sm border border-[var(--ui-border)]">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="font-bold text-[var(--ui-text)]">Recent Tickets</h4>
                                <span className="text-xs text-[var(--ui-accent)] font-bold cursor-pointer hover:underline">View all</span>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'Sarah M.', status: 'Open', time: '2m ago' },
                                    { name: 'Alex D.', status: 'Pending', time: '15m ago' },
                                    { name: 'James W.', status: 'Resolved', time: '1h ago' },
                                ].map((ticket, i) => (
                                    <div key={i} className="flex items-center justify-between pb-4 border-b border-[var(--ui-border)] last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[var(--ui-bg)] flex items-center justify-center text-xs font-bold text-[var(--ui-text-muted)] border border-[var(--ui-border)]">
                                                {ticket.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-[var(--ui-text)]">{ticket.name}</div>
                                                <div className="text-xs text-[var(--ui-text-muted)]">Login issue</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1
                                                ${ticket.status === 'Open' ? 'bg-[var(--ui-accent-faint)] text-[var(--ui-accent)]' : 
                                                  ticket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                {ticket.status}
                                             </span>
                                             <span className="text-[10px] text-[var(--ui-text-muted)]">{ticket.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>

                         {/* Calendar Widget */}
                         <div className="bg-[var(--ui-surface)] p-6 rounded-2xl shadow-sm border border-[var(--ui-border)] flex gap-6 overflow-hidden">
                             <div className="flex-1">
                                <h4 className="font-bold text-[var(--ui-text)] mb-4">October 2024</h4>
                                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[var(--ui-text-muted)] mb-2">
                                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-[var(--ui-text)]">
                                    {/* Mock Calendar Grid */}
                                    <span className="opacity-20">29</span><span className="opacity-20">30</span>
                                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                                    <span>6</span><span>7</span><span className="bg-[var(--ui-accent)] text-[var(--ui-accent-on)] rounded-full font-bold">8</span><span>9</span><span>10</span><span>11</span><span>12</span>
                                    <span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span>
                                </div>
                             </div>
                             <div className="w-px bg-[var(--ui-border)]"></div>
                             <div className="flex-1 space-y-4">
                                <h5 className="text-xs font-bold text-[var(--ui-text-muted)] uppercase tracking-wider">Up Next</h5>
                                <div className="border-l-2 border-[var(--ui-accent)] pl-3">
                                    <div className="text-xs font-bold text-[var(--ui-text)]">Design Sync</div>
                                    <div className="text-[10px] text-[var(--ui-text-muted)]">10:00 - 11:00 AM</div>
                                </div>
                                <div className="border-l-2 border-purple-500 pl-3">
                                    <div className="text-xs font-bold text-[var(--ui-text)]">Product Review</div>
                                    <div className="text-[10px] text-[var(--ui-text-muted)]">01:30 - 02:30 PM</div>
                                </div>
                             </div>
                         </div>
                    </div>
                </div>
            </section>

            {/* 4. Footer Area */}
            <footer className="mt-20 border-t border-[var(--ui-border)] pt-12 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <span className="text-xl font-black tracking-tighter text-[var(--ui-text)]">Tailwind Colours</span>
                    </div>
                    <div>
                        <h6 className="font-bold text-[var(--ui-text)] text-sm mb-4 uppercase tracking-widest">Tools</h6>
                        <ul className="space-y-2 text-sm text-[var(--ui-text-muted)]">
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">Palette Generator</a></li>
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">Gradient Maker</a></li>
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">Contrast Check</a></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="font-bold text-[var(--ui-text)] text-sm mb-4 uppercase tracking-widest">Discover</h6>
                        <ul className="space-y-2 text-sm text-[var(--ui-text-muted)]">
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">Trending Palettes</a></li>
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">Design Systems</a></li>
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">Blog</a></li>
                        </ul>
                    </div>
                     <div>
                        <h6 className="font-bold text-[var(--ui-text)] text-sm mb-4 uppercase tracking-widest">Apps</h6>
                        <ul className="space-y-2 text-sm text-[var(--ui-text-muted)]">
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">iOS App</a></li>
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">Figma Plugin</a></li>
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">VS Code Extension</a></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="font-bold text-[var(--ui-text)] text-sm mb-4 uppercase tracking-widest">Company</h6>
                        <ul className="space-y-2 text-sm text-[var(--ui-text-muted)]">
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-[var(--ui-accent)] transition-colors">Privacy</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--ui-border)]">
                    <p className="text-[var(--ui-text-muted)] text-sm mb-4 md:mb-0">© Tailwind Colours Project. Let’s make something cool!</p>
                    <div className="flex gap-4">
                        <span className="w-8 h-8 rounded-full bg-[var(--ui-surface)] border border-[var(--ui-border)] text-[var(--ui-text-muted)] flex items-center justify-center cursor-pointer hover:bg-[var(--ui-accent)] hover:text-[var(--ui-accent-on)] transition-colors">
                            <Twitter size={16} strokeWidth={1.5} />
                        </span>
                        <span className="w-8 h-8 rounded-full bg-[var(--ui-surface)] border border-[var(--ui-border)] text-[var(--ui-text-muted)] flex items-center justify-center cursor-pointer hover:bg-[var(--ui-accent)] hover:text-[var(--ui-accent-on)] transition-colors">
                            <Instagram size={16} strokeWidth={1.5} />
                        </span>
                        <span className="w-8 h-8 rounded-full bg-[var(--ui-surface)] border border-[var(--ui-border)] text-[var(--ui-text-muted)] flex items-center justify-center cursor-pointer hover:bg-[var(--ui-accent)] hover:text-[var(--ui-accent-on)] transition-colors">
                            <ExternalLink size={16} strokeWidth={1.5} />
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TailwindPalette;
