import React, { forwardRef } from 'react';

interface SpatialTypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLSpanElement | HTMLParagraphElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: React.ReactNode;
  variant?: 'hero' | 'h1' | 'h2' | 'body' | 'accent' | 'glow';
  className?: string;
}

const SpatialTypography = forwardRef<HTMLElement, SpatialTypographyProps>(
  ({ as: Component = 'span', children, variant = 'body', className = '', ...props }, ref) => {
    const variantMap = {
      hero: "text-fluid-hero font-black text-white drop-shadow-2xl tracking-tighter uppercase",
      h1: "text-fluid-h1 font-extrabold text-white tracking-tight text-gradient-premium-subtle",
      h2: "text-fluid-h2 font-semibold text-gray-100 tracking-tight",
      body: "text-fluid-body font-light text-gray-400 leading-relaxed tracking-normal",
      accent: "text-fluid-body font-medium text-gradient-iridescent uppercase tracking-widest text-xs",
      glow: "text-fluid-h2 font-light text-white text-glow-premium",
    };

    return (
      <Component 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
        className={`${variantMap[variant]} transition-all duration-1000 ${className}`} 
        {...props}
      >
        {children}
      </Component>
    );
  }
);

SpatialTypography.displayName = 'SpatialTypography';
export default SpatialTypography;
