import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const BASE_DIRECTORY = path.join(process.cwd(), 'app');

/**
 * Dynamically requires a module.
 *
 * This function provides a way to dynamically import modules using eval-require.
 * It's primarily used for loading MDX files dynamically in the feed generation process.
 *
 * @param {string} path - The path to the module to require
 * @returns {any} The required module
 *
 * @example
 * ```typescript
 * const mdxModule = dynamicRequire('./posts/my-post.mdx');
 * const { default: PostComponent } = mdxModule;
 * ```
 *
 * @warning This function uses eval() which can be dangerous if used with untrusted input.
 */
export function dynamicRequire(path: string): any {
  return eval('require')(path);
}

interface PostMetadata {
  title: string;
  description: string;
  date: string;
  alternates: {
    canonical: string;
  };
}

interface Post {
  slug: string;
  metadata: PostMetadata;
}

/**
 * Retrieves all blog posts from a specified directory.
 *
 * This function recursively scans a directory for MDX files and extracts
 * metadata from each post. It returns an array of post objects with slugs
 * and metadata for use in feed generation and blog listings.
 *
 * @param {string} directory - The directory path to scan for posts (relative to app/)
 * @returns {Promise<Post[]>} Array of post objects with slug and metadata
 *
 * @example
 * ```typescript
 * // Get all posts from the blog directory
 * const posts = await getPosts('blog');
 *
 * // Get posts from a specific subdirectory
 * const posts = await getPosts('learn/guides');
 * ```
 */
export async function getPosts(directory: string): Promise<Post[]> {
  const targetDirectory = path.join(BASE_DIRECTORY, directory);

  const getSlugs = (dir: string): string[] => {
    const subdirs = fs.readdirSync(dir);
    const files = subdirs.flatMap((subdir) => {
      const res = path.resolve(dir, subdir);
      return fs.statSync(res).isDirectory() ? getSlugs(res) : [res];
    });
    return files;
  };

  const allFiles = getSlugs(targetDirectory);
  const pageFiles = allFiles.filter((file) => file.endsWith('page.mdx'));

  return pageFiles.map((file) => {
    const relativePath = path.relative(targetDirectory, file);
    let slug = path
      .dirname(relativePath)
      .replace(/\\/g, '/')
      .replace(/\/$/, ''); // Remove trailing slash
    if (slug === '.') {
      slug = directory; // Use the directory directly without trailing slash
    } else {
      slug = `${directory}/${slug}`;
    }

    const fileContent = fs.readFileSync(file, 'utf8');
    const { data: metadata } = matter(fileContent);

    return { slug: `/${slug}`, metadata: metadata as PostMetadata };
  });
}

/**
 * Retrieves the content of a post by its slug.
 *
 * @param {string} directory - The directory where the post is located.
 * @param {string} slug - The slug of the post.
 * @returns {Promise<{ content: string }>} A promise that resolves to an object containing the post content.
 */
export async function getPostBySlug(
  directory: string,
  slug: string
): Promise<{ content: string }> {
  const filePath = path.join(BASE_DIRECTORY, directory, `${slug}/page.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return { content: fileContent };
}

/**
 * Extracts metadata from a given page.mdx file.
 *
 * @param {string} filePath - The path to the page.mdx file.
 * @returns {Promise<PostMetadata>} A promise that resolves to the metadata object.
 */
export async function extractMetadata(filePath: string): Promise<PostMetadata> {
  const { metadata } = dynamicRequire(filePath);
  return metadata as PostMetadata;
}
