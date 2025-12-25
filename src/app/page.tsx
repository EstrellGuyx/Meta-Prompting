"use client";

import React, { useState } from 'react';
import PromptSection from '@/components/PromptSection';
import PromptOutput from '@/components/PromptOutput';
import TipsSection from '@/components/TipsSection';
import TemplateSelector from '@/components/TemplateSelector';
import QuickActions from '@/components/QuickActions';
import { promptPresets, PromptTemplate } from '@/data/presets';

export default function Home() {
  const [promptValues, setPromptValues] = useState({
    subject: '',
    style: '',
    text: '',
    composition: '',
    quality: ''
  });

  const handleValueChange = (category: string, value: string) => {
    setPromptValues(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handlePresetClick = (category: string, preset: string) => {
    setPromptValues(prev => {
      const currentValue = prev[category as keyof typeof prev];
      const newValue = currentValue 
        ? `${currentValue}, ${preset}` 
        : preset;
      return {
        ...prev,
        [category]: newValue
      };
    });
  };

  // Template selection
  const handleTemplateSelect = (template: PromptTemplate) => {
    setPromptValues(template.values);
  };

  // Random generator
  const handleRandomAll = () => {
    const randomValues: any = {};
    
    promptPresets.forEach(category => {
      const categoryName = category.name.toLowerCase();
      const randomPresets: string[] = [];
      const numPresets = Math.floor(Math.random() * 3) + 1; // 1-3 presets per category
      
      for (let i = 0; i < numPresets; i++) {
        const randomIndex = Math.floor(Math.random() * category.presets.length);
        const preset = category.presets[randomIndex];
        if (!randomPresets.includes(preset)) {
          randomPresets.push(preset);
        }
      }
      
      randomValues[categoryName] = randomPresets.join(', ');
    });
    
    setPromptValues(randomValues);
  };

  // Clear all
  const handleClearAll = () => {
    setPromptValues({
      subject: '',
      style: '',
      text: '',
      composition: '',
      quality: ''
    });
  };

  // Generate final prompt
  const generatePrompt = () => {
    const parts = [];
    if (promptValues.subject) parts.push(promptValues.subject);
    if (promptValues.style) parts.push(promptValues.style);
    if (promptValues.text) parts.push(promptValues.text);
    if (promptValues.composition) parts.push(promptValues.composition);
    if (promptValues.quality) parts.push(promptValues.quality);
    
    return parts.join(', ');
  };

  const finalPrompt = generatePrompt();

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-glow">
            ✨ Meta Prompting
          </h1>
          <p className="text-xl text-purple-200 opacity-80 mb-2">
            ตัวช่วยสร้าง Prompt สำหรับ AI สร้างรูปภาพ
          </p>
          <p className="text-sm text-purple-300 opacity-60">
            รองรับ Gemini, Midjourney, ChatGPT, และอื่นๆ
          </p>
        </header>

        {/* Template Selector */}
        <TemplateSelector onSelectTemplate={handleTemplateSelect} />

        {/* Quick Actions */}
        <QuickActions 
          onClearAll={handleClearAll}
          onRandomAll={handleRandomAll}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Sections */}
          <div className="lg:col-span-2 space-y-6">
            {promptPresets.map((category) => (
              <PromptSection
                key={category.id}
                category={category}
                value={promptValues[category.name.toLowerCase() as keyof typeof promptValues]}
                onChange={(value) => handleValueChange(category.name.toLowerCase(), value)}
                onPresetClick={(preset) => handlePresetClick(category.name.toLowerCase(), preset)}
              />
            ))}

            {/* Tips Section */}
            <TipsSection />
          </div>

          {/* Right Column - Output */}
          <div className="lg:col-span-1">
            <PromptOutput 
              prompt={finalPrompt}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pb-8 text-purple-300 opacity-60 text-sm">
          <p>สร้างด้วย Next.js + Tailwind CSS • พร้อม Deploy บน Vercel</p>
        </footer>
      </div>
    </main>
  );
}

