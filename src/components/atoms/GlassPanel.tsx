import React, { forwardRef } from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, intensity = 'medium', className = '', ...props }, ref) => {
    const intensityMap = {
      light: 'glass-panel-architectural',
      medium: 'glass-panel-architectural bg-white/5',
      heavy: 'glass-panel-intense',
    };

    return (
      <div
        ref={ref}
        className={`rounded-2xl ${intensityMap[intensity]} relative overflow-hidden flex transition-all duration-700 ease-out ${className}`}
        {...props}
      >
        {/* Iridescent shimmer effect (hover states or accents can trigger this) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-black/50" />
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
export default GlassPanel;
