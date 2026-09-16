'use client';

import React, { useState } from 'react';
import { Theme } from '@/types';
import { X, Monitor, Tablet, Smartphone, Sun, Moon, ExternalLink, Download, Check, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface ThemeLivePreviewModalProps {
  theme: Theme | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (theme: Theme) => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export function ThemeLivePreviewModal({
  theme,
  isOpen,
  onClose,
  onPurchase,
}: ThemeLivePreviewModalProps) {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');

  if (!isOpen || !theme) return null;

  const getFrameWidth = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full max-w-6xl';
    }
  };

  const currentScreenshot = () => {
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
    <div
      id="theme-preview-modal-backdrop"
      className="fixed inset-0 z-50 flex flex-col bg-neutral-950/95 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`${theme.name} live preview`}
    >
      {/* Top Preview Control Bar */}
      <div className="h-auto min-h-16 py-2.5 px-3 sm:px-6 border-b border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-2.5 text-white shrink-0">
        {/* Left: Theme info */}
        <div className="flex items-center gap-2.5">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold tracking-tight line-clamp-1">{theme.name}</h3>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-400 font-mono">
              <span>{theme.category}</span>
              <span>•</span>
              <span className={theme.isFree ? 'text-emerald-400 font-bold' : 'text-blue-400 font-bold'}>
                {theme.isFree ? 'Free Template' : `$${theme.price} USD`}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Device Switcher + Theme Mode Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 order-3 sm:order-2">
          {/* Device toggle */}
          <div className="flex items-center p-0.5 rounded-lg border border-neutral-800 bg-neutral-900">
            <button
              onClick={() => setDevice('desktop')}
              className={`px-2 py-1 rounded-md text-xs flex items-center gap-1.5 transition-colors ${
                device === 'desktop'
                  ? 'bg-neutral-800 text-white font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Desktop View (1200px+)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`px-2 py-1 rounded-md text-xs flex items-center gap-1.5 transition-colors ${
                device === 'tablet'
                  ? 'bg-neutral-800 text-white font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`px-2 py-1 rounded-md text-xs flex items-center gap-1.5 transition-colors ${
                device === 'mobile'
                  ? 'bg-neutral-800 text-white font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Mobile View (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile</span>
            </button>
          </div>

          {/* Light/Dark preview toggle */}
          <button
            onClick={() => setPreviewTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
            className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
            title={`Toggle preview theme (currently ${previewTheme})`}
          >
            {previewTheme === 'light' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 order-2 sm:order-3 ml-auto sm:ml-0">
          <button
            onClick={() => {
              onClose();
              onPurchase(theme);
            }}
            className="px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold bg-white text-neutral-950 hover:bg-neutral-200 transition-colors shadow-sm flex items-center gap-1.5"
          >
            {theme.isFree ? (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Get Free</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Purchase — ${theme.price}</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Preview Canvas Frame */}
      <div className="flex-1 overflow-auto p-2 sm:p-8 flex items-center justify-center bg-neutral-900/50">
        <div
          className={`transition-all duration-300 mx-auto rounded-xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col bg-white dark:bg-neutral-950 w-full ${getFrameWidth()} ${
            previewTheme === 'dark' ? 'dark' : ''
          }`}
          style={{ minHeight: device === 'mobile' ? '560px' : '520px' }}
        >
          {/* Simulated Browser Bar */}
          <div className="h-9 px-3 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="px-3 py-0.5 rounded-md bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-[10px] font-mono text-neutral-500 truncate max-w-[160px] sm:max-w-[240px]">
              https://techusar.com/{theme.slug}
            </div>
            <div className="text-[10px] font-mono text-neutral-400 uppercase">
              {device}
            </div>
          </div>

          {/* Interactive Mock Template View */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            {/* Template Header Simulation */}
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-6">
              <div className="inline-block text-[11px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                {theme.category} TEMPLATE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{theme.name}</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">{theme.tagline}</p>
            </div>

            {/* Template Showcase Image preview */}
            <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-6 bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={currentScreenshot()}
                alt={`${theme.name} ${device} preview`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                referrerPolicy="no-referrer"
                className="object-cover object-top"
              />
            </div>

            {/* Included Sections Pills */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                Included Layouts & Sections
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {theme.sectionsIncluded.map((sec) => (
                  <div
                    key={sec}
                    className="flex items-center gap-2 p-2 rounded-md bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 text-xs text-neutral-700 dark:text-neutral-300"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
