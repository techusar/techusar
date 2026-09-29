'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Wrench,
  Globe,
  Palette,
  Code2,
  Terminal,
  Bot,
  ShoppingBag,
  Receipt,
  Calculator,
  Clock,
  BookOpen,
  Mail,
  ArrowUpRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Layers,
  Compass,
  CheckCircle2,
  Zap,
  Shield,
  Activity,
  Maximize2,
  Minimize2,
  Play,
  RotateCw,
  Send,
  Lock,
  ChevronRight,
  Check,
  Search,
  Cpu,
  BarChart3,
  SlidersHorizontal,
  FileCode,
  LineChart,
} from 'lucide-react';

export interface SectionToolData {
  id: string;
  name: string;
  subdomain?: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  description: string;
  screenType:
    | 'hub'
    | 'tools'
    | 'aibots'
    | 'templates'
    | 'work'
    | 'services'
    | 'design'
    | 'process'
    | 'blog'
    | 'contact';
}

export const SECTION_TOOLS: SectionToolData[] = [
  {
    id: 'hero',
    name: 'TechUsar Ecosystem',
    subdomain: 'techusar.com',
    badge: 'Main Platform',
    icon: Globe,
    accentColor: '#2563eb',
    accentBg: 'rgba(37, 99, 235, 0.08)',
    accentBorder: 'rgba(37, 99, 235, 0.3)',
    description: 'Main ecosystem for developer tools, production templates & custom software.',
    screenType: 'hub',
  },
  {
    id: 'ecosystem',
    name: '3-Pillar Architecture',
    subdomain: 'tools · templates · portfolio',
    badge: 'Ecosystem Core',
    icon: Layers,
    accentColor: '#3b82f6',
    accentBg: 'rgba(59, 130, 246, 0.08)',
    accentBorder: 'rgba(59, 130, 246, 0.3)',
    description: 'Unified architecture connecting TechTools (Live), Templates, and Portfolio.',
    screenType: 'hub',
  },
  {
    id: 'about-intro',
    name: 'Dual Craft Engineering',
    subdomain: 'Design × Code',
    badge: '5 Yrs Vector · 4 Yrs Next.js',
    icon: Palette,
    accentColor: '#8b5cf6',
    accentBg: 'rgba(139, 92, 246, 0.08)',
    accentBorder: 'rgba(139, 92, 246, 0.3)',
    description: 'Zero translation loss between vector Figma marks and Next.js 15 TypeScript code.',
    screenType: 'design',
  },
  {
    id: 'work',
    name: 'Selected Work & Edge Systems',
    subdomain: 'Edge Infrastructure',
    badge: 'Live Production',
    icon: Terminal,
    accentColor: '#6366f1',
    accentBg: 'rgba(99, 102, 241, 0.08)',
    accentBorder: 'rgba(99, 102, 241, 0.3)',
    description: 'High-reliability full-stack web platforms and accounting portals.',
    screenType: 'work',
  },
  {
    id: 'services',
    name: '8 Commercial Practices',
    subdomain: 'Specialized Practices',
    badge: 'Full-Stack & Design',
    icon: Code2,
    accentColor: '#2563eb',
    accentBg: 'rgba(37, 99, 235, 0.08)',
    accentBorder: 'rgba(37, 99, 235, 0.3)',
    description: 'End-to-end full-stack software, brand vector design & AI bot development.',
    screenType: 'services',
  },
  {
    id: 'ai-bots',
    name: 'AI & WhatsApp Bot Studio',
    subdomain: 'Custom Automation',
    badge: 'Cloud API Engine',
    icon: Bot,
    accentColor: '#059669',
    accentBg: 'rgba(5, 150, 105, 0.08)',
    accentBorder: 'rgba(5, 150, 105, 0.3)',
    description: 'Official WhatsApp Cloud API bots, Telegram notifiers & 24/7 AI agents.',
    screenType: 'aibots',
  },
  {
    id: 'themes',
    name: 'Next.js 15 Templates',
    subdomain: 'templates.techusar.com',
    badge: '50+ Free Starters',
    icon: ShoppingBag,
    accentColor: '#0d9488',
    accentBg: 'rgba(13, 148, 136, 0.08)',
    accentBorder: 'rgba(13, 148, 136, 0.3)',
    description: 'Production-ready Next.js 15, TypeScript & Tailwind CSS web starters.',
    screenType: 'templates',
  },
  {
    id: 'tools-preview',
    name: 'TechTools Live Suite',
    subdomain: 'tools.techusar.com',
    badge: 'Live Platform',
    icon: Wrench,
    accentColor: '#2563eb',
    accentBg: 'rgba(37, 99, 235, 0.08)',
    accentBorder: 'rgba(37, 99, 235, 0.3)',
    description: 'Free client-side PDF Invoicing, Margin Calculator, and JSON Formatter.',
    screenType: 'tools',
  },
  {
    id: 'process',
    name: '5-Step Production Pipeline',
    subdomain: 'Operational Rigor',
    badge: 'Predictable Delivery',
    icon: Clock,
    accentColor: '#0284c7',
    accentBg: 'rgba(2, 132, 199, 0.08)',
    accentBorder: 'rgba(2, 132, 199, 0.3)',
    description: 'Discovery, Vector Tokens, Full-Stack Build, QA, and 30-Day Warranty.',
    screenType: 'process',
  },
  {
    id: 'articles-preview',
    name: 'Engineering Journal & SEO',
    subdomain: 'techusar.com/blog',
    badge: 'Technical Guides',
    icon: BookOpen,
    accentColor: '#2563eb',
    accentBg: 'rgba(37, 99, 235, 0.08)',
    accentBorder: 'rgba(37, 99, 235, 0.3)',
    description: 'Deep dives on WhatsApp bot architecture, Next.js 15 and design tokens.',
    screenType: 'blog',
  },
  {
    id: 'contact',
    name: 'Direct Consultation',
    subdomain: '+92 331 8917330',
    badge: 'Direct WhatsApp',
    icon: Mail,
    accentColor: '#059669',
    accentBg: 'rgba(5, 150, 105, 0.08)',
    accentBorder: 'rgba(5, 150, 105, 0.3)',
    description: 'Currently accepting select full-stack software & custom AI bot contracts.',
    screenType: 'contact',
  },
];

export function InteractiveDeviceWorkstation() {
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [manualOverride, setManualOverride] = useState<boolean>(false);
  const overrideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Live telemetry ticker
  const [latency, setLatency] = useState('14.2');
  const [qps, setQps] = useState('142,800');

  useEffect(() => {
    const interval = setInterval(() => {
      const l = (13.4 + Math.random() * 1.4).toFixed(1);
      const q = (142000 + Math.floor(Math.random() * 2200)).toLocaleString();
      setLatency(l);
      setQps(q);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection to automatically morph device as user scrolls through sections
  useEffect(() => {
    const handleScroll = () => {
      if (manualOverride) return;

      const sectionIds = [
        'hero-section',
        'ecosystem',
        'about-intro',
        'work',
        'services',
        'ai-bots',
        'themes',
        'tools-preview',
        'process',
        'faq',
        'articles-preview',
        'contact',
      ];

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            const mappedId =
              sectionIds[i] === 'hero-section'
                ? 'hero'
                : sectionIds[i] === 'faq'
                ? 'process'
                : sectionIds[i];
            setActiveSectionId((prev) => (prev !== mappedId ? mappedId : prev));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [manualOverride]);

  // Handle manual tab select
  const handleSelectTool = (id: string) => {
    setActiveSectionId(id);
    setManualOverride(true);
    if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current);
    overrideTimerRef.current = setTimeout(() => {
      setManualOverride(false);
    }, 12000);
  };

  const activeTool =
    SECTION_TOOLS.find((t) => t.id === activeSectionId) || SECTION_TOOLS[0];
  const IconComponent = activeTool.icon;

  // 3D Mouse Parallax Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const luxurySpring = { damping: 28, stiffness: 85, mass: 0.65 };
  const smoothX = useSpring(mouseX, luxurySpring);
  const smoothY = useSpring(mouseY, luxurySpring);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const floatTopX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const floatTopY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  const floatBottomX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const floatBottomY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

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

  // Interactive Mini State Simulators
  const [invoiceAmount, setInvoiceAmount] = useState('1,250');
  const [invoiceTax, setInvoiceTax] = useState('15');
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: 'user' | 'bot'; text: string; time: string }>
  >([
    {
      sender: 'user',
      text: 'Assalam-o-Alaikum! Can I automate customer orders on WhatsApp?',
      time: '11:42 AM',
    },
    {
      sender: 'bot',
      text: 'Walaikum Assalam! Yes, TechUsar builds Meta Cloud API bots with automated catalog booking, payment verification, and 24/7 AI support.',
      time: '11:42 AM',
    },
  ]);
  const [inputChat, setInputChat] = useState('');

  const handleSendChat = () => {
    if (!inputChat.trim()) return;
    const newMsg = {
      sender: 'user' as const,
      text: inputChat,
      time: 'Now',
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputChat('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot' as const,
          text: 'Order received! Direct WhatsApp line: +92 331 8917330. We deliver in 3–7 business days.',
          time: 'Now',
        },
      ]);
    }, 700);
  };

  return (
    <div
      id="interactive-device-showcase"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full [perspective:1400px] select-none"
    >
      {/* 3D Laptop Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-2xl transition-shadow duration-300"
      >
        {/* =========================================================================
            LAPTOP DISPLAY LID / TOP CASING
           ========================================================================= */}
        <div className="relative rounded-2xl border border-neutral-300/90 dark:border-neutral-700/80 bg-neutral-900 dark:bg-[#07090e] p-2.5 sm:p-3.5 shadow-2xl shadow-black/15 dark:shadow-black/60 transition-colors">
          {/* Laptop Top Bezel Notch with Camera */}
          <div className="flex items-center justify-between px-2 pb-2 text-neutral-400 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Centered Camera & Active Context Indicator */}
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neutral-800 text-[10px] font-mono text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>techusar.com / {activeTool.id}</span>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">SSL Secured</span>
            </div>
          </div>

          {/* =======================================================================
              LAPTOP INTERNAL SCREEN (CLEAN WHITE DEFAULT, REFINED OLED DARK)
             ======================================================================= */}
          <div className="relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0f17] overflow-hidden min-h-[350px] sm:min-h-[390px] flex flex-col justify-between shadow-inner">
            {/* Screen Top Application Navigation Bar */}
            <div className="px-3.5 sm:px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/90 dark:bg-neutral-900/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* 3D Rotating & Flipping Tool Icon Token */}
                <motion.div
                  key={activeTool.id}
                  initial={{ rotateY: 90, scale: 0.75, opacity: 0 }}
                  animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                  exit={{ rotateY: -90, scale: 0.75, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs shrink-0"
                  style={{ backgroundColor: activeTool.accentColor }}
                >
                  <IconComponent className="w-4 h-4" />
                </motion.div>

                <div className="min-w-0">
                  <div className="text-xs font-bold text-neutral-950 dark:text-white truncate flex items-center gap-1.5">
                    <span>{activeTool.name}</span>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {activeTool.badge}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 truncate">
                    {activeTool.subdomain}
                  </div>
                </div>
              </div>

              {/* Ecosystem Tool Switcher Ribbon */}
              <div className="hidden sm:flex items-center gap-1 bg-neutral-200/60 dark:bg-neutral-800 p-0.5 rounded-lg text-[10px] font-mono">
                {['tools-preview', 'ai-bots', 'themes', 'services'].map((tId) => {
                  const item = SECTION_TOOLS.find((s) => s.id === tId);
                  if (!item) return null;
                  const isActive = activeSectionId === tId;
                  return (
                    <button
                      key={tId}
                      type="button"
                      onClick={() => handleSelectTool(tId)}
                      className={`px-2 py-1 rounded transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white font-bold shadow-2xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                      }`}
                    >
                      {item.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Screen Viewport based on active section */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {/* 1. TECHTOOLS SCREEN (LIVE CALCULATOR / PDF PREVIEW) */}
                {activeTool.screenType === 'tools' && (
                  <motion.div
                    key="tools-screen"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800 text-xs">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-bold text-neutral-900 dark:text-white">
                          Invoice &amp; Tax Calculator
                        </span>
                      </div>
                      <a
                        href="https://tools.techusar.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open tools.techusar.com</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-neutral-500 uppercase">
                          Base Amount ($)
                        </label>
                        <input
                          type="text"
                          value={invoiceAmount}
                          onChange={(e) => setInvoiceAmount(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-xs focus:border-blue-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-neutral-500 uppercase">
                          Tax Rate (%)
                        </label>
                        <input
                          type="text"
                          value={invoiceTax}
                          onChange={(e) => setInvoiceTax(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-xs focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Calculated Outcome Box */}
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-[10px] font-mono text-neutral-500">
                          TOTAL PAYABLE WITH TAX
                        </div>
                        <div className="text-base font-bold font-mono text-neutral-950 dark:text-white">
                          $
                          {(
                            (parseFloat(invoiceAmount.replace(/,/g, '')) || 0) *
                            (1 + (parseFloat(invoiceTax) || 0) / 100)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                      <a
                        href="https://tools.techusar.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-mono font-semibold text-[11px] transition-colors shadow-2xs"
                      >
                        Generate PDF &rarr;
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* 2. AI BOT STUDIO SCREEN (LIVE CHAT SIMULATOR) */}
                {activeTool.screenType === 'aibots' && (
                  <motion.div
                    key="aibots-screen"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs pb-1.5 border-b border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Cloud Bot Demo</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">
                        24/7 AI Dispatch
                      </span>
                    </div>

                    {/* Chat Bubble Scrollable View */}
                    <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex flex-col ${
                            msg.sender === 'user' ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div
                            className={`p-2.5 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-bl-none'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="text-[9px] font-mono text-neutral-400 px-1 mt-0.5">
                            {msg.time}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <input
                        type="text"
                        placeholder="Type a test message (e.g. Order bot)..."
                        value={inputChat}
                        onChange={(e) => setInputChat(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={handleSendChat}
                        className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 3. TEMPLATES SCREEN */}
                {activeTool.screenType === 'templates' && (
                  <motion.div
                    key="templates-screen"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs pb-1.5 border-b border-neutral-100 dark:border-neutral-800">
                      <span className="font-bold text-neutral-950 dark:text-white">
                        Next.js 15 Starter Templates
                      </span>
                      <a
                        href="https://templates.techusar.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-bold inline-flex items-center gap-1"
                      >
                        <span>templates.techusar.com</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 space-y-1">
                        <div className="font-bold text-neutral-950 dark:text-white">
                          Nexus SaaS Kit
                        </div>
                        <div className="text-[10px] text-neutral-500">
                          App Router · Tailwind v4 · Stripe
                        </div>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold block">
                          Production Ready
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 space-y-1">
                        <div className="font-bold text-neutral-950 dark:text-white">
                          Apex Commerce
                        </div>
                        <div className="text-[10px] text-neutral-500">
                          Catalog · WhatsApp Order · Cart
                        </div>
                        <span className="text-[10px] font-mono text-blue-600 font-bold block">
                          Free Download
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-[11px] text-teal-800 dark:text-teal-300 flex items-center justify-between">
                      <span>50+ Interactive live netlify demos</span>
                      <Link
                        href="/templates"
                        className="font-bold underline hover:opacity-80"
                      >
                        Browse All &rarr;
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* 4. WORK / DEPLOYMENT SCREEN */}
                {activeTool.screenType === 'work' && (
                  <motion.div
                    key="work-screen"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3 font-mono text-xs"
                  >
                    <div className="p-3 rounded-xl bg-neutral-900 text-neutral-100 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] text-neutral-400">
                        <span>CLUSTER: PROD-AP-SOUTH</span>
                        <span className="text-emerald-400">● 100% HEALTHY</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-bold">
                        &gt; next build --experimental-app-router: SUCCESS
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        Compiled 48 pages in 840ms. Zero hydration mismatch.
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                        <div className="text-neutral-500 text-[10px]">AVG LATENCY</div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-white">
                          {latency} ms
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                        <div className="text-neutral-500 text-[10px]">THROUGHPUT</div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-white">
                          {qps} /m
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 5. DEFAULT / ECOSYSTEM HUB SCREEN */}
                {(activeTool.screenType === 'hub' ||
                  activeTool.screenType === 'services' ||
                  activeTool.screenType === 'design' ||
                  activeTool.screenType === 'process' ||
                  activeTool.screenType === 'blog' ||
                  activeTool.screenType === 'contact') && (
                  <motion.div
                    key="hub-screen"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        <Activity className="w-3.5 h-3.5" />
                        <span>TECHUSAR DIGITAL PLATFORM ENGINE</span>
                      </div>
                      <h4 className="text-base font-extrabold text-neutral-950 dark:text-white">
                        {activeTool.name}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {activeTool.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                      <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700">
                        <div className="text-[10px] text-neutral-500">TECHTOOLS</div>
                        <div className="text-xs font-bold text-blue-600">LIVE</div>
                      </div>
                      <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700">
                        <div className="text-[10px] text-neutral-500">TEMPLATES</div>
                        <div className="text-xs font-bold text-emerald-600">READY</div>
                      </div>
                      <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700">
                        <div className="text-[10px] text-neutral-500">PORTFOLIO</div>
                        <div className="text-xs font-bold text-purple-600">SUBDOMAIN</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Screen Bottom Status Bar */}
            <div className="px-3.5 sm:px-4 py-2 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/60 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>ACTIVE: {activeTool.name.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>SCROLL SYNC ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            LAPTOP LOWER CHASSIS & KEYBOARD BASE (SMOOTH ANODIZED ALUMINUM BASE)
           ========================================================================= */}
        <div className="relative mx-auto w-[94%] h-3.5 sm:h-4 bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-500 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 rounded-b-xl shadow-lg border-t border-white/20">
          {/* Centered Finger Opening Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-neutral-200 dark:bg-neutral-600 rounded-b-md" />
        </div>

        {/* =========================================================================
            FLOATING SATELLITE TOKENS & ORBITING CARDS
           ========================================================================= */}
        {/* Top-Right: Lighthouse 100 Performance Score Ring */}
        <motion.div
          style={{ x: floatTopX, y: floatTopY }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden sm:flex absolute -top-5 -right-3 sm:-top-6 sm:-right-5 z-20 p-2.5 sm:p-3 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#0c0f17]/95 backdrop-blur-md shadow-xl items-center gap-2.5"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
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
            <span className="absolute text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
              100
            </span>
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
              Lighthouse 100
            </div>
            <div className="text-[10px] font-mono text-neutral-500">
              Zero Edge Jitter
            </div>
          </div>
        </motion.div>

        {/* Bottom-Left: Live Subdomain Direct Link Pill */}
        <motion.div
          style={{ x: floatBottomX, y: floatBottomY }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="hidden sm:flex absolute -bottom-5 -left-3 sm:-bottom-6 sm:-left-5 z-20 p-2.5 sm:p-3 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#0c0f17]/95 backdrop-blur-md shadow-xl items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-extrabold text-xs shadow-xs">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900 dark:text-white leading-tight flex items-center gap-1">
              <span>tools.techusar.com</span>
              <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                LIVE
              </span>
            </div>
            <div className="text-[10px] font-mono text-neutral-500">
              Click to launch free tools suite
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
