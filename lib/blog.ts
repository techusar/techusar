import blogPostsData from '@/data/blog-posts.json';
import { SITE_URL } from '@/lib/seo';

export interface BlogSection {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  category: string;
  cluster?: string;
  primaryKeyword?: string;
  date: string;
  readTime: string;
  author: BlogAuthor;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  seoKeywords: string[];
  sections: BlogSection[];
  faqs?: { q: string; a: string }[];
  relatedServices?: { title: string; href: string }[];
  relatedProjects?: { title: string; href: string }[];
}

// In-memory typed store loaded from data/blog-posts.json
const posts: BlogPost[] = blogPostsData as BlogPost[];

export function getAllBlogPosts(): BlogPost[] {
  return posts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return posts.filter((p) => p.featured);
}

export function getBlogCategories(): string[] {
  const cats = new Set<string>();
  posts.forEach((p) => cats.add(p.category));
  return ['All', ...Array.from(cats)];
}

export function getRelatedBlogPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return posts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .concat(posts.filter((p) => p.slug !== currentSlug && p.category !== category))
    .slice(0, limit);
}

/**
 * Generate Schema.org JSON-LD for individual blog post
 */
export function generateBlogPostingSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: '2026-03-01T00:00:00+05:00',
    dateModified: '2026-03-11T00:00:00+05:00',
    image: post.coverImage || `${SITE_URL}/og-image.png`,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechUsar',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.seoKeywords.join(', '),
  };
}
