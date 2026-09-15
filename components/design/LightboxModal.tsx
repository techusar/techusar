'use client';

import React from 'react';
import Image from 'next/image';
import { DesignProject } from '@/types';
import { X, ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface LightboxModalProps {
  project: DesignProject | null;
  activeImageIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function LightboxModal({
  project,
  activeImageIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  if (!isOpen || !project) return null;

  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.cover];
  const currentImg = images[activeImageIndex] || project.cover;

  return (
    <div
      id="design-lightbox-backdrop"
      className="fixed inset-0 z-50 flex flex-col bg-neutral-950/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="h-16 px-4 sm:px-6 border-b border-neutral-800 flex items-center justify-between text-white shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-sm font-semibold">{project.title}</h3>
            <p className="text-xs text-neutral-400 font-mono">
              {project.category} — {project.client} ({project.year})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/design/${project.slug}`}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1.5"
          >
            <span>Read Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-4 sm:left-8 z-10 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 transition-colors"
            aria-label="Previous artwork"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full max-w-5xl h-full max-h-[75vh] flex items-center justify-center">
          <Image
            src={currentImg}
            alt={project.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            referrerPolicy="no-referrer"
            className="object-contain"
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 sm:right-8 z-10 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 transition-colors"
            aria-label="Next artwork"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div
        className="h-14 px-4 sm:px-6 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400 font-mono shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          Image {activeImageIndex + 1} of {images.length}
        </div>
        <div className="flex items-center gap-2">
          {project.tools.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
