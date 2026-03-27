"use server";

import { z } from 'zod';
import { sendContactConfirmation } from '@/lib/email/send-contact-confirmation';
import {
  sanitizeText,
  sanitizeEmail,
  sanitizeForEmailHeader,
  checkRateLimit,
  rateLimitConfigs,
  getClientIP,
  validateTurnstileToken,
  logRateLimitViolation,
  logBotVerificationFailure,
  logValidationFailure,
} from '@/lib/security/utils';

// Strict validation schema for contact form
const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[\p{L}\p{M}\s.'-]+$/u, 'Name contains invalid characters'),
  
  email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email address too long'),
  
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must not exceed 5000 characters'),
  
  // Bot verification token (optional in dev, required in prod)
  turnstileToken: z.string().optional(),
});

export async function submitContactForm(
  fullName: string,
  email: string,
  subject: string,
  message: string,
  turnstileToken?: string
) {
  const clientIP = getClientIP({ headers: new Headers() } as Request);
  
  try {
    // Rate limiting check
    const rateLimit = checkRateLimit(`contact:${clientIP}`, rateLimitConfigs.contact);
    if (!rateLimit.allowed) {
      logRateLimitViolation(clientIP, '/api/contact');
      return {
        success: false,
        error: 'Too many submissions. Please try again later.',
      };
    }
    
    // Bot verification (skip in development if no secret key)
    if (process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
      const botCheck = await validateTurnstileToken(turnstileToken);
      if (!botCheck.valid) {
        logBotVerificationFailure(clientIP, '/api/contact', botCheck.error || 'Unknown');
        return {
          success: false,
          error: 'Bot verification failed. Please try again.',
        };
      }
    }
    
    // Validate input
    const validation = contactFormSchema.safeParse({
      fullName: sanitizeText(fullName, 100),
      email: sanitizeEmail(email),
      subject: sanitizeForEmailHeader(sanitizeText(subject, 200)),
      message: sanitizeText(message, 5000),
      turnstileToken,
    });
    
    if (!validation.success) {
      const errorField = validation.error.issues[0]?.path[0] || 'unknown';
      logValidationFailure(clientIP, '/api/contact', errorField as string, validation.error.message);
      return {
        success: false,
        error: validation.error.message,
      };
    }
    
    const { fullName: safeName, email: safeEmail, subject: safeSubject, message: safeMessage } = validation.data;
    
    // Send confirmation email to user
    const emailResult = await sendContactConfirmation(safeEmail, safeName, safeSubject, safeMessage);

    if (!emailResult.success) {
      console.error('[Contact] Failed to send confirmation email:', emailResult.error);
      // Don't fail the submission if email fails
    }

    return {
      success: true,
      message: 'Your message has been sent successfully. A confirmation email has been sent to your email address.',
    };
  } catch (error) {
    console.error('[Contact] Error submitting form:', error);
    return {
      success: false,
      error: 'Failed to submit form. Please try again.',
    };
  }
}
