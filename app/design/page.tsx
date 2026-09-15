import React from 'react';
import type { Metadata } from 'next';
import { DesignClient } from '@/components/design/DesignClient';
import { designProjects } from '@/data/design-projects';
import { Palette } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Graphic Design Showcase & Vector Systems — TechUsar',
  description:
    'Visual identity, Swiss typography posters, brand guidelines, and vector design systems created by Hafiz Muhammad Usman. 5 years of commercial graphic design experience.',
  keywords: [
    'Graphic design Karachi',
    'Brand identity designer Pakistan',
    'Swiss typography',
    'Vector illustrations',
    'Logo design Karachi',
    'TechUsar design showcase',
  ],
  alternates: {
    canonical: 'https://techusar.dev/design',
  },
  openGraph: {
    title: 'Graphic Design Showcase & Vector Systems — TechUsar',
    description:
      '5 years of graphic design excellence. Explore brand systems, vector marks, and typography craft by Hafiz Muhammad Usman.',
    url: 'https://techusar.dev/design',
  },
};

export default function DesignPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest">
          <Palette className="w-3.5 h-3.5" />
          <span>Visual Systems &amp; Brand Marks</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Graphic Design Showcase
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Five years of continuous graphic design craft. Exploring Swiss rationalism, distinctive brand marks, print posters, and vector component systems.
        </p>
      </div>

      <DesignClient initialProjects={designProjects} />
    </div>
  );
}
