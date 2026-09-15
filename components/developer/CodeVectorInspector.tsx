'use client';

import React, { useState } from 'react';
import { Code2, Compass, Layout, Copy, Check, Sparkles, Terminal, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function CodeVectorInspector() {
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'vector'>('preview');
  const [copied, setCopied] = useState(false);

  const sampleTypeScriptCode = `// TechUsar Design-System Token Component
import React from 'react';
import { motion } from 'framer-motion';

export interface TelemetryBadgeProps {
  label: string;
  metric: string;
  status: 'nominal' | 'optimizing' | 'active';
  theme: 'blue' | 'purple';
}

export const TelemetryBadge: React.FC<TelemetryBadgeProps> = ({
  label,
  metric,
  status = 'nominal',
  theme = 'blue',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="p-5 rounded-2xl border border-blue-500/20 bg-neutral-900/80 backdrop-blur-md"
    >
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
        <span>{label}</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>
      <div className="mt-2 text-3xl font-extrabold tracking-tight text-white font-mono">
        {metric}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-blue-400 font-mono">
        <span>● STATUS: {status.toUpperCase()}</span>
      </div>
    </motion.div>
  );
};`;

  const sampleVectorSpec = `<!-- TechUsar Monogram Vector Bézier Geometry Spec -->
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Dynamic Coordinate Grid: Golden Ratio Phi = 1.618033 -->
  <defs>
    <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>
  </defs>
  
  <!-- Outer Hexagonal Boundary (Precision Tangent R: 48.00) -->
  <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" 
           stroke="url(#cyberGradient)" stroke-width="3" />
           
  <!-- Primary T & U Monogram (Cubic Bézier Interpolation) -->
  <path d="M 28,34 H 72 M 50,34 V 68 C 50,78 36,78 36,68" 
        stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" />
</svg>`;

  const copyCurrent = () => {
    const text = viewMode === 'code' ? sampleTypeScriptCode : sampleVectorSpec;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Top Header */}
      <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-500" />
            <span>Dual-Discipline Inspector: Code & Vector Math</span>
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-200/60 dark:bg-neutral-800/80 text-xs font-mono">
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'preview'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Layout className="w-3 h-3 text-blue-500" />
            <span>Interactive UI</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('code')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'code'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3 h-3 text-purple-500" />
            <span>TypeScript Code</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('vector')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'vector'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-3 h-3 text-emerald-500" />
            <span>Vector Geometry</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 min-h-[320px] flex flex-col justify-center">
        {viewMode === 'preview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Telemetry Card 1 */}
              <div className="p-5 rounded-2xl border border-blue-500/20 bg-neutral-900 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-colors" />
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>EDGE RENDERING LATENCY</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="mt-3 text-4xl font-extrabold font-mono text-white tracking-tight">
                  84 <span className="text-sm font-normal text-neutral-400">ms</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-blue-400 pt-3 border-t border-neutral-800">
                  <span>● 99th Percentile SLA</span>
                  <span className="text-emerald-400 font-bold">100% NOMINAL</span>
                </div>
              </div>

              {/* Telemetry Card 2 */}
              <div className="p-5 rounded-2xl border border-purple-500/20 bg-neutral-900 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-colors" />
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>FIGMA-TO-CODE DRIFT</span>
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                </div>
                <div className="mt-3 text-4xl font-extrabold font-mono text-purple-300 tracking-tight">
                  0.00 <span className="text-sm font-normal text-neutral-400">px</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-purple-400 pt-3 border-t border-neutral-800">
                  <span>● Zero Drift Guarantee</span>
                  <span className="text-purple-300 font-bold">STRICT TOKENS</span>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              Click &quot;TypeScript Code&quot; or &quot;Vector Geometry&quot; above to inspect the source engineering behind this module.
            </p>
          </div>
        )}

        {viewMode === 'code' && (
          <div className="relative animate-in fade-in duration-200">
            <button
              type="button"
              onClick={copyCurrent}
              className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy TypeScript'}</span>
            </button>
            <pre className="p-4 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto border border-neutral-800 leading-relaxed">
              <code>{sampleTypeScriptCode}</code>
            </pre>
          </div>
        )}

        {viewMode === 'vector' && (
          <div className="relative animate-in fade-in duration-200">
            <button
              type="button"
              onClick={copyCurrent}
              className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy SVG Spec'}</span>
            </button>
            <pre className="p-4 rounded-xl bg-neutral-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-neutral-800 leading-relaxed">
              <code>{sampleVectorSpec}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Footer link to lab */}
      <div className="px-5 py-3 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-950/80 flex items-center justify-between text-xs font-mono">
        <span className="text-neutral-500 dark:text-neutral-400">
          Integrated directly into Next.js 15 App Router & Edge Runtime
        </span>
        <Link
          href="/playground"
          className="inline-flex items-center gap-1 text-blue-600 dark:text-purple-400 hover:underline font-semibold"
        >
          <span>Open Full Token Playground</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
