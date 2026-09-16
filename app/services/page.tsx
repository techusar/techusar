import React from 'react';
import { ProjectEstimator } from '@/components/services/ProjectEstimator';
import { Layers, Palette, Code2, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Clock, HelpCircle, Terminal, Bot, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Custom AI Bot Development — TechUsar',
  description:
    'Commission bespoke brand identity, full-stack Next.js applications, and custom AI agents & automation bots (WhatsApp, Telegram, scrapers). Calculate investment and delivery timelines.',
  alternates: {
    canonical: 'https://techusar.com/services',
  },
};

export default function ServicesPage() {
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development, Brand Identity & Custom AI Bot Development',
    provider: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      url: 'https://techusar.com/about',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Global',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering & Creative Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom AI Agents & Automation Bots',
            description:
              'Custom WhatsApp bots, Telegram notification bots, 24/7 customer care chatbots, and automated web scrapers.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand Identity & Vector Systems',
            description:
              'Vector logomark, monogram, wordmark, and comprehensive brand guidelines manual.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full-Stack Next.js 15 Applications',
            description:
              'Production-grade web software engineered with Next.js 15, TypeScript, Tailwind CSS, and scalable PostgreSQL database schemas.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Financial & Accounting Software Engineering',
            description:
              'Double-entry ledgers, automated multi-tax invoice engines, and real-time inventory tracking software.',
          },
        },
      ],
    },
  };

  const coreServices = [
    {
      icon: Bot,
      tag: 'AI & AUTOMATION BOT STUDIO',
      color: 'emerald',
      title: 'Custom AI Agents & Automation Bots',
      description:
        'Hum chote mote intelligent bots aur custom AI agents banate hain! Tailored WhatsApp bots, Telegram notifiers, 24/7 customer care chatbots, and automated web scrapers.',
      deliverables: [
        'Custom WhatsApp & Telegram Automation Bots',
        '24/7 AI Customer Support Chatbots (OpenAI / Gemini / Claude)',
        'E-commerce order alerts & instant status bots',
        'Intelligent web scrapers & automated lead generation agents',
        'Small & lightweight utility bots for repetitive daily tasks',
        'Complete setup, hosting assistance & zero-hassle deployment',
      ],
      turnaround: '3 to 7 days',
    },
    {
      icon: Palette,
      tag: 'CREATIVE DIRECTION',
      color: 'purple',
      title: 'Brand Identity & Vector Systems',
      description:
        'Crafting distinctive brand marks, typography guidelines, and design tokens that communicate credibility and technical confidence.',
      deliverables: [
        'Vector Logomark, Monogram & Wordmark suite',
        'Typography hierarchy & pairing specifications',
        'Comprehensive brand guidelines manual (PDF & Web)',
        'Color palette with WCAG AAA contrast ratios',
        'Social assets, packaging dies, and pitch deck decks',
      ],
      turnaround: '2 to 3 weeks',
    },
    {
      icon: Code2,
      tag: 'ENGINEERING',
      color: 'blue',
      title: 'Full-Stack Next.js 15 Applications',
      description:
        'Production-grade web software engineered with Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, and scalable API gateways.',
      deliverables: [
        'App Router architecture with React Server Components',
        'Strict end-to-end TypeScript type coverage',
        'Optimized database schemas & migration pipelines',
        'Authentication, permissions & role-based access',
        'Edge deployment with sub-100ms global TTFB',
      ],
      turnaround: '3 to 6 weeks',
    },
    {
      icon: Layers,
      tag: 'SYSTEMS ARCHITECTURE',
      color: 'indigo',
      title: 'Multi-Brand Figma Design Systems',
      description:
        'Enterprise-grade component libraries bridging Figma auto-layout and React code tokens with automated synchronization.',
      deliverables: [
        'Token taxonomy (colors, spacing, typography, radii)',
        'Accessible primitives built on Radix UI conventions',
        'Dark mode & Light mode contrast-tested tokens',
        'Interactive Figma components with variants',
        'Living Storybook & developer documentation',
      ],
      turnaround: '2 to 4 weeks',
    },
    {
      icon: Terminal,
      tag: 'MARKETPLACE & SAAS',
      color: 'black',
      title: 'Bespoke Themes & Marketing Engines',
      description:
        'High-converting landing pages, documentation portals, and template engines engineered to turn visitors into long-term users.',
      deliverables: [
        'Conversion-optimized layout and visual rhythm',
        'Fluid spring micro-interactions & scroll triggers',
        'SEO metadata architecture & OpenGraph cards',
        'Clean, modular code ready for client CMS integration',
        'Comprehensive documentation & video walkthrough',
      ],
      turnaround: '2 to 3 weeks',
    },
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Blueprint & Architecture',
      desc: 'We map requirements, define technical scope, identify user personas, and establish the technical stack.',
    },
    {
      num: '02',
      title: 'Vector & Token Design',
      desc: 'Visual exploration begins in Figma and Illustrator. Typography, color tokens, and layout geometry take shape.',
    },
    {
      num: '03',
      title: 'Full-Stack Build',
      desc: 'Translating designs into clean TypeScript, Next.js components, database models, and resilient backend endpoints.',
    },
    {
      num: '04',
      title: 'Polish, Test & Deploy',
      desc: 'Performance audits, cross-browser validation, accessibility checks, and zero-downtime production deployment.',
    },
  ];

  const faqs = [
    {
      q: 'Do I own 100% of the code and design assets?',
      a: 'Yes. Upon final invoice settlement, full intellectual property rights, vector sources, Git repository commits, and design token assets are assigned directly to your company.',
    },
    {
      q: 'How are milestones and payments handled?',
      a: 'Projects typically operate on a 50% deposit / 50% completion structure for smaller engagements, or three phased milestones (30% upfront, 35% prototype delivery, 35% production ship) for comprehensive builds.',
    },
    {
      q: 'Can TechUsar integrate with an existing in-house team?',
      a: 'Absolutely. I frequently act as an embedded principal designer/engineer, leading sprint design handoffs, writing pull requests, and establishing design system tokens for engineering squads.',
    },
    {
      q: 'What happens after the project launches?',
      a: 'All projects include complimentary 30-day warranty support for bug fixes and launch stabilization. Ongoing retainers and maintenance SLAs are also available.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-purple-950/50 border border-blue-200 dark:border-purple-800/60 text-xs font-mono text-blue-600 dark:text-purple-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Disciplined Creative & Technical Execution</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
          Services designed for{' '}
          <span className="gradient-text-blue-purple">
            venture speed and visual precision.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          From establishing an iconic brand identity to architecting full-scale TypeScript web applications, I provide an integrated single-practitioner workflow with zero handoff friction.
        </p>
      </div>

      {/* Core Services Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Core Engagement Offerings
          </h2>
          <span className="text-xs font-mono text-neutral-500">4 CORE PRACTICES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 shadow-xs hover:border-blue-500/40 dark:hover:border-purple-500/40 transition-all duration-300 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/60 dark:to-purple-950/60 border border-blue-200/60 dark:border-purple-800/60 flex items-center justify-center text-blue-600 dark:text-purple-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                      {service.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-2 space-y-2 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                      Key Deliverables:
                    </div>
                    <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-purple-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Typical cadence: {service.turnaround}</span>
                  </div>
                  <Link
                    href="/contact"
                    className="text-blue-600 dark:text-purple-400 font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Estimator Section */}
      <section className="space-y-6 pt-4">
        <ProjectEstimator />
      </section>

      {/* Four Step Working Process */}
      <section className="space-y-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-mono text-blue-600 dark:text-purple-400 uppercase tracking-widest">
            PROCESS & METHODOLOGY
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            How we bring ideas to life
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            A battle-tested 4-phase delivery system ensuring zero surprises and transparent milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-3"
            >
              <div className="text-2xl font-extrabold font-mono text-blue-600 dark:text-purple-400">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">{step.title}</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest">
          <HelpCircle className="w-4 h-4 text-blue-500 dark:text-purple-400" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 space-y-2"
            >
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{faq.q}</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl shadow-blue-500/10">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">Ready to build something iconic?</h3>
            <p className="text-sm text-blue-100 max-w-lg">
              Book a direct consultation or send your RFP. Available for selected contracts in Q2 & Q3.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-100 transition-colors shadow-md"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
