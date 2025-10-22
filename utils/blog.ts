import { readdir } from 'fs/promises';

// Use string type for categories to allow flexibility
export type Category = string;

export interface Post {
  title: string;
  slug: string;
  date: string;
  description: string;
  categories: Category[];
  weight?: number;
  openGraph: {
    images: string | string[];
  };
  twitter?: {
    images: string | string[];
  };
}

/**
 * Sorts posts by weight (if available) and date
 * Posts with higher weights come first, followed by posts without weights sorted by date
 * @param {Post[]} posts - The array of posts to sort.
 * @returns {Post[]} The sorted array of posts.
 */
export const sortByWeightAndDate = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => {
    // If both posts have weights, compare them
    if (a.weight && b.weight) {
      return b.weight - a.weight;
    }
    // If only one post has weight, it should come first
    if (a.weight) return -1;
    if (b.weight) return 1;
    // If neither has weight, sort by date
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

/**
 * Fetches all blog posts.
 * @param {number} [limit] - The maximum number of posts to return.
 * @param {string} [excludeSlug] - A slug to exclude from the results.
 * @returns {Promise<Post[]>} A promise that resolves to an array of posts.
 */
export async function getPosts(
  limit?: number,
  excludeSlug?: string
): Promise<Post[]> {
  // Retrieve slugs from post routes
  const slugs = (
    await readdir('./app/blog', {
      withFileTypes: true
    })
  ).filter((dirent) => dirent.isDirectory() && dirent.name !== 'category');

  // Retrieve metadata from MDX files
  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`./../app/blog/${name}/page.mdx`);
      return { slug: name, ...metadata };
    })
  );

  // Filter out excluded post if specified
  const filteredPosts = excludeSlug
    ? posts.filter((post) => post.slug !== excludeSlug)
    : posts;

  // Sort posts from newest to oldest by date
  filteredPosts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  // Return posts based on the limit, if provided
  return limit ? filteredPosts.slice(0, limit) : filteredPosts;
}

/**
 * Gets related posts based on categories, excluding the current post
 * @param {object} params - The parameters for fetching related posts.
 * @param {Category[]} params.categories - The categories to find related posts for.
 * @param {string} params.currentSlug - The slug of the current post to exclude.
 * @param {number} [params.limit=6] - The maximum number of related posts to return.
 * @returns {Promise<Post[]>} A promise that resolves to an array of related posts.
 */
export async function getRelatedPosts({
  categories,
  currentSlug,
  limit = 6
}: {
  categories: Category[];
  currentSlug: string;
  limit?: number;
}): Promise<Post[]> {
  const allPosts = await getPosts(undefined, currentSlug);

  // Split posts into related and unrelated
  const [relatedPosts, otherPosts] = allPosts.reduce(
    ([related, other], post) => {
      if (post.categories?.some((category) => categories.includes(category))) {
        return [related.concat(post), other];
      }
      return [related, other.concat(post)];
    },
    [[] as Post[], [] as Post[]]
  );

  // Sort both groups by weight and date
  const sortedRelatedPosts = sortByWeightAndDate(relatedPosts);
  const sortedOtherPosts = sortByWeightAndDate(otherPosts);

  // Combine posts and limit to specified number
  return [...sortedRelatedPosts, ...sortedOtherPosts].slice(0, limit);
}

/**
 * Fetches all blog posts for a specific category.
 * @param {object} params - The parameters for fetching posts by category.
 * @param {Category} params.category - The category to filter posts by.
 * @returns {Promise<Post[]>} A promise that resolves to an array of posts in the specified category.
 */
export async function getPostsByCategory({
  category
}: {
  category: Category;
}): Promise<Post[]> {
  const allPosts = await getPosts();

  // Filter posts by specified category
  const posts = allPosts.filter(
    (post) => post.categories && post.categories.indexOf(category) !== -1
  );

  // Sort posts by weight and date
  return sortByWeightAndDate(posts);
}
