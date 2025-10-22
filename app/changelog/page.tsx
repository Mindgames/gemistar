import Link from 'next/link';
import React, { use } from 'react';

import { Badge } from '@/components/ui/base/badge';
import { getChangelogEntries, type ChangelogEntry } from '@/utils/changelog';
import { buildMetadata } from '@/utils/seo';

const pageDescription =
  'Release notes and product updates from the Gamistar team. Follow along as we ship new features and improvements.';

export const metadata = buildMetadata({
  title: 'Changelog',
  description: pageDescription,
  path: '/changelog',
  type: 'website'
});

const formatMonth = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
};

const formatDay = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

interface GroupedEntries {
  month: string;
  entries: ChangelogEntry[];
}

const groupByMonth = (entries: ChangelogEntry[]): GroupedEntries[] => {
  const map = new Map<string, ChangelogEntry[]>();

  entries.forEach((entry) => {
    const month = formatMonth(entry.date);
    if (!map.has(month)) {
      map.set(month, []);
    }
    map.get(month)!.push(entry);
  });

  return Array.from(map.entries()).map(([month, entryList]) => ({
    month,
    entries: entryList
  }));
};

const ChangelogPage = (): React.JSX.Element => {
  const entries = use(getChangelogEntries());
  const groupedEntries = groupByMonth(entries);

  return (
    <section className="w-full bg-background py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-10">
        <header className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Changelog
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Follow along as we ship new capabilities, polish the experience, and
            keep Gamistar fast, reliable, and helpful. Each release is noted with a
            short summary and highlights that help you see what changed at a
            glance.
          </p>
        </header>

        <div className="mt-16 space-y-20">
          {groupedEntries.map(({ month, entries: monthEntries }) => (
            <section key={month} className="space-y-8">
              <h2 className="text-2xl font-semibold text-foreground">{month}</h2>
              <div className="relative pl-6 sm:pl-8">
                <div className="absolute left-5 top-0 h-full w-px bg-border sm:left-6" aria-hidden />
                <div className="space-y-8">
                  {monthEntries.map((entry) => (
                    <article key={entry.slug} className="relative pl-6 sm:pl-8">
                      <span className="absolute left-0 top-2 inline-flex h-3 w-3 items-center justify-center rounded-full border-2 border-background bg-primary" />
                      <div className="overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Badge
                              variant="outline"
                              className="rounded-full border-border/60 px-2.5 py-0.5 text-xs font-semibold tracking-wide"
                            >
                              v{entry.version}
                            </Badge>
                            <time
                              dateTime={entry.date}
                              className="text-xs font-semibold uppercase tracking-[0.2em]"
                            >
                              {formatDay(entry.date)}
                            </time>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                                <Link
                                  href={`/changelog/${entry.slug}`}
                                  className="transition-colors hover:text-primary"
                                >
                                  {entry.title}
                                </Link>
                              </h3>
                              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                                {entry.summary}
                              </p>
                            </div>
                            {entry.tags && entry.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {entry.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="bg-muted text-foreground">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <div>
                              <Link
                                href={`/changelog/${entry.slug}`}
                                className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                                aria-label={`Read update ${entry.title}`}
                              >
                                View update &rarr;
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChangelogPage;
