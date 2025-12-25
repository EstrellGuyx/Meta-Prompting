"use client";

import React, { useState } from 'react';
import { tips } from '@/data/presets';

export default function TipsSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card p-6 fade-in mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-xl font-bold text-glow">
          💡 เคล็ดลับเลือกรูปใบหน้าผู้ใช้
        </h3>
        <span className="text-2xl transform transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="mt-6 space-y-4 animate-fade-in">
          <p className="text-purple-200 text-sm italic mb-4">
            (เพื่อให้ได้ผลลัพธ์ที่เหมือนองสิล่าสุด)
          </p>
          {tips.map((tip, index) => (
            <div 
              key={index} 
              className="flex gap-4 items-start p-4 bg-purple-950/30 rounded-lg hover:bg-purple-950/50 transition-all duration-300"
            >
              <span className="text-2xl flex-shrink-0">{tip.icon}</span>
              <div>
                <h4 className="font-semibold text-purple-100 mb-1">
                  {tip.title}
                </h4>
                <p className="text-sm text-purple-200 opacity-80">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
