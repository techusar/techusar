'use client';

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Sun, Moon, Monitor } from 'lucide-react';

interface ThemeSwitcherProps {
  className?: string;
  forceFull?: boolean;
}

export function ThemeSwitcher({ className = '', forceFull = false }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  if (forceFull) {
    return (
      <div
        id="theme-switcher-full"
        className={`inline-flex items-center p-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-xs ${className}`}
        role="radiogroup"
        aria-label="Theme selector"
      >
        <button
          id="theme-btn-light"
          type="button"
          role="radio"
          aria-checked={theme === 'light'}
          onClick={() => setTheme('light')}
          className={`px-2.5 py-1 rounded-full transition-all duration-150 text-xs flex items-center gap-1.5 ${
            theme === 'light'
              ? 'bg-white text-neutral-950 shadow-xs font-semibold'
              : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
          }`}
          title="Light Mode"
          aria-label="Switch to light mode"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Light</span>
        </button>

        <button
          id="theme-btn-dark"
          type="button"
          role="radio"
          aria-checked={theme === 'dark'}
          onClick={() => setTheme('dark')}
          className={`px-2.5 py-1 rounded-full transition-all duration-150 text-xs flex items-center gap-1.5 ${
            theme === 'dark'
              ? 'bg-neutral-950 text-white shadow-xs font-semibold'
              : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
          }`}
          title="Dark Mode"
          aria-label="Switch to dark mode"
        >
          <Moon className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Dark</span>
        </button>

        <button
          id="theme-btn-system"
          type="button"
          role="radio"
          aria-checked={theme === 'system'}
          onClick={() => setTheme('system')}
          className={`px-2.5 py-1 rounded-full transition-all duration-150 text-xs flex items-center gap-1.5 ${
            theme === 'system'
              ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs font-semibold'
              : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
          }`}
          title="System Preference"
          aria-label="Switch to system theme"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Auto</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      id="theme-quick-toggle"
      onClick={toggleTheme}
      className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-100/80 dark:bg-neutral-900/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-800/80 transition-all duration-150 active:scale-95 shrink-0 ${className}`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-neutral-700 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
