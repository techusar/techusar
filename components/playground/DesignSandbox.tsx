'use client';

import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles, Moon, Sun, Layers, Sliders, Terminal, ArrowRight, ShieldAlert, Zap, CheckCircle2 } from 'lucide-react';

type AccentTheme = 'blue' | 'purple' | 'dual' | 'black';
type RadiusStyle = 'sharp' | 'sleek' | 'smooth' | 'pill';
type CanvasMode = 'light' | 'dark';

export function DesignSandbox() {
  const [accent, setAccent] = useState<AccentTheme>('dual');
  const [radius, setRadius] = useState<RadiusStyle>('smooth');
  const [canvasMode, setCanvasMode] = useState<CanvasMode>('dark');
  const [copied, setCopied] = useState(false);

  // Computed classes
  const getRadiusClass = (r: RadiusStyle) => {
    switch (r) {
      case 'sharp':
        return 'rounded-none';
      case 'sleek':
        return 'rounded-lg';
      case 'smooth':
        return 'rounded-2xl';
      case 'pill':
        return 'rounded-full';
    }
  };

  const getAccentConfig = (a: AccentTheme) => {
    switch (a) {
      case 'blue':
        return {
          name: 'Electric Cobalt Blue',
          hex: '#2563eb / #3b82f6',
          btnBg: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30',
          badgeBg: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
          borderAccent: 'border-blue-500/40',
          glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
          textColor: 'text-blue-500',
        };
      case 'purple':
        return {
          name: 'Cyber Amethyst Violet',
          hex: '#7c3aed / #a855f7',
          btnBg: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/30',
          badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          borderAccent: 'border-purple-500/40',
          glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
          textColor: 'text-purple-400',
        };
      case 'dual':
        return {
          name: 'TechUsar Blue × Purple Dual Gradient',
          hex: '#3b82f6 → #a855f7',
          btnBg: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-indigo-500/30',
          badgeBg: 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 border-indigo-500/30',
          borderAccent: 'border-indigo-500/40',
          glow: 'shadow-[0_0_25px_rgba(99,102,241,0.3)]',
          textColor: 'text-indigo-400',
        };
      case 'black':
        return {
          name: 'Obsidian Jet Black & Platinum',
          hex: '#000000 / #090a0f',
          btnBg: 'bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 shadow-xs',
          badgeBg: 'bg-neutral-900/10 text-neutral-800 dark:bg-white/10 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700',
          borderAccent: 'border-neutral-700',
          glow: 'shadow-sm',
          textColor: 'text-neutral-950 dark:text-white',
        };
    }
  };

  const currentAccent = getAccentConfig(accent);
  const radiusClass = getRadiusClass(radius);

  const copyCode = () => {
    const codeSnippet = `/* TechUsar ${currentAccent.name} Token Spec */
.techusar-card {
  border-radius: ${radius === 'sharp' ? '0px' : radius === 'sleek' ? '8px' : radius === 'smooth' ? '16px' : '9999px'};
  accent-theme: "${accent}";
  background: ${canvasMode === 'dark' ? '#050508' : '#ffffff'};
  border-color: ${currentAccent.hex};
}`;
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
            <Sliders className="w-4 h-4 text-blue-500" />
            <span>DESIGN SYSTEM CONTROLLER</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-500">Preview Canvas:</span>
            <div className="inline-flex p-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
              <button
                type="button"
                onClick={() => setCanvasMode('light')}
                className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  canvasMode === 'light'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => setCanvasMode('dark')}
                className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  canvasMode === 'dark'
                    ? 'bg-neutral-950 text-white shadow-xs font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-purple-400" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Accent Palette Picker */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Palette Identity (Blue / Purple / Dual / Obsidian Black):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'dual', label: 'Blue × Purple', swatch: 'from-blue-600 to-purple-600' },
              { id: 'blue', label: 'Electric Blue', swatch: 'bg-blue-600' },
              { id: 'purple', label: 'Cyber Purple', swatch: 'bg-purple-600' },
              { id: 'black', label: 'Obsidian Black', swatch: 'bg-neutral-950' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAccent(item.id as AccentTheme)}
                className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  accent === item.id
                    ? 'border-blue-500 dark:border-purple-500 ring-2 ring-blue-500/20 bg-neutral-50 dark:bg-neutral-800'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full shrink-0 ${
                    item.id === 'dual' ? 'bg-gradient-to-tr from-blue-600 to-purple-600' : item.swatch
                  } border border-white/20 shadow-xs`}
                />
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Radius Selector */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Corner Geometry:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'sharp', label: 'Sharp (0px)' },
              { id: 'sleek', label: 'Sleek (8px)' },
              { id: 'smooth', label: 'Smooth (16px)' },
              { id: 'pill', label: 'Pill (Full)' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRadius(r.id as RadiusStyle)}
                className={`py-2 px-3 text-xs font-mono rounded-xl border text-center transition-all ${
                  radius === r.id
                    ? 'border-blue-500 dark:border-purple-500 bg-blue-50 dark:bg-purple-950/40 font-semibold text-blue-600 dark:text-purple-400'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Live Sandbox Preview Area */}
      <div
        className={`p-6 sm:p-10 rounded-3xl border transition-all duration-300 ${
          canvasMode === 'dark'
            ? 'bg-[#050508] border-[#191c2b] text-white'
            : 'bg-white border-neutral-200 text-neutral-950'
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200/40 dark:border-neutral-800/80 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
            <span className="text-xs font-mono text-neutral-500 ml-2">
              LIVE UI SPECIMEN CANVAS — [{currentAccent.name.toUpperCase()}]
            </span>
          </div>

          <button
            type="button"
            onClick={copyCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-700 bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Specs!' : 'Copy Token Spec'}</span>
          </button>
        </div>

        {/* Live Specimen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Component 1: Interactive Card */}
          <div
            className={`md:col-span-6 p-6 border ${currentAccent.borderAccent} ${radiusClass} transition-all duration-300 ${
              canvasMode === 'dark' ? 'bg-[#0c0e17]' : 'bg-neutral-50'
            } space-y-4`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 border ${radiusClass} ${currentAccent.badgeBg}`}
              >
                FEATURED RELEASE
              </span>
              <span className="text-xs font-mono text-neutral-500">v2.4.0</span>
            </div>

            <h3 className="text-xl font-bold tracking-tight">
              Hyper-Performant Next.js Design Architecture
            </h3>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Engineered with sub-pixel typographic baselines, zero runtime overhead, and strict type safety across all vector variants.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className={`px-4 py-2 text-xs font-semibold ${radiusClass} ${currentAccent.btnBg} transition-all duration-200 flex items-center gap-2`}
              >
                <span>Deploy System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                className={`px-4 py-2 text-xs font-semibold ${radiusClass} border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors`}
              >
                Documentation
              </button>
            </div>
          </div>

          {/* Component 2: Telemetry & Metrics Specimen */}
          <div className="md:col-span-6 space-y-4">
            <div
              className={`p-5 border ${currentAccent.borderAccent} ${radiusClass} ${
                canvasMode === 'dark' ? 'bg-[#0c0e17]' : 'bg-neutral-50'
              } flex items-center justify-between`}
            >
              <div className="space-y-0.5">
                <div className="text-[11px] font-mono text-neutral-500 uppercase">
                  Global Request Latency
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400">14.2 ms</div>
              </div>
              <div
                className={`w-10 h-10 ${radiusClass} ${currentAccent.badgeBg} flex items-center justify-center`}
              >
                <Zap className="w-5 h-5" />
              </div>
            </div>

            <div
              className={`p-5 border ${currentAccent.borderAccent} ${radiusClass} ${
                canvasMode === 'dark' ? 'bg-[#0c0e17]' : 'bg-neutral-50'
              } flex items-center justify-between`}
            >
              <div className="space-y-0.5">
                <div className="text-[11px] font-mono text-neutral-500 uppercase">
                  Design System Token Sync
                </div>
                <div className="text-xs font-mono text-neutral-600 dark:text-neutral-300">
                  148 Tokens Mapped 1:1
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-purple-400" />
            </div>

            {/* Code Output preview */}
            <div
              className={`p-4 ${radiusClass} border border-neutral-200/60 dark:border-neutral-800 bg-neutral-900 text-neutral-100 font-mono text-xs space-y-1`}
            >
              <div className="text-neutral-500 text-[10px] uppercase">{'// Tailwind CSS Generation'}</div>
              <div className="text-blue-400 font-semibold">&lt;div className=&quot;{radiusClass} border-{accent === 'blue' ? 'blue-500' : accent === 'purple' ? 'purple-500' : 'indigo-500'}&quot;&gt;</div>
              <div className="pl-4 text-neutral-300">&lt;TechUsarComponent theme=&quot;{accent}&quot; /&gt;</div>
              <div className="text-blue-400 font-semibold">&lt;/div&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
