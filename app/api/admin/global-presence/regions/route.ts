import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/global-presence/regions - Get all regions
export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      orderBy: [{ continent: 'asc' }, { name: 'asc' }],
    });
    return NextResponse.json(regions);
  } catch (error) {
    console.error('Failed to fetch regions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch regions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/global-presence/regions - Create a new region
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { continent, name, countries } = body;

    if (!continent || !name) {
      return NextResponse.json(
        { error: 'Continent and name are required' },
        { status: 400 }
      );
    }

    const region = await prisma.region.create({
      data: {
        continent,
        name,
        countries: JSON.stringify(countries || []),
      },
    });

    return NextResponse.json(region, { status: 201 });
  } catch (error) {
    console.error('Failed to create region:', error);
    return NextResponse.json(
      { error: 'Failed to create region', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
