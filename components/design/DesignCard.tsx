'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DesignProject } from '@/types';
import { Maximize2, ArrowUpRight } from 'lucide-react';

interface DesignCardProps {
  project: DesignProject;
  onOpenLightbox: (project: DesignProject) => void;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export function DesignCard({
  project,
  onOpenLightbox,
  aspectRatio = 'square',
}: DesignCardProps) {
  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'portrait':
        return 'aspect-3/4';
      case 'landscape':
        return 'aspect-16/10';
      case 'square':
      default:
        return 'aspect-square';
    }
  };

  return (
    <article
      id={`design-card-${project.slug}`}
      className="group relative rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Artwork Canvas */}
      <div className={`relative w-full ${getAspectClass()} overflow-hidden bg-neutral-100 dark:bg-neutral-950`}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onOpenLightbox(project)}
              className="p-2 rounded-full bg-white/90 text-neutral-950 hover:bg-white transition-colors shadow-md"
              title="Inspect Fullscreen"
              aria-label="Inspect Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1 text-white">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
              {project.category}
            </span>
            <h4 className="text-base font-semibold">{project.title}</h4>
            <p className="text-xs text-neutral-300 line-clamp-2">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Bottom Minimal Footer */}
      <div className="p-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
            <Link href={`/design/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          </h4>
          <span className="text-xs text-neutral-500 font-mono">
            {project.category}
          </span>
        </div>

        <Link
          href={`/design/${project.slug}`}
          className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label={`View ${project.title} case study`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
