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
  MessageCircle,
  Download,
  Terminal,
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
      'online tool free',
      'free web developer tool',
      'free accounting calculator',
      'free template download',
      'TechUsar tools Pakistan',
      'Next.js 15 online tool',
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
      description: 'Free online tool & free source code template available on WhatsApp',
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

  const whatsappMessage = encodeURIComponent(
    `Hello Hafiz Muhammad Usman (TechUsar), I am using your free online tool "${tool.name}". I would like to download the free template and source code or discuss a custom software project.`
  );
  const whatsappUrl = `https://wa.me/923318917330?text=${whatsappMessage}`;

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
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold">
              <Wrench className="w-3.5 h-3.5" />
              <span>{tool.categoryLabel.toUpperCase()}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
              100% FREE &amp; CLIENT-SIDE SECURE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            {tool.h1}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            {tool.metaDescription}
          </p>

          {/* Quick WhatsApp Template CTA bar */}
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Download Free Tool Template (WhatsApp)</span>
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <span>Explore 50+ Web Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Interactive Tool Runner Container */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-4 sm:p-6 lg:p-8">
          <ToolRunner toolId={tool.id} />
        </div>

        {/* Free Template & WhatsApp Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-blue-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FREE CODE TEMPLATE DOWNLOAD VIA WHATSAPP</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300">
              Want the full React / Next.js source code or UI component template for {tool.shortTitle}? Contact Hafiz Muhammad Usman on WhatsApp for instant access.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md hover:shadow-emerald-900/40"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Get Template on WhatsApp</span>
          </a>
        </div>

        {/* In-depth Editorial and SEO Guide Sections */}
        <article className="space-y-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
          {/* Section 1: Detailed Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
              <span>What is {tool.shortTitle} &amp; How Does It Work?</span>
            </h2>
            <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              {tool.introduction}
            </p>
          </section>

          {/* Section 2: What this tool does */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span>Key Capabilities, Architecture &amp; Features</span>
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
              <span>Target Audience &amp; Professional Use Cases</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.whoItIsFor.map((persona, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span>{persona}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: How to use step-by-step */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-purple-500" />
              <span>Step-by-Step Guide: How to Use the {tool.shortTitle}</span>
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
                <span>Practical Code Examples &amp; Formulations</span>
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
                        <div className="text-neutral-500 mb-1 text-[11px] font-bold">INPUT DATA:</div>
                        <pre className="whitespace-pre-wrap break-all">{ex.input}</pre>
                      </div>
                      <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-x-auto">
                        <div className="text-blue-500 mb-1 text-[11px] font-bold">CALCULATED RESULT:</div>
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
                <span>Production Workflows &amp; Implementation</span>
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
              <span>Frequently Asked Questions &amp; Technical FAQ</span>
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
                Explore More Developer &amp; Business Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedTools.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/tools/${rel.slug}`}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-1 font-semibold">
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

          {/* Section 9: Custom Software & WhatsApp CTA */}
          <section className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-900/90 border border-neutral-800 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-neutral-200 font-bold">
              <span>BESPOKE ENGINEERING &amp; FREE TEMPLATES</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Need a custom web tool, automated bot, or full-stack software system?
            </h2>
            <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
              We design and build custom web applications, business automation workflows, WhatsApp
              bots, and accounting dashboards tailored specifically for your operational
              requirements. All source code and templates can be downloaded or customized.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact on WhatsApp (+92 331 8917330)</span>
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 transition-colors"
              >
                <span>View 50+ Web Builds</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
