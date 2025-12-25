"use client";

import React, { useState } from 'react';
import PromptSection from '@/components/PromptSection';
import PromptOutput from '@/components/PromptOutput';
import TipsSection from '@/components/TipsSection';
import TemplateSelector from '@/components/TemplateSelector';
import QuickActions from '@/components/QuickActions';
import PromptEnhancer from '@/components/PromptEnhancer';
import { promptPresets, PromptTemplate } from '@/data/presets';

export default function Home() {
  const [promptValues, setPromptValues] = useState({
    subject: '',
    action: '',
    background: '',
    time: '',
    emotion: '',
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
    setPromptValues({
      subject: template.values.subject || '',
      action: template.values.action || '',
      background: template.values.background || '',
      time: template.values.time || '',
      emotion: template.values.emotion || '',
      style: template.values.style || '',
      text: template.values.text || '',
      composition: template.values.composition || '',
      quality: template.values.quality || ''
    });
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
      action: '',
      background: '',
      time: '',
      emotion: '',
      style: '',
      text: '',
      composition: '',
      quality: ''
    });
  };

  // Generate final prompt
  const generatePrompt = () => {
    const parts: string[] = [];

    // Format with category labels for clarity
    if (promptValues.subject) {
      parts.push(`ตัวแบบ: ${promptValues.subject}`);
    }
    if (promptValues.action) {
      parts.push(`ท่าทาง: ${promptValues.action}`);
    }
    if (promptValues.background) {
      parts.push(`ฉากหลัง: ${promptValues.background}`);
    }
    if (promptValues.time) {
      parts.push(`เวลา: ${promptValues.time}`);
    }
    if (promptValues.emotion) {
      parts.push(`อารมณ์: ${promptValues.emotion}`);
    }
    if (promptValues.style) {
      parts.push(`สไตล์: ${promptValues.style}`);
    }
    if (promptValues.text) {
      parts.push(`ข้อความ: ${promptValues.text}`);
    }
    if (promptValues.composition) {
      parts.push(`องค์ประกอบ: ${promptValues.composition}`);
    }
    if (promptValues.quality) {
      parts.push(`คุณภาพ: ${promptValues.quality}`);
    }

    return parts.join('\n');
  };

  const finalPrompt = generatePrompt();

  return (
    <main className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8 fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 text-glow">
            ✨ Meta Prompting
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-purple-200 opacity-80 mb-1 sm:mb-2 px-2">
            ตัวช่วยสร้าง Prompt สำหรับ AI สร้างรูปภาพ
          </p>
          <p className="text-xs sm:text-sm text-purple-300 opacity-60 px-2">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Sections */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {promptPresets.map((category) => (
              <PromptSection
                key={category.id}
                category={category}
                value={promptValues[category.name.toLowerCase() as keyof typeof promptValues]}
                onChange={(value) => handleValueChange(category.name.toLowerCase(), value)}
                onPresetClick={(preset) => handlePresetClick(category.name.toLowerCase(), preset)}
              />
            ))}

            {/* Prompt Enhancer */}
            <PromptEnhancer values={promptValues} />

            {/* Tips Section */}
            <TipsSection />
          </div>

          {/* Right Column - Output */}
          <div className="lg:col-span-1">
            <PromptOutput
              prompt={finalPrompt}
              promptValues={promptValues}
              onPromptEdit={(values) => setPromptValues({
                subject: values.subject || '',
                action: values.action || '',
                background: values.background || '',
                time: values.time || '',
                emotion: values.emotion || '',
                style: values.style || '',
                text: values.text || '',
                composition: values.composition || '',
                quality: values.quality || ''
              })}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 sm:mt-16 pb-6 sm:pb-8 text-purple-300 opacity-60 text-xs sm:text-sm px-2">
          <p>สร้างด้วย Next.js + Tailwind CSS • พร้อม Deploy บน Vercel</p>
        </footer>
      </div>
    </main>
  );
}

