# Engagement Form Confirmation Email

## Overview

Automatic email confirmation for engagement form submissions (Collaboration, Support, Inquiry).

## Configuration

### Environment Variables (.env)

```env
# Resend Email Service
RESEND_API_KEY=re_erB6mRvH_3Q8T6DbGF3zVkKMH2rMSUSxs
EMAIL_FROM="Dr. Kumar Foundation <info@sufisciencecenter.info>"
```

### Resend Template

- **Template ID**: `form-submission-confirmation`
- **Variables**: 
  - `user_name` - User's full name
  - `form_type` - Type of form (collaborate, support, inquiry)
  - `program_name` - Name of the program

## How It Works

### Submission Flow

```
User fills engagement form
  ↓
Frontend calls submitEngagement()
  ↓
Backend validates form data
  ↓
Stores in engagement_request table
  ↓
Extracts email, name, program from form data
  ↓
Sends confirmation email via Resend
  ↓
Returns success message to user
```

### Email Trigger Points

Email is sent automatically after successful submission for:
- ✅ Collaboration forms (all programs)
- ✅ Support forms (healing, music, interfaith)
- ✅ Inquiry forms (healing, interfaith)

### Programs Supported

| Program | Collaboration | Support | Inquiry |
|---------|--------------|---------|---------|
| Healing Initiatives | ✅ | ✅ | ✅ |
| Environmental Programs | ✅ | ❌ | ❌ |
| Youth Engagement | ✅ | ❌ | ❌ |
| Sufi Music | ✅ | ✅ | ❌ |
| Sufi Ecommerce | ✅ | ❌ | ❌ |
| Sufi Science | ✅ | ❌ | ❌ |
| Interfaith Program | ✅ | ✅ | ✅ |

## API Integration

### sendEngagementConfirmation Function

```typescript
import { sendEngagementConfirmation } from '@/lib/email/send-engagement-confirmation';

await sendEngagementConfirmation(
  email,        // User's email address
  userName,     // User's name
  formType,     // 'collaborate' | 'support' | 'inquiry'
  programName   // e.g., 'Healing Initiatives'
);
```

### Response

```typescript
{
  success: true,
  // or
  success: false,
  error: 'Error message'
}
```

## Email Template Variables

Your Resend template `form-submission-confirmation` should use these variables:

### `{{user_name}}`
The user's full name from the form.

**Example values:**
- "John Doe"
- "Dr. Jane Smith"

### `{{form_type}}`
The type of form submitted.

**Values:**
- "collaborate" - Collaboration request
- "support" - Support request
- "inquiry" - General inquiry

### `{{program_name}}`
The readable program name.

**Example values:**
- "Healing Initiatives"
- "Environmental Programs"
- "Youth Engagement"
- "Sufi Music"
- "Sufi Ecommerce"
- "Sufi Science"
- "Interfaith Program"

## Example Email Content

```html
Subject: Thank You for Your Collaboration - Dr. Kumar Foundation

Dear {{user_name}},

Thank you for your interest in {{program_name}}.

We have received your {{form_type}} request and it will undergo 
institutional review. Our team will respond within 5-7 business days.

Best regards,
Dr. Kumar Foundation Team
```

## File Structure

```
lib/
└── email/
    └── send-engagement-confirmation.ts    # Email sending function

app/
└── actions/
    └── submit-engagement.ts               # Updated to send email
```

## Testing

### Manual Test

1. **Navigate to any engagement form:**
   - `/engage/healing-initiatives/collaboration`
   - `/engage/sufi-music/support`
   - `/engage/interfaith-program/inquiry`

2. **Fill out the form** with valid data including email

3. **Submit the form**

4. **Check email** for confirmation

5. **Verify email contains:**
   - Correct user name
   - Correct form type
   - Correct program name

### Expected Console Logs

```
[Engagement] Confirmation email sent to: user@example.com
[Resend] Sending engagement confirmation to: user@example.com
[Resend] Template ID: form-submission-confirmation
[Resend] Variables: { user_name: 'John Doe', form_type: 'collaborate', program_name: 'Healing Initiatives' }
[Resend] Engagement confirmation sent successfully: { id: '...' }
```

## Error Handling

### Email Fails Silently

If the email fails to send, the submission still succeeds. The error is logged but doesn't block the user.

```typescript
try {
  await sendEngagementConfirmation(...);
} catch (emailError) {
  console.error('Failed to send confirmation email:', emailError);
  // Don't fail the submission
}
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Missing template` | Template ID incorrect | Verify template exists in Resend dashboard |
| `Invalid API key` | Wrong RESEND_API_KEY | Check .env file |
| `Missing variables` | Template variables not passed | Verify variable names match template |

## Production Notes

### For Production:

1. **Use production Resend API key**
2. **Update from email** to production domain
3. **Monitor email delivery** in Resend dashboard
4. **Set up email analytics** if needed

### Rate Limiting

Resend has rate limits:
- Free tier: 100 emails/day
- Pro tier: 3,000 emails/month

Monitor usage in Resend dashboard.

## Troubleshooting

### Email Not Sending

1. Check Resend API key in .env
2. Verify template ID is correct
3. Check Resend dashboard for errors
4. Ensure from email is verified

### Wrong Variables in Email

1. Verify form field names match extraction logic
2. Check template variable names match exactly
3. Test with different form types

### Email Goes to Spam

1. Verify domain DNS records (SPF, DKIM, DMARC)
2. Check Resend domain settings
3. Use a verified production domain

## Related Documentation

- [OTP Email Setup](./OTP_EMAIL_SETUP.md)
- [Resend Documentation](https://resend.com/docs)
- [Engagement Forms](./ENGAGEMENT_FORMS.md)
