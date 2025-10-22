import { getPosts, getPostBySlug, extractMetadata } from './generateFeed';
import path from 'path';

/**
 * Test suite for the generateFeed utility functions.
 */
describe('generateFeed utility functions', () => {
  const blogDirectory = 'blog';

  /**
   * Test suite for the getPosts function.
   */
  describe('getPosts', () => {
    it('should retrieve a list of posts with their metadata', async () => {
      const posts = await getPosts(blogDirectory);
      expect(posts).toBeInstanceOf(Array);
      expect(posts.length).toBeGreaterThan(0);

      posts.forEach(post => {
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('metadata');
        expect(post.metadata).toHaveProperty('title');
        expect(post.metadata).toHaveProperty('description');
        expect(post.metadata).toHaveProperty('date');
        expect(post.metadata).toHaveProperty('alternates');
        expect(post.metadata.alternates).toHaveProperty('canonical');
      });
    });
  });

  /**
   * Test suite for the getPostBySlug function.
   */
  describe('getPostBySlug', () => {
    it('should retrieve the content of a post by its slug', async () => {
      const slug = 'social-media-impact-on-crm';
      const post = await getPostBySlug(blogDirectory, slug);
      expect(post).toHaveProperty('content');
      expect(post.content).toContain('The Influence of Social Media on Customer Relationship Management');
    });
  });

  /**
   * Test suite for the extractMetadata function.
   */
  describe('extractMetadata', () => {
    it('should extract metadata from a given page.mdx file', async () => {
      const filePath = path.resolve(__dirname, '../../app/blog/boost-presence-with-linkedin-activity.mdx/page.mdx');
      const metadata = await extractMetadata(filePath);
      
      expect(metadata).toHaveProperty('title', '7 Strategic Ways LinkedIn Activity Boosts Your Sector Presence and Job Opportunities');
      expect(metadata).toHaveProperty('description', 'Highlights how active LinkedIn engagement enhances visibility, networking, thought leadership, and access to hidden job markets.');
      expect(metadata).toHaveProperty('date', '2024-06-19');
      expect(metadata.alternates).toHaveProperty('canonical', '/blog/boost-presence-with-linkedin-activity');
    });
  });
});