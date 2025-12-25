"use client";

import React from 'react';

interface QuickActionsProps {
  onClearAll: () => void;
  onRandomAll: () => void;
}

export default function QuickActions({ onClearAll, onRandomAll }: QuickActionsProps) {
  return (
    <div className="glass-card p-4 fade-in mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onRandomAll}
          className="btn-primary ripple flex items-center gap-2 px-6"
        >
          <span className="text-xl">🎲</span>
          <span>สุ่มทั้งหมด</span>
        </button>
        
        <button
          onClick={onClearAll}
          className="px-6 py-3 rounded-lg font-semibold bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/40 hover:border-red-500/60 text-red-200 hover:text-red-100 transition-all duration-300 hover:scale-105 ripple flex items-center gap-2"
        >
          <span className="text-xl">🗑️</span>
          <span>ล้างทั้งหมด</span>
        </button>
      </div>
    </div>
  );
}
