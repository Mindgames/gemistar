import Link from 'next/link';
import { getPosts } from '@/utils/blog';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

const formatCategory = (categories: string[] = []) => {
  if (categories.length === 0) return 'Update';
  const [first] = categories;
  return first.charAt(0).toUpperCase() + first.slice(1);
};

export async function BlogHighlights() {
  const posts = await getPosts(3);

  if (!posts.length) {
    return null;
  }

  return (
    <section className="relative z-10 mt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-base tracking-tight md:text-2xl">
            Recent highlights
          </h2>
          <div className="grid gap-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col justify-between  border border-border/70 bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                </div>
                <div className="pt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {formatCategory(post.categories)} · {formatDate(post.date)}
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link
              href="/blog"
              className="inline-flex items-center text-md font-medium text-white transition-colors hover:text-primary/80"
            >
              See the latest stories &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogHighlights;
