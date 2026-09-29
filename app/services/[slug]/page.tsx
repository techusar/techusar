import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { servicesData, getServiceBySlug, getAllServices } from '@/data/services-data';
import { projects } from '@/data/projects';
import { getBlogPostBySlug } from '@/lib/blog';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, generateServiceSchema, generateFAQSchema, SITE_URL } from '@/lib/seo';
import {
  Code2,
  Zap,
  Bot,
  MessageSquare,
  Palette,
  Compass,
  Layers,
  Terminal,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  Briefcase,
  Layers3,
  Cpu,
  Workflow,
  Lightbulb,
} from 'lucide-react';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | TechUsar',
    };
  }

  return constructMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: [service.primaryKeyword, ...service.secondaryKeywords],
  });
}

// Icon resolver helper
function getServiceIcon(name: string) {
  switch (name) {
    case 'Code2':
      return <Code2 className="w-6 h-6" />;
    case 'Zap':
      return <Zap className="w-6 h-6" />;
    case 'Bot':
      return <Bot className="w-6 h-6" />;
    case 'MessageSquare':
      return <MessageSquare className="w-6 h-6" />;
    case 'Palette':
      return <Palette className="w-6 h-6" />;
    case 'Compass':
      return <Compass className="w-6 h-6" />;
    case 'Layers':
      return <Layers className="w-6 h-6" />;
    case 'Terminal':
      return <Terminal className="w-6 h-6" />;
    default:
      return <Sparkles className="w-6 h-6" />;
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = projects.filter((p) =>
    service.relatedProjectSlugs.includes(p.slug)
  );

  const relatedBlogs = service.relatedBlogSlugs
    .map((s) => getBlogPostBySlug(s))
    .filter(Boolean);

  const otherServices = getAllServices().filter((s) => s.slug !== service.slug);

  const serviceSchema = generateServiceSchema({
    name: service.title,
    description: service.metaDescription,
    url: `/services/${service.slug}`,
    serviceType: service.serviceType,
  });

  const faqSchema = generateFAQSchema(service.faqs);

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Usman! I am interested in your ${service.title} services. Let's discuss a project.`
  );

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 lg:space-y-24">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      {/* Hero Header */}
      <section className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 text-xs font-mono font-medium text-blue-700 dark:text-blue-300">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>TECHUSAR SPECIALIZED SERVICES</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
          {service.heroHeadline}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {service.heroDescription}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={`https://wa.me/923318917330?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            id={`service-whatsapp-cta-${service.slug}`}
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold tracking-wide transition-all shadow-sm inline-flex items-center gap-2"
          >
            <span>Discuss on WhatsApp (+92 331 8917330)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <Link
            href="/contact"
            id={`service-contact-cta-${service.slug}`}
            className="px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:border-blue-500 text-sm font-semibold transition-all inline-flex items-center gap-2"
          >
            <span>Request Project Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 1: Problems Solved */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-600 dark:text-rose-400 uppercase tracking-widest font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Eliminating Operational Bottlenecks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Common Traps &amp; How TechUsar Solves Them
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-base">
            Most businesses waste months and thousands of dollars dealing with these exact failures before partnering with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.problemsSolved.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center justify-center font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                  {item.problem}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <strong className="text-rose-600 dark:text-rose-400 font-semibold block mb-1">The Reality:</strong>
                  {item.agony}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-1.5">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold block">
                  The TechUsar Fix:
                </span>
                <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Who This Is For (Target Clients) */}
      <section className="p-8 sm:p-10 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-gradient-to-br from-neutral-50 via-white to-neutral-100/60 dark:from-neutral-900/80 dark:via-neutral-900/40 dark:to-neutral-950 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>Target Profiles</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Who This Service Is Built For
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
            We work with leaders who value uncompromised code quality, long-term stability, and direct founder-level communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.targetClients.map((client, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 space-y-3"
            >
              <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                {client.clientType}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {client.description}
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1">
                  Ideal Scope:
                </span>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  {client.idealFor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Detailed Deliverables & Features */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
            <Layers3 className="w-4 h-4" />
            <span>Full Scope of Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            What You Receive: Tangible Features &amp; Deliverables
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-base">
            Every engagement includes complete documentation, full intellectual property transfer, and production-grade quality assurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.featuresDeliverables.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/70 space-y-4"
            >
              <h3 className="text-base font-bold text-neutral-950 dark:text-white pb-3 border-b border-neutral-200/80 dark:border-neutral-800/80">
                {cat.category}
              </h3>
              <ul className="space-y-3">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: In-Depth Long-Form Technical Strategy */}
      <section className="space-y-8 pt-4">
        {service.longContentSections.map((sec, idx) => (
          <div
            key={idx}
            className="p-8 sm:p-10 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/40 dark:bg-neutral-900/40 space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              {sec.heading}
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
              {sec.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 5: 5-Phase Process */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest font-semibold">
            <Workflow className="w-4 h-4" />
            <span>Execution Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            The 5-Step Engineering &amp; Design Process
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-base">
            A battle-tested workflow that prevents scope creep, ensures clear timelines, and keeps you informed every single day.
          </p>
        </div>

        <div className="space-y-4">
          {service.processSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/80 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 lg:max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-mono font-bold text-xs">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                    {step.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                    {step.duration}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="lg:border-l lg:border-neutral-200/80 dark:lg:border-neutral-800/80 lg:pl-6 space-y-1.5 shrink-0 min-w-[240px]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
                  Milestone Deliverables:
                </span>
                <ul className="space-y-1">
                  {step.deliverables.map((deliv, dIdx) => (
                    <li key={dIdx} className="text-xs text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Technologies Stack */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
            <Cpu className="w-4 h-4" />
            <span>Under The Hood</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Primary Technologies &amp; Frameworks
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {service.technologies.map((tech, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-1"
            >
              <span className="font-mono font-bold text-sm text-neutral-950 dark:text-white block">
                {tech.name}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                {tech.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: Real-World Use Cases */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
            <Lightbulb className="w-4 h-4" />
            <span>Proven Architectures</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Real-World Architecture &amp; Use Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.useCases.map((uc, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/70 space-y-4"
            >
              <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                {uc.title}
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                <p>
                  <strong className="text-neutral-900 dark:text-white font-semibold">Context: </strong>
                  {uc.scenario}
                </p>
                <p>
                  <strong className="text-neutral-900 dark:text-white font-semibold">Architecture: </strong>
                  {uc.architecture}
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold block">
                  Measured Outcome:
                </span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                  {uc.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: Related Real Projects */}
      {relatedProjects.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800/80">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Case Studies Featuring This Craft
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Inspect real production code, architectural challenges, and live URLs.
              </p>
            </div>
            <Link
              href="/work"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="group block p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/50 dark:bg-neutral-900/50 hover:border-blue-500/60 transition-all space-y-3"
              >
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-semibold">
                  {project.category}
                </span>
                <h3 className="text-base font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-mono text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 9: Related Blog Articles */}
      {relatedBlogs.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800/80">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Related Technical Guides &amp; Articles
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Explore in-depth tutorials and insights written by Hafiz Muhammad Usman.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedBlogs.map((blog) => (
              blog && (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="group block p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 hover:border-blue-500/60 transition-all space-y-2"
                >
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest font-semibold">
                    {blog.category}
                  </span>
                  <h3 className="text-base font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-xs font-mono text-blue-600 dark:text-blue-400">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              )
            ))}
          </div>
        </section>
      )}

      {/* SECTION 10: Frequently Asked Questions */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Transparent Answers</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
          {service.faqs.map((faq, idx) => (
            <div key={idx} className="py-6 space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: Other Specialized Services Hub Navigation */}
      <section className="space-y-4 pt-4">
        <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-wider">
          Explore Other Core Services
        </h3>
        <div className="flex flex-wrap gap-2">
          {otherServices.map((other) => (
            <Link
              key={other.slug}
              href={`/services/${other.slug}`}
              className="px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70 hover:border-blue-500/60 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              {other.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="p-8 sm:p-12 rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-blue-950/40 dark:via-neutral-900 dark:to-neutral-950 space-y-6 text-center max-w-4xl mx-auto shadow-md">
        <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-sm">
          {getServiceIcon(service.iconName)}
        </span>

        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            Ready to Build Your {service.title}?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Direct collaboration with Hafiz Muhammad Usman. No junior handoffs, no bloated agencies, and no missed deadlines.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={`https://wa.me/923318917330?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold tracking-wide transition-all shadow-sm inline-flex items-center gap-2"
          >
            <span>Message on WhatsApp (0331-8917330)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <Link
            href="/contact"
            className="px-7 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-sm font-bold tracking-wide transition-all shadow-sm inline-flex items-center gap-2"
          >
            <span>Send Project Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </article>
  );
}
