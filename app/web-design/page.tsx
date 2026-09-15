import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, generateFAQSchema, SITE_URL } from '@/lib/seo';
import {
  Palette,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layout,
  Smartphone,
  Zap,
  Layers,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Web Design Services — Modern & Premium Websites | TechUsar',
  description:
    'Professional web design services for startups, established brands, and modern businesses. Clean typography, high-conversion layouts, responsive mobile architecture, and bespoke UI aesthetics.',
  path: '/web-design',
  keywords: [
    'Web design services',
    'Modern website design',
    'Premium website designer',
    'Karachi web designer',
    'Responsive web design',
    'UI UX designer Pakistan',
    'Custom business website design',
    'Landing page designer',
  ],
});

export default function WebDesignServicePage() {
  const faqs = [
    {
      q: 'What types of websites do you design at TechUsar?',
      a: 'We design modern corporate websites, SaaS marketing engines, headless e-commerce storefronts, personal portfolios, and digital agency platforms. Every project is crafted from scratch according to brand identity and business objectives.',
    },
    {
      q: 'Do you design mobile-responsive layouts?',
      a: 'Yes. Every website design is rigorously tested and optimized across mobile phones, tablets, laptops, and ultra-wide desktop monitors, ensuring seamless touch targets and flawless typographic cadence.',
    },
    {
      q: 'Do you deliver design files or full production code?',
      a: 'We can deliver complete Figma design files (with design tokens and component variants) or take your project all the way through to full-stack Next.js and Tailwind CSS production deployment.',
    },
    {
      q: 'How long does a custom web design project typically take?',
      a: 'A focused landing page or marketing site takes 1 to 2 weeks, while a comprehensive multi-page corporate website or design system typically spans 3 to 4 weeks.',
    },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Professional Web Design Services',
    provider: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      url: SITE_URL,
    },
    serviceType: 'Web Design & Digital Creative Direction',
    description:
      'High-conversion, responsive, modern, and luxury web design services by TechUsar.',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Design Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corporate & SaaS Website Design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'High-Converting Landing Pages',
          },
        },
      ],
    },
  };

  const faqSchema = generateFAQSchema(faqs);

  const capabilities = [
    {
      icon: Layout,
      title: 'Bespoke Visual Architecture',
      desc: 'No generic templates. Every layout is crafted around your unique content hierarchy, typography tokens, and brand personality.',
    },
    {
      icon: Smartphone,
      title: 'Flawless Responsive Execution',
      desc: 'Mobile-first fluid layouts that adapt naturally to 320px smartphones up to 4K displays with zero visual breakage.',
    },
    {
      icon: Zap,
      title: 'Conversion-Focused UX',
      desc: 'Strategic CTA placements, scan-friendly typographic rhythm, and clear value propositions that convert visitors into clients.',
    },
    {
      icon: Layers,
      title: 'Design System & Component Tokens',
      desc: 'Organized Figma component libraries with reusable typography styles, color tokens, and accessible button/card states.',
    },
  ];

  const websiteTypes = [
    {
      title: 'SaaS & Tech Marketing Websites',
      desc: 'Feature bento grids, interactive product demos, pricing matrices, and documentation layouts built to establish software authority.',
      example: 'Nexus SaaS Template',
      link: '/templates/nexus-saas',
    },
    {
      title: 'Luxury & Scandinavian E-Commerce',
      desc: 'High-editorial lookbooks, sliding side-carts, refined product catalogs, and minimalist Scandinavian aesthetics.',
      example: 'Atelier Headless Commerce',
      link: '/templates/atelier-store',
    },
    {
      title: 'Creative Portfolios & Art Direction',
      desc: 'Typography-first portfolio showcases for photographers, designers, architects, and senior executives.',
      example: 'Studio Minimal',
      link: '/templates/studio-minimal',
    },
    {
      title: 'Corporate & Agency Portals',
      desc: 'Authoritative multi-page websites featuring case studies, team profiles, service breakdowns, and project intake forms.',
      example: 'Vortex Digital Agency',
      link: '/templates/vortex-agency',
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
            { label: 'Web Design', href: '/web-design' },
          ]}
        />

        {/* Hero Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
            <Palette className="w-3.5 h-3.5" />
            <span>BESPOKE WEB DESIGN &amp; UI ARCHITECTURE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            Web Design Services — Modern, Responsive &amp; Premium Websites
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            We design distinctive websites that reject generic AI templates in favor of intentional
            typography, balanced negative space, and strategic conversion pathways. Built for brands
            that prioritize credibility and visual authority.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
            >
              <span>Discuss Your Web Design Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <span>View Portfolio Work</span>
            </Link>
          </div>
        </header>

        {/* Core Pillars */}
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            What Sets TechUsar Web Design Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
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

        {/* Website Types */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Specialized Website Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {websiteTypes.map((wt, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-neutral-950 dark:text-white text-base">
                    {wt.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                    {wt.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                  <Link
                    href={wt.link}
                    className="inline-flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Inspect Design Architecture: {wt.example}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Design Process */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Our 4-Stage Web Design Methodology
          </h2>
          <div className="space-y-3">
            {[
              {
                step: '01',
                name: 'Brand Discovery & User Journey Mapping',
                desc: 'We map target audience expectations, key conversion objectives, competitor benchmarks, and content structure.',
              },
              {
                step: '02',
                name: 'Wireframing & Information Architecture',
                desc: 'Drafting low-fidelity wireframes to establish logical reading flow, viewport hierarchy, and CTA placement before styling.',
              },
              {
                step: '03',
                name: 'High-Fidelity Visual Design & Tokens',
                desc: 'Crafting pixel-perfect layouts in Figma. Defining typographic scales, color tokens, micro-interactions, and responsive breakpoint views.',
              },
              {
                step: '04',
                name: 'Component Handoff or Production Build',
                desc: 'Delivering structured design tokens for developer implementation, or proceeding directly into Next.js 15 & Tailwind CSS engineering.',
              },
            ].map((p, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {p.step}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-950 dark:text-white text-sm sm:text-base">
                    {p.name}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <span>Frequently Asked Questions About Web Design</span>
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

        {/* CTA Banner */}
        <section className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-900/90 border border-neutral-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Ready to elevate your online presence?</h2>
          <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Get in touch with Hafiz Muhammad Usman to discuss your web design goals, request a
            custom proposal, or schedule a design review.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 transition-colors"
            >
              <span>Start Your Web Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/web-development"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
            >
              <span>Explore Web Development</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
