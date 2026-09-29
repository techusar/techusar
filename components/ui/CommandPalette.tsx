'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Command, ArrowRight, Layers, Layout, Palette, User, FileText, Mail, X, Code, Sparkles } from 'lucide-react';
import { projects } from '@/data/projects';
import { themes } from '@/data/themes';
import { designProjects } from '@/data/design-projects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setQuery('');
        setSelectedIndex(0);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Static site pages
  const staticPages = [
    { title: 'Home', subtitle: 'TechUsar Main Ecosystem', href: '/', icon: Layout, category: 'Pages' },
    { title: 'TechTools (tools.techusar.com)', subtitle: 'Live developer & accounting utilities suite', href: 'https://tools.techusar.com', icon: Code, category: 'Ecosystem' },
    { title: 'Templates (templates.techusar.com)', subtitle: 'Production Next.js 15 & Tailwind templates', href: 'https://templates.techusar.com', icon: Layout, category: 'Ecosystem' },
    { title: 'Portfolio (portfolio.techusar.com)', subtitle: 'Dedicated enterprise showcase subdomain', href: 'https://portfolio.techusar.com', icon: Layers, category: 'Ecosystem' },
    { title: 'Free Tools Overview', subtitle: 'Productivity suite for accountants & developers', href: '/tools', icon: Code, category: 'TechTools' },
    { title: 'Invoice & Receipt Generator', subtitle: 'Calculate taxes, generate PDF invoices', href: '/tools', icon: FileText, category: 'TechTools' },
    { title: 'Profit Margin & Markup Calculator', subtitle: 'Gross margin, markup % and net profit', href: '/tools', icon: Sparkles, category: 'TechTools' },
    { title: 'Loan EMI Calculator', subtitle: 'Monthly payments and compound interest schedule', href: '/tools', icon: Sparkles, category: 'TechTools' },
    { title: 'JSON Formatter & Validator', subtitle: 'Prettify, minify, and validate JSON payloads', href: '/tools', icon: Code, category: 'TechTools' },
    { title: 'AI Bot Development', subtitle: 'WhatsApp, Telegram & custom AI customer support agents', href: '/ai-bot-development', icon: Sparkles, category: 'Services' },
    { title: 'Services & Architecture', subtitle: 'Full-stack development, brand identity & AI bots', href: '/services', icon: Code, category: 'Services' },
    { title: 'Graphic Design', subtitle: 'Brand identities, vector systems & logo design', href: '/graphic-design', icon: Palette, category: 'Services' },
    { title: 'Web Development', subtitle: 'Next.js 15, PostgreSQL & TypeScript platforms', href: '/web-development', icon: Code, category: 'Services' },
    { title: 'UI/UX Design', subtitle: 'Figma wireframes, design systems & responsive UX', href: '/ui-ux-design', icon: Layout, category: 'Services' },
    { title: 'Technical Blog', subtitle: 'Engineering articles, bot guides & tutorials', href: '/blog', icon: FileText, category: 'Pages' },
    { title: 'About TechUsar', subtitle: 'Background, dual-discipline philosophy & skills', href: '/about', icon: User, category: 'Pages' },
    { title: 'Contact & Hire', subtitle: 'Start a conversation for project availability', href: '/contact', icon: Mail, category: 'Pages' },
  ];

  const projectResults = projects.map((p) => ({
    title: p.title,
    subtitle: `${p.category} — ${p.technologies.slice(0, 3).join(', ')}`,
    href: `/work/${p.slug}`,
    icon: Layers,
    category: 'Engineering & UI Projects',
  }));

  const themeResults = themes.map((t) => ({
    title: t.name,
    subtitle: `${t.category} — ${t.isFree ? 'Free Download' : `$${t.price} USD`}`,
    href: `/themes/${t.slug}`,
    icon: Layout,
    category: 'Themes Marketplace',
  }));

  const designResults = designProjects.map((d) => ({
    title: d.title,
    subtitle: `${d.category} — ${d.client}`,
    href: `/design/${d.slug}`,
    icon: Palette,
    category: 'Graphic Design & Branding',
  }));

  const allItems = [...staticPages, ...projectResults, ...themeResults, ...designResults];

  const filteredItems = query.trim() === ''
    ? staticPages
    : allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].href);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="command-palette-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="command-palette-modal"
        className="w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800 gap-3">
          <Search className="w-4 h-4 text-neutral-600 dark:text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            id="command-palette-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, themes, design work, pages..."
            className="w-full bg-transparent border-none text-sm placeholder:text-neutral-600 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-0 text-neutral-900 dark:text-neutral-100"
            aria-label="Search command palette"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 shrink-0">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div
          id="command-palette-results"
          className="max-h-[380px] overflow-y-auto p-2 divide-y divide-transparent space-y-0.5"
          role="listbox"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-600 dark:text-neutral-400">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={`${item.category}-${item.title}-${idx}`}
                  id={`command-item-${idx}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => handleSelect(item.href)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-950 dark:text-white'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`p-1.5 rounded-md ${
                        isSelected
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{item.title}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-neutral-600 dark:text-neutral-400 font-mono hidden sm:inline">
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'translate-x-0.5 opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-900/60 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="w-3 h-3" />
            <span>TechUsar OS v2.5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
