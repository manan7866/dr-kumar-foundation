import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getOTP, deleteOTP } from '@/lib/otp-cache';

// POST /api/auth/register/verify-otp
// Verifies OTP and creates user account
export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    // Get OTP from file-based cache
    const otpData = getOTP(email);

    if (!otpData) {
      return NextResponse.json(
        { error: 'No verification code found. Please request a new one.' },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    if (Date.now() > otpData.expiresAt) {
      deleteOTP(email);
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // OTP is valid - create user
    const { full_name, password } = otpData.userData;

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user with PENDING status
    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password_hash: passwordHash,
        role: 'moderator',
        is_active: false, // Inactive until admin approval
        approval_status: 'pending',
        assigned_programs: [],
      },
    });

    // Remove OTP from cache
    deleteOTP(email);

    // Log the registration
    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        entity_type: 'User',
        entity_id: user.id,
        user_id: user.id,
        user_email: user.email,
        user_role: user.role,
        ip_address: '127.0.0.1',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully. Your account is pending admin approval.',
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      },
    });
  } catch (error) {
    console.error('[Register] Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
