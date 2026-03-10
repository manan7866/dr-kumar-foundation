import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send contact form submission confirmation email
 * @param email - Recipient email address
 * @param username - User's name
 * @param subject - Subject of the message
 * @param message - The message content
 */
export async function sendContactConfirmation(
  email: string,
  username: string,
  subject: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[Resend] Sending contact confirmation to:', email);
    console.log('[Resend] Template ID:', 'new-contact-message');
    console.log('[Resend] Variables:', { username, subject, message });

    const { data, error } = await resend.emails.send({
      from: 'Dr. Kumar Foundation <info@sufisciencecenter.info>',
      to: [email],
      subject: `Thank You for Contacting Us - ${subject}`,
      template: {
        id: 'new-contact-message',
        variables: {
          username: username,
          subject: subject,
          message: message,
        },
      },
    });

    if (error) {
      console.error('[Resend] Error sending contact confirmation:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    console.log('[Resend] Contact confirmation sent successfully:', data);
    return {
      success: true,
    };
  } catch (error) {
    console.error('[Resend] Exception sending contact confirmation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send confirmation email',
    };
  }
}
