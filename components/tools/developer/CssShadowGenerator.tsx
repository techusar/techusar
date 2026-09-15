'use client';

import React, { useState } from 'react';
import { Layers, Copy, Check } from 'lucide-react';

export function CssShadowGenerator() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(12);
  const [blur, setBlur] = useState(24);
  const [spread, setSpread] = useState(-4);
  const [opacity, setOpacity] = useState(25);
  const [isDarkShadow, setIsDarkShadow] = useState(true);
  const [copied, setCopied] = useState(false);

  const shadowColor = isDarkShadow
    ? `rgba(0, 0, 0, ${opacity / 100})`
    : `rgba(59, 130, 246, ${opacity / 100})`;

  const cssValue = `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${shadowColor}`;
  const tailwindValue = `shadow-[${offsetX}px_${offsetY}px_${blur}px_${spread}px_${shadowColor.replace(/\s+/g, '')}]`;

  const copyCss = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-xs">
      <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            CSS Box Shadow &amp; Glow Generator
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Interactive visual shadow tuning with instant standard CSS and Tailwind CSS outputs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-4 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between font-mono">
              <span>Offset X</span>
              <span>{offsetX}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={offsetX}
              onChange={(e) => setOffsetX(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-mono">
              <span>Offset Y</span>
              <span>{offsetY}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-mono">
              <span>Blur Radius</span>
              <span>{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-mono">
              <span>Spread Radius</span>
              <span>{spread}px</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-mono">
              <span>Shadow Opacity</span>
              <span>{opacity}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <span className="text-neutral-500 font-mono">Shadow Tint:</span>
            <button
              type="button"
              onClick={() => setIsDarkShadow(true)}
              className={`px-3 py-1 rounded text-xs font-semibold ${
                isDarkShadow ? 'bg-neutral-900 text-white dark:bg-white dark:text-black' : 'bg-neutral-100 dark:bg-neutral-800'
              }`}
            >
              Natural Dark
            </button>
            <button
              type="button"
              onClick={() => setIsDarkShadow(false)}
              className={`px-3 py-1 rounded text-xs font-semibold ${
                !isDarkShadow ? 'bg-blue-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800'
              }`}
            >
              Blue Neon Glow
            </button>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="h-48 rounded-2xl bg-neutral-100 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center p-6">
            <div
              style={{ boxShadow: cssValue }}
              className="w-36 h-24 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 flex items-center justify-center text-xs font-bold text-neutral-800 dark:text-white select-none transition-all duration-75"
            >
              Preview Card
            </div>
          </div>

          {/* Generated Code Snippets */}
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-neutral-900 text-neutral-200 font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between items-center text-neutral-400">
                <span>CSS box-shadow:</span>
                <button
                  type="button"
                  onClick={() => copyCss(`box-shadow: ${cssValue};`)}
                  className="text-blue-400 hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-white break-all select-all font-semibold">
                box-shadow: {cssValue};
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900 text-neutral-200 font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between items-center text-neutral-400">
                <span>Tailwind Class:</span>
                <button
                  type="button"
                  onClick={() => copyCss(tailwindValue)}
                  className="text-purple-400 hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="text-purple-300 break-all select-all font-semibold">
                {tailwindValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
