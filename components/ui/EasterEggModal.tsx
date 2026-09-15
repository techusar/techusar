'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Terminal, X, Sparkles, Cpu, Layers, Palette, CheckCircle2 } from 'lucide-react';

export function EasterEggModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputBuffer, setInputBuffer] = useState('');

  useEffect(() => {
    const targetSequence = 'techusar';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in input/textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      const char = e.key.toLowerCase();
      if (/^[a-z]$/.test(char)) {
        setInputBuffer((prev) => {
          const updated = (prev + char).slice(-targetSequence.length);
          if (updated === targetSequence) {
            triggerEasterEgg();
            return '';
          }
          return updated;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    setIsOpen(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#2563eb', '#38bdf8', '#a855f7', '#e2e8f0'],
      });
    } catch {
      // silent fallback
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="techusar-easter-egg-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        id="techusar-easter-egg-modal"
        className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl p-6 text-neutral-100 font-mono text-xs overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-emerald-400">
            <Terminal className="w-4 h-4" />
            <span className="font-bold tracking-wider uppercase text-[11px]">
              TechUsar Terminal // System Unlocked
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4">
          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800/80 space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>CORE ARCHETYPE:</span>
              <span className="text-white font-semibold">Graphic Designer × Full-Stack Engineer</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>CREATIVE CONSOLE STATUS:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> ONLINE & TUNED
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>DESIGN SPECIFICATION:</span>
              <span className="text-blue-400">Swiss Modernism + Linear Refinement</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-md bg-neutral-900/60 border border-neutral-800">
              <Palette className="w-4 h-4 mx-auto text-purple-400 mb-1" />
              <div className="text-[10px] text-neutral-400">Design Fidelity</div>
              <div className="text-sm font-bold text-neutral-200">100% Bespoke</div>
            </div>
            <div className="p-2.5 rounded-md bg-neutral-900/60 border border-neutral-800">
              <Cpu className="w-4 h-4 mx-auto text-blue-400 mb-1" />
              <div className="text-[10px] text-neutral-400">Frontend Stack</div>
              <div className="text-sm font-bold text-neutral-200">Next.js 15</div>
            </div>
            <div className="p-2.5 rounded-md bg-neutral-900/60 border border-neutral-800">
              <Layers className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
              <div className="text-[10px] text-neutral-400">Theme Engine</div>
              <div className="text-sm font-bold text-neutral-200">Dual Mode</div>
            </div>
          </div>

          <p className="text-neutral-400 text-[11px] leading-relaxed">
            &ldquo;You found the developer easter egg. TechUsar is built on the philosophy that modern software requires uncompromising graphic craftsmanship paired with rigorous full-stack execution.&rdquo;
          </p>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Press ESC or click outside to dismiss</span>
          <button
            onClick={() => setIsOpen(false)}
            className="px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition-colors"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
