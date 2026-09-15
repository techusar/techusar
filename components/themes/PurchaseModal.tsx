'use client';

import React, { useState } from 'react';
import { Theme } from '@/types';
import { X, Check, Download, ShieldCheck, FileCode, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PurchaseModalProps {
  theme: Theme | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PurchaseModal({ theme, isOpen, onClose }: PurchaseModalProps) {
  const [licenseType, setLicenseType] = useState<'standard' | 'extended'>('standard');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!isOpen || !theme) return null;

  const price = licenseType === 'extended' ? theme.price * 2.5 : theme.price;

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: email.split('@')[0] || 'Template User',
          email,
          formType: theme.isFree ? 'template-download' : 'template-purchase',
          projectType: `Template: ${theme.name}`,
          budget: theme.isFree ? '$0 (Free MIT Starter)' : `$${Math.round(price)} USD (${licenseType})`,
          message: `User requisitioned ${theme.isFree ? 'Free Starter ZIP package' : `${licenseType} commercial license`} for ${theme.name}.`,
          sourcePage: `/templates/${theme.slug}`,
        }),
      });
    } catch {
      // Non-blocking
    }

    setTimeout(() => {
      setStatus('success');
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch {
        // silent fallback
      }
    }, 400);
  };

  return (
    <div
      id="purchase-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/85 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="purchase-modal"
        className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-900 dark:text-neutral-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="inline-block text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {theme.isFree ? 'FREE DOWNLOAD' : 'COMMERCIAL LICENSE'}
            </div>
            <h3 className="text-xl font-bold tracking-tight">{theme.name}</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Production source code package with Next.js 15 & Tailwind CSS
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold">Download Package Prepared</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                {theme.isFree
                  ? `Your free license for ${theme.name} is ready. A backup bundle link was generated.`
                  : `Your commercial license requisition for ${theme.name} has been initiated.`}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 text-left font-mono text-xs space-y-1">
              <div className="text-neutral-500 text-[10px]">PACKAGE CONTENTS:</div>
              <div className="text-neutral-800 dark:text-neutral-200">
                📦 {theme.slug}-v{theme.version}.zip (2.4 MB)
              </div>
              <div className="text-[11px] text-neutral-500">
                Includes: /app, /components, /lib, tailwind config, README setup guide
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <a
                href={theme.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 transition-colors"
              >
                Open Demo Repository
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAction} className="mt-5 space-y-5">
            {/* If Premium: Select License Tier */}
            {!theme.isFree && (
              <div className="space-y-2">
                <label className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400">
                  SELECT LICENSE TIER
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLicenseType('standard')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      licenseType === 'standard'
                        ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800/80'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-semibold">Standard License</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Single Project / Client</div>
                    <div className="text-sm font-bold mt-2 font-mono">${theme.price} USD</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLicenseType('extended')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      licenseType === 'extended'
                        ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800/80'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-semibold">Extended Commercial</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Unlimited Client Sites & SaaS</div>
                    <div className="text-sm font-bold mt-2 font-mono">${Math.round(price)} USD</div>
                  </button>
                </div>
              </div>
            )}

            {/* What's included checklist */}
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800 text-xs space-y-2">
              <div className="font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Instant Developer Delivery</span>
              </div>
              <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-500" /> Complete source code (Next.js 15, TypeScript, Tailwind)
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-500" /> Free lifetime template version updates
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-500" /> Developer documentation & quickstart video
                </li>
              </ul>
            </div>

            {/* Email input */}
            <div className="space-y-1.5">
              <label htmlFor="purchase-email" className="block text-xs font-mono text-neutral-600 dark:text-neutral-400">
                DELIVERY EMAIL ADDRESS
              </label>
              <input
                id="purchase-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@studio.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <span>Generating secure bundle...</span>
              ) : theme.isFree ? (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Free Starter (.ZIP)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Proceed to License Requisition — ${Math.round(price)}</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-neutral-500 dark:text-neutral-400">
              Clean architecture: Production builds connect to Stripe / LemonSqueezy webhooks.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
