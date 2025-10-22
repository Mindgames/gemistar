'use client';

import Link from 'next/link';

/**
 * Streamlined site footer with brand, product links, and legal info.
 */
export function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="mt-24 w-full border-t border-white/10 bg-[#010005] pt-16 text-white"
    >
      <div className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight transition-colors hover:text-pink-200"
              aria-label="Gamistar homepage"
            >
              Gamistar
            </Link>
            <p className="mt-3 max-w-sm text-sm text-white/55">
              Gemistar turns betting intent into in-chat slips with BetMate — built
              for regulated operators.
            </p>
            <span className="mt-6 text-xs text-white/40">
              © {currentYear} Gamistar AI. All rights reserved.
            </span>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="text-base font-semibold tracking-wide text-white/90">
              Product
            </span>
            <nav className="mt-3 flex flex-col items-center gap-1.5 text-sm text-white/70 md:items-start">
              <Link
                href="/#product"
                className="transition-colors hover:text-pink-200"
              >
                BetMate
              </Link>
              <Link
                href="/#contact"
                className="transition-colors hover:text-pink-200"
              >
                Contact
              </Link>
            </nav>
            <span className="mt-6 text-base font-semibold tracking-wide text-white/90">
              Get in touch
            </span>
            <a
              href="mailto:hello@gamistar.com"
              className="mt-2 text-sm text-white/70 transition-colors hover:text-pink-200"
            >
              hello@gamistar.com
            </a>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="text-base font-semibold tracking-wide text-white/90">
              Legal
            </span>
            <nav className="mt-3 flex flex-col items-center gap-1.5 text-sm text-white/70 md:items-start">
              <Link
                href="/p/privacypolicy"
                className="transition-colors hover:text-pink-200"
              >
                Privacy
              </Link>
              <Link
                href="/p/tos"
                className="transition-colors hover:text-pink-200"
              >
                Terms
              </Link>
              <Link
                href="/#security"
                className="transition-colors hover:text-pink-200"
              >
                Security
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
