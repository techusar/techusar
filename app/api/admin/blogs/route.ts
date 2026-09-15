import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/lib/blog';

const BLOGS_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

function getStoredBlogs(): BlogPost[] {
  try {
    if (fs.existsSync(BLOGS_FILE)) {
      const content = fs.readFileSync(BLOGS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading blog-posts.json:', err);
  }
  return [];
}

function saveBlogs(posts: BlogPost[]) {
  try {
    const dir = path.dirname(BLOGS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(posts, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving blog-posts.json:', err);
    return false;
  }
}

export async function GET() {
  const posts = getStoredBlogs();
  return NextResponse.json({ success: true, posts }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const existing = getStoredBlogs();

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const id = body.id || `post-${Date.now()}`;
    const existingIndex = existing.findIndex((p) => p.id === id || p.slug === slug);

    const postData: BlogPost = {
      id,
      slug,
      title: body.title,
      excerpt: body.excerpt || body.title,
      category: body.category || 'Engineering',
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: body.readTime || '5 min read',
      author: {
        name: body.author?.name || 'Hafiz Muhammad Usman',
        role: body.author?.role || 'Founder & Full-Stack Developer',
        avatar: body.author?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=Usman',
      },
      tags: Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === 'string'
        ? body.tags.split(',').map((s: string) => s.trim())
        : ['TechUsar', 'Web Development'],
      featured: Boolean(body.featured),
      coverImage:
        body.coverImage ||
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
      seoKeywords: Array.isArray(body.seoKeywords)
        ? body.seoKeywords
        : typeof body.seoKeywords === 'string'
        ? body.seoKeywords.split(',').map((s: string) => s.trim())
        : [body.title, 'TechUsar', 'Hafiz Muhammad Usman'],
      sections: Array.isArray(body.sections) && body.sections.length > 0
        ? body.sections
        : [
            {
              heading: 'Overview & Key Insights',
              paragraphs: [
                body.content ||
                  'Discover in-depth engineering patterns, code tutorials, and design principles in this comprehensive guide.',
              ],
            },
          ],
    };

    let updatedPosts: BlogPost[];
    if (existingIndex >= 0) {
      updatedPosts = [...existing];
      updatedPosts[existingIndex] = postData;
    } else {
      updatedPosts = [postData, ...existing];
    }

    const saved = saveBlogs(updatedPosts);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write blog posts data' }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: postData }, { status: 200 });
  } catch (err) {
    console.error('Error updating blog post:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const existing = getStoredBlogs();
    const filtered = existing.filter((p) => p.id !== id && p.slug !== id);

    if (filtered.length === existing.length) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const saved = saveBlogs(filtered);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write blog posts data' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting blog post:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
