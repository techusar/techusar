'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  PenTool,
  Mail,
  Code2,
  BookOpen,
  FileText,
  Languages,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
  Layers,
  HelpCircle,
} from 'lucide-react';

export function AIWorkspaceSection() {
  const workspaceFeatures = [
    {
      title: 'Writing & Text Refinement',
      desc: 'Improve clarity, fix awkward tone, eliminate redundancies, and rewrite drafts for clear communication.',
      icon: PenTool,
      accent: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/50',
      border: 'border-blue-200/70 dark:border-blue-900/50',
      href: 'https://tools.techusar.com/tools/ai-rewriter',
      toolBadge: 'AI Rewriter',
    },
    {
      title: 'Emails & Professional Messages',
      desc: 'Draft courteous client replies, proposal follow-ups, inquiry responses, and respectful customer updates.',
      icon: Mail,
      accent: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
      border: 'border-emerald-200/70 dark:border-emerald-900/50',
      href: 'https://tools.techusar.com/tools/ai-email-writer',
      toolBadge: 'AI Email Writer',
    },
    {
      title: 'Explaining & Debugging Code',
      desc: 'Get step-by-step breakdowns of unfamiliar algorithms, cryptic compiler errors, and syntax mechanisms.',
      icon: Code2,
      accent: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/50',
      border: 'border-purple-200/70 dark:border-purple-900/50',
      href: 'https://tools.techusar.com/tools/ai-code-explainer',
      toolBadge: 'AI Code Explainer',
    },
    {
      title: 'Summarizing Text & Study Notes',
      desc: 'Condense dense academic papers, textbook chapters, and lengthy documentation into structured bullet briefs.',
      icon: FileText,
      accent: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/50',
      border: 'border-amber-200/70 dark:border-amber-900/50',
      href: 'https://tools.techusar.com/tools/ai-text-summarizer',
      toolBadge: 'AI Summarizer',
    },
    {
      title: 'Grammar & Language Assistance',
      desc: 'Identify grammatical flaws, translate between English and Urdu idioms, and refine multilingual phrasing.',
      icon: Languages,
      accent: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/50',
      border: 'border-rose-200/70 dark:border-rose-900/50',
      href: 'https://tools.techusar.com/tools/ai-grammar-fixer',
      toolBadge: 'AI Grammar Fixer',
    },
    {
      title: 'Business & Search Metadata',
      desc: 'Structure search engine snippets, open graph descriptions, and commercial service summaries with ease.',
      icon: Sparkles,
      accent: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/50',
      border: 'border-indigo-200/70 dark:border-indigo-900/50',
      href: 'https://tools.techusar.com/tools/ai-seo-meta-generator',
      toolBadge: 'AI SEO Meta',
    },
  ];

  const companionArticles = [
    {
      title: 'AI Agents vs AI Assistants: What’s the Difference?',
      slug: 'ai-agents-vs-ai-assistants',
      category: 'AI & Automation',
      readTime: '7 min read',
    },
    {
      title: 'How to Use AI Tools for Studying and Everyday Productivity',
      slug: 'how-to-use-ai-tools-for-studying-and-productivity',
      category: 'Productivity & Education',
      readTime: '8 min read',
    },
    {
      title: 'Practical AI Tools for Small Businesses: Emails, Proposals, and Daily Tasks',
      slug: 'practical-ai-tools-for-small-business',
      category: 'Business & Automation',
      readTime: '8 min read',
    },
  ];

  return (
    <section id="ai-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/50 dark:from-blue-950/40 dark:via-neutral-900/90 dark:to-neutral-950 p-6 sm:p-10 lg:p-12 space-y-10 shadow-sm">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TechTools AI Suite &bull; tools.techusar.com</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              One AI Workspace for Everyday Tasks
            </h2>

            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Use one convenient workspace for writing, coding help, text improvement, study assistance, translation, and everyday productivity. Powered by Google Gemini 2.5 Flash intelligence directly on the TechTools website.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://tools.techusar.com/ai-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold tracking-wide transition-all shadow-md active:scale-98"
            >
              <span>Try AI Workspace</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="https://tools.techusar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold transition-all shadow-xs"
            >
              <span>Explore Free Online Tools</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Feature Grid: 6 Core Everyday Utilities */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workspaceFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <a
                key={idx}
                href={feat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-all flex flex-col justify-between space-y-4 shadow-2xs backdrop-blur-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${feat.bg} ${feat.accent} ${feat.border} border`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60">
                      {feat.toolBadge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  <span>Launch on TechTools</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Realistic Limitations & Privacy Boundaries Notice */}
        <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-neutral-900 dark:text-white mb-0.5">
                Privacy-First Architecture
              </strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Client-side processing with zero personal data retention, no marketing tracking cookies, and no prompt archiving.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-neutral-900 dark:text-white mb-0.5">
                Fair Usage &amp; Gemini 2.5 Flash
              </strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Powered by fast Google Gemini 2.5 Flash intelligence with generous free session limits per browser. No credit card required.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-neutral-900 dark:text-white mb-0.5">
                Human-in-the-Loop Review
              </strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                AI outputs serve as drafts. Always verify factual claims, prices, binding contracts, and legal terms before sending.
              </p>
            </div>
          </div>
        </div>

        {/* Companion Guides Cluster (Internal Linking for SEO & Traffic Flow) */}
        <div className="relative z-10 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Recommended Guides on AI Workflows &amp; Productivity</span>
            </div>
            <Link
              href="/blog"
              className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline hidden sm:inline-flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {companionArticles.map((art, aIdx) => (
              <Link
                key={aIdx}
                href={`/blog/${art.slug}`}
                className="p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 transition-all group flex flex-col justify-between space-y-2 shadow-2xs"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {art.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {art.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-1">
                  <span>{art.readTime}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                    Read &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
