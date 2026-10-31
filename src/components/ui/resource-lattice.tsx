"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const ResourceLattice = ({ active = true, load = 40 }: { active?: boolean, load?: number }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  
  // Create a stable hex-like grid of nodes
  const nodes = useMemo(() => {
    const items: Node[] = [];
    const rows = 4;
    const cols = 4;
    const spacing = 22;
    const offset = 10;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        items.push({
          id: r * cols + c,
          x: offset + c * spacing + (r % 2 === 0 ? 0 : spacing / 2),
          y: offset + r * spacing,
          size: 1.5 + ((r * 4 + c) % 3) * 0.75,
        });
      }
    }
    return items;
  }, []);

  // Determine connections (nearest neighbors)
  const connections = useMemo(() => {
    const lines: [number, number][] = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((target) => {
        const dx = node.x - target.x;
        const dy = node.y - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 25) {
          lines.push([node.id, target.id]);
        }
      });
    });
    return lines;
  }, [nodes]);

  useEffect(() => {
    if (!containerRef.current || !active) return;
    
    const svg = containerRef.current;
    const nodeElements = svg.querySelectorAll('.node-dot');
    const pathElements = svg.querySelectorAll('.node-path');
    
    const intensity = Math.max(0.5, load / 50);

    const ctx = gsap.context(() => {
      nodeElements.forEach((node) => {
        gsap.to(node, {
          opacity: 0.2,
          r: "+=1",
          duration: (0.5 + Math.random() * 1) / intensity,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2
        });
      });

      pathElements.forEach((path) => {
        gsap.set(path, { strokeDasharray: "4 10", strokeDashoffset: 14 });
        gsap.to(path, {
          strokeDashoffset: -100,
          duration: (3 + Math.random() * 3) / intensity,
          repeat: -1,
          ease: "none"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [active, load]);

  return (
    <div className="relative w-full aspect-square max-w-[140px] flex items-center justify-center">
      <svg 
        ref={containerRef}
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]"
      >
        {/* Connection Lines */}
        {connections.map(([aId, bId], i) => {
          const a = nodes.find(n => n.id === aId)!;
          const b = nodes.find(n => n.id === bId)!;
          return (
            <line 
              key={`line-${i}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="white" 
              strokeWidth="0.5" 
              className="node-path opacity-10"
            />
          );
        })}

        {/* Neural Nodes */}
        {nodes.map((node) => (
          <circle 
            key={`node-${node.id}`}
            cx={node.x} cy={node.y} r={node.size}
            className={cn(
              "node-dot transition-colors duration-500",
              load > 80 ? "fill-orange-400" : "fill-primary"
            )}
            fillOpacity="0.8"
          />
        ))}
      </svg>
      
      {/* Center Data Core Glow */}
      <div className={cn(
        "absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000",
        load > 80 ? "bg-orange-500" : "bg-primary"
      )} />
    </div>
  );
};
