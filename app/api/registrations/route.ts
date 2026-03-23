import { NextResponse } from 'next/server';
import { registrationService } from '@/lib/services';

// POST /api/registrations - Submit new registration
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['full_name', 'country', 'city', 'gender', 'profession', 'year_connected', 'first_encounter', 'resonated_quality', 'life_changes', 'continuing_engagement', 'consent_accepted'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const registration = await registrationService.create({
      full_name: body.full_name,
      country: body.country,
      city: body.city,
      gender: body.gender,
      profession: body.profession,
      year_connected: parseInt(body.year_connected),
      first_encounter: body.first_encounter,
      resonated_quality: body.resonated_quality,
      life_changes: body.life_changes,
      continuing_engagement: body.continuing_engagement,
      consent_accepted: body.consent_accepted,
    });

    return NextResponse.json({ success: true, id: registration.id });
  } catch (error) {
    console.error('Failed to create registration:', error);
    return NextResponse.json({ error: 'Failed to submit registration' }, { status: 500 });
  }
}
