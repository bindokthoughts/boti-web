import React from 'react';

interface SectionDelineatorProps {
  number: string;
  label: string;
  className?: string;
}

export default function SectionDelineator({ number, label, className = '' }: SectionDelineatorProps) {
  return (
    <div className={`absolute top-12 right-12 flex flex-col items-end gap-2 z-20 mix-blend-difference ${className}`}>
      <div className="flex items-center gap-4">
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400">
          {label}
        </span>
        <div className="w-12 h-[1px] bg-gray-500/50" />
        <span className="text-xl font-light text-white ml-2 tabular-nums">
          {number}
        </span>
      </div>
      <div className="w-[1px] h-24 bg-gradient-to-b from-gray-500/50 to-transparent mr-2.5 mt-2" />
    </div>
  );
}
