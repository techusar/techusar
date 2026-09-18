import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articlesData } from '@/data/articles';
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found — TechUsar' };

  const articleUrl = `https://techusar.dev/articles/${article.slug}`;

  return {
    title: `${article.title} — TechUsar`,
    description: article.excerpt,
    keywords: [
      article.category,
      'TechUsar essays',
      'Design engineering',
      'Hafiz Muhammad Usman articles',
      article.title,
    ],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: `${article.title} — TechUsar`,
      description: article.excerpt,
      url: articleUrl,
      type: 'article',
      publishedTime: article.date,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const otherArticles = articlesData.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Articles & Essays</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-6 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-purple-950/60 text-blue-600 dark:text-purple-400 font-semibold border border-blue-200/60 dark:border-purple-800/60">
            {article.category}
          </span>
          <span className="text-neutral-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.date}</span>
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-mono text-xs font-bold shadow-xs">
              TU
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-950 dark:text-white">TechUsar</div>
              <div className="text-[11px] text-neutral-500 font-mono">Graphic Designer & Full-Stack Developer</div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body Content */}
      <div className="space-y-6 text-neutral-800 dark:text-neutral-200 text-base sm:text-lg leading-relaxed max-w-none">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-neutral-500 mr-2">TOPICS:</span>
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Next Readings */}
      <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          CONTINUE READING
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherArticles.map((other) => (
            <Link
              key={other.slug}
              href={`/articles/${other.slug}`}
              className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-purple-500 bg-neutral-50/50 dark:bg-neutral-900/30 transition-all space-y-2 block"
            >
              <div className="text-[10px] font-mono text-blue-600 dark:text-purple-400 font-semibold">
                {other.category}
              </div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-2">
                {other.title}
              </h4>
              <div className="text-xs text-neutral-500 flex items-center justify-between pt-1">
                <span>{other.readTime}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
