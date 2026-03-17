import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/global-presence/regions/bulk - Bulk upload regions
export async function POST(request: NextRequest) {
  try {
    const { regions } = await request.json();

    if (!Array.isArray(regions)) {
      return NextResponse.json({ error: 'Regions must be an array' }, { status: 400 });
    }

    let successCount = 0;
    let failedCount = 0;

    for (const region of regions) {
      try {
        await prisma.region.create({
          data: {
            continent: region.continent,
            name: region.name,
            countries: JSON.stringify(region.countries || []),
          },
        });
        successCount++;
      } catch (error) {
        console.error('Failed to create region:', error);
        failedCount++;
      }
    }

    return NextResponse.json({
      success: successCount,
      failed: failedCount,
      message: `Successfully uploaded ${successCount} region${successCount !== 1 ? 's' : ''}`,
    });
  } catch (error) {
    console.error('Bulk upload failed:', error);
    return NextResponse.json({ error: 'Failed to process bulk upload' }, { status: 500 });
  }
}
