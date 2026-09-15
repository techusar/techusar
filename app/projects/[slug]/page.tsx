import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const descriptiveTitles: Record<string, string> = {
  'kroma-cloud': 'Kroma Cloud — Enterprise Distributed Telemetry Platform | TechUsar Projects',
  'strata-design-system':
    'Strata Design System — Headless React & Tailwind Tokens | TechUsar Projects',
  'vanguard-capital':
    'Vanguard Capital — Institutional Wealth Management Portal | TechUsar Projects',
  'synthetix-audio':
    'Synthetix Web DAW — Browser Audio Synthesis & Sequencer | TechUsar Projects',
  'lumen-commerce':
    'Lumen Atelier — Luxury Architectural Lighting E-commerce | TechUsar Projects',
};

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found — TechUsar' };

  const title =
    descriptiveTitles[project.slug] || `${project.title} — Full-Stack Case Study | TechUsar`;

  return constructMetadata({
    title,
    description: project.description,
    path: `/projects/${project.slug}`,
    keywords: [
      project.title,
      project.category,
      project.client,
      ...project.technologies,
      'TechUsar case study',
      'Full stack web application',
      'Web development project',
    ],
    ogImage: project.cover,
  });
}

export default async function ProjectDetailPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: descriptiveTitles[project.slug] || project.title,
    description: project.description,
    image: project.cover,
    creator: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechUsar',
      url: SITE_URL,
    },
    url: `${SITE_URL}/projects/${project.slug}`,
  };

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article className="w-full py-8 sm:py-12 bg-white dark:bg-[#050508]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Projects', href: '/projects' },
            { label: project.title, href: `/projects/${project.slug}` },
          ]}
        />

        {/* Hero Meta & Title */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {project.category.toUpperCase()}
            </span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">Client: {project.client}</span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">Year: {project.year}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
              >
                <span>Launch Live System</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </header>

        {/* Featured Cover Display */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={project.cover}
            alt={`${project.title} interface showcase`}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Project Metrics Callout */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            {project.metrics.map((metric, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white font-mono">
                  {metric.value}
                </div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Deep Dive Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-6">
          {/* Main Editorial Case Study */}
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Project Overview &amp; Background
              </h2>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {project.description}
              </p>
            </section>

            {project.challenge && (
              <section className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  The Technical Challenge
                </h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.challenge}
                </p>
              </section>
            )}

            {project.approach && (
              <section className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  Design Approach &amp; User Experience
                </h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.approach}
                </p>
                {project.designDirection && (
                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {project.designDirection}
                  </p>
                )}
              </section>
            )}

            {project.developmentDetails && (
              <section className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  Full-Stack Engineering &amp; Architecture
                </h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.developmentDetails}
                </p>
              </section>
            )}

            {/* Key Features List */}
            {project.keyFeatures && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  Core Architectural Capabilities
                </h2>
                <div className="space-y-2.5">
                  {project.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-800 dark:text-neutral-200 leading-normal">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery Screenshots */}
            {project.gallery && project.gallery.length > 1 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  Interface Screenshots &amp; Component Details
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {project.gallery.slice(1).map((imgUrl, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/10] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
                    >
                      <Image
                        src={imgUrl}
                        alt={`${project.title} screenshot ${i + 2}`}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Technical Sidebar */}
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 space-y-5">
              <h3 className="font-bold text-neutral-950 dark:text-white text-sm uppercase tracking-wider font-mono">
                Project Specification
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <div className="text-neutral-500">ROLE</div>
                  <div className="font-medium text-neutral-900 dark:text-white mt-0.5">
                    {project.role}
                  </div>
                </div>

                <div>
                  <div className="text-neutral-500">DELIVERY TIMELINE</div>
                  <div className="font-medium text-neutral-900 dark:text-white mt-0.5">
                    Production Release {project.year}
                  </div>
                </div>

                <div>
                  <div className="text-neutral-500">RESPONSIVE DESIGN</div>
                  <div className="font-medium text-neutral-900 dark:text-white mt-0.5">
                    100% Mobile, Tablet &amp; 4K Desktop Tested
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="text-xs font-mono text-neutral-500">TECHNOLOGY STACK</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded text-xs font-mono bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  <span>Commission Similar System</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Related Service Links */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
              <div className="text-xs font-mono text-neutral-500">RELATED SERVICES</div>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <Link
                    href="/web-development"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
                  >
                    <span>Full-Stack Web Development</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ui-ux-design"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
                  >
                    <span>UI/UX Design Systems</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/web-design"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
                  >
                    <span>Bespoke Web Design</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Other Projects Section */}
        <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Explore More Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((op) => (
              <Link
                key={op.slug}
                href={`/projects/${op.slug}`}
                className="group p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-xs font-mono text-neutral-500">{op.category}</div>
                  <div className="font-bold text-lg text-neutral-950 dark:text-white group-hover:text-blue-600 transition-colors">
                    {op.title}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {op.shortDescription}
                  </p>
                </div>
                <div className="pt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
