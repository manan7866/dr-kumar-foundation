import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/quotes - Get all quotes with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const whereClause: any = { isActive: true };

    // Search filter
    if (search) {
      whereClause.OR = [
        { text: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { primaryCategory: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Category filter
    if (category && category !== 'All') {
      whereClause.primaryCategory = category;
    }

    const quotes = await prisma.quote.findMany({
      where: whereClause,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      include: {
        categories: { include: { category: true } },
      },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/quotes - Create a new quote
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, text, excerpt, primaryCategory, isFeatured = false, displayOrder = 0, isActive = true } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Generate slug from title or text
    const slugBase = (title || text).split(' ').slice(0, 5).join('-').toLowerCase().replace(/[^a-z0-9-]/g, '');
    const slug = `${slugBase}-${Date.now()}`;

    const quote = await prisma.quote.create({
      data: {
        slug,
        title: title || null,
        text,
        excerpt: excerpt || (text.length > 150 ? text.slice(0, 150) + '...' : null),
        primaryCategory,
        isFeatured,
        displayOrder,
        isActive,
        author: 'Dr. Kumar',
      },
    });

    // Create category mapping if category provided
    if (primaryCategory) {
      const category = await prisma.quoteCategory.findFirst({ where: { name: primaryCategory } });
      if (category) {
        await prisma.quoteCategoryMap.create({
          data: { quoteId: quote.id, categoryId: category.id },
        });
      }
    }

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Failed to create quote:', error);
    return NextResponse.json(
      { error: 'Failed to create quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
