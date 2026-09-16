import type { Metadata } from 'next';

export const SITE_URL = 'https://techusar.com';
export const SITE_NAME = 'TechUsar';
export const AUTHOR_NAME = 'Hafiz Muhammad Usman';
export const BRAND_TAGLINE = 'Web Designer, Full-Stack Developer & Custom AI Bot Engineer';

/**
 * Future tools.techusar.com Subdomain Configuration
 *
 * When moving developer tools to https://tools.techusar.com/ in the future:
 * 1. Set SUBDOMAIN_TOOLS_ENABLED to true (or via NEXT_PUBLIC_TOOLS_SUBDOMAIN env var).
 * 2. Configure 301 redirects in next.config.ts from /tools/:slug to https://tools.techusar.com/:slug
 * 3. Update sitemap generator to index the respective domains.
 * Currently, all tools live natively under https://techusar.com/tools/[slug] to build domain authority.
 */
export const SUBDOMAIN_TOOLS_ENABLED = process.env.NEXT_PUBLIC_TOOLS_SUBDOMAIN === 'true';
export const TOOLS_BASE_URL = SUBDOMAIN_TOOLS_ENABLED
  ? 'https://tools.techusar.com'
  : `${SITE_URL}/tools`;

export interface SEOMetadataParams {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function constructMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = `${SITE_URL}/og-image.png`,
  ogType = 'website',
  publishedTime,
  modifiedTime,
}: SEOMetadataParams): Metadata {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const defaultKeywords = [
    'TechUsar',
    'Hafiz Muhammad Usman',
    'Web Designer',
    'Web Developer',
    'React Developer',
    'TypeScript Developer',
    'UI UX Designer',
    'Graphic Designer',
    'Developer Tools',
    'Custom AI Chatbot',
    'AI Bot Development',
    'Next.js Templates',
    'Pakistan Web Developer',
    'Freelance Web Designer',
  ];

  const mergedKeywords = Array.from(new Set([...keywords, ...defaultKeywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@TechUsar',
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
