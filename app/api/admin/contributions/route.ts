import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/contributions - Get all contributions for admin review
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all';
    const programType = searchParams.get('program_type');
    const role = searchParams.get('role');

    const where: {
      status?: string;
      program_type?: string;
    } = {};
    if (status !== 'all') {
      where.status = status;
    }
    if (programType) {
      where.program_type = programType;
    }

    const contributions = await prisma.contribution.findMany({
      where,
      include: {
        user_program: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { submitted_at: 'desc' },
    });

    return NextResponse.json(contributions);
  } catch (error) {
    console.error('Failed to fetch contributions:', error);
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
  }
}
