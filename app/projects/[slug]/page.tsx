import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import { ProjectLiveViewer } from '@/components/projects/ProjectLiveViewer';
import {
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  MessageCircle,
  HelpCircle,
  Code2,
} from 'lucide-react';
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

  const title = `${project.title} — Web Development & UI Case Study | TechUsar`;

  return constructMetadata({
    title,
    description: project.description,
    path: `/projects/${project.slug}`,
    keywords: [
      project.title,
      project.category,
      project.client,
      project.liveUrl || '',
      ...project.technologies,
      'TechUsar web development project',
      'Free Next.js template download',
      'Full stack portfolio Pakistan',
      'Modern web application demo',
    ],
    ogImage: project.cover,
  });
}

export default async function ProjectDetailPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Hafiz Muhammad Usman (TechUsar), I would like to download the free template and source code for "${project.title}" (Live: ${project.liveUrl}). Please share the repository files.`
  );
  const whatsappUrl = `https://wa.me/923318917330?text=${whatsappMessage}`;

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: project.title,
    headline: project.title,
    description: project.description,
    image: project.cover,
    url: `${SITE_URL}/projects/${project.slug}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free project template download available on WhatsApp inquiry',
    },
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
  };

  const projectFaqs = [
    {
      q: `Can I get the source code and download the free template for ${project.title}?`,
      a: `Yes! TechUsar provides free template files and source code access for clients and developers. Simply click the "Download Free Template" button to contact Hafiz Muhammad Usman on WhatsApp directly for the repository ZIP or GitHub link.`,
    },
    {
      q: `Which modern technologies power this web application?`,
      a: `This project is built using ${project.technologies.join(', ')} with high-performance responsive styling, accessible semantic markup, and optimized Core Web Vitals.`,
    },
    {
      q: `Can TechUsar customize this template or build a custom web app for my business?`,
      a: `Yes. TechUsar specializes in bespoke full-stack web applications, business automation, and UI/UX design. You can commission a customized solution tailored specifically to your company requirements.`,
    },
  ];

  const otherProjects = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <article className="w-full py-8 sm:py-12 bg-white dark:bg-[#050508]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Projects', href: '/projects' },
            { label: project.title, href: `/projects/${project.slug}` },
          ]}
        />

        {/* Hero Meta & Title */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {project.projectNumber && (
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold">
                #{project.projectNumber}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-medium">
              {project.category.toUpperCase()}
            </span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">Client: {project.client}</span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">Release: {project.year}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
              >
                <span>Launch Live Web App</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Download Free Template (WhatsApp)</span>
            </a>
          </div>
        </header>

        {/* Live Interactive Viewer / Preview Container */}
        <section className="space-y-3">
          <ProjectLiveViewer
            title={project.title}
            liveUrl={project.liveUrl}
            coverImage={project.cover}
          />
        </section>

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

        {/* Deep Dive Narrative & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
          {/* Main Editorial Case Study */}
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Project Overview &amp; Architecture
              </h2>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {project.description}
              </p>
            </section>

            {project.challenge && (
              <section className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  The Technical Challenge &amp; Problem Scope
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
                  Full-Stack Implementation &amp; Performance
                </h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.developmentDetails}
                </p>
              </section>
            )}

            {/* Key Features List */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                  <span>Key Features &amp; Functional Highlights</span>
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

            {/* Project FAQs for SEO */}
            <section className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-500" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-3">
                {projectFaqs.map((faq, idx) => (
                  <div
                    key={idx}
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
                  <div className="text-neutral-500">LIVE DEMO URL</div>
                  <div className="font-medium text-blue-600 dark:text-blue-400 mt-0.5 truncate">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      {project.liveUrl}
                    </a>
                  </div>
                </div>

                <div>
                  <div className="text-neutral-500">FREE TEMPLATE</div>
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Available via WhatsApp Request
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

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Download Free Template</span>
                </a>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  <span>Commission Custom Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Related Service Links */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
              <div className="text-xs font-mono text-neutral-500">ALL SERVICES</div>
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
                    href="/tools"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
                  >
                    <span>Developer &amp; Business Tools</span>
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
              </ul>
            </div>
          </aside>
        </div>

        {/* Project Pagination (Previous / Next) */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500 transition-colors max-w-[45%]"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all" />
            <div className="text-left truncate">
              <div className="text-[11px] font-mono text-neutral-500">PREVIOUS PROJECT</div>
              <div className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white truncate">
                {prevProject.title}
              </div>
            </div>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center justify-end gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500 transition-colors max-w-[45%] text-right"
          >
            <div className="truncate">
              <div className="text-[11px] font-mono text-neutral-500">NEXT PROJECT</div>
              <div className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white truncate">
                {nextProject.title}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* More Case Studies Grid */}
        <section className="pt-6 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Explore More Web Development Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherProjects.map((op) => (
              <Link
                key={op.slug}
                href={`/projects/${op.slug}`}
                className="group p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                    #{op.projectNumber || 'WEB'} • {op.category}
                  </div>
                  <div className="font-bold text-sm text-neutral-950 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                    {op.title}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {op.shortDescription}
                  </p>
                </div>
                <div className="pt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
                  <span>Open Case Study</span>
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
