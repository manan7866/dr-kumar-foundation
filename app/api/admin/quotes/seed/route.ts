import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const quotes = [
  {
    title: "On Self-Awareness",
    text: "The heart becomes clear when it stops arguing with truth.",
    primaryCategory: "Self Awareness",
    isFeatured: false,
    displayOrder: 1,
  },
  {
    title: "On Peace and Reflection",
    text: "Peace begins when the mind becomes honest with itself.",
    primaryCategory: "Peace and Reflection",
    isFeatured: false,
    displayOrder: 2,
  },
  {
    title: "On Compassion",
    text: "Faith grows quietly where compassion becomes natural.",
    primaryCategory: "Compassion",
    isFeatured: false,
    displayOrder: 3,
  },
  {
    title: "On Inner Discipline",
    text: "Discipline is not punishment; it is the protection of the soul.",
    primaryCategory: "Inner Discipline",
    isFeatured: false,
    displayOrder: 4,
  },
  {
    title: "On Self-Awareness",
    text: "The world changes slowly, but the heart can change in a single moment.",
    primaryCategory: "Self Awareness",
    isFeatured: false,
    displayOrder: 5,
  },
  {
    title: "On Self-Awareness",
    text: "Human beings search across the world for meaning, yet the doorway is always within their own awareness.",
    primaryCategory: "Self Awareness",
    isFeatured: true,
    displayOrder: 0,
  },
  {
    title: "On Compassion",
    text: "Compassion is not an act of will but a quality of understanding.",
    primaryCategory: "Compassion",
    isFeatured: false,
    displayOrder: 6,
  },
  {
    title: "On Inner Discipline",
    text: "True discipline arises from love of the goal, not fear of failure.",
    primaryCategory: "Inner Discipline",
    isFeatured: false,
    displayOrder: 7,
  },
  {
    title: "On Ethical Conduct",
    text: "Ethical conduct is not following rules but living from clarity.",
    primaryCategory: "Ethical Conduct",
    isFeatured: false,
    displayOrder: 8,
  },
  {
    title: "On Human Unity",
    text: "We are not separate beings seeking connection; we are connection expressing as separate beings.",
    primaryCategory: "Human Unity",
    isFeatured: false,
    displayOrder: 9,
  },
  {
    title: "On Peace and Reflection",
    text: "In silence, the mind finds its natural rhythm and the heart its native language.",
    primaryCategory: "Peace and Reflection",
    isFeatured: false,
    displayOrder: 10,
  },
  {
    title: "On Self-Awareness",
    text: "Awareness is the mirror in which truth recognizes itself.",
    primaryCategory: "Self Awareness",
    isFeatured: false,
    displayOrder: 11,
  },
  {
    title: "On Ethical Conduct",
    text: "To be ethical is to act from understanding rather than from impulse.",
    primaryCategory: "Ethical Conduct",
    isFeatured: false,
    displayOrder: 12,
  },
  {
    title: "On Human Unity",
    text: "Unity is not something to achieve; it is something to recognize.",
    primaryCategory: "Human Unity",
    isFeatured: false,
    displayOrder: 13,
  },
  {
    title: "On Compassion",
    text: "Compassion begins where judgment ends.",
    primaryCategory: "Compassion",
    isFeatured: false,
    displayOrder: 14,
  },
  {
    title: "On Peace and Reflection",
    text: "The quiet mind hears what the busy mind cannot imagine.",
    primaryCategory: "Peace and Reflection",
    isFeatured: false,
    displayOrder: 15,
  },
  {
    title: "On Self-Awareness",
    text: "Self-observation is the first act of freedom.",
    primaryCategory: "Self Awareness",
    isFeatured: false,
    displayOrder: 16,
  },
  {
    title: "On Inner Discipline",
    text: "Consistency in small things creates the capacity for greatness in all things.",
    primaryCategory: "Inner Discipline",
    isFeatured: false,
    displayOrder: 17,
  },
];

export async function POST(request: NextRequest) {
  try {
    // Check if already seeded
    const existingCount = await prisma.quote.count();
    if (existingCount > 0) {
      return NextResponse.json({
        message: `Database already contains ${existingCount} quotes. Skipping seed.`,
        count: existingCount
      });
    }

    // Seed quotes
    const created = [];
    for (const quoteData of quotes) {
      // Generate slug from title
      const slugBase = quoteData.title?.split(' ').slice(2).join('-').toLowerCase().replace(/[^a-z0-9-]/g, '') || 'quote';
      const slug = `${slugBase}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      
      const createdQuote = await prisma.quote.create({
        data: {
          ...quoteData,
          slug,
          excerpt: quoteData.text.length > 150 ? quoteData.text.slice(0, 150) + '...' : quoteData.text,
          author: 'Dr. Kumar',
          isActive: true,
        },
      });
      created.push(createdQuote);
    }

    return NextResponse.json({
      message: `Successfully seeded ${created.length} quotes!`,
      count: created.length
    });
  } catch (error) {
    console.error('Failed to seed quotes:', error);
    return NextResponse.json(
      { error: 'Failed to seed quotes', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
