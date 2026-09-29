'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import {
  Globe,
  Layers,
  Palette,
  Terminal,
  Code2,
  Bot,
  ShoppingBag,
  Wrench,
  Clock,
  BookOpen,
  Mail,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ExternalLink,
  RotateCw,
  Compass,
  ArrowDown,
} from 'lucide-react';
import { SECTION_TOOLS, SectionToolData } from '@/components/hero/InteractiveDeviceWorkstation';

export function ToolEcosystemDock() {
  const [activeId, setActiveId] = useState<string>('hero');
  const [expanded, setExpanded] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 });
  const rotateYFromScroll = useTransform(smoothProgress, [0, 1], [0, 1440]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 200);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(100, Math.round((scrollY / maxScroll) * 100)) : 0;
      setScrollProgress(progress);

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

      const scrollPosition = scrollY + window.innerHeight * 0.38;

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
            setActiveId(mappedId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeTool = SECTION_TOOLS.find((t) => t.id === activeId) || SECTION_TOOLS[0];
  const IconComponent = activeTool.icon;

  const scrollToSection = (id: string) => {
    const targetId = id === 'hero' ? 'hero-section' : id;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!visible) return null;

  return (
    <aside aria-label="3D Scroll Traveling Tool Companion" className="fixed bottom-6 right-6 z-40 hidden sm:block [perspective:1000px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 30 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-[#0c0f17]/95 backdrop-blur-md shadow-md p-2.5 flex flex-col gap-2 max-w-xs transition-shadow duration-300"
      >
        {/* Scroll Progress Tiny Bar */}
        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-150 rounded-full"
            style={{
              width: `${scrollProgress}%`,
              backgroundColor: activeTool.accentColor,
            }}
          />
        </div>

        {/* Companion Status Header */}
        <div className="flex items-center justify-between px-1 text-[10px] font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SCROLL TRAVELING 3D</span>
          </div>
          <span className="font-semibold text-neutral-500 dark:text-neutral-400">
            {scrollProgress}%
          </span>
        </div>

        {/* Active Tool Bar (3D Rotating Token + Section Name) */}
        <div className="flex items-center justify-between gap-2.5 px-1 py-0.5">
          <button
            onClick={() => scrollToSection(activeTool.id)}
            className="flex items-center gap-2.5 text-left hover:opacity-90 transition-opacity min-w-0 cursor-pointer group"
            title={`Docked to ${activeTool.name}. Click to view section.`}
          >
            {/* 3D Rotating Token Socket */}
            <div className="relative [perspective:600px] shrink-0">
              <motion.div
                key={activeTool.id}
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 10, 0, -10, 0],
                }}
                transition={{
                  rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
                  rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white [transform-style:preserve-3d] shadow-xs group-hover:scale-105 transition-transform"
                style={{
                  backgroundColor: activeTool.accentColor,
                  boxShadow: `0 4px 10px -2px ${activeTool.accentColor}40`,
                }}
              >
                {/* 3D Sheen */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/25 to-transparent pointer-events-none" />
                <IconComponent className="w-4 h-4 relative z-10 drop-shadow-xs" />
              </motion.div>
            </div>

            <div className="min-w-0">
              <div className="text-xs font-bold text-neutral-900 dark:text-white truncate flex items-center gap-1">
                <span>{activeTool.name}</span>
              </div>
              <div className="text-[10px] font-mono text-neutral-500 truncate flex items-center gap-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● Docked</span>
                <span>·</span>
                <span>{activeTool.badge}</span>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Tool Navigator"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Ecosystem Navigator */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-neutral-100 dark:border-neutral-800 pt-2 space-y-1"
            >
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider px-1 pb-1 flex items-center justify-between">
                <span>Section Tool Docks</span>
                <span>10 Nodes</span>
              </div>
              <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
                {SECTION_TOOLS.map((tool) => {
                  const ToolIcon = tool.icon;
                  const isActive = tool.id === activeId;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        scrollToSection(tool.id);
                        setExpanded(false);
                      }}
                      className={`w-full text-left p-1.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer text-xs ${
                        isActive
                          ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-950 dark:text-white font-bold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-white shrink-0 shadow-2xs"
                        style={{ backgroundColor: tool.accentColor }}
                      >
                        <ToolIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[11px] font-semibold">{tool.name}</div>
                        <div className="text-[9px] font-mono text-neutral-400 truncate">
                          {tool.badge}
                        </div>
                      </div>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </aside>
  );
}
