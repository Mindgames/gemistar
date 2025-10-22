import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/base/badge';

interface ChangelogPostMetadata {
  title: string;
  date: string;
  version: string;
  summary: string;
  tags?: string[];
}

interface ChangelogPostLayoutProps {
  metadata: ChangelogPostMetadata;
  children: ReactNode;
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Provides consistent framing for individual changelog entries, including
 * a contextual header and typographic container for the MDX body.
 */
export function ChangelogPostLayout({ metadata, children }: ChangelogPostLayoutProps) {
  const { title, date, summary, tags, version } = metadata;

  return (
    <section className="relative w-full overflow-hidden bg-background py-16 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-[-18rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.16),_rgba(12,12,12,0)_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.32),_rgba(12,12,12,0)_74%)]"
      />
      <div
        aria-hidden
        className="absolute right-[-8rem] top-[28%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(14,116,144,0.18),_rgba(12,12,12,0)_72%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.35),_rgba(12,12,12,0)_75%)]"
      />
      <div
        aria-hidden
        className="absolute left-[-10rem] bottom-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.18),_rgba(12,12,12,0)_74%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.36),_rgba(12,12,12,0)_78%)]"
      />

      <div className="container relative z-10 mx-auto max-w-3xl px-4 sm:px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/70 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-10 md:p-12 dark:shadow-[0_24px_80px_rgba(2,6,23,0.55)]">
          <div
            aria-hidden
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
          />

          <div className="relative space-y-10">
            <header className="space-y-4 text-foreground">
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                <Badge
                  variant="outline"
                  className="rounded-full border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary"
                >
                  v{version}
                </Badge>
                <time dateTime={date} className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {formatDate(date)}
                </time>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{summary}</p>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="border border-border/40 bg-muted/70 text-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            <article className="prose max-w-none prose-headings:tracking-tight prose-headings:text-foreground prose-h1:text-3xl prose-h1:leading-tight prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-em:text-foreground/90 prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-primary prose-code:rounded prose-code:bg-muted/80 prose-code:px-1.5 prose-code:py-0.5 prose-pre:bg-muted/80 prose-pre:text-foreground dark:prose-invert [&_a]:text-primary [&_a:hover]:text-primary/80">
              {children}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangelogPostLayout;
