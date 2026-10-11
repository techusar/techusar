import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDbMedia, saveDbMedia, deleteDbMedia, isDbConfigured } from '@/lib/db';
import { validateAdminRequest, unauthorizedResponse } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const ALLOWED_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
  'image/gif',
]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string; // 'logo' | 'screenshot' | 'general'
  title?: string;
  data_url?: string;
  createdAt: string;
}

export async function GET() {
  const media = await getDbMedia();
  return NextResponse.json({
    success: true,
    source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
    media,
  });
}

export async function POST(req: NextRequest) {
  const { authorized } = validateAdminRequest(req);
  if (!authorized) {
    return unauthorizedResponse();
  }

  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      try {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      } catch {}
    }

    const contentType = req.headers.get('content-type') || '';

    // Handle multipart form data
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const mediaType = (formData.get('type') as string) || 'screenshot';
      const customTitle = (formData.get('title') as string) || '';

      if (!file) {
        return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const rawExt = path.extname(file.name).toLowerCase();
      const ext = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(rawExt) ? rawExt : '.png';
      const mimeType = file.type && ALLOWED_MIME_TYPES.has(file.type) ? file.type : 'image/png';

      const safeBase = file.name
        .replace(rawExt, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .slice(0, 40);
      const timestamp = Date.now();
      const filename = `${mediaType}_${timestamp}_${safeBase}${ext}`;
      const filePath = path.join(UPLOADS_DIR, filename);

      try {
        fs.writeFileSync(filePath, buffer);
      } catch (fsErr) {
        console.warn('[Media Upload] Could not write to disk, saving in database:', fsErr);
      }

      const base64Data = buffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      const newMedia: MediaItem = {
        id: `media-${timestamp}`,
        filename,
        url: `/uploads/${filename}`,
        size: buffer.length,
        type: mediaType,
        title: customTitle || file.name,
        data_url: dataUrl,
        createdAt: new Date().toISOString(),
      };

      await saveDbMedia(newMedia);

      return NextResponse.json({
        success: true,
        source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
        media: newMedia,
      }, { status: 201 });
    }

    // Handle JSON payload (base64 data URL)
    const body = await req.json();
    const { dataUrl, filename: rawName, type = 'screenshot', title = '' } = body;

    if (!dataUrl || typeof dataUrl !== 'string') {
      return NextResponse.json({ error: 'Missing dataUrl string' }, { status: 400 });
    }

    const matches = dataUrl.match(/^data:([A-Za-z0-9+/.-]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: 'Invalid base64 dataUrl format' }, { status: 400 });
    }

    const mime = matches[1];
    if (!ALLOWED_MIME_TYPES.has(mime)) {
      return NextResponse.json({ error: 'Unsupported file MIME type' }, { status: 400 });
    }

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    let ext = '.png';
    if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
    else if (mime.includes('svg')) ext = '.svg';
    else if (mime.includes('webp')) ext = '.webp';
    else if (mime.includes('gif')) ext = '.gif';

    const safeBase = (rawName || 'asset')
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const timestamp = Date.now();
    const filename = `${type}_${timestamp}_${safeBase}${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);

    try {
      fs.writeFileSync(filePath, buffer);
    } catch (fsErr) {
      console.warn('[Media Upload] Could not write to disk, saving in database:', fsErr);
    }

    const newMedia: MediaItem = {
      id: `media-${timestamp}`,
      filename,
      url: `/uploads/${filename}`,
      size: buffer.length,
      type,
      title: title || rawName || filename,
      data_url: dataUrl,
      createdAt: new Date().toISOString(),
    };

    await saveDbMedia(newMedia);

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      media: newMedia,
    }, { status: 201 });
  } catch (err) {
    console.error('Error handling upload:', err);
    return NextResponse.json({ error: 'Failed to process file upload' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { authorized } = validateAdminRequest(req);
  if (!authorized) {
    return unauthorizedResponse();
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing media ID' }, { status: 400 });
    }

    const existing = await getDbMedia();
    const itemToDelete = existing.find((m) => m.id === id);

    if (!itemToDelete) {
      return NextResponse.json({ error: 'Media item not found' }, { status: 404 });
    }

    const filePath = path.join(UPLOADS_DIR, itemToDelete.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn('Could not delete physical file:', err);
      }
    }

    await deleteDbMedia(id);

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      deletedId: id,
    }, { status: 200 });
  } catch (err) {
    console.error('Error deleting media:', err);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
