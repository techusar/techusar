import React from 'react';
import Link from 'next/link';
import { articlesData } from '@/data/articles';
import { BookOpen, ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles & Design Engineering Essays — TechUsar',
  description:
    'Thought leadership on Swiss typography, zero-drift design systems, full-stack architecture, and edge creative marketplaces by TechUsar.',
  keywords: [
    'TechUsar essays',
    'Design engineering articles',
    'Swiss typography',
    'Design systems articles',
    'Web architecture essays',
  ],
  alternates: {
    canonical: 'https://techusar.dev/articles',
  },
  openGraph: {
    title: 'Articles & Design Engineering Essays — TechUsar',
    description:
      'Essays on the intersection of Swiss graphic discipline and modern software engineering.',
    url: 'https://techusar.dev/articles',
  },
};

export default function ArticlesPage() {
  const articlesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Articles & Design Engineering Essays — TechUsar',
    description:
      'Essays on Swiss typography, zero-drift design systems, and full-stack engineering.',
    url: 'https://techusar.dev/articles',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articlesData.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          url: `https://techusar.dev/articles/${article.slug}`,
          author: {
            '@type': 'Person',
            name: 'Hafiz Muhammad Usman',
          },
        },
      })),
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesJsonLd) }}
      />

      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-purple-950/50 border border-blue-200 dark:border-purple-800/60 text-xs font-mono text-blue-600 dark:text-purple-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Design & Engineering Journal</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          Writings & Technical Essays
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Reflections on the intersection of Swiss graphic discipline, vector typography, strict TypeScript engineering, and edge-rendered digital products.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        {articlesData.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group block p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/50 hover:border-blue-500/40 dark:hover:border-purple-500/40 shadow-xs hover:shadow-md transition-all duration-300 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-500">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-purple-950/60 text-blue-600 dark:text-purple-400 font-semibold border border-blue-200/60 dark:border-purple-800/60">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </span>
              </div>

              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
              {article.title}
            </h2>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                <span>Read Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
