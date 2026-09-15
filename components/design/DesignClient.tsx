'use client';

import React, { useState } from 'react';
import { DesignCard } from '@/components/design/DesignCard';
import { LightboxModal } from '@/components/design/LightboxModal';
import { DesignProject } from '@/types';
import { Filter } from 'lucide-react';

interface DesignClientProps {
  initialProjects: DesignProject[];
}

export function DesignClient({ initialProjects }: DesignClientProps) {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const categories = [
    'All',
    'Brand Identity',
    'Posters & Print',
    'UI Design',
    'Marketing Graphics',
    'Visual Systems',
  ];

  const filteredItems =
    filter === 'All'
      ? initialProjects
      : initialProjects.filter((d) => d.category === filter);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredItems.map((project) => (
          <DesignCard
            key={project.id}
            project={project}
            onOpenLightbox={(proj) => {
              setSelectedProject(proj);
              setActiveImageIndex(0);
            }}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        project={selectedProject}
        activeImageIndex={activeImageIndex}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={() => {
          if (!selectedProject) return;
          const count = selectedProject.gallery?.length || 1;
          setActiveImageIndex((prev) => (prev - 1 + count) % count);
        }}
        onNext={() => {
          if (!selectedProject) return;
          const count = selectedProject.gallery?.length || 1;
          setActiveImageIndex((prev) => (prev + 1) % count);
        }}
      />
    </div>
  );
}
