import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import type { Metadata } from 'next';

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found — TechUsar' };

  const projectUrl = `https://techusar.com/work/${project.slug}`;

  return {
    title: `${project.title} — Case Study by TechUsar`,
    description: project.description,
    keywords: [
      project.title,
      project.category,
      project.client,
      ...project.technologies,
      'TechUsar case study',
      'Full stack project',
    ],
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: `${project.title} — Case Study by TechUsar`,
      description: project.description,
      url: projectUrl,
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Back to Work link */}
      <div>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Work</span>
        </Link>
      </div>

      {/* Project Hero Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/60 dark:border-blue-800/60">
            {project.category}
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-600 dark:text-neutral-400">Client: {project.client}</span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-600 dark:text-neutral-400">Year: {project.year}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
            >
              <span>Visit Live Application</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Hero Cover Visual */}
      <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-100 dark:bg-neutral-900 shadow-xl">
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

      {/* Meta Specs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div>
          <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase">My Role</div>
          <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-1">{project.role}</div>
        </div>
        <div>
          <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase">Timeline</div>
          <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-1">4 Months ({project.year})</div>
        </div>
        <div>
          <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase">Core Stack</div>
          <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-1">
            {project.technologies.slice(0, 2).join(', ')}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase">Deployment</div>
          <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-1">Production Active</div>
        </div>
      </div>

      {/* Key Metrics / Impact */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
            Measurable Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 shadow-xs"
              >
                <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900 dark:text-white">
                  {m.value}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenge & Approach (Editorial split) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>The Challenge</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>The Architectural Approach</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {project.approach}
          </p>
        </div>
      </div>

      {/* Gallery Image 2 */}
      {project.gallery && project.gallery[1] && (
        <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-100 dark:bg-neutral-900 shadow-md">
          <Image
            src={project.gallery[1]}
            alt={`${project.title} interface architecture`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            referrerPolicy="no-referrer"
            className="object-cover"
          />
        </div>
      )}

      {/* Design Direction & Development Deep Dive */}
      <div className="space-y-8 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
            Design Direction & Typography System
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            {project.designDirection}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
            Development & Engineering Details
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            {project.developmentDetails}
          </p>
        </div>

        {/* Feature List */}
        <div className="p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
            Delivered Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Tech Stack Table */}
      <div className="space-y-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
          Technologies Deployed
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-800 dark:text-neutral-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Related Projects */}
      <div className="pt-12 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-6">
        <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
          Other Selected Case Studies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedProjects.map((rel) => (
            <Link
              key={rel.id}
              href={`/work/${rel.slug}`}
              className="group p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase">
                  {rel.category} — {rel.year}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {rel.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {rel.shortDescription}
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <span>Read case study</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
