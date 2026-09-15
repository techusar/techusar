import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { toolsData, getToolBySlug } from '@/data/tools-data';
import { constructMetadata, generateFAQSchema, SITE_URL } from '@/lib/seo';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolRunner } from '@/components/tools/ToolRunner';
import {
  Wrench,
  CheckCircle2,
  Users,
  ListOrdered,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Code2,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return toolsData.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | TechUsar',
    };
  }

  return constructMetadata({
    title: tool.seoTitle,
    description: tool.metaDescription,
    path: `/tools/${tool.slug}`,
    keywords: [
      tool.name,
      tool.shortTitle,
      tool.tag,
      'online tool',
      'free developer tool',
      'TechUsar tools',
    ],
  });
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const faqSchema = generateFAQSchema(tool.faqs);

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    operatingSystem: 'Any',
    applicationCategory:
      tool.category === 'developer' ? 'DeveloperApplication' : 'BusinessApplication',
    url: `${SITE_URL}/tools/${tool.slug}`,
    description: tool.metaDescription,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      url: SITE_URL,
    },
    creator: {
      '@type': 'Organization',
      name: 'TechUsar',
      url: SITE_URL,
    },
  };

  const relatedTools = toolsData.filter((t) => tool.relatedToolSlugs.includes(t.slug));

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-neutral-50/50 dark:bg-neutral-950">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: tool.name, href: `/tools/${tool.slug}` },
          ]}
        />

        {/* Hero Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
            <Wrench className="w-3.5 h-3.5" />
            <span>{tool.categoryLabel.toUpperCase()}</span>
            <span className="opacity-40">•</span>
            <span>100% CLIENT-SIDE & SECURE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            {tool.h1}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            {tool.metaDescription}
          </p>
        </header>

        {/* Interactive Tool Runner Container */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-4 sm:p-6 lg:p-8">
          <ToolRunner toolId={tool.id} />
        </div>

        {/* In-depth Editorial and SEO Guide Sections */}
        <article className="space-y-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
          {/* Section 1: Detailed Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
              <span>What is {tool.shortTitle}?</span>
            </h2>
            <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
              {tool.introduction}
            </p>
          </section>

          {/* Section 2: What this tool does */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span>Key Capabilities &amp; Features</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {tool.whatItDoes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Who is it for? */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              <span>Who Is This Tool For?</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.whoItIsFor.map((persona, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 text-sm font-medium text-neutral-800 dark:text-neutral-200"
                >
                  • {persona}
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: How to use step-by-step */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-purple-500" />
              <span>How to Use the {tool.shortTitle} Step-by-Step</span>
            </h2>
            <ol className="space-y-3">
              {tool.howToUse.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600 text-white font-mono text-xs font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300 pt-1 leading-normal">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 5: Real Examples */}
          {tool.examples.length > 0 && (
            <section className="space-y-5">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-500" />
                <span>Practical Examples &amp; Usage Scenarios</span>
              </h2>
              <div className="space-y-4">
                {tool.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3"
                  >
                    <div className="font-semibold text-neutral-950 dark:text-white text-base">
                      {ex.title}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-x-auto">
                        <div className="text-neutral-500 mb-1 text-[11px] font-bold">INPUT:</div>
                        <pre className="whitespace-pre-wrap break-all">{ex.input}</pre>
                      </div>
                      <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-x-auto">
                        <div className="text-blue-500 mb-1 text-[11px] font-bold">OUTPUT:</div>
                        <pre className="whitespace-pre-wrap break-all">{ex.output}</pre>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {ex.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 6: Real Use Cases */}
          {tool.useCases.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Production Use Cases</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tool.useCases.map((uc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-2"
                  >
                    <h3 className="font-semibold text-neutral-950 dark:text-white text-sm">
                      {uc.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {uc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 7: FAQ with Schema representation */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-3">
              {tool.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2"
                >
                  <h3 className="font-semibold text-neutral-950 dark:text-white text-sm sm:text-base">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Related Tools */}
          {relatedTools.length > 0 && (
            <section className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Explore Related Developer &amp; Business Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedTools.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/tools/${rel.slug}`}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-1">
                        {rel.tag}
                      </div>
                      <div className="font-bold text-sm text-neutral-950 dark:text-white group-hover:text-blue-600 transition-colors">
                        {rel.name}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                      <span>Launch Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Section 9: Custom Software & AI Bots Call to Action */}
          <section className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-900/90 border border-neutral-800 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-neutral-200">
              <span>BESPOKE ENGINEERING BY TECHUSAR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Need a custom web tool, automated bot, or bespoke software system?
            </h2>
            <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
              We design and build custom web applications, business automation workflows, WhatsApp
              bots, and accounting dashboards tailored specifically for your operational
              requirements.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 transition-colors"
              >
                <span>View Engineering Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
              >
                <span>Request Custom Quote</span>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
