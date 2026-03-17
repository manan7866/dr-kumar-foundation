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

    for (const quote of quotes) {
      try {
        await prisma.quote.create({
          data: {
            text: quote.text,
            category: quote.category || 'Compassion',
            is_featured: quote.is_featured || false,
            display_order: quote.display_order || 0,
            is_active: quote.is_active !== false,
          },
        });
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
