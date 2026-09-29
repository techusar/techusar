'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LucideIcon, RotateCw } from 'lucide-react';

interface SectionToolSlotProps {
  sectionId: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon: LucideIcon;
  accentColor?: string;
  align?: 'left' | 'right' | 'center' | 'inline';
  className?: string;
  metricLabel?: string;
  metricValue?: string;
}

export function SectionToolSlot({
  sectionId,
  title,
  subtitle,
  badge,
  icon: Icon,
  accentColor = '#2563eb',
  align = 'right',
  className = '',
  metricLabel,
  metricValue,
}: SectionToolSlotProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Active when section is within active viewport window
      const inView = rect.top <= windowHeight * 0.65 && rect.bottom >= windowHeight * 0.2;
      setIsActive(inView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionId]);

  return (
    <div
      data-tool-slot={sectionId}
      className={`relative inline-flex items-center select-none transition-all duration-300 ${className}`}
    >
      <motion.div
        animate={{
          scale: isActive ? 1.02 : 1,
          borderColor: isActive ? `${accentColor}80` : undefined,
        }}
        transition={{ duration: 0.35 }}
        className={`relative flex items-center gap-3 px-3.5 py-2 rounded-2xl border transition-all duration-400 backdrop-blur-md ${
          isActive
            ? 'bg-white/95 dark:bg-[#0c0f17]/95 border-blue-500/40 dark:border-blue-400/40 shadow-md shadow-blue-500/5'
            : 'bg-neutral-50/80 dark:bg-neutral-900/60 border-neutral-200/70 dark:border-neutral-800/70 opacity-90 shadow-2xs'
        }`}
      >
        {/* Soft subtle active aura (reduced shadow) */}
        {isActive && (
          <motion.div
            layoutId="active-slot-glow"
            className="absolute -inset-0.5 rounded-2xl blur-sm opacity-20 pointer-events-none"
            style={{ backgroundColor: accentColor }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* 3D Rotating Tool Token Socket */}
        <div className="relative flex items-center justify-center [perspective:600px]">
          {/* Active Orbit Ring */}
          {isActive && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-1 rounded-xl border border-dashed pointer-events-none opacity-60"
              style={{ borderColor: accentColor }}
            />
          )}

          {/* 3D Rotating Token */}
          <motion.div
            key={`${sectionId}-${isActive}`}
            initial={{ rotateY: 180, scale: 0.8 }}
            animate={{
              rotateY: isActive ? [0, 360] : 0,
              scale: 1,
            }}
            transition={{
              rotateY: { duration: 8, repeat: isActive ? Infinity : 0, ease: 'linear' },
              scale: { duration: 0.3 },
            }}
            className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center text-white cursor-pointer select-none [transform-style:preserve-3d] shadow-xs"
            style={{
              backgroundColor: accentColor,
              boxShadow: isActive ? `0 4px 12px -2px ${accentColor}40` : undefined,
            }}
          >
            {/* Specular sheen reflection */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/20 to-transparent pointer-events-none" />
            <Icon className="w-4.5 h-4.5 stroke-[2] drop-shadow-2xs relative z-10" />
          </motion.div>
        </div>

        {/* Tool Info & Dock Status */}
        <div className="flex flex-col pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white tracking-tight">
              {title}
            </span>
            {badge && (
              <span
                className="text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold tracking-wider"
                style={{
                  backgroundColor: `${accentColor}18`,
                  color: accentColor,
                }}
              >
                {badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
            {subtitle ? <span>{subtitle}</span> : null}
            {metricLabel && metricValue && (
              <>
                <span className="opacity-40">•</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                  {metricLabel}: <span className="font-bold">{metricValue}</span>
                </span>
              </>
            )}
            {isActive && (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold ml-auto text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Docked</span>
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
