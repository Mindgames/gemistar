/**
 * @file Utility functions for reading blog posts from the filesystem.
 * @author Your Name
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import matter from 'gray-matter';

/**
 * Represents the category of a blog post.
 */
export type BlogCategory = 'categoryName' | 'otherCategoryName';

/**
 * Represents the metadata for a blog post.
 */
export interface BlogData {
  /** The date the blog post was published. */
  publishedDate: Date;
  /** The date the blog post was last modified. */
  modifiedDate?: Date;
  /** The title of the blog post. */
  title: string;
  /** A short description of the blog post. */
  description: string;
  /** An array of tags associated with the blog post. */
  tags: string[];
  /** The URL of the thumbnail image for the blog post. */
  thumbnailUrl: string;
  /** The category of the blog post. */
  category: BlogCategory;
  /** The status of the blog post. */
  status: 'published' | 'draft';
}

/**
 * Represents a blog post, including its data, slug, and content.
 */
export interface Blog {
  /** The metadata for the blog post. */
  data: BlogData;
  /** The slug of the blog post. */
  slug: string;
  /** The content of the blog post in Markdown format. */
  content: string;
}

/**
 * Returns the absolute path to the directory where blog posts are stored.
 * @returns {string} The absolute path to the blogs directory.
 */
function getBlogsDirectory(): string {
  const root = process.cwd();
  return path.join(root, `content/blogs`);
}
