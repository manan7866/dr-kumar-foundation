import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/quote-tags - Get all quote tags
export async function GET() {
  try {
    const tags = await prisma.quoteTag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            quotes: {
              where: {
                quote: {
                  isActive: true,
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
