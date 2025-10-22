import Link from 'next/link';
import { getChangelogEntries } from '@/utils/changelog';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

export async function ChangelogPreview() {
  const entries = await getChangelogEntries(4);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="relative z-10 mt-24">
      <div className="container  mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <h2 className="text-xl mb-4 font-base tracking-tight md:text-2xl">
          Changelog
        </h2>

        <div className="grid gap-1 sm:grid-cols-2 sm:gap-1 xl:grid-cols-4 xl:gap-1">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/changelog/${entry.slug}`}
              className="group flex h-full flex-col justify-between border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-primary/20 hover:text-foreground sm:p-7 md:p-8"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-muted-foreground transition-colors group-hover:text-muted-foreground">
                  <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold tracking-wide group-hover:border-primary/40">
                    {entry.version}
                  </span>
                  <time
                    dateTime={entry.date}
                    className="text-xs font-medium uppercase tracking-[0.2em]"
                  >
                    {formatDate(entry.date)}
                  </time>
                </div>
                <h3 className="text-lg font-base text-foreground transition-colors group-hover:text-primary md:text-lg">
                  {entry.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4">
          <Link
            href="/changelog"
            className="inline-flex items-center text-md font-medium text-white transition-colors hover:text-primary/80"
          >
            See what&apos;s new in Gamistar &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChangelogPreview;
