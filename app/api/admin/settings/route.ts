import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'site-settings.json');

const DEFAULT_SETTINGS = {
  logoUrl: '',
  brandName: 'TechUsar',
  tagline: 'Graphic Designer & Full-Stack Developer',
  phone: '+92 331 8917330',
  whatsapp: 'https://wa.me/923318917330',
  email: 'techusar17@gmail.com',
  ownerName: 'Hafiz Muhammad Usman',
  updatedAt: new Date().toISOString(),
};

function getSettings() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const content = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return { ...DEFAULT_SETTINGS, ...JSON.parse(content) };
    }
  } catch (err) {
    console.error('Error reading site settings:', err);
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: Record<string, unknown>) {
  try {
    const dir = path.dirname(SETTINGS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving site settings:', err);
    return false;
  }
}

export async function GET() {
  const settings = getSettings();
  return NextResponse.json({ success: true, settings }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = getSettings();
    const updated = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    const saved = saveSettings(updated);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write settings to disk' }, { status: 500 });
    }

    return NextResponse.json({ success: true, settings: updated }, { status: 200 });
  } catch (err) {
    console.error('Error in settings POST:', err);
    return NextResponse.json({ error: 'Invalid settings payload' }, { status: 400 });
  }
}
