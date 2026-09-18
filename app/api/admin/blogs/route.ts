import { NextRequest, NextResponse } from 'next/server';
import { BlogPost } from '@/lib/blog';
import { getDbBlogs, saveDbBlog, deleteDbBlog, isDbConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const posts = await getDbBlogs();
  return NextResponse.json({
    success: true,
    source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
    posts,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

    const saved = await saveDbBlog(postData);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write blog post to database' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      post: postData,
    }, { status: 200 });
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

    const deleted = await deleteDbBlog(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      message: 'Blog post deleted',
    }, { status: 200 });
  } catch (err) {
    console.error('Error deleting blog post:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
