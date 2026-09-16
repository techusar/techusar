import React from 'react';
import type { Metadata } from 'next';
import { ThemesClient } from '@/components/themes/ThemesClient';
import { themes } from '@/data/themes';
import { ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Commercial Themes & Next.js Website Templates — TechUsar',
  description:
    'Explore production-ready website templates, developer portfolios, SaaS dashboards, and landing page engines engineered with Next.js 15, TypeScript, and Tailwind CSS by Hafiz Muhammad Usman.',
  keywords: [
    'Next.js themes',
    'Website templates Pakistan',
    'SaaS dashboard template',
    'Portfolio templates',
    'Commercial web themes',
    'TechUsar themes',
  ],
  alternates: {
    canonical: 'https://techusar.com/themes',
  },
  openGraph: {
    title: 'Commercial Themes & Next.js Website Templates — TechUsar',
    description:
      'Engineered for speed, SEO, and visual precision. Production-ready web themes with instant preview.',
    url: 'https://techusar.com/themes',
  },
};

export default function ThemesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Production-Grade Digital Marketplace</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Commercial Themes &amp; Templates
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Bespoke web architectures engineered with Next.js 15, TypeScript, and Tailwind CSS. Built to launch faster with zero design compromise.
        </p>
      </div>

      <ThemesClient initialThemes={themes} />
    </div>
  );
}
