'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Code2, Palette, ShoppingBag, Layers, User } from 'lucide-react';

export type ConsoleMode = 'dev' | 'design' | 'themes' | 'work' | 'about';

interface CreativeConsoleProps {
  activeMode?: ConsoleMode;
  onModeChange?: (mode: ConsoleMode) => void;
  className?: string;
}

export function CreativeConsole({ activeMode, onModeChange, className = '' }: CreativeConsoleProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine active item based on pathname if not explicitly controlled
  const getActiveState = (): ConsoleMode => {
    if (activeMode) return activeMode;
    if (pathname.startsWith('/themes')) return 'themes';
    if (pathname.startsWith('/design')) return 'design';
    if (pathname.startsWith('/work')) return 'work';
    if (pathname.startsWith('/about') || pathname.startsWith('/cv')) return 'about';
    return 'dev';
  };

  const current = getActiveState();

  const modes: { id: ConsoleMode; label: string; route: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dev', label: 'DEV', route: '/#showcase', icon: Code2 },
    { id: 'design', label: 'DESIGN', route: '/design', icon: Palette },
    { id: 'themes', label: 'THEMES', route: '/themes', icon: ShoppingBag },
    { id: 'work', label: 'WORK', route: '/work', icon: Layers },
    { id: 'about', label: 'ABOUT', route: '/about', icon: User },
  ];

  const handleModeClick = (mode: ConsoleMode, route: string) => {
    if (onModeChange) {
      onModeChange(mode);
    } else {
      router.push(route);
    }
  };

  return (
    <nav
      id="techusar-creative-console"
      aria-label="Creative Console Navigation"
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 print:hidden ${className}`}
    >
      <div className="relative flex items-center gap-1 px-2 py-1.5 rounded-full border border-neutral-200/90 dark:border-neutral-800/90 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/30 transition-all duration-300 hover:shadow-xl">
        {/* Subtle Indicator Label */}
        <span className="hidden sm:inline-block pl-2 pr-1 text-[9px] uppercase tracking-widest font-mono text-neutral-400 dark:text-neutral-500 select-none">
          CONSOLE
        </span>
        <div className="hidden sm:block w-px h-3 bg-neutral-200 dark:bg-neutral-800 mr-1" />

        {modes.map((item) => {
          const isActive = current === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`console-btn-${item.id}`}
              type="button"
              onClick={() => handleModeClick(item.id, item.route)}
              className={`relative flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 select-none ${
                isActive
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
              }`}
              title={`Switch to ${item.label} mode`}
            >
              <Icon className={`w-3 h-3 ${isActive ? 'text-blue-400 dark:text-blue-600' : 'text-neutral-400 dark:text-neutral-500'}`} />
              <span>{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-blue-500 absolute -bottom-0.5 left-1/2 -translate-x-1/2" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
