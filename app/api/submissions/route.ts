import { NextRequest, NextResponse } from 'next/server';
import {
  getDbSubmissions,
  saveDbSubmission,
  deleteDbSubmission,
  isDbConfigured,
} from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

const ADMIN_PHONE = '923318917330';

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

export async function GET() {
  const submissions = await getDbSubmissions();

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

    if (s.status && statusCounts[s.status as keyof typeof statusCounts] !== undefined) {
      statusCounts[s.status as keyof typeof statusCounts]++;
    }
  });

  return NextResponse.json({
    success: true,
    source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
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

    await saveDbSubmission(newSubmission);

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
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

    const submissions = await getDbSubmissions();
    const target = submissions.find((s) => s.id === id);
    if (!target) {
      return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
    }

    const updated = {
      ...target,
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
    };

    await saveDbSubmission(updated);
    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      submission: updated,
    });
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

    await deleteDbSubmission(id);
    const remaining = await getDbSubmissions();

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      remaining: remaining.length,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete submission' }, { status: 500 });
  }
}
