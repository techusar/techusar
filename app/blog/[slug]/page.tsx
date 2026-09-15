import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  generateBlogPostingSchema,
} from '@/lib/blog';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  Sparkles,
  Bot,
  MessageSquare,
  ArrowRight,
  User,
  CheckCircle2,
} from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | TechUsar',
    };
  }

  const postUrl = `https://techusar.dev/blog/${post.slug}`;

  return {
    title: `${post.title} — TechUsar`,
    description: post.excerpt,
    keywords: post.seoKeywords,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${post.title} — TechUsar`,
      description: post.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: '2026-03-01T00:00:00+05:00',
      authors: [post.author.name],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, post.category);
  const jsonLd = generateBlogPostingSchema(post);
  const currentUrl = `https://techusar.dev/blog/${post.slug}`;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to all articles</span>
      </Link>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/60 dark:border-blue-900/60">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        {/* Author Byline */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              U
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-950 dark:text-white">
                {post.author.name}
              </div>
              <div className="text-xs text-neutral-500">{post.author.role}</div>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - Read more on TechUsar: ${currentUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors flex items-center gap-1"
              title="Share on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share WhatsApp</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-mono hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              title="Share on X (Twitter)"
            >
              Share on X
            </a>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Main Content Sections */}
      <div className="space-y-10 text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans text-base sm:text-lg">
        {post.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white pt-4">
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Custom AI Agent & Bot Service CTA Banner */}
      <div className="my-12 p-8 rounded-3xl border-2 border-blue-500/30 bg-linear-to-br from-blue-50 via-indigo-50/50 to-white dark:from-blue-950/40 dark:via-neutral-900 dark:to-neutral-950 space-y-6">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4" />
          <span>Need Custom AI Agents or Automation Bots?</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
            Hum Chote Mote Intelligent Bots Aur Automation Agents Banate Hain!
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            WhatsApp automated ordering, Telegram notifiers, 24/7 AI customer care chatbots, web scrapers, aur daily workflow automation. Chota bot ho ya complex business software — humse rabta karein aur apna solution live karwayen!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20Maine%20aapka%20blog%20parha%20aur%20mujhe%20Custom%20AI%20Agent%20/%20Bot%20develop%20karwana%20hai."
            target="_blank"
            rel="noopener noreferrer"
            data-track="blog_detail_whatsapp"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp (0331-8917330)</span>
          </a>

          <Link
            href="/contact?service=ai-agents"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-bold shadow-xs hover:opacity-90 transition-all"
          >
            <span>Discuss Bot Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
        <div className="text-xs font-mono uppercase text-neutral-400">Related Tags:</div>
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-mono"
            >
              <Tag className="w-3 h-3 text-neutral-400" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
          <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
            More from the TechUsar Journal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group block p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-blue-500/40 space-y-2 transition-colors"
              >
                <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-medium">
                  {rel.category}
                </div>
                <h4 className="text-sm font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                  {rel.title}
                </h4>
                <div className="text-[11px] text-neutral-400 font-mono">{rel.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
