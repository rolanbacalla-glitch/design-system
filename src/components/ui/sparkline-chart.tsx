"use client";

import React, { useMemo, useId, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

export const SparklineChart = ({ 
  data, 
  color = "currentColor", 
  width = 120, 
  height = 40,
  className = "",
  fill = false
}: SparklineProps) => {
  const id = useId();
  const [jitter, setJitter] = useState(0);

  // Simulate telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setJitter(Math.random() * 2 - 1);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const points = useMemo(() => {
    if (!data.length) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    return data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      // Add a tiny jitter to the last few points to make it feel alive
      const jitterVal = i > data.length - 3 ? jitter : 0;
      const y = height - ((val + jitterVal - min) / range) * height;
      return { x, y: Math.max(0, Math.min(height, y)) };
    });
  }, [data, width, height, jitter]);

  const pathData = useMemo(() => {
    if (!points.length) return "";
    
    return points.reduce((acc, point, i, a) => {
      if (i === 0) return `M ${point.x},${point.y}`;
      
      const prev = a[i - 1];
      const cx1 = prev.x + (point.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (point.x - prev.x) / 2;
      const cy2 = point.y;
      
      return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${point.x},${point.y}`;
    }, "");
  }, [points]);

  const fillPath = useMemo(() => {
    if (!pathData) return "";
    return `${pathData} L ${width},${height} L 0,${height} Z`;
  }, [pathData, width, height]);

  const cleanId = useMemo(() => id.replace(/:/g, ''), [id]);

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`} 
      className={cn("overflow-visible", className)}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`fill-${cleanId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="50%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id={`glow-${cleanId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {fill && (
        <path 
          d={fillPath} 
          fill={`url(#fill-${cleanId})`} 
          className="transition-all duration-300 ease-linear"
        />
      )}
      
      <path 
        d={pathData} 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        filter={`url(#glow-${cleanId})`}
        className="transition-all duration-300 ease-linear"
      />
    </svg>
  );
};
