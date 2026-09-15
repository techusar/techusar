'use client';

import React, { useState, useEffect } from 'react';
import { DesignProject } from '@/types';
import {
  Palette,
  Plus,
  Edit2,
  Trash2,
  Search,
  RefreshCw,
  X,
  Layers,
  Sparkles,
  ExternalLink,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import Image from 'next/image';

export function DesignsManager() {
  const [designs, setDesigns] = useState<DesignProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingDesign, setEditingDesign] = useState<DesignProject | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Brand Identity' as any,
    client: '',
    year: '2026',
    cover:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    galleryText:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop\nhttps://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
    description: '',
    brief: '',
    concept: '',
    tools: 'Adobe Illustrator, Figma, Photoshop',
    deliverablesText: 'Brand Guidelines Manual\nVector Logo Pack\nSocial Media Kit',
    highlightsText: 'Bespoke custom typography\nFull vector scalability',
  });

  const fetchDesigns = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/designs', { cache: 'no-store' });
      const data = await res.json();
      if (data.success && Array.isArray(data.designs)) {
        setDesigns(data.designs);
      }
    } catch (err) {
      console.error('Failed to fetch designs:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadInitial() {
      try {
        const res = await fetch('/api/admin/designs', { cache: 'no-store' });
        const data = await res.json();
        if (!ignore && data.success && Array.isArray(data.designs)) {
          setDesigns(data.designs);
        }
      } catch (err) {
        console.error('Failed to load initial designs:', err);
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
    setEditingDesign(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Brand Identity',
      client: 'Acme Studio',
      year: new Date().getFullYear().toString(),
      cover:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      galleryText:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      description: 'A comprehensive brand identity and graphic design system.',
      brief: 'Develop a bold, memorable visual presence.',
      concept: 'Geometric Swiss typography combined with modern minimalist grid systems.',
      tools: 'Adobe Illustrator, Figma, Photoshop',
      deliverablesText: 'Brand Guidelines Manual\nVector Logo Pack\nSocial Media Kit',
      highlightsText: 'Custom vector iconography\nHigh contrast visual discipline',
    });
    setModalOpen(true);
  };

  const openEditModal = (design: DesignProject) => {
    setEditingDesign(design);
    setFormData({
      title: design.title,
      slug: design.slug,
      category: design.category,
      client: design.client,
      year: design.year,
      cover: design.cover,
      galleryText: design.gallery.join('\n'),
      description: design.description,
      brief: design.brief,
      concept: design.concept,
      tools: design.tools.join(', '),
      deliverablesText: design.deliverables.join('\n'),
      highlightsText: design.highlights.join('\n'),
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        id: editingDesign ? editingDesign.id : undefined,
        slug: formData.slug || undefined,
        title: formData.title,
        category: formData.category,
        client: formData.client,
        year: formData.year,
        cover: formData.cover,
        gallery: formData.galleryText.split('\n').map((s) => s.trim()).filter(Boolean),
        description: formData.description,
        brief: formData.brief,
        concept: formData.concept,
        tools: formData.tools.split(',').map((s) => s.trim()).filter(Boolean),
        deliverables: formData.deliverablesText.split('\n').filter(Boolean),
        highlights: formData.highlightsText.split('\n').filter(Boolean),
      };

      const res = await fetch('/api/admin/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setModalOpen(false);
        await fetchDesigns();
      } else {
        alert('Failed to save design project');
      }
    } catch (err) {
      console.error('Error saving design:', err);
      alert('Error saving design');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/designs?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchDesigns();
      } else {
        alert('Failed to delete design project');
      }
    } catch (err) {
      console.error('Error deleting design:', err);
    }
  };

  const filteredDesigns = designs.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'all' || d.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-neutral-950 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Graphic Design Showcase &amp; Identity Portfolio Manager
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            Manage vector logos, typography systems, brand guidelines, and print artifacts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={fetchDesigns}
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
            Add Design Project
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search graphic design projects by title, client, or tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Brand Identity">Brand Identity</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Visual System">Visual System</option>
          <option value="Logo Exploration">Logo Exploration</option>
          <option value="Editorial & Print">Editorial &amp; Print</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="p-12 text-center text-neutral-500 text-xs">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
          Loading graphic design projects...
        </div>
      ) : filteredDesigns.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <Palette className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-neutral-950 dark:text-white">No design projects found</p>
          <p className="text-xs text-neutral-500 mt-1">Add a new graphic design showcase to populate this section.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredDesigns.map((design) => (
            <div
              key={design.id}
              className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs hover:border-blue-500/40 transition-all group"
            >
              <div className="relative aspect-16/10 w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <Image
                  src={design.cover}
                  alt={design.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-white font-medium">
                    {design.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full bg-neutral-900/80 backdrop-blur-md text-[11px] font-mono text-neutral-300">
                    {design.year}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-sm text-neutral-950 dark:text-white line-clamp-1">
                    {design.title}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-1">{design.client}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1.5">
                    {design.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {design.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono text-neutral-600 dark:text-neutral-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                  <a
                    href={`/design/${design.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" /> View Page
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEditModal(design)}
                      className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title="Edit project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(design.id, design.title)}
                      className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete project"
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

      {/* Modal Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 my-8 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-blue-600" />
                {editingDesign ? `Edit Design: ${editingDesign.title}` : 'Add Design Showcase Project'}
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
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                    placeholder="e.g. Lumina Nordic Brand Identity"
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
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                    placeholder="e.g. lumina-nordic-brand-identity"
                  />
                </div>
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
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Visual System">Visual System</option>
                    <option value="Logo Exploration">Logo Exploration</option>
                    <option value="Editorial & Print">Editorial &amp; Print</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.cover}
                  onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Gallery Image URLs (1 per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.galleryText}
                  onChange={(e) => setFormData({ ...formData, galleryText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Design Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Tools Used (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tools}
                  onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Deliverables (1 per line)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.deliverablesText}
                    onChange={(e) => setFormData({ ...formData, deliverablesText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Highlights (1 per line)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.highlightsText}
                    onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white font-mono"
                  />
                </div>
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
                  {saving ? 'Saving...' : editingDesign ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
