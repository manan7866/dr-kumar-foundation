import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { registrationService } from '@/lib/services';
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

// Strict validation schema for registration
const registrationSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[\p{L}\p{M}\s.'-]+$/u, 'Name contains invalid characters'),
  
  country: z
    .string()
    .min(2, 'Country is required')
    .max(100, 'Country name too long'),
  
  city: z
    .string()
    .min(1, 'City is required')
    .max(100, 'City name too long'),
  
  gender: z.enum(['male', 'female']).refine(
    val => val === 'male' || val === 'female',
    { message: 'Please select a valid gender option' }
  ),
  
  profession: z
    .string()
    .min(2, 'Profession is required')
    .max(200, 'Profession too long'),
  
  year_connected: z
    .string()
    .regex(/^\d{4}$/, 'Year must be a 4-digit number')
    .refine(val => {
      const year = parseInt(val);
      return year >= 1900 && year <= new Date().getFullYear();
    }, 'Year must be between 1900 and current year'),
  
  first_encounter: z
    .string()
    .min(10, 'Please describe your first encounter')
    .max(2000, 'Description too long'),
  
  resonated_quality: z
    .enum([
      'Stillness', 'Clarity', 'Discipline', 'Accountability',
      'Compassion', 'Presence', 'Ethical_Firmness', 'Self_Awareness',
      'Inner_Discipline', 'Reflective_Silence', 'Ethical_Conduct',
      'Shared_Responsibility',
    ]),
  
  life_changes: z
    .string()
    .min(10, 'Please describe life changes')
    .max(2000, 'Description too long'),
  
  continuing_engagement: z
    .string()
    .min(10, 'Please describe continuing engagement')
    .max(2000, 'Description too long'),
  
  consent_accepted: z
    .boolean()
    .refine(val => val === true, {
      message: 'You must accept consent to proceed',
    }),
  
  turnstileToken: z.string().optional(),
});

// POST /api/registrations - Submit new registration
export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  
  try {
    // Rate limiting check
    const rateLimit = checkRateLimit(`registration:${clientIP}`, rateLimitConfigs.registration);
    if (!rateLimit.allowed) {
      logRateLimitViolation(clientIP, '/api/registrations');
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
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
        logBotVerificationFailure(clientIP, '/api/registrations', botCheck.error || 'Unknown');
        return NextResponse.json(
          { error: 'Bot verification failed. Please try again.' },
          { status: 403 }
        );
      }
    }
    
    // Remove turnstile token before validation
    const { turnstileToken: _, ...registrationData } = body;
    
    // Sanitize string fields
    const sanitizedData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(registrationData)) {
      if (typeof value === 'string') {
        sanitizedData[key] = sanitizeText(value, 2000);
      } else {
        sanitizedData[key] = value;
      }
    }
    
    // Validate
    const validation = registrationSchema.safeParse(sanitizedData);
    if (!validation.success) {
      const errorField = validation.error.issues[0]?.path[0] || 'unknown';
      logValidationFailure(clientIP, '/api/registrations', errorField as string, validation.error.message);
      return NextResponse.json(
        { error: validation.error.message },
        { status: 400 }
      );
    }
    
    const registration = await registrationService.create({
      full_name: validation.data.full_name,
      country: validation.data.country,
      city: validation.data.city,
      gender: validation.data.gender,
      profession: validation.data.profession,
      year_connected: parseInt(validation.data.year_connected),
      first_encounter: validation.data.first_encounter,
      resonated_quality: validation.data.resonated_quality,
      life_changes: validation.data.life_changes,
      continuing_engagement: validation.data.continuing_engagement,
      consent_accepted: validation.data.consent_accepted,
    });

    return NextResponse.json({ success: true, id: registration.id });
  } catch (error) {
    console.error('Failed to create registration:', error);
    return NextResponse.json(
      { error: 'Failed to submit registration' },
      { status: 500 }
    );
  }
}
