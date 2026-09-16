'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types';
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle2,
  RefreshCw,
  X,
  Sparkles,
  Tag,
  DollarSign,
  Layers,
  Code2,
  Eye,
} from 'lucide-react';
import Image from 'next/image';

export function ThemesManager() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    category: 'SaaS' as any,
    price: 49,
    isFree: false,
    isFeatured: true,
    isPopular: false,
    technology: 'Next.js 15, TypeScript, Tailwind CSS, Motion',
    previewImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    desktopScreenshot:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    tabletScreenshot:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    mobileScreenshot:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    demoUrl: 'https://nexus.techusar.com',
    purchaseUrl: '',
    featuresText: 'Engineered with Next.js 15 App Router\nInteractive tiered pricing matrix\nDark & Light mode support',
    sectionsText: 'Hero with live preview\nBento grid features\nPricing table\nFAQ accordion',
    version: '1.0.0',
    downloadsCount: 150,
    rating: 4.95,
  });

  const fetchThemes = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/themes', { cache: 'no-store' });
      const data = await res.json();
      if (data.success && Array.isArray(data.themes)) {
        setThemes(data.themes);
      }
    } catch (err) {
      console.error('Failed to fetch themes:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadInitial() {
      try {
        const res = await fetch('/api/admin/themes', { cache: 'no-store' });
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.themes)) {
          setThemes(data.themes);
        }
      } catch (err) {
        console.error('Failed to load initial themes:', err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    loadInitial();
    return () => {
      ignore = true;
    };
  }, []);

  const openAddModal = () => {
    setEditingTheme(null);
    setFormData({
      name: '',
      slug: '',
      tagline: '',
      description: '',
      category: 'SaaS',
      price: 49,
      isFree: false,
      isFeatured: true,
      isPopular: false,
      technology: 'Next.js 15, TypeScript, Tailwind CSS, Motion',
      previewImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      desktopScreenshot:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
      tabletScreenshot:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      mobileScreenshot:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      demoUrl: 'https://nexus.techusar.com',
      purchaseUrl: '',
      featuresText: 'Engineered with Next.js 15 App Router\nInteractive tiered pricing matrix\nDark & Light mode support',
      sectionsText: 'Hero with live preview\nBento grid features\nPricing table\nFAQ accordion',
      version: '1.0.0',
      downloadsCount: 150,
      rating: 4.95,
    });
    setModalOpen(true);
  };

  const openEditModal = (theme: Theme) => {
    setEditingTheme(theme);
    setFormData({
      name: theme.name,
      slug: theme.slug,
      tagline: theme.tagline,
      description: theme.description,
      category: theme.category,
      price: theme.price,
      isFree: theme.isFree,
      isFeatured: theme.isFeatured,
      isPopular: theme.isPopular,
      technology: theme.technology.join(', '),
      previewImage: theme.previewImage,
      desktopScreenshot: theme.screenshots.desktop,
      tabletScreenshot: theme.screenshots.tablet,
      mobileScreenshot: theme.screenshots.mobile,
      demoUrl: theme.demoUrl,
      purchaseUrl: theme.purchaseUrl || '',
      featuresText: theme.features.join('\n'),
      sectionsText: theme.sectionsIncluded.join('\n'),
      version: theme.version,
      downloadsCount: theme.downloadsCount,
      rating: theme.rating,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        id: editingTheme ? editingTheme.id : undefined,
        slug: formData.slug || undefined,
        name: formData.name,
        tagline: formData.tagline,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        isFree: formData.isFree,
        isFeatured: formData.isFeatured,
        isPopular: formData.isPopular,
        technology: formData.technology.split(',').map((s) => s.trim()),
        previewImage: formData.previewImage,
        screenshots: {
          desktop: formData.desktopScreenshot || formData.previewImage,
          tablet: formData.tabletScreenshot || formData.previewImage,
          mobile: formData.mobileScreenshot || formData.previewImage,
        },
        demoUrl: formData.demoUrl,
        purchaseUrl: formData.purchaseUrl,
        features: formData.featuresText.split('\n').filter(Boolean),
        sectionsIncluded: formData.sectionsText.split('\n').filter(Boolean),
        version: formData.version,
        downloadsCount: Number(formData.downloadsCount),
        rating: Number(formData.rating),
      };

      const res = await fetch('/api/admin/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setModalOpen(false);
        await fetchThemes();
      } else {
        alert('Failed to save theme');
      }
    } catch (err) {
      console.error('Error saving theme:', err);
      alert('Error saving theme');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/themes?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchThemes();
      } else {
        alert('Failed to delete theme');
      }
    } catch (err) {
      console.error('Error deleting theme:', err);
    }
  };

  const filteredThemes = themes.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'all' || t.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-neutral-950 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Themes &amp; Templates Marketplace Manager
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            Manage commercial and free Next.js / Tailwind templates, pricing, features, and screenshots.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={fetchThemes}
            disabled={refreshing}
            className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Theme
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search themes by title, category, or tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="SaaS">SaaS</option>
            <option value="Portfolio">Portfolio</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Dashboard">Dashboard</option>
            <option value="Agency">Agency</option>
            <option value="Startup">Startup</option>
          </select>
        </div>
      </div>

      {/* Themes Grid */}
      {loading ? (
        <div className="p-12 text-center text-neutral-500 text-xs">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
          Loading templates &amp; themes database...
        </div>
      ) : filteredThemes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <ShoppingBag className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-neutral-900 dark:text-white">No themes found</p>
          <p className="text-xs text-neutral-500 mt-1">Try adjusting your search criteria or add a new theme.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredThemes.map((theme) => (
            <div
              key={theme.id}
              className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs hover:border-blue-500/40 transition-all group"
            >
              {/* Preview image */}
              <div className="relative aspect-16/10 w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <Image
                  src={theme.previewImage}
                  alt={theme.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-white font-medium">
                    {theme.category}
                  </span>
                  {theme.isFeatured && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-600/90 text-[11px] font-mono text-white font-medium flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 text-xs font-bold text-white shadow-xs">
                    {theme.isFree ? 'FREE' : `$${theme.price}`}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-sm text-neutral-950 dark:text-white line-clamp-1">
                    {theme.name}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1">
                    {theme.tagline || theme.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {theme.technology.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono text-neutral-600 dark:text-neutral-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {theme.technology.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono text-neutral-500">
                      +{theme.technology.length - 3}
                    </span>
                  )}
                </div>

                {/* Card actions */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                  <a
                    href={theme.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" /> Live Demo
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEditModal(theme)}
                      className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title="Edit theme"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(theme.id, theme.name)}
                      className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete theme"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 my-8 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
                {editingTheme ? `Edit Theme: ${editingTheme.name}` : 'Add New Theme / Template'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Theme Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Apex SaaS Dashboard"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Slug (Auto-generated if blank)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. apex-saas-dashboard"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="The modern conversion template for enterprise apps."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                  >
                    <option value="SaaS">SaaS</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="Agency">Agency</option>
                    <option value="Startup">Startup</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-4 pt-5">
                  <label className="flex items-center gap-1.5 text-xs text-neutral-800 dark:text-neutral-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFree}
                      onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    Is Free
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-neutral-800 dark:text-neutral-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    Featured
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Preview Image URL (Cover)
                </label>
                <input
                  type="url"
                  value={formData.previewImage}
                  onChange={(e) => setFormData({ ...formData, previewImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technology}
                    onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Features (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Sections Included (1 per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.sectionsText}
                  onChange={(e) => setFormData({ ...formData, sectionsText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  {saving ? 'Saving...' : editingTheme ? 'Save Changes' : 'Create Theme'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
