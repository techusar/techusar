import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ThemesClient } from '@/components/themes/ThemesClient';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { themes } from '@/data/themes';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import { Sparkles, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Premium Website Templates & Commercial Next.js Themes | TechUsar',
  description:
    'Explore premium commercial Next.js 15 website templates for SaaS startups, e-commerce brands, digital agencies, and analytics dashboards. Crafted by Hafiz Muhammad Usman.',
  path: '/templates/premium',
  keywords: [
    'Premium website templates',
    'Commercial Next.js themes',
    'SaaS website template',
    'Dashboard template React',
    'E-commerce Next.js theme',
    'TechUsar premium themes',
  ],
});

export default function PremiumTemplatesPage() {
  const premiumThemes = themes.filter((t) => !t.isFree);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Premium Next.js Website Templates',
    description: 'Commercial website templates and production software starters by TechUsar.',
    url: `${SITE_URL}/templates/premium`,
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
          { label: 'Premium Templates', href: '/templates/premium' },
        ]}
      />

      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
          <Award className="w-3.5 h-3.5" />
          <span>PRODUCTION-READY COMMERCIAL ARCHITECTURES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
          Premium Website Templates &amp; SaaS Starters
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
          Engineered for high-growth software products, modern agencies, and luxury brands. Every
          premium template includes multi-tier pricing matrices, interactive component states, and
          free lifetime updates.
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
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-emerald-500 transition-colors"
          >
            Free Templates ({themes.length - premiumThemes.length})
          </Link>
          <Link
            href="/templates/premium"
            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold"
          >
            Premium Templates ({premiumThemes.length})
          </Link>
        </div>
      </div>

      {/* Grid of Premium Themes */}
      <ThemesClient initialThemes={premiumThemes} />

      {/* What is Included in Premium */}
      <section className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-4">
        <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
          What is included in every TechUsar Premium License?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {[
            'Full TypeScript & Next.js 15 Source Code',
            'Commercial Rights for Unlimited Projects',
            'Figma Auto-Layout Vector Files Included',
            'Lifetime Code Updates & Bug Fixes',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
