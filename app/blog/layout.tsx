import type { ReactNode } from 'react';

export default function BlogLayout({
  children
}: {
  children: ReactNode;
}): ReactNode {
  return <>{children}</>;
}
