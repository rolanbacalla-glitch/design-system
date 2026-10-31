"use client";

import React, { useState } from 'react';
import { List } from 'phosphor-react';
import { MobileSidebar } from './mobile-sidebar';

export const TopNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '#' },
    { name: 'Analytics', href: '#analytics' },
    { name: 'System', href: '#system' },
    { name: 'Design', href: '#design' },
  ];

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-surface-base/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
            <span className="text-white font-bold text-lg leading-none">A</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">Antigravity</span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-px bg-white/10 hidden sm:block" />
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-white/10"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <List size={24} weight="bold" />
          </button>
        </div>
      </div>
    </header>

      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};
