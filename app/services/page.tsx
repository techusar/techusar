import React from 'react';
import { ProjectEstimator } from '@/components/services/ProjectEstimator';
import {
  Layers,
  Palette,
  Code2,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Clock,
  HelpCircle,
  Terminal,
  Bot,
  MessageSquare,
  Zap,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { servicesData } from '@/data/services-data';
import { constructMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Engineering, Design & Custom AI Bot Services — TechUsar',
  description:
    'Explore the 8 core services offered by Hafiz Muhammad Usman (TechUsar): Full-Stack Development, Next.js 15, AI Automation, WhatsApp Bots, Graphic Design, Brand Identity, UI/UX, and Custom Business Software.',
  path: '/services',
  keywords: [
    'TechUsar services',
    'Full-Stack Web Development',
    'Next.js 15 Development',
    'AI Automation Karachi',
    'WhatsApp Bot Development Pakistan',
    'Graphic Design Lyari',
    'Brand Identity Design',
    'UI UX Design Figma',
    'Custom Business Software',
    'Accounting Software Pakistan',
  ],
});

export default function ServicesPage() {
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'TechUsar Engineering & Creative Services',
    serviceType: 'Graphic Design, Full-Stack Web Development, Custom AI Bots & Business Software',
    provider: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      url: `${SITE_URL}/about`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Global',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'TechUsar Comprehensive Services Catalog',
      itemListElement: servicesData.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.metaDescription,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
  };

  const processSteps = [
    {
      num: '01',
      title: 'Blueprint & Architecture Specification',
      desc: 'We map requirements, define technical scope, identify user personas, and establish the technical and database stack.',
    },
    {
      num: '02',
      title: 'Vector Geometry & Token Systems',
      desc: 'Visual exploration in Figma and Illustrator. Typography, color tokens, and layout geometry take shape.',
    },
    {
      num: '03',
      title: 'Full-Stack & Backend Build',
      desc: 'Translating designs into clean TypeScript, Next.js components, database models, and resilient backend endpoints.',
    },
    {
      num: '04',
      title: 'Performance Optimization & QA',
      desc: 'Core Web Vitals auditing, cross-browser validation, accessibility checks, and zero-downtime production deployment.',
    },
    {
      num: '05',
      title: 'Handoff & Ongoing Support',
      desc: 'Complete source code transfer, video walkthroughs, and 30-day post-launch stabilization support.',
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
      q: 'Can I commission small lightweight bots and single-task automations?',
      a: 'Yes! Hum chote mote intelligent bots aur custom AI agents banate hain — tailored WhatsApp bots, Telegram notifiers, customer care chatbots, and automated web scrapers with rapid turnaround.',
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-xs font-mono text-blue-600 dark:text-blue-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Disciplined Creative &amp; Technical Execution</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
          Services designed for{' '}
          <span className="text-blue-600 dark:text-blue-400">
            venture speed and visual precision.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          From establishing an iconic brand identity to architecting full-scale TypeScript web applications and custom WhatsApp automation bots, I provide an integrated single-practitioner workflow with zero handoff friction.
        </p>
      </div>

      {/* 8 Core Services Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              The 8 Core Specialized Practices
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Each discipline is backed by real production case studies and deep architectural expertise.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full shrink-0">
            8 DEDICATED DOMAINS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service, idx) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 shadow-xs hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 space-y-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                    {service.shortTitle}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link href={`/services/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {service.tagline}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
                    Core Focus &amp; Deliverables:
                  </span>
                  <ul className="space-y-1.5">
                    {service.featuresDeliverables[0]?.items.slice(0, 3).map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <span>Explore Full Service Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`https://wa.me/923318917330?text=${encodeURIComponent(`Assalam-o-Alaikum Usman! I want to discuss your ${service.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Quick WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Project Estimator */}
      <section className="space-y-6 pt-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
            <Clock className="w-4 h-4" />
            <span>Interactive Calculator</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Project Scope &amp; Timeline Estimator
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Select your required disciplines to generate an estimated production timeline and baseline investment range.
          </p>
        </div>

        <ProjectEstimator />
      </section>

      {/* Process Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            How Engagements Run
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
            A transparent, predictable process with explicit milestones and continuous communication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-3"
            >
              <span className="text-2xl font-mono font-bold text-neutral-400 dark:text-neutral-500">
                {step.num}
              </span>
              <h3 className="text-sm font-bold text-neutral-950 dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Engagement FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Common Questions About Working Together
          </h2>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-6 space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="p-8 sm:p-12 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50 dark:bg-neutral-900/60 text-center space-y-6 max-w-4xl mx-auto">
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Have a project brief ready?
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Let&apos;s review your objectives, determine technical feasibility, and prepare a tailored milestone proposal.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold font-mono tracking-wide hover:opacity-90 transition-all inline-flex items-center gap-2"
          >
            <span>START PROJECT BRIEF</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20I%20want%20to%20hire%20you%20for%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-mono tracking-wide transition-all inline-flex items-center gap-2"
          >
            <span>WHATSAPP (+92 331 8917330)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
