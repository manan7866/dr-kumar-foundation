"use server";

import { sendContactConfirmation } from '@/lib/email/send-contact-confirmation';

export async function submitContactForm(
  fullName: string,
  email: string,
  subject: string,
  message: string
) {
  try {
    // Send confirmation email to user
    const emailResult = await sendContactConfirmation(email, fullName, subject, message);
    
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
      error: error instanceof Error ? error.message : 'Failed to submit form',
    };
  }
}
