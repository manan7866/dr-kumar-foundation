import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP email using Resend
 * @param email - Recipient email address
 * @param username - User's name
 * @param otp - The OTP code
 */
export async function sendOTPEmail(
  email: string,
  username: string,
  otp: string
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[Resend] Sending email to:', email);
    console.log('[Resend] Template ID:', 'welcome-verification');
    console.log('[Resend] Variables:', { username, otp });

    const { data, error } = await resend.emails.send({
      from: 'Dr. Kumar Foundation <info@sufisciencecenter.info>',
      to: [email],
      subject: 'Verify Your Email - Dr. Kumar Foundation',
      template: {
        id: 'welcome-verification',
        variables: {
          username: username,
          otp: otp,
        },
      },
    });

    if (error) {
      console.error('[Resend] Full error object:', JSON.stringify(error, null, 2));
      return {
        success: false,
        error: error.message,
      };
    }

    console.log('[Resend] Email sent successfully:', data);
    return {
      success: true,
    };
  } catch (error) {
    console.error('[Resend] Exception sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

/**
 * Resend OTP email
 */
export async function resendOTPEmail(
  email: string,
  username: string,
  otp: string
): Promise<{ success: boolean; error?: string }> {
  return sendOTPEmail(email, username, otp);
}
