import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/user/submissions - Get current user's submissions
export async function GET(request: NextRequest) {
  try {
    // Get user ID from query or session
    const userId = request.nextUrl.searchParams.get('user_id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    // Get user to verify exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, full_name: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get all engagement requests for this user (by email in payload)
    const allEngagements = await prisma.engagementRequest.findMany({
      orderBy: { created_at: 'desc' },
    });

    // Filter engagements by user email
    const userEngagements = allEngagements.filter((engagement: { payload: string }) => {
      try {
        const payload = JSON.parse(engagement.payload);
        return payload.email === user.email;
      } catch {
        return false;
      }
    });

    // Check if user has a Circle registration
    const allRegistrations = await prisma.registration.findMany({
      orderBy: { created_at: 'desc' },
    });

    const userRegistration = allRegistrations.find((reg: { full_name: string }) => 
      reg.full_name.toLowerCase() === user.full_name.toLowerCase()
    );

    // Check if user is a member
    const allMembers = await prisma.member.findMany({
      orderBy: { created_at: 'desc' },
    });

    const userMember = allMembers.find((member: { full_name: string }) =>
      member.full_name.toLowerCase() === user.full_name.toLowerCase()
    );

    return NextResponse.json({
      engagements: userEngagements,
      circleRegistration: userRegistration || null,
      isMember: !!userMember,
      memberData: userMember || null,
    });
  } catch (error) {
    console.error('Failed to fetch user submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
