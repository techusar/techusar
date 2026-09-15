'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { ArrowUpRight, Code, Clock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  featuredLayout?: boolean;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isComingSoon = project.status === 'coming_soon';
  const isInProgress = project.status === 'in_progress';

  return (
    <article
      id={`project-card-${project.slug}`}
      className="group relative flex flex-col rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
    >
      <Link
        href={`/work/${project.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl flex-1 flex flex-col"
      >
        {/* Preview image frame with hover movement */}
        <div className="relative w-full aspect-16/10 sm:aspect-16/9 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            className={`object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 ${
              isComingSoon ? 'filter grayscale-[30%] opacity-85' : ''
            }`}
          />

          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Top metadata tags */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-neutral-900/80 dark:bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono tracking-wider">
                {project.category}
              </span>
              {project.isWebDev && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600/80 backdrop-blur-xs text-white text-[10px] font-mono">
                  <Code className="w-2.5 h-2.5" />
                  Web Dev
                </span>
              )}
            </div>

            {/* Status indicator */}
            {isComingSoon ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/90 text-neutral-950 font-semibold text-[10px] font-mono shadow-xs backdrop-blur-xs">
                <Clock className="w-2.5 h-2.5" />
                Asset Pending
              </span>
            ) : isInProgress ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/90 text-white font-medium text-[10px] font-mono shadow-xs backdrop-blur-xs">
                In Progress
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xs text-neutral-800 dark:text-neutral-200 text-[11px] font-mono">
                {project.year}
              </span>
            )}
          </div>

          {/* Hover Arrow Badge */}
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white flex items-center justify-center shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Content Box */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hidden sm:inline">
                {project.client}
              </span>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
