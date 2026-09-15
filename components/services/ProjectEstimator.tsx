'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, Check, ArrowRight, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react';

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  baseDays: number;
  description: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'brand-identity',
    name: 'Brand Identity & Vector System',
    category: 'Design',
    basePrice: 3800,
    baseDays: 14,
    description: 'Bespoke geometric logomarks, typography rules, color palettes, and comprehensive vector guidelines.',
  },
  {
    id: 'design-system',
    name: 'Multi-Brand Figma Design System',
    category: 'Design',
    basePrice: 4500,
    baseDays: 18,
    description: 'Component architecture, auto-layout tokens, responsive primitives, and developer handoff documentation.',
  },
  {
    id: 'fullstack-web',
    name: 'Full-Stack Next.js 15 Web Platform',
    category: 'Engineering',
    basePrice: 6500,
    baseDays: 24,
    description: 'App Router architecture, TypeScript, server components, database schema, API integrations, and edge deployment.',
  },
  {
    id: 'custom-theme',
    name: 'Bespoke Commercial Theme & Templates',
    category: 'Hybrid',
    basePrice: 4200,
    baseDays: 16,
    description: 'High-converting marketing pages, SaaS dashboards, and template engines tailored to your brand identity.',
  },
  {
    id: 'ux-audit-perf',
    name: 'Performance Audit & UX Refactor',
    category: 'Engineering',
    basePrice: 2800,
    baseDays: 8,
    description: 'Web Vitals optimization (sub-100ms LCP), accessibility remediation (WCAG AAA), and fluid animation polish.',
  },
];

interface AddonOption {
  id: string;
  name: string;
  price: number;
  days: number;
  description: string;
}

const ADDON_OPTIONS: AddonOption[] = [
  {
    id: 'figma-tokens',
    name: 'Figma Tokens & CSS Sync Architecture',
    price: 900,
    days: 3,
    description: 'Export automated JSON design tokens mapped 1:1 to Tailwind CSS classes.',
  },
  {
    id: 'backend-auth',
    name: 'Authentication & Multi-Role RBAC',
    price: 1400,
    days: 5,
    description: 'Secure session management, role permissions, and OAuth social sign-in integration.',
  },
  {
    id: 'motion-physics',
    name: 'Custom Spring Physics & Micro-Interactions',
    price: 1100,
    days: 4,
    description: 'Framer Motion gestures, cursor tracking, and layout transitions.',
  },
  {
    id: 'priority-sla',
    name: 'Priority Dedicated SLA & 60-Day Support',
    price: 1500,
    days: 0,
    description: 'Guaranteed 12-hour response time and complimentary post-launch feature tweaks.',
  },
];

export function ProjectEstimator() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['fullstack-web', 'brand-identity']);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['figma-tokens']);
  const [urgency, setUrgency] = useState<'standard' | 'accelerated' | 'express'>('standard');

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    );
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const calculation = useMemo(() => {
    let price = 0;
    let days = 0;

    selectedServices.forEach((sId) => {
      const s = SERVICE_OPTIONS.find((opt) => opt.id === sId);
      if (s) {
        price += s.basePrice;
        days += s.baseDays;
      }
    });

    selectedAddons.forEach((aId) => {
      const a = ADDON_OPTIONS.find((opt) => opt.id === aId);
      if (a) {
        price += a.price;
        days += a.days;
      }
    });

    // Bundling discount for multiple services
    if (selectedServices.length >= 2) {
      price = price * 0.9; // 10% combo reduction
    }

    // Urgency multiplier
    if (urgency === 'accelerated') {
      price *= 1.2;
      days = Math.max(7, Math.round(days * 0.7));
    } else if (urgency === 'express') {
      price *= 1.45;
      days = Math.max(5, Math.round(days * 0.5));
    }

    return {
      priceMin: Math.round(price * 0.95),
      priceMax: Math.round(price * 1.08),
      estimatedWeeks: Math.max(1, Math.ceil(days / 5)),
      rawDays: days,
    };
  }, [selectedServices, selectedAddons, urgency]);

  return (
    <div
      id="interactive-project-estimator"
      className="p-6 sm:p-8 rounded-3xl border border-blue-500/20 dark:border-purple-500/30 bg-gradient-to-b from-white via-neutral-50 to-blue-50/20 dark:from-neutral-900/90 dark:via-neutral-900/50 dark:to-neutral-950 shadow-xl space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-purple-950/70 border border-blue-200 dark:border-purple-800/60 text-xs font-mono text-blue-600 dark:text-purple-400">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Scope & Investment Estimator</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Configure Your Project Parameters
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Select the disciplines, technical modules, and turnaround urgency to calculate real-time estimates.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-700 dark:text-neutral-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-purple-400" />
          <span>Multi-Service 10% Bundle applied</span>
        </div>
      </div>

      {/* Step 1: Services Selection */}
      <div className="space-y-4">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          01 / SELECT PRIMARY DISCIPLINES
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SERVICE_OPTIONS.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-blue-600 dark:border-purple-500 bg-blue-50/60 dark:bg-purple-950/30 shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 dark:bg-purple-600 text-white'
                      : 'border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-neutral-950 dark:text-white">
                      {service.name}
                    </span>
                    <span className="text-xs font-mono font-semibold text-blue-600 dark:text-purple-400">
                      ${service.basePrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Addon Capabilities */}
      <div className="space-y-4">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          02 / OPTIONAL TECHNICAL ACCELERATORS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ADDON_OPTIONS.map((addon) => {
            const isSelected = selectedAddons.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => toggleAddon(addon.id)}
                className={`p-3.5 rounded-xl text-left transition-all border flex items-start gap-3 ${
                  isSelected
                    ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50/40 dark:bg-indigo-950/20'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/30 hover:border-neutral-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'border border-neutral-300 dark:border-neutral-700'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-white">
                    <span>{addon.name}</span>
                    <span className="font-mono text-neutral-500 dark:text-neutral-400">
                      +${addon.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {addon.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Timeline & Urgency */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          03 / PRODUCTION PACING & LAUNCH DEADLINE
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setUrgency('standard')}
            className={`p-3.5 rounded-xl border text-left space-y-1 transition-all ${
              urgency === 'standard'
                ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 dark:text-white">Standard Delivery</span>
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
            </div>
            <p className="text-[11px] text-neutral-500">Methodical sprint cadence, standard rate.</p>
          </button>

          <button
            type="button"
            onClick={() => setUrgency('accelerated')}
            className={`p-3.5 rounded-xl border text-left space-y-1 transition-all ${
              urgency === 'accelerated'
                ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 dark:text-white">Fast-Track (+20%)</span>
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <p className="text-[11px] text-neutral-500">Accelerated milestone turnaround.</p>
          </button>

          <button
            type="button"
            onClick={() => setUrgency('express')}
            className={`p-3.5 rounded-xl border text-left space-y-1 transition-all ${
              urgency === 'express'
                ? 'border-purple-600 dark:border-purple-500 bg-purple-50/50 dark:bg-purple-950/30'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 dark:text-white">Sprint Priority (+45%)</span>
              <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <p className="text-[11px] text-neutral-500">Highest daily allocation for critical launches.</p>
          </button>
        </div>
      </div>

      {/* Summary Box & CTA */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-neutral-50 dark:bg-neutral-950/80 p-6 rounded-2xl border">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            ESTIMATED PROJECT INVESTMENT
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-mono">
              ${calculation.priceMin.toLocaleString()} – ${calculation.priceMax.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-neutral-500">USD</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400 font-mono pt-1">
            <span>⏱ ~{calculation.estimatedWeeks} Weeks Execution</span>
            <span>•</span>
            <span>Includes 100% IP Ownership</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href={`/contact?services=${selectedServices.join(',')}&urgency=${urgency}`}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md shadow-blue-500/20 hover:shadow-purple-500/30 transition-all active:scale-[0.98]"
          >
            <span>Commission This Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
