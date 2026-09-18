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
import { projects } from '@/data/projects';
import { themes } from '@/data/themes';
import { designProjects } from '@/data/design-projects';
import { Theme, DesignProject, ThemeCategory } from '@/types';
import { ArrowRight, Sparkles, Layers, ShoppingBag, Palette, Code2, Compass, CheckCircle2, Terminal, Wrench, FileText, Receipt, TrendingUp, Braces, Calculator, Bot, MessageSquare, BookOpen, ExternalLink, Globe, Shield, Zap, Star } from 'lucide-react';
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

  const featuredProjects = projects.slice(0, 3);
  const featuredThemes = themes
    .filter((t) => themeFilter === 'All' || t.category === themeFilter)
    .slice(0, 4);
  const featuredDesign = designProjects.slice(0, 4);
  const latestBlogPosts = getAllBlogPosts().slice(0, 4);

  const homeThemeCategories = ['All', 'SaaS', 'Portfolio', 'Landing Pages', 'Dashboard'];

  return (
    <div className="w-full space-y-20 lg:space-y-32 pb-16">
      {/* Hero Section with Parallax Composition & Creative Timeline Cursor */}
      <HeroSection />

      {/* SECTION 1: Selected Work */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack & Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Selected Work
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Digital products, websites, and visual systems engineered for real-world reliability and scale.
            </p>
          </div>

          <Link
            href="/work"
            id="view-all-work-btn"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <span>View All Projects ({projects.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} featuredLayout={idx === 0} />
          ))}
        </div>
      </section>

      {/* SECTION 2: Dual Discipline Philosophy Feature */}
      <section className="w-full bg-neutral-100/50 dark:bg-neutral-900/40 border-y border-neutral-200/80 dark:border-neutral-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest">
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
                As both a senior graphic designer and full-stack developer, I eliminate the friction of handoffs. Design tokens translate directly to strict TypeScript types, micro-interactions honor layout spring physics, and databases are structured to scale without aesthetic compromises.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <span>Read Full Design & Code Philosophy</span>
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
                  Typographic & Swiss Systems
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
                  Next.js 15 & Full-Stack Core
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
                  Vector Craft & Brand Guidelines
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

      {/* TECHUSAR OFFICIAL PLATFORMS & ECOSYSTEM */}
      <section id="ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-xs font-mono font-semibold text-blue-700 dark:text-blue-300">
            <Globe className="w-3.5 h-3.5" />
            <span>TECHUSAR DIGITAL ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            Official Platforms &amp; Software Hubs
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            TechUsar is an integrated digital ecosystem providing high-performance website templates, free online developer &amp; accountant utility tools, and custom AI automation systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: tools.techusar.com */}
          <div className="p-8 sm:p-10 rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-50/70 via-white to-sky-50/40 dark:from-blue-950/40 dark:via-neutral-900/90 dark:to-neutral-950 space-y-6 flex flex-col justify-between hover:border-blue-500/60 transition-all shadow-md group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold shadow-xs">
                    <Wrench className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block">
                      Free Utilities Platform
                    </span>
                    <span className="text-base font-bold text-neutral-950 dark:text-white">
                      tools.techusar.com
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold">
                  100% Free
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                TechUsar Tools Suite
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                A dedicated, client-side online tools portal built for accountants, web developers, freelancers, and small business owners. Instant computations with zero sign-up and zero tracking.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/80 flex items-center gap-2 text-xs">
                  <Receipt className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="font-semibold text-neutral-900 dark:text-white">PDF Invoice &amp; Tax Generator</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/80 flex items-center gap-2 text-xs">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-semibold text-neutral-900 dark:text-white">Profit Margin &amp; Markup Calc</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/80 flex items-center gap-2 text-xs">
                  <Braces className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="font-semibold text-neutral-900 dark:text-white">JSON Formatter &amp; Validator</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/80 flex items-center gap-2 text-xs">
                  <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-semibold text-neutral-900 dark:text-white">Loan EMI &amp; Hourly Rates</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200/70 dark:border-neutral-800/80 flex flex-wrap items-center gap-3">
              <a
                href="https://tools.techusar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono tracking-wide transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>VISIT TOOLS.TECHUSAR.COM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/tools"
                className="px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-blue-500 text-xs font-mono font-medium transition-all inline-flex items-center gap-1.5"
              >
                <span>Browse Embedded Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: tamplates.techusar.com */}
          <div className="p-8 sm:p-10 rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-neutral-900/90 dark:to-neutral-950 space-y-6 flex flex-col justify-between hover:border-emerald-500/60 transition-all shadow-md group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-mono font-bold shadow-xs">
                    <ShoppingBag className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
                      Templates Marketplace
                    </span>
                    <span className="text-base font-bold text-neutral-950 dark:text-white">
                      tamplates.techusar.com
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-mono font-semibold">
                  Next.js 15 Ready
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                TechUsar Themes &amp; Starters
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Production-grade website architectures and UI kits engineered with Next.js 15 App Router, TypeScript, and Tailwind CSS. Built to launch client sites, startups, SaaS portals, and personal portfolios at lightning speed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/80 flex items-center gap-2 text-xs">
                  <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-semibold text-neutral-900 dark:text-white">SaaS &amp; Admin Dashboards</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/80 flex items-center gap-2 text-xs">
                  <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-semibold text-neutral-900 dark:text-white">High-Converting Landing Pages</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/80 flex items-center gap-2 text-xs">
                  <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="font-semibold text-neutral-900 dark:text-white">Developer Portfolios &amp; CVs</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/80 flex items-center gap-2 text-xs">
                  <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="font-semibold text-neutral-900 dark:text-white">Commercial License Included</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200/70 dark:border-neutral-800/80 flex flex-wrap items-center gap-3">
              <a
                href="https://tamplates.techusar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-mono tracking-wide transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>VISIT TAMPLATES.TECHUSAR.COM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/templates"
                className="px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-emerald-500 text-xs font-mono font-medium transition-all inline-flex items-center gap-1.5"
              >
                <span>Browse All Templates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED: Resume Engine & Free Traffic Utilities Suite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Hafiz Muhammad Usman CV & Free Resume Builder */}
          <div className="p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/30 dark:from-blue-950/20 dark:via-neutral-900/60 dark:to-indigo-950/10 space-y-5 flex flex-col justify-between hover:border-blue-500/60 transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold font-mono">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Interactive Resume Studio</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-500">6 Layout Architectures</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Hafiz Muhammad Usman CV &amp; Free Resume Builder
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Inspect Usman&apos;s verified curriculum vitae in the exact original PDF format, switch across 5 custom designs (Obsidian Cyber, Swiss Grid, Executive Slate, Creative Studio, ATS), or build your own custom CV with instant PDF export.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 text-[11px] font-mono border border-neutral-200 dark:border-neutral-700">
                  📄 Exact PDF Replica
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 text-[11px] font-mono border border-neutral-200 dark:border-neutral-700">
                  ⚡ 100% Free Builder
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 text-[11px] font-mono border border-neutral-200 dark:border-neutral-700">
                  🖨️ Clean Print / PDF Export
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/cv"
                id="home-open-cv-builder-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs group-hover:gap-3"
              >
                <span>Launch CV Viewer &amp; Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Free Developer & Accountant Tools Hub */}
          <div className="p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-50/40 via-white to-pink-50/30 dark:from-purple-950/20 dark:via-neutral-900/60 dark:to-pink-950/10 space-y-5 flex flex-col justify-between hover:border-purple-500/60 transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold font-mono">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Free Utility Hub</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Zero Sign-Up Required</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Free Developer &amp; Accountant Tools
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Free online client-side tools built to attract high recurring traffic: Professional Invoicing &amp; Tax Calculator, Profit Margin &amp; Markup, Loan EMI, Freelance Hourly Rate, JSON Formatter, Base64 converter &amp; UUID generator.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
                  <Receipt className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">Invoice Generator</span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">Margin &amp; Markup</span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
                  <Braces className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">JSON Validator</span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">CSS Glow Studio</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/tools"
                id="home-open-tools-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-bold transition-all shadow-xs group-hover:gap-3"
              >
                <span>Open Free Tools Suite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Custom AI Agents & Bot Development Studio */}
      <section id="ai-bots" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border-2 border-blue-500/20 dark:border-blue-500/30 bg-linear-to-br from-blue-50/70 via-indigo-50/40 to-neutral-50 dark:from-blue-950/40 dark:via-neutral-900 dark:to-neutral-950 p-8 sm:p-12">
          {/* Subtle decorative radial glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI &amp; Automation Bot Studio</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                  Custom AI Agents &amp; Automation Bots
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

            {/* 4 Feature Cards */}
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
                How Small Bots &amp; AI Agents Save 20+ Hours Weekly &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Themes Marketplace Highlight */}
      <section id="themes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Digital Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Themes & Templates
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Production-ready website templates engineered with Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>

          <Link
            href="/themes"
            id="view-all-themes-btn"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <span>Explore All Themes ({themes.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
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

      {/* SECTION 4: Graphic Design & Visual Systems */}
      <section id="design" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest">
              <Palette className="w-3.5 h-3.5" />
              <span>Visual Arts & Branding</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Graphic Design
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Brand identities, bespoke logomarks, screen-printed posters, and architectural visual systems.
            </p>
          </div>

          <Link
            href="/design"
            id="view-all-design-btn"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <span>Explore Design Archive ({designProjects.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetric Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDesign.map((item, idx) => (
            <DesignCard
              key={item.id}
              project={item}
              aspectRatio={idx % 2 === 0 ? 'portrait' : 'square'}
              onOpenLightbox={(proj) => {
                setLightboxProject(proj);
                setLightboxIndex(0);
              }}
            />
          ))}
        </div>
      </section>

      {/* SECTION 5: Services & Scope Matrix */}
      <section id="services-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl border border-blue-500/20 dark:border-purple-500/30 bg-gradient-to-b from-white via-neutral-50 to-blue-50/20 dark:from-neutral-900/80 dark:via-neutral-900/40 dark:to-neutral-950 space-y-10 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-purple-400 uppercase tracking-widest">
                <Code2 className="w-3.5 h-3.5" />
                <span>Commercial & Engineering Services</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
                How We Can Work Together
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                Transparent milestones, comprehensive deliverables, and an integrated workflow from Figma vectors to Next.js 15 deployment.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shrink-0 shadow-xs"
            >
              <span>Launch Interactive Scope Estimator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Brand Identity & Vectors',
                desc: 'Geometric logomarks, typography rules, color palettes, and comprehensive vector guidelines.',
                time: '2–3 weeks',
                tag: 'Creative',
              },
              {
                title: 'Full-Stack Next.js 15 Apps',
                desc: 'Strict TypeScript, server components, optimized PostgreSQL schemas, and sub-100ms global TTFB.',
                time: '3–6 weeks',
                tag: 'Engineering',
              },
              {
                title: 'Multi-Brand Design Systems',
                desc: 'Figma token architectures mapped 1:1 to Tailwind CSS classes and accessible React primitives.',
                time: '2–4 weeks',
                tag: 'Architecture',
              },
              {
                title: 'Custom Themes & Templates',
                desc: 'High-converting marketing portals, SaaS dashboards, and commercial digital product templates.',
                time: '2–3 weeks',
                tag: 'Hybrid',
              },
            ].map((srv, sIdx) => (
              <div
                key={sIdx}
                className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/60 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
                    {srv.tag}
                  </span>
                  <h3 className="text-base font-bold text-neutral-950 dark:text-white">{srv.title}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-neutral-500">
                  ⏱ Cadence: {srv.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Wall of Proof & Impact Telemetry */}
      <section id="proof" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest">
              PROVEN OUTCOMES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Trusted by Technical Founders & Design Teams
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Measurable performance benchmarks and verified feedback from commercial engagements.
            </p>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Theme Downloads', val: '15,400+', sub: 'Global developers' },
              { label: 'Production Uptime', val: '99.98%', sub: 'Zero incident deployments' },
              { label: 'Average LCP', val: '&lt; 95ms', sub: 'Top 1% Core Web Vitals' },
              { label: 'Client Delivery', val: '100%', sub: 'On-schedule milestones' },
            ].map((metric, mIdx) => (
              <div
                key={mIdx}
                className="p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/40 text-center space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 dark:text-purple-400">
                  <span dangerouslySetInnerHTML={{ __html: metric.val }} />
                </div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">{metric.label}</div>
                <div className="text-[11px] text-neutral-500">{metric.sub}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'TechUsar is the rare hybrid unicorn who can design a brand mark that looks like it belongs on a Swiss design annual, and then build the entire Next.js architecture with clean TypeScript.',
                author: 'Elena Vance',
                role: 'VP of Product, Apex Analytics',
              },
              {
                quote:
                  'The Linear-inspired themes we purchased cut our time-to-market in half. The Blue and Purple accents in dark mode are stunning without ever feeling gimmicky or distracting.',
                author: 'Marcus Croft',
                role: 'Founder, PulseEdge Systems',
              },
              {
                quote:
                  'No back-and-forth handoff friction between design and engineering. He delivered our design system and production components in a single synchronized sprint.',
                author: 'Sophia Chen',
                role: 'Design Director, Meridian Capital',
              },
            ].map((t, tIdx) => (
              <div
                key={tIdx}
                className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-4 flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-mono text-xs font-bold">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-950 dark:text-white">{t.author}</div>
                    <div className="text-[11px] text-neutral-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Recent Writings, AI Bot Guides & Blog */}
      <section id="articles-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              BLOG &amp; AI BOT GUIDES
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              TechUsar Journal &amp; Tutorials
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-purple-400 transition-colors group"
          >
            <span>Explore All Blog Posts ({getAllBlogPosts().length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestBlogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/40 hover:border-blue-500/40 dark:hover:border-purple-500/40 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span className="text-blue-600 dark:text-purple-400 font-semibold">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>{post.date}</span>
                <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
                  Read &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 8: Contact Inquiry */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Have a project in mind?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            Currently accepting select full-stack software contracts, brand identity commissions, and custom theme architecture.
          </p>
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
