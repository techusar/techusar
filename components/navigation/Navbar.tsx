'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { ThemeSwitcher } from './ThemeSwitcher';
import { CommandPalette } from '@/components/ui/CommandPalette';
import {
  Search,
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Layers,
  ShoppingBag,
  Wrench,
  FileText,
  Code2,
  Sparkles,
  Palette,
  BookOpen,
  User,
  Mail,
  MessageSquare,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }

  // Scroll detection for subtle backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Keyboard shortcut listeners (Cmd+K, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
        setMobileMenuOpen(false);
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMoreDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Outside click listener for the dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    if (moreDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreDropdownOpen]);

  // Primary desktop navigation tabs
  const primaryLinks: NavItem[] = [
    {
      label: 'Work',
      href: '/work',
      description: 'Selected client projects & open-source software',
      icon: Layers,
    },
    {
      label: 'Themes',
      href: '/themes',
      description: 'Production-ready web templates & components',
      icon: ShoppingBag,
    },
    {
      label: 'Tools',
      href: '/tools',
      description: 'Developer & accounting utilities suite',
      icon: Wrench,
    },
    {
      label: 'CV & Resume',
      href: '/cv',
      description: 'Interactive resume & multi-template PDF engine',
      icon: FileText,
    },
    {
      label: 'Services',
      href: '/services',
      description: 'Architectural consulting & full-stack development',
      icon: Code2,
    },
  ];

  // Secondary navigation links
  const secondaryLinks: NavItem[] = [
    {
      label: 'Playground',
      href: '/playground',
      description: 'Interactive HTML5 canvas & generative vector sandbox',
      icon: Sparkles,
    },
    {
      label: 'Design',
      href: '/design',
      description: 'Graphic design showcase, branding & visual systems',
      icon: Palette,
    },
    {
      label: 'Blog',
      href: '/blog',
      description: 'Technical articles, custom AI bot guides & tutorials',
      icon: BookOpen,
    },
    {
      label: 'Articles',
      href: '/articles',
      description: 'Technical deep-dives, design patterns & engineering notes',
      icon: BookOpen,
    },
    {
      label: 'About',
      href: '/about',
      description: 'Full stack biography, credentials & technical stack',
      icon: User,
    },
  ];

  const allDrawerLinks = [...primaryLinks, ...secondaryLinks];

  const isMoreActive = secondaryLinks.some(
    (link) => pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
  );

  return (
    <>
      <header
        id="techusar-main-header"
        className={`sticky top-0 z-40 w-full transition-all duration-200 no-print ${
          scrolled
            ? 'bg-white/90 dark:bg-[#050508]/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-xs'
            : 'bg-white/70 dark:bg-[#050508]/70 backdrop-blur-xs border-b border-neutral-200/50 dark:border-neutral-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left: Brand Identity */}
          <div className="flex items-center shrink-0">
            <Logo />
          </div>

          {/* Center: Desktop Navigation Bar */}
          <nav
            id="desktop-navigation"
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 rounded-full bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200/70 dark:border-neutral-800/70 backdrop-blur-md"
          >
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* "More" Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                id="nav-more-dropdown-btn"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                aria-expanded={moreDropdownOpen}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 flex items-center gap-1 whitespace-nowrap ${
                  isMoreActive || moreDropdownOpen
                    ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {moreDropdownOpen && (
                <div
                  id="nav-more-dropdown-panel"
                  className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-xl shadow-black/10 dark:shadow-black/40 p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
                >
                  <div className="space-y-1">
                    {secondaryLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.href || pathname.startsWith(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMoreDropdownOpen(false)}
                          className={`flex items-start gap-2.5 p-2 rounded-xl text-xs transition-colors ${
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:text-neutral-950 dark:hover:text-white'
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 mt-0.5 shrink-0">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-neutral-900 dark:text-white block">{link.label}</span>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                              {link.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Global Search Button */}
            <button
              id="global-search-trigger"
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="h-8.5 px-2.5 sm:px-3 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors text-xs shrink-0 flex items-center gap-2"
              aria-label="Open search"
              title="Quick Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline text-xs font-normal">Search</span>
              <kbd className="hidden sm:inline-flex items-center font-mono text-[10px] text-neutral-400 dark:text-neutral-500 bg-neutral-200/60 dark:bg-neutral-800/60 px-1 py-0.2 rounded border border-neutral-300/40 dark:border-neutral-700/40">
                ⌘K
              </kbd>
            </button>

            {/* Clean Theme Switcher Toggle */}
            <ThemeSwitcher />

            {/* WhatsApp Quick Chat Button */}
            <a
              href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20I%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              data-track="navbar_whatsapp"
              className="hidden md:inline-flex items-center gap-1.5 px-3 h-8.5 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shrink-0 whitespace-nowrap shadow-2xs"
              title="Chat on WhatsApp (03318917330)"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Hire Me CTA Button (Tablet & Desktop) */}
            <Link
              href="/contact"
              id="nav-contact-cta"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 h-8.5 rounded-full text-xs font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-150 shadow-xs active:scale-98 shrink-0 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </Link>

            {/* Mobile Menu Toggle (Visible on < lg: screens) */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8.5 h-8.5 rounded-full flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 transition-colors shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-red-500" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 top-16 bg-black/40 dark:bg-black/60 backdrop-blur-xs z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu-drawer"
            className="lg:hidden relative z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white/98 dark:bg-[#07070a]/98 backdrop-blur-2xl px-4 sm:px-6 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-xl"
          >
            {/* Quick Search Button in Drawer */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setCommandPaletteOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Search pages, tools, articles...</span>
              </div>
              <kbd className="font-mono text-[10px] bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>

            {/* Navigation Links Grid */}
            <div className="space-y-1">
              <div className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 px-1 py-0.5">
                Navigation
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {allDrawerLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl text-xs transition-colors ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-neutral-950 dark:text-white text-xs">{link.label}</div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                          {link.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-2 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-2.5">
              {/* WhatsApp Quick Chat for Mobile */}
              <a
                href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                data-track="mobile_drawer_whatsapp"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>Chat on WhatsApp (0331-8917330)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Prominent Hire Me CTA for Mobile */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm active:scale-98"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Start a Project · Hire Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* Theme Preference Row */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80">
                <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium px-1">Theme</span>
                <ThemeSwitcher forceFull />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </>
  );
}
