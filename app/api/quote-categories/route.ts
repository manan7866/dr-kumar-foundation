import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/quote-categories - Get all quote categories
export async function GET() {
  try {
    const categories = await prisma.quoteCategory.findMany({
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

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
