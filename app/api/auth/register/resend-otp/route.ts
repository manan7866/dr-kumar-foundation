import { NextRequest, NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/email/send-otp';
import { getOTP, setOTP } from '@/lib/otp-cache';

// POST /api/auth/register/resend-otp
// Resends OTP to email
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if OTP exists in cache
    const otpData = getOTP(email);

    if (!otpData) {
      return NextResponse.json(
        { error: 'No pending registration found. Please register first.' },
        { status: 400 }
      );
    }

    // Check rate limiting (prevent spam)
    const now = Date.now();
    if (otpData.lastSent && (now - otpData.lastSent) < 60000) {
      const waitTime = Math.ceil((60000 - (now - otpData.lastSent)) / 1000);
      return NextResponse.json(
        { error: `Please wait ${waitTime} seconds before requesting a new code` },
        { status: 429 }
      );
    }

    // Generate new OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const newExpiresAt = now + 10 * 60 * 1000; // 10 minutes

    // Update cache with new OTP
    setOTP(email, {
      otp: newOTP,
      expiresAt: newExpiresAt,
      userData: otpData.userData,
      lastSent: now,
    });

    // Send OTP email
    const { full_name } = otpData.userData;
    const emailResult = await sendOTPEmail(email, full_name, newOTP);

    if (!emailResult.success) {
      console.error('[Resend OTP] Failed to send email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code resent to your email',
      expiresAt: newExpiresAt,
    });
  } catch (error) {
    console.error('[Resend OTP] Error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
