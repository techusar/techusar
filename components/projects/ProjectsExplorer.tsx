'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import {
  Search,
  ExternalLink,
  Code2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Layers,
  Filter,
} from 'lucide-react';

interface ProjectsExplorerProps {
  initialProjects: Project[];
}

const CATEGORIES = ['All', 'Web App', 'SaaS Platform', 'E-commerce', 'Full-Stack', 'Design System'];

export function ProjectsExplorer({ initialProjects }: ProjectsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.shortDescription?.toLowerCase().includes(q) ||
        (project.projectNumber && project.projectNumber.includes(q)) ||
        project.slug.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Top Search & Filter Bar */}
      <div className="p-4 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search projects by #number (e.g. 01, 15), name, tech (React, Next.js), or niche..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
            Showing <strong className="text-neutral-950 dark:text-white">{filteredProjects.length}</strong> of{' '}
            {initialProjects.length} Web Builds
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <span className="text-xs font-mono text-neutral-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {paginatedProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
          <p className="text-base text-neutral-600 dark:text-neutral-400">
            No web development projects found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedProjects.map((project) => {
            const whatsappMessage = encodeURIComponent(
              `Hello Hafiz Muhammad Usman (TechUsar), I would like to download the free template and source code for "${project.title}" (Live: ${project.liveUrl}). Please share the repository files.`
            );
            const whatsappUrl = `https://wa.me/923318917330?text=${whatsappMessage}`;

            return (
              <article
                key={project.slug}
                className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  {/* Cover Image with Badges */}
                  <div className="relative aspect-16/10 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={project.cover}
                      alt={`${project.title} - ${project.category}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5">
                        {project.projectNumber && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-neutral-950/90 text-white backdrop-blur-xs">
                            #{project.projectNumber}
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-neutral-900/80 text-white backdrop-blur-xs">
                          {project.category}
                        </span>
                      </div>
                      {project.liveUrl && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-600/90 text-white backdrop-blur-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Live Netlify
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="text-[11px] font-mono text-neutral-500">
                      Client: {project.client} • {project.year}
                    </div>

                    <h2 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60"
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
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2 border-t border-neutral-100 dark:border-neutral-800/80 mt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-1.5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open Live Netlify Demo"
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Download Free Template via WhatsApp"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600/15 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Free Code</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-neutral-800 disabled:opacity-40 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-xl text-xs font-semibold font-mono transition-all ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-neutral-800 disabled:opacity-40 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Next
          </button>
        </div>
      )}

      {/* Free Template Download Mega Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-neutral-900 to-blue-950 text-white border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FREE TEMPLATES &amp; SOURCE CODE DOWNLOADS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Need any of these 50 web development templates or codebases?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            All 50 web application templates are available for free download. Reach out directly on WhatsApp to get the GitHub repositories, UI design files, or customized variations for your startup.
          </p>
        </div>
        <a
          href={`https://wa.me/923318917330?text=${encodeURIComponent(
            'Hello Hafiz Muhammad Usman, I visited your 50 TechUsar projects directory. I would like to download free templates and discuss a web development project.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg hover:shadow-emerald-900/40"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Contact on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
