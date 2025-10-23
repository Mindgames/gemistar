import Image from 'next/image';
import Link from 'next/link';
import React, { use } from 'react';

import { getPosts } from '@/utils/blog';
import { buildMetadata } from '@/utils/seo';

/**
 * Metadata for the main blog page.
 */
const pageDescription =
  'Insights on human-first AI assistance, communication workflows, and product updates from the Gamistar team.';

export const metadata = buildMetadata({
  title: 'The Gamistar Blog',
  description: pageDescription,
  path: '/blog',
  type: 'website'
});

/**
 * Represents a blog post.
 */
interface Post {
  /** The title of the blog post. */
  title: string;
  /** The slug of the blog post. */
  slug: string;
  /** The date the blog post was published. */
  date: string;
  /** The description of the blog post. */
  description: string;
  /** The categories of the blog post. */
  categories: string[];
  /** The weight for sorting the blog post. */
  weight?: number;
  /** The Open Graph metadata for the blog post. */
  openGraph: {
    images: string | string[];
  };
  /** The Twitter metadata for the blog post. */
  twitter?: {
    images: string | string[];
  };
}

/**
 * Helper function to get the first image from the images array or string
 * @param images - The images field from openGraph metadata
 * @returns The first image URL as a string
 */
const getFirstImage = (images: string | string[]): string => {
  if (typeof images === 'string') {
    return images;
  }
  return images.length > 0 ? images[0] : '/og.png'; // fallback image
};

/**
 * Renders the main blog page, displaying a list of blog posts.
 * @returns {JSX.Element} The rendered blog page.
 */
const BlogPage = (): React.JSX.Element => {
  const posts = use(getPosts()) as Post[];

  return (
    <div className="not-prose w-full bg-background py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            The Gamistar Blog
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Stories and updates on building AI that augments your communication
            without taking it over. Explore product deep-dives, customer
            workflows, and best practices from the Gamistar team.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <Image
                  alt={post.title}
                  src={getFirstImage(post.openGraph.images)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <time
                  dateTime={post.date}
                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                  {post.date}
                </time>
                <h3 className="text-xl font-semibold text-foreground">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h3>
                {post.description && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                )}
                <div className="mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    aria-label={`Read ${post.title}`}
                  >
                    Read story &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
