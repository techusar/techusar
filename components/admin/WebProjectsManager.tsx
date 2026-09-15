'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import {
  Code,
  Plus,
  RefreshCw,
  ExternalLink,
  Trash2,
  Edit2,
  Clock,
  CheckCircle2,
  FolderPlus,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Check,
  AlertCircle,
} from 'lucide-react';

interface WebProjectsManagerProps {
  onProjectsUpdated?: () => void;
}

export function WebProjectsManager({ onProjectsUpdated }: WebProjectsManagerProps) {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'live' | 'in_progress' | 'coming_soon'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    client: '',
    category: 'Web App' as Project['category'],
    year: new Date().getFullYear().toString(),
    role: 'Full-Stack Web Developer',
    shortDescription: '',
    description: '',
    technologies: 'Next.js 15, TypeScript, Tailwind CSS, PostgreSQL',
    cover: '',
    liveUrl: '',
    githubUrl: '',
    status: 'live' as 'live' | 'in_progress' | 'coming_soon',
    featured: false,
  });

  const fetchProjects = React.useCallback(async () => {
    try {
      const res = await fetch('/api/admin/projects', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setProjectsList(data.projects || []);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const loadProjects = async () => {
      try {
        const res = await fetch('/api/admin/projects', { cache: 'no-store' });
        if (res.ok && !ignore) {
          const data = await res.json();
          setProjectsList(data.projects || []);
        }
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };
    loadProjects();
    return () => {
      ignore = true;
    };
  }, []);

  const openNewModal = () => {
    setEditingProject(null);
    setForm({
      title: '',
      client: '',
      category: 'Web App',
      year: new Date().getFullYear().toString(),
      role: 'Full-Stack Web Developer',
      shortDescription: '',
      description: '',
      technologies: 'Next.js 15, TypeScript, Tailwind CSS, PostgreSQL',
      cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
      liveUrl: '',
      githubUrl: '',
      status: 'live',
      featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setForm({
      title: p.title,
      client: p.client,
      category: p.category,
      year: p.year,
      role: p.role,
      shortDescription: p.shortDescription,
      description: p.description,
      technologies: p.technologies.join(', '),
      cover: p.cover,
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      status: p.status || 'live',
      featured: p.featured,
    });
    setModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        id: editingProject ? editingProject.id : undefined,
        slug: editingProject ? editingProject.slug : undefined,
        technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
        isWebDev: true,
      };

      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setNotification({
          type: 'success',
          message: editingProject ? 'Project updated successfully!' : 'New Web Development project created!',
        });
        setModalOpen(false);
        await fetchProjects();
        if (onProjectsUpdated) onProjectsUpdated();
      } else {
        setNotification({ type: 'error', message: 'Failed to save project.' });
      }
    } catch (err) {
      console.error('Error saving project:', err);
      setNotification({ type: 'error', message: 'Error saving project.' });
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProjectsList((prev) => prev.filter((p) => p.id !== id));
        setNotification({ type: 'success', message: 'Project removed.' });
        if (onProjectsUpdated) onProjectsUpdated();
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateStatus = async (project: Project, newStatus: 'live' | 'in_progress' | 'coming_soon') => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...project,
          status: newStatus,
        }),
      });
      if (res.ok) {
        setProjectsList((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, status: newStatus } : p))
        );
        setNotification({
          type: 'success',
          message: `Updated status of "${project.title}" to ${newStatus}.`,
        });
      }
    } catch (err) {
      console.error('Status update error:', err);
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredProjects = projectsList.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {notification && (
        <div
          className={`p-4 rounded-xl border text-sm flex items-center gap-2 ${
            notification.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
          }`}
        >
          {notification.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold uppercase">
              <Code className="w-3.5 h-3.5" />
              <span>Web Development Portfolio</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Web Development Projects Manager
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl mt-0.5">
              Manage your web projects and screenshots. Projects with pending screenshots can be kept in &ldquo;Asset Pending&rdquo; state until you provide their images.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={fetchProjects}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={openNewModal}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Web Project</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
          <span className="text-xs font-mono text-neutral-500 mr-2">FILTER STATUS:</span>
          {(['all', 'live', 'in_progress', 'coming_soon'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                filter === st
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {st === 'all'
                ? `All (${projectsList.length})`
                : st === 'live'
                ? `Live (${projectsList.filter((p) => p.status === 'live').length})`
                : st === 'in_progress'
                ? `In Progress (${projectsList.filter((p) => p.status === 'in_progress').length})`
                : `Asset Pending (${projectsList.filter((p) => p.status === 'coming_soon').length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs font-mono text-neutral-500">
          Loading projects...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
          <Layers className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            No projects found in this view.
          </p>
          <button
            onClick={openNewModal}
            className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Web Project</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const isComingSoon = project.status === 'coming_soon';
            const isInProgress = project.status === 'in_progress';

            return (
              <div
                key={project.id}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                {/* Cover Image */}
                <div className="relative aspect-16/10 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900/80 text-white backdrop-blur-xs">
                    {project.category}
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    {isComingSoon ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500 text-neutral-950 flex items-center gap-1 shadow-xs">
                        <Clock className="w-2.5 h-2.5" />
                        Asset Pending
                      </span>
                    ) : isInProgress ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-600 text-white shadow-xs">
                        In Progress
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Live
                      </span>
                    )}
                  </div>
                </div>

                {/* Info & Description */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="font-bold text-base text-neutral-900 dark:text-white line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {project.shortDescription || project.description}
                    </p>
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {project.technologies.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2">
                    {/* Status Dropdown */}
                    <select
                      value={project.status || 'live'}
                      onChange={(e) =>
                        handleUpdateStatus(
                          project,
                          e.target.value as 'live' | 'in_progress' | 'coming_soon'
                        )
                      }
                      className="text-[11px] font-mono px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      <option value="live">Live</option>
                      <option value="in_progress">In Progress</option>
                      <option value="coming_soon">Asset Pending</option>
                    </select>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                <span>{editingProject ? 'Edit Web Development Project' : 'Add New Web Development Project'}</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                  PROJECT TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Modern E-Commerce Web Store"
                  className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                    CLIENT NAME
                  </label>
                  <input
                    type="text"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                    YEAR
                  </label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                    CATEGORY
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Project['category'] })}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  >
                    <option value="Web App">Web App</option>
                    <option value="SaaS Platform">SaaS Platform</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Design System">Design System</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                    STATUS
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as 'live' | 'in_progress' | 'coming_soon' })}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  >
                    <option value="live">Live</option>
                    <option value="in_progress">In Progress</option>
                    <option value="coming_soon">Asset Pending (Coming Soon)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                  COVER SCREENSHOT (URL OR /uploads/...)
                </label>
                <input
                  type="text"
                  value={form.cover}
                  onChange={(e) => setForm({ ...form, cover: e.target.value })}
                  placeholder="/uploads/screenshot_123.png or https://..."
                  className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />
                <p className="text-[10px] text-neutral-500">
                  Tip: Upload screenshots in the &ldquo;Logo &amp; Media&rdquo; tab and copy the image URL here.
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                  TECHNOLOGIES (COMMA SEPARATED)
                </label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  placeholder="Next.js 15, TypeScript, Tailwind CSS, Node.js"
                  className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                  SHORT SUMMARY
                </label>
                <textarea
                  rows={2}
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  placeholder="Brief 1-2 sentence overview of the project..."
                  className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                    LIVE DEMO URL
                  </label>
                  <input
                    type="text"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                    GITHUB REPO
                  </label>
                  <input
                    type="text"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
