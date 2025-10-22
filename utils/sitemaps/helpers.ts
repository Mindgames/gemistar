import fs from 'fs';
import path from 'path';

const BASE_DIRECTORY = path.join(process.cwd(), 'app');

/**
 * Retrieves a list of posts from a specified directory.
 * 
 * @param {string} directory - The directory to search for posts.
 * @returns {Promise<string[]>} A promise that resolves to an array of post URLs.
 */
export async function getPosts(directory: string): Promise<string[]> {
  const targetDirectory = path.join(BASE_DIRECTORY, directory);

  if (!fs.existsSync(targetDirectory)) {
    return [];
  }

  const getSlugs = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    return entries.flatMap((entry) => {
      const resolvedPath = path.resolve(dir, entry.name);

      if (entry.isDirectory()) {
        return getSlugs(resolvedPath);
      }

      return [resolvedPath];
    });
  };

  const allFiles = getSlugs(targetDirectory);
  const pageFiles = allFiles.filter(file => file.endsWith('page.mdx'));

  return pageFiles.map((file) => {
    const relativePath = path.relative(targetDirectory, file);
    let slug = path.dirname(relativePath).replace(/\\/g, '/').replace(/\/$/, ''); // Remove trailing slash
    if (slug === '.') {
      return `/${directory}`; // Return the directory directly without trailing slash
    }
    return `/${directory}/${slug}`;
  });
}
/**
 * Retrieves the content of a post by its slug.
 * 
 * @param {string} directory - The directory where the post is located.
 * @param {string} slug - The slug of the post.
 * @returns {Promise<{ content: string }>} A promise that resolves to an object containing the post content.
 */
export async function getPostBySlug(directory: string, slug: string): Promise<{ content: string }> {
  const filePath = path.join(BASE_DIRECTORY, directory, `${slug}/page.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found for slug ${slug} in ${directory}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  return { content: fileContent };
}
