import { Heading, Subheading } from '@/components/ui/base/text';

import { BentoCard } from '@/components/design-systems/radiant/bento-card';
import { Container } from '@/components/ui/base/common';
import Image from 'next/image';
import { Keyboard } from '@/components/design-systems/radiant/keyboard';
import { LogoCluster } from '@/components/design-systems/radiant/logo-cluster';
import { Map } from '@/components/design-systems/radiant/map';

/**
 * Features section component showcasing Gamistar's key capabilities.
 *
 * This component displays the main features of Gamistar in an engaging layout
 * using BentoCard components. It highlights three main areas:
 * - Engagement: Supercharging social presence with AI
 * - Platforms: Multi-platform support
 * - Integration: Seamless workflow integration
 *
 * The layout is responsive and uses a grid system that adapts to different screen sizes.
 *
 * @component
 * @returns {JSX.Element} The rendered features section
 *
 * @example
 * ```typescript
 * <Features />
 * ```
 */
function Features(): React.JSX.Element {
  return (
    <Container>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Engage"
          title="Supercharge Your Social Presence"
          description="Gamistar is your AI co-pilot for online interactions—crafting quick, personalized replies that match your voice. Keep every interaction authentic and on-brand, effortlessly."
          graphic={
            <div className="relative h-80">
              <Image
                src="/engage4.jpg"
                alt="Engage with your audience"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          }
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Personalize"
          title="Make Every Reply Feel Like You"
          description="It's how Gamistar learns your unique tone, style, and even regional slang—ensuring every interaction sounds authentic and true to your brand, whether personal or professional."
          graphic={
            <div className="relative h-80">
              <Image
                src="/convert6.jpg"
                alt="Personalized responses"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          }
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Activate"
          title="Quick Replies with /rp"
          description={`Craft thoughtful replies instantly. Type "/rp" and let Gamistar create the perfect response.`}
          graphic={
            <div className="flex size-full pl-10 pt-10">
              <Keyboard highlighted={['ForwardSlash', 'R', 'P']} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Unify"
          title="Seamless Integration"
          description="Effortlessly manage responses across platforms. Customize and post with ease using Gamistar."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Globalize"
          title="Engage in Any Language"
          description="Connect with a global audience. Gamistar supports multiple languages."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  );
}

export default Features;
