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
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SITE_URL, constructMetadata, generateFAQSchema } from '@/lib/seo';
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
  HelpCircle,
  Linkedin,
  Github,
  Twitter,
  ArrowUpRight,
  Code2,
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

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return constructMetadata({
    title: post.seoTitle || `${post.title} — TechUsar`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.seoKeywords,
    ogImage: post.coverImage,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, post.category);
  const jsonLd = generateBlogPostingSchema(post);
  const currentUrl = `${SITE_URL}/blog/${post.slug}`;
  const faqSchema = post.faqs ? generateFAQSchema(post.faqs) : null;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumbs Navigation */}
      <div className="pt-2">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.category, href: `/blog?cat=${encodeURIComponent(post.category)}` },
            { label: post.title },
          ]}
        />
      </div>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/60 dark:border-blue-900/60">
            {post.category}
          </span>
          {post.primaryKeyword && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              Focus: {post.primaryKeyword}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
          {post.title}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        {/* Author Byline */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              HMU
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-950 dark:text-white flex items-center gap-1.5">
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.author.name}
                </Link>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  Author
                </span>
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
              className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors flex items-center gap-1.5"
              title="Share on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share WhatsApp</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-mono hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
              title="Share on X (Twitter)"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share on X</span>
            </a>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-[300px] sm:h-[440px] rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xs">
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
      <div className="space-y-12 text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans text-base sm:text-lg">
        {post.sections.map((section, idx) => (
          <section key={idx} className="space-y-4 pt-2">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                {section.heading}
              </h2>
              {section.subheading && (
                <p className="text-sm font-mono text-blue-600 dark:text-blue-400 font-medium">
                  {section.subheading}
                </p>
              )}
            </div>

            <div className="space-y-4 pt-1">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {section.codeSnippet && (
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100 p-5 font-mono text-xs overflow-x-auto my-4">
                <div className="text-neutral-500 text-[10px] uppercase pb-2 border-b border-neutral-800 mb-3 flex items-center justify-between">
                  <span>{section.codeSnippet.language}</span>
                  <span>Production Code</span>
                </div>
                <pre>{section.codeSnippet.code}</pre>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Related Services & Internal Linking Bar */}
      {post.relatedServices && post.relatedServices.length > 0 && (
        <div className="p-6 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recommended TechUsar Services for this Topic</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {post.relatedServices.map((service, sIdx) => (
              <Link
                key={sIdx}
                href={service.href}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-bold text-neutral-900 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-2xs"
              >
                <span>{service.title}</span>
                <ArrowRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Article FAQ Section */}
      {post.faqs && post.faqs.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Questions Answered in this Guide
            </h2>
          </div>

          <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
            {post.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="py-5 space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
                  {faq.q}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Author Box: Hafiz Muhammad Usman */}
      <section className="p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
            HMU
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                Hafiz Muhammad Usman
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
                Founder &amp; Dual-Craft Practitioner
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Based in Kharadar Lyari, Karachi, Pakistan. 5+ years crafting Swiss vector brand systems and 2+ years engineering full-stack Next.js, C# .NET, and custom AI WhatsApp automation bots. Hafiz-e-Quran practicing disciplined engineering.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/hafiz-muhammad-usman-514888397/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/techusar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://x.com/techusar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>X (Twitter)</span>
            </a>
          </div>

          <Link
            href="/about"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Read full biography &amp; story</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* Direct Conversion CTA Banner */}
      <section className="p-8 sm:p-10 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-950 text-white dark:bg-neutral-900/90 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold block">
            WORK DIRECTLY WITH HAFIZ MUHAMMAD USMAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Build Your Project or Automation Bot?
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
            Whether you need a custom WhatsApp sales bot, complete brand identity, or a production Next.js 15 web platform, let&apos;s discuss scope and timeline today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20I%20read%20your%20article%20and%20want%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold tracking-wide transition-all shadow-md active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp (+92 331 8917330)</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 text-xs font-mono font-bold tracking-wide transition-all"
          >
            <span>Submit Detailed Project Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Tags */}
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
        <div className="text-xs font-mono uppercase text-neutral-400">Indexed Topics:</div>
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
        <div className="pt-10 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
          <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
            More Deep Dives from the TechUsar Journal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group block p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-blue-500/40 space-y-3 transition-colors shadow-2xs"
              >
                <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-medium">
                  {rel.category}
                </div>
                <h4 className="text-sm font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-snug">
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
