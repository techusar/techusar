import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'site-settings.json');

const DEFAULT_SETTINGS = {
  logoUrl: '',
  brandName: 'TechUsar',
  tagline: 'Graphic Designer & Full-Stack Developer | Custom AI Agents & Bot Builder',
  ownerName: 'Hafiz Muhammad Usman',
  heroTitle: 'Hafiz Muhammad Usman',
  heroSubtitle: 'Senior Graphic Designer (5+ Years) & Full-Stack Next.js Developer (2+ Years). Crafting high-converting web apps, digital brand identities, custom AI bots, and accounting tools.',
  heroBadge: 'Available for Custom AI Agents & Web Projects',
  heroAvatarUrl: '',
  bannerUrl: '',
  phone: '+92 331 8917330',
  displayPhone: '0331-8917330',
  whatsapp: 'https://wa.me/923318917330',
  whatsappNumber: '923318917330',
  email: 'techusar17@gmail.com',
  location: 'Kharadar Lyari, Karachi, Pakistan',
  bio: 'Hafiz-e-Quran, graphic designer with 5+ years experience and full-stack software engineer. Specializing in high-performance web systems, custom bots (WhatsApp/Telegram), and brand identity design.',
  githubUrl: 'https://github.com/TechUsar',
  linkedinUrl: 'https://linkedin.com',
  behanceUrl: 'https://behance.net',
  dribbbleUrl: 'https://dribbble.com',
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
