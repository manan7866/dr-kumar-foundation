import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get user ID from session cookie or header
    // For now, we'll rely on the client to pass user ID
    // This endpoint is mainly for refreshing avatar_url
    
    return NextResponse.json({
      success: true,
      message: 'Use /api/admin/profile/update to get user data'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get session' },
      { status: 500 }
    );
  }
}
