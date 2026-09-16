'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'motion/react';
import {
  ArrowRight,
  Download,
  Code,
  Palette,
  Terminal,
  Cpu,
  Sparkles,
  CheckCircle2,
  Activity,
  Sliders,
  Check,
  Phone,
  Layout,
  Flame,
  Shield,
  Zap,
  Globe,
  Lock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useSiteSettings } from '@/components/providers/SiteDataProvider';

export function HeroSection() {
  const { settings } = useSiteSettings();
  // Ultra-smooth, weighted spring physics for a luxury, cinematic feel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const luxurySpring = { damping: 32, stiffness: 95, mass: 0.75 };
  const smoothX = useSpring(mouseX, luxurySpring);
  const smoothY = useSpring(mouseY, luxurySpring);

  // 3D Perspective Rotation for luxury depth tilt
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  // Parallax layers (calibrated velocities)
  const bgX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const midX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const midY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const floatTopX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const floatTopY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);

  const floatBottomX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const floatBottomY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  const floatSideX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const floatSideY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Interactive console state
  const [activeTab, setActiveTab] = useState<'telemetry' | 'tokens' | 'architecture'>('telemetry');
  const [interactiveToggle, setInteractiveToggle] = useState(true);
  const [selectedRadius, setSelectedRadius] = useState<'8px' | '12px' | '16px' | '24px'>('12px');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Live fluctuating telemetry ticker for realistic production feel
  const [latency, setLatency] = useState('14.2');
  const [qps, setQps] = useState('142,800');

  useEffect(() => {
    const interval = setInterval(() => {
      const l = (13.6 + Math.random() * 1.2).toFixed(1);
      const q = (142000 + Math.floor(Math.random() * 1800)).toLocaleString();
      setLatency(l);
      setQps(q);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 1800);
  };

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
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-18 lg:pb-28 overflow-hidden select-none"
    >
      {/* Premium Studio Gradient Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(37, 99, 235, 0.07), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(248, 250, 252, 0.8), transparent 80%)',
        }}
      />

      {/* Precision Geometric Grid Background with Vertical Fade */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
        }}
      />

      {/* Atmospheric Refined Sapphire Ambient Lighting */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-gradient-to-b from-blue-600/10 dark:from-blue-500/14 via-sky-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* =========================================================================
              LEFT COLUMN: HERO NARRATIVE (TEXT REVEAL & CTA ENGINE)
             ========================================================================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 sm:space-y-7"
          >
            {/* 1. Eyebrow Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div
                id="hero-eyebrow"
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-neutral-200/90 dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-xl text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold tracking-wider shadow-xs group hover:border-blue-500/40 transition-colors"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{settings.heroBadge || `${(settings.brandName || 'TECHUSAR').toUpperCase()} / DESIGN × DEVELOPMENT`}</span>
              </div>
            </motion.div>

            {/* 2. Headline with Text Reveal */}
            <motion.h1
              variants={itemVariants}
              id="hero-main-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.12]"
            >
              Designing interfaces.{' '}
              <span className="block mt-1 sm:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 dark:from-blue-400 dark:via-sky-400 dark:to-blue-300">
                Building digital products.
              </span>
            </motion.h1>

            {/* 3. Description */}
            <motion.p
              variants={itemVariants}
              id="hero-description"
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl font-normal"
            >
              {settings.heroSubtitle ||
                `${settings.ownerName || 'Hafiz Muhammad Usman'} is a graphic designer and full-stack engineer bridging visual identity systems with modern Next.js 15, TypeScript, and distributed cloud applications.`}
            </motion.p>

            {/* 4. Action Callouts Group */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              {/* Primary Action */}
              <Link
                href="/work"
                id="hero-primary-cta"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 shadow-md hover:shadow-xl group active:scale-[0.98]"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Action - Themes */}
              <Link
                href="/themes"
                id="hero-secondary-cta"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border border-neutral-200/90 dark:border-white/10 bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-all shadow-xs"
              >
                <Layout className="w-4 h-4 text-blue-500" />
                <span>Themes &amp; Kits</span>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  8 Kits
                </span>
              </Link>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/923318917330?text=Hello%20Hafiz%20Muhammad%20Usman,%20I%20would%20like%20to%20discuss%20a%20design%20and%20web%20development%20project."
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-cta"
                className="inline-flex items-center gap-2 px-4.5 py-3.5 rounded-xl text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/60 transition-colors shadow-xs"
                title="Direct WhatsApp: 03318917330"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="font-mono text-xs">WhatsApp</span>
              </a>

              {/* CV Action */}
              <Link
                href="/cv"
                id="hero-cv-cta"
                className="inline-flex items-center gap-1.5 px-3.5 py-3.5 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CV</span>
              </Link>
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
              RIGHT COLUMN: LUXURY PRECISION CONSOLE SHOWCASE
              (Floating 3D Hardware-Accelerated Workstation, SVG Telemetry, Token Matrix)
             ========================================================================= */}
          <div className="hidden lg:block lg:col-span-6 relative [perspective:1400px]">
            <motion.div
              id="hero-layered-showcase"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full rounded-2xl p-1 sm:p-2 select-none"
            >
              {/* Subtle ambient backplate highlight */}
              <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute -inset-3 rounded-3xl bg-gradient-to-b from-blue-600/10 via-sky-500/5 to-transparent blur-2xl pointer-events-none opacity-70 dark:opacity-40"
              />

              {/* =====================================================================
                  MAIN WORKSTATION CONSOLE (LUXURY HARDWARE FRAME)
                 ===================================================================== */}
              <motion.div
                style={{ x: midX, y: midY }}
                className="relative z-10 w-full rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0a0c16]/95 backdrop-blur-2xl shadow-[0_24px_70px_-15px_rgba(0,0,0,0.35),0_0_40px_rgba(37,99,235,0.08)] overflow-hidden transition-all duration-300"
              >
                {/* Specular Top-Edge Light Glint */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 dark:via-white/20 to-transparent" />

                {/* Console Top Chrome / Status Bar */}
                <div className="px-4 sm:px-5 py-3.5 border-b border-neutral-100 dark:border-white/5 flex items-center justify-between bg-neutral-50/70 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    {/* Precision Jewel Window Indicators */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
                    </div>

                    {/* Clean SSL Domain Pill */}
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-200/50 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-white/5 text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                      <Lock className="w-2.5 h-2.5 text-emerald-500" />
                      <span>techusar.dev/system-core</span>
                    </div>
                  </div>

                  {/* Luxury Segmented View Selector */}
                  <div className="flex items-center gap-1 bg-neutral-200/50 dark:bg-neutral-900/80 p-0.5 rounded-lg border border-neutral-200/80 dark:border-white/5 text-[11px] font-mono font-medium">
                    <button
                      onClick={() => setActiveTab('telemetry')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        activeTab === 'telemetry'
                          ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white font-semibold shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      Telemetry
                    </button>
                    <button
                      onClick={() => setActiveTab('tokens')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        activeTab === 'tokens'
                          ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white font-semibold shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      Tokens
                    </button>
                    <button
                      onClick={() => setActiveTab('architecture')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        activeTab === 'architecture'
                          ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white font-semibold shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      Architecture
                    </button>
                  </div>
                </div>

                {/* Console Main Stage */}
                <div className="p-4 sm:p-6 space-y-5">
                  {/* VIEW 1: HIGH-FIDELITY TELEMETRY & FLUID CURVE */}
                  {activeTab === 'telemetry' && (
                    <div className="space-y-4">
                      {/* Metric KPI Row */}
                      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/5 space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                            <span>AVG LATENCY</span>
                            <Zap className="w-3 h-3 text-amber-500" />
                          </div>
                          <div className="text-base sm:text-lg font-bold font-mono text-neutral-950 dark:text-white flex items-baseline gap-1">
                            <span>{latency}</span>
                            <span className="text-xs text-neutral-500 font-normal">ms</span>
                          </div>
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                            ⚡ Zero Edge Jitter
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/5 space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                            <span>THROUGHPUT</span>
                            <Activity className="w-3 h-3 text-blue-500" />
                          </div>
                          <div className="text-base sm:text-lg font-bold font-mono text-neutral-950 dark:text-white">
                            {qps}
                          </div>
                          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
                            req / min peak
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/5 space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                            <span>UPTIME SLA</span>
                            <Shield className="w-3 h-3 text-emerald-500" />
                          </div>
                          <div className="text-base sm:text-lg font-bold font-mono text-neutral-950 dark:text-white">
                            99.99%
                          </div>
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                            Cluster Verified
                          </div>
                        </div>
                      </div>

                      {/* Smooth Vector Telemetry Graph (Smooth Cubic Bezier with Glowing Gradient) */}
                      <div className="p-4 rounded-xl bg-neutral-50/80 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/5 space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            NETWORK TRAFFIC PULSE (REALTIME)
                          </span>
                          <span className="text-neutral-400">BUFFER: 32MB CACHE</span>
                        </div>

                        {/* Interactive SVG Sparkline */}
                        <div className="relative w-full h-24 sm:h-28 overflow-hidden">
                          <svg
                            viewBox="0 0 500 120"
                            fill="none"
                            className="w-full h-full preserve-3d"
                            preserveAspectRatio="none"
                          >
                            <defs>
                              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                              </linearGradient>
                              <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#2563EB" />
                                <stop offset="50%" stopColor="#0EA5E9" />
                                <stop offset="100%" stopColor="#38BDF8" />
                              </linearGradient>
                            </defs>

                            {/* Background gridlines */}
                            <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" strokeOpacity="0.05" />
                            <line x1="0" y1="60" x2="500" y2="60" stroke="currentColor" strokeOpacity="0.05" />
                            <line x1="0" y1="90" x2="500" y2="90" stroke="currentColor" strokeOpacity="0.05" />

                            {/* Filled Area */}
                            <path
                              d="M0 80 Q 80 30, 160 65 T 320 40 T 420 20 T 500 35 L 500 120 L 0 120 Z"
                              fill="url(#curveGradient)"
                            />

                            {/* Glowing Bezier Curve */}
                            <path
                              d="M0 80 Q 80 30, 160 65 T 320 40 T 420 20 T 500 35"
                              fill="none"
                              stroke="url(#strokeGradient)"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />

                            {/* Glowing Endpoint Dot */}
                            <circle cx="500" cy="35" r="4" fill="#38BDF8" className="animate-pulse" />
                            <circle cx="500" cy="35" r="8" fill="#38BDF8" fillOpacity="0.25" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VIEW 2: PRECISION LUXURY TOKENS */}
                  {activeTab === 'tokens' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                        <span>PRECISION CHROMATIC SUITE</span>
                        <span>CLICK TO COPY HEX</span>
                      </div>

                      {/* Color Token Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                          { name: 'Obsidian', hex: '#090A0F', border: 'border-neutral-700' },
                          { name: 'Cobalt', hex: '#2563EB', border: 'border-blue-500/50' },
                          { name: 'Amethyst', hex: '#7C3AED', border: 'border-purple-500/50' },
                          { name: 'Emerald', hex: '#10B981', border: 'border-emerald-500/50' },
                        ].map((token) => (
                          <button
                            key={token.hex}
                            onClick={() => handleCopy(token.hex)}
                            className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/5 hover:border-blue-500 transition-all text-left group/swatch"
                          >
                            <div
                              className={`w-full h-8 rounded-lg mb-2 shadow-xs group-hover/swatch:scale-105 transition-transform ${token.border} border`}
                              style={{ backgroundColor: token.hex }}
                            />
                            <div className="text-xs font-bold text-neutral-900 dark:text-white">
                              {token.name}
                            </div>
                            <div className="text-[10px] font-mono text-neutral-500 mt-0.5">
                              {copiedToken === token.hex ? '✓ Copied' : token.hex}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Interactive Radius Token Switcher */}
                      <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/5 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                            Corner Radius Token
                          </div>
                          <div className="text-[10px] font-mono text-neutral-500">
                            Active token: <span className="text-blue-500">{selectedRadius}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 bg-neutral-200/60 dark:bg-neutral-900 p-1 rounded-lg">
                          {(['8px', '12px', '16px', '24px'] as const).map((r) => (
                            <button
                              key={r}
                              onClick={() => setSelectedRadius(r)}
                              className={`px-2 py-0.5 text-xs font-mono rounded transition-all ${
                                selectedRadius === r
                                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VIEW 3: FULL-STACK ARCHITECTURE & AUTOMATION */}
                  {activeTab === 'architecture' && (
                    <div className="space-y-3">
                      {/* Architecture Stack Item 1 */}
                      <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-mono font-bold text-xs">
                            TS
                          </div>
                          <div>
                            <div className="text-xs font-bold text-neutral-900 dark:text-white">
                              TypeScript Strict Mode
                            </div>
                            <div className="text-[10px] font-mono text-neutral-500">
                              Zero any types • 100% Verified
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                          Compiled
                        </span>
                      </div>

                      {/* Architecture Stack Item 2 */}
                      <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-mono font-bold text-xs">
                            NX
                          </div>
                          <div>
                            <div className="text-xs font-bold text-neutral-900 dark:text-white">
                              Next.js 15 App Router
                            </div>
                            <div className="text-[10px] font-mono text-neutral-500">
                              Server Components + Streaming
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setInteractiveToggle(!interactiveToggle)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            interactiveToggle ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-700'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              interactiveToggle ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Console Bottom Metadata Bar */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>SYSTEM OPTIMAL</span>
                    </div>
                    <span className="text-[10px] opacity-75">
                      BUILD 15.5 • REACT 19 • TAILWIND V4
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* =====================================================================
                  SATELLITE 1 (TOP RIGHT): LIGHTHOUSE 100 PERFORMANCE RING
                 ===================================================================== */}
              <motion.div
                style={{ x: floatTopX, y: floatTopY }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.06, zIndex: 50 }}
                className="hidden sm:flex absolute -top-4 -right-2 sm:-top-6 sm:-right-6 z-20 p-2.5 sm:p-3 rounded-xl border border-neutral-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0d1020]/95 backdrop-blur-xl shadow-xl transition-shadow hover:shadow-2xl items-center gap-2.5 sm:gap-3"
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-neutral-200 dark:text-neutral-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500"
                      strokeDasharray="100, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[10px] sm:text-[11px] font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                    100
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
                    Lighthouse Score
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500">
                    Performance &amp; A11y
                  </div>
                </div>
              </motion.div>

              {/* =====================================================================
                  SATELLITE 2 (BOTTOM LEFT): LUXURY DUAL DISCIPLINE EMBLEM
                 ===================================================================== */}
              <motion.div
                style={{ x: floatBottomX, y: floatBottomY }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                whileHover={{ scale: 1.05, zIndex: 50 }}
                className="hidden sm:flex absolute -bottom-5 -left-3 sm:-bottom-7 sm:-left-6 z-20 p-2.5 sm:p-3.5 rounded-xl border border-neutral-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0d1020]/95 backdrop-blur-xl shadow-xl transition-shadow hover:shadow-2xl items-center gap-2.5 sm:gap-3"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-neutral-950 via-blue-950 to-blue-600 dark:from-blue-600 dark:to-sky-500 flex items-center justify-center text-white font-mono font-extrabold text-xs sm:text-sm shadow-md border border-white/20">
                  TU
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
                    Dual Craft Philosophy
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-0.5">
                    Design Systems × Full-Stack Rigor
                  </div>
                </div>
              </motion.div>

              {/* =====================================================================
                  SATELLITE 3 (TOP LEFT): SCRIPT TOKEN BADGE
                 ===================================================================== */}
              <motion.div
                style={{ x: floatSideX, y: floatSideY }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="hidden md:flex absolute top-8 -left-3 sm:top-10 sm:-left-7 z-20 px-3 py-1.5 rounded-lg border border-neutral-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0d1020]/95 backdrop-blur-xl shadow-md items-center gap-2"
              >
                <Terminal className="w-3 h-3 text-blue-500" />
                <span className="text-[10px] font-mono font-medium text-neutral-800 dark:text-neutral-200">
                  tokens.config.ts
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
