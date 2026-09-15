'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, Percent, DollarSign } from 'lucide-react';

export function ProfitMarginCalculator() {
  const [costPrice, setCostPrice] = useState<number>(120);
  const [sellingPrice, setSellingPrice] = useState<number>(200);
  const [operatingExpenses, setOperatingExpenses] = useState<number>(30);

  // Calculations
  const grossProfit = Math.max(0, sellingPrice - costPrice);
  const grossMargin = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;
  const markup = costPrice > 0 ? (grossProfit / costPrice) * 100 : 0;
  const netProfit = sellingPrice - costPrice - operatingExpenses;
  const netMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;

  return (
    <div className="space-y-6 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            Profit Margin &amp; Markup Calculator
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            For businesses, accountants, and freelancers to price products, software, and services profitably.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
            Input Financial Parameters
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Cost of Goods / Service Cost (COGS)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-neutral-400 font-mono">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full pl-7 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 font-mono font-medium text-sm text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Selling Price (Revenue per unit / project)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-neutral-400 font-mono">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full pl-7 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 font-mono font-medium text-sm text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Operating Overhead / Additional Expenses
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-neutral-400 font-mono">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={operatingExpenses}
                  onChange={(e) => setOperatingExpenses(Number(e.target.value))}
                  className="w-full pl-7 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 font-mono font-medium text-sm text-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs space-y-1">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono">
              Margin vs. Markup Rule:
            </span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <strong>Margin</strong> is profit as a percentage of <em>Selling Price</em>. <strong>Markup</strong> is the percentage added on top of <em>Cost Price</em>.
            </p>
          </div>
        </div>

        {/* Real-Time Results Card */}
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Computed Financial Metrics
            </span>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-emerald-200 dark:border-emerald-900/40">
                <span className="text-xs text-neutral-500 block">Gross Profit</span>
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  ${grossProfit.toFixed(2)}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-emerald-200 dark:border-emerald-900/40">
                <span className="text-xs text-neutral-500 block">Gross Margin</span>
                <span className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
                  {grossMargin.toFixed(1)}%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-emerald-200 dark:border-emerald-900/40">
                <span className="text-xs text-neutral-500 block">Markup on Cost</span>
                <span className="text-2xl font-black font-mono text-purple-600 dark:text-purple-400">
                  {markup.toFixed(1)}%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-emerald-200 dark:border-emerald-900/40">
                <span className="text-xs text-neutral-500 block">Net Profit</span>
                <span
                  className={`text-2xl font-black font-mono ${
                    netProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                  }`}
                >
                  ${netProfit.toFixed(2)}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono block mt-0.5">
                  Net Margin: {netMargin.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Visual breakdown bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-mono text-neutral-500">
                <span>Revenue Breakdown</span>
                <span>$ {sellingPrice}</span>
              </div>
              <div className="h-3 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden flex">
                <div
                  style={{ width: `${Math.min(100, (costPrice / (sellingPrice || 1)) * 100)}%` }}
                  className="bg-neutral-400 dark:bg-neutral-600 h-full"
                  title={`Cost: $${costPrice}`}
                />
                <div
                  style={{ width: `${Math.min(100, (operatingExpenses / (sellingPrice || 1)) * 100)}%` }}
                  className="bg-amber-400 h-full"
                  title={`Expenses: $${operatingExpenses}`}
                />
                <div
                  style={{ width: `${Math.max(0, (netProfit / (sellingPrice || 1)) * 100)}%` }}
                  className="bg-emerald-500 h-full"
                  title={`Net Profit: $${netProfit}`}
                />
              </div>
              <div className="flex gap-4 text-[11px] font-mono text-neutral-500 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-neutral-500" /> Cost
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Expenses
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Net Profit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
