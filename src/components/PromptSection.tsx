"use client";

import React from 'react';
import { PresetCategory } from '@/data/presets';

interface PromptSectionProps {
  category: PresetCategory;
  value: string;
  onChange: (value: string) => void;
  onPresetClick: (preset: string) => void;
}

export default function PromptSection({
  category,
  value,
  onChange,
  onPresetClick
}: PromptSectionProps) {
  return (
    <div className="glass-card p-4 sm:p-5 md:p-6 fade-in">
      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="number-badge flex-shrink-0">
          {category.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl sm:text-2xl">{category.icon}</span>
            <h3 className="text-lg sm:text-xl font-bold text-glow truncate">
              {category.nameTh} <span className="hidden sm:inline">({category.name})</span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-purple-200 opacity-80 mb-1 sm:mb-2 line-clamp-2">
            {category.description}
          </p>
          <p className="text-[10px] sm:text-xs text-purple-300 opacity-60 italic line-clamp-1">
            EXAMPLE: {category.example}
          </p>
        </div>
      </div>

      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${category.name.toLowerCase()}...`}
        className="custom-input mb-3 sm:mb-4 text-sm sm:text-base"
      />

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {category.presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => onPresetClick(preset)}
            className="chip ripple text-xs sm:text-sm"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
