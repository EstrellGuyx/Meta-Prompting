"use client";

import React, { useState, useEffect } from 'react';

interface PromptOutputProps {
  prompt: string;
  promptValues: {
    subject: string;
    action?: string;
    background?: string;
    time?: string;
    emotion?: string;
    style: string;
    text: string;
    composition: string;
    quality: string;
  };
  onPromptEdit: (values: PromptOutputProps['promptValues']) => void;
}

export default function PromptOutput({ prompt, promptValues, onPromptEdit }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);

  // Update editedPrompt when prompt changes
  useEffect(() => {
    setEditedPrompt(prompt);
  }, [prompt]);

  const handleCopy = async () => {
    if (!editedPrompt.trim()) return;

    try {
      await navigator.clipboard.writeText(editedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePromptChange = (newPrompt: string) => {
    setEditedPrompt(newPrompt);

    // Parse the category-labeled format
    const updatedValues = {
      subject: '',
      action: '',
      background: '',
      time: '',
      emotion: '',
      style: '',
      text: '',
      composition: '',
      quality: ''
    };

    // Split by newlines and parse each line
    const lines = newPrompt.split('\n');

    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      // Try to match category labels
      if (trimmedLine.startsWith('ตัวแบบ:') || trimmedLine.startsWith('Subject:')) {
        updatedValues.subject = trimmedLine.replace(/^(ตัวแบบ|Subject):\s*/, '').trim();
      } else if (trimmedLine.startsWith('ท่าทาง:') || trimmedLine.startsWith('Action:')) {
        updatedValues.action = trimmedLine.replace(/^(ท่าทาง|Action):\s*/, '').trim();
      } else if (trimmedLine.startsWith('ฉากหลัง:') || trimmedLine.startsWith('Background:')) {
        updatedValues.background = trimmedLine.replace(/^(ฉากหลัง|Background):\s*/, '').trim();
      } else if (trimmedLine.startsWith('เวลา:') || trimmedLine.startsWith('Time:')) {
        updatedValues.time = trimmedLine.replace(/^(เวลา|Time):\s*/, '').trim();
      } else if (trimmedLine.startsWith('อารมณ์:') || trimmedLine.startsWith('Emotion:')) {
        updatedValues.emotion = trimmedLine.replace(/^(อารมณ์|Emotion):\s*/, '').trim();
      } else if (trimmedLine.startsWith('สไตล์:') || trimmedLine.startsWith('Style:')) {
        updatedValues.style = trimmedLine.replace(/^(สไตล์|Style):\s*/, '').trim();
      } else if (trimmedLine.startsWith('ข้อความ:') || trimmedLine.startsWith('Text:')) {
        updatedValues.text = trimmedLine.replace(/^(ข้อความ|Text):\s*/, '').trim();
      } else if (trimmedLine.startsWith('องค์ประกอบ:') || trimmedLine.startsWith('Composition:')) {
        updatedValues.composition = trimmedLine.replace(/^(องค์ประกอบ|Composition):\s*/, '').trim();
      } else if (trimmedLine.startsWith('คุณภาพ:') || trimmedLine.startsWith('Quality:')) {
        updatedValues.quality = trimmedLine.replace(/^(คุณภาพ|Quality):\s*/, '').trim();
      } else {
        // If no label found, add to subject as fallback
        if (!updatedValues.subject) {
          updatedValues.subject = trimmedLine;
        } else {
          updatedValues.subject += ', ' + trimmedLine;
        }
      }
    });

    onPromptEdit(updatedValues);
  };

  return (
    <div className="glass-card p-4 sm:p-5 md:p-6 fade-in lg:sticky lg:top-4">
      <h3 className="text-lg sm:text-xl font-bold text-glow mb-3 sm:mb-4">
        ✨ Generated Prompt
      </h3>

      <div className="mb-3 sm:mb-4">
        {prompt.trim() ? (
          <textarea
            value={editedPrompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            className="w-full bg-purple-950/50 border border-purple-500/30 rounded-lg p-3 sm:p-4 min-h-[100px] sm:min-h-[120px] max-h-[250px] sm:max-h-[300px] text-purple-100 leading-relaxed resize-y focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 transition-all text-xs sm:text-sm"
            placeholder="Start filling in the sections above to generate your prompt..."
          />
        ) : (
          <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-3 sm:p-4 min-h-[100px] sm:min-h-[120px]">
            <p className="text-purple-400 opacity-50 italic text-xs sm:text-sm">
              Start filling in the sections above to generate your prompt...
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleCopy}
        disabled={!editedPrompt.trim()}
        className={`btn-primary w-full ripple text-sm sm:text-base ${copied ? 'btn-success' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {copied ? '✓ Copied!' : '📋 Copy Prompt'}
      </button>

      {editedPrompt.trim() && (
        <p className="text-[10px] sm:text-xs text-purple-300 opacity-60 mt-2 sm:mt-3 text-center">
          {editedPrompt.length} characters
        </p>
      )}
    </div>
  );
}
