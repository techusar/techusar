'use client';

import React, { useState } from 'react';
import { ThemeCard } from '@/components/themes/ThemeCard';
import { ThemeLivePreviewModal } from '@/components/themes/ThemeLivePreviewModal';
import { PurchaseModal } from '@/components/themes/PurchaseModal';
import { Theme, ThemeCategory, ThemeFilter } from '@/types';
import { ShoppingBag, Search, Sparkles, Filter, X } from 'lucide-react';

interface ThemesClientProps {
  initialThemes: Theme[];
}

export function ThemesClient({ initialThemes }: ThemesClientProps) {
  const [activeCategory, setActiveCategory] = useState<ThemeCategory>('All');
  const [activeFilter, setActiveFilter] = useState<ThemeFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedPreviewTheme, setSelectedPreviewTheme] = useState<Theme | null>(null);
  const [selectedPurchaseTheme, setSelectedPurchaseTheme] = useState<Theme | null>(null);

  const categories: ThemeCategory[] = [
    'All',
    'SaaS',
    'Portfolio',
    'Landing Pages',
    'Dashboard',
    'E-commerce',
    'Agency',
    'Personal',
    'Startup',
  ];

  const filteredThemes = initialThemes.filter((theme) => {
    if (activeCategory !== 'All' && theme.category !== activeCategory) {
      return false;
    }
    if (activeFilter === 'Featured' && !theme.isFeatured) return false;
    if (activeFilter === 'Popular' && !theme.isPopular) return false;
    if (activeFilter === 'Free' && !theme.isFree) return false;
    if (activeFilter === 'Premium' && theme.isFree) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = theme.name.toLowerCase().includes(q);
      const matchDesc = theme.description.toLowerCase().includes(q);
      const matchTech = theme.technology.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTech) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search themes by title, framework, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 text-sm rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:outline-hidden focus:border-blue-500 text-neutral-900 dark:text-white placeholder:text-neutral-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(['All', 'Featured', 'Popular', 'Free', 'Premium'] as ThemeFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
              activeCategory === cat
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Themes Grid */}
      {filteredThemes.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
          <Sparkles className="w-8 h-8 mx-auto text-neutral-400" />
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No themes match your criteria</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try adjusting your search terms or resetting the active category filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setActiveFilter('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredThemes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              onPreview={(t) => setSelectedPreviewTheme(t)}
            />
          ))}
        </div>
      )}

      {/* Live Preview Modal */}
      <ThemeLivePreviewModal
        theme={selectedPreviewTheme}
        isOpen={!!selectedPreviewTheme}
        onClose={() => setSelectedPreviewTheme(null)}
        onPurchase={(t) => {
          setSelectedPreviewTheme(null);
          setSelectedPurchaseTheme(t);
        }}
      />

      {/* Purchase Modal */}
      <PurchaseModal
        theme={selectedPurchaseTheme}
        isOpen={!!selectedPurchaseTheme}
        onClose={() => setSelectedPurchaseTheme(null)}
      />
    </div>
  );
}
