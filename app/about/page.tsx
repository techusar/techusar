import React from 'react';
import Link from 'next/link';
import { skillsData, experienceData, educationData, currentExplorations } from '@/data/skills';
import { Palette, Code2, Terminal, Compass, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Hafiz Muhammad Usman — TechUsar | Full-Stack & AI Bot Builder',
  description:
    'The story, credentials, Hafiz-e-Quran discipline, and technical career timeline of Hafiz Muhammad Usman (TechUsar) — based in Kharadar Lyari, Karachi, Pakistan.',
  keywords: [
    'Hafiz Muhammad Usman biography',
    'TechUsar founder',
    'Lyari Karachi programmer',
    'Hafiz-e-Quran developer',
    'Full-stack developer Pakistan',
    'Graphic designer Karachi',
  ],
  alternates: {
    canonical: 'https://techusar.dev/about',
  },
  openGraph: {
    title: 'About Hafiz Muhammad Usman — TechUsar',
    description:
      'Dual-craft designer and full-stack developer with 5 years in graphic design and 2 years in software engineering.',
    url: 'https://techusar.dev/about',
  },
};

export default function AboutPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      alternateName: 'TechUsar',
      jobTitle: 'Independent Graphic Designer & Full-Stack Software Engineer',
      description:
        'Hafiz Muhammad Usman is a dual-craft designer and full-stack software engineer based in Karachi, Pakistan, specializing in Next.js 15, TypeScript, custom AI bots, and brand identity design.',
      url: 'https://techusar.dev/about',
      sameAs: [
        'https://github.com/techusar',
        'https://linkedin.com/in/techusar',
        'https://wa.me/923318917330',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Karachi',
        addressRegion: 'Sindh',
        addressCountry: 'PK',
      },
      knowsAbout: [
        'Next.js 15',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Custom AI Agents',
        'WhatsApp & Telegram Bot Automation',
        'Graphic Design',
        'Brand Identity',
        'Accounting Systems',
      ],
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Bio / Hero Header */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>The Dual-Craft Practitioner</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
          Designing interfaces.{' '}
          <span className="text-neutral-600 dark:text-neutral-400 font-normal">
            Building digital products.
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-start">
          <div className="md:col-span-8 space-y-4 text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            <p>
              I am <strong className="text-neutral-950 dark:text-white font-semibold">TechUsar</strong>, an independent graphic designer and full-stack software engineer with over 8 years of production experience building digital products from scratch.
            </p>
            <p>
              Traditional product organizations draw a thick line between the creative studio and the engineering bullpen. In my work, that boundary does not exist. I sketch brand identity marks in vector tools with the exact same fluency as I architect database schemas and deploy TypeScript server components.
            </p>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              When one mind understands both the optical physics of typographic kerning and the distributed guarantees of ACID database transactions, digital products achieve a standard of cohesion rarely found in committee-built software.
            </p>
          </div>

          <div className="md:col-span-4 p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/60 dark:bg-neutral-900/60 space-y-4 text-xs font-mono">
            <div className="text-neutral-600 dark:text-neutral-400 uppercase tracking-wider text-[11px]">
              QUICK PROFILE
            </div>
            <div className="space-y-2 text-neutral-800 dark:text-neutral-200">
              <div>📍 Based in: Remote / Worldwide</div>
              <div>⚡ Primary Focus: Full-Stack & UI/UX</div>
              <div>🎯 Experience: 8+ Years</div>
              <div>✨ Design Tool: Illustrator, Figma</div>
              <div>💻 Code Tool: Next.js, Node, TS</div>
            </div>
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <Link
                href="/cv"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                <span>Read Curriculum Vitae</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What I Design & What I Build (Editorial columns) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">What I Design</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Brand identities, logos, comprehensive design systems, typography guidelines, screen-printed posters, UI design for high-complexity web and mobile applications, and visual artifacts that resist trends.
          </p>
          <ul className="space-y-2 pt-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500" />
              <span>Identity systems & vector logotypes</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500" />
              <span>Multi-brand Figma token architectures</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500" />
              <span>Editorial print & packaging layouts</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">What I Build</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Full-stack web applications, reactive SaaS dashboards, accessible component libraries, high-performance marketing engines, and developer tools powered by modern TypeScript and Node ecosystems.
          </p>
          <ul className="space-y-2 pt-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>Next.js 15 App Router & React 19</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>PostgreSQL / Redis / REST / GraphQL APIs</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>Tailwind CSS & Framer Motion interactions</span>
            </li>
          </ul>
        </div>
      </section>

      {/* SKILLS MATRIX (Design, Development, Core Systems) */}
      <section className="space-y-8 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" />
            <span>Capability Matrix</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Technical & Creative Proficiency
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.category}
              className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 space-y-4"
            >
              <div>
                <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {category.category}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {category.description}
                </p>
              </div>
              <div className="space-y-3">
                {category.items.map((skill) => (
                  <div key={skill.name} className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 space-y-1">
                    <div className="flex justify-between text-xs font-medium text-neutral-800 dark:text-neutral-200">
                      <span>{skill.name}</span>
                      <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {skill.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAREER TIMELINE */}
      <section className="space-y-8 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Experience Timeline
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Selected leadership and engineering milestones.
          </p>
        </div>

        <div className="space-y-6 relative border-l-2 border-neutral-200 dark:border-neutral-800 pl-6 ml-3">
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative space-y-2">
              <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-neutral-950" />
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                  {exp.period}
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">•</span>
                <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400">{exp.location}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                {exp.role} <span className="font-normal text-neutral-600 dark:text-neutral-400">at {exp.company}</span>
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT I AM CURRENTLY EXPLORING */}
      <section className="p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/60 dark:bg-neutral-900/40 space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active R&D Focus</span>
        </div>
        <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
          What I Am Currently Exploring
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentExplorations.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 text-xs text-neutral-800 dark:text-neutral-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
