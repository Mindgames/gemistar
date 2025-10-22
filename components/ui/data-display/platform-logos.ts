import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTelegram,
  faWhatsapp,
  faXTwitter
} from '@fortawesome/free-brands-svg-icons';

export type PlatformLogo = {
  name: string;
  shortName?: string;
  icon: IconDefinition;
  iconScale?: number;
};

export const platformLogos: PlatformLogo[] = [
  { name: 'Facebook Messenger', shortName: 'Facebook', icon: faFacebook },
  { name: 'Instagram Direct', shortName: 'Instagram', icon: faInstagram },
  { name: 'LinkedIn Messaging', shortName: 'LinkedIn', icon: faLinkedin },
  { name: 'Telegram', icon: faTelegram },
  { name: 'WhatsApp', icon: faWhatsapp },
  { name: 'X (Twitter)', shortName: 'X.com', icon: faXTwitter, iconScale: 0.7 }
];
