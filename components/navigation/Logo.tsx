'use client';

import React from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/components/providers/SiteDataProvider';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className = '', showWordmark = true }: LogoProps) {
  const { settings } = useSiteSettings();
  const customLogo = settings.logoUrl || null;
  const brandName = settings.brandName || 'TechUsar';

  return (
    <Link
      href="/"
      id="techusar-brand-logo"
      className={`group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg ${className}`}
      aria-label={`${brandName} Home`}
    >
      {/* Brand Icon or Custom Logo */}
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-600 text-white font-mono text-xs font-bold tracking-tighter shadow-xs transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] select-none shrink-0 border border-white/20 dark:border-white/10">
        {customLogo ? (
          // Custom uploaded logo
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={customLogo}
            alt={`${brandName} Logo`}
            className="w-full h-full object-contain p-0.5"
          />
        ) : (
          // Geometric TU Monogram
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 drop-shadow-xs"
            aria-hidden="true"
          >
            {/* T bar & stem */}
            <path
              d="M4 6H12M8 6V18"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* U geometric curve */}
            <path
              d="M14 8V14C14 16.2091 15.7909 18 18 18C20.2091 18 22 14.5 22 14V8"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Subtle Online Status Dot */}
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-950 animate-pulse"
          title="System Operational"
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col text-left shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold tracking-tight text-sm sm:text-[15px] leading-tight text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {brandName}
            </span>
            <span className="hidden md:inline-block px-1 py-0.2 rounded text-[9px] font-mono font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-700/80">
              dev
            </span>
          </div>
          <span className="hidden sm:block text-[10px] tracking-wider font-mono text-neutral-500 dark:text-neutral-400">
            {settings.tagline ? settings.tagline.split('|')[0].trim() : 'Full-Stack & Design'}
          </span>
        </div>
      )}
    </Link>
  );
}

