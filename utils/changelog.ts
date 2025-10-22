import { readdir } from 'fs/promises';

export interface ChangelogEntry {
  title: string;
  slug: string;
  date: string;
  version: string;
  summary: string;
  description: string;
  tags?: string[];
  weight?: number;
  openGraph?: {
    images: string | string[];
  };
}

const sortByWeightAndDate = (entries: ChangelogEntry[]): ChangelogEntry[] => {
  return [...entries].sort((a, b) => {
    if (a.weight && b.weight) {
      return b.weight - a.weight;
    }
    if (a.weight) return -1;
    if (b.weight) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

/**
 * Retrieves changelog entries from the `app/changelog` directory ordered by weight and date.
 * @param limit - Optional limit to truncate the returned list.
 * @param excludeSlug - Slug to exclude from the response (useful when fetching related entries).
 */
export async function getChangelogEntries(
  limit?: number,
  excludeSlug?: string
): Promise<ChangelogEntry[]> {
  const slugs = (
    await readdir('./app/changelog', {
      withFileTypes: true
    })
  ).filter((dirent) => dirent.isDirectory());

  const entries = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`./../app/changelog/${name}/page.mdx`);
      return { slug: name, ...metadata } as ChangelogEntry;
    })
  );

  const filtered = excludeSlug
    ? entries.filter((entry) => entry.slug !== excludeSlug)
    : entries;

  const sorted = sortByWeightAndDate(filtered);

  return limit ? sorted.slice(0, limit) : sorted;
}
