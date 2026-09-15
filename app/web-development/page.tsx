import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, generateFAQSchema, SITE_URL } from '@/lib/seo';
import { projects } from '@/data/projects';
import {
  Code2,
  Cpu,
  Database,
  Zap,
  ShieldCheck,
  Server,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Web Development Services — React & TypeScript Engineering | TechUsar',
  description:
    'Full-stack web development services by TechUsar. Specialized in Next.js 15 App Router, React 19, strict TypeScript, REST & GraphQL APIs, and high-performance database architectures. 50+ live production demos.',
  path: '/web-development',
  keywords: [
    'Web development services',
    'Next.js 15 developer',
    'React TypeScript engineer',
    'Full stack developer Pakistan',
    'Karachi web developer',
    'Custom web app development',
    '50 web development templates',
    'Free Next.js templates download',
    'PostgreSQL web development',
  ],
});

export default function WebDevelopmentServicePage() {
  const faqs = [
    {
      q: 'Which frontend frameworks and tech stacks do you specialize in?',
      a: 'We specialize in Next.js 15 (App Router with React Server Components), React 19, strict TypeScript, and Tailwind CSS v4. For backends, we build using Node.js, Next.js API Routes, C# .NET Core, and PostgreSQL/MySQL databases.',
    },
    {
      q: 'Can I test live web development demos and download free templates?',
      a: 'Yes! We have 50+ live interactive production demos deployed on Netlify spanning SaaS dashboards, luxury e-commerce, clinic portals, real estate hubs, and business apps. All source code templates are available for free download via WhatsApp.',
    },
    {
      q: 'Do you build both frontend interfaces and backend databases?',
      a: 'Yes. TechUsar provides end-to-end full-stack engineering. We design database schemas, configure ORMs (Prisma, Drizzle, Entity Framework), write secure authentication logic, and integrate third-party APIs.',
    },
    {
      q: 'How do you guarantee website performance and fast loading?',
      a: 'We optimize Core Web Vitals from day one: zero Cumulative Layout Shift (CLS), sub-second Largest Contentful Paint (LCP), asset optimization with next/image, route prefetching, and edge caching.',
    },
    {
      q: 'Can you migrate an existing legacy website to Next.js and TypeScript?',
      a: 'Yes. We frequently migrate legacy WordPress, PHP, or outdated React codebases to modern Next.js 15 App Router architectures, improving page speed and developer maintainability.',
    },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Full-Stack Web Development & Engineering',
    provider: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      url: SITE_URL,
    },
    serviceType: 'Full-Stack Web Application Development',
    description:
      'Custom React, Next.js 15, and TypeScript engineering services with resilient backend APIs and edge performance.',
    areaServed: 'Worldwide',
  };

  const faqSchema = generateFAQSchema(faqs);

  const pillars = [
    {
      icon: Code2,
      title: 'Type-Safe Architecture',
      desc: 'Strict end-to-end TypeScript eliminates entire classes of runtime bugs, accelerates refactoring, and guarantees predictable data contracts.',
    },
    {
      icon: Zap,
      title: 'React Server Components',
      desc: 'Next.js 15 App Router keeps heavy JavaScript on the server, shipping lean HTML to the client for lightning-fast First Contentful Paint.',
    },
    {
      icon: Database,
      title: 'Robust Data Layer',
      desc: 'Optimized relational schemas (PostgreSQL, SQLite, MySQL) with connection pooling, transactional integrity, and automated migrations.',
    },
    {
      icon: Server,
      title: 'API & Microservice Integration',
      desc: 'Clean REST and webhook integrations with Stripe, WhatsApp API, Telegram, SendGrid, OpenAI, and internal enterprise ERPs.',
    },
  ];

  const stackHighlights = [
    { category: 'Frontend', items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Motion'] },
    { category: 'Backend', items: ['Node.js', 'Next.js Server Actions', 'C# / .NET Core', 'PHP 8.3 / Laravel'] },
    { category: 'Databases', items: ['PostgreSQL', 'Redis Streams', 'MySQL', 'TimescaleDB'] },
    { category: 'DevOps & Tooling', items: ['Docker', 'Vercel Edge', 'Git / GitHub CI', 'ESLint / Prettier'] },
  ];

  const sampleLiveBuilds = projects.slice(0, 6);

  return (
    <div className="w-full py-8 sm:py-12 bg-white dark:bg-[#050508]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: 'Web Development', href: '/web-development' },
          ]}
        />

        {/* Hero */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold">
            <Code2 className="w-3.5 h-3.5" />
            <span>FULL-STACK WEB DEVELOPMENT &amp; ARCHITECTURE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            Modern React &amp; TypeScript Web Development
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            We architect and build enterprise-grade web applications with Next.js 15 App Router,
            TypeScript, and scalable backend services. Clean code, sub-second latency, zero runtime
            flicker, and SEO-optimized structures.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <span>Explore 50+ Live Projects</span>
            </Link>
          </div>
        </header>

        {/* 50+ Live Projects Showcase Banner */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/30 via-neutral-900/60 to-purple-950/30 border border-blue-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-blue-400 font-bold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>50+ LIVE PRODUCTION BUILDS AVAILABLE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
                Live Interactive Demos &amp; Free Templates
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl mt-1">
                From luxury retail stores to healthcare portals, test our live Netlify deployments or download free project codebases via WhatsApp.
              </p>
            </div>
            <Link
              href="/projects"
              className="shrink-0 inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <span>View All 50 Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {sampleLiveBuilds.map((b) => (
              <Link
                key={b.slug}
                href={`/projects/${b.slug}`}
                className="p-3.5 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">#{b.projectNumber}</span>
                    <span className="text-neutral-500">{b.category}</span>
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-neutral-950 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                    {b.title}
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-neutral-500 group-hover:text-blue-500">
                  <span>Open Demo &amp; Case Study</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="space-y-6 pt-2">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Engineering Standards &amp; Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-neutral-950 dark:text-white text-base">{p.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tech Stack Breakdown */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Production Technology Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stackHighlights.map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3"
              >
                <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {st.category}
                </div>
                <ul className="space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                  {st.items.map((it, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <span>Frequently Asked Questions About Web Development</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
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

        {/* WhatsApp & Commission CTA */}
        <section className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-900/90 border border-neutral-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Have a web engineering challenge or need free templates?</h2>
          <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Let’s discuss your technical requirements, architectural constraints, and delivery
            timelines. Contact directly on WhatsApp for instantaneous assistance.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/923318917330?text=${encodeURIComponent(
                'Hello Hafiz Muhammad Usman, I would like to discuss web development services and template downloads.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us (+92 331 8917330)</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
            >
              <span>Request Quote Form</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
