import { NextRequest, NextResponse } from 'next/server';
import {
  getDbSubmissions,
  saveDbSubmission,
  deleteDbSubmission,
  isDbConfigured,
} from '@/lib/db';
import { validateAdminRequest, unauthorizedResponse } from '@/lib/adminAuth';

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

// In-memory rate limiter for public submissions (by IP)
interface SubRateRecord {
  count: number;
  resetAt: number;
}
const submissionLimits = new Map<string, SubRateRecord>();

function checkSubmissionRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = submissionLimits.get(ip);
  if (!record || record.resetAt < now) {
    submissionLimits.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 }); // 10 minute window
    return true;
  }
  if (record.count >= 8) {
    return false; // Exceeded 8 submissions per 10 mins
  }
  record.count += 1;
  return true;
}

const ALLOWED_FORM_TYPES = new Set([
  'contact',
  'template-download',
  'template-purchase',
  'project-estimator',
  'custom-bot-inquiry',
  'general',
]);

const ALLOWED_STATUSES = new Set(['new', 'contacted', 'in-progress', 'completed', 'archived']);

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

/**
 * GET — RESTRICTED TO AUTHORIZED ADMINISTRATORS ONLY
 * Public visitors cannot query customer inquiries.
 */
export async function GET(req: NextRequest) {
  const { authorized } = validateAdminRequest(req);
  if (!authorized) {
    return unauthorizedResponse('Authentication required to access customer submissions.');
  }

  const submissions = await getDbSubmissions();

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

/**
 * POST — PUBLIC INQUIRY SUBMISSION WITH SPAM & RATE PROTECTION
 */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  if (!checkSubmissionRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many submissions. Please wait a few moments before trying again.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    // Honeypot check (hidden bot field if provided)
    if (body.website_url || body._gotcha) {
      return NextResponse.json({ success: true, message: 'Inquiry received' }); // Silent sink for bots
    }

    const rawName = typeof body.name === 'string' ? body.name.trim() : '';
    const rawEmail = typeof body.email === 'string' ? body.email.trim() : '';
    const rawPhone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const rawProjectType = typeof body.projectType === 'string' ? body.projectType.trim() : '';
    const rawBudget = typeof body.budget === 'string' ? body.budget.trim() : '';
    const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';
    const rawFormType = typeof body.formType === 'string' ? body.formType.trim() : 'contact';
    const rawSourcePage = typeof body.sourcePage === 'string' ? body.sourcePage.trim() : '/contact';

    // Validation
    if (!rawName || rawName.length < 2 || rawName.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid name (2-100 characters).' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rawEmail || !emailRegex.test(rawEmail) || rawEmail.length > 150) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (rawPhone && rawPhone.length > 30) {
      return NextResponse.json({ success: false, error: 'Phone number is too long.' }, { status: 400 });
    }

    if (rawMessage.length > 3000) {
      return NextResponse.json({ success: false, error: 'Message exceeds maximum length (3,000 characters).' }, { status: 400 });
    }

    const formType = (ALLOWED_FORM_TYPES.has(rawFormType) ? rawFormType : 'contact') as FormSubmission['formType'];
    const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const createdAt = new Date().toISOString();

    const sanitizedSubmission: FormSubmission = {
      id,
      name: rawName,
      email: rawEmail,
      phone: rawPhone ? rawPhone.slice(0, 30) : undefined,
      formType,
      projectType: rawProjectType.slice(0, 100) || 'General Inquiry',
      budget: rawBudget.slice(0, 50) || 'Not specified',
      message: rawMessage.slice(0, 3000),
      services: Array.isArray(body.services)
        ? body.services.slice(0, 10).map((s: unknown) => String(s).slice(0, 50))
        : [],
      createdAt,
      status: 'new',
      sourcePage: rawSourcePage.slice(0, 150) || '/contact',
    };

    const whatsappUrl = buildWhatsAppUrl(sanitizedSubmission);
    sanitizedSubmission.whatsappUrl = whatsappUrl;

    const saved = await saveDbSubmission(sanitizedSubmission);
    if (!saved) {
      return NextResponse.json(
        { success: false, error: 'Unable to record your inquiry. Please contact us via WhatsApp.' },
        { status: 500 }
      );
    }

    // Return sanitized acknowledgement with WhatsApp redirect
    return NextResponse.json({
      success: true,
      id: sanitizedSubmission.id,
      whatsappUrl,
      message: 'Inquiry received successfully.',
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json({ success: false, error: 'Failed to process inquiry.' }, { status: 500 });
  }
}

/**
 * PATCH — RESTRICTED TO AUTHORIZED ADMINISTRATORS ONLY
 */
export async function PATCH(req: NextRequest) {
  const { authorized } = validateAdminRequest(req);
  if (!authorized) {
    return unauthorizedResponse('Authentication required to modify submissions.');
  }

  try {
    const { id, status, notes } = await req.json();
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid ID is required' }, { status: 400 });
    }

    if (status && !ALLOWED_STATUSES.has(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status value' }, { status: 400 });
    }

    const submissions = await getDbSubmissions();
    const target = submissions.find((s) => s.id === id);
    if (!target) {
      return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
    }

    const updated: FormSubmission = {
      ...(target as FormSubmission),
      ...(status ? { status: status as FormSubmission['status'] } : {}),
      ...(notes !== undefined ? { notes: String(notes).slice(0, 2000) } : {}),
    };

    const saved = await saveDbSubmission(updated);
    if (!saved) {
      return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      submission: updated,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update submission' }, { status: 500 });
  }
}

/**
 * DELETE — RESTRICTED TO AUTHORIZED ADMINISTRATORS ONLY
 */
export async function DELETE(req: NextRequest) {
  const { authorized } = validateAdminRequest(req);
  if (!authorized) {
    return unauthorizedResponse('Authentication required to delete submissions.');
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const deleted = await deleteDbSubmission(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Failed to delete record' }, { status: 500 });
    }

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
