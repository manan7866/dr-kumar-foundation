/**
 * Structured Data (JSON-LD) Generator
 * For search engines and AI systems to understand content entities
 */

interface OrganizationSchema {
  '@context': string;
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  foundingDate?: string;
  founders?: Array<{
    '@type': 'Person';
    name: string;
  }>;
  address?: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  email?: string;
  sameAs?: string[];
}

interface WebSiteSchema {
  '@context': string;
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  publisher?: {
    '@type': 'Organization';
    name: string;
  };
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

interface PersonSchema {
  '@context': string;
  '@type': 'Person';
  name: string;
  description?: string;
  jobTitle?: string;
  worksFor?: {
    '@type': 'Organization';
    name: string;
  };
  sameAs?: string[];
}

interface BreadcrumbListSchema {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

interface ArticleSchema {
  '@context': string;
  '@type': 'Article';
  headline: string;
  description?: string;
  author?: {
    '@type': 'Person' | 'Organization';
    name: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage?: string;
}

/**
 * Generate Organization schema for Dr. Kumar Foundation
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dr. Kumar Foundation USA',
    url: 'https://dkf.sufisciencecenter.info',
    description: 'Dr. Kumar Foundation USA preserves a living spiritual and institutional mission through disciplined documentation, ethical stewardship, research, and structured participation.',
    foundingDate: '2020',
    founders: [
      {
        '@type': 'Person',
        name: 'Dr. Ghulam Mohammad Kumar',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Virginia',
      addressRegion: 'VA',
      addressCountry: 'USA',
    },
    email: 'info@dkf.sufisciencecenter.info',
    sameAs: [
      'https://www.facebook.com/share/g/17u5dfeu1C/',
      'https://sufisciencecenter.info',
      'https://sufipulse.com',
      'https://purplesoul.co',
    ],
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dr. Kumar Foundation USA',
    url: 'https://dkf.sufisciencecenter.info',
    description: 'Official website of Dr. Kumar Foundation USA - spiritual teachings, ethical stewardship, and cultural preservation.',
    publisher: {
      '@type': 'Organization',
      name: 'Dr. Kumar Foundation USA',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://dkf.sufisciencecenter.info/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Person schema for Dr. Kumar
 */
export function generatePersonSchema(personName: string = 'Dr. Ghulam Mohammad Kumar'): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personName,
    description: 'Spiritual teacher and founder of Dr. Kumar Foundation USA',
    jobTitle: 'Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'Dr. Kumar Foundation USA',
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Article schema for content pages
 */
export function generateArticleSchema(
  headline: string,
  description?: string,
  datePublished?: string,
  dateModified?: string
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Organization',
      name: 'Dr. Kumar Foundation USA',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dr. Kumar Foundation USA',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dkf.sufisciencecenter.info/dkf_logo_21.png',
      },
    },
    datePublished,
    dateModified,
    mainEntityOfPage: 'https://dkf.sufisciencecenter.info',
  };
}

/**
 * Combined schema for homepage
 */
export function generateHomeSchema(): string {
  const schemas = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
  ];

  return JSON.stringify(schemas, null, 2);
}
