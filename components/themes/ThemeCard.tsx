'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Theme } from '@/types';
import { Eye, ArrowRight, Star, Smartphone, Laptop } from 'lucide-react';

interface ThemeCardProps {
  theme: Theme;
  onPreview: (theme: Theme) => void;
}

export function ThemeCard({ theme, onPreview }: ThemeCardProps) {
  return (
    <div
      id={`theme-card-${theme.slug}`}
      className="group flex flex-col rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
    >
      {/* Top Preview Frame */}
      <div className="relative w-full aspect-16/10 overflow-hidden bg-neutral-100 dark:bg-neutral-950">
        <Image
          src={theme.previewImage}
          alt={theme.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Free / Premium Badge */}
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider backdrop-blur-xs shadow-xs ${
              theme.isFree
                ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                : 'bg-neutral-900/80 text-white dark:bg-black/80'
            }`}
          >
            {theme.isFree ? 'Free Template' : `Premium — $${theme.price}`}
          </span>

          {/* Category & Responsive Indicator */}
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 text-[10px] font-mono flex items-center gap-1 shadow-xs">
              <Laptop className="w-3 h-3" />
              <Smartphone className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Quick Action Overlay on hover */}
        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4">
          <button
            type="button"
            onClick={() => onPreview(theme)}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-white text-neutral-950 hover:bg-neutral-100 transition-colors shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Preview</span>
          </button>
          <Link
            href={`/themes/${theme.slug}`}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-neutral-900/90 text-white hover:bg-neutral-900 transition-colors shadow-lg flex items-center gap-1.5"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {theme.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{theme.rating.toFixed(2)}</span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white leading-snug">
            <Link
              href={`/themes/${theme.slug}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {theme.name}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {theme.description}
          </p>
        </div>

        {/* Bottom Tech Stack & Action Links */}
        <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {theme.technology.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {tech}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onPreview(theme)}
            className="text-xs font-semibold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 shrink-0"
          >
            <span>Preview</span>
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
