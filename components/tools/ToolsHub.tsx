'use client';

import React, { useState } from 'react';
import { InvoiceGenerator } from './accountant/InvoiceGenerator';
import { ProfitMarginCalculator } from './accountant/ProfitMarginCalculator';
import { LoanEmiCalculator } from './accountant/LoanEmiCalculator';
import { HourlyRateCalculator } from './accountant/HourlyRateCalculator';
import { JsonFormatter } from './developer/JsonFormatter';
import { Base64UrlConverter } from './developer/Base64UrlConverter';
import { CssShadowGenerator } from './developer/CssShadowGenerator';
import { UuidGenerator } from './developer/UuidGenerator';
import {
  Receipt,
  TrendingUp,
  Landmark,
  Clock,
  Braces,
  Binary,
  Layers,
  KeyRound,
  Wrench,
  Search,
  Sparkles,
  Calculator,
  Code2
} from 'lucide-react';

export type ToolId =
  | 'invoice'
  | 'margin'
  | 'emi'
  | 'hourly'
  | 'json'
  | 'base64'
  | 'shadow'
  | 'uuid';

interface ToolItem {
  id: ToolId;
  name: string;
  category: 'accountant' | 'developer';
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tag: string;
}

const allTools: ToolItem[] = [
  // Accountant Tools
  {
    id: 'invoice',
    name: 'Invoice & Receipt Generator',
    category: 'accountant',
    icon: Receipt,
    description: 'Create, compute taxes/VAT, and print or export clean PDF invoices.',
    tag: 'Accountants & Freelancers',
  },
  {
    id: 'margin',
    name: 'Profit Margin & Markup Calculator',
    category: 'accountant',
    icon: TrendingUp,
    description: 'Calculate Gross Profit, Gross Margin, Markup % and Net Profit.',
    tag: 'Business & Finance',
  },
  {
    id: 'emi',
    name: 'Loan EMI & Compound Interest',
    category: 'accountant',
    icon: Landmark,
    description: 'Calculate monthly loan payments, interest breakdown, and amortization.',
    tag: 'Loans & Banking',
  },
  {
    id: 'hourly',
    name: 'Freelancer Rate & Salary Calculator',
    category: 'accountant',
    icon: Clock,
    description: 'Compute target hourly & daily rates based on desired net income.',
    tag: 'Freelancers & Agencies',
  },

  // Developer Tools
  {
    id: 'json',
    name: 'JSON Formatter & Validator',
    category: 'developer',
    icon: Braces,
    description: 'Prettify, minify, and validate JSON payloads with instant error pointers.',
    tag: 'APIs & Web Dev',
  },
  {
    id: 'base64',
    name: 'Base64 & URL Encoder/Decoder',
    category: 'developer',
    icon: Binary,
    description: 'Two-way conversion for strings, auth tokens, and URL parameters.',
    tag: 'Security & Encoding',
  },
  {
    id: 'shadow',
    name: 'CSS Box Shadow & Glow Generator',
    category: 'developer',
    icon: Layers,
    description: 'Visual slider controls with instant CSS and Tailwind class output.',
    tag: 'UI & Styling',
  },
  {
    id: 'uuid',
    name: 'Cryptographic UUID v4 Generator',
    category: 'developer',
    icon: KeyRound,
    description: 'Generate bulk RFC 4122 compliant UUIDs with one-click copy.',
    tag: 'Databases & Backend',
  },
];

export function ToolsHub() {
  const [activeTool, setActiveTool] = useState<ToolId>('invoice');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'accountant' | 'developer'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = allTools.filter((tool) => {
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Ecosystem Subdomain Announcement Card */}
      <div className="p-4 sm:p-5 rounded-2xl border-2 border-blue-500/30 bg-linear-to-r from-blue-50/80 via-indigo-50/50 to-purple-50/40 dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-purple-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs no-print">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase">
              Official Hub
            </span>
            <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
              tools.techusar.com
            </span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Dedicated free utilities engine for developers, accountants &amp; founders. Zero tracking, client-side execution.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href="https://tools.techusar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5"
          >
            <span>Open tools.techusar.com</span>
            <Wrench className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://tamplates.techusar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-emerald-500 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
          >
            <span>tamplates.techusar.com</span>
          </a>
        </div>
      </div>

      {/* Category filter & search toolbar */}
      <div className="p-4 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md shadow-xs space-y-4 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                categoryFilter === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Tools ({allTools.length})
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('accountant')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                categoryFilter === 'accountant'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>For Accountants &amp; Business</span>
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('developer')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                categoryFilter === 'developer'
                  ? 'bg-purple-600 text-white shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>For Developers &amp; Designers</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search tools (invoice, margin, json, uuid)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs text-neutral-900 dark:text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Horizontal Quick Tool Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2 border-t border-neutral-200/80 dark:border-neutral-800/80">
          {filteredTools.map((t) => {
            const IconComponent = t.icon;
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTool(t.id)}
                className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isActive
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/30 shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/30'
                }`}
              >
                <div className="space-y-1.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-neutral-900 dark:text-white leading-tight line-clamp-2">
                    {t.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tool Render */}
      <div className="transition-all duration-200">
        {activeTool === 'invoice' && <InvoiceGenerator />}
        {activeTool === 'margin' && <ProfitMarginCalculator />}
        {activeTool === 'emi' && <LoanEmiCalculator />}
        {activeTool === 'hourly' && <HourlyRateCalculator />}
        {activeTool === 'json' && <JsonFormatter />}
        {activeTool === 'base64' && <Base64UrlConverter />}
        {activeTool === 'shadow' && <CssShadowGenerator />}
        {activeTool === 'uuid' && <UuidGenerator />}
      </div>
    </div>
  );
}
