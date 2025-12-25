"use client";

import React from 'react';
import { promptTemplates, PromptTemplate } from '@/data/presets';

interface TemplateSelectorProps {
  onSelectTemplate: (template: PromptTemplate) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="glass-card p-6 fade-in mb-8">
      <h3 className="text-lg font-semibold mb-3 text-purple-100 flex items-center gap-2">
        <span>🎨</span>
        <span>เทมเพลตสำเร็จรูป</span>
        <span className="text-sm text-purple-300 opacity-60 font-normal">
          (คลิกเดียวกรอกให้หมด!)
        </span>
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {promptTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className="glass-card p-4 text-center hover:scale-105 transition-all duration-300 group"
            title={template.description}
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              {template.icon}
            </div>
            <div className="text-sm font-medium text-purple-100">
              {template.name}
            </div>
            <div className="text-xs text-purple-300 opacity-60 mt-1">
              {template.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
