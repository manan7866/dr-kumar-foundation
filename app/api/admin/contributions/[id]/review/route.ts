import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/contributions/[id]/review - Review contribution
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, adminComment, adminId, programType } = body;

    if (!['approved', 'rejected', 'revision_requested'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Update contribution
    const contribution = await prisma.contribution.update({
      where: { id },
      data: {
        status,
        admin_comment: adminComment,
        reviewed_at: new Date(),
        reviewed_by: adminId,
      },
    });

    // If approved, update user role based on program type
    if (status === 'approved') {
      const roleMap: Record<string, string> = {
        'healing-initiatives': 'healing_contributor',
        'environmental-programs': 'environmental_contributor',
        'youth-engagement': 'youth_contributor',
        'sufi-music': 'music_contributor',
        'sufi-ecommerce': 'ecommerce_contributor',
        'sufi-science': 'science_contributor',
        'interfaith-program': 'interfaith_contributor',
      };

      const newRole = roleMap[programType];
      if (newRole) {
        await prisma.user.update({
          where: { id: contribution.user_id },
          data: { role: newRole as 'contributor' | 'healing_contributor' | 'environmental_contributor' },
        });
      }

      // Create notification
      await prisma.notification.create({
        data: {
          user_id: contribution.user_id,
          title: 'Contribution Approved!',
          message: `Your ${programType} contribution has been approved.`,
          type: 'contribution',
          link: '/dashboard/contributions',
        },
      });
    }

    return NextResponse.json({ success: true, contribution });
  } catch (error) {
    console.error('Failed to review contribution:', error);
    return NextResponse.json({ error: 'Failed to review contribution' }, { status: 500 });
  }
}
