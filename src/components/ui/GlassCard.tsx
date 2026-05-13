import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`glass-panel p-6 hover:-translate-y-2 transition-transform duration-300 ${className}`}>
      {children}
    </div>
  );
}
