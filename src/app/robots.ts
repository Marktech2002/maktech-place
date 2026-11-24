import type { MetadataRoute } from 'next';

import { getSiteOrigin } from '~/src/lib/portfolioMetadata';

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: origin ? new URL('/sitemap.xml', origin).href : undefined,
  };
}
