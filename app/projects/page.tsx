import React from 'react';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import { ProjectsExplorer } from '@/components/projects/ProjectsExplorer';
import { Layers, Sparkles } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: '50+ Web Development Projects & Live Demos | Free Templates | TechUsar',
  description:
    'Explore 50+ live production web applications, SaaS platforms, e-commerce storefronts, and niche portals engineered by Hafiz Muhammad Usman (TechUsar). Test live Netlify builds and download free templates via WhatsApp.',
  path: '/projects',
  keywords: [
    'TechUsar projects',
    '50 web development projects',
    'Netlify live demos',
    'Free Next.js templates download',
    'React TypeScript portfolio',
    'Web development case studies',
    'Full stack web apps Pakistan',
    'Hafiz Muhammad Usman portfolio',
  ],
});

export default function ProjectsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TechUsar 50+ Web Development Projects & Free Templates',
    description:
      'Case studies and live interactive demos of 50+ production web applications built by Hafiz Muhammad Usman.',
    url: `${SITE_URL}/projects`,
    hasPart: projects.map((p) => ({
      '@type': 'WebApplication',
      name: p.title,
      url: `${SITE_URL}/projects/${p.slug}`,
      description: p.description,
      image: p.cover,
      operatingSystem: 'All',
      applicationCategory: 'WebApplication',
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }]} />

      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>50+ LIVE WEB DEVELOPMENT BUILDS &amp; CASE STUDIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
          Web Development Projects &amp; Free Templates
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Production digital products, SaaS dashboards, and commercial platforms built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Test live builds directly on Netlify or download free code templates via WhatsApp.
        </p>
      </div>

      {/* Interactive Projects Explorer */}
      <ProjectsExplorer initialProjects={projects} />
    </div>
  );
}
