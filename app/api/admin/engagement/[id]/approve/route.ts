import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/engagement/[id]/approve - Approve engagement request
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get the engagement request
    const engagement = await prisma.engagementRequest.findUnique({
      where: { id },
    });

    if (!engagement) {
      return NextResponse.json(
        { error: 'Engagement request not found' },
        { status: 404 }
      );
    }

    // Parse payload to get user email
    let userEmail = '';
    try {
      const payload = JSON.parse(engagement.payload);
      userEmail = payload.email;
    } catch (error) {
      console.error('Failed to parse engagement payload:', error);
      return NextResponse.json(
        { error: 'Invalid engagement data' },
        { status: 400 }
      );
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email not found in engagement' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Map program type to user role
    const roleMap: Record<string, string> = {
      'healing-initiatives': 'healing_contributor',
      'environmental-programs': 'environmental_contributor',
      'youth-engagement': 'youth_contributor',
      'sufi-music': 'music_contributor',
      'sufi-ecommerce': 'ecommerce_contributor',
      'sufi-science': 'science_contributor',
      'interfaith-program': 'interfaith_contributor',
    };

    const newRole = roleMap[engagement.program_type];

    // Update user role
    await prisma.user.update({
      where: { id: user.id },
      data: {
        role: (newRole || 'contributor') as 'contributor' | 'healing_contributor' | 'environmental_contributor' | 'youth_contributor' | 'music_contributor' | 'ecommerce_contributor' | 'science_contributor' | 'interfaith_contributor',
      },
    });

    // Create user_program entry
    await prisma.userProgram.upsert({
      where: {
        user_id_program_type: {
          user_id: user.id,
          program_type: engagement.program_type,
        },
      },
      update: {
        is_active: true,
      },
      create: {
        user_id: user.id,
        program_type: engagement.program_type,
        is_active: true,
      },
    });

    // Approve the engagement request
    const updatedEngagement = await prisma.engagementRequest.update({
      where: { id },
      data: {
        status: 'approved',
        reviewed_at: new Date(),
      },
    });

    console.log('[Engagement Approval] User role updated to:', newRole);
    console.log('[Engagement Approval] User program created for:', engagement.program_type);

    return NextResponse.json({
      success: true,
      engagement: updatedEngagement,
      user_id: user.id,
      user_role: newRole,
    });
  } catch (error) {
    console.error('Failed to approve engagement request:', error);
    return NextResponse.json(
      { error: 'Failed to approve engagement request' },
      { status: 500 }
    );
  }
}
