"use client";

import React, { useState } from 'react';

interface PromptOutputProps {
  prompt: string;
}

export default function PromptOutput({ prompt }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!prompt.trim()) return;
    
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="glass-card p-6 fade-in sticky top-4">
      <h3 className="text-xl font-bold text-glow mb-4">
        ✨ Generated Prompt
      </h3>

      <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-4 mb-4 min-h-[120px] max-h-[300px] overflow-y-auto">
        {prompt.trim() ? (
          <p className="text-purple-100 leading-relaxed whitespace-pre-wrap">
            {prompt}
          </p>
        ) : (
          <p className="text-purple-400 opacity-50 italic">
            Start filling in the sections above to generate your prompt...
          </p>
        )}
      </div>

      <button
        onClick={handleCopy}
        disabled={!prompt.trim()}
        className={`btn-primary w-full ripple ${copied ? 'btn-success' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {copied ? '✓ Copied!' : '📋 Copy Prompt'}
      </button>

      {prompt.trim() && (
        <p className="text-xs text-purple-300 opacity-60 mt-3 text-center">
          {prompt.length} characters
        </p>
      )}
    </div>
  );
}
