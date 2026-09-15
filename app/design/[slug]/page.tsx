import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { designProjects } from '@/data/design-projects';
import { ArrowLeft, Check, Palette, Type, Layers, ExternalLink, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

interface DesignDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return designProjects.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: DesignDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = designProjects.find((d) => d.slug === slug);
  if (!project) return { title: 'Project Not Found — TechUsar' };

  return {
    title: `${project.title} — Design Case Study by TechUsar`,
    description: project.description,
  };
}

export default async function DesignDetailPage({ params }: DesignDetailPageProps) {
  const { slug } = await params;
  const project = designProjects.find((d) => d.slug === slug);

  if (!project) {
    notFound();
  }

  const related = designProjects.filter((d) => d.slug !== project.slug).slice(0, 2);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Back link */}
      <div>
        <Link
          href="/design"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Design Archive</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 font-semibold border border-purple-200/60 dark:border-purple-800/60">
            {project.category}
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-600 dark:text-neutral-400">Client: {project.client}</span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-600 dark:text-neutral-400">Year: {project.year}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </div>

      {/* Hero Visual Artwork */}
      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-100 dark:bg-neutral-900 shadow-xl">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          referrerPolicy="no-referrer"
          className="object-cover object-center"
        />
      </div>

      {/* Concept & Process Story */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="md:col-span-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
              The Concept & Visual Direction
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.concept}
            </p>
          </div>

          {/* Deliverables List */}
          <div className="space-y-3 pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 font-mono">
              Key Deliverables Created
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800/60"
                >
                  <Check className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Color Palette & Typography */}
        <div className="md:col-span-4 space-y-6 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40">
          {/* Color Palette Swatches */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
              <Palette className="w-4 h-4 text-neutral-500" />
              <span>COLOR PALETTE</span>
            </div>
            <div className="space-y-2">
              {project.colorPalette.map((color, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-md border border-black/10 shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-neutral-800 dark:text-neutral-200">{color.name}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 uppercase">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
              <Type className="w-4 h-4 text-neutral-500" />
              <span>TYPOGRAPHY PAIRING</span>
            </div>
            <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
              {project.typography.map((typeItem, tIdx) => (
                <div key={tIdx} className="space-y-0.5">
                  <div className="text-neutral-500 text-[10px] uppercase">{typeItem.role}</div>
                  <div className="font-semibold text-neutral-900 dark:text-white">{typeItem.family}</div>
                  <div className="text-[11px] text-neutral-400 italic">&ldquo;{typeItem.sample}&rdquo;</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
              TOOLS UTILITY
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[11px] font-mono text-neutral-700 dark:text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 1 && (
        <div className="space-y-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
            Artifact Showcase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.slice(1).map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-4/3 rounded-xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-100 dark:bg-neutral-900 shadow-md"
              >
                <Image
                  src={img}
                  alt={`${project.title} detail artifact ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Design Projects */}
      <div className="pt-12 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-6">
        <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
          Explore More Design Work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {related.map((rel) => (
            <Link
              key={rel.id}
              href={`/design/${rel.slug}`}
              className="group p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase">
                  {rel.category} — {rel.year}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {rel.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {rel.description}
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                <span>View project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
