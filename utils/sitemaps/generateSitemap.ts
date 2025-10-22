import { MetadataRoute } from 'next';
import { getPosts } from './helpers';
import { getURL } from '../helpers';

/**
 * Generates a sitemap for the website.
 *
 * @returns {Promise<MetadataRoute.Sitemap>} A promise that resolves to the sitemap object.
 */
export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getURL();

  /**
   * Maps posts to sitemap URLs.
   *
   * @param {string[]} posts - The list of post paths.
   * @returns {Array<{ url: string, lastModified: string, changeFrequency: 'weekly', priority: number }>} The list of sitemap URLs.
   */
  const createEntry = (
    url: string,
    lastModified?: string,
    priority = 0.8
  ) => {
    const parsedDate = lastModified ? new Date(lastModified) : undefined;

    return {
      url,
      lastModified:
        parsedDate && !Number.isNaN(parsedDate.getTime())
          ? parsedDate.toISOString()
          : new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority
    };
  };

  const mapPostsToUrls = (posts: string[]) =>
    posts.map((post) => createEntry(`${baseUrl}${post}`));

  const blogPosts = await getPosts('blog');
  const blogUrls = mapPostsToUrls(blogPosts);

  const docPosts = await getPosts('learn');
  const docUrls = mapPostsToUrls(docPosts);

  const supportPosts = await getPosts('support');
  const supportUrls = mapPostsToUrls(supportPosts);

  const pPosts = await getPosts('p');
  const pUrls = mapPostsToUrls(pPosts);

  return [
    ...blogUrls,
    ...docUrls,
    ...supportUrls,
    ...pUrls
  ];
}
