'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SECTION_TOOLS } from '@/components/hero/InteractiveDeviceWorkstation';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface SectionToolNodeProps {
  toolId: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionToolNode({ toolId, className = '', children }: SectionToolNodeProps) {
  const tool = SECTION_TOOLS.find((t) => t.id === toolId) || SECTION_TOOLS[0];
  const Icon = tool.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-5 sm:p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-[#0a0d14]/95 shadow-lg backdrop-blur-md space-y-4 overflow-hidden group ${className}`}
    >
      {/* Ambient Accent Corner Glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-35"
        style={{ backgroundColor: tool.accentColor }}
      />

      <div className="flex items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          {/* Animated 3D Tool Icon Receptacle */}
          <motion.div
            whileHover={{ rotate: 15, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
            style={{ backgroundColor: tool.accentColor }}
          >
            <Icon className="w-5 h-5 stroke-[2]" />
          </motion.div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white">
                {tool.name}
              </h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {tool.badge}
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500 block">
              {tool.subdomain || 'techusar.com'}
            </span>
          </div>
        </div>

        {tool.subdomain && tool.subdomain.includes('techusar.com') && (
          <a
            href={`https://${tool.subdomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-bold hover:underline"
            style={{ color: tool.accentColor }}
          >
            <span>Launch</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        )}
      </div>

      {children ? (
        <div className="pt-1">{children}</div>
      ) : (
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {tool.description}
        </p>
      )}
    </motion.div>
  );
}
