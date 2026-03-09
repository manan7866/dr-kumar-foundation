import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/global-presence/gatherings/[id] - Get a single gathering
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gathering = await prisma.gathering.findUnique({
      where: { id },
    });

    if (!gathering) {
      return NextResponse.json({ error: 'Gathering not found' }, { status: 404 });
    }

    return NextResponse.json(gathering);
  } catch (error) {
    console.error('Failed to fetch gathering:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gathering', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/global-presence/gatherings/[id] - Update a gathering
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { year, location_city, location_country, region_name, description } = body;

    const existingGathering = await prisma.gathering.findUnique({
      where: { id },
    });

    if (!existingGathering) {
      return NextResponse.json({ error: 'Gathering not found' }, { status: 404 });
    }

    const gathering = await prisma.gathering.update({
      where: { id },
      data: {
        year: year !== undefined ? parseInt(year) : existingGathering.year,
        location_city: location_city ?? existingGathering.location_city,
        location_country: location_country ?? existingGathering.location_country,
        description: description !== undefined ? description : existingGathering.description,
      },
    });

    // Update region_name separately if needed
    if (region_name && region_name !== existingGathering.region_name) {
      await prisma.gathering.update({
        where: { id },
        data: { region_name },
      });
    }

    return NextResponse.json(gathering);
  } catch (error) {
    console.error('Failed to update gathering:', error);
    return NextResponse.json(
      { error: 'Failed to update gathering', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/global-presence/gatherings/[id] - Delete a gathering
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingGathering = await prisma.gathering.findUnique({
      where: { id },
    });

    if (!existingGathering) {
      return NextResponse.json({ error: 'Gathering not found' }, { status: 404 });
    }

    await prisma.gathering.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Gathering deleted successfully' });
  } catch (error) {
    console.error('Failed to delete gathering:', error);
    return NextResponse.json(
      { error: 'Failed to delete gathering', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
