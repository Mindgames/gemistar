import { getPosts } from './helpers';

import fs from 'fs';

/**
 * Test suite for the getPosts function.
 */
describe('getPosts', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a list of blog posts with correct properties', async () => {
    const blogPosts = await getPosts('blog');

    expect(Array.isArray(blogPosts)).toBe(true);
    blogPosts.forEach(post => {
      expect(typeof post).toBe('string');
      expect(post).toMatch(/^\/blog\/.+/);
    });
  });

  it('should return an empty array if no blog posts are found', async () => {
    // Mock fs.readdirSync to return an empty array
    jest.spyOn(fs, 'readdirSync').mockReturnValueOnce([]);

    const blogPosts = await getPosts('blog');
    expect(blogPosts).toEqual([]);
  });

  it('should return an empty array if the directory does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    const docs = await getPosts('learn');
    expect(docs).toEqual([]);
  });

  it('should throw an error if the blog directory does not exist', async () => {
    // Mock fs.readdirSync to throw an error
    jest.spyOn(fs, 'readdirSync').mockImplementationOnce(() => {
      throw new Error('Directory not found');
    });

    await expect(getPosts('blog')).rejects.toThrow('Directory not found');
  });

  it('should return an empty array if docs directory does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    const docs = await getPosts('docs');
    expect(docs).toEqual([]);
  });
});
