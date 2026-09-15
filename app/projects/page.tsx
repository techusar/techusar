import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import { Layers, ArrowRight, ExternalLink, Code, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Client Projects & Web Development Case Studies | TechUsar',
  description:
    'Explore production web applications, SaaS platforms, design systems, and digital products engineered by Hafiz Muhammad Usman (TechUsar). In-depth technical case studies with metrics and architecture details.',
  path: '/projects',
  keywords: [
    'TechUsar projects',
    'Full stack case studies',
    'Web development portfolio',
    'Next.js 15 projects',
    'React TypeScript portfolio',
    'Design system case study',
    'Karachi web developer projects',
  ],
});

export default function ProjectsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TechUsar Client Projects & Software Case Studies',
    description: 'Case studies of custom web applications and design systems built by TechUsar.',
    url: `${SITE_URL}/projects`,
    hasPart: projects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      url: `${SITE_URL}/projects/${p.slug}`,
      description: p.description,
      image: p.cover,
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }]} />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
          <Layers className="w-3.5 h-3.5" />
          <span>PRODUCTION CASE STUDIES &amp; WEB DEVELOPMENT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
          Client Projects &amp; Software Case Studies
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Production digital products, full-stack web applications, and multi-brand platforms
          engineered with Next.js 15, TypeScript, and clean modular code.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => {
          const isComingSoon = project.status === 'coming_soon';
          const isInProgress = project.status === 'in_progress';

          return (
            <article
              key={project.slug}
              className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={project.cover}
                  alt={`${project.title} - ${project.category}`}
                  fill
                  className={`object-cover transition-transform duration-300 group-hover:scale-[1.02] ${
                    isComingSoon ? 'filter grayscale-[30%] opacity-85' : ''
                  }`}
                  referrerPolicy="no-referrer"
                />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-neutral-900/80 text-white backdrop-blur-xs">
                      {project.category}
                    </span>
                    {project.isWebDev && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-600/85 text-white backdrop-blur-xs">
                        <Code className="w-2.5 h-2.5" />
                        Web Dev
                      </span>
                    )}
                  </div>

                  {isComingSoon ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-amber-500 text-neutral-950 shadow-xs">
                      <Clock className="w-2.5 h-2.5" />
                      Asset Pending
                    </span>
                  ) : isInProgress ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-indigo-600 text-white shadow-xs">
                      In Progress
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-emerald-600/90 text-white shadow-xs">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Live
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-neutral-500">
                    Client: {project.client} • {project.year}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                      >
                        <span>Live Preview</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
