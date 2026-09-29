import React from 'react';
import Link from 'next/link';
import { skillsData, experienceData, educationData, currentExplorations } from '@/data/skills';
import {
  Palette,
  Code2,
  Terminal,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
  Zap,
  Bot,
  MessageSquare,
  Globe,
  Clock,
  HeartHandshake,
  Layers,
  Linkedin,
  Github,
  Twitter,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import type { Metadata } from 'next';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = constructMetadata({
  title: 'About Hafiz Muhammad Usman — Graphic Designer & Full-Stack Developer | TechUsar',
  description:
    'The authentic journey of Hafiz Muhammad Usman (TechUsar): 18-year-old self-taught engineer and designer from Kharadar Lyari, Karachi. 5 years in graphic design, 4 years in full-stack Next.js and AI bot automation, guided by disciplined engineering craft.',
  path: '/about',
  keywords: [
    'Hafiz Muhammad Usman biography',
    'TechUsar founder',
    'Graphic designer Lyari Karachi',
    'Full-stack developer Pakistan',
    'Full-stack Next.js software engineer',
    'Young programmers Karachi',
    'Next.js developer Pakistan',
    'WhatsApp bot builder Karachi',
    'Swiss typography designer',
  ],
});

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
        'Hafiz Muhammad Usman is an 18-year-old self-taught dual-craft designer and full-stack software engineer based in Kharadar Lyari, Karachi, Pakistan. He combines 5 years of commercial vector graphic design with 4 years of full-stack TypeScript, Next.js 15, and custom AI WhatsApp automation engineering.',
      url: `${SITE_URL}/about`,
      sameAs: [
        'https://www.linkedin.com/in/hafiz-muhammad-usman-514888397/',
        'https://github.com/techusar',
        'https://x.com/techusar',
        'https://wa.me/923318917330',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kharadar Lyari, Karachi',
        addressRegion: 'Sindh',
        addressCountry: 'PK',
      },
      knowsAbout: [
        'Next.js 15 App Router',
        'React 19',
        'TypeScript',
        'Tailwind CSS v4',
        'Node.js & C# .NET Core',
        'PostgreSQL & Database Modeling',
        'Custom AI Agents & WhatsApp Cloud API Bots',
        'Swiss Typography & Grid Systems',
        'Brand Identity & Vector Geometry',
        'Accounting & Inventory Management Software',
      ],
    },
  };

  const values = [
    {
      icon: ShieldCheck,
      title: 'Discipline Over Motivation',
      desc: 'Rigorous engineering discipline and relentless attention to detail underpin every line of code and vector anchor point. I deliver commitments on time without excuses.',
    },
    {
      icon: Layers,
      title: 'Zero Translation Loss',
      desc: 'Most software products suffer when designers and engineers misunderstand each other. As a dual-discipline practitioner, I eliminate handoff friction completely.',
    },
    {
      icon: Zap,
      title: 'Obsession with Performance',
      desc: 'Websites must load in under 1.2 seconds, achieve zero cumulative layout shift (CLS), and pass Core Web Vitals with straight 95+ scores on mobile devices.',
    },
    {
      icon: HeartHandshake,
      title: 'Transparent Collaboration',
      desc: 'No corporate jargon, hidden charges, or endless committee meetings. Direct access via WhatsApp and milestone-based progress tracking.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="pt-2">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Hafiz Muhammad Usman' },
          ]}
        />
      </div>

      {/* Hero / Profile Intro */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-xs font-mono font-semibold text-blue-700 dark:text-blue-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hafiz Muhammad Usman &bull; Founder of TechUsar</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
          Graphic Designer &amp;{' '}
          <span className="text-blue-600 dark:text-blue-400">Full-Stack Developer</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-start">
          <div className="md:col-span-8 space-y-5 text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            <p>
              Assalam-o-Alaikum. I am <strong className="text-neutral-950 dark:text-white font-bold">Hafiz Muhammad Usman</strong>, an 18-year-old self-taught graphic designer and full-stack software engineer operating under the independent banner of <strong className="text-neutral-950 dark:text-white font-bold">TechUsar</strong>.
            </p>
            <p>
              I was born and raised in <strong className="text-neutral-950 dark:text-white">Kharadar Lyari, Karachi, Pakistan</strong>. In an industry where people frequently divide themselves into either &ldquo;creative visual artists&rdquo; or &ldquo;technical backend programmers,&rdquo; I deliberately operate across both disciplines.
            </p>
            <p>
              With <strong className="text-neutral-950 dark:text-white">5 years of commercial experience in graphic design and brand identity</strong>, combined with <strong className="text-neutral-950 dark:text-white">4 years of engineering production full-stack web applications and custom AI automation bots</strong>, I help technical founders, business owners, and growing enterprises launch digital products that look iconic and perform flawlessly.
            </p>
          </div>

          {/* Fact Card */}
          <div className="md:col-span-4 p-6 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-4 text-xs font-mono shadow-xs">
            <div className="text-neutral-500 uppercase tracking-wider text-[11px] font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2">
              VERIFIED PRACTITIONER PROFILE
            </div>
            <div className="space-y-2.5 text-neutral-800 dark:text-neutral-200">
              <div className="flex justify-between">
                <span className="text-neutral-500">Age:</span>
                <span className="font-bold">18 Years Old</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Location:</span>
                <span className="font-bold">Kharadar Lyari, Karachi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Education:</span>
                <span className="font-bold">Self-Taught Engineer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Design Experience:</span>
                <span className="font-bold">5 Years (Since 2021)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Code Experience:</span>
                <span className="font-bold">4 Years (Full-Stack)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Primary Focus:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">Next.js, Bots &amp; Branding</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
              <a
                href="https://tools.techusar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                <span>Launch TechTools Suite</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20I%20want%20to%20collaborate."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
              >
                <span>WhatsApp (+92 331 8917330)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Story & Roots in Kharadar Lyari */}
      <section className="space-y-6 pt-10 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>Origins &amp; Cultural Roots</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
          The TechUsar Story: From Lyari Streets to Global Web Standards
        </h2>

        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
          <p>
            Kharadar Lyari is one of the oldest, most vibrant urban settlements in Karachi. While external media reports often fixate on historical sociopolitical challenges, the reality inside our neighborhoods is profoundly different: it is an energetic community of industrious merchants, master craftsmen, footballers, and exceptionally talented young people with an intense appetite for self-improvement.
          </p>
          <p>
            Growing up in Lyari taught me that nothing is handed to you on a silver platter. You do not wait for ideal corporate sponsorships or expensive foreign diplomas to start building things. With a second-hand computer, an internet connection, and unyielding curiosity, I immersed myself into the digital realm at an early age.
          </p>
          <p>
            The name <strong className="text-neutral-950 dark:text-white font-semibold">TechUsar</strong> represents this spirit: technical mastery combined with purposeful utility. It is not an impersonal venture agency; it is my direct craft commitment to every client who entrusts their brand and software to my hands.
          </p>
        </div>
      </section>

      {/* The Engineering Foundation: Rigorous Discipline & Zero Tolerance for Errors */}
      <section className="p-8 sm:p-10 rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-700 dark:text-blue-400 uppercase tracking-widest font-semibold">
            <Award className="w-4 h-4" />
            <span>Engineering Rigor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            High-Precision Craft &amp; Engineering Mindset
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Building mission-critical software and iconic brand systems demands unrelenting mental discipline, hours of uninterrupted focus, and an uncompromising intolerance for mistakes. Every pixel and every line of code must serve a deliberate architectural purpose.
          </p>
          <p>
            In full-stack software development, if you fail to guard an edge case or miss a database constraint, you crash a production transaction. The same stamina, ethical dedication, and analytical precision I bring to computer programming and vector mathematics guides my engineering work with clients worldwide today.
          </p>
        </div>
      </section>

      {/* Dual Discipline Breakdown: Design + Development */}
      <section className="space-y-8 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
            <Compass className="w-4 h-4" />
            <span>Dual-Discipline Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Why Graphic Design (5 Years) + Full-Stack (4 Years) is Rare
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            In standard agencies, the graphic designer creates an impossible layout in Figma, and the backend developer writes functional code that looks completely unpolished. Here is how I eliminate that gap:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Design Column */}
          <div className="p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Palette className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                5 YEARS COMMERCIAL CRAFT
              </span>
            </div>

            <h3 className="text-2xl font-bold text-neutral-950 dark:text-white">
              Visual Design &amp; Brand Systems
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I started commercial graphic design in 2021. Over 5 years, I mastered vector geometry in Adobe Illustrator, Swiss typographic hierarchy, packaging die-lines, and comprehensive corporate guidelines.
            </p>

            <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <div className="text-xs font-mono uppercase text-neutral-500 font-semibold">Design Toolkit:</div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Adobe Illustrator</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Figma Auto-Layout</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Swiss Baseline Grids</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Vector Anchor Reduction</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Design Token Systems</span>
              </div>
            </div>
          </div>

          {/* Development Column */}
          <div className="p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                4 YEARS FULL-STACK CODE
              </span>
            </div>

            <h3 className="text-2xl font-bold text-neutral-950 dark:text-white">
              Full-Stack &amp; AI Automation
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Over the past 4 years, I expanded into backend and full-stack engineering: Next.js 15 App Router, strict TypeScript, C# .NET Core, relational PostgreSQL databases, and official Meta WhatsApp Cloud API bots.
            </p>

            <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <div className="text-xs font-mono uppercase text-neutral-500 font-semibold">Tech Toolkit:</div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Next.js 15 (RSC)</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">React 19 &amp; TypeScript</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Tailwind CSS v4</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">PostgreSQL &amp; Drizzle</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">WhatsApp Cloud API</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Gemini &amp; OpenAI Bots</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values & Work Philosophy */}
      <section className="space-y-8 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            How I Work &amp; What I Stand For
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 space-y-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white">{val.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Future Vision */}
      <section className="p-8 sm:p-10 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
          The Future Vision for TechUsar
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          My long-term ambition for TechUsar is to prove that world-class software engineering and Swiss-caliber design systems can emerge directly from the historic streets of Kharadar Lyari, Karachi. By developing production web software, authoring free developer utilities, releasing open-source Next.js templates, and training the next generation of Pakistani youth, I aim to build a lasting legacy of technical excellence.
        </p>
      </section>

      {/* Direct Contact & Social Proof */}
      <section className="p-8 sm:p-12 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-950 text-white dark:bg-neutral-900/90 space-y-6 text-center max-w-4xl mx-auto">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold block">
            DIRECT FOUNDER COLLABORATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Let&apos;s Build Something Iconic Together
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            I accept a limited number of high-impact client projects every quarter to ensure absolute focus and personal craftsmanship on each engagement.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20I%20want%20to%20hire%20you%20for%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold tracking-wide transition-all shadow-md inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Direct WhatsApp (+92 331 8917330)</span>
          </a>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 text-xs font-mono font-bold tracking-wide transition-all inline-flex items-center gap-2"
          >
            <span>Submit Detailed Project Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
          <a
            href="https://www.linkedin.com/in/hafiz-muhammad-usman-514888397/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/techusar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://x.com/techusar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Twitter className="w-3.5 h-3.5" />
            <span>X (Twitter)</span>
          </a>
          <span>✉️ techusar17@gmail.com</span>
        </div>
      </section>
    </div>
  );
}
