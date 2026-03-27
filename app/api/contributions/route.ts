import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import {
  checkRateLimit,
  rateLimitConfigs,
  getClientIP,
  validateTurnstileToken,
  logRateLimitViolation,
  logBotVerificationFailure,
  logValidationFailure,
  sanitizeText,
} from '@/lib/security/utils';

// Strict validation schema for contributions
const contributionSchema = z.object({
  user_program_id: z.string().uuid('Invalid program ID'),
  user_id: z.string().uuid('Invalid user ID'),
  user_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  user_email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email address too long'),
  program_type: z
    .string()
    .min(1, 'Program type is required')
    .max(100, 'Program type too long'),
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters'),
  activity_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  venue_city: z
    .string()
    .min(1, 'City is required')
    .max(100, 'City name too long'),
  venue_country: z
    .string()
    .min(1, 'Country is required')
    .max(100, 'Country name too long'),
  participant_count: z
    .string()
    .regex(/^\d+$/, 'Participant count must be a number')
    .refine(val => parseInt(val) >= 0 && parseInt(val) <= 10000, 'Invalid participant count'),
  participant_phones: z
    .string()
    .max(1000, 'Phone list too long')
    .optional()
    .or(z.literal('')),
  task_conducted: z
    .string()
    .min(10, 'Task description required')
    .max(2000, 'Task description too long'),
  results: z
    .string()
    .min(10, 'Results description required')
    .max(5000, 'Results description too long'),
  turnstileToken: z.string().optional(),
});

// GET /api/contributions - Get user contributions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('user_id');
    const programType = searchParams.get('program_type');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const where: any = { user_id: userId };
    if (programType) {
      where.program_type = programType;
    }

    const contributions = await prisma.contribution.findMany({
      where,
      orderBy: { submitted_at: 'desc' },
    });

    return NextResponse.json(contributions);
  } catch (error) {
    console.error('Failed to fetch contributions:', error);
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
  }
}

// POST /api/contributions - Submit new contribution
export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  
  try {
    // Rate limiting check
    const rateLimit = checkRateLimit(`contribution:${clientIP}`, rateLimitConfigs.contribution);
    if (!rateLimit.allowed) {
      logRateLimitViolation(clientIP, '/api/contributions');
      return NextResponse.json(
        { error: 'Too many contribution submissions. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Parse body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    // Bot verification (skip in development if no secret key)
    if (process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
      const botCheck = await validateTurnstileToken(body.turnstileToken as string);
      if (!botCheck.valid) {
        logBotVerificationFailure(clientIP, '/api/contributions', botCheck.error || 'Unknown');
        return NextResponse.json(
          { error: 'Bot verification failed. Please try again.' },
          { status: 403 }
        );
      }
    }
    
    // Remove turnstile token before validation
    const { turnstileToken: _, ...contributionData } = body;
    
    // Sanitize string fields
    const sanitizedData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(contributionData)) {
      if (typeof value === 'string') {
        if (key === 'user_email') {
          sanitizedData[key] = value.trim().toLowerCase().slice(0, 254);
        } else if (key === 'user_name' || key === 'title') {
          sanitizedData[key] = sanitizeText(value, 200);
        } else if (key === 'participant_phones') {
          sanitizedData[key] = sanitizeText(value, 1000);
        } else {
          sanitizedData[key] = sanitizeText(value, 5000);
        }
      } else {
        sanitizedData[key] = value;
      }
    }
    
    // Validate
    const validation = contributionSchema.safeParse(sanitizedData);
    if (!validation.success) {
      const errorField = validation.error.issues[0]?.path[0] || 'unknown';
      logValidationFailure(clientIP, '/api/contributions', errorField as string, validation.error.message);
      return NextResponse.json(
        { error: validation.error.message },
        { status: 400 }
      );
    }

    const contribution = await prisma.contribution.create({
      data: {
        user_program_id: validation.data.user_program_id,
        user_id: validation.data.user_id,
        user_name: validation.data.user_name,
        user_email: validation.data.user_email,
        program_type: validation.data.program_type,
        title: validation.data.title,
        activity_date: new Date(validation.data.activity_date),
        venue_city: validation.data.venue_city,
        venue_country: validation.data.venue_country,
        participant_count: parseInt(validation.data.participant_count),
        participant_phones: validation.data.participant_phones || '',
        task_conducted: validation.data.task_conducted,
        results: validation.data.results,
        status: 'pending',
      },
    });

    return NextResponse.json({ success: true, contribution });
  } catch (error) {
    console.error('Failed to create contribution:', error);
    return NextResponse.json({ error: 'Failed to submit contribution' }, { status: 500 });
  }
}
