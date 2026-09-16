import React from 'react';
import type { Metadata } from 'next';
import { getAllBlogPosts, getBlogCategories } from '@/lib/blog';
import { BlogListClient } from '@/components/blog/BlogListClient';
import { BookOpen, Sparkles, Bot } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Technical Articles — AI Bots, Web Dev & Design | TechUsar',
  description:
    'Technical articles, tutorials, and guides by Hafiz Muhammad Usman (TechUsar) on Custom AI Agents, Telegram/WhatsApp Bot Development, Next.js 15, Accounting Software, and Graphic Design.',
  keywords: [
    'TechUsar blog',
    'Custom AI Agents',
    'WhatsApp bot developer Karachi',
    'Telegram bot development',
    'Next.js 15 tutorials',
    'Hafiz Muhammad Usman articles',
    'Accounting software Pakistan',
    'Graphic design guides',
  ],
  alternates: {
    canonical: 'https://techusar.com/blog',
  },
  openGraph: {
    title: 'Blog & Technical Articles — AI Bots, Web Dev & Design | TechUsar',
    description:
      'Explore tutorials, guides, and engineering notes on custom AI bots, full-stack systems, and design architecture.',
    url: 'https://techusar.com/blog',
    type: 'website',
    siteName: 'TechUsar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechUsar Blog — AI Agents, Bot Development & Web Engineering',
    description:
      'Tutorials and articles on building custom bots, scalable Next.js apps, and high-conversion graphic design.',
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const categories = getBlogCategories();

  // JSON-LD structured data for Blog
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'TechUsar Blog & Engineering Articles',
    description:
      'Official technical blog and insights on AI Agent development, custom automation bots, Next.js engineering, and graphic design by Hafiz Muhammad Usman.',
    url: 'https://techusar.com/blog',
    author: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      url: 'https://techusar.com/about',
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `https://techusar.com/blog/${post.slug}`,
      datePublished: '2026-03-01',
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-xs font-mono text-blue-600 dark:text-blue-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>TechUsar Knowledge Hub &amp; Blog</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          Articles, Bot Development &amp; Software Guides
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Deep-dives into custom AI agent creation, WhatsApp &amp; Telegram automation bots, production Next.js architecture, and disciplined graphic typography. Directly sourced from active client projects.
        </p>
      </div>

      {/* Interactive Blog List Component */}
      <BlogListClient initialPosts={posts} categories={categories} />
    </div>
  );
}
