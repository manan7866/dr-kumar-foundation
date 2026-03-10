import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send Circle membership application confirmation email
 * @param email - Recipient email address
 * @param username - User's name
 */
export async function sendCircleConfirmation(
  email: string,
  username: string
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[Resend] Sending Circle confirmation to:', email);
    console.log('[Resend] Template ID:', 'membership-application-confirmation');
    console.log('[Resend] Variables:', { username });

    const { data, error } = await resend.emails.send({
      from: 'Dr. Kumar Foundation <info@sufisciencecenter.info>',
      to: [email],
      subject: 'Thank You for Your Membership Application - Dr. Kumar Foundation',
      template: {
        id: 'membership-application-confirmation',
        variables: {
          username: username,
        },
      },
    });

    if (error) {
      console.error('[Resend] Error sending Circle confirmation:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    console.log('[Resend] Circle confirmation sent successfully:', data);
    return {
      success: true,
    };
  } catch (error) {
    console.error('[Resend] Exception sending Circle confirmation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send confirmation email',
    };
  }
}
