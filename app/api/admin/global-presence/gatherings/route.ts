import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/global-presence/gatherings - Get all gatherings
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const regionName = searchParams.get('region_name');

    const whereClause: any = {};
    if (regionName) {
      whereClause.region_name = regionName;
    }

    const gatherings = await prisma.gathering.findMany({
      where: whereClause,
      orderBy: [{ year: 'desc' }, { location_city: 'asc' }],
    });

    return NextResponse.json(gatherings);
  } catch (error) {
    console.error('Failed to fetch gatherings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gatherings', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/global-presence/gatherings - Create a new gathering
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, location_city, location_country, region_name, description } = body;

    if (!year || !location_city || !location_country || !region_name) {
      return NextResponse.json(
        { error: 'Year, location city, location country, and region name are required' },
        { status: 400 }
      );
    }

    const gathering = await prisma.gathering.create({
      data: {
        year: parseInt(year),
        location_city,
        location_country,
        region_name,
        description,
      },
    });

    return NextResponse.json(gathering, { status: 201 });
  } catch (error) {
    console.error('Failed to create gathering:', error);
    return NextResponse.json(
      { error: 'Failed to create gathering', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
