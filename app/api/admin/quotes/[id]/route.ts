import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/quotes/[id] - Get a single quote by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const quote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Failed to fetch quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/quotes/[id] - Update a quote
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, text, excerpt, primaryCategory, isFeatured, displayOrder, isActive } = body;

    // Check if quote exists
    const existingQuote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!existingQuote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    const quote = await prisma.quote.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingQuote.title,
        text: text ?? existingQuote.text,
        excerpt: excerpt !== undefined ? excerpt : existingQuote.excerpt,
        primaryCategory: primaryCategory !== undefined ? primaryCategory : existingQuote.primaryCategory,
        isFeatured: isFeatured !== undefined ? isFeatured : existingQuote.isFeatured,
        displayOrder: displayOrder !== undefined ? displayOrder : existingQuote.displayOrder,
        isActive: isActive !== undefined ? isActive : existingQuote.isActive,
      },
    });

    // Update category mapping if category changed
    if (primaryCategory !== undefined && primaryCategory !== existingQuote.primaryCategory) {
      // Delete old mapping
      await prisma.quoteCategoryMap.deleteMany({ where: { quoteId: id } });
      
      // Create new mapping
      const category = await prisma.quoteCategory.findFirst({ where: { name: primaryCategory } });
      if (category) {
        await prisma.quoteCategoryMap.create({
          data: { quoteId: id, categoryId: category.id },
        });
      }
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Failed to update quote:', error);
    return NextResponse.json(
      { error: 'Failed to update quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/quotes/[id] - Delete a quote
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if quote exists
    const existingQuote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!existingQuote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    await prisma.quote.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Failed to delete quote:', error);
    return NextResponse.json(
      { error: 'Failed to delete quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
