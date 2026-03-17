import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE /api/admin/contributions/[id] - Delete a contribution
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete the contribution
    await prisma.contribution.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Contribution deleted successfully',
    });
  } catch (error) {
    console.error('Failed to delete contribution:', error);
    return NextResponse.json(
      { error: 'Failed to delete contribution' },
      { status: 500 }
    );
  }
}
