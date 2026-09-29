'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'motion/react';
import {
  ArrowRight,
  Code,
  Palette,
  Cpu,
  Phone,
  Linkedin,
  Github,
  Twitter,
} from 'lucide-react';
import { useSiteSettings } from '@/components/providers/SiteDataProvider';
import { HeroToolIconShowcase } from './HeroToolIconShowcase';

export function HeroSection() {
  const { settings } = useSiteSettings();

  // Staggered reveal animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero-section"
      className="relative w-full pt-8 pb-12 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden select-none"
    >
      {/* Precision Clean Background Canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(37, 99, 235, 0.04), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* =========================================================================
              LEFT COLUMN: HERO NARRATIVE (TEXT REVEAL & CTA ENGINE)
             ========================================================================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-5 sm:space-y-6"
          >
            {/* 1. Eyebrow Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div
                id="hero-eyebrow"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold tracking-wider shadow-2xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{settings.heroBadge || 'TECHUSAR / TOOLS × TEMPLATES × ENGINEERING'}</span>
              </div>
            </motion.div>

            {/* 2. Headline with Text Reveal */}
            <motion.h1
              variants={itemVariants}
              id="hero-main-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 dark:text-white leading-[1.12] text-balance"
            >
              Developer Tools,{' '}
              <span className="block mt-1 sm:mt-0 text-blue-600 dark:text-blue-400">
                Templates &amp; Engineering.
              </span>
            </motion.h1>

            {/* 3. Description */}
            <motion.p
              variants={itemVariants}
              id="hero-description"
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl font-normal"
            >
              {settings.heroSubtitle ||
                'TechUsar is the main digital ecosystem powering TechTools (tools.techusar.com), upcoming production templates (templates.techusar.com), custom AI bot development, and full-stack software architecture.'}
            </motion.p>

            {/* 4. Action Callouts Group */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              {/* Primary Action - TechTools (Live) */}
              <a
                href="https://tools.techusar.com"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-primary-cta"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md hover:shadow-xl group active:scale-[0.98]"
              >
                <span>Launch TechTools</span>
                <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-[10px] font-mono uppercase tracking-wider font-extrabold">
                  Live
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              {/* Secondary Action - Services */}
              <Link
                href="/services"
                id="hero-secondary-cta"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all shadow-2xs"
              >
                <Code className="w-4 h-4 text-blue-500" />
                <span>Explore Services</span>
              </Link>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/923318917330?text=Hello%20TechUsar,%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-cta"
                className="inline-flex items-center gap-2 px-4.5 py-3.5 rounded-xl text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shadow-2xs"
                title="Direct WhatsApp: 03318917330"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="font-mono text-xs">WhatsApp</span>
              </a>

              {/* Social Channels Quick Links */}
              <div className="flex items-center gap-1.5 pl-0 sm:pl-2 sm:border-l border-neutral-200 dark:border-neutral-800">
                <a
                  href={settings.linkedinUrl || "https://www.linkedin.com/in/hafiz-muhammad-usman-514888397/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 min-w-[40px] rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-[#0A66C2] transition-colors flex items-center justify-center shadow-2xs"
                  title="LinkedIn: Muhammad Usman / TechUsar"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={settings.twitterUrl || "https://x.com/techusar"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 min-w-[40px] rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-sky-500 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-sky-500 transition-colors flex items-center justify-center shadow-2xs"
                  title="Twitter / X Profile: @techusar"
                  aria-label="Twitter / X Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={settings.githubUrl || "https://github.com/techusar"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 min-w-[40px] rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-500 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center justify-center shadow-2xs"
                  title="GitHub Profile: @techusar"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* 5. Discipline & Architecture Metadata Ticker */}
            <motion.div
              variants={itemVariants}
              className="pt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono border-t border-neutral-200/80 dark:border-neutral-800/80"
            >
              <div className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-blue-500" />
                <span>Brand &amp; UI/UX Systems</span>
              </div>
              <span className="hidden sm:inline opacity-30">/</span>
              <div className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-indigo-500" />
                <span>Next.js 15 &amp; TypeScript</span>
              </div>
              <span className="hidden sm:inline opacity-30">/</span>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-500" />
                <span>C# .NET &amp; SQL</span>
              </div>
            </motion.div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: STANDALONE BIG 3D TOOLS ICON (CLEAN & MINIMAL)
             ========================================================================= */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <HeroToolIconShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
