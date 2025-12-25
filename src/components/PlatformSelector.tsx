"use client";

import React from 'react';
import { aiPlatforms } from '@/data/presets';

interface PlatformSelectorProps {
  selected: string;
  onSelect: (platform: string) => void;
}

export default function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  return (
    <div className="glass-card p-6 fade-in mb-8">
      <h3 className="text-lg font-semibold mb-4 text-purple-100">
        🤖 Select AI Platform
      </h3>
      <div className="flex flex-wrap gap-3">
        {aiPlatforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onSelect(platform.id)}
            className={`chip ripple ${selected === platform.id ? 'selected' : ''}`}
            style={
              selected === platform.id
                ? { borderColor: platform.color, boxShadow: `0 0 20px ${platform.color}40` }
                : {}
            }
          >
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
}
