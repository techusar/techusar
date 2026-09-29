'use client';

import React from 'react';
import {
  Users,
  ShieldCheck,
  Clock,
  Gauge,
  Zap,
  Cpu,
  CheckCircle2,
  GitCommit,
  Terminal,
} from 'lucide-react';
import { Project } from '@/types';

interface ProjectStatsSectionProps {
  project: Project;
}

export function ProjectStatsSection({ project }: ProjectStatsSectionProps) {
  const stats = project.projectStats || {
    teamSize: '3 Engineers',
    codeCoverage: '96.5%',
    completionTime: '6 Weeks',
    lighthouseScore: '99/100',
    sprintVelocity: '48 Pts / Sprint',
    architectureType: 'Full-Stack Serverless / RSC',
  };

  const statItems = [
    {
      id: 'team-size',
      label: 'Team Size',
      value: stats.teamSize || '3 Engineers',
      subtext: 'Cross-functional engineering & UI design',
      icon: Users,
      badge: 'Core Squad',
      accentColor: 'text-blue-600 dark:text-blue-400',
      bgLight: 'bg-blue-50/80 dark:bg-blue-950/30',
      borderLight: 'border-blue-200/70 dark:border-blue-800/60',
    },
    {
      id: 'code-coverage',
      label: 'Code Coverage',
      value: stats.codeCoverage || '96.8%',
      subtext: 'Rigorous unit, integration & E2E suites',
      icon: ShieldCheck,
      badge: 'Tested & Verified',
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      bgLight: 'bg-emerald-50/80 dark:bg-emerald-950/30',
      borderLight: 'border-emerald-200/70 dark:border-emerald-800/60',
      progress: 96,
    },
    {
      id: 'completion-time',
      label: 'Completion Time',
      value: stats.completionTime || '6 Weeks',
      subtext: 'From vector wireframes to production deployment',
      icon: Clock,
      badge: 'Sprint Delivery',
      accentColor: 'text-amber-600 dark:text-amber-400',
      bgLight: 'bg-amber-50/80 dark:bg-amber-950/30',
      borderLight: 'border-amber-200/70 dark:border-amber-800/60',
    },
    {
      id: 'lighthouse-score',
      label: 'Lighthouse & Web Vitals',
      value: stats.lighthouseScore || '99/100',
      subtext: 'Sub-second LCP, zero layout shift (CLS: 0.00)',
      icon: Gauge,
      badge: 'Core Web Vitals',
      accentColor: 'text-purple-600 dark:text-purple-400',
      bgLight: 'bg-purple-50/80 dark:bg-purple-950/30',
      borderLight: 'border-purple-200/70 dark:border-purple-800/60',
    },
    {
      id: 'sprint-velocity',
      label: 'Sprint Velocity',
      value: stats.sprintVelocity || '48 Pts / Sprint',
      subtext: 'Agile 2-week continuous delivery cycles',
      icon: Zap,
      badge: 'High Throughput',
      accentColor: 'text-sky-600 dark:text-sky-400',
      bgLight: 'bg-sky-50/80 dark:bg-sky-950/30',
      borderLight: 'border-sky-200/70 dark:border-sky-800/60',
    },
    {
      id: 'architecture-type',
      label: 'Architecture Paradigm',
      value: stats.architectureType || 'Distributed RSC & Edge API',
      subtext: 'Strict TypeScript typing with zero runtime slop',
      icon: Cpu,
      badge: 'Enterprise Spec',
      accentColor: 'text-indigo-600 dark:text-indigo-400',
      bgLight: 'bg-indigo-50/80 dark:bg-indigo-950/30',
      borderLight: 'border-indigo-200/70 dark:border-indigo-800/60',
    },
  ];

  return (
    <section className="space-y-6 pt-2">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>Engineering Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
            Project Stats
          </h2>
        </div>
        <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
          Delivery Metrics &amp; Quality Benchmarks
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`relative p-5 rounded-2xl border ${item.borderLight} ${item.bgLight} bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md group`}
            >
              <div className="space-y-3">
                {/* Top Row: Icon and Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.accentColor} bg-white dark:bg-neutral-800 shadow-2xs border border-neutral-200/70 dark:border-neutral-700`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60">
                    {item.badge}
                  </span>
                </div>

                {/* Stat Label and Primary Value */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {item.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 dark:text-white font-mono mt-1">
                    {item.value}
                  </div>
                </div>
              </div>

              {/* Bottom Subtext */}
              <div className="pt-3 mt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
