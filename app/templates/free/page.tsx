import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ThemesClient } from '@/components/themes/ThemesClient';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { themes } from '@/data/themes';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Free Website Templates & Open Source Next.js Starters | TechUsar',
  description:
    'Download 100% free, open-source Next.js 15 website templates under the MIT License. Clean minimal portfolios, waitlist landing pages, and developer starters created by Hafiz Muhammad Usman.',
  path: '/templates/free',
  keywords: [
    'Free website templates',
    'Free Next.js 15 template',
    'Open source portfolio template',
    'Free landing page template',
    'Next.js MIT license starter',
    'TechUsar free templates',
  ],
});

export default function FreeTemplatesPage() {
  const freeThemes = themes.filter((t) => t.isFree);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Next.js Website Templates',
    description: 'Free open source website templates and developer starters by TechUsar.',
    url: `${SITE_URL}/templates/free`,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Templates', href: '/templates' },
          { label: 'Free Templates', href: '/templates/free' },
        ]}
      />

      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
          <Heart className="w-3.5 h-3.5 fill-emerald-500" />
          <span>100% FREE &amp; OPEN SOURCE // MIT LICENSE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
          Free Website Templates &amp; Open Source Starters
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
          High-performance, production-ready website templates completely free for personal,
          educational, and commercial client projects. Built with Next.js 15, TypeScript, and
          Tailwind CSS.
        </p>

        {/* Filter Navigation */}
        <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <Link
            href="/templates"
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 transition-colors"
          >
            All Templates ({themes.length})
          </Link>
          <Link
            href="/templates/free"
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold"
          >
            Free Templates ({freeThemes.length})
          </Link>
          <Link
            href="/templates/premium"
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-blue-500 transition-colors"
          >
            Premium Templates ({themes.length - freeThemes.length})
          </Link>
        </div>
      </div>

      {/* Grid of Free Themes */}
      <ThemesClient initialThemes={freeThemes} />

      {/* License Assurance */}
      <section className="p-6 sm:p-8 rounded-2xl border border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>PERMISSIVE MIT LICENSE</span>
        </div>
        <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
          Can I use these free templates for commercial client work?
        </h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
          Yes! All free templates in the TechUsar repository are released under the MIT license. You
          are free to use, modify, distribute, and build client websites or commercial products with
          zero royalty requirements.
        </p>
      </section>
    </div>
  );
}
