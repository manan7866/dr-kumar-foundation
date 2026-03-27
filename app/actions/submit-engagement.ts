"use server";

import prisma from '@/lib/prisma';
import { z } from 'zod';
import {
  healingCollaborationSchema,
  environmentalCollaborationSchema,
  youthCollaborationSchema,
  musicCollaborationSchema,
  ecommerceCollaborationSchema,
  scienceCollaborationSchema,
  healingSupportSchema,
  musicSupportSchema,
  healingInquirySchema,
  interfaithCollaborationSchema,
  interfaithSupportSchema,
  interfaithInquirySchema,
} from '@/lib/form-schemas';
import { sendEngagementConfirmation } from '@/lib/email/send-engagement-confirmation';
import {
  checkRateLimit,
  rateLimitConfigs,
  getClientIP,
  validateTurnstileToken,
  logRateLimitViolation,
  logBotVerificationFailure,
  sanitizeText,
  sanitizeEmail,
} from '@/lib/security/utils';

interface SubmitEngagementResult {
  success: boolean;
  message: string;
  error?: string;
}

// Map program types to readable names
const programNames: Record<string, string> = {
  'healing-initiatives': 'Healing Initiatives',
  'environmental-programs': 'Environmental Programs',
  'youth-engagement': 'Youth Engagement',
  'sufi-music': 'Sufi Music',
  'sufi-ecommerce': 'Sufi Ecommerce',
  'sufi-science': 'Sufi Science',
  'interfaith-program': 'Interfaith Program',
};

// Extended schemas with bot verification
const extendedSchemas = {
  healingCollaboration: healingCollaborationSchema.extend({ turnstileToken: z.string().optional() }),
  environmentalCollaboration: environmentalCollaborationSchema.extend({ turnstileToken: z.string().optional() }),
  youthCollaboration: youthCollaborationSchema.extend({ turnstileToken: z.string().optional() }),
  musicCollaboration: musicCollaborationSchema.extend({ turnstileToken: z.string().optional() }),
  ecommerceCollaboration: ecommerceCollaborationSchema.extend({ turnstileToken: z.string().optional() }),
  scienceCollaboration: scienceCollaborationSchema.extend({ turnstileToken: z.string().optional() }),
  healingSupport: healingSupportSchema.extend({ turnstileToken: z.string().optional() }),
  musicSupport: musicSupportSchema.extend({ turnstileToken: z.string().optional() }),
  healingInquiry: healingInquirySchema.extend({ turnstileToken: z.string().optional() }),
  interfaithCollaboration: interfaithCollaborationSchema.extend({ turnstileToken: z.string().optional() }),
  interfaithSupport: interfaithSupportSchema.extend({ turnstileToken: z.string().optional() }),
  interfaithInquiry: interfaithInquirySchema.extend({ turnstileToken: z.string().optional() }),
};

export async function submitEngagement(
  program: string,
  formType: string,
  formData: Record<string, unknown>
): Promise<SubmitEngagementResult> {
  const clientIP = getClientIP({ headers: new Headers() } as Request);
  const turnstileToken = formData.turnstileToken as string | undefined;
  
  try {
    // Rate limiting check
    const rateLimit = checkRateLimit(`engagement:${clientIP}`, rateLimitConfigs.engagement);
    if (!rateLimit.allowed) {
      logRateLimitViolation(clientIP, `/api/engagement/${program}/${formType}`);
      return {
        success: false,
        message: 'Too many submissions. Please try again later.',
        error: 'Rate limit exceeded',
      };
    }
    
    // Bot verification (skip in development if no secret key)
    if (process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
      const botCheck = await validateTurnstileToken(turnstileToken);
      if (!botCheck.valid) {
        logBotVerificationFailure(clientIP, `/api/engagement/${program}/${formType}`, botCheck.error || 'Unknown');
        return {
          success: false,
          message: 'Bot verification failed. Please try again.',
          error: botCheck.error,
        };
      }
    }
    
    // Remove turnstile token from formData before validation
    const { turnstileToken: _, ...cleanFormData } = formData;
    
    // Sanitize string fields
    const sanitizedData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(cleanFormData)) {
      if (typeof value === 'string') {
        if (key === 'email') {
          sanitizedData[key] = sanitizeEmail(value);
        } else if (key === 'fullName' || key === 'name') {
          sanitizedData[key] = sanitizeText(value, 100);
        } else {
          sanitizedData[key] = sanitizeText(value, 5000);
        }
      } else {
        sanitizedData[key] = value;
      }
    }
    
    // Validate based on program type and form type
    let validatedData;

    // Support forms
    if (formType === 'support') {
      switch (program) {
        case 'healing-initiatives':
          validatedData = extendedSchemas.healingSupport.parse(sanitizedData);
          break;
        case 'sufi-music':
          validatedData = extendedSchemas.musicSupport.parse(sanitizedData);
          break;
        case 'interfaith-program':
          validatedData = extendedSchemas.interfaithSupport.parse(sanitizedData);
          break;
        default:
          return {
            success: false,
            message: 'Invalid program type',
            error: 'Invalid program type',
          };
      }
    }
    // Inquiry forms
    else if (formType === 'inquiry') {
      switch (program) {
        case 'healing-initiatives':
          validatedData = extendedSchemas.healingInquiry.parse(sanitizedData);
          break;
        case 'interfaith-program':
          validatedData = extendedSchemas.interfaithInquiry.parse(sanitizedData);
          break;
        default:
          return {
            success: false,
            message: 'Invalid program type',
            error: 'Invalid program type',
          };
      }
    }
    // Collaboration forms
    else {
      switch (program) {
        case 'healing-initiatives':
          validatedData = extendedSchemas.healingCollaboration.parse(sanitizedData);
          break;
        case 'environmental-programs':
          validatedData = extendedSchemas.environmentalCollaboration.parse(sanitizedData);
          break;
        case 'youth-engagement':
          validatedData = extendedSchemas.youthCollaboration.parse(sanitizedData);
          break;
        case 'sufi-music':
          validatedData = extendedSchemas.musicCollaboration.parse(sanitizedData);
          break;
        case 'sufi-ecommerce':
          validatedData = extendedSchemas.ecommerceCollaboration.parse(sanitizedData);
          break;
        case 'sufi-science':
          validatedData = extendedSchemas.scienceCollaboration.parse(sanitizedData);
          break;
        case 'interfaith-program':
          validatedData = extendedSchemas.interfaithCollaboration.parse(sanitizedData);
          break;
        default:
          return {
            success: false,
            message: 'Invalid program type',
            error: 'Invalid program type',
          };
      }
    }

    // Remove file data from payload (handle separately if needed)
    const cleanData = Object.fromEntries(
      Object.entries(validatedData as Record<string, unknown>).filter(
        ([key]) => !['proposalFile', 'sampleFile', 'researchPaper', 'turnstileToken'].includes(key)
      )
    );

    // Store in database
    const engagement = await prisma.engagementRequest.create({
      data: {
        program_type: program,
        form_type: formType,
        payload: JSON.stringify(cleanData),
        status: 'pending',
      },
    });

    // Send confirmation email if user email is available
    const userEmail = (cleanData as Record<string, unknown>).email as string;
    const userName = ((cleanData as Record<string, unknown>).fullName || (cleanData as Record<string, unknown>).name || 'Valued Contributor') as string;
    const programName = programNames[program] || program;

    if (userEmail) {
      try {
        await sendEngagementConfirmation(userEmail, userName, formType, programName);
        console.log('[Engagement] Confirmation email sent to:', userEmail);
      } catch (emailError) {
        console.error('[Engagement] Failed to send confirmation email:', emailError);
        // Don't fail the submission if email fails
      }
    }

    return {
      success: true,
      message: 'Your submission has been recorded and will undergo institutional review. A confirmation email has been sent to your email address.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues?.[0]?.message ?? 'Invalid form data';
      return {
        success: false,
        message: 'Validation failed',
        error: errorMessage,
      };
    }

    console.error('Engagement submission error:', error);
    return {
      success: false,
      message: 'Submission failed',
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
