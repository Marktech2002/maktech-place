import type { MetadataRoute } from 'next';

import { getSiteOrigin } from '~/src/lib/portfolioMetadata';

import { portfolio } from './(main)/work/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin) return [];

  const paths = ['/', '/work', '/articles', '/contact'];
  for (const entry of portfolio) {
    if (entry.slug) paths.push(`/work/${entry.slug}`);
  }

  return paths.map((path) => ({ url: new URL(path, origin).href }));
}
