import React from 'react';
import { CVViewerAndBuilder } from '@/components/cv/CVViewerAndBuilder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hafiz Muhammad Usman — CV & Free Interactive Resume Builder | TechUsar',
  description:
    'Curriculum Vitae of Hafiz Muhammad Usman (Graphic Designer & Web Developer) featuring the exact original PDF design, 5 additional modern templates, and a free interactive CV Builder tool with instant PDF export.',
  keywords: [
    'Hafiz Muhammad Usman CV',
    'Muhammad Usman resume',
    'Free CV builder online',
    'Interactive resume builder PDF',
    'Graphic designer resume Pakistan',
    'Full stack developer CV',
  ],
  alternates: {
    canonical: 'https://techusar.com/cv',
  },
  openGraph: {
    title: 'Hafiz Muhammad Usman — CV & Free Interactive Resume Builder | TechUsar',
    description:
      'Verified Curriculum Vitae and multi-template vector PDF resume generator engine.',
    url: 'https://techusar.com/cv',
    type: 'profile',
  },
};

export default function CVPage() {
  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      alternateName: 'TechUsar',
      jobTitle: 'Graphic Designer & Full-Stack Web Developer',
      description:
        'Dual-craft digital product designer and full-stack software engineer with 5 years in graphic design and production TypeScript / Next.js engineering.',
      url: 'https://techusar.com/cv',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Karachi',
        addressRegion: 'Sindh',
        addressCountry: 'PK',
      },
      knowsAbout: [
        'Graphic Design',
        'Next.js 15',
        'TypeScript',
        'Tailwind CSS',
        'Adobe Illustrator',
        'Adobe Photoshop',
        'Full-Stack Web Development',
        'Accounting Systems',
        'Custom AI Bots',
      ],
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      {/* Header section (hidden on print) */}
      <div className="space-y-2 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-xs font-mono text-blue-600 dark:text-blue-400">
          <span>Official Record &amp; Free Resume Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          Curriculum Vitae &amp; Resume Studio
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl">
          View the exact PDF replica of Hafiz Muhammad Usman&apos;s verified record, switch across 6 bespoke design architectures, or use the integrated free builder to craft and export your own professional CV.
        </p>
      </div>

      {/* Main Interactive CV Viewer and Builder */}
      <CVViewerAndBuilder />
    </div>
  );
}
