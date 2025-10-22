'use client';

import { Brain, MessageSquare, Shield, Target, Users, Zap } from 'lucide-react';

import { LogoMarquee } from '@/components/ui/data-display/LogoMarquee';

const features = [
  {
    icon: Brain,
    title: 'Context-aware AI',
    description:
      'Advanced AI that understands the full context of your conversations, maintaining continuity across all your communications.'
  },
  {
    icon: Zap,
    title: 'Instant responses',
    description:
      'Generate perfect replies in seconds, powered by cutting-edge language models optimized for professional communication.'
  },
  {
    icon: Shield,
    title: 'Secure by design',
    description:
      'Our dedicated object storage keeps your data isolated, encrypted, and never accessible to third parties.'
  },
  {
    icon: MessageSquare,
    title: 'Multi-platform',
    description:
      'Seamlessly works across every chat medium—WhatsApp, LinkedIn DMs, Slack, and more—so you never miss the conversation.'
  },
  {
    icon: Target,
    title: 'Goal-oriented',
    description:
      'AI that helps you achieve real outcomes - whether closing deals, building relationships, or resolving issues.'
  },
  {
    icon: Users,
    title: 'Your authentic voice',
    description:
      'Personalization engine that learns your communication style and maintains your unique voice in every message.'
  }
];

export function ModernFeatures() {
  return (
    <section
      id="features"
      className="relative w-full overflow-visible bg-transparent  pt-32  sm:pt-36  lg:pt-40"
    >
      {/* Background moved to anime.js-controlled wallpaper */}

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="mb-14 space-y-8 text-center sm:mb-16 sm:space-y-10 lg:mb-20">
          <div className="relative md:-mx-12 lg:-mx-16 xl:-mx-24"></div>
          <h2 className="text-3xl font-base text-foreground sm:text-2xl lg:text-3xl">
            Ready to win every conversation?
          </h2>
        </div>

        {/* Clean grid - no heavy cards */}
        <div className="grid gap-1 sm:grid-cols-2 sm:gap-1 xl:grid-cols-3 xl:gap-1">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group  border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-primary/20 sm:p-7 md:p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-foreground border border-border">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
