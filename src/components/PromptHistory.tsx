"use client";

import React, { useState, useEffect } from 'react';

interface SavedPrompt {
  id: string;
  name: string;
  prompt: string;
  timestamp: number;
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

interface PromptHistoryProps {
  currentPrompt: string;
  currentValues: {
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
  onLoadPrompt: (values: SavedPrompt['values']) => void;
}

export default function PromptHistory({
  currentPrompt,
  currentValues,
  onLoadPrompt,
}: PromptHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [promptName, setPromptName] = useState('');

  // Load saved prompts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('metaPromptHistory');
    if (saved) {
      setSavedPrompts(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  const saveToLocalStorage = (prompts: SavedPrompt[]) => {
    localStorage.setItem('metaPromptHistory', JSON.stringify(prompts));
  };

  // Save current prompt
  const handleSave = () => {
    if (!currentPrompt.trim()) {
      alert('กรุณากรอก Prompt ก่อนบันทึก');
      return;
    }

    const name = promptName.trim() || `Prompt ${new Date().toLocaleString('th-TH')}`;

    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      name,
      prompt: currentPrompt,
      timestamp: Date.now(),
      values: currentValues,
    };

    const updated = [newPrompt, ...savedPrompts].slice(0, 20); // Keep last 20
    setSavedPrompts(updated);
    saveToLocalStorage(updated);
    setShowSaveDialog(false);
    setPromptName('');
  };

  // Delete prompt
  const handleDelete = (id: string) => {
    const updated = savedPrompts.filter((p) => p.id !== id);
    setSavedPrompts(updated);
    saveToLocalStorage(updated);
  };

  // Load prompt
  const handleLoad = (saved: SavedPrompt) => {
    onLoadPrompt(saved.values);
    setIsOpen(false);
  };

  return (
    <div className="glass-card p-6 fade-in mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-lg font-semibold text-purple-100 hover:text-purple-50 transition-colors"
        >
          <span className="text-xl">📜</span>
          <span>ประวัติ Prompts</span>
          <span className="text-sm text-purple-300 opacity-60 font-normal">
            ({savedPrompts.length}/20)
          </span>
          <span
            className="text-xl transform transition-transform duration-300 ml-2"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ▼
          </span>
        </button>

        <button
          onClick={() => setShowSaveDialog(true)}
          className="btn-primary ripple flex items-center gap-2 px-4 py-2 text-sm"
          disabled={!currentPrompt.trim()}
        >
          <span>💾</span>
          <span>บันทึก Prompt</span>
        </button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-4 p-4 bg-purple-950/50 rounded-lg border border-purple-500/30">
          <h4 className="font-semibold mb-2 text-purple-100">ตั้งชื่อ Prompt</h4>
          <input
            type="text"
            value={promptName}
            onChange={(e) => setPromptName(e.target.value)}
            placeholder="เช่น ภาพบุคคลสไตล์ไซเบอร์พังค์"
            className="custom-input mb-3"
            autoFocus
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary ripple flex-1">
              บันทึก
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setPromptName('');
              }}
              className="px-4 py-2 rounded-lg font-semibold bg-gray-500/20 hover:bg-gray-500/30 border-2 border-gray-500/40 text-gray-200 transition-all"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {/* History List */}
      {isOpen && (
        <div className="space-y-2 animate-fade-in">
          {savedPrompts.length === 0 ? (
            <p className="text-purple-300 opacity-60 text-center py-4 italic">
              ยังไม่มีประวัติ Prompts ที่บันทึก
            </p>
          ) : (
            savedPrompts.map((saved) => (
              <div
                key={saved.id}
                className="p-3 bg-purple-950/30 rounded-lg hover:bg-purple-950/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-purple-100 mb-1 truncate">
                      {saved.name}
                    </h5>
                    <p className="text-sm text-purple-200 opacity-70 line-clamp-2 mb-1">
                      {saved.prompt}
                    </p>
                    <p className="text-xs text-purple-300 opacity-50">
                      {new Date(saved.timestamp).toLocaleString('th-TH')}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleLoad(saved)}
                      className="px-3 py-1.5 text-sm rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 hover:text-purple-100 transition-all opacity-0 group-hover:opacity-100"
                      title="โหลด Prompt นี้"
                    >
                      📥 โหลด
                    </button>
                    <button
                      onClick={() => handleDelete(saved.id)}
                      className="px-3 py-1.5 text-sm rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 hover:text-red-100 transition-all opacity-0 group-hover:opacity-100"
                      title="ลบ"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
