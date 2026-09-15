import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, generateFAQSchema, SITE_URL } from '@/lib/seo';
import {
  Layers,
  MousePointerClick,
  Sliders,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Eye,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'UI/UX Design Services — Modern Interfaces & Systems | TechUsar',
  description:
    'Modern UI/UX design services by TechUsar. High-density dashboards, multi-brand design systems, interactive Figma prototypes, and WCAG-compliant design tokens.',
  path: '/ui-ux-design',
  keywords: [
    'UI UX design services',
    'User interface designer',
    'Design system architect',
    'Figma UI designer Karachi',
    'Product designer Pakistan',
    'Dashboard UI UX design',
    'SaaS interface design',
  ],
});

export default function UiUxDesignServicePage() {
  const faqs = [
    {
      q: 'What is your UI/UX design process?',
      a: 'We follow a systematic 4-phase methodology: 1) User research and journey mapping, 2) Low-fidelity wireframes and information architecture, 3) High-fidelity Figma components and interactive prototypes, and 4) Production token handoff with developer documentation.',
    },
    {
      q: 'Do you design complex, data-dense enterprise software and dashboards?',
      a: 'Yes. We specialize in low-cognitive-load, high-density interfaces like cloud telemetry consoles (e.g. Kroma Cloud) and financial wealth portals (e.g. Vanguard Capital) where information clarity is paramount.',
    },
    {
      q: 'Do you provide design tokens for React and Tailwind CSS?',
      a: 'Yes. All UI components are built using structured design tokens (colors, spacing, typography scales, radii) that map 1:1 to Tailwind CSS configuration classes and CSS variables.',
    },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'UI/UX Design & Design Systems',
    provider: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      url: SITE_URL,
    },
    serviceType: 'Product Design & User Experience',
    description:
      'Enterprise UI/UX design, interactive prototyping, and multi-brand tokenized design systems.',
    areaServed: 'Worldwide',
  };

  const faqSchema = generateFAQSchema(faqs);

  const pillars = [
    {
      icon: Layers,
      title: 'Tokenized Design Systems',
      desc: 'Centralized typography, color, spacing, and elevation tokens that bridge Figma auto-layout and React code tokens with automated synchronization.',
    },
    {
      icon: Sliders,
      title: 'High-Density Dashboards',
      desc: 'Specialized in avionics-grade data density: tabular numerals, low-distraction dark mode, and ergonomic keyboard shortcuts.',
    },
    {
      icon: MousePointerClick,
      title: 'Interactive Prototypes',
      desc: 'Clickable, testable Figma prototypes that allow stakeholders and users to experience realistic flows before coding.',
    },
    {
      icon: Eye,
      title: 'WCAG AAA Accessibility',
      desc: 'Rigorous color contrast verification, logical focus rings, and screen-reader navigable hierarchy baked into every primitive.',
    },
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
            { label: 'UI/UX Design', href: '/ui-ux-design' },
          ]}
        />

        {/* Hero */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERACTION ARCHITECTURE &amp; DESIGN TOKENS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            UI/UX Design Services — Modern Interfaces &amp; Systems
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            We design intuitive digital product interfaces engineered for high speed, low cognitive
            friction, and seamless user adoption. Built for SaaS platforms, enterprise tools, and
            mobile web apps.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
            >
              <span>Request UI/UX Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects/strata-design-system"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <span>Explore Strata Design System</span>
            </Link>
          </div>
        </header>

        {/* Pillars */}
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Core UI/UX Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-neutral-950 dark:text-white text-base">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-500" />
            <span>Frequently Asked Questions About UI/UX Design</span>
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
          <h2 className="text-xl sm:text-2xl font-bold">Transform your software experience</h2>
          <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Let’s turn confusing interfaces into clean, delightful digital workflows that retain
            users.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 transition-colors"
            >
              <span>Schedule UI/UX Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/web-design"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
            >
              <span>Explore Web Design</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
