import type { Metadata } from 'next';

import { getURL } from './helpers';

const SITE_NAME = 'Gamistar';
const DEFAULT_OG_IMAGE = '/og_gamistar.png';

type OpenGraphType = NonNullable<Metadata['openGraph']> extends infer OG
  ? OG extends { type?: infer T }
    ? T
    : never
  : never;

export interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Path starting with `/` that resolves to the page canonical. */
  path: string;
  type?: OpenGraphType;
  image?: string;
  imageAlt?: string;
}

/**
 * Helper to construct consistent Metadata objects with canonical URLs,
 * Open Graph, and Twitter fallbacks.
 */
export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const { title, description, path, type = 'website', image, imageAlt } = options;
  const canonical = getURL(path);
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? `${title} | ${SITE_NAME}`
        }
      ]
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: [ogImage]
    }
  };
}
