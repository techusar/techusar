import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ThemesClient } from '@/components/themes/ThemesClient';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { themes } from '@/data/themes';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import { ShoppingBag, Sparkles, Tag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Website Templates & Production-Ready Next.js Starters | TechUsar',
  description:
    'Explore production-ready website templates, developer portfolios, SaaS dashboards, and landing page engines engineered with Next.js 15, TypeScript, and Tailwind CSS by Hafiz Muhammad Usman. Free open-source and premium options.',
  path: '/templates',
  keywords: [
    'Website templates',
    'Next.js 15 templates',
    'Free website templates',
    'Premium Next.js themes',
    'SaaS website template',
    'Portfolio template Next.js',
    'E-commerce template',
    'Tailwind CSS templates',
  ],
});

export default function TemplatesHubPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TechUsar Website Templates Marketplace',
    description:
      'Collection of free and premium production-ready Next.js 15 and Tailwind CSS website templates.',
    url: `${SITE_URL}/templates`,
    hasPart: themes.map((theme) => ({
      '@type': 'Product',
      name: theme.name,
      url: `${SITE_URL}/templates/${theme.slug}`,
      description: theme.description,
      image: theme.previewImage,
      offers: {
        '@type': 'Offer',
        price: theme.isFree ? '0' : theme.price.toString(),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    })),
  };

  const freeCount = themes.filter((t) => t.isFree).length;
  const premiumCount = themes.filter((t) => !t.isFree).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumbs items={[{ label: 'Templates', href: '/templates' }]} />

      {/* Ecosystem Subdomain Announcement Card */}
      <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-blue-50/40 dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-blue-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase">
              Official Hub
            </span>
            <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
              tamplates.techusar.com
            </span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Official production-ready Next.js 15 and Tailwind CSS starters, themes &amp; component kits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href="https://tamplates.techusar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5"
          >
            <span>Open tamplates.techusar.com</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://tools.techusar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-blue-500 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
          >
            <span>tools.techusar.com</span>
          </a>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>PRODUCTION-GRADE DIGITAL TEMPLATES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
          Website Templates &amp; Production Starters
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
          Clean, accessible website architectures engineered with Next.js 15 App Router,
          TypeScript, and Tailwind CSS. Built to launch faster without sacrificing visual craft,
          performance, or SEO standards.
        </p>

        {/* Category Quick Filter Links */}
        <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <Link
            href="/templates"
            className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold"
          >
            All Templates ({themes.length})
          </Link>
          <Link
            href="/templates/free"
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-emerald-500 transition-colors inline-flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Free Templates ({freeCount})</span>
          </Link>
          <Link
            href="/templates/premium"
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-blue-500 transition-colors inline-flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Premium Templates ({premiumCount})</span>
          </Link>
        </div>
      </div>

      {/* Interactive Grid & Filter System */}
      <ThemesClient initialThemes={themes} />

      {/* Why TechUsar Templates Guide */}
      <section className="pt-12 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Why Choose TechUsar Website Templates?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
            <h3 className="font-bold text-neutral-950 dark:text-white text-base">
              Modern Next.js 15 &amp; React 19
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Engineered exclusively on modern App Router architecture with React Server
              Components, eliminating obsolete dependencies and bloated bundles.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
            <h3 className="font-bold text-neutral-950 dark:text-white text-base">
              Zero AI Slop &amp; Generic Clichés
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every design is crafted by a designer with 5+ years of vector branding experience.
              Natural negative space, strict Swiss typography scales, and subtle animations.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
            <h3 className="font-bold text-neutral-950 dark:text-white text-base">
              Production-Grade SEO Pre-Wired
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every template ships with dynamic OpenGraph metadata, valid JSON-LD schemas, semantic
              heading structures, and sub-second Core Web Vitals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
