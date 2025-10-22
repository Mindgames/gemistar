'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="w-full border-t border-border bg-transparent py-20 sm:py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Ready to see BetMate on your catalog?
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              Tell us about your stack (platform, APIs, main markets) and the KPIs you want
              to move — conversion, retention, support deflection. We&apos;ll propose a
              6-week pilot with clear goals and instrumentation.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                variant="default"
                className="px-6 text-base font-semibold"
                asChild
              >
                <a href="mailto:[insert email]">
                  Book a Pilot
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 text-base font-semibold"
                asChild
              >
                <a href="mailto:[insert email]">Talk to Sales</a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="px-6 text-base font-semibold"
                asChild
              >
                <a href="mailto:[insert email]">Become a Platform Partner</a>
              </Button>
            </div>
          </div>

          <div className="space-y-5 rounded-3xl border border-border/60 bg-card/70 p-6 shadow-[0_20px_60px_-40px_rgba(12,12,12,0.45)]">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Contact</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Email: <span className="font-medium text-foreground">[insert email]</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Phone:{' '}
                <span className="font-medium text-foreground">[insert phone]</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Form:{' '}
                <span className="font-medium text-foreground">
                  [insert contact form URL]
                </span>
              </p>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Responsible play:</strong> BetMate is
                B2B software for licensed operators. We do not accept wagers or hold player
                funds. Please gamble responsibly and follow local laws.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
