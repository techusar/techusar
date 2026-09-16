import React from 'react';
import type { Metadata } from 'next';
import { WorkClient } from '@/components/work/WorkClient';
import { projects } from '@/data/projects';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Selected Work & Software Systems — TechUsar',
  description:
    'Case studies, production applications, and design token architectures engineered by Hafiz Muhammad Usman. Explore real-world full-stack web software, SaaS platforms, and enterprise accounting systems.',
  keywords: [
    'TechUsar portfolio',
    'Full-stack projects Pakistan',
    'Next.js case studies',
    'Hafiz Muhammad Usman projects',
    'Accounting software Karachi',
    'Design systems portfolio',
  ],
  alternates: {
    canonical: 'https://techusar.com/work',
  },
  openGraph: {
    title: 'Selected Work & Software Systems — TechUsar',
    description:
      'Case studies and software applications engineered with Next.js, TypeScript, and Tailwind CSS by Hafiz Muhammad Usman.',
    url: 'https://techusar.com/work',
  },
};

export default function WorkPage() {
  const workJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Selected Work & Software Systems — TechUsar',
    description:
      'Case studies, production applications, and design token architectures engineered by Hafiz Muhammad Usman.',
    url: 'https://techusar.com/work',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: project.title,
          description: project.description,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
          url: `https://techusar.com/work/${project.slug}`,
        },
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd) }}
      />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5" />
          <span>Case Studies &amp; Systems</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Selected Work
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Production digital products, multi-brand design systems, and full-stack web software engineered with Next.js 15, TypeScript, and disciplined vector precision.
        </p>
      </div>

      <WorkClient initialProjects={projects} />
    </div>
  );
}
