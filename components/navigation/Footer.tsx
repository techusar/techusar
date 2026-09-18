'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Circle } from 'lucide-react';
import { useSiteSettings } from '@/components/providers/SiteDataProvider';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings } = useSiteSettings();

  const brandName = settings.brandName || 'TechUsar';
  const email = settings.email || 'techusar17@gmail.com';
  const displayPhone = settings.displayPhone || '0331-8917330';
  const whatsappUrl = settings.whatsapp || 'https://wa.me/923318917330';
  const githubUrl = settings.githubUrl || 'https://github.com/techusar';
  const linkedinUrl = settings.linkedinUrl || 'https://www.linkedin.com/in/hafiz-muhammad-usman-514888397/';
  const twitterUrl = settings.twitterUrl || 'https://x.com/techusar';

  return (
    <footer
      id="techusar-footer"
      className="border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/60 pt-16 pb-24 sm:pb-20 no-print"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Logo />
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              {settings.tagline ||
                'Where design meets development. Graphic designer and full-stack developer crafting refined digital products, design systems, and commercial web themes.'}
            </p>

            {/* Availability Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs">
              <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" />
              <span>{settings.heroBadge || 'Available for selected projects & consulting'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-3">
                Ecosystem &amp; Templates
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://tamplates.techusar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                  >
                    <span>tamplates.techusar.com</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://tools.techusar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <span>tools.techusar.com</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <Link href="/templates" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                    Next.js Templates Hub
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                    Free Developer &amp; Invoicing Tools
                  </Link>
                </li>
                <li>
                  <Link href="/ai-bot-development" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                    AI Bot Development (WhatsApp/Telegram)
                  </Link>
                </li>
                <li>
                  <Link href="/graphic-design" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                    Graphic Design &amp; Branding
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-3">
                Portfolio &amp; Profile
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/work" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                    Selected Client Work
                  </Link>
                </li>
                <li>
                  <Link href="/cv" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors font-medium">
                    Hafiz Usman CV &amp; Resume
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                    About Hafiz Usman (5+ Yrs Exp)
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                    Services &amp; Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                    Technical Blog &amp; Guides
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                    Contact &amp; Custom Inquiry
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social & Contact Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-3">
              Connect
            </h4>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-[#0A66C2] dark:group-hover:text-[#0A66C2]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group"
              >
                <Twitter className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-sky-500 dark:group-hover:text-sky-400" />
                <span>Twitter / X</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group"
              >
                <Github className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="footer_whatsapp"
                className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>WhatsApp: {displayPhone}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={`mailto:${email}`}
                data-track="footer_email"
                className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                <span>{email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600 dark:text-neutral-400">
          <p>© {currentYear} {brandName}. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Type &ldquo;techusar&rdquo; anywhere for console</span>
            <span>•</span>
            <span>Next.js 15 × Tailwind v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
