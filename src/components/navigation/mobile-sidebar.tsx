"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { X, House, ChartLine, Cpu, Swatches, Info } from 'phosphor-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const menuItems = [
    { name: 'Dashboard', icon: House, href: '#' },
    { name: 'Analytics', icon: ChartLine, href: '#' },
    { name: 'System', icon: Cpu, href: '#' },
    { name: 'Design', icon: Swatches, href: '#' },
    { name: 'About', icon: Info, href: '#' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside 
        className={cn(
          "fixed top-0 right-0 w-[280px] h-full z-[70] transition-transform duration-500 ease-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <GlassCard variant="quartz" className="h-full rounded-none border-l border-white/20 p-8 flex flex-col pt-20">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-foreground/60"
          >
            <X size={24} weight="bold" />
          </button>

          <div className="flex flex-col gap-6">
            <div className="mb-8">
              <h2 className="text-2xl font-display font-bold">Menu</h2>
              <p className="text-xs text-foreground/40 font-medium uppercase tracking-widest mt-1">Antigravity Design</p>
            </div>

            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group"
                >
                  <item.icon size={20} weight="duotone" className="text-foreground/40 group-hover:text-primary" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-8">
            <button className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20">
              Launch Workspace
            </button>
          </div>
        </GlassCard>
      </aside>
    </>
  );
};
