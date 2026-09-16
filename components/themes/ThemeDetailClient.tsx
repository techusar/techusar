'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Theme } from '@/types';
import { ThemeLivePreviewModal } from '@/components/themes/ThemeLivePreviewModal';
import { PurchaseModal } from '@/components/themes/PurchaseModal';
import {
  ArrowLeft,
  Eye,
  Download,
  Sparkles,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  Terminal,
  ExternalLink,
  Layers,
  Star,
  Sun,
  Moon,
} from 'lucide-react';

interface ThemeDetailClientProps {
  theme: Theme;
}

export function ThemeDetailClient({ theme }: ThemeDetailClientProps) {
  // Preview Switcher state
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewThemeMode, setPreviewThemeMode] = useState<'light' | 'dark'>('light');

  // Modals
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const getActiveScreenshot = () => {
    switch (device) {
      case 'mobile':
        return theme.screenshots.mobile;
      case 'tablet':
        return theme.screenshots.tablet;
      case 'desktop':
      default:
        return theme.screenshots.desktop;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Back to Marketplace */}
      <div>
        <Link
          href="/themes"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Theme Marketplace</span>
        </Link>
      </div>

      {/* Hero Info Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
              {theme.category}
            </span>
            <span className="text-xs font-mono text-neutral-400">•</span>
            <div className="flex items-center gap-1 text-xs text-neutral-500 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{theme.rating.toFixed(2)} rating ({theme.downloadsCount} downloads)</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
            {theme.name}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
            {theme.tagline}
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            {theme.description}
          </p>
        </div>

        {/* Pricing & CTA Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/60 shadow-xs space-y-5">
          <div>
            <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase">License Price</div>
            <div className="text-3xl font-bold font-mono text-neutral-950 dark:text-white mt-1">
              {theme.isFree ? 'Free (MIT)' : `$${theme.price} USD`}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              {theme.license}
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => setPurchaseModalOpen(true)}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              {theme.isFree ? (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Free Source Code</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Purchase Commercial License</span>
                </>
              )}
            </button>

            <button
              onClick={() => setPreviewModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Open Fullscreen Preview</span>
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800/80 space-y-1 text-[11px] text-neutral-500 font-mono">
            <div>Version: v{theme.version}</div>
            <div>Updated: {theme.releaseDate}</div>
            <div>Framework: Next.js 15 App Router</div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE THEME PREVIEW MODE (Desktop / Tablet / Mobile + Light/Dark) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              Interactive Viewport Preview
            </h2>
            <p className="text-xs text-neutral-500">
              Inspect responsiveness across standard breakpoints.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Viewport Switcher */}
            <div className="flex items-center p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-xs">
              <button
                onClick={() => setDevice('desktop')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  device === 'desktop'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  device === 'tablet'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  device === 'mobile'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            {/* Dark / Light Toggle for Preview */}
            <button
              onClick={() => setPreviewThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))}
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              title={`Toggle preview theme (currently ${previewThemeMode})`}
            >
              {previewThemeMode === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>
          </div>
        </div>

        {/* Viewport Frame */}
        <div className="w-full bg-neutral-100/70 dark:bg-neutral-900/50 p-4 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 flex justify-center overflow-x-auto">
          <div
            className={`transition-all duration-300 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden bg-white dark:bg-neutral-950 ${
              device === 'mobile'
                ? 'w-full max-w-[380px]'
                : device === 'tablet'
                ? 'w-full max-w-[768px]'
                : 'w-full max-w-5xl'
            }`}
          >
            {/* Frame Topbar */}
            <div className="h-8 px-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400">
                techusar.com/{theme.slug}
              </span>
              <button
                onClick={() => setPreviewModalOpen(true)}
                className="text-[10px] font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Fullscreen</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Frame Image Canvas */}
            <div className="relative w-full aspect-16/10 bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={getActiveScreenshot()}
                alt={`${theme.name} ${device} screenshot`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                referrerPolicy="no-referrer"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Breakdown & Included Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
            Architecture & Features
          </h2>
          <div className="space-y-2.5">
            {theme.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
            Included Layouts & Sections
          </h2>
          <div className="space-y-2.5">
            {theme.sectionsIncluded.map((sec, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <Layers className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{sec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Specifications Matrix */}
      <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
          Technical Stack & Dependencies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div>
            <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">FRAMEWORK</div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white mt-1">
              {theme.techStack.framework}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">STYLING</div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white mt-1">
              {theme.techStack.styling}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">ANIMATIONS</div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white mt-1">
              {theme.techStack.animations}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">ICONOGRAPHY</div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white mt-1">
              {theme.techStack.icons}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">TYPE SAFETY</div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white mt-1">
              {theme.techStack.typeSafety}
            </div>
          </div>
        </div>
      </div>

      {/* Quickstart Installation Guide */}
      <div className="space-y-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <h2 className="text-xl font-bold text-neutral-950 dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-blue-500" />
          <span>Quickstart & Setup Instructions</span>
        </h2>
        <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono text-xs space-y-2">
          <div className="text-neutral-500"># 1. Unzip archive and install dependencies</div>
          <div className="text-emerald-400">npm install</div>
          <div className="text-neutral-500 pt-2"># 2. Run development server on port 3000</div>
          <div className="text-emerald-400">npm run dev</div>
          <div className="text-neutral-500 pt-2"># 3. Build optimized production bundle</div>
          <div className="text-emerald-400">npm run build</div>
        </div>
      </div>

      {/* Modals */}
      <ThemeLivePreviewModal
        theme={theme}
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        onPurchase={() => setPurchaseModalOpen(true)}
      />

      <PurchaseModal
        theme={theme}
        isOpen={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
      />
    </div>
  );
}
