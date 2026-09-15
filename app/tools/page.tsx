import React from 'react';
import { ToolsHub } from '@/components/tools/ToolsHub';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { toolsData } from '@/data/tools-data';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, Wrench, ShieldCheck, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Free Developer & Accountant Online Tools | TechUsar Suite',
  description:
    'Free client-side online tools for web developers, designers, accountants, and businesses. Features instant Invoice & Receipt Generator, Profit Margin Calculator, Loan EMI Calculator, Freelance Rate Calculator, JSON Formatter, Base64 Converter, CSS Box Shadow Generator, and UUID Generator.',
  path: '/tools',
  keywords: [
    'Free invoice generator',
    'Accounting tools online',
    'Profit margin calculator',
    'Loan EMI calculator',
    'JSON formatter online',
    'Base64 encoder decoder',
    'UUID generator',
    'TechUsar developer tools',
    'Freelance rate calculator',
    'CSS box shadow generator',
  ],
});

export default function ToolsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TechUsar Online Tools Suite',
    description:
      'Collection of free web developer, accounting, and business calculation tools.',
    url: `${SITE_URL}/tools`,
    hasPart: toolsData.map((t) => ({
      '@type': 'WebApplication',
      name: t.name,
      url: `${SITE_URL}/tools/${t.slug}`,
      applicationCategory:
        t.category === 'developer' ? 'DeveloperApplication' : 'BusinessApplication',
      operatingSystem: 'Any',
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }]} />

      {/* Hero Title */}
      <div className="space-y-3 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-xs font-mono text-blue-600 dark:text-blue-400">
          <Wrench className="w-3.5 h-3.5" />
          <span>100% Free Client-Side Utilities // Zero Sign-up Required</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          Developer &amp; Accountant Tools Suite
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          High-performance, privacy-first tools designed to streamline daily financial, accounting,
          and software engineering workflows. Built by Hafiz Muhammad Usman with strict web
          standards and zero server tracking.
        </p>
      </div>

      {/* Main Interactive Tools Hub */}
      <ToolsHub />

      {/* Dedicated Tool Guide Index for Search Engines & Users */}
      <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800 space-y-5">
        <div className="space-y-1">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
            DEEP GUIDES &amp; DOCUMENTATION
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Comprehensive Tool Guides &amp; Specifications
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Each tool includes full documentation, mathematical formulas, JSON syntax validation
            tips, code examples, and frequently asked questions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {toolsData.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-blue-500 dark:hover:border-blue-500 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1">
                  {tool.tag}
                </span>
                <h3 className="font-bold text-sm text-neutral-950 dark:text-white group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                  {tool.metaDescription}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>View Guide &amp; Tool</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
