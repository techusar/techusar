'use client';

import React, { useState } from 'react';
import { Briefcase, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export function HourlyRateCalculator() {
  const [targetAnnualSalary, setTargetAnnualSalary] = useState<number>(60000);
  const [annualExpenses, setAnnualExpenses] = useState<number>(6000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);
  const [taxBufferPercent, setTaxBufferPercent] = useState<number>(25);

  const workingWeeks = Math.max(1, 52 - vacationWeeks);
  const totalAnnualBillableHours = workingWeeks * billableHoursPerWeek;

  const totalRequiredRevenue =
    (targetAnnualSalary + annualExpenses) / (1 - taxBufferPercent / 100);

  const hourlyRate =
    totalAnnualBillableHours > 0 ? totalRequiredRevenue / totalAnnualBillableHours : 0;
  const dayRate = hourlyRate * 8;
  const monthlyGross = totalRequiredRevenue / 12;

  return (
    <div className="space-y-6 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-xs">
      <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            Freelancer &amp; Consultant Minimum Rate Calculator
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Compute the exact billable hourly and daily rate needed to hit your target take-home pay.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Target Annual Net Income ($)
            </label>
            <input
              type="number"
              step="1000"
              value={targetAnnualSalary}
              onChange={(e) => setTargetAnnualSalary(Number(e.target.value))}
              className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 font-mono font-bold text-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Annual Business Expenses / Software / Hardware ($)
            </label>
            <input
              type="number"
              step="500"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(Number(e.target.value))}
              className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Billable Hours / Week
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={billableHoursPerWeek}
                onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Vacation &amp; Sick Weeks
              </label>
              <input
                type="number"
                min="0"
                max="12"
                value={vacationWeeks}
                onChange={(e) => setVacationWeeks(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Estimated Tax Reserve Buffer (%)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={taxBufferPercent}
              onChange={(e) => setTaxBufferPercent(Number(e.target.value))}
              className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 font-mono"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-50/20 dark:bg-amber-950/10 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Recommended Minimum Rates
            </span>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-amber-200 dark:border-amber-900/40">
              <span className="text-xs text-neutral-500 block">Minimum Hourly Rate</span>
              <span className="text-3xl font-black font-mono text-amber-600 dark:text-amber-400">
                ${hourlyRate.toFixed(2)}
                <span className="text-sm font-normal text-neutral-500"> / hr</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500 block">Day Rate (8h)</span>
                <span className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                  ${dayRate.toFixed(0)}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500 block">Monthly Target Gross</span>
                <span className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                  ${monthlyGross.toFixed(0)}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-neutral-500 font-mono space-y-1 pt-1">
              <div>• {workingWeeks} working weeks / year</div>
              <div>• {totalAnnualBillableHours} total billable client hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
