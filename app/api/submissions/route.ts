import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  formType: 'contact' | 'template-download' | 'template-purchase' | 'project-estimator' | 'custom-bot-inquiry' | 'general';
  projectType?: string;
  budget?: string;
  message: string;
  services?: string[];
  createdAt: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'archived';
  notes?: string;
  sourcePage?: string;
  whatsappUrl?: string;
}

const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'submissions.json');
const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json');
const ADMIN_PHONE = '923318917330';

async function readSubmissions(): Promise<FormSubmission[]> {
  try {
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSubmissions(submissions: FormSubmission[]): Promise<void> {
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
}

// Generate encoded WhatsApp link for instant client-side or admin dispatch
function buildWhatsAppUrl(submission: Partial<FormSubmission>): string {
  const parts = [
    `*Assalam-o-Alaikum Usman / TechUsar!*`,
    `New project inquiry submitted on website:`,
    `👤 *Name*: ${submission.name || 'Anonymous'}`,
    `✉️ *Email*: ${submission.email || 'N/A'}`,
  ];

  if (submission.phone) {
    parts.push(`📞 *Phone / WhatsApp*: ${submission.phone}`);
  }
  if (submission.projectType) {
    parts.push(`💼 *Requirement / Service*: ${submission.projectType}`);
  }
  if (submission.budget) {
    parts.push(`💰 *Budget*: ${submission.budget}`);
  }
  if (submission.message) {
    parts.push(`📝 *Message*: ${submission.message}`);
  }
  if (submission.sourcePage) {
    parts.push(`🌐 *From Page*: ${submission.sourcePage}`);
  }

  const encoded = encodeURIComponent(parts.join('\n\n'));
  return `https://wa.me/${ADMIN_PHONE}?text=${encoded}`;
}

// Update analytics when a form is submitted
async function incrementFormsCount(sourcePage?: string, projectType?: string) {
  try {
    const raw = await fs.readFile(ANALYTICS_FILE, 'utf-8');
    const analytics = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];

    analytics.totalClicks = (analytics.totalClicks || 0) + 1;
    analytics.clicksByTarget = analytics.clicksByTarget || {};
    analytics.clicksByTarget['contact_form_submit'] = (analytics.clicksByTarget['contact_form_submit'] || 0) + 1;

    analytics.dailyStats = analytics.dailyStats || {};
    if (!analytics.dailyStats[today]) {
      analytics.dailyStats[today] = { visits: 1, unique: 1, clicks: 1, formsFilled: 1 };
    } else {
      analytics.dailyStats[today].formsFilled = (analytics.dailyStats[today].formsFilled || 0) + 1;
      analytics.dailyStats[today].clicks = (analytics.dailyStats[today].clicks || 0) + 1;
    }

    analytics.recentClicks = analytics.recentClicks || [];
    analytics.recentClicks.unshift({
      id: `clk_${Date.now()}`,
      element: 'form_submission',
      label: `Form submitted: ${projectType || 'General Inquiry'}`,
      page: sourcePage || '/contact',
      timestamp: new Date().toISOString(),
    });

    if (analytics.recentClicks.length > 100) {
      analytics.recentClicks = analytics.recentClicks.slice(0, 100);
    }

    await fs.writeFile(ANALYTICS_FILE, JSON.stringify(analytics, null, 2), 'utf-8');
  } catch {
    // Non-blocking
  }
}

export async function GET() {
  const submissions = await readSubmissions();

  // Compute breakdown of "kon kya chahta he" (user demands analysis)
  const demandsBreakdown: Record<string, number> = {};
  const budgetBreakdown: Record<string, number> = {};
  const statusCounts = {
    new: 0,
    contacted: 0,
    'in-progress': 0,
    completed: 0,
    archived: 0,
  };

  submissions.forEach((s) => {
    const demand = s.projectType || 'General Consultation';
    demandsBreakdown[demand] = (demandsBreakdown[demand] || 0) + 1;

    if (s.budget) {
      budgetBreakdown[s.budget] = (budgetBreakdown[s.budget] || 0) + 1;
    }

    if (s.status && statusCounts[s.status] !== undefined) {
      statusCounts[s.status]++;
    }
  });

  return NextResponse.json({
    success: true,
    total: submissions.length,
    statusCounts,
    demandsBreakdown,
    budgetBreakdown,
    submissions,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, formType, projectType, budget, message, services, sourcePage } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Name and Email are required' }, { status: 400 });
    }

    const submissions = await readSubmissions();
    const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const createdAt = new Date().toISOString();

    const whatsappUrl = buildWhatsAppUrl({
      name,
      email,
      phone,
      projectType,
      budget,
      message,
      sourcePage,
    });

    const newSubmission: FormSubmission = {
      id,
      name,
      email,
      phone: phone || '',
      formType: formType || 'contact',
      projectType: projectType || 'General Inquiry',
      budget: budget || 'Not specified',
      message: message || '',
      services: services || [],
      createdAt,
      status: 'new',
      sourcePage: sourcePage || '/contact',
      whatsappUrl,
    };

    submissions.unshift(newSubmission);
    await writeSubmissions(submissions);
    await incrementFormsCount(sourcePage, projectType);

    return NextResponse.json({
      success: true,
      submission: newSubmission,
      whatsappUrl,
      message: 'Inquiry saved successfully in database and prepared for WhatsApp.',
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json({ success: false, error: 'Failed to save submission' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, notes } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const submissions = await readSubmissions();
    const index = submissions.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
    }

    if (status) submissions[index].status = status;
    if (notes !== undefined) submissions[index].notes = notes;

    await writeSubmissions(submissions);
    return NextResponse.json({ success: true, submission: submissions[index] });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update submission' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const submissions = await readSubmissions();
    const filtered = submissions.filter((s) => s.id !== id);
    await writeSubmissions(filtered);

    return NextResponse.json({ success: true, remaining: filtered.length });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete submission' }, { status: 500 });
  }
}
