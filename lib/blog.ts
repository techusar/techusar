import blogPostsData from '@/data/blog-posts.json';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
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
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: BlogAuthor;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  seoKeywords: string[];
  sections: BlogSection[];
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
    image: post.coverImage || 'https://techusar.dev/og-image.png',
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: 'https://techusar.dev/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechUsar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://techusar.dev/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://techusar.dev/blog/${post.slug}`,
    },
    keywords: post.seoKeywords.join(', '),
  };
}
