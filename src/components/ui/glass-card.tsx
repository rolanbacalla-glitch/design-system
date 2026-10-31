import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'mist' | 'frost' | 'quartz';
  interactable?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'frost', interactable = false, children, ...props }, ref) => {
    const variantClasses = {
      mist: 'glass-mist',
      frost: 'glass-frost',
      quartz: 'glass-quartz',
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (interactable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        (e.target as HTMLElement).click();
      }
    };

    return (
      <div
        ref={ref}
        role={interactable ? 'button' : undefined}
        tabIndex={interactable ? 0 : undefined}
        onKeyDown={handleKeyDown}
        className={cn(
          'rounded-md transition-glass relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          variantClasses[variant],
          interactable && 'hover:scale-[1.02] hover:shadow-2xl cursor-pointer active:scale-[0.98] group/card',
          className
        )}
        {...props}
      >
        {/* Optical inner glow */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-50" />
        
        {/* Reflective Sheen Effect */}
        {interactable && (
          <div className="absolute inset-0 pointer-events-none translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]" />
        )}

        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
