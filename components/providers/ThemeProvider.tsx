'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system' | 'matrix';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark' | 'matrix';
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to dark as requested for the Obsidian / Blue / Purple developer identity
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [systemIsDark, setSystemIsDark] = useState(true);

  useEffect(() => {
    // Read from localStorage on mount
    const saved = localStorage.getItem('techusar-theme') as ThemeMode | null;
    if (saved && (saved === 'light' || saved === 'dark' || saved === 'system' || saved === 'matrix')) {
      queueMicrotask(() => setThemeState(saved));
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };
    queueMicrotask(() => setSystemIsDark(mql.matches));
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const resolvedTheme: 'light' | 'dark' | 'matrix' =
    theme === 'system' ? (systemIsDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'matrix') {
      root.classList.add('dark', 'matrix');
      root.setAttribute('data-theme', 'matrix');
    } else if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('matrix');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark', 'matrix');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('techusar-theme', theme);
  }, [theme, resolvedTheme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
