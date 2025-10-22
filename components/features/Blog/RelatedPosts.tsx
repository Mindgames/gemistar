import React, { use } from 'react';
import { Container, Heading } from '@/components/ui/base/common';
import Image from 'next/image';
import Link from 'next/link';
import { type Category, getRelatedPosts } from '@/utils/blog';

/**
 * @interface Post
 * @description Defines the structure for a blog post.
 * @property {string} title - The title of the post.
 * @property {string} slug - The slug of the post.
 * @property {string} date - The publication date of the post.
 * @property {string} description - The description of the post.
 * @property {Category[]} categories - An array of categories for the post.
 * @property {number} [weight] - The weight of the post for sorting.
 * @property {object} openGraph - The Open Graph data for the post.
 * @property {string} openGraph.images - The URL of the Open Graph image.
 */
interface Post {
  title: string;
  slug: string;
  date: string;
  description: string;
  categories: Category[];
  weight?: number;
  openGraph: {
    images: string;
  };
}

/**
 * @interface RelatedPostsProps
 * @description Defines the props for the RelatedPosts component.
 * @property {string} currentSlug - The slug of the current post.
 * @property {Category[]} categories - An array of categories for the current post.
 */
interface RelatedPostsProps {
  currentSlug: string;
  categories: Category[];
}

/**
 * Renders a list of related blog posts.
 *
 * This component fetches and displays a list of blog posts that are related to the current post,
 * based on shared categories.
 *
 * @param {RelatedPostsProps} props - The component props.
 * @returns {JSX.Element} The rendered list of related posts.
 */
const RelatedPosts = ({
  currentSlug,
  categories
}: RelatedPostsProps): React.JSX.Element => {
  const posts = use(getRelatedPosts({ categories, currentSlug }));

  const hasRelatedPosts = posts.some((post) =>
    post.categories?.some((category) => categories.includes(category))
  );

  /**
   * Formats a category name into a URL-friendly slug.
   * @param {string} category - The category name.
   * @returns {string} The formatted category slug.
   */
  const formatCategoryUrl = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '-');
  };

  /**
   * Formats an array of categories into a human-readable string with links.
   * @param {Category[]} categories - The array of categories.
   * @returns {React.ReactNode} The formatted categories.
   */
  const formatCategories = (categories: Category[]) => {
    if (categories.length === 0) return '';
    if (categories.length === 1) {
      return (
        <Link
          href={`/blog/category/${formatCategoryUrl(categories[0])}`}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {categories[0]}
        </Link>
      );
    }

    return categories.map((category, index) => {
      if (index === categories.length - 1) {
        return (
          <React.Fragment key={category}>
            {' '}
            and{' '}
            <Link
              href={`/blog/category/${formatCategoryUrl(category)}`}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {category}
            </Link>
          </React.Fragment>
        );
      }
      if (index === categories.length - 2) {
        return (
          <React.Fragment key={category}>
            <Link
              href={`/blog/category/${formatCategoryUrl(category)}`}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {category}
            </Link>
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={category}>
          <Link
            href={`/blog/category/${formatCategoryUrl(category)}`}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {category}
          </Link>
          ,{' '}
        </React.Fragment>
      );
    });
  };

  const subtitle = hasRelatedPosts ? (
    <span>More posts about {formatCategories(categories)}</span>
  ) : (
    'More posts from our blog'
  );

  return (
    <Container className="border-t border-gray-200 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Heading
          level={2}
          className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
        >
          {hasRelatedPosts ? 'Continue reading' : 'More from the blog'}
        </Heading>
        <p className="mt-2 text-lg/8 text-gray-600">{subtitle}</p>
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

export default RelatedPosts;
