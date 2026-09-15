import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { themes } from '@/data/themes';
import { ThemeDetailClient } from '@/components/themes/ThemeDetailClient';

interface ThemePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return themes.map((theme) => ({
    slug: theme.slug,
  }));
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { slug } = await params;
  const theme = themes.find((t) => t.slug === slug);

  if (!theme) {
    return {
      title: 'Theme Not Found — TechUsar',
    };
  }

  const themeUrl = `https://techusar.dev/themes/${theme.slug}`;

  return {
    title: `${theme.name} — Next.js Theme & Template | TechUsar`,
    description: `${theme.description} Includes Next.js 15, TypeScript, and Tailwind CSS.`,
    keywords: [
      theme.name,
      `${theme.name} template`,
      theme.category,
      ...theme.technology,
      'Next.js theme',
      'TechUsar templates',
    ],
    alternates: {
      canonical: themeUrl,
    },
    openGraph: {
      title: `${theme.name} — Next.js Theme & Template | TechUsar`,
      description: theme.description,
      url: themeUrl,
      images: [
        {
          url: theme.previewImage,
          width: 1200,
          height: 630,
          alt: theme.name,
        },
      ],
    },
  };
}

export default async function ThemeDetailPage({ params }: ThemePageProps) {
  const { slug } = await params;
  const theme = themes.find((t) => t.slug === slug);

  if (!theme) {
    notFound();
  }

  return <ThemeDetailClient theme={theme} />;
}
