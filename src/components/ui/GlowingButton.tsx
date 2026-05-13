import React from 'react';

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function GlowingButton({ children, variant = 'primary', className = '', ...props }: GlowingButtonProps) {
  const baseClasses = "relative px-8 py-4 rounded-full font-bold text-white transition-all duration-300 overflow-hidden group";
  const primaryClasses = "bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_rgba(138,43,226,0.6)]";
  const secondaryClasses = "bg-transparent border-2 border-primary hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(138,43,226,0.4)]";

  return (
    <button
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
    </button>
  );
}
