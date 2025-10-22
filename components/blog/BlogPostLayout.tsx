import type { ReactNode } from 'react';

interface BlogPostLayoutProps {
  children: ReactNode;
}

/**
 * Provides consistent spacing and typography for individual blog posts.
 */
export function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return (
    <section className="w-full bg-background py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-10">
        <article
          className="prose max-w-none prose-headings:tracking-tight prose-h1:text-4xl prose-h1:leading-tight prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:leading-relaxed prose-blockquote:border-l-primary/40 prose-blockquote:bg-muted/30 prose-blockquote:py-3 prose-blockquote:px-4 prose-blockquote:text-muted-foreground prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-primary prose-table:w-full prose-table:border prose-table:border-border prose-thead:bg-muted/40 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2 prose-img:rounded-2xl prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-pre:bg-muted/80 prose-pre:text-foreground dark:prose-invert [&_a]:text-primary [&_a]:transition-colors [&_a:hover]:text-primary/80"
        >
          {children}
        </article>
      </div>
    </section>
  );
}

export default BlogPostLayout;
