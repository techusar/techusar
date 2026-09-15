import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, generateFAQSchema, SITE_URL } from '@/lib/seo';
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
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Web Development Services — React & TypeScript Engineering | TechUsar',
  description:
    'Full-stack web development services by TechUsar. Specialized in Next.js 15 App Router, React 19, strict TypeScript, REST & GraphQL APIs, and high-performance database architectures.',
  path: '/web-development',
  keywords: [
    'Web development services',
    'Next.js 15 developer',
    'React TypeScript engineer',
    'Full stack developer Pakistan',
    'Karachi web developer',
    'Custom web app development',
    'C# .NET developer',
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

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-white dark:bg-[#050508]">
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
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>FULL-STACK ENGINEERING // NEXT.JS 15 &amp; TYPESCRIPT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            Web Development Services — React &amp; TypeScript Engineering
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            Engineering robust web software that scales effortlessly. From complex cloud dashboards
            and business portals to high-traffic consumer web applications, we write clean,
            maintainable, type-safe code that performs under load.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
            >
              <span>Consult on Your Web Build</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <span>View Case Studies</span>
            </Link>
          </div>
        </header>

        {/* Core Capabilities */}
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
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

        {/* Real Production Work Highlight */}
        <section className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 space-y-4">
          <div className="text-xs font-mono text-neutral-500">PROVEN ENGINEERING TRACK RECORD</div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
            Featured Engineering Case Studies
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Discover how we engineered Kroma Cloud (120k events/sec telemetry monitor), Vanguard
            Capital ($840M institutional wealth portal), and the Strata Design System (99.4% UI
            consistency across teams).
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/projects/kroma-cloud"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Explore Kroma Cloud Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link
              href="/projects/strata-design-system"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Explore Strata System</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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

        {/* CTA */}
        <section className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-900/90 border border-neutral-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Have a web engineering challenge?</h2>
          <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Let’s discuss your technical requirements, architectural constraints, and delivery
            timelines with direct engineering feedback.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ai-bot-development"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
            >
              <span>Explore AI &amp; Bot Development</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
