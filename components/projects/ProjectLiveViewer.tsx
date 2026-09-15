'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  RefreshCw,
  Sparkles,
  Download,
  MessageCircle,
  Maximize2,
  Code2,
} from 'lucide-react';

interface ProjectLiveViewerProps {
  title: string;
  liveUrl?: string;
  coverImage: string;
  whatsappNumber?: string;
}

export function ProjectLiveViewer({
  title,
  liveUrl,
  coverImage,
  whatsappNumber = '923318917330',
}: ProjectLiveViewerProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'image'>('preview');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello Hafiz Muhammad Usman (TechUsar), I would like to download the free template and source code for "${title}" (Live URL: ${liveUrl || 'Portfolio'}). Please share the repository files with me.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const reloadIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[390px] h-[680px]';
      case 'tablet':
        return 'max-w-[768px] h-[680px]';
      case 'desktop':
      default:
        return 'w-full h-[640px] lg:h-[720px]';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'preview'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            Live Web App
          </button>
          <button
            type="button"
            onClick={() => setViewMode('image')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'image'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            Static Cover
          </button>
        </div>

        {/* Device Switcher (Only in preview mode) */}
        {viewMode === 'preview' && (
          <div className="hidden sm:flex items-center gap-1 bg-neutral-800/90 p-1 rounded-xl border border-neutral-700">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              title="Desktop View"
              className={`p-1.5 rounded-lg transition-colors ${
                device === 'desktop' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDevice('tablet')}
              title="Tablet View"
              className={`p-1.5 rounded-lg transition-colors ${
                device === 'tablet' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              title="Mobile View"
              className={`p-1.5 rounded-lg transition-colors ${
                device === 'mobile' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-neutral-700 mx-1" />
            <button
              type="button"
              onClick={reloadIframe}
              title="Reload Frame"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center gap-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-100 transition-colors"
            >
              <span>Open Netlify App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Download Free Template</span>
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950 flex items-center justify-center p-2 sm:p-4 min-h-[480px]">
        {viewMode === 'preview' && liveUrl ? (
          <div
            className={`w-full ${getDeviceWidth()} mx-auto transition-all duration-300 rounded-xl overflow-hidden shadow-2xl border border-neutral-800 bg-white relative flex flex-col`}
          >
            {/* Browser Header Bar */}
            <div className="h-8 bg-neutral-900 border-b border-neutral-800 flex items-center px-3 justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="px-3 py-0.5 rounded-md bg-neutral-950 text-neutral-400 text-[11px] font-mono truncate max-w-[280px]">
                {liveUrl}
              </div>
              <div className="w-8" />
            </div>

            {/* Iframe */}
            <iframe
              key={iframeKey}
              src={liveUrl}
              title={`${title} Live Preview`}
              className="w-full flex-1 border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-16/9 rounded-xl overflow-hidden">
            <Image
              src={coverImage}
              alt={`${title} Preview Cover`}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>

      {/* WhatsApp Download Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-blue-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FREE TEMPLATE & SOURCE CODE AVAILABLE</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300">
            Want to use this full project template, UI components, or Next.js code for your own project? Contact on WhatsApp to get the instant download link.
          </p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md hover:shadow-emerald-900/40"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Get Free Template via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
