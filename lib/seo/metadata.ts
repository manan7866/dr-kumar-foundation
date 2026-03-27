import { Metadata } from 'next';

interface PageSEOConfig {
  title: string;
  description: string;
  canonical?: string;
  keywords?: readonly string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary_large_image' | 'summary';
}

const baseUrl = 'https://dkf.sufisciencecenter.info';
const defaultOGImage = '/og-image.jpg';

/**
 * Generate SEO metadata for a page
 * Optimized for search engines and AI discoverability
 */
export function generatePageSEO(config: PageSEOConfig): Metadata {
  const {
    title,
    description,
    canonical,
    keywords = [],
    ogImage = defaultOGImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
  } = config;

  const canonicalUrl = canonical || baseUrl;

  return {
    title: {
      default: title,
      template: `%s | Dr. Kumar Foundation USA`,
    },
    description,
    keywords: keywords && keywords.length > 0 ? [...keywords] : undefined,
    authors: [{ name: 'Dr. Kumar Foundation USA' }],
    creator: 'Dr. Kumar Foundation USA',
    publisher: 'Dr. Kumar Foundation USA',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Dr. Kumar Foundation USA',
      locale: 'en_US',
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [ogImage],
      creator: '@drkumarfoundation',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add when verified
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  };
}

/**
 * Pre-configured SEO for common page types
 */
export const pageSEO = {
  home: {
    title: 'Dr. Kumar Foundation USA | Spiritual Teachings & Cultural Legacy',
    description: 'Dr. Kumar Foundation USA preserves a living spiritual and institutional mission through disciplined documentation, ethical stewardship, research, and structured participation.',
    keywords: [
      'Dr. Kumar Foundation',
      'spiritual teachings',
      'ethical stewardship',
      'cultural preservation',
      'spiritual research',
      'USA foundation',
      'The Circle',
      'spiritual community',
    ],
  },
  about: {
    title: 'About Dr. Kumar Foundation | Mission & Institutional Vision',
    description: `Learn about Dr. Kumar Foundation USA's mission, governance, and institutional framework for spiritual stewardship and cultural preservation.`,
    keywords: [
      'about Dr. Kumar Foundation',
      'foundation mission',
      'institutional vision',
      'governance',
      'spiritual organization',
    ],
  },
  mission: {
    title: 'Our Mission | Dr. Kumar Foundation USA',
    description: 'The mission of Dr. Kumar Foundation USA: preserving spiritual teachings through ethical stewardship, research, documentation, and structured institutional participation.',
    keywords: [
      'foundation mission',
      'spiritual stewardship',
      'ethical preservation',
      'cultural documentation',
    ],
  },
  objectives: {
    title: 'Foundation Objectives | Dr. Kumar Foundation USA',
    description: 'Core objectives of Dr. Kumar Foundation USA: spiritual documentation, ethical research, cultural preservation, and structured community engagement.',
    keywords: [
      'foundation objectives',
      'spiritual goals',
      'cultural preservation',
      'community engagement',
    ],
  },
  governance: {
    title: 'Governance & Leadership | Dr. Kumar Foundation USA',
    description: 'Governance structure and leadership of Dr. Kumar Foundation USA, ensuring ethical stewardship and institutional integrity.',
    keywords: [
      'foundation governance',
      'leadership',
      'institutional structure',
      'ethical oversight',
    ],
  },
  selfAwareness: {
    title: 'Self-Awareness | Core Spiritual Teaching',
    description: 'Self-Awareness as a foundational spiritual principle at Dr. Kumar Foundation USA: understanding inner states, patterns, and conscious presence.',
    keywords: [
      'self-awareness',
      'spiritual practice',
      'inner observation',
      'consciousness',
      'spiritual development',
    ],
  },
  innerDiscipline: {
    title: 'Inner Discipline | Spiritual Practice & Development',
    description: 'Inner Discipline as a core principle: cultivating stability, ethical conduct, and spiritual maturity through structured practice.',
    keywords: [
      'inner discipline',
      'spiritual practice',
      'self-development',
      'ethical conduct',
      'spiritual maturity',
    ],
  },
  ethicalConduct: {
    title: 'Ethical Conduct | Moral Framework & Spiritual Integrity',
    description: 'Ethical Conduct as a spiritual foundation: moral clarity, responsible action, and integrity in personal and community life.',
    keywords: [
      'ethical conduct',
      'moral framework',
      'spiritual integrity',
      'responsible action',
    ],
  },
  theCircle: {
    title: 'The Circle | Structured Spiritual Participation',
    description: 'The Circle at Dr. Kumar Foundation USA: a structured pathway for spiritual participation, community engagement, and ethical contribution.',
    keywords: [
      'The Circle',
      'spiritual participation',
      'community membership',
      'structured engagement',
      'spiritual community',
    ],
  },
  legacyProjects: {
    title: 'Legacy Projects | Cultural & Spiritual Initiatives',
    description: 'Legacy Projects of Dr. Kumar Foundation USA: healing initiatives, environmental programs, youth engagement, interfaith dialogue, and cultural preservation.',
    keywords: [
      'legacy projects',
      'cultural initiatives',
      'spiritual programs',
      'community projects',
      'healing initiatives',
      'environmental programs',
    ],
  },
  contact: {
    title: 'Contact Us | Dr. Kumar Foundation USA',
    description: 'Contact Dr. Kumar Foundation USA for inquiries, collaboration, support, or participation in our spiritual and cultural initiatives.',
    keywords: [
      'contact Dr. Kumar Foundation',
      'foundation contact',
      'spiritual organization contact',
      'collaboration inquiry',
    ],
  },
  visitDarbar: {
    title: 'Visit Dr. Kumar Faqeeri Darbar | Location & Visitor Information',
    description: 'Official visitor information for Dr. Kumar Faqeeri Darbar: location, timings, hospitality arrangements, and navigation guidance.',
    keywords: [
      'visit Dr. Kumar Darbar',
      'Faqeeri Darbar',
      'Darbar location',
      'visitor information',
      'Ganderbal',
      'spiritual visit',
    ],
  },
  publicNotice: {
    title: 'Official Public Notice | Dr. Kumar Foundation USA',
    description: 'Official public notice regarding donations, financial requests, and authorized representation at Dr. Kumar Foundation USA.',
    keywords: [
      'public notice',
      'official statement',
      'donation policy',
      'foundation notice',
    ],
  },
  privacy: {
    title: 'Privacy Policy | Dr. Kumar Foundation USA',
    description: 'Privacy policy of Dr. Kumar Foundation USA: data protection, information handling, and user privacy rights.',
    keywords: [
      'privacy policy',
      'data protection',
      'user privacy',
    ],
  },
  terms: {
    title: 'Terms of Use | Dr. Kumar Foundation USA',
    description: 'Terms of use for Dr. Kumar Foundation USA website and services: usage guidelines, intellectual property, and legal terms.',
    keywords: [
      'terms of use',
      'legal terms',
      'usage guidelines',
    ],
  },
  quotes: {
    title: 'Teachings & Quotes | Dr. Ghulam Mohammad Kumar',
    description: 'Spiritual teachings and quotes from Dr. Ghulam Mohammad Kumar: wisdom on self-awareness, ethical conduct, and spiritual development.',
    keywords: [
      'Dr. Kumar quotes',
      'spiritual teachings',
      'spiritual wisdom',
      'teachings archive',
    ],
  },
} as const;
