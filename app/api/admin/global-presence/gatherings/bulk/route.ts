import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/global-presence/gatherings/bulk - Bulk upload gatherings
export async function POST(request: NextRequest) {
  try {
    const { gatherings } = await request.json();

    if (!Array.isArray(gatherings)) {
      return NextResponse.json({ error: 'Gatherings must be an array' }, { status: 400 });
    }

    let successCount = 0;
    let failedCount = 0;

    for (const gathering of gatherings) {
      try {
        await prisma.gathering.create({
          data: {
            year: gathering.year,
            location_city: gathering.location_city,
            location_country: gathering.location_country,
            region_name: gathering.region_name,
            description: gathering.description,
          },
        });
        successCount++;
      } catch (error) {
        console.error('Failed to create gathering:', error);
        failedCount++;
      }
    }

    return NextResponse.json({
      success: successCount,
      failed: failedCount,
      message: `Successfully uploaded ${successCount} gathering${successCount !== 1 ? 's' : ''}`,
    });
  } catch (error) {
    console.error('Bulk upload failed:', error);
    return NextResponse.json({ error: 'Failed to process bulk upload' }, { status: 500 });
  }
}
