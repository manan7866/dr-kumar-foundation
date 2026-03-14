import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateAdmin } from '@/lib/auth';

// GET /api/admin/engagement - Get all engagement requests
export async function GET(request: NextRequest) {
  try {
    // Authenticate and check for super_admin or moderator role
    const { user, response } = await authenticateAdmin(request, ['super_admin', 'moderator']);
    if (response) return response;

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all';
    const programType = searchParams.get('program_type');
    const formType = searchParams.get('form_type');

    const where: {
      status?: string;
      program_type?: string;
      form_type?: string;
    } = {};

    if (status !== 'all') {
      where.status = status;
    }

    if (programType) {
      where.program_type = programType;
    }

    if (formType) {
      where.form_type = formType;
    }

    const engagements = await prisma.engagementRequest.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(engagements);
  } catch (error) {
    console.error('Failed to fetch engagement requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch engagement requests' },
      { status: 500 }
    );
  }
}
