import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, generateFAQSchema, SITE_URL } from '@/lib/seo';
import {
  Palette,
  PenTool,
  Sparkles,
  Layers,
  ArrowRight,
  HelpCircle,
  Award,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Graphic Design Services — Branding & Vector Systems | TechUsar',
  description:
    'Professional graphic design and brand identity services by Hafiz Muhammad Usman (TechUsar). 5+ years crafting vector logomarks, Swiss typography systems, brand guidelines, and visual assets.',
  path: '/graphic-design',
  keywords: [
    'Graphic design services',
    'Brand identity designer',
    'Logo designer Karachi',
    'Vector design systems',
    'Swiss typography design',
    'Graphic designer Pakistan',
    'TechUsar graphic design',
    'Brand guidelines manual',
  ],
});

export default function GraphicDesignServicePage() {
  const faqs = [
    {
      q: 'What graphic design deliverables are included in a brand identity project?',
      a: 'A complete identity package includes the primary logomark, secondary wordmark, monochrome/inverted lockups, color palette with HEX/RGB/CMYK codes, typography hierarchy pairings, brand guidelines PDF, and ready-to-use vector assets (SVG, EPS, PDF, high-res PNG).',
    },
    {
      q: 'How does your graphic design experience benefit web and UI projects?',
      a: 'With over 5 years in graphic design and vector illustration, we design websites with genuine typographic cadence, optical balancing, and mathematically grounded grid systems—avoiding generic AI-generated aesthetics.',
    },
    {
      q: 'Do you design print assets such as packaging dies, business cards, and stationery?',
      a: 'Yes. We prepare print-ready vector files calibrated with proper bleeds, safe margins, and CMYK separations ready for offset or digital commercial printing.',
    },
    {
      q: 'What design software do you use?',
      a: 'We use Adobe Illustrator for precision vector drawing, Adobe Photoshop for raster editing and mockup compositing, and Figma for collaborative UI/UX systems.',
    },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Graphic Design & Brand Identity Systems',
    provider: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      url: SITE_URL,
    },
    serviceType: 'Brand Identity & Vector Graphic Design',
    description:
      'Professional brand identity, vector logos, Swiss typography systems, and marketing collateral design.',
    areaServed: 'Worldwide',
  };

  const faqSchema = generateFAQSchema(faqs);

  const capabilities = [
    {
      icon: PenTool,
      title: 'Vector Logomarks & Monograms',
      desc: 'Distinctive, conceptually sound marks constructed on strict geometric grids for clarity at 16px favicon sizes up to massive outdoor billboards.',
    },
    {
      icon: Palette,
      title: 'Swiss Typography & Hierarchy',
      desc: 'Inspired by the mathematical rigor of Zurich typography: intentional leading, tracking, optical kerning, and baseline rhythm.',
    },
    {
      icon: Layers,
      title: 'Comprehensive Brand Manuals',
      desc: 'Documenting clear rules for clear space, incorrect usage, color formulas, co-branding lockups, and social media template grids.',
    },
    {
      icon: Award,
      title: 'Marketing & Digital Collateral',
      desc: 'High-impact social media kits, pitch deck presentations, packaging die-lines, and vector icons tailored to your audience.',
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
            { label: 'Graphic Design', href: '/graphic-design' },
          ]}
        />

        {/* Hero */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-purple-500/20 bg-purple-50/50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400">
            <Palette className="w-3.5 h-3.5" />
            <span>5+ YEARS CRAFTING VECTOR IDENTITIES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            Graphic Design Services — Branding, Typography &amp; Vector Systems
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            Rooted in Swiss modernist principles, we design visual identities that communicate
            authority, technical precision, and enduring timelessness. Built on geometry, not
            fleeting visual fads.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
            >
              <span>Commission Brand Design</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/design"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <span>Explore Design Portfolio</span>
            </Link>
          </div>
        </header>

        {/* Pillars */}
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Graphic Design Disciplines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center">
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

        {/* The Dual Advantage */}
        <section className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
            The Dual Advantage: Where Vector Art Meets Web Code
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            Most brands experience friction when handing graphic designs over to frontend engineers
            who distort aspect ratios or ignore font weights. Because Hafiz Muhammad Usman is both a
            senior graphic designer and full-stack software engineer, your brand identity transitions
            into digital products with 100% fidelity.
          </p>
          <div className="pt-2">
            <Link
              href="/blog/swiss-typography-and-brand-identity-craft"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
            >
              <span>Read Essay: The Mathematical Discipline of Swiss Typography</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-500" />
            <span>Frequently Asked Questions About Graphic Design</span>
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
          <h2 className="text-xl sm:text-2xl font-bold">Build an unmistakable brand identity</h2>
          <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Let’s craft a visual identity that distinguishes your company in crowded global markets.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 transition-colors"
            >
              <span>Inquire About Brand Identity</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ui-ux-design"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
            >
              <span>Explore UI/UX Design</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
