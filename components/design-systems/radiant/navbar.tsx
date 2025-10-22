'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

/**
 * Minimal navigation bar with brand name and direct contact action.
 */
export function Navbar(): React.JSX.Element {
  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 px-6 py-6')}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/15 bg-[#0c0f1b]/80 px-6 py-3 text-white shadow-[0_18px_46px_-24px_rgba(40,60,120,0.45)] backdrop-blur-xl">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight transition-colors hover:text-blue-200 md:text-xl"
          aria-label="Gamistar homepage"
        >
          Gamistar
        </Link>
        <Button
          asChild
          size="sm"
          className="rounded-full border border-white/30 bg-[#10152a]/80 px-5 text-sm font-medium text-white transition-colors hover:bg-[#1b2340]/80"
        >
          <a href="mailto:hello@gamistar.com">Contact</a>
        </Button>
      </div>
    </header>
  );
}
