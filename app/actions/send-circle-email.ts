"use server";

import { sendCircleConfirmation } from '@/lib/email/send-circle-confirmation';

export async function sendCircleRegistrationEmail(email: string, username: string) {
  try {
    return await sendCircleConfirmation(email, username);
  } catch (error) {
    console.error('[Server Action] Failed to send Circle confirmation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}
