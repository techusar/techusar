'use client';

import React, { useState } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Project } from '@/types';
import { Layers, Filter } from 'lucide-react';

interface WorkClientProps {
  initialProjects: Project[];
}

export function WorkClient({ initialProjects }: WorkClientProps) {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'SaaS Platform', 'Full-Stack', 'Design System', 'Web App', 'E-commerce'];

  const filteredProjects =
    filter === 'All'
      ? initialProjects
      : initialProjects.filter((p) => p.category === filter);

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-mono text-neutral-400 mr-2 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>FILTER:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
              filter === cat
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} featuredLayout={idx === 0} />
        ))}
      </div>
    </div>
  );
}
