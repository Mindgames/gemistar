import React, { use } from 'react';

import { Container } from '@/components/ui/base/common';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/utils/blog';

/**
 * @interface Post
 * @description Defines the structure for a blog post.
 * @property {string} title - The title of the post.
 * @property {string} slug - The slug of the post.
 * @property {string} date - The publication date of the post.
 * @property {string} description - The description of the post.
 * @property {object} openGraph - The Open Graph data for the post.
 * @property {string} openGraph.images - The URL of the Open Graph image.
 */
interface Post {
  title: string;
  slug: string;
  date: string;
  description: string;
  openGraph: {
    images: string;
  };
  // Add other properties as needed
}

/**
 * @interface BlogFeedProps
 * @description Defines the props for the BlogFeed component.
 * @property {Post[]} posts - An array of blog posts.
 */
interface BlogFeedProps {
  posts: Post[];
}

/**
 * Renders a feed of blog posts.
 *
 * This component fetches the latest blog posts and displays them in a grid format.
 *
 * @returns {JSX.Element} The rendered blog feed.
 */
const BlogFeed = (): React.JSX.Element => {
  const posts = use(getPosts(6)) as Post[];

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          From the blog
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600">
          Learn how to grow your business with our expert advice.
        </p>
      </div>
      <div className="not-prose mx-auto mt-16 grid auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post, index) => (
          <article
            key={index}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-3 pb-8 pt-40 sm:pt-48 lg:pt-40"
          >
            <Image
              alt={post.title}
              src={post.openGraph.images[0]}
              fill={true}
              className="absolute inset-0 -z-10"
              loading="lazy"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
              <time dateTime={post.date} className="mr-8">
                {post.date}
              </time>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-white">
              <Link href={`/blog/${post.slug}`}>
                <span className="absolute inset-0" />
                {post.title}
              </Link>
            </h3>
          </article>
        ))}
      </div>
    </Container>
  );
};

export default BlogFeed;
