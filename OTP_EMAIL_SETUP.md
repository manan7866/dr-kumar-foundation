# OTP Email Verification Setup

## Overview

Email verification using Resend with custom template for user registration.

## Configuration

### Environment Variables (.env)

```env
# Resend Email Service
RESEND_API_KEY=re_erB6mRvH_3Q8T6DbGF3zVkKMH2rMSUSxs
EMAIL_FROM="Dr. Kumar Foundation <info@sufisciencecenter.info>"
```

### Resend Template

- **Template ID**: `welcome-verification`
- **Variables**: 
  - `username` - User's full name
  - `otp` - 6-digit verification code

## Registration Flow

### 1. User Signs Up
```
User fills signup form
  ↓
Frontend calls /api/auth/register/request-otp
  ↓
Backend generates 6-digit OTP
  ↓
OTP stored in memory cache with user data
  ↓
Email sent via Resend with template
  ↓
User redirected to OTP verification form
```

### 2. User Verifies Email
```
User enters 6-digit OTP
  ↓
Frontend calls /api/auth/register/verify-otp
  ↓
Backend validates OTP
  ↓
If valid: User account created in database
  ↓
If invalid: Error message shown
  ↓
User logged in automatically
```

### 3. Resend OTP (if needed)
```
User clicks "Resend Code"
  ↓
Frontend calls /api/auth/register/resend-otp
  ↓
Backend generates new OTP
  ↓
New email sent via Resend
  ↓
30-second cooldown timer starts
```

## API Endpoints

### POST /api/auth/register/request-otp

**Request:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Verification code sent to your email",
  "email": "john@example.com",
  "expiresAt": 1234567890000
}
```

### POST /api/auth/register/verify-otp

**Request:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email verified successfully. Your account is pending admin approval.",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "full_name": "John Doe"
  }
}
```

### POST /api/auth/register/resend-otp

**Request:**
```json
{
  "email": "john@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Verification code resent to your email",
  "expiresAt": 1234567890000
}
```

## Features

### Security
- ✅ 6-digit random OTP
- ✅ 10-minute expiration
- ✅ Rate limiting (30-second cooldown for resend)
- ✅ Password hashing with bcrypt (12 rounds)
- ✅ Email validation
- ✅ Duplicate email check

### User Experience
- ✅ Clean OTP input with auto-focus
- ✅ Paste support for OTP
- ✅ Resend cooldown timer
- ✅ Clear error messages
- ✅ Loading states

### Email Template
Uses Resend template `welcome-verification` with variables:
- `username` - Personalized greeting
- `otp` - Large, clear verification code

## File Structure

```
app/
├── api/
│   └── auth/
│       └── register/
│           ├── request-otp/route.ts    # Send OTP email
│           ├── verify-otp/route.ts     # Verify OTP & create user
│           └── resend-otp/route.ts     # Resend OTP email
└── components/
    └── auth/
        ├── SignUpForm.tsx              # Updated to use OTP flow
        ├── OtpForm.tsx                 # OTP verification UI
        └── AuthModal.tsx               # Modal wrapper

lib/
└── email/
    └── send-otp.ts                     # Resend email utility
```

## Testing

### Manual Test Flow

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Test Registration:**
   - Click "Create Account" in header
   - Fill in registration form
   - Check email for OTP
   - Enter OTP in verification form
   - Verify account created (pending admin approval)

3. **Test Resend:**
   - During OTP verification, click "Resend Code"
   - Verify cooldown timer appears
   - Check email for new OTP
   - Verify new OTP works

### Expected Email Content

```
Subject: Verify Your Email - Dr. Kumar Foundation

Hello [username],

Welcome to Dr. Kumar Foundation!

Your verification code is:

[OTP]

This code will expire in 10 minutes.

If you didn't request this code, please ignore this email.

Best regards,
Dr. Kumar Foundation Team
```

## Troubleshooting

### Email Not Sending

1. Check Resend API key in .env
2. Verify template ID is correct
3. Check Resend dashboard for errors
4. Ensure from email is verified in Resend

### OTP Not Working

1. Check if OTP is expired (10 minutes)
2. Verify email matches exactly
3. Check cache is working (not cleared)
4. Try requesting new OTP

### Rate Limiting

- 30-second cooldown between resend requests
- Error message shows remaining wait time
- Cooldown resets after successful verification

## Production Notes

### For Production Deployment:

1. **Use Redis for OTP Storage** (instead of in-memory cache):
   ```typescript
   // Replace otpCache Map with Redis
   import { Redis } from 'ioredis';
   const redis = new Redis(process.env.REDIS_URL);
   
   // Store OTP
   await redis.setex(`otp:${email}`, 600, otp); // 10 minutes
   
   // Retrieve OTP
   const otp = await redis.get(`otp:${email}`);
   ```

2. **Environment Variables**:
   - Use production Resend API key
   - Set production email from address
   - Add REDIS_URL for OTP storage

3. **Email Template**:
   - Ensure Resend template is deployed to production
   - Update template variables if needed

## API Keys & Credentials

- **Resend Dashboard**: https://resend.com/dashboard
- **API Key**: Stored in .env as RESEND_API_KEY
- **Template**: welcome-verification
- **From Email**: info@sufisciencecenter.info
