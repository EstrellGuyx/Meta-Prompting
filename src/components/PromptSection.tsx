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
    <div className="glass-card p-6 fade-in">
      <div className="flex items-start gap-4 mb-4">
        <div className="number-badge">
          {category.id}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{category.icon}</span>
            <h3 className="text-xl font-bold text-glow">
              {category.nameTh} ({category.name})
            </h3>
          </div>
          <p className="text-sm text-purple-200 opacity-80 mb-2">
            {category.description}
          </p>
          <p className="text-xs text-purple-300 opacity-60 italic">
            EXAMPLE: {category.example}
          </p>
        </div>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${category.name.toLowerCase()}...`}
        className="custom-input mb-4"
      />

      <div className="flex flex-wrap gap-2">
        {category.presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => onPresetClick(preset)}
            className="chip ripple"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
