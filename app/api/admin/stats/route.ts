import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateAdmin } from '@/lib/auth';

// GET /api/admin/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    // Authenticate and check for super_admin role
    const { user, response } = await authenticateAdmin(request, ['super_admin']);
    if (response) return response;

    const [
      totalMembers,
      pendingRegistrations,
      publishedMembers,
      totalGatherings,
      totalRegions,
      governanceMembers,
    ] = await Promise.all([
      prisma.member.count(),
      prisma.registration.count({ where: { review_status: 'pending' } }),
      prisma.member.count({ where: { visibility_status: 'published', approved: true } }),
      prisma.gathering.count(),
      prisma.region.count(),
      prisma.foundationGovernance.count({ where: { is_active: true } }),
    ]);

    return NextResponse.json({
      totalMembers,
      pendingRegistrations,
      publishedMembers,
      totalGatherings,
      totalRegions,
      governanceMembers,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
