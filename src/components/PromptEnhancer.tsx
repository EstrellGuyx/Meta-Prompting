"use client";

import React from 'react';

interface PromptEnhancerProps {
  values: {
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
}

interface Suggestion {
  type: 'warning' | 'tip' | 'success';
  icon: string;
  message: string;
  field: string;
}

export default function PromptEnhancer({ values }: PromptEnhancerProps) {
  const getSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = [];

    // Check Subject (required)
    if (!values.subject.trim()) {
      suggestions.push({
        type: 'warning',
        icon: '⚠️',
        message: 'ควรระบุ "ตัวแบบ" เพื่อให้ AI รู้ว่าต้องสร้างอะไร',
        field: 'subject'
      });
    }

    // Check Action
    if (values.action && values.action.trim()) {
      // Good!
    } else if (values.subject.trim() && (values.subject.includes('คน') || values.subject.includes('ผู้'))) {
      suggestions.push({
        type: 'tip',
        icon: '💡',
        message: 'ลองเพิ่ม "ท่าทาง" เพื่อให้ตัวแบบมีความเคลื่อนไหว เช่น กำลังยิ้ม, กำลังเดิน',
        field: 'action'
      });
    }

    // Check Background
    if (!values.background || !values.background.trim()) {
      suggestions.push({
        type: 'tip',
        icon: '💡',
        message: 'แนะนำให้เพิ่ม "ฉากหลัง" เพื่อกำหนดบรรยากาศ เช่น ในสตูดิโอ, ธรรมชาติ',
        field: 'background'
      });
    }

    // Check Style (important)
    if (!values.style.trim()) {
      suggestions.push({
        type: 'warning',
        icon: '⚠️',
        message: 'ควรเพิ่ม "สไตล์" เพื่อกำหนดลักษณะของภาพ เช่น สมจริง, อนิเมะ, ไซเบอร์พังค์',
        field: 'style'
      });
    }

    // Check Composition
    if (!values.composition.trim()) {
      suggestions.push({
        type: 'tip',
        icon: '💡',
        message: 'ลองเพิ่ม "องค์ประกอบ" เพื่อควบคุมมุมกล้อง เช่น มุมกว้าง, มุมใกล้ชิด',
        field: 'composition'
      });
    }

    // Check Quality (important)
    if (!values.quality.trim()) {
      suggestions.push({
        type: 'warning',
        icon: '⚠️',
        message: 'แนะนำให้เพิ่ม "คุณภาพ" เพื่อผลลัพธ์ที่ดีขึ้น เช่น ความคมชัด 4K, แสงสตูดิโอ',
        field: 'quality'
      });
    } else {
      const qualityLower = values.quality.toLowerCase();
      const hasLighting = qualityLower.includes('แสง') || qualityLower.includes('light');
      const hasResolution = qualityLower.includes('4k') || qualityLower.includes('8k') ||
                           qualityLower.includes('ความคมชัด') || qualityLower.includes('ละเอียด');

      if (!hasLighting) {
        suggestions.push({
          type: 'tip',
          icon: '💡',
          message: 'ลองเพิ่มการตั้งค่า "แสง" เช่น แสงสตูดิโอ, แสงธรรมชาติ, golden hour',
          field: 'quality'
        });
      }

      if (!hasResolution) {
        suggestions.push({
          type: 'tip',
          icon: '💡',
          message: 'ลองเพิ่มความละเอียด เช่น ความคมชัดระดับ 4K, 8K',
          field: 'quality'
        });
      }
    }

    // Calculate completeness
    const filledFields = [
      values.subject,
      values.action,
      values.background,
      values.time,
      values.emotion,
      values.style,
      values.composition,
      values.quality
    ].filter((v) => v && v.trim()).length;

    const percentage = Math.round((filledFields / 8) * 100);

    // Success message
    if (percentage >= 75 && suggestions.filter(s => s.type === 'warning').length === 0) {
      suggestions.push({
        type: 'success',
        icon: '✅',
        message: `Prompt ของคุณสมบูรณ์ ${percentage}% แล้ว! พร้อมสร้างภาพคุณภาพสูง`,
        field: 'all'
      });
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  if (suggestions.length === 0) {
    return null;
  }

  // Calculate progress
  const filledFields = [
    values.subject,
    values.action,
    values.background,
    values.time,
    values.emotion,
    values.style,
    values.composition,
    values.quality
  ].filter((v) => v && v.trim()).length;
  const percentage = Math.round((filledFields / 8) * 100);

  return (
    <div className="glass-card p-6 fade-in">
      <h3 className="text-lg font-semibold mb-3 text-purple-100 flex items-center gap-2">
        <span>✨</span>
        <span>คำแนะนำจาก AI</span>
      </h3>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-purple-200">ความสมบูรณ์ของ Prompt</span>
          <span className="text-sm font-semibold text-purple-100">{percentage}%</span>
        </div>
        <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg flex items-start gap-3 ${
              suggestion.type === 'warning'
                ? 'bg-yellow-500/10 border border-yellow-500/30'
                : suggestion.type === 'success'
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-blue-500/10 border border-blue-500/30'
            }`}
          >
            <span className="text-xl flex-shrink-0">{suggestion.icon}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${
                suggestion.type === 'warning'
                  ? 'text-yellow-100'
                  : suggestion.type === 'success'
                  ? 'text-green-100'
                  : 'text-blue-100'
              }`}>
                {suggestion.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
