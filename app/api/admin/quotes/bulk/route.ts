import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/quotes/bulk - Bulk upload quotes
export async function POST(request: NextRequest) {
  try {
    const { quotes } = await request.json();

    if (!Array.isArray(quotes)) {
      return NextResponse.json({ error: 'Quotes must be an array' }, { status: 400 });
    }

    let successCount = 0;
    let failedCount = 0;

    for (const quoteData of quotes) {
      try {
        // Generate slug
        const slugBase = (quoteData.title || quoteData.text).split(' ').slice(0, 5).join('-').toLowerCase().replace(/[^a-z0-9-]/g, '');
        const slug = `${slugBase}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

        const quote = await prisma.quote.create({
          data: {
            slug,
            title: quoteData.title || null,
            text: quoteData.text,
            excerpt: quoteData.excerpt || (quoteData.text.length > 150 ? quoteData.text.slice(0, 150) + '...' : null),
            primaryCategory: quoteData.primaryCategory || quoteData.category || 'Self Awareness',
            isFeatured: quoteData.isFeatured || quoteData.is_featured || false,
            displayOrder: quoteData.displayOrder || quoteData.display_order || 0,
            isActive: quoteData.isActive !== undefined ? quoteData.isActive : (quoteData.is_active !== false),
            author: 'Dr. Kumar',
          },
        });

        // Create category mapping
        if (quote.primaryCategory) {
          const category = await prisma.quoteCategory.findFirst({ where: { name: quote.primaryCategory } });
          if (category) {
            await prisma.quoteCategoryMap.create({
              data: { quoteId: quote.id, categoryId: category.id },
            });
          }
        }

        successCount++;
      } catch (error) {
        console.error('Failed to create quote:', error);
        failedCount++;
      }
    }

    return NextResponse.json({
      success: successCount,
      failed: failedCount,
      message: `Successfully uploaded ${successCount} quote${successCount !== 1 ? 's' : ''}`,
    });
  } catch (error) {
    console.error('Bulk upload failed:', error);
    return NextResponse.json({ error: 'Failed to process bulk upload' }, { status: 500 });
  }
}
