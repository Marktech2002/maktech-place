import type { Metadata } from 'next';

import { profile } from '~/content/yaqub.mjs';

export function getSiteOrigin() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (url.protocol === 'https:' || url.protocol === 'http:') return new URL(url.origin);
  } catch {
    return undefined;
  }
}

export function portfolioMetadata({
  title,
  description,
  path,
  image = '/home/yaqub.png',
  imageAlt = profile.name,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
}): Metadata {
  const origin = getSiteOrigin();
  const url = origin ? new URL(path, origin) : undefined;
  const images = origin ? [{ url: new URL(image, origin), alt: imageAlt }] : undefined;
  const shareTitle = title.includes(profile.name) ? title : `${title} | ${profile.name}`;

  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      siteName: profile.name,
      title: shareTitle,
      description,
      url,
      images,
      ...(publishedTime
        ? { type: 'article', publishedTime, authors: [profile.name] }
        : { type: 'website' }),
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description, images },
  };
}
