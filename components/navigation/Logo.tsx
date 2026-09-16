/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/components/providers/SiteDataProvider';
import logo from '@/public/Landscap TechUsar 2.png';
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
      <>
        <img
          src={logo.src}
          alt={`${logo.src} Logo`}
          className="w-full h-[60px] object-contain p-0.5"
        />

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
      </>
    </Link>
  );
}

