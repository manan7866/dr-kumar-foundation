import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send engagement form submission confirmation email
 * @param email - Recipient email address
 * @param userName - User's name
 * @param formType - Type of form (collaborate, support, inquiry)
 * @param programName - Name of the program
 */
export async function sendEngagementConfirmation(
  email: string,
  userName: string,
  formType: string,
  programName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[Resend] Sending engagement confirmation to:', email);
    console.log('[Resend] Template ID:', 'form-submission-confirmation');
    console.log('[Resend] Variables:', { user_name: userName, form_type: formType, program_name: programName });

    const { data, error } = await resend.emails.send({
      from: 'Dr. Kumar Foundation <info@sufisciencecenter.info>',
      to: [email],
      subject: `Thank You for Your ${formType.charAt(0).toUpperCase() + formType.slice(1)} - Dr. Kumar Foundation`,
      template: {
        id: 'form-submission-confirmation',
        variables: {
          user_name: userName,
          form_type: formType,
          program_name: programName,
        },
      },
    });

    if (error) {
      console.error('[Resend] Error sending engagement confirmation:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    console.log('[Resend] Engagement confirmation sent successfully:', data);
    return {
      success: true,
    };
  } catch (error) {
    console.error('[Resend] Exception sending engagement confirmation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send confirmation email',
    };
  }
}
