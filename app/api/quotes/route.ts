import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const DEFAULT_PAGE_SIZE = 9;

// GET /api/quotes - Get quotes with filtering, sorting, and pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || String(DEFAULT_PAGE_SIZE));
    
    // Filters
    const category = searchParams.get('category') || '';
    const tag = searchParams.get('tag') || '';
    const search = searchParams.get('search') || '';
    const readingType = searchParams.get('readingType') || ''; // featured, short, deep
    
    // Sorting
    const sort = searchParams.get('sort') || 'recommended';
    
    // Build where clause
    const whereClause: any = {
      isActive: true,
    };

    // Category filter
    if (category && category !== 'All') {
      whereClause.primaryCategory = category;
    }

    // Search filter
    if (search) {
      whereClause.OR = [
        { text: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { primaryCategory: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Reading type filter
    if (readingType === 'featured') {
      whereClause.isFeatured = true;
    } else if (readingType === 'short') {
      whereClause.text = { lt: 150 };
    } else if (readingType === 'deep') {
      whereClause.text = { gte: 150 };
    }

    // Build order by
    const orderBy: any = [];
    
    if (sort === 'featured') {
      orderBy.push({ isFeatured: 'desc' });
      orderBy.push({ displayOrder: 'asc' });
    } else if (sort === 'newest') {
      orderBy.push({ createdAt: 'desc' });
    } else if (sort === 'mostRead') {
      orderBy.push({ viewCount: 'desc' });
    } else {
      // recommended: featured first, then by display order
      orderBy.push({ isFeatured: 'desc' });
      orderBy.push({ displayOrder: 'asc' });
    }

    // Get total count for pagination
    const total = await prisma.quote.count({
      where: whereClause,
    });

    // Get quotes with categories and tags
    const quotes = await prisma.quote.findMany({
      where: whereClause,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json({
      quotes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
