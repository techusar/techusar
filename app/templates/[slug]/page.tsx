import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { themes } from '@/data/themes';
import { ThemeDetailClient } from '@/components/themes/ThemeDetailClient';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, SITE_URL } from '@/lib/seo';

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return themes.map((theme) => ({
    slug: theme.slug,
  }));
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const theme = themes.find((t) => t.slug === slug);

  if (!theme) {
    return {
      title: 'Template Not Found | TechUsar',
    };
  }

  return constructMetadata({
    title: `${theme.name} — Website Template & Next.js Theme | TechUsar`,
    description: `${theme.description} Engineered with Next.js 15, TypeScript, and Tailwind CSS by Hafiz Muhammad Usman.`,
    path: `/templates/${theme.slug}`,
    keywords: [
      theme.name,
      `${theme.name} template`,
      `${theme.category} website template`,
      ...theme.technology,
      'Next.js 15 template',
      'TechUsar templates',
    ],
    ogImage: theme.previewImage,
  });
}

export default async function TemplateDetailPage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const theme = themes.find((t) => t.slug === slug);

  if (!theme) {
    notFound();
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: theme.name,
    image: theme.previewImage,
    description: theme.description,
    category: theme.category,
    offers: {
      '@type': 'Offer',
      price: theme.isFree ? '0' : theme.price.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/templates/${theme.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: theme.rating.toString(),
      reviewCount: theme.downloadsCount.toString(),
    },
    brand: {
      '@type': 'Brand',
      name: 'TechUsar',
    },
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: 'Templates', href: '/templates' },
            { label: theme.name, href: `/templates/${theme.slug}` },
          ]}
        />
      </div>
      <ThemeDetailClient theme={theme} />
    </div>
  );
}
