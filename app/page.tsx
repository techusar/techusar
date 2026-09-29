'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/hero/HeroSection';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ThemeCard } from '@/components/themes/ThemeCard';
import { DesignCard } from '@/components/design/DesignCard';
import { ThemeLivePreviewModal } from '@/components/themes/ThemeLivePreviewModal';
import { PurchaseModal } from '@/components/themes/PurchaseModal';
import { LightboxModal } from '@/components/design/LightboxModal';
import { ContactForm } from '@/components/contact/ContactForm';
import { useSiteData } from '@/components/providers/SiteDataProvider';
import { projects } from '@/data/projects';
import { themes } from '@/data/themes';
import { designProjects } from '@/data/design-projects';
import { servicesData } from '@/data/services-data';
import { Theme, DesignProject } from '@/types';
import {
  ArrowRight,
  Sparkles,
  Layers,
  ShoppingBag,
  Palette,
  Code2,
  Compass,
  CheckCircle2,
  Terminal,
  Wrench,
  FileText,
  Receipt,
  TrendingUp,
  Braces,
  Calculator,
  Bot,
  MessageSquare,
  BookOpen,
  ExternalLink,
  Globe,
  Shield,
  Zap,
  Star,
  HelpCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Award,
  ChevronRight,
  Cpu,
  Mail,
} from 'lucide-react';
import { getAllBlogPosts } from '@/lib/blog';

export default function HomePage() {
  // Theme modal states
  const [selectedPreviewTheme, setSelectedPreviewTheme] = useState<Theme | null>(null);
  const [selectedPurchaseTheme, setSelectedPurchaseTheme] = useState<Theme | null>(null);

  // Design Lightbox states
  const [lightboxProject, setLightboxProject] = useState<DesignProject | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Themes category filter on homepage
  const [themeFilter, setThemeFilter] = useState<string>('All');

  const {
    projects: dbProjects,
    themes: dbThemes,
    designs: dbDesigns,
    blogs: dbBlogs,
  } = useSiteData();

  const allProjects = dbProjects && dbProjects.length > 0 ? dbProjects : projects;
  const allThemes = dbThemes && dbThemes.length > 0 ? dbThemes : themes;
  const allDesigns = dbDesigns && dbDesigns.length > 0 ? dbDesigns : designProjects;
  const allBlogs: any[] = dbBlogs && dbBlogs.length > 0 ? dbBlogs : (getAllBlogPosts() as any);

  const featuredProjects = allProjects.slice(0, 3);
  const featuredThemes = allThemes
    .filter((t) => themeFilter === 'All' || t.category === themeFilter)
    .slice(0, 4);
  const featuredDesign = allDesigns.slice(0, 4);
  const latestBlogPosts = allBlogs.slice(0, 4);

  const homeThemeCategories = ['All', 'SaaS', 'Portfolio', 'Landing Pages', 'Dashboard'];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Architectural Blueprint',
      desc: 'We map requirements, define technical scope, establish database models, and specify exact user flows before writing a single line of code.',
    },
    {
      step: '02',
      title: 'Vector Geometry & Design Tokens',
      desc: 'Visual exploration in Figma and Illustrator. Typography hierarchy, color tokens with WCAG AAA contrast, and responsive layout grids take shape.',
    },
    {
      step: '03',
      title: 'Full-Stack & Backend Build',
      desc: 'Translating designs into clean TypeScript, Next.js 15 Server Components, secure API routes, PostgreSQL tables, or official WhatsApp Cloud API bots.',
    },
    {
      step: '04',
      title: 'Performance Optimization & QA',
      desc: 'Rigorous Core Web Vitals audits, sub-100ms response profiling, cross-device QA, and zero-downtime production deployment.',
    },
    {
      step: '05',
      title: 'Handoff, Warranty & Support',
      desc: 'Full Git repository transfer, video documentation, and 30-day post-launch warranty support with direct WhatsApp communication.',
    },
  ];

  const homeFaqs = [
    {
      q: 'What is TechTools (tools.techusar.com) and are the tools free?',
      a: 'TechTools is TechUsar’s official live utilities platform (tools.techusar.com). It provides free, private, client-side developer and business calculators including instant PDF Invoicing & Tax calculation, Gross Margin & Markup, EMI Loan amortizations, and JSON formatting with zero sign-up required.',
    },
    {
      q: 'How does your dual background in Graphic Design and Web Development benefit my project?',
      a: 'In traditional agencies, designers and developers work in silos, leading to handoff friction, broken responsiveness, and compromised aesthetics. Because our engineering spans 5 years of commercial graphic design and 4 years of full-stack TypeScript development, your designs map 1:1 into production code with zero translation loss.',
    },
    {
      q: 'Can you build custom WhatsApp bots or automated scrapers for our business?',
      a: 'Yes! Hum chote mote intelligent bots aur bespoke AI agents banate hain. We build official Meta WhatsApp Cloud API bots for automated order booking, customer support chatbots powered by Gemini/OpenAI, and automated web scrapers for market intelligence.',
    },
    {
      q: 'What is the roadmap for templates.techusar.com and portfolio.techusar.com?',
      a: 'TechUsar is architected around 3 dedicated hubs: TechTools (live now at tools.techusar.com), Website Templates (launching at templates.techusar.com), and dedicated enterprise case studies (connecting to portfolio.techusar.com). All subdomains are unified under the TechUsar ecosystem.',
    },
    {
      q: 'How are milestones, payments, and deliverables structured?',
      a: 'We operate on transparent milestone-based agreements: typically 50% upfront deposit and 50% upon final deployment for small builds, or three phased milestones (30% / 35% / 35%) for large full-stack platforms. You receive 100% intellectual property ownership of all source code and design vectors.',
    },
    {
      q: 'How do you guarantee fast website loading speeds and high Google rankings?',
      a: 'Every platform is engineered using Next.js 15 App Router with React Server Components, streaming Suspense, automated JSON-LD Schema.org graphs, dynamic XML sitemaps, and optimized next/image assets, consistently scoring 95–100 on Google PageSpeed Insights.',
    },
    {
      q: 'Where are you based and how do you collaborate with international clients?',
      a: 'TechUsar is based in Kharadar Lyari, Karachi, Pakistan. We work with clients globally across the US, UK, UAE, and Europe through structured video walkthroughs, GitHub repositories, and direct WhatsApp communication (+92 331 8917330).',
    },
  ];

  return (
    <div className="w-full space-y-20 lg:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. MAIN TECHUSAR ECOSYSTEM & SUBDOMAINS */}
      <section id="ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>The TechUsar Ecosystem</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                One Ecosystem. Three Dedicated Platforms.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
                TechUsar operates as the flagship technology umbrella connecting live developer utilities, upcoming production web templates, and dedicated software architecture.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://tools.techusar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold transition-all shadow-xs"
              >
                <span>Launch TechTools</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3 Pillars Grid: TechTools (Primary Live), Templates (Future), Portfolio (Future) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* PILLAR 1: TECHTOOLS (PRIMARY FOCUS - LIVE & READY FOR MARKETING) */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl border-2 border-blue-500/40 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/50 dark:from-blue-950/40 dark:via-neutral-900/90 dark:to-neutral-950 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-sm group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                        Live Subdomain
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
                        TechTools &bull; tools.techusar.com
                      </h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Now
                  </span>
                </div>

                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Fast, client-side, zero-tracking utilities suite designed for engineers, accountants, freelancers, and businesses. Generate invoices, compute profit margins, calculate loan EMIs, format JSON, and generate security tokens with zero sign-ups.
                </p>

                {/* Micro Tool Features Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <a
                    href="https://tools.techusar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/90 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-blue-500 transition-all text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-2 shadow-2xs group/item"
                  >
                    <Receipt className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="truncate">PDF Invoice &amp; Tax</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover/item:text-blue-500 ml-auto" />
                  </a>
                  <a
                    href="https://tools.techusar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/90 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-emerald-500 transition-all text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-2 shadow-2xs group/item"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">Margin &amp; Markup</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover/item:text-emerald-500 ml-auto" />
                  </a>
                  <a
                    href="https://tools.techusar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/90 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-purple-500 transition-all text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-2 shadow-2xs group/item"
                  >
                    <Braces className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span className="truncate">JSON Formatter</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover/item:text-purple-500 ml-auto" />
                  </a>
                  <a
                    href="https://tools.techusar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/90 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-amber-500 transition-all text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-2 shadow-2xs group/item"
                  >
                    <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="truncate">Loan EMI Analyzer</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover/item:text-amber-500 ml-auto" />
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40 flex flex-wrap items-center justify-between gap-3 relative z-10">
                <a
                  href="https://tools.techusar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold tracking-wide transition-all shadow-xs active:scale-98"
                >
                  <span>Explore tools.techusar.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/tools"
                  className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold"
                >
                  View Tools Directory &rarr;
                </Link>
              </div>
            </div>

            {/* PILLAR 2 & 3: TEMPLATES & PORTFOLIO (FUTURE SUBDOMAINS READY) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* PILLAR 2: TEMPLATES */}
              <div className="p-6 sm:p-7 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/60 flex flex-col justify-between space-y-4 group hover:border-emerald-500/40 transition-all shadow-2xs">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                          Templates Subdomain
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
                          Templates &bull; templates.techusar.com
                        </h3>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-mono font-semibold uppercase">
                      In Development
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    A curated library of production Next.js 15 starters, SaaS boilerplates, and conversion-optimized landing pages. Structurally mapped for automated distribution.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-200/60 dark:border-neutral-800/60">
                  <span className="text-xs font-mono text-neutral-500">
                    Target: <strong className="text-emerald-600 dark:text-emerald-400">templates.techusar.com</strong>
                  </span>
                  <Link
                    href="/templates"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <span>Preview Templates</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* PILLAR 3: PORTFOLIO */}
              <div className="p-6 sm:p-7 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/60 flex flex-col justify-between space-y-4 group hover:border-purple-500/40 transition-all shadow-2xs">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                          Portfolio Subdomain
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
                          Portfolio &bull; portfolio.techusar.com
                        </h3>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-mono font-semibold uppercase">
                      Upcoming
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Dedicated showcase space for enterprise case studies, distributed system architectures, and bespoke commercial design commissions.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-200/60 dark:border-neutral-800/60">
                  <span className="text-xs font-mono text-neutral-500">
                    Target: <strong className="text-purple-600 dark:text-purple-400">portfolio.techusar.com</strong>
                  </span>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <span>View Capabilities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT / INTRODUCTION SECTION */}
      <section id="about-intro" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-xs font-mono font-semibold text-blue-700 dark:text-blue-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About TechUsar &bull; Engineering Discipline</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
                5 Years of Graphic Design.{' '}
                <span className="text-blue-600 dark:text-blue-400">4 Years of Full-Stack Code.</span>
              </h2>

              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Operating under the banner of <strong className="text-neutral-950 dark:text-white">TechUsar</strong> from Kharadar Lyari, Karachi, we bridge the divide between artistic vector brand marks and high-performance software engineering. Guided by relentless technical discipline and rigorous attention to detail — ensuring zero-error precision from database schemas to typographic baseline cadences.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono font-bold hover:opacity-90 transition-all shadow-xs"
                >
                  <span>Read Full TechUsar Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold hover:border-blue-500 transition-all"
                >
                  <span>Inquire for Collaboration</span>
                  <Mail className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3 text-xs font-mono shadow-xs">
              <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-bold border-b border-neutral-100 dark:border-neutral-800 pb-2">
                PRACTITIONER TELEMETRY
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-50 dark:border-neutral-900">
                <span className="text-neutral-500">Design Experience:</span>
                <span className="font-bold text-neutral-900 dark:text-white">5 Years (Vector &amp; Print)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-50 dark:border-neutral-900">
                <span className="text-neutral-500">Code Experience:</span>
                <span className="font-bold text-neutral-900 dark:text-white">4 Years (Full-Stack Next.js)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-50 dark:border-neutral-900">
                <span className="text-neutral-500">Foundation:</span>
                <span className="font-bold text-neutral-900 dark:text-white">Self-Driven Engineer</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Specialization:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Full-Stack &amp; AI Bots</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SELECTED WORK */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack &amp; Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Selected Work &amp; Live Deployments
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Production web applications, accounting systems, and visual design architectures engineered for reliability and sub-second performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/work"
              id="view-all-work-btn"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <span>View All Projects ({projects.length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} featuredLayout={idx === 0} />
          ))}
        </div>
      </section>

      {/* 5. DESIGN + DEVELOPMENT (The Dual Craft Manifesto) */}
      <section className="w-full bg-neutral-100/50 dark:bg-neutral-900/40 border-y border-neutral-200/80 dark:border-neutral-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>The Dual Craft Manifesto</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
                Where design precision meets engineering rigor.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Most digital products suffer either from great code wrapped in uninspired design, or striking aesthetics crippled by poor architecture.
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                As both a graphic designer and full-stack developer, I eliminate the friction of handoffs. Design tokens translate directly to strict TypeScript types, micro-interactions honor layout spring physics, and databases are structured to scale without aesthetic compromises.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <span>Read Full Design &amp; Code Philosophy</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/90 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Typographic &amp; Swiss Systems
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Rigorous optical hierarchy, mathematical baseline scales, and custom variable font pairings that establish immediate authority.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/90 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Next.js 15 &amp; Full-Stack Core
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Server Components, streaming Suspense, sub-second API latencies, and production deployment resilience across Vercel and Node.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/90 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Vector Craft &amp; Brand Guidelines
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Hand-crafted logomarks, debossed print collateral, and bespoke iconography that scales smoothly from 16px to stadium billboards.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/90 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                  04
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Production Commercial Themes
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Carefully authored website templates built for developers, startups, and designers who demand high-tier visual polish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES PREVIEW (8 Dedicated Practices) */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Commercial Practices</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              The 8 Core Specialized Services
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              From vector brand marks to full-stack Next.js platforms and custom WhatsApp automation bots, explore our dedicated services.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <span>Explore All 8 Services &amp; Estimator</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesData.map((s, idx) => (
            <div
              key={s.id}
              className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 hover:border-blue-500/40 transition-all flex flex-col justify-between group shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">{s.shortTitle}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  <Link href={s.href}>{s.title}</Link>
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {s.tagline}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <Link
                  href={s.href}
                  className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. AI AUTOMATION & BOT STUDIO */}
      <section id="ai-bots" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border-2 border-blue-500/20 dark:border-blue-500/30 bg-linear-to-br from-blue-50/70 via-indigo-50/40 to-neutral-50 dark:from-blue-950/40 dark:via-neutral-900 dark:to-neutral-950 p-8 sm:p-12">
          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI &amp; Automation Bot Studio</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                  Custom AI Agents &amp; WhatsApp Automation Bots
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Hum chote mote intelligent bots aur bespoke AI agents banate hain jo aapke business ke repetitive tasks ko automate karte hain! Whether you need a WhatsApp bot for order booking, a Telegram notifier, a 24/7 AI customer support chatbot, or custom business workflow automation — rabta karein aur apna idea share karein!
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20Mujhe%20apne%20kaam%20ke%20lye%20Custom%20AI%20Agent%20/%20Bot%20banwana%20hai."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="home_ai_bot_whatsapp"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp (0331-8917330)</span>
                </a>
                <Link
                  href="/contact?service=ai-agents"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs font-bold transition-all shadow-xs"
                >
                  <span>Order Custom Bot</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 space-y-2 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                  WhatsApp &amp; Telegram Bots
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Automated order booking, catalog navigation, price queries, aur instant customer notifications directly on phone.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 space-y-2 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                  24/7 AI Customer Support
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Powered by modern LLMs (Gemini, Claude, DeepSeek). Responds to FAQs in English &amp; Urdu naturally without human delay.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 space-y-2 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                  Automated Web Scrapers
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Competitor price monitoring, stock tracking, real estate listings, and lead generation bots delivering clean data.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 space-y-2 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                  Fast 3 to 7 Day Delivery
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Rapid engineering, direct setup on your server/cloud, and friendly Urdu/English support by Hafiz Muhammad Usman.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-neutral-500">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              <span>Read our complete guide:</span>
              <Link
                href="/blog/custom-ai-agents-and-bots-development-services"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Building WhatsApp Automation Bots &amp; Custom AI Agents in 2026 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TEMPLATES & DIGITAL MARKETPLACE */}
      <section id="themes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>50+ Web Development Templates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Themes &amp; Templates (Free Download via WhatsApp)
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Production-ready website templates engineered with Next.js 15, TypeScript, and Tailwind CSS. Test live interactive demos and claim free source code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/templates"
              id="view-all-themes-btn"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <span>Explore All 50+ Templates</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {homeThemeCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setThemeFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 ${
                themeFilter === cat
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredThemes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              onPreview={(t) => setSelectedPreviewTheme(t)}
            />
          ))}
        </div>
      </section>

      {/* 9. TOOLS SUITE */}
      <section id="tools-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl border-2 border-blue-500/30 bg-linear-to-br from-blue-50/70 via-white to-sky-50/40 dark:from-blue-950/40 dark:via-neutral-900/90 dark:to-neutral-950 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider font-bold">
                <Wrench className="w-4 h-4" />
                <span>Free Online Developer &amp; Accounting Utilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
                TechUsar Tools Suite (tools.techusar.com)
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://tools.techusar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold transition-all shadow-xs inline-flex items-center gap-2 shrink-0"
              >
                <span>Visit tools.techusar.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
            Free client-side utilities built for freelancers, accountants, and engineers: Instant PDF Invoicing &amp; Tax Calculation, Profit Margin &amp; Markup, Loan EMI, Hourly Rate Estimator, JSON Formatter, and CSS Glow Generator with zero sign-up and zero tracking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2.5 text-xs">
              <Receipt className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="font-semibold text-neutral-900 dark:text-white">PDF Invoice &amp; Tax Generator</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2.5 text-xs">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-semibold text-neutral-900 dark:text-white">Profit Margin &amp; Markup</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2.5 text-xs">
              <Braces className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span className="font-semibold text-neutral-900 dark:text-white">JSON Formatter &amp; Validator</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2.5 text-xs">
              <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-semibold text-neutral-900 dark:text-white">Loan EMI &amp; Hourly Rates</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TRANSPARENT 5-STEP PROCESS */}
      <section id="process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Operational Rigor</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              The 5-Step Production Process
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              A transparent, predictable process with explicit milestones, zero handoff friction, and continuous WhatsApp updates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 space-y-3 flex flex-col justify-between shadow-2xs"
            >
              <div className="space-y-2">
                <span className="text-2xl font-mono font-extrabold text-blue-600 dark:text-blue-400 block">
                  {step.step}
                </span>
                <h3 className="text-sm font-bold text-neutral-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. COMPREHENSIVE FAQ SECTION */}
      <section id="faq" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Questions Technical Clients Ask
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Clear, honest answers about working with Hafiz Muhammad Usman and TechUsar.
            </p>
          </div>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
          {homeFaqs.map((faq, fIdx) => (
            <div key={fIdx} className="py-6 space-y-2">
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

      {/* 12. BLOG PREVIEW */}
      <section id="articles-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
              ENGINEERING JOURNAL &amp; TOPICAL PILLARS
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              TechUsar Technical Articles &amp; Guides
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <span>Explore All Blog Posts ({getAllBlogPosts().length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestBlogPosts.map((post: any) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/40 hover:border-blue-500/40 transition-all space-y-3 group shadow-2xs"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>{post.date}</span>
                <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
                  Read Article &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 13. FINAL CONVERSION CTA & CONTACT */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Have a project in mind?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            Currently accepting select full-stack software contracts, brand identity commissions, and custom WhatsApp bot engineering.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20I%20want%20to%20hire%20you%20for%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold tracking-wide transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp (+92 331 8917330)</span>
            </a>
          </div>
        </div>

        <ContactForm />
      </section>

      {/* Interactive Modals */}
      <ThemeLivePreviewModal
        theme={selectedPreviewTheme}
        isOpen={!!selectedPreviewTheme}
        onClose={() => setSelectedPreviewTheme(null)}
        onPurchase={(t) => {
          setSelectedPreviewTheme(null);
          setSelectedPurchaseTheme(t);
        }}
      />

      <PurchaseModal
        theme={selectedPurchaseTheme}
        isOpen={!!selectedPurchaseTheme}
        onClose={() => setSelectedPurchaseTheme(null)}
      />

      <LightboxModal
        project={lightboxProject}
        activeImageIndex={lightboxIndex}
        isOpen={!!lightboxProject}
        onClose={() => setLightboxProject(null)}
        onPrev={() => {
          if (!lightboxProject) return;
          const count = lightboxProject.gallery?.length || 1;
          setLightboxIndex((prev) => (prev - 1 + count) % count);
        }}
        onNext={() => {
          if (!lightboxProject) return;
          const count = lightboxProject.gallery?.length || 1;
          setLightboxIndex((prev) => (prev + 1) % count);
        }}
      />
    </div>
  );
}
