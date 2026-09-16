import React from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { Mail, Clock, ShieldCheck, MapPin, Github, Twitter, Linkedin, Dribbble, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Hire — Custom AI Bots, Web Apps & Design | TechUsar',
  description:
    'Initiate a project consultation, commission custom AI agents and automation bots (WhatsApp, Telegram), or hire Hafiz Muhammad Usman for full-stack Next.js web development.',
  keywords: [
    'Contact Hafiz Muhammad Usman',
    'Hire bot developer Pakistan',
    'Hire full stack developer Karachi',
    'Custom AI agent pricing',
    'TechUsar WhatsApp contact',
  ],
  alternates: {
    canonical: 'https://techusar.com/contact',
  },
  openGraph: {
    title: 'Contact & Hire Hafiz Muhammad Usman — TechUsar',
    description:
      'Available for custom AI agents, automated bots, full-stack software contracts, and design systems.',
    url: 'https://techusar.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-mono border border-emerald-200/60 dark:border-emerald-800/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for selected projects Q2/Q3</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Have a project in mind?
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Whether you need a bespoke brand identity, an ambitious web platform built from scratch, or a tailored commercial theme system, let&apos;s build something extraordinary together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Container */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Channels & Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct WhatsApp & Phone Card */}
          <div className="p-6 rounded-2xl border border-emerald-200/90 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <span className="text-lg">💬</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                Fastest Response
              </span>
            </div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Direct WhatsApp &amp; Call</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Message or call directly for immediate project discussion and rapid quotes:
            </p>
            <div className="space-y-1.5 pt-1">
              <a
                href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <span>WhatsApp: 0331-8917330</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:03318917330"
                className="block text-center text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 py-1 transition-colors"
              >
                Call: +92 331 8917330
              </a>
            </div>
          </div>

          {/* Direct Email Card */}
          <div className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/60 dark:bg-neutral-900/60 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Direct Email Correspondence</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Prefer sending your formal brief, RFP, or system specifications directly?
            </p>
            <a
              href="mailto:techusar17@gmail.com"
              className="inline-block text-xs font-mono font-bold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              techusar17@gmail.com
            </a>
          </div>

          {/* Response Time & Guarantees */}
          <div className="space-y-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Response SLA:</span>{' '}
                Guaranteed personal response within 24 to 48 business hours.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Confidentiality:</span> Mutual
                NDAs welcomed prior to sharing proprietary product documentation.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Timezone:</span> Distributed
                globally; overlaps with North America (EST/PST) and Europe (CET).
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
              NETWORK CHANNELS
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <span>X / Twitter</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>

              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <span>Dribbble</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
