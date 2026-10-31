"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

export const FluidGauge = ({ 
  level = 65, 
  color = "#60a5fa", 
  label = "RAM" 
}: { 
  level?: number, 
  color?: string, 
  label?: string 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleContainerRef = useRef<HTMLDivElement>(null);

  // Animate random bubbles floating up
  useEffect(() => {
    if (!bubbleContainerRef.current) return;

    const ctx = gsap.context(() => {
      const createBubble = () => {
        const bubble = document.createElement('div');
        const size = Math.random() * 4 + 2;
        bubble.className = "absolute rounded-full bg-white/20 border border-white/30 blur-[0.5px] pointer-events-none";
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 80 + 10}%`;
        bubble.style.bottom = "0%";
        
        bubbleContainerRef.current?.appendChild(bubble);

        gsap.to(bubble, {
          y: -140,
          x: "+=" + (Math.random() * 20 - 10),
          opacity: 0,
          duration: 2 + Math.random() * 2,
          ease: "power1.out",
          onComplete: () => bubble.remove()
        });
      };

      const timer = setInterval(createBubble, 800);
      return () => clearInterval(timer);
    }, bubbleContainerRef);

    return () => ctx.revert();
  }, []);

  const isCritical = level > 85;
  const activeColor = isCritical ? "#fb923c" : color;

  return (
    <div className="flex flex-col items-center gap-4 h-full">
      <div 
        ref={containerRef}
        className="relative w-14 h-44 rounded-full border border-white/10 bg-white/5 overflow-hidden backdrop-blur-md group hover:border-white/20 transition-all shadow-xl shadow-black/20"
      >
        {/* Surface Filter Defs */}
        <svg className="absolute w-0 h-0">
          <filter id="liquid-warp">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="1">
              <animate attributeName="baseFrequency" dur="10s" values="0.01;0.015;0.01" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>
        </svg>

        {/* Fill Liquid */}
        <div 
          className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out"
          style={{ 
            height: `${level}%`, 
            background: `linear-gradient(to top, ${activeColor}55, ${activeColor}aa)`,
            filter: "url(#liquid-warp)"
          }} 
        >
          {/* Wave Surface */}
          <div className="absolute top-0 left-0 right-0 h-6 -translate-y-[60%] overflow-hidden">
             <svg className="w-[200%] h-full animate-wave-slow" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 10 Q25 0, 50 10 T100 10 V20 H0 Z" fill={activeColor} opacity="0.6" />
            </svg>
            <svg className="absolute top-0 left-[-50%] w-[200%] h-full animate-wave-fast" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 10 Q25 20, 50 10 T100 10 V20 H0 Z" fill={activeColor} opacity="0.3" />
            </svg>
          </div>

          {/* Bubbles Container */}
          <div ref={bubbleContainerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
          
          {/* Internal Glow */}
          <div className="absolute inset-x-2 top-0 h-px bg-white/40 blur-[1px]" />
        </div>

        {/* Glass Highlight */}
        <div className="absolute top-0 left-4 bottom-0 w-2 bg-gradient-to-r from-white/10 to-transparent skew-x-[-10deg] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
      </div>

      <div className="flex flex-col items-center">
        <span className={cn(
          "text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-500",
          isCritical ? "text-orange-400" : "text-foreground/30"
        )}>
          {label}
        </span>
        <span className="text-[11px] font-mono font-bold text-foreground mt-0.5">{level}%</span>
      </div>

      <style jsx>{`
        .animate-wave-slow {
          animation: wave-move 8s linear infinite;
        }
        .animate-wave-fast {
          animation: wave-move 5s linear infinite reverse;
        }
        @keyframes wave-move {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
