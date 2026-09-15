import React from 'react';
import { DesignSandbox } from '@/components/playground/DesignSandbox';
import { Palette, Sparkles, Terminal, Code2, Layers, Download } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System Playground & Token Lab — TechUsar',
  description:
    'Test, tweak, and preview TechUsar’s signature Blue, Purple, and Obsidian Black design token architecture in real-time. Export CSS variables and Tailwind classes directly.',
  keywords: [
    'Design system playground',
    'Tailwind token lab',
    'UI components preview',
    'CSS variable generator',
    'TechUsar design sandbox',
  ],
  alternates: {
    canonical: 'https://techusar.dev/playground',
  },
  openGraph: {
    title: 'Design System Playground & Token Lab — TechUsar',
    description:
      'Interactive design token sandbox with real-time UI previews and CSS code export.',
    url: 'https://techusar.dev/playground',
  },
};

export default function PlaygroundPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-xs font-mono text-blue-600 dark:text-purple-400">
          <Palette className="w-3.5 h-3.5" />
          <span>Interactive Token Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
          Design System & UI Sandbox
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Experiment with TechUsar&apos;s signature <strong className="text-blue-600 dark:text-blue-400">Electric Blue</strong>, <strong className="text-purple-600 dark:text-purple-400">Cyber Purple</strong>, and <strong className="text-neutral-900 dark:text-white">Obsidian Black</strong> color spaces. Adjust corner geometry and preview responsive component specimens live.
        </p>
      </div>

      {/* Sandbox Component */}
      <DesignSandbox />

      {/* Technical Philosophy Note */}
      <div className="p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500">
          <Terminal className="w-4 h-4 text-blue-500" />
          <span>ZERO-DRIFT SYSTEM TOKENS</span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Every token in TechUsar&apos;s UI system is defined as a mathematical ratio. Border radiuses follow strict concentric nesting equations, color scales maintain high contrast thresholds across both Light and Dark canvases, and micro-interactions adhere to physical spring constants for instantaneous responsiveness.
        </p>
      </div>
    </div>
  );
}
