'use client';

import React, { useState } from 'react';
import { Landmark, Calendar, DollarSign, PieChart } from 'lucide-react';

export function LoanEmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(3);

  // EMI Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const principal = Number(loanAmount) || 0;
  const monthlyRate = (Number(interestRate) || 0) / 12 / 100;
  const numberOfMonths = (Number(tenureYears) || 1) * 12;

  let emi = 0;
  if (monthlyRate > 0 && numberOfMonths > 0) {
    emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  } else if (numberOfMonths > 0) {
    emi = principal / numberOfMonths;
  }

  const totalPayment = emi * numberOfMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  return (
    <div className="space-y-6 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-xs">
      <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
          <Landmark className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            Loan EMI &amp; Compound Interest Calculator
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            For business loans, equipment leasing, mortgages, and client financing plans.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sliders & Inputs */}
        <div className="space-y-5 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between font-medium text-neutral-700 dark:text-neutral-300">
              <span>Loan / Principal Amount</span>
              <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white">
                ${loanAmount.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="500000"
              step="1000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-medium text-neutral-700 dark:text-neutral-300">
              <span>Annual Interest Rate (%)</span>
              <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-medium text-neutral-700 dark:text-neutral-300">
              <span>Loan Tenure</span>
              <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 rounded-2xl border border-indigo-500/30 bg-indigo-50/20 dark:bg-indigo-950/10 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Monthly Repayment Summary
            </span>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-indigo-200 dark:border-indigo-900/40">
              <span className="text-xs text-neutral-500 block">Monthly Installment (EMI)</span>
              <span className="text-3xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                ${emi.toFixed(2)}
              </span>
              <span className="text-[11px] text-neutral-400 font-mono block mt-1">
                Payable every month for {numberOfMonths} months
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500 block">Total Interest</span>
                <span className="text-lg font-bold font-mono text-rose-500">
                  ${totalInterest.toFixed(2)}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500 block">Total Repayment</span>
                <span className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                  ${totalPayment.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
