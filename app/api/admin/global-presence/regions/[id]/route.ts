import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/global-presence/regions/[id] - Get a single region
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const region = await prisma.region.findUnique({
      where: { id },
    });

    if (!region) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }

    return NextResponse.json(region);
  } catch (error) {
    console.error('Failed to fetch region:', error);
    return NextResponse.json(
      { error: 'Failed to fetch region', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/global-presence/regions/[id] - Update a region
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { continent, name, countries } = body;

    const existingRegion = await prisma.region.findUnique({
      where: { id },
    });

    if (!existingRegion) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }

    const region = await prisma.region.update({
      where: { id },
      data: {
        continent: continent ?? existingRegion.continent,
        name: name ?? existingRegion.name,
        countries: countries !== undefined ? JSON.stringify(countries) : existingRegion.countries,
      },
    });

    return NextResponse.json(region);
  } catch (error) {
    console.error('Failed to update region:', error);
    return NextResponse.json(
      { error: 'Failed to update region', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/global-presence/regions/[id] - Delete a region
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingRegion = await prisma.region.findUnique({
      where: { id },
    });

    if (!existingRegion) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }

    await prisma.region.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Region deleted successfully' });
  } catch (error) {
    console.error('Failed to delete region:', error);
    return NextResponse.json(
      { error: 'Failed to delete region', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
