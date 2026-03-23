import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const RECOMMENDATION_COUNT = 4;

// GET /api/quotes/[slug]/recommendations - Get recommended quotes
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Get the current quote
    const currentQuote = await prisma.quote.findUnique({
      where: { slug },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });

    if (!currentQuote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      );
    }

    const recommendedIds = new Set<string>();
    const recommendations: any[] = [];

    // Priority 1: Manually related quotes (from RelatedQuote table)
    const manualRelations = await prisma.relatedQuote.findMany({
      where: { quoteId: currentQuote.id },
      orderBy: { weight: 'desc' },
      include: {
        relatedQuote: {
          include: {
            categories: { include: { category: true } },
            tags: { include: { tag: true } },
          },
        },
      },
    });

    for (const relation of manualRelations) {
      if (recommendedIds.size >= RECOMMENDATION_COUNT) break;
      // Filter by isActive manually
      if (relation.relatedQuote.isActive && !recommendedIds.has(relation.relatedQuoteId)) {
        recommendedIds.add(relation.relatedQuoteId);
        recommendations.push(relation.relatedQuote);
      }
    }

    // Priority 2: Same category quotes
    if (recommendations.length < RECOMMENDATION_COUNT && currentQuote.primaryCategory) {
      const sameCategoryQuotes = await prisma.quote.findMany({
        where: {
          primaryCategory: currentQuote.primaryCategory,
          id: { not: currentQuote.id },
          isActive: true,
        },
        orderBy: [
          { isFeatured: 'desc' },
          { viewCount: 'desc' },
        ],
        take: RECOMMENDATION_COUNT - recommendations.length,
        include: {
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
        },
      });

      for (const quote of sameCategoryQuotes) {
        if (!recommendedIds.has(quote.id)) {
          recommendedIds.add(quote.id);
          recommendations.push(quote);
        }
      }
    }

    // Priority 3: Shared tags
    if (recommendations.length < RECOMMENDATION_COUNT && currentQuote.tags.length > 0) {
      const tagIds = currentQuote.tags.map(t => t.tagId);
      
      const sharedTagQuotes = await prisma.quote.findMany({
        where: {
          id: { not: currentQuote.id },
          isActive: true,
          tags: {
            some: {
              tagId: { in: tagIds },
            },
          },
        },
        orderBy: [
          { isFeatured: 'desc' },
          { viewCount: 'desc' },
        ],
        take: RECOMMENDATION_COUNT - recommendations.length,
        include: {
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
        },
      });

      for (const quote of sharedTagQuotes) {
        if (!recommendedIds.has(quote.id)) {
          recommendedIds.add(quote.id);
          recommendations.push(quote);
        }
      }
    }

    // Priority 4: Featured fallback
    if (recommendations.length < RECOMMENDATION_COUNT) {
      const featuredQuotes = await prisma.quote.findMany({
        where: {
          id: { not: currentQuote.id },
          isActive: true,
          isFeatured: true,
        },
        orderBy: { displayOrder: 'asc' },
        take: RECOMMENDATION_COUNT - recommendations.length,
        include: {
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
        },
      });

      for (const quote of featuredQuotes) {
        if (!recommendedIds.has(quote.id)) {
          recommendedIds.add(quote.id);
          recommendations.push(quote);
        }
      }
    }

    return NextResponse.json(recommendations.slice(0, RECOMMENDATION_COUNT));
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendations', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
