import { getArticleMetadata, getPostMetadata, getPosts } from './blog';

/**
 * Test suite for the blog utility functions.
 */
describe('Blog Utilities', () => {
  /**
   * Test suite for the getPosts function.
   */
  describe('getPosts', () => {
    it('should fetch and log all posts', async () => {
      try {
        const posts = await getPosts();
        expect(Array.isArray(posts)).toBe(true);
        posts.forEach((post) => {
          expect(post).toHaveProperty('slug');
          expect(post).toHaveProperty('title');
          expect(post).toHaveProperty('date');
        });
      } catch (error) {
        throw error;
      }
    });
  });

  /**
   * Test suite for the getPostMetadata function.
   */
  describe('getPostMetadata', () => {
    it('should fetch and log metadata for a specific post', async () => {
      try {
        const postSlug = 'social-media-marketing-trends-2024'; // Example slug
        const postMetadata = await getPostMetadata(postSlug);
        expect(postMetadata).not.toBeNull();
        if (postMetadata) {
          expect(postMetadata.slug).toBe(postSlug);
          expect(postMetadata).toHaveProperty('title');
          expect(postMetadata).toHaveProperty('date');
        }
      } catch (error) {
        throw error;
      }
    });
  });

  /**
   * Test suite for the getArticleMetadata function.
   */
  describe('getArticleMetadata', () => {
    it('should fetch and log metadata for a specific article', async () => {
      try {
        const articleSlug = 'linkedin-seo-strategies-2025'; // Example slug
        const articleMetadata = await getArticleMetadata(articleSlug);
        if (articleMetadata) {
          expect(articleMetadata).toHaveProperty('title');
          expect(articleMetadata).toHaveProperty('description');
          expect(articleMetadata).toHaveProperty('date');
          expect(articleMetadata.alternates).toHaveProperty('canonical');
        }
      } catch (error) {
        throw error;
      }
    });
  });
});
