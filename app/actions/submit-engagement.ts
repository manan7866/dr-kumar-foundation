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

export async function submitEngagement(
  program: string,
  formType: string,
  formData: Record<string, any>
): Promise<SubmitEngagementResult> {
  try {
    // Validate based on program type and form type
    let validatedData;

    // Support forms
    if (formType === 'support') {
      switch (program) {
        case 'healing-initiatives':
          validatedData = healingSupportSchema.parse(formData);
          break;
        case 'sufi-music':
          validatedData = musicSupportSchema.parse(formData);
          break;
        case 'interfaith-program':
          validatedData = interfaithSupportSchema.parse(formData);
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
          validatedData = healingInquirySchema.parse(formData);
          break;
        case 'interfaith-program':
          validatedData = interfaithInquirySchema.parse(formData);
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
          validatedData = healingCollaborationSchema.parse(formData);
          break;
        case 'environmental-programs':
          validatedData = environmentalCollaborationSchema.parse(formData);
          break;
        case 'youth-engagement':
          validatedData = youthCollaborationSchema.parse(formData);
          break;
        case 'sufi-music':
          validatedData = musicCollaborationSchema.parse(formData);
          break;
        case 'sufi-ecommerce':
          validatedData = ecommerceCollaborationSchema.parse(formData);
          break;
        case 'sufi-science':
          validatedData = scienceCollaborationSchema.parse(formData);
          break;
        case 'interfaith-program':
          validatedData = interfaithCollaborationSchema.parse(formData);
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
    // Using type assertion since validatedData is a union type
    const cleanData = Object.fromEntries(
      Object.entries(validatedData as Record<string, any>).filter(
        ([key]) => !['proposalFile', 'sampleFile', 'researchPaper'].includes(key)
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
    const userEmail = (cleanData as any).email;
    const userName = (cleanData as any).fullName || (cleanData as any).name || 'Valued Contributor';
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
